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
    frequency: '',
    createdBy: 'Shital',
    createdOn: null,
  };
  id: number;
  isUpdateMode: boolean = false;
  isValidForm: boolean = false;

  weekdays = [];
  dys = new Map<string, boolean>([
    ['Mon', false],
    ['Tue', false],
    ['Wed', false],
    ['Thu', false],
    ['Fri', false],
    ['Sat', false],
    ['EveryDay', false],
  ]);

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

        // for update frq buttons
        let frq = this.obj.frequency.split(',');
        for (let f of frq) {
          this.dys.set(f, true);
        }
        this.isUpdateMode = true;
        this.isValidForm = true;
      }
    });
  }

  onSubmit() {
    if (!this.form.valid || !this.isValidForm) {
      return;
    }

    if (!this.isUpdateMode) {
      if (this.menuService.menuItems.length >= 1) {
        let index = this.menuService.menuItems.length - 1;
        this.id = this.menuService.menuItems[index].menuItemId + 1;
      } else {
        this.id = 0;
      }

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

      this.dys.clear();
    } else {
      const oneDay = 24 * 60 * 60 * 1000;
      const firstDate = new Date(this.form.controls['startDate'].value);
      const secondDate = new Date(this.form.controls['endDate'].value);
      const diffDays = Math.round(
        Math.abs((secondDate.getTime() - firstDate.getTime()) / oneDay)
      );

      if (diffDays >= 6) {
        this.weekdays = [];
        this.dys.clear();
        this.obj.frequency = 'EveryDay';
        this.dys.set('EveryDay', true);
      } else {
        this.weekdays = [];
        this.dys.clear();

        var from = new Date(this.form.controls['startDate'].value);
        var to = new Date(this.form.controls['endDate'].value);
        var DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        var d = from;

        while (d <= to) {
          this.dys.set(DAYS[d.getDay()], true);
          d = new Date(d.getTime() + 24 * 60 * 60 * 1000);
        }
        for (let key of this.dys.keys()) {
          this.weekdays.push(key);
        }
        this.obj.frequency = this.weekdays.toString();
      }
      this.isValidForm = true;
    }
  }
}
