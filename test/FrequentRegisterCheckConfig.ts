import { Field, Int, ObjectType,InputType,registerEnumType } from 'type-graphql';

@ObjectType()
export class FrequentRegisterCheckConfig {
    @Field(type => Boolean)
    enabled?: Boolean;
    @Field(type => Int)
    limit?: number;
    @Field(type => Int)
    timeInterval?: number;
}
