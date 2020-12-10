import { Field, Int, ObjectType, } from 'type-graphql';
@ObjectType()
export class Movie {
  @Field(type => Int)
  id: number;
  @Field(type => String, { nullable: true })
  title?: String;

}
