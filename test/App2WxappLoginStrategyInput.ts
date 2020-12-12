import { Field, Int, ObjectType,InputType,registerEnumType } from 'type-graphql';

@InputType()
export class App2WxappLoginStrategyInput {
    @Field(type => Boolean)
    ticketExchangeUserInfoNeedSecret?: Boolean;
    @Field(type => Int)
    ticketExpriresAfter?: number;
}
