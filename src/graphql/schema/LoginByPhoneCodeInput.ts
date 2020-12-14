import { Field, Int, ObjectType,InputType,registerEnumType } from 'type-graphql';

@InputType()
export class LoginByPhoneCodeInput {
    @Field(type => Boolean)
    autoRegister?: boolean;
    @Field(type => String)
    clientIp?: string;
    @Field(type => String,  { nullable: true })
    code: string;
    @Field(type => String,  { nullable: true })
    phone: string;
}
