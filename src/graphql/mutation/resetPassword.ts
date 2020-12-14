import { Context } from 'egg';
import { Arg, Ctx, Mutation, Resolver } from 'type-graphql';
import { CommonMessage } from '../schema/CommonMessage';
@Resolver(of => CommonMessage)
export class resetPasswordResolver {
    @Mutation(returns => CommonMessage,)
    async resetpassword(
        @Ctx() ctx: Context,
        @Arg('code') code: string,
        @Arg('email') email?: string,
        @Arg('newPassword') newPassword: string,
        @Arg('phone') phone?: string,
    ): Promise<CommonMessage | null> {
        // 需要编写的逻辑
        return null;
    }
}
