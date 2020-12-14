import { Field, Int, ObjectType,InputType,registerEnumType } from 'type-graphql';

@ObjectType()
export class RefreshToken {
    @Field(type => Int)
    exp?: number;
    @Field(type => Int)
    iat?: number;
    @Field(type => String)
    token?: string;
}
