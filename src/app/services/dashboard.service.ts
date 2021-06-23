import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CountryHistory, Summary, CountryList } from '../models/data';
@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }
  summary = () => this.http.get<Summary>('/api/covid19/summary')
  country = (slug:string) => this.http.get<CountryHistory[]>(`/api/covid19/country/${slug}`)
  countryList = () => this.http.get<CountryList[]>(`/api/covid19/countries`)

}
