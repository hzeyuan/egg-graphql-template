import { Application } from "egg";
import GraphQL from "../graphql";
// import AuthManager from '../manager/Auth';
// import SocialManager from '../manager/Social';

const TYPE_GRAPHQL_SYMBOL = Symbol("Application#TypeGraphql");
// const TYPE_SOCIAL_MANAGER = Symbol("Application#SocialManager");
// const TYPE_AUTH_MANAGER = Symbol("Application#AuthManager");

export default {
  getGraphQL(this: Application): GraphQL {
    if (!this[TYPE_GRAPHQL_SYMBOL]) {
      this[TYPE_GRAPHQL_SYMBOL] = new GraphQL(this);
    }
    return this[TYPE_GRAPHQL_SYMBOL];
  },

  // getSocialManager(this: Application): SocialManager {
  //   if (!this[TYPE_SOCIAL_MANAGER]) {
  //     this[TYPE_SOCIAL_MANAGER] = new SocialManager(this);
  //   }
  //   return this[TYPE_SOCIAL_MANAGER];
  // },

  // getAuthManager(this: Application): AuthManager{
  //   if (!this[TYPE_AUTH_MANAGER]) {
  //     this[TYPE_AUTH_MANAGER] = new AuthManager(this);
  //   }
  //   return this[TYPE_AUTH_MANAGER];
  // }
};
