import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngxs/store';
import { map } from 'rxjs/operators';
import { Reminder } from 'src/app/interfaces/reminder';
import { WeatherService } from 'src/app/services/weather.service';
import { CreateReminder } from './state/reminder.actions';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-reminder-form',
  templateUrl: './reminder-form.component.html',
  styleUrls: ['./reminder-form.component.scss']
})
export class ReminderFormComponent implements OnInit {

  reminderForm: FormGroup;
  colorList = [
    { color: 'Light green', value: 'lg' },
    { color: 'Light yellow', value: 'ly' },
    { color: 'Light blue', value: 'lb' }
  ];
  errorCityFlag: boolean = false;

  constructor(@Inject(MAT_DIALOG_DATA) public data: Reminder,
  public dialogRef: MatDialogRef<any>,
  private store: Store,
  private fb: FormBuilder,
  private weatherService: WeatherService) { }

  ngOnInit(): void {
    console.log(this.data);
    this.reminderForm = this.fb.group({
      text: new FormControl(null, [Validators.required, Validators.maxLength(30)]),
      city: new FormControl(null, Validators.required),
      colorStyle: new FormControl(null, Validators.required),
    });
  }

  createReminder(){
    const { city, colorStyle, text } = this.reminderForm.value;
    let weather = '';
    const uuid = uuidv4();
    this.errorCityFlag = false;

    if(city && this.data.dateTime){
      this.weatherService.getWeatherInformation(city).pipe(
        map(w => w.weather)
      ).subscribe(
        (resp) => {
          if (resp.length > 0) {
            weather = resp[0].description;
          }
        },
        (e) => {
          this.errorCityFlag = true;
          console.warn(e.error);
        }, () => {
          const newReminder: Reminder = {
            uuid,
            text,
            dateTime: this.data.dateTime,
            color: colorStyle,
            city,
            weather
          };
          this.store.dispatch(new CreateReminder(newReminder));
          this.dialogRef.close();
        }
      );
    }
  }
    

  

}
