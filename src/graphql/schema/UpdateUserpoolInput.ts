import { Field, Int, ObjectType,InputType,registerEnumType } from 'type-graphql';

@InputType()
export class UpdateUserpoolInput {
    @Field(type => String)
    allowedOrigins?: string;
    @Field(type => App2WxappLoginStrategyInput)
    app2WxappLoginStrategy?: App2WxappLoginStrategyInput;
    @Field(type => ChangeEmailStrategyInput)
    changeEmailStrategy?: ChangeEmailStrategyInput;
    @Field(type => ChangePhoneStrategyInput)
    changePhoneStrategy?: ChangePhoneStrategyInput;
    @Field(type => CustomSMSProviderInput)
    customSMSProvider?: CustomSMSProviderInput;
    @Field(type => String)
    description?: string;
    @Field(type => String)
    domain?: string;
    @Field(type => Boolean)
    emailVerifiedDefault?: boolean;
    @Field(type => FrequentRegisterCheckConfigInput)
    frequentRegisterCheck?: FrequentRegisterCheckConfigInput;
    @Field(type => LoginFailCheckConfigInput)
    loginFailCheck?: LoginFailCheckConfigInput;
    @Field(type => String)
    logo?: string;
    @Field(type => String)
    name?: string;
    @Field(type => QrcodeLoginStrategyInput)
    qrcodeLoginStrategy?: QrcodeLoginStrategyInput;
    @Field(type => Boolean)
    registerDisabled?: boolean;
    @Field(type => Boolean)
    sendWelcomeEmail?: boolean;
    @Field(type => Int)
    tokenExpiresAfter?: number;
    @Field(type => [String])
    userpoolTypes?: [String];
    @Field(type => RegisterWhiteListConfigInput)
    whitelist?: RegisterWhiteListConfigInput;
}
