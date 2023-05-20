import { Component, DoCheck, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngxs/store';
import { IDay } from 'src/app/components/interfaces/IDay.interface';
import { WEEK } from 'src/app/util/const/week.const';
import { REPEAT_PERIOD } from 'src/app/util/enums/repeat-period.enum';
import { CalendarDialogComponent } from '../calendar-dialog/calendar-dialog.component';
import { UpdatePlanAction } from 'src/app/states/plans.actions';

@Component({
  selector: 'app-calendar-item',
  templateUrl: './calendar-item.component.html',
  styleUrls: ['./calendar-item.component.scss'],
})

export class CalendarItemComponent implements DoCheck {
  @Input() day: IDay = { date: new Date(), events: [] };
  @Input() isFirstWeek = false;
  @Input() selected = false;

  public status = false;
  public isToday = false;

  protected readonly week = WEEK;

  public copyDay = { date: new Date(), events: [] };

  constructor(public dialog: MatDialog, public store: Store) {}

  ngDoCheck(): void {
    this.day.date = new Date(this.day.date);
    this.copyDay = Object.assign(this.day)

    let now = new Date();
    this.isToday =
      this.copyDay.date.getTime() ==
      new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
  }

  selectEvent(event: any){
    const dialogRef = this.dialog.open(CalendarDialogComponent, {
			minHeight: '25vh',
			minWidth: '25vw',
      data: {
        day: {date: this.day.date,
        event: event}
      }
    },
     );
      dialogRef.afterClosed().subscribe((data: any) => {
         this.store.dispatch(new UpdatePlanAction(data));
      })
  }
}
