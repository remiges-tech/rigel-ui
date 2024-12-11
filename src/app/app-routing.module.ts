import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SchemaComponent } from './schema/schema.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';


const routes: Routes = [
  { path: '', redirectTo: 'schema', pathMatch: 'full' },
  { path: 'schema', component: SchemaComponent}, 
  { path: '**', component: PageNotFoundComponent }
]

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes ), CommonModule],
  exports: [RouterModule],
})

export class AppRoutingModule { }
