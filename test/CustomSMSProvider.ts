import { Field, Int, ObjectType,InputType,registerEnumType } from 'type-graphql';

@ObjectType()
export class CustomSMSProvider {
    @Field(type => SMSConfig253)
    config253?: SMSConfig253;
    @Field(type => Boolean)
    enabled?: Boolean;
    @Field(type => String)
    provider?: string;
}
