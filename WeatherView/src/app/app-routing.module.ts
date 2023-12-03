import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { WeatherinsightsComponent } from './weatherinsights/weatherinsights.component';
import { ProfileComponent } from './profile/profile.component';
const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'weather-insights', component: WeatherinsightsComponent },
  { path: 'profile', component: ProfileComponent },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
