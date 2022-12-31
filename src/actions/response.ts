export const response = (code: number, message: string): {} => {
     return { message, code }
}
export const responseData = (code: number, message: string, data: [] | {} | null): {} => {
     return { message, code, data }
}
export const responseError = (code: number, message: string, error: {} | null | undefined): {} => {
     return (error == null || error == undefined) ? { message, code } : { message, code, error }
}
