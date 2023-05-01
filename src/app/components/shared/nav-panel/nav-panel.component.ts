import { Component } from '@angular/core';
import { PageRefConst } from 'src/app/util/const/page-ref.const';

@Component({
  selector: 'app-nav-panel',
  templateUrl: './nav-panel.component.html',
  styleUrls: ['./nav-panel.component.scss'],
})

export class NavPanelComponent {
  public readonly navigationLinks = PageRefConst.NAV_PANEL_LINKS;
  public currentUser: string = '';

  constructor() {
   // this.currentUser = this.authService.currentUser;
  }
}
