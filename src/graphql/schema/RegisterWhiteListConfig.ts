import { Field, Int, ObjectType,InputType,registerEnumType } from 'type-graphql';

@ObjectType()
export class RegisterWhiteListConfig {
    @Field(type => Boolean)
    emailEnabled?: boolean;
    @Field(type => Boolean)
    phoneEnabled?: boolean;
    @Field(type => Boolean)
    usernameEnabled?: boolean;
}
