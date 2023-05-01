import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IDay } from 'src/app/components/interfaces/IDay.interface';

@Component({
  selector: 'app-calendar-dialog',
  templateUrl: './calendar-dialog.component.html',
  styleUrls: ['./calendar-dialog.component.scss'],
})

export class CalendarDialogComponent {
  public requestForm: FormGroup;
  public formToImport!: IDay;

  constructor(
    private dialogRef: MatDialogRef<CalendarDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {    
    if(data?.day?.date) {
      this.requestForm = new FormGroup({
        date: new FormControl(data.day.date),
        advent: new FormControl(),
        participants: new FormControl(),
      });
    }
    else {
      this.requestForm = new FormGroup({
        date: new FormControl(),
        advent: new FormControl(),
        participants: new FormControl(),
      });
    }
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
      };
      this.dialogRef.close(this.formToImport);
    }
  }
}
