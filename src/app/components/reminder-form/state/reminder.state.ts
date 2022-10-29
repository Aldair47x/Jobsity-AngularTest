import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import {
  CreateReminder,
  DeleteReminder,
  UpdateReminder,
} from './reminder.actions';
import { mocksReminders, RemindersStateModel } from './reminder.model';

const initialState: RemindersStateModel = {
  items: mocksReminders,
};

@State<RemindersStateModel>({ name: 'reminders', defaults: initialState })
@Injectable()
export class ReminderState {
  constructor(private store: Store) {}

  @Selector()
  static getReminders(state: RemindersStateModel) {
    return state;
  }

  @Action(DeleteReminder)
  deleteReminder(
    { getState, setState }: StateContext<RemindersStateModel>,
    action: DeleteReminder
  ) {
    const  { items } = getState();
    const  newItems = items.filter((e) => { return e.uuid != action.uuid; });
    setState({
      ...getState,
      items: newItems
    })
    // debugger 
  }

  @Action(CreateReminder)
  CreateReminder(
    { getState, setState }: StateContext<RemindersStateModel>,
    action: CreateReminder
  ) {
    let { items } = getState();
    items.push(action.reminder)
    setState({
      ...getState,
      items
    })
  }

  @Action(UpdateReminder)
  UpdateReminder(
    { getState, setState }: StateContext<RemindersStateModel>,
    action: UpdateReminder
  ) {
    //TODO
  }

}
