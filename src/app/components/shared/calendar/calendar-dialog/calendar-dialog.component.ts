import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IDay } from 'src/app/components/interfaces/IDay.interface';
import { CATEGORIES } from 'src/app/util/const/categories.const';
import { REPEAT_PERIOD } from 'src/app/util/const/repeat-period.const';

@Component({
  selector: 'app-calendar-dialog',
  templateUrl: './calendar-dialog.component.html',
  styleUrls: ['./calendar-dialog.component.scss'],
})

export class CalendarDialogComponent {
  public requestForm: FormGroup;
  public formToImport!: IDay;
  public readonly REPEAT_PERIOD =  REPEAT_PERIOD;
  public readonly CATEGORIES = Object.values(CATEGORIES);

  constructor(
    private dialogRef: MatDialogRef<CalendarDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {    
    this.requestForm = new FormGroup({
      date: new FormControl(data.day?.date),
      advent: new FormControl(data.day?.advent),
      participants: new FormControl(data.day?.participants),
      repeat: new FormControl(data.day?.repeat),
      category: new FormControl()
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
      this.requestForm.controls['advent'].value
    ) {
      this.formToImport = {
        date: this.requestForm.controls['date'].value.toString(),
        advent: this.requestForm.controls['advent'].value,
        participants: this.requestForm.controls['participants'].value,
        repeat: this.requestForm.controls['repeat'].value
      };
      this.dialogRef.close(this.formToImport);
    }
  }
}
