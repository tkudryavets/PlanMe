import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IDay } from 'src/app/components/interfaces/IDay.interface';

@Component({
  selector: 'app-calendar-update-dialog',
  templateUrl: './calendar-update-dialog.component.html',
  styleUrls: ['./calendar-update-dialog.component.scss'],
})

export class CalendarUpdateDialogComponent {
  public requestForm: FormGroup;
  public formToImport!: IDay;

  constructor(
    private dialogRef: MatDialogRef<CalendarUpdateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.requestForm = new FormGroup({
      date: new FormControl(data.day.date),
      advent: new FormControl(data.day.advent),
      participants: new FormControl(data.day.participants),
    });
  }

  public onSend(): void {
    if (
      this.requestForm.controls['date'].value &&
      this.requestForm.controls['advent'].value
    ) {
      this.formToImport = {
        id: this.data.day.id,
        date: this.requestForm.controls['date'].value.toString(),
        advent: this.requestForm.controls['advent'].value,
        participants: this.requestForm.controls['participants'].value,
      };
      this.dialogRef.close(this.formToImport);
    }
  }
  public onDelete(): void {
    if (
      this.requestForm.controls['date'].value &&
      this.requestForm.controls['advent'].value
    ) {
      this.formToImport = {
        id: this.data.day.id,
        date: '',
        advent: '',
        participants: '',
      };
      this.dialogRef.close(this.formToImport);
    }
  }
}
