import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { TopMenuComponent } from './top-menu/top-menu.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { SchemaListComponent } from './schema-list/schema-list.component';
import { SchemaFormComponent } from './schema-form/schema-form.component';
import { ConfigFormComponent } from './config-form/config-form.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    TopMenuComponent,
    SchemaListComponent,
    SchemaFormComponent,
    ConfigFormComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    NgxPaginationModule,
    BrowserAnimationsModule, 
    ToastrModule.forRoot(), 
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
