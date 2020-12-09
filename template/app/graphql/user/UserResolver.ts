/* eslint-disable @typescript-eslint/no-unused-vars */
import { Context } from 'egg';
import { Arg, Ctx, Query, Resolver } from 'type-graphql';
import { Movie } from './User';

@Resolver(of => Movie)
export class UserResolver {

  @Query(returns => Movie, { nullable: true })
  async movie(
    @Ctx() ctx: Context,
    @Arg('id', { nullable: true }) id?: number,
  ): Promise<Movie | null> {
    return {
      id: 1,
      title: 'ttt',
    } as Movie
  }
}
