import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../../auth/auth.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit, OnDestroy {
  sub: Subscription;
  user;
  constructor(private auth: AuthService) { }

  ngOnInit() {
    if (this.auth.loggedIn()) {
      this.getUser();
    }
  }
  getUser() {
    this.sub = this.auth.getUser()
      .subscribe(result => {
        console.log(result);
        this.user = JSON.parse(JSON.stringify(result['data'].username));
      },
        error => {
          console.log(error);
        }
    );
  }
  ngOnDestroy() {
   if (this.sub) {
     this.sub.unsubscribe();
   }
  }
}
