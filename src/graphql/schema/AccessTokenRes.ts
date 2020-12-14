import { Field, Int, ObjectType,InputType,registerEnumType } from 'type-graphql';

@ObjectType()
export class AccessTokenRes {
    @Field(type => String)
    accessToken?: string;
    @Field(type => Int)
    exp?: number;
    @Field(type => Int)
    iat?: number;
}
