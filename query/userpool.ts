import { Context } from 'egg';
            import { Arg, Ctx, Query, Resolver } from 'type-graphql';
            import { UserPool } from '../schema/UserPool';
@Resolver(of => UserPool)
        export class userpoolResolver {
          @Query(returns => UserPool, )
          async userpool(
            @Ctx() ctx: Context,
            
          ): Promise<UserPool | null> {
            // 需要编写的逻辑
            return null;
          }
        }