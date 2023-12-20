import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SchemaFormComponent } from './schema-form/schema-form.component';
import { SchemaListComponent } from './schema-list/schema-list.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  {path: '', component: SchemaListComponent},
  {path: 'schema-list', component: SchemaListComponent},
  {path: 'schema-form', component: SchemaFormComponent},
  {path: 'schema-form/:id', component: SchemaFormComponent},
  {path: 'config', loadChildren: () => import('./config/config.module').then(m => m.ConfigModule) },
  {path: '**', component: PageNotFoundComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
