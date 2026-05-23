import type { ProdutoType } from "../utils/ProdutoType"

export const produtosMock: ProdutoType[] = [
  {
    id: 9001,
    nome: "Oculos Aurora",
    tipo: "Grau",
    codigo: "EST-001",
    preco: 299.9,
    quantidade: 5,
    destaque: true,
    foto: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=900&q=80",
    descricao: "Armacao leve para uso diario com visual moderno.",
    createdAt: new Date(),
    updatedAt: new Date(),
    marcaId: 1,
    marca: { id: 1, nome: "Visio" }
  },
  {
    id: 9002,
    nome: "Oculos Solar Prime",
    tipo: "Solar",
    codigo: "EST-002",
    preco: 359.9,
    quantidade: 4,
    destaque: true,
    foto: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=900&q=80",
    descricao: "Protecao UV e estilo classico para o dia a dia.",
    createdAt: new Date(),
    updatedAt: new Date(),
    marcaId: 2,
    marca: { id: 2, nome: "SunWave" }
  },
  {
    id: 9003,
    nome: "Oculos Urban Flex",
    tipo: "Grau",
    codigo: "EST-003",
    preco: 419.9,
    quantidade: 3,
    destaque: true,
    foto: "https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&w=900&q=80",
    descricao: "Modelo premium com encaixe confortavel.",
    createdAt: new Date(),
    updatedAt: new Date(),
    marcaId: 3,
    marca: { id: 3, nome: "Urban Lens" }
  }
]
