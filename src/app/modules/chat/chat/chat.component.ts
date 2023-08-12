import { ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { webSocket } from "rxjs/webSocket";
import { ChatService } from './chat.service';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ChatMessage } from './model/ChatMessage';
import { Subscription } from 'rxjs';
import { AuthorizationService } from 'src/app/auth/services/authorization.service';
import { Router } from '@angular/router';
import { Page } from 'src/app/common/Page';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy {

  chatMessages: ChatMessage[] = [];
  messageForm: FormGroup;
  chatId!: string;
  private messageSubscription!: Subscription;
  private chatIdSubscription!: Subscription;
  private pagesCountSubscription!: Subscription;
  receipientName: string;
  receipientId: string;
  senderName: string;
  private currentPage = 1;
  private pageSize = 20;
  private pagesCount = 1;
  isLoadingMessages = false;

  @ViewChild('chatMessagesContainer') chatMessagesContainer!: ElementRef;


  constructor(public chatService: ChatService,
    private authService: AuthorizationService,
    private router: Router,
    private formBuilder: FormBuilder,
    private detectRef: ChangeDetectorRef) {
    const navigation = this.router.getCurrentNavigation();
    this.receipientId = navigation?.extras?.state!['receipientId'];
    this.receipientName = navigation?.extras?.state!['receipientName'];
    this.senderName = this.authService.getUsername()!;
    this.messageForm = formBuilder.group({
      message: ['', Validators.required],
    })

  }

  ngOnInit(): void {
    this.chatService.openConnection(this.receipientId);
    this.messageSubscription = this.chatService.messageReceived$.subscribe((messages) => {
      this.chatMessages = messages;
      this.detectRef.detectChanges();
      this.scrollChatToBottom();
    });
    this.chatIdSubscription = this.chatService.chatIdSubject$.subscribe((chatId) => {
      this.chatId = chatId;
    });
    this.chatMessagesContainer.nativeElement.addEventListener('scroll', this.handleScroll);
    this.pagesCountSubscription = this.chatService.pageSizeSubject$.subscribe((pagesCount) => {
      this.pagesCount = pagesCount;
    })
  }

  handleScroll = (event: Event) => {
    const element = event.target as HTMLElement;
    if (element.scrollTop === 0 && !this.isLoadingMessages && this.pagesCount >= this.currentPage) {
      this.isLoadingMessages = true;
      this.currentPage++;
      setTimeout(() => {
        this.chatService.loadMoreMessages(this.chatId, this.currentPage, this.pageSize).subscribe({
          next: (chatMessages: Page<ChatMessage[]>) => {
            const newMessages = chatMessages.content.concat(this.chatMessages);
            this.chatMessages = newMessages;
            this.isLoadingMessages = false;
            this.detectRef.detectChanges();
          }
        });

      }, 1000);
    }
  };


  ngOnDestroy(): void {
    this.chatService.closeWebSocket();
    this.messageSubscription.unsubscribe();
  }

  sendMessage() {
    if (this.messageForm.valid) {
      let senderId = this.authService.getId();
      console.log(this.receipientName);
      const chatMessage: ChatMessage = {
        recipientName: this.receipientName,
        senderName: this.senderName,
        chatContent: this.messageForm.value['message'],
        recipientId: this.receipientId,
        senderId: senderId!,
        chatId: this.chatId!
      };
      this.chatService.sendMessage(chatMessage);
    }
  }

  scrollChatToBottom() {
    if (this.chatMessagesContainer && this.chatMessagesContainer.nativeElement) {
      const container = this.chatMessagesContainer.nativeElement;
      container.scrollTop = container.scrollHeight - container.clientHeight;
    }
  }
}
