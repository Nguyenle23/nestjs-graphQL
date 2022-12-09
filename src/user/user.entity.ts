import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field(() => Int)
  userID: number;

  @Field()
  userName: string;

  @Field()
  nameDisplay: string;

  @Field()
  password: string;

  @Field()
  phoneNumber: string;

  @Field()
  avatarURL: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
