import { useEffect, useState } from "react"
function App(){
    const [saldo, setSaldo] = useState(0)
    const [transacoes, setTransacoes] = useState([])

    useEffect(() => {
        fetch("http://localhost:8080/transacoes/saldo")
            .then(response => response.json())
            .then(data => setSaldo(data))
        fetch("http://localhost:8080/transacoes")
            .then(response => response.json())
            .then(data => setTransacoes(data))
    }, [])

    return (
        <div>
            <h1>Controle Financeiro</h1>
            <p>Saldo atual:  R$ {saldo}</p>
        <h2>Transações</h2>
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
