import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuDetailsComponent } from './menu-details/menu-details.component';
import { MenuItemComponent } from './menu-item/menu-item.component';
import { MenuListComponent } from './menu-list/menu-list.component';

const routes: Routes = [
  { path: 'smartmenu/menu-item', component: MenuItemComponent },
  {
    path: 'smartmenu/menu-list',
    component: MenuListComponent,
    children: [
      {
        path: 'menu-details/:id',
        component: MenuDetailsComponent,
      },
    ],
  },
  { path: '', redirectTo: 'smartmenu/menu-list', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
