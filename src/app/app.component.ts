// app.component.ts

import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  activeSubMenu: string = '';

  toggleSubMenu(subMenu: string): void {
    const currentSubMenu = this.activeSubMenu;
    this.activeSubMenu = (currentSubMenu === subMenu) ? '' : subMenu;

    const arrow = document.querySelector(`.${subMenu} .arrow`);
    if (arrow) {
      arrow.classList.toggle('collapsed', currentSubMenu === subMenu);
    }
  }
}
