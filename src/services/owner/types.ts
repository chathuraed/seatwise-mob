export interface ILoginRequest {
  email: string
  password: string
}

export interface IRouteRequest {
  permit_id: string
  origin: string
  destination: string
  busId: string
}

export interface IScheduleRequest {
  routeId: string
  scheduleId?: string
  origin?: string
  destination?: string
  start_time?: string
  end_time?: string
  available_at?: string[]
}

export interface IBusRequest {
  busId?: string
  userId?: string
  busNumber: string
  model: string
  seatingCapacity: string
  arrangement: string
  seats: any
}
