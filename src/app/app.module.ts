import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TopMenuComponent } from './top-menu/top-menu.component';
import { SchemaComponent } from './schema/schema.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FieldDetailComponent } from './components/field-detail/field-detail.component';
import { FieldslistComponent } from './components/fieldslist/fieldslist.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoaderComponent } from './components/loader/loader.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { HistoryModalComponent } from './components/history-modal/history-modal.component';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    AppComponent,
    TopMenuComponent,
    SchemaComponent,
    FieldDetailComponent,
    FieldslistComponent,
    LoaderComponent,
    HistoryModalComponent
  ],
  imports: [
    BrowserModule,
    NgSelectModule, 
    NgxPaginationModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
