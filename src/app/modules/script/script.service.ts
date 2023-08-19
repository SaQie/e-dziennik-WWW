import { HttpClient, HttpHeaderResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ScriptContent } from './model/ScriptContent';
import { ScriptResult } from './model/ScriptResult';

@Injectable({
  providedIn: 'root'
})
export class ScriptService {

  constructor(private httpClient: HttpClient) {

  }


  execute(scriptContent: ScriptContent) {
    return this.httpClient.post<HttpHeaderResponse>(`${environment.apiAddress}/scripts`, scriptContent, { observe: 'response' });
  }

  getResult(httpRequest: string) {
    return this.httpClient.get<ScriptResult>(httpRequest);
  }

}
