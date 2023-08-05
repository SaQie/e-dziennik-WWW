import { Component, OnDestroy, OnInit } from '@angular/core';
import { webSocket } from "rxjs/webSocket";
import { ChatService } from './chat.service';
import { NgForm } from '@angular/forms';
import { ChatMessage } from './model/ChatMessage';
import { Subscription } from 'rxjs';
import { AuthorizationService } from 'src/app/auth/services/authorization.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy{

  chatMessages: ChatMessage[] = [];
  private messageSubscription!: Subscription;
  receipientName:string;
  receipientId: string;
  senderName: string;
  

  constructor(public chatService: ChatService,
     private authService : AuthorizationService,
     private router:Router){
      const navigation = this.router.getCurrentNavigation();
      this.receipientId = navigation?.extras?.state!['receipientId'];
      this.receipientName = navigation?.extras?.state!['receipientName'];
      this.senderName = this.authService.getUsername()!;
      
  }
  
  ngOnInit(): void {
    this.chatService.openConnection(this.receipientId);
    this.messageSubscription = this.chatService.messageReceived$.subscribe((messages) => {
      this.chatMessages = messages;
    });
  }

  ngOnDestroy(): void {
    this.chatService.closeWebSocket();
    this.messageSubscription.unsubscribe();
  }
  
  sendMessage(form: NgForm){
    let senderId = this.authService.getId();
    console.log(this.receipientName);
    const chatMessage: ChatMessage = {
      recipientName: this.receipientName,
      senderName: this.senderName,
      chatContent: form.value.message,
      recipientId: this.receipientId,
      senderId: senderId!,
      chatId: sessionStorage.getItem("chatId")!
    };
    this.chatService.sendMessage(chatMessage); 
  }
}
