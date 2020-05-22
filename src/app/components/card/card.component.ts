import { Component, Input, OnInit } from '@angular/core'
import { select, Store } from '@ngrx/store'
import { CardState, State } from '../../redusers'
import { Observable } from 'rxjs'
import { selectCard } from '../../store/store.selector'
import { closePersonalCard } from "../../store/store.actions"

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})

export class CardComponent {
  @Input() card:CardState

  isLoaded: boolean = true
  public card$: Observable<object> = this.store$.pipe(select(selectCard))
  constructor(private store$: Store<State>) {}

  ngOnInit() {
    this.card$.subscribe((personalInfo:CardState)=> { personalInfo!==null?
      this.card = {
        id: personalInfo.id,
        name: personalInfo.name,
        login: personalInfo.login,
        avatar_url: personalInfo.avatar_url,
        html_url: personalInfo.html_url,
        created_at: personalInfo.created_at,
        updated_at: personalInfo.updated_at
      }
      : personalInfo
    })
  }

  closeCard(){
    this.store$.dispatch(closePersonalCard())
  }

}
