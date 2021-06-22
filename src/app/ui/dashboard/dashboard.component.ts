import { Global, Country } from './../../models/data';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { DashboardService } from '../../services/dashboard.service';
import { map } from 'rxjs/operators';
import { of } from 'rxjs/internal/observable/of';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  global$: Observable<Global> = of<Global>();
  countries$: Observable<Country[]> = of<Country[]>();

  constructor(private dashBoardService: DashboardService) {
    const summaryData = dashBoardService.summary();
    this.global$ = summaryData.pipe(map(a => a.Global));
    this.countries$ = summaryData.pipe(map(a => a.Countries))

    dashBoardService.countryList().subscribe(r => {
      console.log('countryList')
      console.log(r)
    })
    dashBoardService.country('south-africa').subscribe(r => {
      console.log('history')
      console.log(r)
    })
  }


  ngOnInit(): void {
  }

}
function switchMap(arg0: (a: any) => any): import("rxjs").OperatorFunction<import("./../../models/data").Summary, unknown> {
  throw new Error('Function not implemented.');
}

function tap(arg0: (a: any) => any): import("rxjs").OperatorFunction<import("./../../models/data").Summary, unknown> {
  throw new Error('Function not implemented.');
}

function pick(): import("rxjs").OperatorFunction<import("./../../models/data").Summary, unknown> {
  throw new Error('Function not implemented.');
}

function pluck(arg0: (a: any) => any): import("rxjs").OperatorFunction<import("./../../models/data").Summary, unknown> {
  throw new Error('Function not implemented.');
}

