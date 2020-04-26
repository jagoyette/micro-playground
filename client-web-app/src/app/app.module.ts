import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatSliderModule } from '@angular/material/slider';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDividerModule } from '@angular/material/divider';
import { MatTableModule } from '@angular/material/table';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { PatientsComponent } from './components/patients/patients.component';
import { MediaComponent } from './components/media/media.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PatientsComponent,
    MediaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatSliderModule, MatCardModule, MatButtonModule,
    MatMenuModule, MatSidenavModule, MatToolbarModule,
    MatDividerModule, MatTableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
