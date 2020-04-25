import { Component, OnInit } from '@angular/core';

import { Patient } from './models/patient';
import { Media } from './models/media';
import { PatientMediaService } from './services/patient-media.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  title = 'client-web-app';

  constructor(private patientMediaService: PatientMediaService) {}

  public patients: Patient[];


  ngOnInit(): void {
    console.log('Retrieving patients...');
    this.patientMediaService.getAllPatents().subscribe(data => {
      console.log('Found ' + data.length + ' patients');
      this.patients = data;

      this.patients.forEach(patient => {
        this.patientMediaService.getMediaForPatent(patient.uuid).subscribe(mediaData => {
          console.log('Patient ' + patient.uuid + ' has ' + mediaData.length + ' media items');
        });
      });
    });
  }
}
