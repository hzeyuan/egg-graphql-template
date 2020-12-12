import { Field, Int, ObjectType,InputType,registerEnumType } from 'type-graphql';

@ObjectType()
export class ChangeEmailStrategy {
    @Field(type => Boolean)
    verifyOldEmail?: Boolean;
}
