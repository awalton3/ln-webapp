import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ServiceService {

  constructor(private http: HttpClient) { }

  //filter local documents
  // filter(tags: string[]) {
  //   this.http.get('')
  // }

}
