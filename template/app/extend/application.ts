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
};
