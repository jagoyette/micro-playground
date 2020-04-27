import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { Patient } from 'src/app/models/patient';
import { Media } from 'src/app/models/media';
import { PatientMediaService } from 'src/app/services/patient-media.service';
import { MatDialog } from '@angular/material/dialog';
import { NewMediaDialogComponent } from '../new-media-dialog/new-media-dialog.component';

@Component({
  selector: 'app-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.scss']
})
export class MediaComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private patientMediaService: PatientMediaService,
              private mediaDialog: MatDialog) { }

  public patient: Patient;
  public media: Media[];

  ngOnInit(): void {
    // subscribe to route changes
    this.route.paramMap.subscribe( (params: ParamMap) => {
      console.log('Detected route change');
      this.initializeWithPatientId(params.get('patientUuid'));
    });

  }

  createNewMedia(): void {
    const dialogRef = this.mediaDialog.open(NewMediaDialogComponent,
      { data: { patientUuid: this.patient.uuid}});

    // Subscribe to close event
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Successfully added new media');
        const newMedia = result;
        const newList = this.media;
        newList.push(newMedia);
        this.media = newList.slice();
     }
    });
  }

  getMediaUrl(mediaItem: Media): string {
    return this.patientMediaService.getMediaFileUrl(mediaItem.uuid);
  }

  private initializeWithPatientId(patientUuid: string): void {
    console.log('Initializing media for patient ' + patientUuid);

    // clear existing model data
    this.media = null;
    this.patient = null;

    this.patientMediaService.getPatient(patientUuid).subscribe(data => {
      this.patient = data;
      console.log('Retrieved patient data.');
    });

    this.patientMediaService.getMediaForPatent(patientUuid).subscribe(data => {
      this.media = data;
      console.log('Retrieved ' + data.length + ' media items');
    });

  }
}
