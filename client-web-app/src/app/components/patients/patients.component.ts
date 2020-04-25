import { Component, OnInit } from '@angular/core';

import { PatientMediaService } from 'src/app/services/patient-media.service';
import { Patient } from 'src/app/models/patient';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.sass']
})
export class PatientsComponent implements OnInit {

  constructor(private patientMediaService: PatientMediaService) { }

  public patients: Patient[];
  displayedColumns: string[] = ['firstName', 'lastName', 'patientId'];

  ngOnInit(): void {
    console.log('Retrieving patients...');
    this.patientMediaService.getAllPatents().subscribe(data => {
      console.log('Found ' + data.length + ' patients');
      this.patients = data;
    });
  }

}
