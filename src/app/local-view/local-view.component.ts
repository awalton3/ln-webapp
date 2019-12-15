import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Doc } from '../shared/document/doc.model';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { DocViewerDialogueComponent } from './doc-viewer-dialogue/doc-viewer-dialogue.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ServerService } from '../server.service';
import { AppService } from '../app.service';

@Component({
  selector: 'app-local-view',
  templateUrl: './local-view.component.html',
  styleUrls: ['./local-view.component.css']
})
export class LocalViewComponent implements OnInit {

  @ViewChild('searchBar', { static: false }) searchBar;

  //chipList
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  searchForm: FormGroup;
  documents: Doc[] = [];
  tags: string[] = [];
  contentLoaded: boolean;
  docsExist: boolean;

  constructor(
    public docViewer: MatDialog,
    private router: Router,
    private server: ServerService,
    private appService: AppService,
    private ref: ChangeDetectorRef) { }

  ngOnInit() {
    this.listenForDocChanges();
    this.contentLoaded = false;
    this.docsExist = true;
    this.initForm();
    this.documents = [];
    this.tags = [];

    // If tags list is empty, show all documents by default
    if (this.tags.length == 0)
      this.showAllDocs()
  }

  initForm() {
    this.searchForm = new FormGroup({
      'keyword': new FormControl(null)
    })
  }

  listenForDocChanges() {
    this.appService.onAttributeCrud
      .subscribe(onDocAttributeChange => {
        if (this.tags.length == 0)
          this.showAllDocs()
        else
          this.onSearch();
      })
  }

  showAllDocs() {
    this.server.getDocuments()
      .subscribe(docs => {
        this.updateDocsDisplayed(docs)
      })
  }

  onSelectDoc(document) {
    this.server.getDocContentById(document.docId)
      .subscribe((res: { result: string, content: string }) => {
        this.openDocViewer(document, res.content);
      })
  }

  addTag(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    if ((value || '').trim()) this.tags.push(value.trim().toLowerCase());
    if (input) input.value = '';
  }

  removeTag(tag: string): void {
    const index = this.tags.indexOf(tag);
    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  checkStateSearchBar() {
    if (this.searchBar.expanded) {
      this.searchBar.close()
    }
  }

  onSearch() {
    if (this.tags.length == 0) {
      this.showAllDocs();
    } else {
      this.server.filter(this.tags)
        .subscribe((docIds: { result: string, doc_ids: string[] }) => {
          this.server.getDocsByIds(docIds.doc_ids)
            .subscribe(docs => {
              if (Object.keys(docs).length)
                this.updateDocsDisplayed(docs)
            })
        })
    }
  }

  updateDocsDisplayed(docs) {
    this.documents = []
    let docIds = Object.keys(docs)
    docIds.shift() // get rid of results: success entry

    for (let i = 0; i < docIds.length; i++) {
      let doc = docs[docIds[i]]
      let newDoc = new Doc(doc.title, doc.source, doc.date, doc.DOC_ID, doc.preview, doc.tags, doc.comments)
      this.documents.push(newDoc)
    }
    if (!this.documents.length) {
      this.contentLoaded = true;
      this.docsExist = false;
      this.ref.detectChanges();
    } else {
      this.contentLoaded = true;
      this.docsExist = true;
      this.ref.detectChanges();
    }
  }

  openDocViewer(document, content) {
    this.docViewer.open(DocViewerDialogueComponent, {
      width: '100vw',
      maxWidth: '100vw',
      height: '100vh',
      panelClass: 'docViewerContainer',
      data: { document: document, content: content }
    });
  }

  navigateToLexis() {
    this.router.navigate(['lexis_nexis'])
  }

}
