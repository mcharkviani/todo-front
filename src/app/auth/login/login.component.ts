import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  sub: Subscription;
  errorMessage;
  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) { }

  loginForm = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(3)]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });
  get username() {
    return this.loginForm.get('username');
  }
  get password() {
    return this.loginForm.get('password');
  }
  ngOnInit() {
  }

  loginUser() {
    this.sub = this.auth.loginUser(this.loginForm.value)
      .subscribe(result => {
          console.log(result);
          localStorage.setItem('token', result.token);
          this.router.navigate(['/tasks']);
        },
        error => {
          console.log(error);
          this.errorMessage = error.error;
        }
      );
  }

  onSubmit() {
    console.log(this.loginForm.value);
  }
  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
