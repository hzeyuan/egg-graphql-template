import { Field, Int, ObjectType,InputType,registerEnumType } from 'type-graphql';

@InputType()
export class App2WxappLoginStrategyInput {
    @Field(type => Boolean)
    ticketExchangeUserInfoNeedSecret?: boolean;
    @Field(type => Int)
    ticketExpriresAfter?: number;
}
