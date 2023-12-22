import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DataTablesModule } from 'angular-datatables';
import { NgxPaginationModule } from 'ngx-pagination';
import { SchemaFormComponent } from './schema-form/schema-form.component';
import { SchemaListComponent } from './schema-list/schema-list.component';
import { SchemaRoutingModule } from './schema-routing.module';



@NgModule({
  declarations: [
    SchemaFormComponent,
    SchemaListComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
    MatDialogModule,
    MatTooltipModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    SchemaRoutingModule,
    NgxPaginationModule,
    DataTablesModule,
  ]
})
export class SchemaModule { }
