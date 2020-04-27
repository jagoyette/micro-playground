import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Patient } from '../models/patient';
import { Media } from '../models/media';
import { PatientInfo } from '../models/patient-info';

@Injectable({
  providedIn: 'root'
})
export class PatientMediaService {

  private readonly baseUrl = 'http://localhost/api/v1';

  constructor(private http: HttpClient) { }

  getAllPatents(): Observable<Patient[]> {
    const url = this.baseUrl + '/patients';
    return this.http.get<Patient[]>(url);
  }

  getPatient(uuid: string): Observable<Patient> {
    const url = this.baseUrl + '/patients/' + uuid;
    return this.http.get<Patient>(url);
  }

  createPatient(patientInfo: PatientInfo): Observable<Patient> {
    const url = this.baseUrl + '/patients';
    return this.http.post<Patient>(url, patientInfo);
  }

  getMediaForPatent(patientUuidIn: string): Observable<Media[]> {
    const url = this.baseUrl + '/media';
    return this.http.get<Media[]>(url, { params: {patientUuid: patientUuidIn} });
  }

  getMediaItem(uuid: string): Observable<Media> {
    const url = this.baseUrl + '/media/' + uuid;
    return this.http.get<Media>(url);
  }

  getMediaFileUrl(uuid: string): string {
    return this.baseUrl + '/media/' + uuid + '/file';
  }

  createMediaItem(patientUuid: string, fileName: string, contentType: string, file: File): Observable<Media> {
    const url = this.baseUrl + '/media';

    // create form data to post
    const formData = new FormData();
    formData.append('file', file, file.name);
    formData.append('patientUuid', patientUuid);
    formData.append('fileName', fileName);
    formData.append('contentType', contentType);

    return this.http.post<Media>(url, formData);
  }
}
