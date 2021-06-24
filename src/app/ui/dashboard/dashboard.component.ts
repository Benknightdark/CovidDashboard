import { Global, Country, Summary, CountryList } from './../../models/data';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { DashboardService } from '../../services/dashboard.service';
import { debounceTime, distinctUntilChanged, map, retry, share } from 'rxjs/operators';
import { of } from 'rxjs/internal/observable/of';
import { CountryHistory } from '../../models/data';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {}
  global$: Observable<Global> = of<Global>();
  message$: Observable<string> = of<string>();
  countriesCurrent: Country[] = [];
  countryList$: Observable<CountryList[]> = of<CountryList[]>();
  countryHistory$: Observable<CountryHistory[]> = of<CountryHistory[]>();
  displayBasic2: boolean = false;
  display:boolean=false;
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
  async showBasicDialog2(slug: string) {
    console.log(slug)
    this.countryHistory$ = this.dashBoardService.country(slug);
    this.countryHistory$.subscribe(a => {
      console.log(a)
    })
    this.chartOptions = await this.countryHistory$.pipe(map(a => {
      return {
        chart: {
          zoomType: 'x'
        },
        title: {
          text: 'history'
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
          {
            type: 'area',
            name: 'Deaths',
            data: a.map(data => {
              return [new Date(data.Date).getTime(), data.Deaths]
            })
          },
          {
            type: 'area',
            name: 'Confirmed',
            data: a.map(data => {
              return [new Date(data.Date).getTime(), data.Confirmed]
            })
          },
          {
            type: 'area',
            name: 'Recovered',
            data: a.map(data => {
              return [new Date(data.Date).getTime(), data.Recovered]
            })
          },
          {
            type: 'area',
            name: 'Active',
            data: a.map(data => {
              return [new Date(data.Date).getTime(), data.Active]
            })
          }
        ]
      }
    })).toPromise() as Highcharts.Options;

    console.log(this.chartOptions)

    this.displayBasic2 = true;

  }

}


