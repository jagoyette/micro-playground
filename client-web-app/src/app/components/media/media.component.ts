import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { Patient } from 'src/app/models/patient';
import { Media } from 'src/app/models/media';
import { PatientMediaService } from 'src/app/services/patient-media.service';

@Component({
  selector: 'app-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.scss']
})
export class MediaComponent implements OnInit {

  constructor(private route: ActivatedRoute, private patientMediaService: PatientMediaService) { }

  public patient: Patient;
  public media: Media[];

  ngOnInit(): void {
    // subscribe to route changes
    this.route.paramMap.subscribe( (params: ParamMap) => {
      console.log('Detected route change');
      this.initializeWithPatientId(params.get('patientUuid'));
    });

  }

  private initializeWithPatientId(patientUuid: string): void {
    console.log('Initializing media for patient ' + patientUuid);

    this.media = null;
    this.patient = null;

  
  }
}