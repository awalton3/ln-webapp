import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Doc } from '../shared/document/doc.model';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { DocViewerDialogueComponent } from './doc-viewer-dialogue/doc-viewer-dialogue.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-local-view',
  templateUrl: './local-view.component.html',
  styleUrls: ['./local-view.component.css']
})
export class LocalViewComponent implements OnInit {

  @ViewChild('searchBar', {static: false}) searchBar;

  //chipList
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  searchForm: FormGroup;
  testDoc: Doc;
  documents: Doc[] = [];
  selectedDoc: Doc = new Doc(
    'Workfront Generates $33 Million in Latest Funding Round',
    'Wireless News (Close-up Media)',
    '2/18/2019 @ 1:15pm',
    'private docId: string',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Pulvinar elementum integer enim neque volutpat ac tincidunt vitae. Cursus turpis massa tincidunt dui ut. Leo a diam sollicitudin tempor id eu nisl. Vel risus commodo viverra maecenas accumsan lacus vel. Tellus elementum sagittis vitae et leo duis ut diam. Fusce ut placerat orci nulla pellentesque dignissim enim sit amet. Sit amet luctus venenatis lectus magna fringilla. Lacus viverra vitae congue eu consequat ac. Aenean sed adipiscing diam donec. Lobortis scelerisque fermentum dui faucibus. Morbi tristique senectus et netus...',
    ['tag1', 'tag2'],
    'This is worst piece of writing I have ever attempted to read.'
  )

  constructor(private http: HttpClient, public docViewer: MatDialog, private router: Router) { }

  ngOnInit() {
    this.createTestDocs();
    this.initForm();
    // this.fetchTestDoc('5GN0-T2Y1-F06S-P4SX-00000-00');
    this.testDoc = new Doc(
      'Workfront Generates $33 Million in Latest Funding Round',
      'Wireless News (Close-up Media)',
      '2/18/2019 @ 1:15pm',
      'private docId: string',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Pulvinar elementum integer enim neque volutpat ac tincidunt vitae. Cursus turpis massa tincidunt dui ut. Leo a diam sollicitudin tempor id eu nisl. Vel risus commodo viverra maecenas accumsan lacus vel. Tellus elementum sagittis vitae et leo duis ut diam. Fusce ut placerat orci nulla pellentesque dignissim enim sit amet. Sit amet luctus venenatis lectus magna fringilla. Lacus viverra vitae congue eu consequat ac. Aenean sed adipiscing diam donec. Lobortis scelerisque fermentum dui faucibus. Morbi tristique senectus et netus...',
      ['tag1', 'tag2'],
      'This is worst piece of writing I have ever attempted to read.'
    )
    this.selectedDoc = this.testDoc;
  }

  initForm() {
    this.searchForm = new FormGroup({
      'keyword': new FormControl(null)
    })
  }

  //
  // toggleSearchBar() {
  //   this.showSearchBar = !this.showSearchBar
  // }
  //
  // fetchTestDoc(docId: string) {
  //   this.http.get("http://student04.cse.nd.edu:51087/articles/" + docId)
  //     .subscribe(docObj => {
  //       console.log(this.testDoc)
  //     })
  // }

  createTestDocs() {
    for (let i = 0; i < 10; i++) {
      let testDoc = new Doc(
        'Workfront Generates $33 Million in Latest Funding Round',
        'Wireless News (Close-up Media)',
        '2/18/2019 @ 1:15pm',
        'private docId: string',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Pulvinar elementum integer enim neque volutpat ac tincidunt vitae. Cursus turpis massa tincidunt dui ut. Leo a diam sollicitudin tempor id eu nisl. Vel risus commodo viverra maecenas accumsan lacus vel. Tellus elementum sagittis vitae et leo duis ut diam. Fusce ut placerat orci nulla pellentesque dignissim enim sit amet. Sit amet luctus venenatis lectus magna fringilla. Lacus viverra vitae congue eu consequat ac. Aenean sed adipiscing diam donec. Lobortis scelerisque fermentum dui faucibus. Morbi tristique senectus et netus...',
        ['tag1', 'tag2'],
        'This is worst piece of writing I have ever attempted to read.'
      )
      this.documents.push(testDoc)
    }
  }

  onSelectDoc(document) {
    // console.log(document)
    this.selectedDoc = document;
    console.log(this.selectedDoc)
  }

  addTag(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.selectedDoc.tags.push(value.trim());
      console.log(this.selectedDoc)
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  removeTag(tag: string): void {
    const index = this.selectedDoc.tags.indexOf(tag);
    if (index >= 0) {
      this.selectedDoc.tags.splice(index, 1);
    }
  }

  checkStateSearchBar() {
    if (this.searchBar.expanded) {
      this.searchBar.close()
    }
  }

  onSearch() {
    //... call filter function here
  }

  openDocViewer() {
    const dialogRef = this.docViewer.open(DocViewerDialogueComponent, {
      width: '100vw',
      maxWidth: '100vw',
      height: '100vh',
      panelClass: 'docViewerContainer',
      data: this.selectedDoc,
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  navigateToLexis() {
    this.router.navigate(['lexis_nexis'])
  }

}
