export interface ILoginRequest {
  email: string
  password: string
}

export interface ITokenRequest {
  token: string
  refreshToken: string
}
