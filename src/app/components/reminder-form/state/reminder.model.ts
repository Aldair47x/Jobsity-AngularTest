import { Reminder } from 'src/app/interfaces/reminder';

export interface RemindersStateModel {
  items: Reminder[];
}

export const mocksReminders = [
  {
    uuid: 'randomId1',
    text: 'Lorem ipsum dolor sit amet',
    dateTime: new Date(),
    color: 'ly',
    city: 'Pereira',
    weather: 'Sunny',
  },
  {
    uuid: 'randomId2',
    text: 'Lorem ipsum dolor sit amet',
    dateTime: new Date(),
    color: 'ly',
    city: 'Medellin',
    weather: 'Mostly Cloudy',
  },
  {
    uuid: 'randomId3',
    text: 'Lorem ipsum dolor sit amet',
    dateTime: new Date(),
    color: 'ly',
    city: 'Bogota',
    weather: 'Mostly Sunny',
  },
];
