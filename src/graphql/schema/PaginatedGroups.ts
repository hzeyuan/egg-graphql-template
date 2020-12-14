import { Field, Int, ObjectType,InputType,registerEnumType } from 'type-graphql';

@ObjectType()
export class PaginatedGroups {
    @Field(type => [Group]!,  { nullable: true })
    list: [Group]!;
    @Field(type => Int,  { nullable: true })
    totalCount: number;
}
