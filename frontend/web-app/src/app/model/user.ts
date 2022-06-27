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
    role: string,
    approved: boolean,
    status: string
}