import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  constructor(private http: HttpClient){
    http.get('/api/covid19').subscribe(r=>{
      console.log(r)
    })
  }

  ngOnInit(): void {
  }

}
