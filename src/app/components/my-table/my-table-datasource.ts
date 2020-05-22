import { DataSource } from '@angular/cdk/collections'
import { MatPaginator } from '@angular/material/paginator'
import { MatSort } from '@angular/material/sort'
import { map } from 'rxjs/operators'
import { Observable, of as observableOf, merge } from 'rxjs'

export interface MyTableItem {
  name: string,
  id: number,
  owner: string,
  type: string,
  repo_url: string
}

export class MyTableDataSource extends DataSource<MyTableItem> {
  paginator: MatPaginator
  sort: MatSort

  constructor( public data: MyTableItem[] ) {
    super();
   }

  connect(): Observable<MyTableItem[]> {

    const dataMutations = [
      observableOf(this.data),
      this.paginator.page,
      this.sort.sortChange
    ];

    return merge(...dataMutations).pipe(map(() => {
        return this.getPagedData(this.getSortedData([...this.data]))
    }));
  }

  disconnect() {}

  private getPagedData(data: MyTableItem[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize
    return data.splice(startIndex, this.paginator.pageSize)
  }

  private getSortedData(data: MyTableItem[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc'
      switch (this.sort.active) {
        case 'owner': return compare(a.owner, b.owner, isAsc)
        case 'type': return compare(a.type, b.type, isAsc)
        case 'name': return compare(a.name, b.name, isAsc)
        case 'id': return compare(+a.id, +b.id, isAsc)
        default: return 0
      }
    });
  }
}

function compare(a: string | number, b: string | number, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1)
}
