import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { SplitButtonModule } from 'primeng/splitbutton';
import { AvatarModule } from "primeng/avatar";
import { DashboardComponent } from './dashboard/dashboard.component';
import { CardModule } from 'primeng/card';
import { PanelModule } from 'primeng/panel';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ShareModule } from '../share/share.module';
import { TooltipModule } from 'primeng/tooltip';
import { TagModule } from 'primeng/tag';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import {DividerModule} from 'primeng/divider';
import { DialogModule } from 'primeng/dialog';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
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
    AvatarModule, CardModule,
    PanelModule, BrowserAnimationsModule, ShareModule, TooltipModule, TagModule, TableModule,InputTextModule,InputNumberModule,DividerModule,DialogModule,MessagesModule,MessageModule
  ],
  exports: [RouterModule, ToolbarModule, ButtonModule]
})
export class UiModule { }
