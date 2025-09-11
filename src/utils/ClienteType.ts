export type ClienteType = {
    id: string
    nome: string
    email: string
    telefone: string
    endereco: string
    createdAt: Date
    updatedAt: Date
    adminId: string
    // vendas: VendaType[] // Descomente e defina VendaType se precisar
}