import { Field, Int, ObjectType,InputType,registerEnumType } from 'type-graphql';

@InputType()
export class ChangePhoneStrategyInput {
    @Field(type => Boolean)
    verifyOldPhone?: Boolean;
}
