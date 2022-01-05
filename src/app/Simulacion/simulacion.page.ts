import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Goal, Rule, Saving } from '../app.module';
import { FootballApiService } from '../services/football-api.service';
import { GoalsService } from '../services/goals.service';

@Component({
  selector: 'app-simulacion',
  templateUrl: 'simulacion.page.html',
  styleUrls: ['simulacion.page.scss']
})
export class SimulacionPage implements OnInit {

  public goals: Goal[];
  // public teams: any[];
  constructor(private footballService: FootballApiService, private goalsService: GoalsService, private router: Router) {}

  ngOnInit(): void {
    this.router.events.subscribe(res => {
      if (res instanceof NavigationEnd) {
        this.getValues();
      }
    });
  }

  /**
   * getValues
   */
  public getValues() {
    this.footballService.getEPLTeams().subscribe(res => {
      this.goals = this.goalsService.getGoals() as Goal[];
      this.goals.forEach(goal => {
        goal.savingAmount = 0;
        goal.rules.forEach(rule => {
          [rule.savingAmount, rule.occurrences, rule.savings, rule.teamName] =
          [0, 0, [], res.teams.find(team => team.id === rule.teamId).name];
          this.footballService.getEPLTeamMatches(rule.teamId).pipe().subscribe(success => {
            rule.matches = success.matches.filter((match: any) => match?.competition?.name === 'Premier League');
            this.savings(rule, goal);
          });
        });
      });
    });
  }

  /**
   * formattedDate
   */
   public formattedDate(date: string): string {
    const fDate = new Date(date);
    return String(fDate.getDate()).concat('-', String(fDate.getMonth() + 1), '-', String(fDate.getFullYear()));
  }

  private savings(rule: Rule, goal: Goal): void {
    console.log(rule);
    rule.matches.forEach(match => {
      const isAway = match.awayTeam.id === rule.teamId;
      let canSave = true;
      const saving: Saving = {
        occurrences: 0,
        savingAmount: 0,
        rival: null,
        ruleType: null,
        imageUrl: null,
        matchDay: null
      };
      switch (rule.event) {
        case 'Jugar':
          [ saving.ruleType, saving.imageUrl, saving.savingAmount ] =
          [ 'jugar un partido', '../../assets/football.png', rule.amount];
          saving.occurrences ++;
          rule.occurrences ++;
          goal.occurrences ++;
          rule.savingAmount += rule.amount;
          goal.savingAmount += rule.amount;
          break;
        case 'Ganar':
          [canSave, saving.ruleType, saving.imageUrl, saving.savingAmount ] =
          [(isAway && match.score.winner === 'AWAY_TEAM') || (!isAway && match.score.winner === 'HOME_TEAM') ,
          'ganar un partido', '../../assets/trophy.png', rule.amount];
          saving.occurrences ++;
          if (canSave) {
            rule.occurrences ++;
            goal.occurrences ++;
            rule.savingAmount += rule.amount;
            goal.savingAmount += rule.amount;
          }
          break;
        case 'Cada Gol':
          saving.occurrences = isAway ? match.score.fullTime.awayTeam :match.score.fullTime.homeTeam;
          if (canSave) {
            rule.occurrences += saving.occurrences;
            rule.savingAmount += (rule.amount * saving.occurrences);
            goal.savingAmount += (rule.amount * saving.occurrences);
          }
          [canSave, saving.ruleType, saving.imageUrl, saving.savingAmount ] =
          [ saving.occurrences > 0 , 'anotar '.concat(String(saving.occurrences), saving.occurrences > 1 ? 'goles' : 'gol'),
          '../../assets/football-ball.png',rule.amount * saving.occurrences];
          break;
      }
      [saving.matchDay, saving.rival] = [this.formattedDate(match.utcDate), isAway ? match.homeTeam.name : match.awayTeam.name];
      if (canSave) {
        rule.savings.push(saving);
      }
    });
    switch (rule.event) {
      case 'Jugar':
        rule.event = 'jugó '.concat(String(rule.occurrences), rule.occurrences > 1 ? ' partidos ' : ' partido ');
        break;
      case 'Ganar':
        rule.event = 'ganó '.concat(String(rule.occurrences), rule.occurrences > 1 ? ' partidos ' : ' partido ');
        break;
      case 'Cada Gol':
        rule.event = 'anotó '.concat(String(rule.occurrences), rule.occurrences > 1 ? ' goles ' : ' gol ');
        break;
    }
  }

}
