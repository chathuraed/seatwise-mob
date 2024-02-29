export interface IBookingRequest {
  booking_date?: string
  schedule_id?: string
  bus_id?: string
  price_per_seat?: number
  passenger_id?: string
  selected_seats?: SelectedSeat[]
}

export interface SelectedSeat {
  number?: string
  rowIndex?: number
  seatIndex?: number
}
