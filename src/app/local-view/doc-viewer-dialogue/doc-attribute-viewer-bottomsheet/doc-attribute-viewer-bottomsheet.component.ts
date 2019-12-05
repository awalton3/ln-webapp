import { Component, OnInit } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-doc-attribute-viewer-bottomsheet',
  templateUrl: './doc-attribute-viewer-bottomsheet.component.html',
  styleUrls: ['./doc-attribute-viewer-bottomsheet.component.css']
})
export class DocAttributeViewerBottomsheetComponent implements OnInit {

  constructor(private _bottomSheetRef: MatBottomSheetRef<DocAttributeViewerBottomsheetComponent>) { }

  ngOnInit() {
  }

  openLink(event: MouseEvent): void {
    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }

}
