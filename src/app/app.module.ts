import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TopMenuComponent } from './top-menu/top-menu.component';
import { SchemaComponent } from './schema/schema.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FieldslistComponent } from './components/fieldslist/fieldslist.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoaderComponent } from './components/loader/loader.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { HistoryModalComponent } from './components/history-modal/history-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { InputFieldsComponent } from './components/input-fields/input-fields.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { AppRoutingModule } from './app-routing.module';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    TopMenuComponent,
    SchemaComponent,
    FieldslistComponent,
    LoaderComponent,
    HistoryModalComponent,
    InputFieldsComponent,
    PaginationComponent,
    PageNotFoundComponent
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
    AppRoutingModule,
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
