import { Component, OnInit, Inject, ChangeDetectorRef } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { ServerService } from 'src/app/server.service';
import { FormGroup, FormControl } from '@angular/forms';
import { AppService } from 'src/app/app.service';

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
    private appService: AppService,
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

  deleteComment(comment: string) {
    this.server.deleteComment(comment, this.data.docID)
      .subscribe(res => {
        let index = this.comments.indexOf(comment)
        this.comments.splice(index, 1)
        this.ref.detectChanges();
        this.appService.onAttributeCrud.next();
      }, error => console.log(error))
  }

  addComment() {
    this.server.addComment(this.addCommentForm.value.comment, this.data.docID)
      .subscribe(res => {
        this.comments.push(this.addCommentForm.value.comment)
        this.ref.detectChanges();
        this.addCommentForm.reset()
        this.appService.onAttributeCrud.next();
        this.server.getDocById(this.data.docID)
          .subscribe(res => console.log("Target: ", res))
      }, error => console.log(error))
  }

  addTag() {
    this.server.addTags([this.addTagForm.value.tag], this.data.docID)
      .subscribe(res => {
        this.tags.push(this.addTagForm.value.tag)
        this.addTagForm.reset();
        this.ref.detectChanges();
        this.appService.onAttributeCrud.next();
      }, error => console.log(error))
  }

  deleteTag(tag: string) {
    this.server.deleteTag(tag, this.data.docID)
      .subscribe(res => {
        let index = this.tags.indexOf(tag)
        this.tags.splice(index, 1)
        this.ref.detectChanges();
        this.appService.onAttributeCrud.next();
      }, error => console.log(error))
  }

}
