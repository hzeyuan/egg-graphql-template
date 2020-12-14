import { Field, Int, ObjectType,InputType,registerEnumType } from 'type-graphql';

@InputType()
export class QrcodeLoginStrategyInput {
    @Field(type => Boolean)
    allowExchangeUserInfoFromBrowser?: boolean;
    @Field(type => Int)
    qrcodeExpiresAfter?: number;
    @Field(type => Boolean)
    returnFullUserInfo?: boolean;
    @Field(type => Int)
    ticketExpiresAfter?: number;
}
