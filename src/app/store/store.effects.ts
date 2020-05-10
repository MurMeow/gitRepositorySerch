import { Injectable } from '@angular/core';
import {Actions, createEffect, Effect, ofType} from '@ngrx/effects';
import {EMPTY, of} from 'rxjs';
import {map, mergeMap, catchError, switchMap, withLatestFrom, tap, takeUntil} from 'rxjs/operators';
import { GithubService } from '../services/github.service';
import {fetchInfoFromGithub, getResponseToRequestGithubSuccess, getResponseToRequestGithubError} from "./store.actions";
import {selectIsLoading, selectStateData} from "./store.selector";
import {select, Store} from "@ngrx/store";


@Injectable()
export class FetchEffects  {

  // constructor(private actions$: Actions) {}
  @Effect()
  getData$ = this.actions$.pipe(
      ofType(fetchInfoFromGithub),
    // switchMap((data) => of( getResponseToRequestGithubSuccess({data}))),
    // withLatestFrom(this.store.pipe(select(selectStateData))),

    switchMap((searchWord) => this.githubService.getFetch(searchWord.searchWord)
      .pipe(
        tap(action => console.log(action)),
        switchMap((data) => of( getResponseToRequestGithubSuccess({data}))),
        catchError((error) => of( getResponseToRequestGithubError({error})))
      )
    ),
    // switchMap((data) => of( getResponseToRequestGithubSuccess({data}))),

    //     .pipe(
    //             map((data) => of( getResponseToRequestGithubSuccess({data}))),
    //     )//   //     catchError((error) => of({ type: '[Input Component] getResponseToRequestGithubError', payload: {error} }))
    // ),


    // takeUntil(this.actions$.pipe(ofType(getResponseToRequestGithubSuccess))),
      // switchMap((data) => of( getResponseToRequestGithubSuccess({data})))
      // switchMap(() => this.githubService.getFetch()),
      // switchMap((data) => of( getResponseToRequestGithubSuccess({data})))
    )

  // @Effect({ dispatch: false })
  // getData$ = this.actions$.pipe(
  //   ofType(fetchInfoFromGithub),
  //   switchMap(() => this.githubService.getFetch()),
  //   // map(action => action),
  //   // withLatestFrom(this.store.pipe(select(selectIsLoading))),
  //   // switchMap(() => {
  //   //   return console.log();
  //   // ),
  //   switchMap(() => this.githubService.getFetch()),
  //   // @ts-ignore
  //   switchMap((data) => console.log(data)),
  //   // switchMap((data) => of(new getResponseToRequestGithubSuccess({data})))
  // )

  // @Effect()
  // getData$ = this.actions$.pipe(
  //   ofType(fetchInfoFromGithub),
  //   map(data => ( getResponseToRequestGithubSuccess({data: data})))
  // // //     mergeMap(() => this.githubService.getFetch().pipe(
  // // //       map(data => ( getResponseToRequestGithubSuccess({data: data}))),
  // // //       catchError((error) => of( getResponseToRequestGithubError(error))
  // // //       ))
  // // //     )
  //   );


  // loadRequest$ = createEffect(() => this.actions$.pipe(
  //   ofType('[Input Component] fetchInfoFromGithub'),
  //   switchMap(() => this.githubService.getFetch),
  //   switchMap((response) => { return of(getResponseToRequestGithubSuccess(response))}),
  //   // mergeMap(() => this.githubService.getFetch()
  //   //   .pipe(
  //   //     map(data => ({ type: '[Input Component] getResponseToRequestGithubSuccess', payload: {data} })),
  //   //     catchError((error) => of({ type: '[Input Component] getResponseToRequestGithubError', payload: {error} }))
  //   //     // catchError(() => EMPTY)
  //   //
  //   //   ))
  //   )
  // );

  constructor(
    private actions$: Actions,
    private githubService: GithubService,
    private store: Store
  ) {}
}





//
//
// import { Injectable } from '@angular/core';
// import { Actions, Effect, ofType } from '@ngrx/effects';
// import { EMPTY } from 'rxjs';
// import { catchError, map, mergeMap } from 'rxjs/operators';
// import { ActionTypes } from './actions';
// import { FruitsService } from '../fruits.service';
// import {fetchInfoFromGithub, getResponseToRequestGithubSuccess} from "./store.actions";
//
// @Injectable()
// export class FetchEffects {
//   constructor(
//     private actions$: Actions,
//     // private fruitsService: FruitsService
//   ) {}
//
//   @Effect()
//   loadFruits$ = this.actions$.pipe(
//     ofType(fetchInfoFromGithub),
//     mergeMap(() =>
//       this.fruitsService.getAll().pipe(
//         map(fruits => {
//           return { type: getResponseToRequestGithubSuccess, payload: fruits };
//         }),
//         catchError(() => EMPTY)
//       )
//     )
//   );
// };

