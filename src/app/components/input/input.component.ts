import {Component} from '@angular/core'
import { Store, select } from '@ngrx/store'
import { Observable } from 'rxjs'
import {
  fetchInfoFromGithub,
  getRequestName,
  getResponseToRequestGithubError,
  setActivePreloader
} from '../../store/store.actions'

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})

export class InputComponent {
  searchWord: string = ''
  minLength = 1
  searchWord$: Observable<string>

  constructor(private store: Store<{ searchWord: string }>
  ) {
    this.searchWord$ = store.pipe(select('searchWord'))
  }

  handleChange() {
    if(this.searchWord.length!==0){
      setTimeout(()=>{
        this.store.dispatch(getRequestName({ searchWord: this.searchWord}))
        this.store.dispatch(fetchInfoFromGithub({ searchWord: this.searchWord}))
        this.store.dispatch(setActivePreloader())
      }, 500)
    }
    else {
      this.store.dispatch(getResponseToRequestGithubError({error: {status:'300', statusText:'The request failed', message:'Min length request  is 1 symbol'}}))
    }
  }

  keyupEnter() {
    if(this.searchWord.length!==0){
      this.store.dispatch(getRequestName({ searchWord: this.searchWord}))
      this.store.dispatch(fetchInfoFromGithub({ searchWord: this.searchWord}))
      this.store.dispatch(setActivePreloader())
    }
    else {
      this.store.dispatch(getResponseToRequestGithubError({error: {status:'300', statusText:'The request failed', message:'Min length request  is 1 symbol',}}))
    }
  }

}
