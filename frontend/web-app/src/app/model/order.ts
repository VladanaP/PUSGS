export interface Order {
    id: number | undefined,
    customerId: number
    delivererId: number,
    startTime: string,
    endTime: string,
    comment: string,
    address: string,
    price: number
}