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

    // this.server.getDocById('5M55-SRG1-DXCW-D3KH-00000-00')
    //   .subscribe(doc => {
    //     console.log("ORIGINAL: ", doc)
    //
    //     this.server.addComment('Hello, this is a comment.', '5M55-SRG1-DXCW-D3KH-00000-00')
    //       .subscribe(res => {
    //         // console.log(res)
    //
    //         this.server.getDocById('5M55-SRG1-DXCW-D3KH-00000-00')
    //           .subscribe(doc => {
    //             console.log("AFTER: ", doc)
    //           })
    //       })
    //   })


    //
    // this.server.getDocById('522J-GSJ1-DYNS-30WW-00000-00')
    //   .subscribe(doc => {
    //     console.log("Original: ", doc)
    //   })

    //
    // this.server.deleteComment('Hello, this is a comment.', '5M55-SRG1-DXCW-D3KH-00000-00')
    //   .subscribe(res => {
    //     console.log(res)
    //   })
    //
    // this.server.getDocById('5M55-SRG1-DXCW-D3KH-00000-00')
    //   .subscribe(doc => {
    //     console.log(doc)
    //   })
    //
    //
    // this.server.addTags(['gee', 'gee2', 'gee3'], '5M55-SRG1-DXCW-D3KH-00000-00')
    //   .subscribe(res => {
    //
    //     console.log("RES: ", res)
    //
    //     this.server.getDocById('5M55-SRG1-DXCW-D3KH-00000-00')
    //       .subscribe(doc => {
    //         console.log(doc)
    //
    //         this.server.filter(['gee'])
    //           .subscribe(res => {
    //             console.log(res)
    //           })
    //
    //       })
    //
    //   })

    this.server.addTags(['gee', 'gee2', 'gee3'], '522J-GSJ1-DYNS-30WW-00000-00')
      .subscribe(res => {
        console.log("AFTER ADDING TAGS: ", res)
      })

    //

    //
    // this.server.getDocContentById('4JHN-4PB0-TW9S-220N-00000-00')
    //   .subscribe(res => {
    //     console.log("CONTENT: ", res)
    //   })

    // this.server.getTags('5M55-SRG1-DXCW-D3KH-00000-00')
    //   .subscribe(res => {
    //     console.log(res)
    //   })

    // this.createTestDocs();

    // this.testDoc = new Doc(
    //   'Workfront Generates $33 Million in Latest Funding Round',
    //   'Wireless News (Close-up Media)',
    //   '2/18/2019 @ 1:15pm',
    //   'private docId: string',
    //   'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Pulvinar elementum integer enim neque volutpat ac tincidunt vitae. Cursus turpis massa tincidunt dui ut. Leo a diam sollicitudin tempor id eu nisl. Vel risus commodo viverra maecenas accumsan lacus vel. Tellus elementum sagittis vitae et leo duis ut diam. Fusce ut placerat orci nulla pellentesque dignissim enim sit amet. Sit amet luctus venenatis lectus magna fringilla. Lacus viverra vitae congue eu consequat ac. Aenean sed adipiscing diam donec. Lobortis scelerisque fermentum dui faucibus. Morbi tristique senectus et netus...',
    //   ['tag1', 'tag2'],
    //   ['This is worst piece of writing I have ever attempted to read.', "comment2"]
    // )
    // this.selectedDoc = this.testDoc;
    // this.selectedDocContent = 'haha'

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

  // fetchTestDoc(docId: string) {
  //   this.http.get("http://student04.cse.nd.edu:51046/articles/" + docId)
  //     .subscribe(docObj => {
  //       console.log(this.testDoc)
  //     })
  // }

  // createTestDocs() {
  //   for (let i = 0; i < 10; i++) {
  //     let testDoc = new Doc(
  //       'Workfront Generates $33 Million in Latest Funding Round',
  //       'Wireless News (Close-up Media)',
  //       '2/18/2019 @ 1:15pm',
  //       'private docId: string',
  //       'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Pulvinar elementum integer enim neque volutpat ac tincidunt vitae. Cursus turpis massa tincidunt dui ut. Leo a diam sollicitudin tempor id eu nisl. Vel risus commodo viverra maecenas accumsan lacus vel. Tellus elementum sagittis vitae et leo duis ut diam. Fusce ut placerat orci nulla pellentesque dignissim enim sit amet. Sit amet luctus venenatis lectus magna fringilla. Lacus viverra vitae congue eu consequat ac. Aenean sed adipiscing diam donec. Lobortis scelerisque fermentum dui faucibus. Morbi tristique senectus et netus...',
  //       ['tag1', 'tag2'],
  //       ['This is worst piece of writing I have ever attempted to read.', "comment2"]
  //     )
  //     this.documents.push(testDoc)
  //   }
  // }

  onSelectDoc(document) {
    this.selectedDoc = document;
    this.server.getDocContentById('4JHN-4PB0-TW9S-220N-00000-00')
      .subscribe((res: { result: string, content: string }) => {
        this.selectedDocContent = res.content;
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
          this.updateDocsDisplayed(docIDs.doc_ids)
        })
    }
  }

  updateDocsDisplayed(docIDs: string[]) {
    this.documents = []
    for (let i = 0; i < 50; i++) {
      this.server.getDocById(docIDs[i]).subscribe((doc: any) => {
        let newDoc = new Doc(doc.title, doc.source, doc.date, doc.DOC_ID, doc.preview, doc.tags, doc.comments)
        console.log(newDoc)
        this.documents.push(newDoc)
      })
    }
  }

  openDocViewer() {
    this.docViewer.open(DocViewerDialogueComponent, {
      width: '100vw',
      maxWidth: '100vw',
      height: '100vh',
      panelClass: 'docViewerContainer',
      data: { document: this.selectedDoc, content: this.selectedDocContent }
    });
    // dialogRef.afterClosed().subscribe(result => {
    //   console.log('The dialog was closed');
    // });
  }

  navigateToLexis() {
    this.router.navigate(['lexis_nexis'])
  }

}
