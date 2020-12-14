import { Context } from 'egg';
import { Arg, Ctx, Query, Resolver } from 'type-graphql';
import { AccessTokenRes } from '../schema/AccessTokenRes';
@Resolver(of => AccessTokenRes)
export class accessTokenResolver {
    @Query(returns => AccessTokenRes,)
    async accesstoken(
        @Ctx() ctx: Context,
        @Arg('secret') secret: string,
        @Arg('userPoolId') userPoolId: string,
    ): Promise<AccessTokenRes | null> {
        // 需要编写的逻辑
        return null;
    }
}
