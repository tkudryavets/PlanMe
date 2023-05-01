import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarItemComponent } from './calendar-item.component';

@NgModule({
  declarations: [CalendarItemComponent],
  imports: [CommonModule],
  exports: [CalendarItemComponent],
})
export class CalendarItemModule {}
