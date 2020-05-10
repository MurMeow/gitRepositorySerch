import {Component} from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { fetchInfoFromGithub, getRequestName } from '../../store/store.actions';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})

export class InputComponent {
  searchWord: string = ''
  minLength = 3
  searchWord$: Observable<string>

  constructor(private store: Store<{ searchWord: string,  }>
  ) {
    this.searchWord$ = store.pipe(select('searchWord'))
  }

  handleChange(){
    this.store.dispatch(getRequestName({ searchWord: this.searchWord}))
    this.store.dispatch(fetchInfoFromGithub({ searchWord: this.searchWord}))
  }

}
