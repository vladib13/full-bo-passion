import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from '../services/alert.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  public user: FormGroup;
  constructor(private alertService: AlertService, private fb: FormBuilder, private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.user = this.fb.group({
      name: ['', Validators.required]
    });
  }

  public onSubmit() {
    console.log(this.user);
    if (this.user.valid) {
      this.alertService.notify(this.userService.login(this.user.value.name),
      'A continuación le presentaremos su plan de ahorros de pasión futbolera y podrá manejar sus metas y reglas.', this.goToTabs, this);
    } else {
      this.alertService.notify('Error', 'Debe ingresar su nombre de usuario.');
    }
  }

  public goToTabs(context: any) {
    context.router.navigate(['']);
  }

}
