import { Field, Int, ObjectType,InputType,registerEnumType } from 'type-graphql';

@InputType()
export class LoginByPhonePasswordInput {
    @Field(type => Boolean,  { nullable: true })
    autoRegister: Boolean!;
    @Field(type => String,  { nullable: true })
    captchaCode: string;
    @Field(type => String,  { nullable: true })
    clientIp: string;
    @Field(type => String)
    password?: string;
    @Field(type => String)
    phone?: string;
}
