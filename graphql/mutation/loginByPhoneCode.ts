import { Context } from 'egg';
            import { Arg, Ctx, Query, Resolver ,Mutation } from 'type-graphql';
            import { User } from '../schema/User';
@Resolver(of => User)
        export class loginByPhoneCodeResolver {
          @Mutation(returns => User, { nullable: true })
          async loginbyphonecode(
            @Ctx() ctx: Context,
            @Arg('input') input:LoginByPhoneCodeInput,
          ): Promise<User | null> {
            // 需要编写的逻辑
            return null;
          }
        }