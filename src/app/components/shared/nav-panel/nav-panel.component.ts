import { Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { LogoutAction } from 'app/states/auth/auth.actions';
import { PageRefConst } from 'app/util/const/page-ref.const';


@Component({
  selector: 'app-nav-panel',
  templateUrl: './nav-panel.component.html',
  styleUrls: ['./nav-panel.component.scss'],
})

export class NavPanelComponent {
  public readonly navigationLinks = PageRefConst.NAV_PANEL_LINKS;
  public currentUser: string = '';

  constructor(private store: Store) {}

  logout() {
    this.store.dispatch(new LogoutAction())
  }
}
