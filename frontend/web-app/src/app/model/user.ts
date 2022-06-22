export interface User {
    id?: number,
    username: string,
    email: string,
    password: string,
    name: string
    surname: string
    address: string
    dateOfBirth: Date
    image: string | null,
    role: number,
    approved: boolean,
    status: number
}