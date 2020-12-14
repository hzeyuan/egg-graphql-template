import { Field, Int, ObjectType,InputType,registerEnumType } from 'type-graphql';

@InputType()
export class RegisterWhiteListConfigInput {
    @Field(type => Boolean)
    emailEnabled?: boolean;
    @Field(type => Boolean)
    phoneEnabled?: boolean;
    @Field(type => Boolean)
    usernameEnabled?: boolean;
}
