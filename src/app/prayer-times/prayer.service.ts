import { Datum, salatApiResponse } from './interfaces/index';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, LOCALE_ID } from '@angular/core';
import { Observable, switchMap } from 'rxjs';
import { formatDate } from '@angular/common';

const API_BASE =
  'http://api.aladhan.com/v1/timingsByCity?city=Ans&country=Belgium&method=15';

@Injectable({
  providedIn: 'root',
})
export class PrayerService {
  constructor(
    private http: HttpClient,
    @Inject(LOCALE_ID) private locale: string
  ) {}

  getPrayer() {
    let date = formatDate(Date.now(), 'dd-MM-YYYY', this.locale);
    return this.http.get<salatApiResponse>(
      'https://api.aladhan.com/v1/calendarByCity?city=Ans&country=Belgique&method=15&year=2022&annual=true&adjustment=1'
    );
  }

  getPrayersFromLocal(): Array<Datum[]> | null {
    const storage = localStorage.getItem('prayers');
    if (storage) {
      return JSON.parse(storage) as unknown as Array<Datum[]>;
    }
    return null;
  }
}
