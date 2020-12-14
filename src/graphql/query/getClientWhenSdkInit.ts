import { Context } from 'egg';
import { Arg, Ctx, Query, Resolver } from 'type-graphql';
import { AccessTokenRes } from '../schema/AccessTokenRes';
@Resolver(of => AccessTokenRes)
export class getClientWhenSdkInitResolver {
    @Query(returns => AccessTokenRes,)
    async getclientwhensdkinit(
        @Ctx() ctx: Context,
        @Arg('clientId') clientId?: string,
        @Arg('nonce') nonce?: number,
        @Arg('retUserId') retUserId?: boolean,
        @Arg('secret') secret?: string,
        @Arg('signature') signature?: string,
        @Arg('timestamp') timestamp?: string,
    ): Promise<AccessTokenRes | null> {
        // 需要编写的逻辑
        return null;
    }
}
