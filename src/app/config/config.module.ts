import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigRoutingModule } from './config-routing.module';
import { ConfigListComponent } from './config-list/config-list.component';
import { DataTablesModule } from 'angular-datatables';
import { ConfigDetailsComponent } from './config-details/config-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [
    ConfigListComponent,
    ConfigDetailsComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ConfigRoutingModule,
    DataTablesModule,
    MatTooltipModule
  ]
})
export class ConfigModule { }
