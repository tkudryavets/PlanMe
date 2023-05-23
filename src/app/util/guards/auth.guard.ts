import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { AuthState } from 'app/states/auth/auth.state';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})

export class CheckAuth implements CanActivate {
  constructor(private router: Router, private store: Store) {}

  canActivate(): Observable<boolean> | boolean {
    const isLoggedIn = this.store.selectSnapshot(AuthState.isLoggedIn)

    if (!isLoggedIn) {
      this.router.navigateByUrl('/login');
      return false;
    }
    return true;
  }
}
