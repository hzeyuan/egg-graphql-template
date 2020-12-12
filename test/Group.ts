import { Field, Int, ObjectType,InputType,registerEnumType } from 'type-graphql';

@ObjectType()
export class Group {
    @Field(type => String,  { nullable: true })
    code: string;
    @Field(type => String)
    createdAt?: string;
    @Field(type => String)
    description?: string;
    @Field(type => String,  { nullable: true })
    name: string;
    @Field(type => String)
    updatedAt?: string;
    @Field(type => PaginatedUsers,  { nullable: true })
    users: PaginatedUsers!;
}
