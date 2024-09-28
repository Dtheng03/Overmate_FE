export interface FormLoginValues {
    Email: string,
    Password: string
}

export interface FormRegisterValues {
    Email: string,
    Username: string,
    Password: string,
    Dob: string,
    Location: string,
    Gender: string,
}

export interface User extends FormRegisterValues {
    IsServiceOwner: boolean
}