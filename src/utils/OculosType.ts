
export type OculosType = {
    id: number
    nome: string
    tipo: string
    preco: string // Decimal geralmente é string em JS/TS
    quantidade: number
    foto: string
    createdAt: Date
    updatedAt: Date
    adminId: string
    // vendas: VendaType[] // Descomente e defina VendaType se precisar
}
