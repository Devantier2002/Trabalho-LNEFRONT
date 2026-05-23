import type { ClienteType } from "./ClienteType"
import type { PropostaType } from "./PropostaType"
import type { ProdutoType } from "./ProdutoType"

type ClienteLocal = ClienteType & {
  cidade: string
  senha: string
}

const CLIENTES_KEY = "otica_clientes_local"
const PROPOSTAS_KEY = "otica_propostas_local"

function readJson<T>(key: string, fallback: T): T {
  const raw = localStorage.getItem(key)
  if (!raw) return fallback

  try {
    return JSON.parse(raw) as T
  } catch {
    return fallback
  }
}

function writeJson<T>(key: string, value: T) {
  localStorage.setItem(key, JSON.stringify(value))
}

function getClientesLocal(): ClienteLocal[] {
  return readJson<ClienteLocal[]>(CLIENTES_KEY, [])
}

function setClientesLocal(clientes: ClienteLocal[]) {
  writeJson(CLIENTES_KEY, clientes)
}

function getPropostasLocal(): PropostaType[] {
  return readJson<PropostaType[]>(PROPOSTAS_KEY, [])
}

function setPropostasLocal(propostas: PropostaType[]) {
  writeJson(PROPOSTAS_KEY, propostas)
}

export function cadastrarClienteLocal(input: {
  nome: string
  email: string
  cidade: string
  senha: string
}) {
  const clientes = getClientesLocal()
  const jaExiste = clientes.some(
    (cliente) => cliente.email.toLowerCase() === input.email.toLowerCase()
  )

  if (jaExiste) {
    return { ok: false, erro: "E-mail ja cadastrado" }
  }

  const novo: ClienteLocal = {
    id: Date.now().toString(),
    nome: input.nome,
    email: input.email,
    cidade: input.cidade,
    senha: input.senha
  }

  clientes.push(novo)
  setClientesLocal(clientes)

  return { ok: true }
}

export function loginClienteLocal(email: string, senha: string): ClienteType | null {
  const cliente = getClientesLocal().find(
    (item) => item.email.toLowerCase() === email.toLowerCase() && item.senha === senha
  )

  if (!cliente) return null

  return {
    id: cliente.id,
    nome: cliente.nome,
    email: cliente.email
  }
}

export function getClienteLocalById(id: string): ClienteType | null {
  const cliente = getClientesLocal().find((item) => item.id === id)

  if (!cliente) return null

  return {
    id: cliente.id,
    nome: cliente.nome,
    email: cliente.email
  }
}

export function criarPropostaLocal(input: {
  cliente: ClienteType
  produto: ProdutoType
  descricao: string
}): PropostaType {
  const propostas = getPropostasLocal()

  const novaProposta: PropostaType = {
    id: Date.now(),
    clienteId: input.cliente.id,
    produtoId: input.produto.id,
    produto: input.produto,
    cliente: input.cliente,
    descricao: input.descricao,
    resposta: null,
    createdAt: new Date().toISOString(),
    updatedAt: null
  }

  propostas.unshift(novaProposta)
  setPropostasLocal(propostas)

  return novaProposta
}

export function listarPropostasPorClienteLocal(clienteId: string): PropostaType[] {
  return getPropostasLocal().filter((proposta) => proposta.clienteId === clienteId)
}
