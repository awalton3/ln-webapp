import { Component, OnInit, Inject, ChangeDetectorRef } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { ServerService } from 'src/app/server.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-doc-attribute-viewer-bottomsheet',
  templateUrl: './doc-attribute-viewer-bottomsheet.component.html',
  styleUrls: ['./doc-attribute-viewer-bottomsheet.component.css']
})
export class DocAttributeViewerBottomsheetComponent implements OnInit {

  comments: string[] = []
  addCommentForm: FormGroup
  addTagForm: FormGroup
  tags: string[] = []

  constructor(
    private _bottomSheetRef: MatBottomSheetRef<DocAttributeViewerBottomsheetComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
    private server: ServerService,
    private ref: ChangeDetectorRef) { }

  ngOnInit() {
    this.comments = this.data.comments
    this.tags = this.data.tags
    this.initForms()
  }

  initForms() {
    this.addCommentForm = new FormGroup({
      comment: new FormControl(null)
    })
    this.addTagForm = new FormGroup({
      tag: new FormControl(null)
    })
  }

  openLink(event: MouseEvent): void {
    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }

  deleteComment(comment: string) {
    this.server.deleteComment(comment, this.data.docID)
      .subscribe(res => {
        let index = this.comments.indexOf(comment)
        this.comments.splice(index, 1)
        this.ref.detectChanges();
        console.log("onDeleteComment: ", res)
      })
  }

  addComment() {
    this.server.addComment(this.addCommentForm.value.comment, this.data.docID)
      .subscribe(res => {
        this.comments.push(this.addCommentForm.value.comment)
        this.ref.detectChanges();
        console.log("onAddComment: ", res)
      })
  }

  addTag() {
    this.server.addTags([this.addTagForm.value.tag], this.data.docID)
      .subscribe(res => {
        this.tags.push(this.addTagForm.value.tag)
        this.ref.detectChanges();
        console.log("onAddTag: ", res)
      })
  }

  deleteTag(tag: string) {

  }

}
