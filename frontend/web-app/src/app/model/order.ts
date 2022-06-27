export interface Order {
    id: number | undefined,
    customerId: number
    delivererId: number,
    startTime: Date,
    endTime: Date
    comment: string,
    address: string,
    price: number
}