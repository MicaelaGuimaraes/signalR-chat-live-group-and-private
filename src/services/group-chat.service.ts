import * as signalR from '@microsoft/signalr';
import { EventEmitter, Injectable } from '@angular/core';
import { MessageModels } from 'src/models/MessageModels';
import { MessageTypeEnum } from 'src/enum/MessageTypeEnum';

export class GroupChatService {
    public onConnectionSuccessfully: EventEmitter<void>;
    public newMessageReceivedEvent: EventEmitter<MessageModels>;
    public userEnteredEvent: EventEmitter<MessageModels>;
    public userExitEvent: EventEmitter<MessageModels>;

    private _hubConnection!: signalR.HubConnection;
    private _currentUserName: string;

    constructor() {
        this.newMessageReceivedEvent = new EventEmitter<MessageModels>();
        this.userEnteredEvent = new EventEmitter<MessageModels>();
        this.userExitEvent = new EventEmitter<MessageModels>();
        this.onConnectionSuccessfully = new EventEmitter();
        this._currentUserName = '';
    }

    public get CurrentUserName(): string {
        const id: any = localStorage.getItem("id");
        return id
    }

    public initializeNewUserConnectionAsync(userName: string): Promise<void> {
        this._currentUserName = userName;
        this._hubConnection = new signalR.HubConnectionBuilder()
            .withUrl('https://localhost:5001/chat-group-hub', {
                skipNegotiation: true,
                transport: signalR.HttpTransportType.WebSockets
            })
            .build();

        this.assignNewMessageReceived();
        this.assignOnUserEnterChatAsync();
        this.assignOnUserExitChatAsync();

        return this._hubConnection.start().then(() => {
            this.onConnectionSuccessfully.emit();
            this._hubConnection.send('OnEnterChatAsync', this.CurrentUserName);
        });
    }

    public leaveChatAsync(): Promise<void> {
        return this._hubConnection.send('OnExitChatAsync', this.CurrentUserName)
            .then(() => {
                this._hubConnection.stop();
            });
    }

    public sendNewMessage(message: string): void {
        console.log('OnNewMessageAsync', this.CurrentUserName, message)
        this._hubConnection.send('OnNewMessageAsync', this.CurrentUserName, message);
    }

    public setUserName(name: string): void {
        localStorage.setItem('username', name);
    }

    private assignNewMessageReceived(): void {
        this._hubConnection.on('OnNewMessageAsync', (userName: string, messageContent: string) => {
            const newMessage = new MessageModels(userName, messageContent, MessageTypeEnum.OtherUser);
            this.newMessageReceivedEvent.emit(newMessage);
        });
    }

    private assignOnUserEnterChatAsync(): void {
        this._hubConnection.on('OnEnterChatAsync', (userName: string) => {
            const newMessage = new MessageModels(userName, `${userName} ingressou no chat`, MessageTypeEnum.ChatActions);
            this.newMessageReceivedEvent.emit(newMessage);
        });
    }

    private assignOnUserExitChatAsync(): void {
        this._hubConnection.on('OnExitChatAsync', (userName: string) => {
            const newMessage = new MessageModels(userName, `${userName} saiu do chat`, MessageTypeEnum.ChatActions);
            this.newMessageReceivedEvent.emit(newMessage);
        });
    }
}
