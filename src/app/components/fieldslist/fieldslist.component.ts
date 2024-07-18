import { Component, Input, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ConfigDetails, Field } from 'src/interfaces/common-interfaces';
import { ConfigSetResp } from 'src/interfaces/response-interfaces';
import { CommonService } from 'src/services/common.service';
import { SchemaService } from 'src/services/schema.service';
import { HistoryModalComponent } from '../history-modal/history-modal.component';

@Component({
  selector: 'app-fieldslist',
  templateUrl: './fieldslist.component.html',
  styleUrls: ['./fieldslist.component.scss'],
})
export class FieldslistComponent {
  fileName: string = 'FieldslistComponent';
  private _schemaService = inject(SchemaService);
  private _toastr = inject(ToastrService);
  public _commonService = inject(CommonService);
  @Input({ required: true }) schemaData!: ConfigDetails;
  @Input({ required: true }) configValues: any = {};
  searchText: string = '';
  updatedConfigValuesList: Field[] = [];
  editIndex: number | null = null;
  selectedFieldHistory: any[] = [];
  selectedFieldName: string = '';

  constructor(public dialog: MatDialog) {}

  updateConfig(data: { data: Field; isEscClicked: boolean }, index: number) {
    if (data.isEscClicked) {
      this.editIndex = null;
      this._commonService.resetEditMode();
    } else if (this.isConfigValueChanged(data.data)) {
      this._commonService.setEditMode({
        isValueChange: true,
        index,
        configData: data.data,
      });
    } else {
      this.schemaData.values.find(
        (value: Field) => value.name == data.data.name
      )!.value = data.data.value;
      this.updatedConfigValuesList = this.updatedConfigValuesList.filter(
        (value: Field) => value.name != data.data.name
      );
      this.editIndex = null;
      this._commonService.resetEditMode();
    }
  }

  isConfigValueChanged(item: Field) {
    return item.value != this.configValues[item.name];
  }

  getCommitMsgText() {
    const configChangeCount = this.updatedConfigValuesList.length;
    return configChangeCount > 1
      ? $localize`:@@106:${configChangeCount} values changed.`
      : $localize`:@@107:${configChangeCount} value changed.`;
  }

  // updateConfig(data: Field, index: number) {
  //   this.schemaData.values[index] = data;
  //   const modifiedObject = {
  //     data: {
  //       app: this.schemaData.app,
  //       module: this.schemaData.module,
  //       ver: this.schemaData.ver,
  //       config: this.schemaData.config,
  //       key: data.name,
  //       value: data.value,
  //     },
  //   };

  //   try {
  //     this._schemaService.updateConfigDetails(modifiedObject).subscribe(
  //       (res: ConfigSetResp) => {
  //         if (res.status == CONSTANTS.SUCCESS) {
  //           this._toastr.success(
  //             `"${data.name}" ` + res.data,
  //             CONSTANTS.SUCCESS
  //           );
  //         } else {
  //           this._toastr.success(`"${data.name}" ` + res.data, CONSTANTS.ERROR);
  //         }
  //       },
  //       (err: any) => {
  //         this._toastr.error(err, CONSTANTS.ERROR);
  //       }
  //     );
  //   } catch (err) {
  //     this._schemaService._commonService.log({
  //       fileName: this.fileName,
  //       functionName: 'updateConfig',
  //       err,
  //     });
  //   }
  // }

  openHistoryModal(fieldName: string) {
    this.selectedFieldName = fieldName;
    this.selectedFieldHistory = this.getFieldHistory(fieldName);
    this.dialog.open(HistoryModalComponent, {
      width: '449px',
      height: '462px',
      data: {
        fieldHistory: this.selectedFieldHistory,
        fieldName: this.selectedFieldName,
      },
    });
  }

  getFieldHistory(fieldName: string) {
    const history = localStorage.getItem('fieldHistory');
    if (history) {
      const parsedHistory = JSON.parse(history);
      return parsedHistory[fieldName] || [];
    }
    return [];
  }

  storeFieldHistory(fieldName: string, newValue: string) {
    const history = localStorage.getItem('fieldHistory');
    let parsedHistory = history ? JSON.parse(history) : {};
    if (!parsedHistory[fieldName]) {
      parsedHistory[fieldName] = [];
    }

    const latestEntry =
      parsedHistory[fieldName][parsedHistory[fieldName].length - 1];
    if (!latestEntry || latestEntry.value !== newValue) {
      parsedHistory[fieldName].push({
        value: newValue,
        dateTime: new Date(),
        user: 'Current User',
      });
    }

    localStorage.setItem('fieldHistory', JSON.stringify(parsedHistory));
  }

  toggleEditMode(index: number) {
    this.editIndex = index;
  }

  approveEdit(configValue: Field) {
    this.schemaData.values.find(
      (value: Field) => value.name == configValue.name
    )!.value = configValue.value;
    this.updatedConfigValuesList.push(configValue);
    this.storeFieldHistory(configValue.name, configValue.value);
    this.editIndex = null;
    this._commonService.resetEditMode();
  }

  rejectEdit(configValue: Field) {
    this.updatedConfigValuesList = this.updatedConfigValuesList.filter(
      (value: Field) => value.name != configValue.name
    );
    const schemadata = this.schemaData.values.find(
      (value: Field) => value.name == configValue.name
    );
    if (schemadata) {
      schemadata.value = this.configValues[configValue.name];
    }
    this.editIndex = null;
    this._commonService.resetEditMode();
  }

  commitValuesHandler() {
    // API call here to update values in the database
    // After API call happens Successfully success alert msg is shown to user
    this.editIndex = null;
    this._commonService.resetEditMode();
    this.updatedConfigValuesList.forEach((value: Field) => {
      this.configValues[value.name] = value.value;
    });

    this._toastr.success(this.getCommitMsgText(), 'Success!');

    this.updatedConfigValuesList = [];
  }

  discardValuesHandler() {
    this.editIndex = null;
    this._commonService.resetEditMode();
    this.updatedConfigValuesList = [];
    this.schemaData.values.forEach((value: Field) => {
      value.value = this.configValues[value.name];
    });
  }

  filterValuesBasedOnSearch() {
    let text = this.searchText.toLowerCase();
    return this.schemaData.values.filter(
      (value: Field) =>
        value.name.toLowerCase().includes(text) ||
        value.description.toLowerCase().includes(text) ||
        value.type.toLowerCase().includes(text)
    );
  }
}
