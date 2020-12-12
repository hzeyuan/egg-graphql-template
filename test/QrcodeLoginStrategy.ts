import { Field, Int, ObjectType,InputType,registerEnumType } from 'type-graphql';

@ObjectType()
export class QrcodeLoginStrategy {
    @Field(type => Boolean)
    allowExchangeUserInfoFromBrowser?: Boolean;
    @Field(type => Int)
    qrcodeExpiresAfter?: number;
    @Field(type => Boolean)
    returnFullUserInfo?: Boolean;
    @Field(type => Int)
    ticketExpiresAfter?: number;
}
