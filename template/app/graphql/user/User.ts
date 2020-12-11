
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, Int, ObjectType, } from 'type-graphql';



@ObjectType()
export class Movie {
  @Field(type => Int, { nullable: true })
  id: number;
  @Field(type => String)
  title?: String;

}

