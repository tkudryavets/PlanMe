import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Select, Store } from '@ngxs/store';
import { IDay } from 'src/app/components/interfaces/IDay.interface';
import { PlansState } from 'src/app/states/plans.state';
import { Category } from 'src/app/util/enums/categories.enum';
import { REPEAT_PERIOD } from 'src/app/util/enums/repeat-period.enum';

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
    this.requestForm = new FormGroup({
      date: new FormControl(data?.day?.date ?? this.currentDate),
      name: new FormControl(data?.day?.event?.name),
      repeat: new FormControl(data?.day?.event?.repeat ?? REPEAT_PERIOD.NONE),
      category: new FormControl(data?.day?.event?.category)
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
      this.formToImport = {
        date: this.requestForm.controls['date'].value.toDateString(),

        event: {
          name: this.requestForm.controls['name'].value,
          repeat: this.requestForm.controls['repeat'].value,
          category: this.requestForm.controls['category'].value
        }
      };
      this.dialogRef.close(this.formToImport);
    }
  }
}
