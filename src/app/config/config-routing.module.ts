import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfigListComponent } from './config-list/config-list.component';
import { ConfigDetailsComponent } from './config-details/config-details.component';

const routes: Routes = [
  {path:'', pathMatch:'full',redirectTo:'list'},
  {path:'list', component: ConfigListComponent, title:'Rigel | Config List'},
  {path:'details/:action', component: ConfigDetailsComponent, title:'Rigel | Config Detail'},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfigRoutingModule { }
