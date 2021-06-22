import { Component, OnInit } from '@angular/core';
import {DashboardService} from '../../services/dashboard.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private dashBoardService: DashboardService) {
    dashBoardService.summary().subscribe(r => {
      console.log('summary')
      console.log(r)
    })
    dashBoardService.countryList().subscribe(r=>{
      console.log('countryList')

      console.log(r)
    })
    dashBoardService.country('south-africa').subscribe(r=>{
      console.log('history')
      console.log(r)
    })
  }


  ngOnInit(): void {
  }

}
