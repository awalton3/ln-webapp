import { Component, OnInit, Input, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { Doc } from './doc.model';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.css']
})
export class DocumentComponent implements OnInit {

  @Input() document: Doc;
  @Output() onDocClick = new Subject();

  constructor() { }

  ngOnInit() {
  }

  onDocumentClicked() {
    this.onDocClick.next();
  }

}
