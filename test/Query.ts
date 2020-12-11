import { Field, Int, ObjectType, } from 'type-graphql';

@ObjectType()
class Query {
    @Field(type => Movie)
    movie?: Movie;
}
