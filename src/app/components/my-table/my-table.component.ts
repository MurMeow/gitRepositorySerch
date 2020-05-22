import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core'
import { MatPaginator } from '@angular/material/paginator'
import { MatSort } from '@angular/material/sort'
import { MatTable } from '@angular/material/table'
import { MyTableDataSource, MyTableItem } from './my-table-datasource'
import { selectData,  } from "../../store/store.selector"
import { select, Store } from "@ngrx/store"
import { Observable } from "rxjs"
import { InfoDataState, State } from "../../redusers"
import { openPersonalCard } from "../../store/store.actions"

export interface IData{
  total_count: number,
  incomplete_results: false,
  items: any
}
export const array = []

@Component({
  selector: 'app-my-table',
  templateUrl: './my-table.component.html',
  styleUrls: ['./my-table.component.scss']
})

export class MyTableComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator
  @ViewChild(MatSort) sort: MatSort
  @ViewChild(MatTable) table: MatTable<MyTableItem>
  dataSource: MyTableDataSource
  isLoaded: boolean = true
  displayedColumns = ['id', 'name', 'owner', 'type']
  public data$: Observable<object> = this.store$.pipe(select(selectData))
  public dataForTable$: any
  @Input() data: { name: any, owner: string, type: string, id: any, repo_url: string }[]

  constructor(private store$: Store<State>) {
    this.data = []
    this.dataForTable$ = {
      total_count: 0,
      incomplete_results: false,
      items: []
    }
    this.data$.subscribe(v=> this.dataForTable$ = v)
    this.data$.subscribe(({items}:InfoDataState)=> items.map(item => array.push({ id: item.id, name: item.name, url: item.html_url, private: item.private, ownerInfo: { login: item.owner.login, url: item.owner.html_url, type: item.owner.type }})))
  }

  openCard(id){
    this.data$.subscribe(({items}:InfoDataState)=>items.map(item => item.id==id ?
      this.store$.dispatch(openPersonalCard({ selectedCard: { avatar_url: item.owner.avatar_url, id: item.id, name: item.name, login: item.owner.login, html_url: item.html_url, created_at: item.created_at, updated_at: item.updated_at}}))
      : item.id))
  }

  ngOnInit() {
    this.data$.subscribe(({items}:InfoDataState)=> items.map(item => {this.data.push({ id: item.id, name: item.name, owner: item.owner.login, type: item.owner.type, repo_url: item.html_url})}))
    this.dataSource = new MyTableDataSource(this.data)
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort
    this.dataSource.paginator = this.paginator
    this.table.dataSource = this.dataSource

  }
}
