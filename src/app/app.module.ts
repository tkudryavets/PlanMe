import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { PageWrapperModule } from './components/shared/page-wrapper/page-wrapper.module';
import { NavPanelModule } from './components/shared/nav-panel/nav-panel.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule, 
    PageWrapperModule,
    NavPanelModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
