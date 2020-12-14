import { Context } from 'egg';
import { Arg, Ctx, Query, Resolver } from 'type-graphql';
import { PaginatedUsers } from '../schema/PaginatedUsers';
@Resolver(of => PaginatedUsers)
export class usersResolver {
    @Query(returns => PaginatedUsers,)
    async users(
        @Ctx() ctx: Context,
        @Arg('limit') limit?: number,
        @Arg('page') page?: number,
        @Arg('sortBy') sortBy?: SortByEnum,
    ): Promise<PaginatedUsers | null> {
        // 需要编写的逻辑
        return null;
    }
}
