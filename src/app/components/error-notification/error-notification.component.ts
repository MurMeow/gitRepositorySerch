import {Component, Input, OnInit} from '@angular/core'
import {CardState, ErrorState, State} from "../../redusers"
import {Observable} from "rxjs"
import {select, Store} from "@ngrx/store"
import {selectCard, selectError} from "../../store/store.selector"
import {clearState, closePersonalCard} from "../../store/store.actions"

@Component({
  selector: 'app-cardError-notification',
  templateUrl: './error-notification.component.html',
  styleUrls: ['./error-notification.component.scss']
})
export class CardErrorNotificationComponent implements OnInit {
  @Input() error:ErrorState | null
  public error$: Observable<object> = this.store$.pipe(select(selectError))

  constructor(private store$: Store<State>) {
    this.error = {
      status:'',
      statusText:'',
      message:'',
    }
  }

  ngOnInit(): void {
    this.error$.subscribe((error:ErrorState) => this.error= error)
  }

  closeCardError(){
    this.store$.dispatch(clearState())
  }

}
