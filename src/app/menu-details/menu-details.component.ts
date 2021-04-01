import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { MenuService } from '../shared/menu.service';

import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faClock } from '@fortawesome/free-solid-svg-icons';

import { ActivatedRoute, Router } from '@angular/router';
import { MenuData } from '../shared/menu-data.model';

@Component({
  selector: 'app-menu-details',
  templateUrl: './menu-details.component.html',
  styleUrls: ['./menu-details.component.css'],
})
export class MenuDetailsComponent implements OnInit, AfterViewInit {
  faAngleLeft = faAngleLeft;
  faTrashAlt = faTrashAlt;
  faEdit = faEdit;
  faClock = faClock;

  @ViewChild('closebutton') closebutton;
  @ViewChild('exampleModal') myModal: ElementRef;

  id: number;
  menuItem: MenuData;

  constructor(
    private menuService: MenuService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((res) => {
      this.id = res['id'];
      this.menuItem = this.menuService.getMenuItemById(this.id);
    });
  }

  ngAfterViewInit() {
    this.myModal.nativeElement.click();

    //
  }

  onBackButton() {
    console.log('here');
    this.router.navigate(['smartmenu/menu-list']);
    this.closebutton.nativeElement.click();
  }

  onDeleteMenuItem() {
    this.menuService.deleteMenuItemById(this.id);
    this.router.navigate(['smartmenu/menu-list']);
    this.closebutton.nativeElement.click();
  }

  onEdit() {
    this.closebutton.nativeElement.click();
    this.router.navigate(['smartmenu/menu-item'], {
      queryParams: { id: this.id },
    });
  }
}
