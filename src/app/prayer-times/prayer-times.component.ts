import { Datum } from './interfaces/index';
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
  formatedData: any;
  salatTime: Datum | undefined;

  constructor(
    @Inject(LOCALE_ID) private locale: string,
    private prayerTimesService: PrayerService
  ) {
    this.prayerTimesService
      .getPrayer()
      .pipe(
        map((res) => {
          this.formatedData = formatDate(Date.now(), 'dd-MM-YYYY', this.locale);
          this.salatTime = res.data.find(
            (time) => time.date.gregorian.date === this.formatedData
          );
          console.log(this.salatTime);
        })
      )
      .subscribe((res) => {
        this.response = res;
      });
  }

  ngOnInit(): void {
    this.dateTime = timer(0, 1000).pipe(
      map(() => {
        return new Date();
      })
    );
  }
}
