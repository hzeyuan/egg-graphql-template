import { Context } from 'egg';
import { Arg, Ctx, Mutation, Resolver } from 'type-graphql';
import { RefreshToken } from '../schema/RefreshToken';
@Resolver(of => RefreshToken)
export class refreshTokenResolver {
    @Mutation(returns => RefreshToken, { nullable: true })
    async refreshtoken(
        @Ctx() ctx: Context,
        @Arg('id') id?: string,
    ): Promise<RefreshToken | null> {
        // 需要编写的逻辑
        return null;
    }
}
