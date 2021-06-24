import { Global, Country, CountryList } from './../../models/data';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { DashboardService } from '../../services/dashboard.service';
import { catchError, debounceTime, distinctUntilChanged, map, retry, share } from 'rxjs/operators';
import { CountryHistory } from '../../models/data';
import * as Highcharts from 'highcharts';
import { of } from 'rxjs/internal/observable/of';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {
    series: [
      {
        type: 'line',
        name: 'Confirmed111',
        data: [[0, 0]]
      },
    ]
  }
  shoLoading: Boolean = false;
  global$: Observable<Global> = of<Global>();
  message$: Observable<string> = of<string>();
  countriesCurrent: Country[] = [];
  countryList$: Observable<CountryList[]> = of<CountryList[]>();
  countryHistory$: Observable<CountryHistory[]> = of<CountryHistory[]>();
  displayBasic2: boolean = false;
  display: boolean = false;
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
    this.message$ = summaryData.pipe(map(a => a.Message));
    this.countriesCurrent = (await summaryData.pipe(map(a => a.Countries)).toPromise());
    this.countryList$ = this.dashBoardService.countryList();
  }
  showBasicDialog2(slug: string) {
    const rootOptions = {
      chart: {
        zoomType: 'x'
      },
      title: {
        text: ''
      },

      xAxis: {
        type: 'datetime'
      },
      yAxis: {
        title: {
          text: 'Count'
        }
      },
      legend: {
        enabled: true
      },
      plotOptions: {
        area: {
          marker: {
            radius: 2
          },
          lineWidth: 1,
          states: {
            hover: {
              lineWidth: 1
            }
          },
          threshold: null
        }
      },
      credits: {
        enabled: false
      },
      series: [
      ]
    }
    this.displayBasic2 = true;
    this.shoLoading=true;
    this.countryHistory$ = this.dashBoardService.country(slug);
    this.countryHistory$.pipe(map(a => {
      const r1 = rootOptions
      r1.title.text = slug;
     (r1.series as any[])=[];
      (r1.series as any[]).push({
        type: 'line',
        name: '每日總死亡人數',
        data: a.map(data => {
          return [new Date(data.Date).getTime(), data.Deaths]
        })
      });
      (r1.series as any[]).push({
        type: 'line',
        name: '每日總確診人數',
        data: a.map(data => {
          return [new Date(data.Date).getTime(), data.Confirmed]
        })
      });
      (r1.series as any[]).push({
        type: 'line',
        name: '每日總康復人數',
        data: a.map(data => {
          return [new Date(data.Date).getTime(), data.Recovered]
        })
      });
      (r1.series as any[]).push({
        type: 'line',
        name: 'Active',
        data: a.map(data => {
          return [new Date(data.Date).getTime(), data.Active]
        })
      });
      this.chartOptions = r1 as Highcharts.Options;
      this.shoLoading = false;
    }), catchError(err => {
      this.shoLoading = false;
      console.error(err)
      return of({})
    }),
    ).subscribe();

    // console.log(this.chartOptions)


  }

}


