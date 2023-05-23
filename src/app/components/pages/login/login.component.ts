import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { AuthAction } from 'app/states/auth/auth.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  public loginError = '';
  public form = new FormGroup({
    login: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  constructor(private store: Store) {}

  public submitForm() {
    let payload = {username: this.form.controls.login.value ?? '', password: this.form.controls.password.value ?? ''};
    if(this.form.controls.login.value?.length && this.form.controls.password.value?.length){
      console.log('submitform')
      this.store.dispatch(new AuthAction(payload))
    }
  }
}
