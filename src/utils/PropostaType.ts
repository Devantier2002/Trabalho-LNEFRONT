import type { CarroType } from "./LenteType"

export type PropostaType = {
  id: number
  clienteId: string
  carroId: number
  carro: CarroType
  descricao: string
  resposta: string | null
  createdAt: string
  updatedAt: string | null
}