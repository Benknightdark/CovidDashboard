import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './ui/not-found/not-found.component';
import { DashboardComponent } from './ui/dashboard/dashboard.component';

const routes: Routes = [
  {
    path: 'country',
    loadChildren: () => import('./country/country.module').then(m => m.CountryModule)
  },
  {path: 'dashboard', component:DashboardComponent},

  {path: '', redirectTo: '/dashboard', pathMatch: 'full'},

  {path: '**', component: NotFoundComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
