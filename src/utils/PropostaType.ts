import type { ProdutoType } from "./ProdutoType"
import type { ClienteType } from "./ClienteType"

export type PropostaType = {
  id: number
  clienteId: string
  produtoId: number
  produto: ProdutoType
  cliente: ClienteType
  descricao: string
  resposta: string | null
  createdAt: string
  updatedAt: string | null
}