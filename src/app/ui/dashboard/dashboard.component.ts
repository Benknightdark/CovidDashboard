import { Global, Country, Summary, CountryList } from './../../models/data';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { DashboardService } from '../../services/dashboard.service';
import { map, share } from 'rxjs/operators';
import { of } from 'rxjs/internal/observable/of';
import { BehaviorSubject, Subject } from 'rxjs';
import { CountryHistory } from '../../models/data';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  global$: Observable<Global> = of<Global>();
  countriesCurrent$: Observable<Country[]> = of<Country[]>();
  countryList$: Observable<CountryList[]> = of<CountryList[]>();
  countryHistory$: Observable<CountryHistory[]> = of<CountryHistory[]>();
  constructor(private dashBoardService: DashboardService) {
    const summaryData = dashBoardService.summary().pipe(share());
    this.global$ = summaryData.pipe(map(a => a.Global));
    this.countriesCurrent$ = summaryData.pipe(map(a => a.Countries));
    this.countryList$ = dashBoardService.countryList();
    // this.countryHistory$ = dashBoardService.country('south-africa');
  }


  ngOnInit(): void {

  }

}


