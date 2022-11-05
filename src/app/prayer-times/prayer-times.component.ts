import { Datum, salatApiResponse } from './interfaces/index';
import { PrayerService } from './prayer.service';
import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { map, Observable, of, timer } from 'rxjs';
import { DatePipe, formatDate } from '@angular/common';

@Component({
  selector: 'app-prayer-times',
  templateUrl: './prayer-times.component.html',
  styleUrls: ['./prayer-times.component.scss'],
})
export class PrayerTimesComponent implements OnInit {
  response: any;
  dateTime: Observable<Date> = of(new Date());
  formatedDate: any;
  salatTime: Datum | undefined;

  constructor(
    @Inject(LOCALE_ID) private locale: string,
    private prayerService: PrayerService
  ) {
    this.formatedDate = formatDate(Date.now(), 'dd-MM-YYYY', this.locale);
    const storage: Array<Datum[]> | null =
      this.prayerService.getPrayersFromLocal();
    if (storage) {
      this.getPrayers(storage);
    } else {
      this.prayerService.getPrayer().subscribe((res: salatApiResponse) => {
        const liste: Array<Datum[]> = [];
        for (let i = 1; i <= 12; i++) {
          liste.push(res.data[i]);
        }
        console.log(liste);
        localStorage.setItem('prayers', JSON.stringify(liste));
        this.getPrayers(liste);
      });
    }
  }

  ngOnInit(): void {
    this.dateTime = timer(0, 1000).pipe(
      map(() => {
        return new Date();
      })
    );
  }

  getPrayers(storage: Array<Datum[]>) {
    const currentMonth: Datum[] = storage[new Date().getMonth()];
    this.salatTime = currentMonth.find(
      (time) => time.date.gregorian.date == this.formatedDate
    );
  }
}
