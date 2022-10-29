import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';
import { Reminder } from 'src/app/interfaces/reminder';
import { CalendarService } from 'src/app/services/calendar.service';
import { WeatherService } from 'src/app/services/weather.service';
import { MatDialog } from '@angular/material/dialog';
import { ReminderFormComponent } from '../reminder-form/reminder-form.component';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Select, Store } from '@ngxs/store';
import { map } from 'rxjs/operators';
import { MatTable } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { DeleteReminder } from '../reminder-form/state/reminder.actions';



@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  animations: [
      trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})



export class CalendarComponent implements OnInit, OnDestroy {

  @Select((state) => state.reminders) remindersData$: Observable<Reminder[]>;
  @ViewChild(MatTable) table: MatTable<any>;
  selection = new SelectionModel<any>(false, null);
  remindersDataSubscription: Subscription;
  dataSource = [];
  columnsToDisplay = ['dateTime', 'city', 'weather'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedElement;

  onDestroy$ = new Subject<boolean>();
  selectedDate: Date | null;

  constructor(
    private calendarService: CalendarService,
    private weatherService: WeatherService,
    private matDialog: MatDialog,
    private store: Store
  ) { 
    
    this.remindersDataSubscription = this.remindersData$.pipe(
      map( (e:any) => e.items)
    ).subscribe( data => {
      
      if(data.length > 0){
        this.dataSource = data;
      }
      
      if(this.table){
        this.table.renderRows();
      }
    });
    
    
  }

  ngOnInit(): void {
    // this.calendarService.list(new Date())
    //   .pipe(takeUntil(this.onDestroy$))
    //   .subscribe((reminders: Reminder[]) => {
    //     reminders.map((reminder: Reminder) => {
    //       return {
    //         ...reminder,
    //         weather: this.getWeather(reminder.city),
    //       };
    //     });
    //     console.log(reminders);
    //   });

  }

  // getWeather(city: string) {
  //   const x = this.weatherService.getWeatherInformation(city);
  //   console.log(x);
  //   return x;
  // }

  ngOnDestroy() {
    this.onDestroy$.next(true);
    this.onDestroy$.complete();
    this.remindersDataSubscription.unsubscribe();
  }

  openReminderForm(reminder?: Reminder) {
    if(this.selectedDate){
      this.matDialog.open(ReminderFormComponent, {
        data: {
          dateTime: this.selectedDate
        },
      });
      this.selectedDate =  null;
    }
  }

  onEdit(){
    //TODO
    const selectedRow = this.selection.selected
  }

  onDelete(){ 
    if(this.expandedElement){
      const { uuid } = this.expandedElement
      this.store.dispatch(new DeleteReminder(uuid));
    }
    // debugger
  }

  

}
