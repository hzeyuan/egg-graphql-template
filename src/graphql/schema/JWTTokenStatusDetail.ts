import { Field, Int, ObjectType,InputType,registerEnumType } from 'type-graphql';

@ObjectType()
export class JWTTokenStatusDetail {
    @Field(type => String)
    arn?: string;
    @Field(type => String)
    id?: string;
    @Field(type => String)
    userPoolId?: string;
}
