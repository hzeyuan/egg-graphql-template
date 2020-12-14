import { Context } from 'egg';
            import { Arg, Ctx, Query, Resolver } from 'type-graphql';
            import { User } from '../schema/User';
@Resolver(of => User)
        export class updateUserResolver {
          @Mutation(returns => User, )
          async updateuser(
            @Ctx() ctx: Context,
            @Arg('id') id?:string,
@Arg('input') input:UpdateUserInput,
          ): Promise<User | null> {
            // 需要编写的逻辑
            return null;
          }
        }