export interface Respuesta {
  id?: number,
  reclamoId: number,
  usuario:string,
  respuesta:string,
  archivos:[],
  createdAt?: string
}