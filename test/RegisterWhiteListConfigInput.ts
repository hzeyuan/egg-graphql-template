import { Field, Int, ObjectType,InputType,registerEnumType } from 'type-graphql';

@InputType()
export class RegisterWhiteListConfigInput {
    @Field(type => Boolean)
    emailEnabled?: Boolean;
    @Field(type => Boolean)
    phoneEnabled?: Boolean;
    @Field(type => Boolean)
    usernameEnabled?: Boolean;
}
