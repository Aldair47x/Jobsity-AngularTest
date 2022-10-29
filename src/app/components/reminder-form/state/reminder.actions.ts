import { Reminder } from "src/app/interfaces/reminder";


export class DeleteReminder {
  static readonly type = '[Reminder] Delete reminder';
  constructor(public uuid: string) {}
}

export class CreateReminder {
  static readonly type = '[Reminder] Create reminder';
  constructor(public reminder: Reminder) {}
}

export class UpdateReminder {
  static readonly type = '[Reminder] Update reminder';
  constructor(public uuid: string, public reminder: Reminder) {}
}
