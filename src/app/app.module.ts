import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { NavPanelModule } from './components/shared/nav-panel/nav-panel.module';
import { MatDialogModule } from '@angular/material/dialog';
import { provideAnimations } from '@angular/platform-browser/animations';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { PlansState } from './states/plans.state';
import { NgxsModule } from '@ngxs/store';
import { AuthState } from './states/auth/auth.state';
import { CookieService } from "ngx-cookie-service";
import { PageWrapperModule } from './components/shared/page-wrapper/page-wrapper.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule, 
    PageWrapperModule,
    NavPanelModule,
    MatDialogModule,
    NgxsModule.forRoot([PlansState, AuthState])
  ],
  providers: [ provideAnimations(), { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }, CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
