import type { MarcaType } from "./MarcaType"

export type ProdutoType = {
    id: number
    nome: string
    tipo?: string
    codigo?: string
    preco: number
    quantidade: number
    destaque: boolean
    foto: string
    descricao?: string | null
    createdAt: Date
    updatedAt: Date
    marcaId: number
    marca: MarcaType
}
