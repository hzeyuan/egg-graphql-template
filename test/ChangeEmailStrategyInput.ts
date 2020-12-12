import { Field, Int, ObjectType,InputType,registerEnumType } from 'type-graphql';

@InputType()
export class ChangeEmailStrategyInput {
    @Field(type => Boolean)
    verifyOldEmail?: Boolean;
}
