import { useEffect, useState } from "react"
function App(){

    const [saldo, setSaldo] = useState(0)
    const [transacoes, setTransacoes] = useState([])
    const [descricao, setDescricao] = useState("")
    const [valor, setValor] = useState("")
    const [tipo, setTipo] = useState("ENTRADA")

function adicionarTransacoes(event) {
    event.preventDefault()

    const novaTransacao = {
        descricao: descricao,
        valor: Number(valor),
        tipo: tipo,
        data: new Date().toISOString().split("T")[0]
        }
    fetch("http://localhost:8080/transacoes",{
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(novaTransacao)
        })
        .then(() => {
            carregarDados()

            setDescricao("")
            setValor("")
            setTipo("ENTRADA")

        })
    }
function carregarDados(){
    fetch("http://localhost:8080/transacoes/saldo")
        .then(response => response.json())
        .then(data => setSaldo(data))

    fetch("http://localhost:8080/transacoes")
        .then(response => response.json())
        .then(data => setTransacoes(data))
        }

    useEffect(() => {
        carregarDados()
    }, [])

    return (
        <div>
            <h1>Controle Financeiro</h1>
            <p>Saldo atual:  R$ {saldo}</p>
        <h2>Transações</h2>
            <form onSubmit={adicionarTransacoes}>
                <input
                    type="text"
                    placeholder="Descrição"
                    value={descricao}
                    onChange={(e) => setDescricao(e.target.value)}
                />

                <input
                    type="number"
                    placeholder="Valor"
                    value={valor}
                    onChange={(e) => setValor(e.target.value)}
                />

                <select value={tipo} onChange={(e) => setTipo(e.target.value)} >
                    <option value="ENTRADA">Entrada</option>
                    <option value="SAIDA">Saída</option>
                </select>

                <button type="submit">Adicionar</button>
            </form>
            <ul>
                {transacoes.map((t, index) => (
                    <li key={index}>
                        {t.descricao} - R$ {t.valor} ({t.tipo})
                    </li>
                    ))}
            </ul>
        </div>
        )
}
export default App
