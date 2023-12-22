import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SchemaFormComponent } from './schema-form/schema-form.component';
import { SchemaListComponent } from './schema-list/schema-list.component';



const routes: Routes = [
  
  {path: '',redirectTo:'schema-list', pathMatch:'full'},
  {path: 'schema-list', component: SchemaListComponent},
  {path: 'schema-form', component: SchemaFormComponent},
  {path: 'schema-form/:id', component: SchemaFormComponent},
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SchemaRoutingModule { }
