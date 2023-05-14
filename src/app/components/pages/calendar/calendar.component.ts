import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Select, Store } from '@ngxs/store';
import { Subscription, Observable } from 'rxjs';
import { MONTHS } from 'src/app/util/const/month.const';
import { REPEAT_PERIOD } from 'src/app/util/const/repeat-period.const';
import { IDay } from '../../interfaces/IDay.interface';
import { CalendarDialogComponent } from '../../shared/calendar/calendar-dialog/calendar-dialog.component';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit {
  public days: IDay[] = [];
  public firstWeek: IDay[] = [];
  public selectedMonth = new Date();
  public months = MONTHS;
  public plans: IDay[] = [];
  public selectedDay: IDay | undefined;
  private subscribes: Subscription[] = [];
  private defaultPeriod = REPEAT_PERIOD[0];



  constructor(public dialog: MatDialog, 
	//private store: Store
	) {}

  ngOnInit(): void {
    // this.store.dispatch(new GetPlans());
    // this.plans$.subscribe((returnData) => {
    //   this.plans = returnData;
    // });
    this.calcMonth(this.selectedMonth);
  }

  ngDoCheck(): void {
    this.calcMonth(this.selectedMonth);
  }

  ngOnDestroy(): void {
    // this.subscribes.forEach((sub) => sub.unsubscribe);
  }

  private calcMonth(day: Date) {
    day = new Date(day);
    let daysAmount = new Date(
      day.getFullYear(),
      day.getMonth() + 1,
      0
    ).getDate();
    let daysAmountPrev = new Date(
      day.getFullYear(),
      day.getMonth(),
      0
    ).getDate();
    let firstDay = new Date(day.getFullYear(), day.getMonth(), 1).getDay();
    this.firstWeek = [];
    this.days = [];

    if (!firstDay) {
      for (let i = 6; i > 0; i--) {
        if (!day.getMonth()) {
          this.firstWeek.push({
            date: new Date(
              day.getFullYear(),
              day.getMonth() - 1,
              daysAmountPrev - i + 1
            ),
            advent: '',
            participants: '',
            id: new Date(
              day.getFullYear(),
              day.getMonth() - 1,
              daysAmountPrev - i + 1
            ).getTime(),
			repeat: this.defaultPeriod
          });
        } else {
          this.firstWeek.push({
            date: new Date(
              day.getFullYear(),
              day.getMonth() - 1,
              daysAmountPrev - i + 1
            ),
            advent: '',
            participants: '',
            id: new Date(
              day.getFullYear(),
              day.getMonth() - 1,
              daysAmountPrev - i + 1
            ).getTime(),
			repeat: this.defaultPeriod
          });
        }
      }

      let sunday = this.plans.find(
        (el) =>
          new Date(el.date).getTime() ==
          new Date(day.getFullYear(), day.getMonth(), 1).getTime()
      );
      if (sunday) this.firstWeek.push(sunday);
      else
        this.firstWeek.push({
          date: new Date(day.getFullYear(), day.getMonth(), 1),
          advent: '',
          participants: '',
          id: new Date(
            day.getFullYear(),
            day.getMonth(),
            daysAmountPrev + 1
          ).getTime(),
		  repeat: this.defaultPeriod
        });
    }

    //if not sunday
    else {
      for (let i = firstDay - 1; i > 0; i--) {
        this.firstWeek.push({
          date: new Date(
            day.getFullYear(),
            day.getMonth() - 1,
            daysAmountPrev - i + 1
          ),
          advent: '',
          participants: '',
          id: new Date(
            day.getFullYear(),
            day.getMonth() - 1,
            daysAmountPrev - i + 1
          ).getTime(),
		  repeat: this.defaultPeriod
        });
      }

      for (let i = 1; this.firstWeek.length < 7; i++) {
        let day1 = this.plans.find(
          (el) =>
            new Date(el.date).getTime() ==
            new Date(day.getFullYear(), day.getMonth(), i).getTime()
        );
        this.firstWeek.push(
          day1 || {
            date: new Date(day.getFullYear(), day.getMonth(), i),
            advent: '',
            participants: '',
            id: new Date(day.getFullYear(), day.getMonth(), -i).getTime(),
			repeat: this.defaultPeriod
          }
        );
      }
    }

    if (firstDay) {
      for (
        let i =
          (this.firstWeek[this.firstWeek.length - 1].date as Date).getDate() +
          1;
        i <= daysAmount;
        i++
      ) {
        this.days.push(
          this.plans.find(
            (el) =>
              new Date(el.date).getTime() ==
              new Date(day.getFullYear(), day.getMonth(), i).getTime()
          ) || {
            date: new Date(day.getFullYear(), day.getMonth(), i),
            advent: '',
            participants: '',
            id: new Date(day.getFullYear(), day.getMonth(), i).getTime(),
			repeat: this.defaultPeriod
          }
        );
      }
    } else {
      for (let i = 2; i <= daysAmount; i++) {
        this.days.push(
          this.plans.find(
            (el) =>
              new Date(el.date).getTime() ==
              new Date(day.getFullYear(), day.getMonth(), i).getTime()
          ) || {
            date: new Date(day.getFullYear(), day.getMonth(), i),
            advent: '',
            participants: '',
            id: new Date(day.getFullYear(), day.getMonth() - 1, i).getTime(),
			repeat: this.defaultPeriod
          }
        );
      }
    }
  }

  public minusMonth() {
    this.selectedMonth = new Date(
      this.selectedMonth.setMonth(this.selectedMonth.getMonth() - 1)
    );
    this.calcMonth(this.selectedMonth);
  }

  public plusMonth() {
    this.selectedMonth = new Date(
      this.selectedMonth.setMonth(this.selectedMonth.getMonth() + 1)
    );
    this.calcMonth(this.selectedMonth);
  }

  public selectToday() {
    this.selectedMonth = new Date();
    this.calcMonth(this.selectedMonth);
  }

  public onKey(event: any) {
    if (event.key == 'Enter') {
      if (Date.parse(event.target.value)) {
        this.selectedMonth = new Date(event.target.value);
        this.calcMonth(this.selectedMonth);
        return;
      }
      this.plans.forEach((item) => {
        if (
          item.advent
            .toLowerCase()
            .includes(event.target.value.toLowerCase()) ||
          item.participants
            .toLowerCase()
            .includes(event.target.value.toLowerCase())
        ) {
          this.selectedMonth = new Date(item.date);
          this.calcMonth(this.selectedMonth);
          return;
        }
      });
    }
  }

  public addAdvent() {
    const dialogRef = this.dialog.open(CalendarDialogComponent, {
			minHeight: '25vh',
			minWidth: '25vw',
			data: {
				day: this.selectedDay,
			},
    });
    this.subscribes.push(
      dialogRef.afterClosed().subscribe((data: IDay) => {
        // this.store.dispatch(new AddPlan(data));
      })
    );
  }

  public onSelect(day: IDay): void {
    this.selectedDay = day;
  }

  public updateDay(): void {
    if (this.selectedDay) {
      if (typeof this.selectedDay.date == 'string')
        this.selectedDay.date = new Date(this.selectedDay.date);

      const dialogRef = this.dialog.open(CalendarDialogComponent, {
        position: {
          top: 'calc(50vh - 10.875 * 1rem)',
          left: 'calc(50vw - 14.125 * 1rem)',
        },
        data: {
          day: this.selectedDay,
        },
      });
      this.subscribes.push(
        dialogRef.afterClosed().subscribe((data: IDay) => {
        //   this.store.dispatch(new UpdatePlan(data));
        })
      );
      this.selectedDay = undefined;
    }
  }
}
