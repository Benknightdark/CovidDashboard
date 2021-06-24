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
        type: 'area',
        name: 'Confirmed111',
        data: [[0, 0]]
      },
    ]
  }
  chartOptions2: Highcharts.Options = {
    series: [
      {
        type: 'area',
        name: 'Confirmed111',
        data: [[0, 0]]
      },
    ]
  }
  chartOptions3: Highcharts.Options = {
    series: [
      {
        type: 'area',
        name: 'Confirmed111',
        data: [[0, 0]]
      },
    ]
  }
  chartOptions4: Highcharts.Options = {
    series: [
      {
        type: 'area',
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
    this.shoLoading = true;
    this.displayBasic2 = true;
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
    this.countryHistory$ = this.dashBoardService.country(slug);
    this.countryHistory$.pipe(map(a => {
      const r1 = rootOptions
      r1.title.text = 'Deaths';
      (r1.series as any[]).push({
        type: 'area',
        name: 'Deaths',
        data: a.map(data => {
          return [new Date(data.Date).getTime(), data.Deaths]
        })
      })
      this.chartOptions=r1 as Highcharts.Options;

      const r2 = rootOptions
      r2.title.text = 'Confirmed';
      (r2.series as any[]).push({
        type: 'area',
        name: 'Confirmed',
        data: a.map(data => {
          return [new Date(data.Date).getTime(), data.Confirmed]
        })
      })
      this.chartOptions2=r2 as Highcharts.Options;

      const r3 = rootOptions
      r3.title.text = 'Recovered';
      (r3.series as any[]).push({
        type: 'area',
        name: 'Recovered',
        data: a.map(data => {
          return [new Date(data.Date).getTime(), data.Recovered]
        })
      })
      this.chartOptions3=r3 as Highcharts.Options;



      const r4 = rootOptions
      r4.title.text = 'Active';
      (r4.series as any[]).push({
        type: 'area',
        name: 'Active',
        data: a.map(data => {
          return [new Date(data.Date).getTime(), data.Active]
        })
      })
      this.chartOptions4=r4 as Highcharts.Options;

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


