import { Context } from 'egg';
            import { Arg, Ctx, Query, Resolver } from 'type-graphql';
            import { CommonMessage } from '../schema/CommonMessage';
@Resolver(of => CommonMessage)
        export class deleteUserResolver {
          @Mutation(returns => CommonMessage, { nullable: true })
          async deleteuser(
            @Ctx() ctx: Context,
            @Arg('id') id:string,
          ): Promise<CommonMessage | null> {
            // 需要编写的逻辑
            return null;
          }
        }