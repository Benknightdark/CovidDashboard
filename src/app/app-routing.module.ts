import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './ui/not-found/not-found.component';

const routes: Routes = [
  {
    path: 'country',
    loadChildren: () => import('./country/country.module').then(m => m.CountryModule)
  },
  {path: '', redirectTo: '/country', pathMatch: 'full'},

  {path: '**', component: NotFoundComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
