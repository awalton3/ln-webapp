/* Setup Components */
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';

/* Custom Components */
import { AppComponent } from './app.component';

/* Material Design */
import { MaterialFormsModule } from './shared/angular-material/material-forms.module';
import { MaterialGeneralModule } from './shared/angular-material/material-general.module';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { LocalViewComponent } from './local-view/local-view.component';
import { HttpClientModule } from '@angular/common/http';
import { LexisNexisSearchComponent } from './lexis-nexis-search/lexis-nexis-search.component';
import { DocumentComponent } from './shared/document/document.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';

import { DocViewerDialogueComponent } from './local-view/doc-viewer-dialogue/doc-viewer-dialogue.component';
import { DocAttributeViewerBottomsheetComponent } from './local-view/doc-viewer-dialogue/doc-attribute-viewer-bottomsheet/doc-attribute-viewer-bottomsheet.component';


@NgModule({
  declarations: [
    AppComponent,
    LocalViewComponent,
    LexisNexisSearchComponent,
    DocumentComponent,
    DocViewerDialogueComponent,
    DocAttributeViewerBottomsheetComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialGeneralModule,
    MaterialFormsModule,
    MatCardModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatToolbarModule,
    HttpClientModule,
    MatSidenavModule,
    MatExpansionModule,
    MatDividerModule,
    MatTooltipModule,
    MatChipsModule,
    MatDialogModule,
    MatBottomSheetModule
  ],
  providers: [MatDatepickerModule, MatBottomSheetModule],
  bootstrap: [AppComponent],
  entryComponents: [DocViewerDialogueComponent, DocAttributeViewerBottomsheetComponent]
})
export class AppModule { }
