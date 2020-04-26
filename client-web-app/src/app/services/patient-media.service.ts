import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Patient } from '../models/patient';
import { Media } from '../models/media';

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

  getMediaForPatent(id: string): Observable<Media[]> {
    const url = this.baseUrl + '/media';
    return this.http.get<Media[]>(url, { params: {patientUuid: id} });
  }

  getMediaItem(uuid: string): Observable<Media> {
    const url = this.baseUrl + '/media/' + uuid;
    return this.http.get<Media>(url);
  }
}
