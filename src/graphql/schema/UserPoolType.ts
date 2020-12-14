import { Field, Int, ObjectType,InputType,registerEnumType } from 'type-graphql';

@ObjectType()
export class UserPoolType {
    @Field(type => String)
    code?: string;
    @Field(type => String)
    description?: string;
    @Field(type => String)
    image?: string;
    @Field(type => String)
    name?: string;
    @Field(type => [String])
    sdks?: [String];
}
