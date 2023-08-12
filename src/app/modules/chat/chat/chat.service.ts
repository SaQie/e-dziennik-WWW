import { ChangeDetectorRef, Injectable } from '@angular/core';
import { ChatMessage } from './model/ChatMessage';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { BehaviorSubject } from 'rxjs';
import { AuthorizationService } from 'src/app/auth/services/authorization.service';
import { HttpClient } from '@angular/common/http';
import { Page } from 'src/app/common/Page';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  stompClient: any;
  private messageReceivedSource = new BehaviorSubject<ChatMessage[]>([]);
  private chatIdSubject = new BehaviorSubject<string>('');
  chatIdSubject$ = this.chatIdSubject.asObservable();
  private pageSize = new BehaviorSubject<number>(1);
  pageSizeSubject$ = this.pageSize.asObservable();
  messageReceived$ = this.messageReceivedSource.asObservable();

  constructor(private authService: AuthorizationService,
    private httpClient: HttpClient) { }

  public openConnection(receiverId: string) {
    // this.webSocket = new WebSocket('ws://localhost:8080/chat');
    let ws = new SockJS("http://localhost:8080/chat");
    this.stompClient = Stomp.over(ws);
    let senderId = this.authService.getId()!


    this.stompClient.connect({}, (frame: any) => {

      this.httpClient.get<string>(`http://localhost:8080/api/v1/chat/chatroom/${receiverId}/${senderId}`).subscribe({
        next: (chatId: string) => {
          this.chatIdSubject.next(chatId);
          this.httpClient.get<Page<ChatMessage[]>>(`http://localhost:8080/api/v1/chat/history/${chatId}`).subscribe({
            next: (chatMessages: Page<ChatMessage[]>) => {
              this.pageSize.next(chatMessages.pagesCount);
              this.messageReceivedSource.next(chatMessages.content);
              this.stompClient.subscribe('/user/' + chatId + '/messages/chat', (message: any) => {
                if (message.body) {
                  const chatMessage: ChatMessage = JSON.parse(message.body);
                  this.messageReceivedSource.next([...this.messageReceivedSource.value, chatMessage]);
                }
              });
            },
            error: (error: any) => {
              console.log(error);
            }
          })

        },
        error: (error: any) => {
          console.log(error);
        }
      });
    })


  }

  public loadMoreMessages(chatId: string, page: number, size: number) {
    return this.httpClient.get<Page<ChatMessage[]>>(`http://localhost:8080/api/v1/chat/history/${chatId}?page=${page}&size=${size}`);
  }


  public sendMessage(chatMessage: ChatMessage) {
    this.stompClient.send('/messages/chat', {}, JSON.stringify(chatMessage));
  }

  public closeWebSocket() {
    this.stompClient.disconnect();
  }


}
