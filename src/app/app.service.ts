import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AppService {

  // When a tag, comment is created or delete, send event
  onAttributeCrud = new Subject();

  constructor() { }

}
