import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TopMenuComponent } from './top-menu/top-menu.component';
import { SchemaComponent } from './schema/schema.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FieldDetailComponent } from './components/field-detail/field-detail.component';
import { FieldslistComponent } from './components/fieldslist/fieldslist.component';

@NgModule({
  declarations: [
    AppComponent,
    TopMenuComponent,
    SchemaComponent,
    FieldDetailComponent,
    FieldslistComponent
  ],
  imports: [
    BrowserModule,
    NgSelectModule, 
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
