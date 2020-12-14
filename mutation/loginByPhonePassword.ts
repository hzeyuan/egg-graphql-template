import { Context } from 'egg';
            import { Arg, Ctx, Query, Resolver } from 'type-graphql';
            import { User } from '../schema/User';
@Resolver(of => User)
        export class loginByPhonePasswordResolver {
          @Mutation(returns => User, { nullable: true })
          async loginbyphonepassword(
            @Ctx() ctx: Context,
            @Arg('input') input:LoginByPhonePasswordInput,
          ): Promise<User | null> {
            // 需要编写的逻辑
            return null;
          }
        }