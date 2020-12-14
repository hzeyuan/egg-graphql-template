import { Context } from 'egg';
            import { Arg, Ctx, Query, Resolver ,Mutation } from 'type-graphql';
            import { User } from '../schema/User';
@Resolver(of => User)
        export class userResolver {
          @Query(returns => User, { nullable: true })
          async user(
            @Ctx() ctx: Context,
            @Arg('id') id?:string,
          ): Promise<User | null> {
            // 需要编写的逻辑
            return null;
          }
        }