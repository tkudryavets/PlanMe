import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Select, Store } from '@ngxs/store';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Subscription, Observable } from 'rxjs';
import { MONTHS } from 'src/app/util/const/month.const';
import { IDay, IEvent } from '../../interfaces/IDay.interface';
import { CalendarDialogComponent } from '../../shared/calendar/calendar-dialog/calendar-dialog.component';
import { REPEAT_PERIOD } from 'src/app/util/enums/repeat-period.enum';
import { PlansState } from 'src/app/states/plans.state';
import { AddPlanAction, InitPlansAction, SelectMonthAction } from 'src/app/states/plans.actions';


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
@UntilDestroy()
export class CalendarComponent implements OnInit, OnDestroy {
  public days: IDay[] = [];
  public firstWeek: IDay[] = [];
  public selectedMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
  public months = MONTHS;
  public plans: IDay[] = [];
  public selectedDay: IDay | undefined;
  private subscribes: Subscription[] = [];
  private defaultPeriod = REPEAT_PERIOD.NONE;
  @Select(PlansState.plans) plans$!: Observable<any>;


  constructor(public dialog: MatDialog, 
	private store: Store
	) {}

  ngOnInit(): void {
    // this.store.dispatch(new GetPlans());
    // this.plans$.subscribe((returnData) => {
    //   this.plans = returnData;
    // });
    this.store.dispatch(new InitPlansAction());
    this.calcMonth(this.selectedMonth);
    this.plans$.pipe().subscribe(
      (e) => {
        this.getMonthPlans()}
    )
  }

  ngDoCheck(): void {
    this.calcMonth(this.selectedMonth);
  }

  ngOnDestroy(): void {
    // this.subscribes.forEach((sub) => sub.unsubscribe);
  }

  private calcMonth(day: Date) {
    day = new Date(day);
    this.store.dispatch(new SelectMonthAction({date: day}))
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
            events: []
          });
        } else {
          this.firstWeek.push({
            date: new Date(
              day.getFullYear(),
              day.getMonth() - 1,
              daysAmountPrev - i + 1
            ),
            events: []
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
          events: []
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
          events: []
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
            events: []
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
            events: []
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
            events: []
          }
        );
      }
    }

    this.getMonthPlans()

  }

  getMonthPlans(){
    let storeMonth = this.store.selectSnapshot(PlansState.monthPlans);
    // get events
    this.days.map((dayInMonth) => {
      storeMonth.forEach((day) => {
        if(new Date(day.date).getTime() == new Date(dayInMonth.date).getTime()){
          dayInMonth.events = day.events;
        }
          return dayInMonth
      })
    });
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
        item.events?.map((ev) => {
          if (
            ev.name
            .toLowerCase()
            .includes(event.target.value.toLowerCase())
            ) {
              this.selectedMonth = new Date(item.date);
              this.calcMonth(this.selectedMonth);
              return;
            }
          })
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
      dialogRef.afterClosed().subscribe((event: IEvent) => {
        this.store.dispatch(new AddPlanAction(event));
      })
    );
  }

  // public updateDay(): void {
  //   if (this.selectedDay) {
  //     if (typeof this.selectedDay.date == 'string')
  //       this.selectedDay.date = new Date(this.selectedDay.date);
  //       console.log(this.selectedDay)
  //     const dialogRef = this.dialog.open(CalendarDialogComponent, {
  //       position: {
  //         top: 'calc(50vh - 10.875 * 1rem)',
  //         left: 'calc(50vw - 14.125 * 1rem)',
  //       },
  //       data: {
  //         day: this.selectedDay,
  //       },
  //     });
  //     this.subscribes.push(
  //       dialogRef.afterClosed().subscribe((data: IDay) => {
  //       //   this.store.dispatch(new UpdatePlan(data));
  //       })
  //     );
  //     this.selectedDay = undefined;
  //   }
  // }
}

