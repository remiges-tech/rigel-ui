import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  {path: '', loadChildren: () => import('./schema/schema.module').then(m => m.SchemaModule) },
  {path: 'config', loadChildren: () => import('./config/config.module').then(m => m.ConfigModule) },
  {path: '**', component: PageNotFoundComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
