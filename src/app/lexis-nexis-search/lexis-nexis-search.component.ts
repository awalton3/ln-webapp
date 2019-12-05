import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lexis-nexis-search',
  templateUrl: './lexis-nexis-search.component.html',
  styleUrls: ['./lexis-nexis-search.component.css']
})

export class LexisNexisSearchComponent implements OnInit {

  constructor(private router: Router) {}

  // Initialize Variables
  searchForm: FormGroup;
  validGroups = [
    'All English Language News',
    'All News, All Languages',
    'Banking Industry News Sources',
    'Business/Finance News', 'Computer News',
    'Environment Stories',
    'European Publications - English Language',
    'Newsbank',
    'Non-English Language News',
    'People-Related News, All',
    'World News'
  ]

  ngOnInit() {
    this.initForm()
    // this.fetchTestDoc('5GN0-T2Y1-F06S-P4SX-00000-00')
  }

  initForm() {
    this.searchForm = new FormGroup({
      'keyword': new FormControl(null),
      'dateTo': new FormControl(null),
      'dateFrom': new FormControl(null),
      'sources': new FormControl(null),
      'groups': new FormControl(null)
    })
  }

  // fetchTestDoc(docId: string) {
  //   this.http.get("http://student04.cse.nd.edu:51087/articles/" + docId)
  //     .subscribe(docObj => {
  //       console.log(docObj)
  //     })
  // }

  navigateToLocal() {
    this.router.navigate(['local'])
  }

}
