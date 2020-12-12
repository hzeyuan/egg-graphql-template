import { Field, Int, ObjectType,InputType,registerEnumType } from 'type-graphql';

@ObjectType()
export class RegisterWhiteListConfig {
    @Field(type => Boolean)
    emailEnabled?: Boolean;
    @Field(type => Boolean)
    phoneEnabled?: Boolean;
    @Field(type => Boolean)
    usernameEnabled?: Boolean;
}
