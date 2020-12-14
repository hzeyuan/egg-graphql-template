import { Field, Int, ObjectType,InputType,registerEnumType } from 'type-graphql';

@ObjectType()
export class UserPool {
    @Field(type => String)
    allowedOrigins?: string;
    @Field(type => App2WxappLoginStrategy)
    app2WxappLoginStrategy?: App2WxappLoginStrategy;
    @Field(type => ChangeEmailStrategy)
    changeEmailStrategy?: ChangeEmailStrategy;
    @Field(type => ChangePhoneStrategy)
    changePhoneStrategy?: ChangePhoneStrategy;
    @Field(type => String)
    createdAt?: string;
    @Field(type => CustomSMSProvider)
    customSMSProvider?: CustomSMSProvider;
    @Field(type => String)
    description?: string;
    @Field(type => String,  { nullable: true })
    domain: string;
    @Field(type => Boolean,  { nullable: true })
    emailVerifiedDefault: boolean;
    @Field(type => FrequentRegisterCheckConfig)
    frequentRegisterCheck?: FrequentRegisterCheckConfig;
    @Field(type => String,  { nullable: true })
    id: string;
    @Field(type => Boolean)
    isDeleted?: boolean;
    @Field(type => String,  { nullable: true })
    jwtSecret: string;
    @Field(type => LoginFailCheckConfig)
    loginFailCheck?: LoginFailCheckConfig;
    @Field(type => String,  { nullable: true })
    logo: string;
    @Field(type => String,  { nullable: true })
    name: string;
    @Field(type => QrcodeLoginStrategy)
    qrcodeLoginStrategy?: QrcodeLoginStrategy;
    @Field(type => Boolean,  { nullable: true })
    registerDisabled: boolean;
    @Field(type => String,  { nullable: true })
    secret: string;
    @Field(type => Boolean,  { nullable: true })
    sendWelcomeEmail: boolean;
    @Field(type => Boolean)
    showWxQRCodeWhenRegisterDisabled?: boolean;
    @Field(type => Int)
    tokenExpiresAfter?: number;
    @Field(type => String)
    updatedAt?: string;
    @Field(type => [UserPoolType])
    userpoolTypes?: [UserPoolType];
    @Field(type => RegisterWhiteListConfig)
    whitelist?: RegisterWhiteListConfig;
}
