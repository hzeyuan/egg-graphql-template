import { Field, Int, ObjectType,InputType,registerEnumType } from 'type-graphql';

@ObjectType()
export class PaginatedUsers {
    @Field(type => [User]!,  { nullable: true })
    list: [User]!;
    @Field(type => Int)
    pageNo?: number;
    @Field(type => Int)
    pageSize?: number;
    @Field(type => Int,  { nullable: true })
    totalCount: number;
}
