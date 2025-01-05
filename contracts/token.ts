declare module '@ioc:Adonis/Core/HttpContext' {
  interface HttpContextContract {
    token: {
      firstName: string | null
      lastName: string | null
      email: string
      iat: number
      exp: number
      createdBy: string
      updatedBy: string
    }
  }
}
