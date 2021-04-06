import { Component, OnInit } from '@angular/core';
import { MenuService } from './shared/menu.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'SmartMenu';
  isUpdateMode: Boolean;
  constructor(private menuService: MenuService) {}

  ngOnInit() {
    this.menuService.updateModeEvent.subscribe((res) => {
      this.isUpdateMode = res;
    });
  }
}
