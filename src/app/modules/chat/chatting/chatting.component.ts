import { Component, OnInit } from '@angular/core';
import { ChattingService } from './chatting.service';
import { LoggedUserDto } from '../chat/model/LoggedUserDto';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from 'src/app/common/error/error-dialog/error-dialog.component';
import { AuthorizationService } from 'src/app/auth/services/authorization.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chatting',
  templateUrl: './chatting.component.html',
  styleUrls: ['./chatting.component.scss']
})
export class ChattingComponent implements OnInit{

  loggedUsers: LoggedUserDto[] = [];
  loggedAs!: string;

  constructor(private chattingService:ChattingService,
    private authService:AuthorizationService,
    private errorDialog: MatDialog,
    private router:Router){
  }

  ngOnInit(): void {
    this.chattingService.getLoggedUsers().subscribe({
      next: (data:LoggedUserDto[]) =>{
        this.loggedUsers = data;
        this.loggedAs = this.authService.getUsername()!;
      },
      error: (error:any) =>{
        this.errorDialog.open(ErrorDialogComponent, {
          data: {
            message: 'An error occurred during fetching logged users.',
            error: error
          }
        });
      }
    })  
  }

  enterChat(receipientId:string, receipientName: string){
    this.router.navigate(['chat'], {state: {receipientId: receipientId, receipientName: receipientName},})
  }





}
