import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuData } from '../shared/menu-data.model';
import { MenuService } from '../shared/menu.service';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.css'],
})
export class MenuItemComponent implements OnInit {
  @ViewChild('f') form: NgForm;

  obj: MenuData = {
    menuItemId: null,
    menuName: '',
    menuMenus: '',
    startDate: null,
    endDate: null,
    startTime: null,
    endTime: null,
    frequency: 'week days',
    createdBy: 'Shital',
    createdOn: null,
  };
  id: number;
  isUpdateMode: boolean = false;
  minDate = new Date();

  constructor(
    private menuService: MenuService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      if (+params.get('id')) {
        this.id = +params.get('id');
        this.obj = this.menuService.getMenuItemById(this.id);
        this.isUpdateMode = true;
      }
    });
  }

  onSubmit() {
    if (!this.form.valid) {
      return;
    }
    console.log(this.form.valid);
    let startdate = this.obj.startDate;
    let enddate = this.obj.endDate;

    if (!this.isUpdateMode) {
      let index = this.menuService.menuItems.length - 1;
      this.id = this.menuService.menuItems[index].menuItemId + 1;
      this.obj.menuItemId = this.id;
      this.obj.createdOn = new Date();
      this.menuService.createMenu(this.obj);
    } else {
      this.menuService.updateMenu(this.id, this.obj);
    }
    this.router.navigate(['/smartmenu/menu-list']);
  }

  error: any = { isError: false, errorMessage: '' };

  dateValidation() {
    this.error.isError = false;
    if (
      new Date(this.form.controls['endDate'].value) <
      new Date(this.form.controls['startDate'].value)
    ) {
      this.error = {
        isError: true,
        errorMessage: 'End Date cant before start date',
      };
      console.log(this.error.errorMessage);
    }
  }
}
