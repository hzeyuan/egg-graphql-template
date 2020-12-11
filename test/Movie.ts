import { Field, Int, ObjectType, } from 'type-graphql';

@ObjectType()
class Movie {
    @Field(type => Int,  { nullable: true })
    id: number;
    @Field(type => String)
    title?: string;
}
