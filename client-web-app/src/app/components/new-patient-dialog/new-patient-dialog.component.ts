import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

import { Patient } from 'src/app/models/patient';
import { PatientMediaService } from 'src/app/services/patient-media.service';


@Component({
  selector: 'app-new-patient-dialog',
  templateUrl: './new-patient-dialog.component.html',
  styleUrls: ['./new-patient-dialog.component.scss']
})
export class NewPatientDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<NewPatientDialogComponent>,
              private patientService: PatientMediaService) { }

  public newPatient: Patient;

  ngOnInit(): void {
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
