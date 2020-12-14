import { Field, Int, ObjectType,InputType,registerEnumType } from 'type-graphql';

@ObjectType()
export class SMSConfig253 {
    @Field(type => String,  { nullable: true })
    appId: string;
    @Field(type => String,  { nullable: true })
    key: string;
    @Field(type => String,  { nullable: true })
    sendSmsApi: string;
    @Field(type => String,  { nullable: true })
    template: string;
    @Field(type => Int,  { nullable: true })
    ttl: number;
}
