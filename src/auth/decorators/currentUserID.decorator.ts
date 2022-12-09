import { createParamDecorator } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JWTPayloadWithRefeshToken } from '../types';

export const CurrentUserID = createParamDecorator(
  (_:undefined, context: GqlExecutionContext,
  ) => {
    const ctx = GqlExecutionContext.create(context);
    const req = ctx.getContext().req;
    return req.user.userID;
  },
)