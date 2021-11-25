export interface Usuario {
  id: number,
  username: string,
  email?:string,
}

export interface LoginUsuario {
  username: string,
  password:string,
}
