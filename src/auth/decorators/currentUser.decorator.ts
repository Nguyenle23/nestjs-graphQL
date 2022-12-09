import { createParamDecorator } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JWTPayloadWithRefeshToken } from '../types';

export const CurrentUser = createParamDecorator(
  (
    data: keyof JWTPayloadWithRefeshToken | undefined,
    context: GqlExecutionContext,
  ) => {
    const ctx = GqlExecutionContext.create(context);
    const req = ctx.getContext().req;
    if (data) {
      return req.user[data];
    }
    return req.user;
  },
)