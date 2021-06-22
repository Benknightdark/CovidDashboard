import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { SplitButtonModule } from 'primeng/splitbutton';
const routes: Routes = [
  {
    path: 'notfound',
    component: NotFoundComponent
  },
];

@NgModule({
  declarations: [
    NotFoundComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ToolbarModule,
    ButtonModule,
    SplitButtonModule,
  ],
  exports: [RouterModule, ToolbarModule,
    ButtonModule,
    SplitButtonModule,]
})
export class UiModule { }
