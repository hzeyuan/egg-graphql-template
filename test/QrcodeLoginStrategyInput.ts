import { Field, Int, ObjectType,InputType,registerEnumType } from 'type-graphql';

@InputType()
export class QrcodeLoginStrategyInput {
    @Field(type => Boolean)
    allowExchangeUserInfoFromBrowser?: Boolean;
    @Field(type => Int)
    qrcodeExpiresAfter?: number;
    @Field(type => Boolean)
    returnFullUserInfo?: Boolean;
    @Field(type => Int)
    ticketExpiresAfter?: number;
}
