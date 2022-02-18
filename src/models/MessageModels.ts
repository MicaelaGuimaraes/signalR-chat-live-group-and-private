import { MessageTypeEnum } from "src/enum/MessageTypeEnum";

export class MessageModels {
    public userId: string;
    public content: string;
    public type: MessageTypeEnum;

    constructor(userId: string, content: string, type: MessageTypeEnum) {
        this.userId = userId;
        this.content = content;
        this.type = type;
    }
}
