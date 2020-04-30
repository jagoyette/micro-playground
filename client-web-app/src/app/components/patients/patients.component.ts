import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { PatientMediaService } from 'src/app/services/patient-media.service';
import { Patient } from 'src/app/models/patient';
import { NewPatientDialogComponent } from '../new-patient-dialog/new-patient-dialog.component';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.scss']
})
export class PatientsComponent implements OnInit {

  constructor(private router: Router,
              private patientMediaService: PatientMediaService,
              private newPatientDialog: MatDialog) { }

  public patients: Patient[];
  public displayedColumns: string[] = ['firstName', 'lastName', 'patientId'];
  public selectedPatient: Patient;

  ngOnInit(): void {
    console.log('Retrieving patients...');
    this.patientMediaService.getAllPatents().subscribe(data => {
      console.log('Found ' + data.length + ' patients');
      this.patients = data;
    });
  }

  selectPatient(row: Patient): void {
    this.selectedPatient = row;
  }

  showPatientMedia(patientUuid: string): Promise<boolean> {
    return this.router.navigate(['/media', patientUuid]);
  }

  createNewPatient(): void {
    const dialogRef = this.newPatientDialog.open(NewPatientDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const patientInfo = result;
        if (patientInfo.firstName && patientInfo.lastName && patientInfo.patientId) {
          console.log('Creating new Patient for ' + patientInfo.firstName + ' ' + patientInfo.lastName);
          this.patientMediaService.createPatient(patientInfo).subscribe(data => {
            console.log('Success creating new patient Uuid: ' + data.uuid);
            const newList = this.patients;
            newList.push(data);
            this.patients = newList.slice();
          });
        }
     }
    });
  }
}
