export interface Reminder {
  uuid: string;
  text: string;
  dateTime: Date;
  color: string;
  city?: string;
  weather?: string;
}
