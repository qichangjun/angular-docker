import {Injectable}      from '@angular/core'
import {BehaviorSubject} from 'rxjs';

@Injectable()
export class EventService {
  private _toggleEvent = new BehaviorSubject<any>('');
  toggleEvent$ = this._toggleEvent.asObservable();
  toggleEvent(item) {
    this._toggleEvent.next(item);
  }
}
