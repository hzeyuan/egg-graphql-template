import { Field, Int, ObjectType,InputType,registerEnumType } from 'type-graphql';

@ObjectType()
export class Role {
    @Field(type => String,  { nullable: true })
    arn: string;
    @Field(type => String,  { nullable: true })
    code: string;
    @Field(type => String)
    createdAt?: string;
    @Field(type => String)
    description?: string;
    @Field(type => Boolean)
    isSystem?: Boolean;
    @Field(type => Role)
    parent?: Role;
    @Field(type => String)
    updatedAt?: string;
    @Field(type => PaginatedUsers,  { nullable: true })
    users: PaginatedUsers!;
}
