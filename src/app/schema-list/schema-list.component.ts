import { Component, ViewChild } from '@angular/core';
import { SchemaService } from '../../services/schema.service';
import { ToastrService } from 'ngx-toastr';
import { DataTableDirective } from 'angular-datatables';
import { BehaviorSubject, Subject } from 'rxjs';
import { CommonService } from 'src/services/common.service';


@Component({
  selector: 'app-schema-list',
  templateUrl: './schema-list.component.html',
  styleUrls: ['./schema-list.component.scss']
})
export class SchemaListComponent {
  @ViewChild(DataTableDirective, { static: false })
  dtElement!: DataTableDirective;
  dtTrigger: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  schemaData!: any[];
  dtOptions: DataTables.Settings = {};

  dialogSubscription: any;

  constructor(
    private api: SchemaService,
    private toastr: ToastrService, private _commonService: CommonService) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: "full_numbers",
      pageLength: 5,
      lengthMenu: [5, 10, 25],
      processing: true,
      language:{
        searchPlaceholder: 'schema name'
      }
    };
    this.getAllSchema();
  }



  getAllSchema() {
    this.api.getSchema().subscribe((res) => {
      this.schemaData = res;
    });
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  onDeleteSchema(row: any) {
    let obj = {
      msgTitle: 'Confirmation',
      msg: `Are you sure you want to delete schema "${row.name}"`,
      okBtn: 'Delete',
      cancelBtn: 'Cancel',
    }
    this._commonService.openConfirmationModal(obj).afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.api.deleteSchema(row.id).subscribe(
          (res: any) => {
              this.getAllSchema()
              this.reloadDataTable()
            this.toastr.success('Schema deleted successfully!', 'Success');
          },
          (error) => {
            console.error('Error deleting schema:', error);
            if (error.status === 404) {
              this.toastr.error('Schema not found for deletion.', 'Error');
            } else {
              this.toastr.error('An error occurred while deleting the schema.', 'Error');
            }
          }
        );
      }
    })
  }

  reloadDataTable(): void {
    if (this.dtElement && this.dtElement.dtInstance) {
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.destroy();
        this.dtTrigger.next(0);
      });
    }
  }
}

