import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Page } from 'src/app/common/Page';
import { environment } from 'src/environments/environment';
import { SchoolSummary } from './model/SchoolSummary';
import { SchoolLevel } from './model/SchoolLevel';
import { CreateSchoolRequest } from './model/CreateSchoolRequest';
import { SchoolDetails } from './model/SchoolDetails';

@Injectable({
  providedIn: 'root'
})
export class SchoolManagementService {

  constructor(private httpClient: HttpClient) { }

  getSchoolSummary(pageIndex: number, pageSize: number) {
    return this.httpClient.get<Page<SchoolSummary[]>>(`${environment.apiAddress}/schools?page=${pageIndex}&size=${pageSize}`);
  }

  deleteSchool(uuid: String) {
    return this.httpClient.delete(`${environment.apiAddress}/schools/${uuid}`);
  }

  getSchoolLevels() {
    return this.httpClient.get<SchoolLevel[]>(`${environment.apiAddress}/schoollevels`);
  }

  createSchool(request: CreateSchoolRequest) {
    return this.httpClient.post(`${environment.apiAddress}/schools/`, request)
  }

  getSchool(uuid: String){
    return this.httpClient.get<SchoolDetails>(`${environment.apiAddress}/schools/${uuid}`);
  }

}
