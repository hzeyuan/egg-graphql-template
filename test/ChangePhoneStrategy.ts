import { Field, Int, ObjectType,InputType,registerEnumType } from 'type-graphql';

@ObjectType()
export class ChangePhoneStrategy {
    @Field(type => Boolean)
    verifyOldPhone?: Boolean;
}
