import { Field, Int, ObjectType,InputType,registerEnumType } from 'type-graphql';

@InputType()
export class UpdateUserInput {
    @Field(type => String)
    address?: string;
    @Field(type => String)
    birthdate?: string;
    @Field(type => Boolean)
    blocked?: Boolean;
    @Field(type => String)
    browser?: string;
    @Field(type => String)
    city?: string;
    @Field(type => String)
    company?: string;
    @Field(type => String)
    country?: string;
    @Field(type => String)
    device?: string;
    @Field(type => String)
    email?: string;
    @Field(type => Boolean)
    emailVerified?: Boolean;
    @Field(type => String)
    familyName?: string;
    @Field(type => String)
    formatted?: string;
    @Field(type => String)
    gender?: string;
    @Field(type => String)
    givenName?: string;
    @Field(type => String)
    lastIP?: string;
    @Field(type => String)
    lastLogin?: string;
    @Field(type => String)
    locale?: string;
    @Field(type => String)
    locality?: string;
    @Field(type => Int)
    loginsCount?: number;
    @Field(type => String)
    middleName?: string;
    @Field(type => String)
    name?: string;
    @Field(type => String)
    nickname?: string;
    @Field(type => String)
    oauth?: string;
    @Field(type => String)
    openid?: string;
    @Field(type => String)
    password?: string;
    @Field(type => String)
    phone?: string;
    @Field(type => Boolean)
    phoneVerified?: Boolean;
    @Field(type => String)
    photo?: string;
    @Field(type => String)
    postalCode?: string;
    @Field(type => String)
    preferredUsername?: string;
    @Field(type => String)
    profile?: string;
    @Field(type => String)
    province?: string;
    @Field(type => String)
    region?: string;
    @Field(type => String)
    streetAddress?: string;
    @Field(type => String)
    tokenExpiredAt?: string;
    @Field(type => String)
    unionid?: string;
    @Field(type => String)
    username?: string;
    @Field(type => String)
    website?: string;
    @Field(type => String)
    zoneinfo?: string;
}
