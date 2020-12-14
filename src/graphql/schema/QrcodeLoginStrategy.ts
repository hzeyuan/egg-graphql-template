import { Field, Int, ObjectType,InputType,registerEnumType } from 'type-graphql';

@ObjectType()
export class QrcodeLoginStrategy {
    @Field(type => Boolean)
    allowExchangeUserInfoFromBrowser?: boolean;
    @Field(type => Int)
    qrcodeExpiresAfter?: number;
    @Field(type => Boolean)
    returnFullUserInfo?: boolean;
    @Field(type => Int)
    ticketExpiresAfter?: number;
}
