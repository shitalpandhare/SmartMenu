import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { MenuData } from './menu-data.model';

@Injectable({
  providedIn: 'root',
})
export class MenuService implements OnInit {
  public menuItems: MenuData[] = [];

  updatedMenuItems = new BehaviorSubject<MenuData[]>(this.menuItems);
  updateModeEvent = new BehaviorSubject<Boolean>(false);

  constructor() {}

  ngOnInit() {}

  createMenu(menuItem: MenuData) {
    this.menuItems.push(menuItem);
    this.updatedMenuItems.next(this.menuItems);
    console.log('menus items');
    console.log(this.menuItems);
  }

  getMenuItems() {
    return this.menuItems;
  }

  deleteMenuItemById(id: number) {
    this.menuItems.map((i, j) => {
      if (i.menuItemId == id) {
        this.menuItems.splice(j, 1);
        this.updatedMenuItems.next(this.menuItems);
        console.log(this.menuItems);
      }
    });
  }

  getMenuItemById(id: number) {
    let menuItem: MenuData;
    this.menuItems.forEach((menu: MenuData) => {
      if (menu.menuItemId == id) {
        menuItem = menu;
      }
    });
    return menuItem;
  }

  updateMenu(id: number, obj: MenuData) {
    this.menuItems.map((i, j) => {
      if (i.menuItemId == id) {
        this.menuItems[j] = obj;
      }
    });
  }
}
