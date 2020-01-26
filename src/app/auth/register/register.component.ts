import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {
  sub: Subscription;
  errorMessage;
  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) { }

  registrationForm = this.fb.group({
      firstname: ['', [Validators.required, Validators.minLength(2)]],
      lastname: ['', [Validators.required, Validators.minLength(2)]],
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
  });
  get firstname() {
    return this.registrationForm.get('firstname');
  }
  get lastname() {
    return this.registrationForm.get('lastname');
  }
  get username() {
    return this.registrationForm.get('username');
  }
  get email() {
    return this.registrationForm.get('email');
  }
  get password() {
    return this.registrationForm.get('password');
  }
  ngOnInit() {
  }

  registerUser() {
    this.sub = this.auth.registerUser(this.registrationForm.value)
      .subscribe(result => {
      console.log(result);
      // localStorage.setItem('token', result.token);
      this.router.navigate(['auth/login']);
    },
    error => {
          console.log(error.error.error);
          this.errorMessage = error.error.error.startsWith('E11000 duplicate key') ? 'Username or email is already taken.' :
            'Please, fill in valid information';
    }
  );
  }
  onSubmit() {
    console.log(this.registrationForm.value);
  }
  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
