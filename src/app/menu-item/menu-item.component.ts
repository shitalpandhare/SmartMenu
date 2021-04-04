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
  isValidForm: boolean = false;

  days = [false, false, false, false, false, false, false, false];

  weekdays = [];
  planet = new Map<string, boolean>();
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

    this.planet.set('Sun', false);
    this.planet.set('Mon', true);

    console.log(this.planet.get('Sun'));
    console.log(this.planet);
  }

  onSubmit() {
    this.isUpdateMode ? (this.isValidForm = true) : (this.isValidForm = false);
    console.log(this.form.valid, this.isValidForm);
    if (!this.form.valid || !this.isValidForm) {
      console.log('in val');
      return;
    }
    console.log(this.form.value);

    if (!this.isUpdateMode) {
      let index = this.menuService.menuItems.length - 1;
      this.id = this.menuService.menuItems[index].menuItemId + 1;
      this.obj.menuItemId = this.id;
      this.obj.createdOn = new Date();
      this.menuService.createMenu(this.obj);
    } else {
      this.isValidForm = true;
      this.menuService.updateMenu(this.id, this.obj);
    }
    this.router.navigate(['/smartmenu/menu-list']);
  }

  // date Validation
  error: any = { isError: false, errorMessage: '' };

  dateValidation() {
    this.error.isError = false;
    if (
      new Date(this.form.controls['endDate'].value) <
      new Date(this.form.controls['startDate'].value)
    ) {
      this.isValidForm = false;
      this.error = {
        isError: true,
        errorMessage: 'End Date cant before start date',
      };
      console.log(this.error.errorMessage);
    } else {
      const oneDay = 24 * 60 * 60 * 1000;
      const firstDate = new Date(this.form.controls['startDate'].value);
      const secondDate = new Date(this.form.controls['endDate'].value);
      const diffDays = Math.round(
        Math.abs((secondDate.getTime() - firstDate.getTime()) / oneDay)
      );

      if (diffDays >= 6) {
        this.weekdays = [];
        this.days = [];
        this.obj.frequency = 'EveryDay';
        this.days[7] = true;
      } else {
        this.weekdays = [];
        this.days = [];
        var from = new Date(this.form.controls['startDate'].value);
        var to = new Date(this.form.controls['endDate'].value);
        var DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

        var d = from;
        while (d <= to) {
          this.weekdays.push(DAYS[d.getDay()]);
          this.days[d.getDay()] = true;
          d = new Date(d.getTime() + 24 * 60 * 60 * 1000);
        }

        this.obj.frequency = this.weekdays.toString();
        console.log(this.weekdays);
      }
      this.isValidForm = true;
    }
  }
}
