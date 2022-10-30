import { PrayerTimesComponent } from './prayer-times/prayer-times.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'times', pathMatch: 'full' },
  { path: 'times', component: PrayerTimesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
