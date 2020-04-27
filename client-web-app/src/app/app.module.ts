import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';

import { MatSliderModule } from '@angular/material/slider';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDividerModule } from '@angular/material/divider';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule, MatIcon } from '@angular/material/icon';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { PatientsComponent } from './components/patients/patients.component';
import { MediaComponent } from './components/media/media.component';
import { NewPatientDialogComponent } from './components/new-patient-dialog/new-patient-dialog.component';
import { NewMediaDialogComponent } from './components/new-media-dialog/new-media-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PatientsComponent,
    MediaComponent,
    NewPatientDialogComponent,
    NewMediaDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    FormsModule,
    MatSliderModule, MatCardModule, MatButtonModule,
    MatMenuModule, MatSidenavModule, MatToolbarModule,
    MatDividerModule, MatTableModule, MatDialogModule,
    MatFormFieldModule, MatInputModule, MatIconModule
  ],
  entryComponents: [
    NewPatientDialogComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
