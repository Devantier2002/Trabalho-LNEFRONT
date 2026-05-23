import { useState } from "react"

type PredictionResponse = {
  ok?: boolean
  predictedClass?: string
  predictedIndex?: number
  topPredictions?: Array<{
    class: string
    index: number
    confidence: number
  }>
  class_name: string
  class_index?: number
  confidence?: number
  probabilities?: number[]
  detail?: string
}

const cnnApiUrl = import.meta.env.VITE_CNN_API_URL ?? "http://localhost:3000"

export default function ChatbotCNN() {
  const [arquivo, setArquivo] = useState<File | null>(null)
  const [preview, setPreview] = useState("")
  const [resultado, setResultado] = useState<PredictionResponse | null>(null)
  const [carregando, setCarregando] = useState(false)
  const [erro, setErro] = useState("")

  function selecionarArquivo(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0] ?? null
    setArquivo(file)
    setResultado(null)
    setErro("")

    if (file) {
      setPreview(URL.createObjectURL(file))
    } else {
      setPreview("")
    }
  }

  async function enviarImagem() {
    if (!arquivo) {
      setErro("Selecione uma imagem antes de enviar.")
      return
    }

    setCarregando(true)
    setErro("")
    setResultado(null)

    try {
      const formData = new FormData()
      formData.append("image", arquivo)

      const response = await fetch(`${cnnApiUrl}/infer`, {
        method: "POST",
        body: formData,
      })

      const payload = (await response.json()) as PredictionResponse

      if (!response.ok) {
        throw new Error(payload?.detail ?? "Falha ao consultar a CNN.")
      }

      setResultado(payload)
    } catch (exception) {
      const message = exception instanceof Error ? exception.message : "Falha ao consultar a CNN."
      setErro(message)
    } finally {
      setCarregando(false)
    }
  }

  return (
    <section className="max-w-5xl mx-auto mt-6 px-4">
      <h1 className="mb-3 text-3xl font-extrabold text-gray-900 dark:text-white">
        Chatbot CNN
      </h1>
      <p className="mb-6 text-gray-600 dark:text-gray-300">
        Envie uma imagem para o backend local e receba a predição da sua CNN.
      </p>

      <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <div className="grid gap-4 md:grid-cols-[1.15fr_0.85fr]">
          <div className="rounded-lg border border-dashed border-gray-300 bg-gray-50 p-4 dark:border-gray-600 dark:bg-gray-900">
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200">
              Selecione a imagem
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={selecionarArquivo}
              className="block w-full cursor-pointer rounded-lg border border-gray-300 bg-white text-sm text-gray-900 file:mr-4 file:rounded-lg file:border-0 file:bg-blue-700 file:px-4 file:py-2 file:text-white hover:file:bg-blue-800 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
            />

            <button
              type="button"
              onClick={enviarImagem}
              disabled={carregando}
              className="mt-4 rounded-lg bg-blue-700 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {carregando ? "Processando..." : "Enviar para a CNN"}
            </button>

            {erro && (
              <p className="mt-3 rounded-lg bg-red-50 p-3 text-sm text-red-700 dark:bg-red-900/30 dark:text-red-300">
                {erro}
              </p>
            )}

            {resultado && (
              <div className="mt-4 rounded-lg bg-green-50 p-3 text-sm text-green-800 dark:bg-green-900/30 dark:text-green-200">
                <p><b>Classe:</b> {resultado.predictedClass ?? resultado.class_name}</p>
                {typeof resultado.class_index === "number" && <p><b>Indice:</b> {resultado.class_index}</p>}
                {typeof resultado.predictedIndex === "number" && <p><b>Indice:</b> {resultado.predictedIndex}</p>}
                {typeof resultado.confidence === "number" && <p><b>Confianca:</b> {(resultado.confidence * 100).toFixed(2)}%</p>}
                {Array.isArray(resultado.topPredictions) && resultado.topPredictions.length > 0 && (
                  <div className="mt-2">
                    <p className="font-semibold">Top previsões:</p>
                    <ul className="list-disc pl-5">
                      {resultado.topPredictions.map((item) => (
                        <li key={`${item.class}-${item.index}`}>
                          {item.class} - {(item.confidence * 100).toFixed(2)}%
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-900">
            <p className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-200">
              Preview
            </p>
            {preview ? (
              <img
                src={preview}
                alt="Preview da imagem enviada"
                className="h-64 w-full rounded-lg object-cover"
              />
            ) : (
              <div className="flex h-64 items-center justify-center rounded-lg border border-dashed border-gray-300 text-sm text-gray-500 dark:border-gray-700 dark:text-gray-400">
                Nenhuma imagem selecionada
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
