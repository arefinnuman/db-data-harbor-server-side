export type ILoginUser = {
  id: string;
  password: string;
};

export type ILoginUserResponse = {
  accessToken: string;
  refreshToken?: string;
  needsPasswordChange: boolean;
  approved: boolean;
};

export type IRefreshTokenResponse = {
  accessToken: string;
};
