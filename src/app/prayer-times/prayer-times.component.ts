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
  dateTime: Date = new Date();
  formatedDate: any;
  salatTime: Datum | undefined;
  nextPrayer: string = '';

  constructor(
    @Inject(LOCALE_ID) private locale: string,
    private prayerService: PrayerService
  ) {
    this.formatedDate = formatDate(Date.now(), 'dd-MM-YYYY', this.locale);
    timer(0, 1000).subscribe(() => {
      this.dateTime = new Date();
      this.checkNextPrayer();
      console.log(this.nextPrayer);
    });
  }

  ngOnInit(): void {
    this.loadPrayers();
  }

  checkNextPrayer() {
    const timingsTolistOrdered = [
      { salat: 'Fajr', time: this.salatTime?.timings.Fajr as string },
      { salat: 'Dhuhr', time: this.salatTime?.timings.Dhuhr as string },
      { salat: 'Asr', time: this.salatTime?.timings.Asr as string },
      { salat: 'Maghrib', time: this.salatTime?.timings.Maghrib as string },
      { salat: 'Isha', time: this.salatTime?.timings.Isha as string },
    ];
    const nextPrayers: string[] = [];
    timingsTolistOrdered.forEach((el) => {
      const [hours, minute] = el.time.split(':');
      if (new Date().getHours() < parseInt(hours)) {
        nextPrayers.push(el.salat);
      } else if (new Date().getHours() == parseInt(hours)) {
        if (new Date().getMinutes() <= parseInt(minute)) {
          nextPrayers.push(el.salat);
        }
      }
    });
    if (nextPrayers[0] == undefined) nextPrayers.push('Fajr');
    this.nextPrayer = nextPrayers[0];
  }

  loadPrayers() {
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

  getPrayers(storage: Array<Datum[]>) {
    const currentMonth: Datum[] = storage[new Date().getMonth()];
    this.salatTime = currentMonth.find(
      (time) => time.date.gregorian.date == this.formatedDate
    );
    console.log(this.salatTime);
  }
}
