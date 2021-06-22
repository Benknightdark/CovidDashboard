import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

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
