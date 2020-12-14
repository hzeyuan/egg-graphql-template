import { Context } from 'egg';
            import { Arg, Ctx, Query, Resolver ,Mutation } from 'type-graphql';
            import { UserPool } from '../schema/UserPool';
@Resolver(of => UserPool)
        export class updateUserpoolResolver {
          @Mutation(returns => UserPool, )
          async updateuserpool(
            @Ctx() ctx: Context,
            @Arg('input') input:UpdateUserpoolInput,
          ): Promise<UserPool | null> {
            // 需要编写的逻辑
            return null;
          }
        }