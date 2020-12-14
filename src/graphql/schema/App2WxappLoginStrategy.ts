import { Field, Int, ObjectType,InputType,registerEnumType } from 'type-graphql';

@ObjectType()
export class App2WxappLoginStrategy {
    @Field(type => Boolean)
    ticketExchangeUserInfoNeedSecret?: boolean;
    @Field(type => Int)
    ticketExpriresAfter?: number;
}
