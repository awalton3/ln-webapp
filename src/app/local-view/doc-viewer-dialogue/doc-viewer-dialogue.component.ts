import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { DocAttributeViewerBottomsheetComponent } from './doc-attribute-viewer-bottomsheet/doc-attribute-viewer-bottomsheet.component';

@Component({
  selector: 'app-doc-viewer-dialogue',
  templateUrl: './doc-viewer-dialogue.component.html',
  styleUrls: ['./doc-viewer-dialogue.component.css']
})

export class DocViewerDialogueComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DocViewerDialogueComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _bottomSheet: MatBottomSheet) { }

  ngOnInit() {
    console.log("VIEWER: ", this.data)
  }

  closeDocViewer(): void {
    this.dialogRef.close();
  }

  openAttributeEditor() {
    this._bottomSheet.open(DocAttributeViewerBottomsheetComponent)
  }

}
