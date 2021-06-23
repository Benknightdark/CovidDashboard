import { Global, Country, Summary } from './../../models/data';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { DashboardService } from '../../services/dashboard.service';
import { map, share } from 'rxjs/operators';
import { of } from 'rxjs/internal/observable/of';
import { BehaviorSubject, Subject } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  global$: Observable<Global> = of<Global>();
  countries$: Observable<Country[]> = of<Country[]>();
  constructor(private dashBoardService: DashboardService) {
    const summaryData = dashBoardService.summary().pipe(share());
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


