export interface ILoginRequest {
  email: string;
  password: string;
}

export interface IRouteRequest {
  permit_id: string;
  origin: string;
  destination: string;
}
