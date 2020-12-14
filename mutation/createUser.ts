import { Context } from 'egg';
            import { Arg, Ctx, Query, Resolver } from 'type-graphql';
            import { User } from '../schema/User';
@Resolver(of => User)
        export class createUserResolver {
          @Mutation(returns => User, )
          async createuser(
            @Ctx() ctx: Context,
            @Arg('keepPassword') keepPassword?:boolean,
@Arg('userInfo') userInfo:CreateUserInput,
          ): Promise<User | null> {
            // 需要编写的逻辑
            return null;
          }
        }