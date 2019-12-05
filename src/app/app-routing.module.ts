import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LocalViewComponent } from './local-view/local-view.component';
import { AppComponent } from './app.component';
import { LexisNexisSearchComponent } from './lexis-nexis-search/lexis-nexis-search.component';

const routes: Routes = [
  {
    path: '', component: AppComponent, children: [
      { path: '', redirectTo: 'lexis_nexis', pathMatch: 'full' },
      { path: 'local', component: LocalViewComponent },
      { path: 'lexis_nexis', component: LexisNexisSearchComponent },
      { path: '**', redirectTo: 'lexis_nexis', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
