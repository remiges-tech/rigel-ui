import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { SchemaService } from '../../services/schema.service';

import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-schema-list',
  templateUrl: './schema-list.component.html',
  styleUrls: ['./schema-list.component.scss']
})
export class SchemaListComponent {
  
  SchemaData!: any[]; 
  formValue !: FormGroup;
  selectedRow: any;
  p: number = 1;



  constructor(
    private router: Router,
    private api: SchemaService,
    private toastr: ToastrService){}

    ngOnInit(): void {
      this.getAllSchema();
    }

    getAllSchema() {
      this.api.getSchema().subscribe((res) => {
        this.SchemaData = res;
      });
    }



  onEdit(row: any) {
    this.router.navigate(['schema-form', row.id]); 
  }

  onDeleteSchema(row: any) {
    this.api.deleteSchema(row.id).subscribe(
      () => {
        this.getAllSchema();
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
  

  


  openValueTypeModal(row: any){
  this.selectedRow = row;
  }

  addConfigForm(row: any){
  this.router.navigate(['config-form', row.id]);
  }
}

