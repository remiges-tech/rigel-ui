import { Component, LOCALE_ID, Inject } from '@angular/core';


interface Locale {
  localeCode: string;
  label: string;
}

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.scss']
})
export class TopMenuComponent {

  constructor(@Inject(LOCALE_ID) public locale: string) {}

  
  selectedLocale: string = this.locale;

 // array of locales
  locales: Locale[] = [
    { localeCode: "en-US", label: "English" },
    { localeCode: "hi", label: "Hindi" },
    { localeCode: "gu", label: "Gujrati" },
    { localeCode: "mr", label: "Marathi" },
    { localeCode: "ar", label: "Arabic" },
  ];

  navigateToLocale(localeCode: string): void {
    this.selectedLocale = this.locale;
    const url = `/${localeCode}`; 
    window.location.href = url;  // Change the window location directly
  }

}
