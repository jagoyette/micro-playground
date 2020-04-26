import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

import { PatientInfo } from 'src/app/models/patient-info';


@Component({
  selector: 'app-new-patient-dialog',
  templateUrl: './new-patient-dialog.component.html',
  styleUrls: ['./new-patient-dialog.component.scss']
})
export class NewPatientDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<NewPatientDialogComponent>) { }

  public patientInfo: PatientInfo;

  ngOnInit(): void {
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
