import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { Patient } from '../models/patient';
import { Media } from '../models/media';
import { PatientInfo } from '../models/patient-info';

@Injectable({
  providedIn: 'root'
})
export class PatientMediaService {

  // Get base url from environment
  private readonly baseUrl = environment.apiBaseUrl || '/api/v1';

  constructor(private http: HttpClient) {
    console.log('PatientMediaService created with base url: ' + this.baseUrl)
  }

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

  createMediaItem(patientUuid: string, fileName: string, contentType: string, file: File): Observable<HttpEvent<any>> {
    const url = this.baseUrl + '/media';

    // create form data to post
    const formData = new FormData();
    formData.append('PatientUuid', patientUuid);
    formData.append('FileName', fileName);
    formData.append('ContentType', contentType);
    formData.append('FileInfo', file, file.name);

    return this.http.post(url, formData, {reportProgress: true, observe: 'events'});
  }
}
