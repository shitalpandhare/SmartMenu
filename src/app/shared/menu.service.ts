import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MenuData } from './menu-data.model';

@Injectable({
  providedIn: 'root',
})
export class MenuService implements OnInit {
  public menuItems: MenuData[] = [
    {
      menuItemId: 1,
      menuName: 'menu1',
      menuMenus: 'menu 2',
      startDate: new Date(),
      endDate: new Date(),
      startTime: '04:13',
      endTime: '04:15',
      frequency: 'week days',
      createdBy: 'Shital',
      createdOn: new Date(),
    },
  ];

  updatedMenuItems = new BehaviorSubject<MenuData[]>(this.menuItems);

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
}
