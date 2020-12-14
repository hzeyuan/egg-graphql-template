import { Context } from 'egg';
            import { Arg, Ctx, Query, Resolver ,Mutation } from 'type-graphql';
            import { PaginatedUsers } from '../schema/PaginatedUsers';
@Resolver(of => PaginatedUsers)
        export class searchUserResolver {
          @Query(returns => PaginatedUsers, )
          async searchuser(
            @Ctx() ctx: Context,
            @Arg('fields') fields?:[String],
@Arg('limit') limit?:number,
@Arg('page') page?:number,
@Arg('query') query:string,
          ): Promise<PaginatedUsers | null> {
            // 需要编写的逻辑
            return null;
          }
        }