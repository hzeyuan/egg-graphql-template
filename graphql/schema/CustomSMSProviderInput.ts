import { Field, Int, ObjectType,InputType,registerEnumType } from 'type-graphql';

@InputType()
export class CustomSMSProviderInput {
    @Field(type => SMSConfig253Input)
    config253?: SMSConfig253Input;
    @Field(type => Boolean)
    enabled?: boolean;
    @Field(type => String)
    provider?: string;
}
