import { Component, Input, inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ConfigDetails, Field } from 'src/interfaces/common-interfaces';
import { ConfigSetResp } from 'src/interfaces/response-interfaces';
import { CommonService } from 'src/services/common.service';
import { CONSTANTS } from 'src/services/constants.service';
import { SchemaService } from 'src/services/schema.service';

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
  data: any[] = Array.from({ length: 150 }, (_, k) => ({ position: k + 1 }));
  paginatedData?: any[];
  totalEntities = 150;
  pageSize = 20;
  pageSizeOptions: number[] = [10, 20, 50, 100];
  currentPage = 1;
  totalPages: number = 1;

  ngOnInit() {
    this.updatePaginatedData();
  }

  onPageSizeChange(event: any) {
    this.pageSize = +event.target.value;
    this.currentPage = 1;
    this.updatePaginatedData();
  }

  updatePaginatedData() {
    this.totalPages = Math.ceil(this.totalEntities / this.pageSize);
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.paginatedData = this.data.slice(start, end);
  }

  goToFirstPage() {
    this.currentPage = 1;
    this.updatePaginatedData();
  }

  goToPreviousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedData();
    }
  }

  goToNextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePaginatedData();
    }
  }

  goToLastPage() {
    this.currentPage = this.totalPages;
    this.updatePaginatedData();
  }

  updateConfig(data: Field, index: number) {
    if (this.isConfigValueChanged(data)) {
      this._commonService.setEditMode({
        isValueChange: true,
        index,
        configData: data,
      });
    } else {
      this.schemaData.values.find(
        (value: Field) => value.name == data.name
      )!.value = data.value;
      this.updatedConfigValuesList = this.updatedConfigValuesList.filter(
        (value: Field) => value.name != data.name
      );
      this.editIndex = null;
      this._commonService.resetEditMode();
    }
    // this.editIndex = null;
    // console.log(data.prevData);
    // this.prevData[`${data.prevData.name}`] = data.prevData.value;
  }

  isConfigValueChanged(item: Field) {
    return item.value != this.configValues[item.name];
  }

  getCommitMsgText() {
    const configChangeCount = this.updatedConfigValuesList.length;

    return configChangeCount > 1
      ? `${configChangeCount} values changed.`
      : `${configChangeCount} value changed.`;
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
    this.editIndex = null;
    this._commonService.resetEditMode();
  }

  filterData() {
    let text = this.searchText.toLowerCase();
    return this.schemaData.values.filter(
      (value: Field) =>
        value.name.toLowerCase().includes(text) ||
        value.description.toLowerCase().includes(text) ||
        value.type.toLowerCase().includes(text)
    );
  }
}
