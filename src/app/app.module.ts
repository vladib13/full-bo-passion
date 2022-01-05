import { CommonModule } from '@angular/common';

import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AlertService } from './services/alert.service';
import { FootballApiService } from './services/football-api.service';
import { GoalsService } from './services/goals.service';
import { UserService } from './services/user.service';

export const RULE_EVENTS = [
  'Jugar', 'Ganar', 'Cada Gol'
];

export class Saving {
  savingAmount: number;
  rival: string;
  occurrences: number;
  ruleType: string;
  imageUrl: string;
  matchDay: string;
}

export class Rule {
  id: number;
  teamId: number;
  event: string;
  amount: number;
  matches?: any[];
  teamName?: string;
  savingAmount?: number;
  savings?: Saving[];
  occurrences?: number;
  // ruleType?: string;
}

export class Goal {
  id: number;
  type: string;
  date: string;
  amount: number;
  rules: Rule[];
  savingAmount?: number;
  occurrences?: number;
}


export class User {
  id: number;
  user: string;
  goals: Goal[];
}

@NgModule({
  declarations: [AppComponent, LoginComponent],
  entryComponents: [],
  imports: [BrowserModule, CommonModule, HttpClientModule, IonicModule.forRoot(), AppRoutingModule, ReactiveFormsModule, FormsModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, GoalsService, UserService, AlertService, FootballApiService],
  bootstrap: [AppComponent],
})
export class AppModule {}
