import { Field, Int, ObjectType,InputType,registerEnumType } from 'type-graphql';

@ObjectType()
export class PaginatedRoles {
    @Field(type => [Role]!,  { nullable: true })
    list: [Role]!;
    @Field(type => Int,  { nullable: true })
    totalCount: number;
}
