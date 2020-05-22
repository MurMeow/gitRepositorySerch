import { Injectable } from '@angular/core'
import { Actions, Effect, ofType } from '@ngrx/effects'
import { of } from 'rxjs'
import { catchError, switchMap, tap } from 'rxjs/operators'
import { GithubService } from '../services/github.service'
import { fetchInfoFromGithub, getResponseToRequestGithubSuccess, getResponseToRequestGithubError } from "./store.actions"
import { Store } from "@ngrx/store"

@Injectable()
export class FetchEffects  {

  @Effect()
  getData$ = this.actions$.pipe(
      ofType(fetchInfoFromGithub),
      switchMap((searchWord) => this.githubService.getFetch(searchWord.searchWord)
        .pipe(
        // tap(action => console.log(action)),
        switchMap((data) => of( getResponseToRequestGithubSuccess({data}))),
        catchError((error) => of( getResponseToRequestGithubError({error})))
      )
    ),
  )

  constructor(
    private actions$: Actions,
    private githubService: GithubService,
    private store: Store
  ) {}
}
