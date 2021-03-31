import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuListComponent } from './menu-list/menu-list.component';
import { MenuItemComponent } from './menu-item/menu-item.component';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MenuDetailsComponent } from './menu-details/menu-details.component';

@NgModule({
  declarations: [AppComponent, MenuListComponent, MenuItemComponent, MenuDetailsComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NoopAnimationsModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    MatInputModule,
    FontAwesomeModule,
  ],
  exports: [MatPaginatorModule, MatSortModule, MatTableModule, MatInputModule],
  providers: [DatePipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
