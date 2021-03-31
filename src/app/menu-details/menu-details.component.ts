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

  constructor(
    private menuService: MenuService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.myModal.nativeElement.click();
  }

  onBackButton() {
    console.log('here');
    this.router.navigate(['smartmenu/menu-list']);
    this.closebutton.nativeElement.click();
  }
}
