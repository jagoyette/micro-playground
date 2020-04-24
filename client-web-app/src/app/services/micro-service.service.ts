import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Patient } from '../models/patient';

@Injectable({
  providedIn: 'root'
})
export class MicroServiceService {

  private readonly baseUrl = 'http://localhost/api/v1/';

  constructor(private http: HttpClient) { }

  getAllPatents(): Observable<Patient[]> {
    const url = this.baseUrl + 'patients';
    return this.http.get<Patient[]>(url);
  }
}
