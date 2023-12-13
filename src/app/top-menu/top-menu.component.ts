import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.scss']
})
export class TopMenuComponent {


  constructor(private router:Router){}

  clickAddSchema(){
    this.router.navigate(['schema-form']);
  }
}
