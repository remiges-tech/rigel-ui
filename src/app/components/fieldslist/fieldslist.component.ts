import { Component, Input, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ConfigDetails, Field } from 'src/interfaces/common-interfaces';
import { CommonService } from 'src/services/common.service';
import { HistoryModalComponent } from '../history-modal/history-modal.component';
import { SchemaService } from 'src/services/schema.service';
import { HttpParams } from '@angular/common/http';
import { HistoryResp } from 'src/interfaces/response-interfaces';
import { CONSTANTS } from 'src/services/constants.service';


@Component({
  selector: 'app-fieldslist',
  templateUrl: './fieldslist.component.html',
  styleUrls: ['./fieldslist.component.scss'],
})
export class FieldslistComponent {
  fileName: string = 'FieldslistComponent';
  private _toastr = inject(ToastrService);
  public _commonService = inject(CommonService);
  private _schemaService = inject(SchemaService);
  @Input({ required: true }) schemaData!: ConfigDetails;
  @Input({ required: true }) configValues: any = {};
  searchText: string = '';
  updatedConfigValuesList: Field[] = [];
  editIndex: number | null = null;
  selectedFieldHistory: any[] = [];
  selectedFieldName: string = '';

  constructor(public dialog: MatDialog) { }

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

  openHistoryModal(fieldName: string) {
    this.selectedFieldName = fieldName;
    try {
      if (this.schemaData.app && this.schemaData.module && this.schemaData.ver && this.schemaData.config) {
        let data = {
          params: new HttpParams()
            .append('app', this.schemaData.app)
            .append('module', this.schemaData.module)
            .append('ver', this.schemaData.ver)
            .append('config', this.schemaData.config)
            .append('key', fieldName)
        };
        this._commonService.showLoader();
        this._schemaService.getConfigHist(data).subscribe(
          (res: HistoryResp) => {
            this._commonService.hideLoader();
            if (res.status == CONSTANTS.SUCCESS) {
              this.selectedFieldHistory = res.data.hist;
              this.dialog.open(HistoryModalComponent, {
                width: '529px',
                height: '502px',
                data: {
                  fieldHistory: this.selectedFieldHistory,
                  fieldName: this.selectedFieldName,
                },
              });
            } else {
              this._toastr.error(res.message, CONSTANTS.ERROR);
            }
          },
          (err: any) => {
            this._toastr.error(err, CONSTANTS.ERROR);
          }
        );
      } else {
        this._toastr.error('Invalid schema data', 'Error');
      }
    } catch (error) {
      this._commonService.log({
        fileName: this.fileName,
        functionName: 'fetchFieldHistory',
        msg: error
      });
    }
  }


  toggleEditMode(index: number) {
    this.editIndex = index;
  }

  approveEdit(configValue: Field) {
    this.schemaData.values.find(
      (value: Field) => value.name == configValue.name
    )!.value = configValue.value;
    this.updatedConfigValuesList.push(configValue);
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
