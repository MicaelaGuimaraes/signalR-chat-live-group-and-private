import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MessageTypeEnum } from 'src/enum/MessageTypeEnum';
import { MessageModels } from 'src/models/MessageModels';
import { GroupChatService } from 'src/services/group-chat.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  messageTypeEnumRef: typeof MessageTypeEnum;
  chatMessages: any[] = [];
  liveChatOn!: boolean;

  constructor(
    private liveGroupChatService: GroupChatService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute
  ) {
    this.messageTypeEnumRef = MessageTypeEnum;
  }
  public ngOnInit(): void {
    this._activatedRoute.queryParams.subscribe((params: Params) => {
      const userName = params['userName'];
      this.liveGroupChatService.initializeNewUserConnectionAsync(userName)
        .then(() => {
          this.liveChatOn = true;
        });
    });

    this.liveGroupChatService.newMessageReceivedEvent.subscribe((newMessage: MessageModels) => {
      this.chatMessages.push(newMessage);
    });
  }

  public sendNewMessage(messageInput: HTMLInputElement): void {
    const messageContent = messageInput.value;
    console.log("messageContent", messageContent)
    const id: number | any = localStorage.getItem("id");
    const newMessage = new MessageModels(id, messageContent, MessageTypeEnum.CurrentUserMessage);
    this.chatMessages.push(newMessage);
    this.liveGroupChatService.sendNewMessage(messageContent);
    messageInput.value = '';
  }

  public leaveChatAsync(): void {
    this.liveGroupChatService.leaveChatAsync()
      .then(() => {
        this.liveChatOn = false;
        this._router.navigate(['']);
      });
  }
}
