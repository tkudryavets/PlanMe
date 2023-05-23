import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngxs/store';
import { Category } from 'app/util/enums/categories.enum';
import { REPEAT_PERIOD } from 'app/util/enums/repeat-period.enum';
import { Status } from 'app/util/enums/status.enum';


@Component({
  selector: 'app-calendar-dialog',
  templateUrl: './calendar-dialog.component.html',
  styleUrls: ['./calendar-dialog.component.scss'],
})

export class CalendarDialogComponent {
  public requestForm: FormGroup;
  public formToImport!: any;
  public readonly REPEAT_PERIOD =  Object.values(REPEAT_PERIOD);
  public readonly CATEGORIES = Object.values(Category);
  public isUpdate = false;
  private currentDate: Date;
  constructor(
    private dialogRef: MatDialogRef<CalendarDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private store: Store
  ) {   
    this.currentDate = new Date();
    this.isUpdate = !!data?.category;

    let status = data?.day?.event?.status == Status.DONE;
    if(!status) {
      let i = (data?.day?.event?.completeDates as Array<Date> ?? []).findIndex(value => value === data?.day?.date);
      if (i != -1)
        status = true;
    }

    this.requestForm = new FormGroup({
      date: new FormControl(data?.day?.date ?? this.currentDate),
      name: new FormControl(data?.day?.event?.name),
      repeat: new FormControl(data?.day?.event?.repeat ?? REPEAT_PERIOD.NONE),
      category: new FormControl(data?.day?.event?.category),
      participants: new FormControl(data?.day?.event?.participants),
      status: new FormControl(status)
    });
    // if(data?.day?.date) {
    //   this.requestForm = new FormGroup({
    //     date: new FormControl(data.day.date),
    //     advent: new FormControl(),
    //     participants: new FormControl(),
    //     repeat: new FormControl(this.REPEAT_PERIOD[0])
    //   });
    // }
    // else {
    //   this.requestForm = new FormGroup({
    //     date: new FormControl(),
    //     advent: new FormControl(),
    //     participants: new FormControl(),
    //     repeat: new FormControl(this.REPEAT_PERIOD[0])
    //   });
    // }
  }

  public onSend(): void {
    if (
      this.requestForm.controls['date'].value &&
      this.requestForm.controls['name'].value
    ) {
      let status = this.requestForm.controls['status'].value ? Status.DONE : undefined;
      
      if( !status && this.currentDate < this.requestForm.controls['date'].value) {
          status = this.currentDate < this.requestForm.controls['date'].value ? Status.PROGRESS : Status.FAIL;
      }

      this.formToImport = {
        date: this.requestForm.controls['date'].value.toDateString(),
        event: {
          id: this.data?.day?.event?.id,
          name: this.requestForm.controls['name'].value,
          startDate: this.data?.day?.event?.startDate ?? this.requestForm.controls['date'].value,
          repeat: this.requestForm.controls['repeat'].value,
          category: this.requestForm.controls['category'].value,
          status: status
        }
      };
      this.dialogRef.close(this.formToImport);
    }
  }
}
