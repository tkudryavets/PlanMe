import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarItemComponent } from './calendar-item/calendar-item.component';
import { CalendarDialogComponent } from './calendar-dialog/calendar-dialog.component';
import { CalendarUpdateDialogComponent } from './calendar-update-dialog/calendar-update-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [CalendarItemComponent, CalendarDialogComponent, CalendarUpdateDialogComponent],
  imports: [
    CommonModule,
    FormsModule,
		ReactiveFormsModule,
		MatSelectModule,
		MatDialogModule,
		MatDatepickerModule,
		MatNativeDateModule,
		MatFormFieldModule,
		MatInputModule,
    MatIconModule,
    MatButtonModule],
  exports: [CalendarItemComponent, CalendarDialogComponent, CalendarUpdateDialogComponent],
})
export class CalendarComponentsModule {}
