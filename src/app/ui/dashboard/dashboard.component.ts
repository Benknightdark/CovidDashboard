import { Global, Country, Summary, CountryList } from './../../models/data';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { DashboardService } from '../../services/dashboard.service';
import { debounceTime, distinctUntilChanged, map, retry, share } from 'rxjs/operators';
import { of } from 'rxjs/internal/observable/of';
import { CountryHistory } from '../../models/data';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  global$: Observable<Global> = of<Global>();
  countriesCurrent: Country[] = [];
  countryList$: Observable<CountryList[]> = of<CountryList[]>();
  countryHistory$: Observable<CountryHistory[]> = of<CountryHistory[]>();
  columnDisplayArray = {
    NewConfirmed: "每日最新確診人數",
    TotalConfirmed: "每日總確診人數",
    NewDeaths: "每日最新死亡人數",
    TotalDeaths: "每日總死亡人數",
    NewRecovered: "每日最新康復人數",
    TotalRecovered: "每日總康復人數"
  }
  constructor(private dashBoardService: DashboardService) {
    // this.countryHistory$ = dashBoardService.country('south-africa');
  }
  async ngOnInit(): Promise<void> {
    const summaryData = this.dashBoardService.summary().pipe(share(),
      debounceTime(300),
      distinctUntilChanged(),
      retry(5));
    this.global$ = summaryData.pipe(map(a => a.Global));
    this.countriesCurrent = (await summaryData.pipe(map(a => a.Countries)).toPromise());
    this.countryList$ = this.dashBoardService.countryList();
  }

}


