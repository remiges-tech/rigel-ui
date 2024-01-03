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
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}




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
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    TranslateModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
