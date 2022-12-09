export type JWTPayload = {
  phoneNumber: string;
  userID: number;
}

export type JWTPayloadWithRefeshToken = JWTPayload & {
  refreshToken: string;
}