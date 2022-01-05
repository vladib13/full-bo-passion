import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Goal, Rule, RULE_EVENTS } from '../app.module';
import { AlertService } from '../services/alert.service';
import { FootballApiService } from '../services/football-api.service';
import { GoalsService, Response } from '../services/goals.service';
@Component({
  selector: 'app-crear-meta',
  templateUrl: 'crear-meta.page.html',
  styleUrls: ['crear-meta.page.scss']
})
export class CrearMetaPage implements OnInit {

  public goal: FormGroup;
  public events: string[];
  public teams: any[];

  constructor(private fb: FormBuilder, private alertService: AlertService, private router: Router,
    private route: ActivatedRoute, private goalService: GoalsService, private footballService: FootballApiService) {}

  private get minDate() {
    const minDate = new Date(new Date().getTime() + 2629800000);
    return minDate.toJSON();
  }

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
    this.events = RULE_EVENTS;
    this.footballService.getEPLTeams().subscribe(res => {
      this.teams = res.teams;
    });
    this.route.queryParams.subscribe(res => {
      if (res.id) {
        const goal = (this.goalService.getGoals(Number(res.id)) as Goal);
        this.goal = this.createForm(goal);
        console.log(goal.rules);
        goal.rules.forEach(rule => this.addRule(rule));
      } else {
        this.goal = this.createForm();
        this.addRule();
      }
    });
  }

  /**
   * onSubmit
   */
  public onSubmit(): void {
    if (this.goal.valid) {
      this.goalService.saveGoal(this.goal.value as Goal).subscribe(
        (response: Response) => {
          if (response.result) {
            this.alertService.notify('Excelente', response.message, this.backToList, this);
          } else {
            this.alertService.notify('Error', response.message);
          }
        }
      );
    } else {
      this.alertService.notify('Error', 'Todos los campos son obligatorios');
    }
  }

  /**
   * backToList
   */
  public backToList(context: any) {
    context.router.navigate(['']);
  }

  /**
   * formattedDate
   */
  public formattedDate(date: string): string {
    const fDate = new Date(date);
    return String(fDate.getDate()).concat('-', String(fDate.getMonth() + 1), '-', String(fDate.getFullYear()));
  }

  public addRule(obj?: Rule) {
    const rules = this.goal.get('rules') as FormArray;
    rules.push(this.fb.group({
      id: [obj? obj.id : rules.length + 1],
      teamId: [obj? obj.teamId : null, Validators.required],
      event: [obj? obj.event : null, Validators.required],
      amount: [obj? obj.amount : null, Validators.required],
    }));
  }

  public deleteRule(i: number) {
    const rules = this.goal.get('rules') as FormArray;
    rules.removeAt(i);
  }

  private createForm(obj?: Goal): FormGroup {
    return this.fb.group({
      id: [obj? obj.id : null],
      type: [obj? obj.type : null, Validators.required],
      date: [obj? obj.date : this.minDate, Validators.required],
      amount: [obj? obj.amount : null, Validators.required],
      rules: this.fb.array([])
    });
  }

}
