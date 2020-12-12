import { Field, Int, ObjectType,InputType,registerEnumType } from 'type-graphql';

@ObjectType()
export class App2WxappLoginStrategy {
    @Field(type => Boolean)
    ticketExchangeUserInfoNeedSecret?: Boolean;
    @Field(type => Int)
    ticketExpriresAfter?: number;
}
