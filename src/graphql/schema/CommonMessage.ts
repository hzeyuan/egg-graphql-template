import { Field, Int, ObjectType,InputType,registerEnumType } from 'type-graphql';

@ObjectType()
export class CommonMessage {
    @Field(type => Int)
    code?: number;
    @Field(type => String)
    message?: string;
}
