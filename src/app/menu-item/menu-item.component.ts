import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MenuData } from '../shared/menu-data.model';
import { MenuService } from '../shared/menu.service';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.css'],
})
export class MenuItemComponent implements OnInit {
  @ViewChild('f') form: NgForm;

  id: number;
  constructor(private menuService: MenuService) {}

  ngOnInit(): void {}

  onSubmit() {
    let index = this.menuService.menuItems.length - 1;
    console.log(index);
    this.id = this.menuService.menuItems[index].menuItemId + 1;

    let obj: MenuData = {
      menuItemId: this.id,
      menuName: this.form.value.menuName,
      menuMenus: this.form.value.menuMenus,
      startDate: this.form.value.startDate,
      endDate: this.form.value.endDate,
      startTime: this.form.value.startTime,
      endTime: this.form.value.endTime,
      frequency: 'week days',
      createdBy: 'Shital',
      createdOn: new Date(),
    };

    this.menuService.createMenu(obj);
  }
}
