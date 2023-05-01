import { Component, DoCheck, Input, OnInit } from '@angular/core';
import { IDay } from 'src/app/components/interfaces/IDay.interface';
import { WEEK } from 'src/app/util/const/week.const';

@Component({
  selector: 'app-calendar-item',
  templateUrl: './calendar-item.component.html',
  styleUrls: ['./calendar-item.component.scss'],
})

export class CalendarItemComponent implements DoCheck {
  @Input() day: IDay = { date: new Date(), advent: '', participants: '' };
  @Input() isFirstWeek = false;
  @Input() selected = false;

  public status = false;
  public isToday = false;

  protected readonly week = WEEK;

  public copyDay = { date: new Date(), advent: '', participants: '' };

  constructor() {}

  ngDoCheck(): void {
    this.day.date = new Date(this.day.date);
    this.copyDay = Object.assign(this.day)

    let now = new Date();
    this.isToday =
      this.copyDay.date.getTime() ==
      new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
  }
}
