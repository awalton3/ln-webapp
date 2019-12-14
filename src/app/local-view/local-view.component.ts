import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Doc } from '../shared/document/doc.model';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { DocViewerDialogueComponent } from './doc-viewer-dialogue/doc-viewer-dialogue.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ServerService } from '../server.service';

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
  selectedDoc: Doc;
  selectedDocContent: string;

  constructor(public docViewer: MatDialog, private router: Router, private server: ServerService) { }

  ngOnInit() {

    this.initForm();
    this.documents = [];
    this.tags = [];
    this.selectedDoc = null;
    this.selectedDocContent = null;

    // If tags list is empty, show all documents by default
    if (this.tags.length == 0)
      this.showAllDocs()

    this.server.addTags(['gee', 'gee2', 'gee3'], '522J-GSJ1-DYNS-30WW-00000-00')
      .subscribe(res => {
        console.log("AFTER ADDING TAGS: ", res)
      })

  }

  initForm() {
    this.searchForm = new FormGroup({
      'keyword': new FormControl(null)
    })
  }

  showAllDocs() {
    this.server.getDocuments()
      .subscribe((docIds: { result: string, doc_ids: string[] }) => {
        this.updateDocsDisplayed(docIds.doc_ids)
      })
  }

  onSelectDoc(document) {
    this.selectedDoc = document;
    this.server.getDocContentById('4JHN-4PB0-TW9S-220N-00000-00')
      .subscribe((res: { result: string, content: string }) => {
        console.log("Requested Content: ", res)
        this.selectedDocContent = res.content;
        this.openDocViewer(document, res.content);
      })
  }

  addTag(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    if ((value || '').trim()) this.tags.push(value.trim());
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
        .subscribe((docIDs: { result: string, doc_ids: string[] }) => {
          console.log("FILTER RES: ", docIDs)
          if (docIDs.doc_ids.length)
            this.updateDocsDisplayed(docIDs.doc_ids)
        })
    }
  }

  updateDocsDisplayed(docIDs: string[]) {

    let max_len = docIDs.length
    if (max_len > 10)
      max_len = 10

    this.documents = []
    for (let i = 0; i < max_len; i++) {
      this.server.getDocById(docIDs[i]).subscribe((doc: any) => {
        console.log(doc)
        let newDoc = new Doc(doc.title, doc.source, doc.date, doc.DOC_ID, doc.preview, doc.tags, doc.comments)
        this.documents.push(newDoc)
      })
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
