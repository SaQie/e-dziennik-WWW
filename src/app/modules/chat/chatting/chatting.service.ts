import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LoggedUserDto } from '../chat/model/LoggedUserDto';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class ChattingService {

  constructor(private httpClient: HttpClient) { }

  getLoggedUsers(){
    return this.httpClient.get<LoggedUserDto[]>(`${environment.apiAddress}/users/logged-users`);
  }

}
