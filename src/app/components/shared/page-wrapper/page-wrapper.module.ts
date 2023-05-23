import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageWrapperComponent } from './page-wrapper.component';
import { AppRoutingModule } from 'app/app-routing.module';

@NgModule({
  declarations: [PageWrapperComponent],
  imports: [CommonModule, AppRoutingModule],
  exports: [PageWrapperComponent],
})
export class PageWrapperModule {}
