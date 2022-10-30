import { salatApiResponse } from './interfaces/index';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, switchMap } from 'rxjs';

const API_BASE =
  'http://api.aladhan.com/v1/timingsByCity?city=Ans&country=Belgium&method=15';

@Injectable({
  providedIn: 'root',
})
export class PrayerService {
  constructor(private http: HttpClient) {}

  getPrayer() {
    return this.http.get<salatApiResponse>(
      'https://api.aladhan.com/v1/calendarByCity?city=Ans&country=Belgique&method=15&month=10&year=2022'
    );
  }
}
