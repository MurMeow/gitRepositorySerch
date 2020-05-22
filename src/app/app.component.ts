import { Component, Input } from '@angular/core'
import { select, Store } from "@ngrx/store"
import { CardState, InfoDataState, State } from "./redusers"
import { Observable } from "rxjs"
import { selectCard, selectData, selectError, selectIsLoading } from "./store/store.selector"

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'gitRepositorySerch';
  @Input () isLoadedCard: boolean = false
  @Input () isLoadedTable: boolean = false
  @Input () isLoadedPreloader: boolean = false
  @Input () isLoadedError: boolean = true

  public card$: Observable<object> = this.store$.pipe(select(selectCard))
  public data$: Observable<object> = this.store$.pipe(select(selectData))
  public isLoading$: Observable<boolean> = this.store$.pipe(select(selectIsLoading))
  public error$: Observable<object> | null = this.store$.pipe(select(selectError))

  constructor(private store$: Store<State>) {
    this.card$.subscribe((personalInfo:CardState)=> personalInfo !== null? this.isLoadedCard = true : this.isLoadedCard = false )
    this.data$.subscribe(({total_count}:InfoDataState)=> total_count === 0? this.isLoadedTable = false : this.isLoadedTable = true )
    this.isLoading$.subscribe(isLoading$ =>  this.isLoadedPreloader =  isLoading$ )
    this.error$.subscribe(error => error !== null? this.isLoadedError = true : this.isLoadedError = false )
  }
}
