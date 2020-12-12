import { Field, Int, ObjectType,InputType,registerEnumType } from 'type-graphql';

@ObjectType()
export class JWTTokenStatus {
    @Field(type => Int)
    code?: number;
    @Field(type => JWTTokenStatusDetail)
    data?: JWTTokenStatusDetail;
    @Field(type => Int)
    exp?: number;
    @Field(type => Int)
    iat?: number;
    @Field(type => String)
    message?: string;
    @Field(type => Boolean)
    status?: Boolean;
}
