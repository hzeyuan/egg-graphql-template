import { Context } from 'egg';
            import { Arg, Ctx, Query, Resolver ,Mutation } from 'type-graphql';
            import { CommonMessage } from '../schema/CommonMessage';
@Resolver(of => CommonMessage)
        export class deleteUserpoolResolver {
          @Mutation(returns => CommonMessage, )
          async deleteuserpool(
            @Ctx() ctx: Context,
            
          ): Promise<CommonMessage | null> {
            // 需要编写的逻辑
            return null;
          }
        }