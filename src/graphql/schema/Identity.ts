import { Field, Int, ObjectType,InputType,registerEnumType } from 'type-graphql';

@ObjectType()
export class Identity {
    @Field(type => String)
    connectionId?: string;
    @Field(type => Boolean)
    isSocial?: boolean;
    @Field(type => String)
    openid?: string;
    @Field(type => String)
    provider?: string;
    @Field(type => String)
    userId?: string;
    @Field(type => String)
    userIdInIdp?: string;
    @Field(type => String)
    userPoolId?: string;
}
