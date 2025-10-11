
import { FaRegEdit  } from "react-icons/fa"
import type { PropostaType } from "../../utils/PropostaType"
import { useAdminStore } from "../context/AdminContext"

type listaPropostaProps = {
  proposta: PropostaType,
  propostas: PropostaType[],
  setPropostas: React.Dispatch<React.SetStateAction<PropostaType[]>>
}

const apiUrl = import.meta.env.VITE_API_URL

export default function ItemProposta({ proposta, propostas, setPropostas }: listaPropostaProps) {

  const { admin } = useAdminStore()

  async function responderProposta() {
    const respostaRevenda = prompt(`Resposta da Revenda para "${proposta.descricao}"`)

    if (respostaRevenda == null || respostaRevenda.trim() == "") {
      return
    }

    const response = await fetch(`${apiUrl}/propostas/${proposta.id}`,
      {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${admin.token}`
        },
        body: JSON.stringify({resposta: respostaRevenda})
      },
    )

    if (response.status == 200) {
      const propostas2 = propostas.map(x => {
        if (x.id == proposta.id) {
          return { ...x, resposta: respostaRevenda}
        }
        return x
      })
      setPropostas(propostas2)
    }
  }

  return (
    <tr key={proposta.id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
      <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
        <img src={proposta.produto.foto} alt="Foto do Produto"
          style={{ width: 200 }} />
      </th>
      <td className={"px-6 py-4"}>
        {proposta.produto.nome}
      </td>
      <td className={"px-6 py-4"}>
        {Number(proposta.produto.preco).toLocaleString("pt-br", {minimumFractionDigits: 2})}
      </td>
      <td className={`px-6 py-4`}>
        {proposta.cliente.nome}
      </td>
      <td className={`px-6 py-4`}>
        {proposta.descricao}
      </td>
      <td className={`px-6 py-4`}>
        {proposta.resposta}
      </td>
      <td className="px-6 py-4">
        {proposta.resposta ? 
          <>
            <img src="/ok.png" alt="Ok" style={{width: 60}} />
          </>
        :
          <>
            <FaRegEdit className="text-3xl text-yellow-600 inline-block cursor-pointer" title="Responder"
              onClick={responderProposta} />
          </>
        }
      </td>

    </tr>
  )
}