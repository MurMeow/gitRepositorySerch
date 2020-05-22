import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})

export class GithubService {

  constructor(
    private http: HttpClient,
  ) { }

  getFetch(searchWord) {
    const url = `https://api.github.com/search/repositories?q=${ searchWord }`
    return this.http.get(url)
  }
}

