import { Context } from 'egg';
import { Arg, Ctx, Query, Resolver } from 'type-graphql';
import { JWTTokenStatus } from '../schema/JWTTokenStatus';
@Resolver(of => JWTTokenStatus)
export class checkLoginStatusResolver {
    @Query(returns => JWTTokenStatus, { nullable: true })
    async checkloginstatus(
        @Ctx() ctx: Context,
        @Arg('token') token?: string,
    ): Promise<JWTTokenStatus | null> {
        // 需要编写的逻辑
        return null;
    }
}
