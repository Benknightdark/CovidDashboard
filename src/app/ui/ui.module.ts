import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { SplitButtonModule } from 'primeng/splitbutton';
import { AvatarModule } from "primeng/avatar";
import { DashboardComponent } from './dashboard/dashboard.component';
import {CardModule} from 'primeng/card';

const routes: Routes = [
  {
    path: 'notfound',
    component: NotFoundComponent
  },
];

@NgModule({
  declarations: [
    NotFoundComponent,
    DashboardComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ToolbarModule,
    ButtonModule,
    SplitButtonModule,
    AvatarModule,CardModule
  ],
  exports: [RouterModule, ToolbarModule,
    ButtonModule,
    SplitButtonModule,AvatarModule,CardModule]
})
export class UiModule { }
