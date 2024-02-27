import { useState } from "react"

export default function CriadorItem ({ id }) {

    const [listaItem, setListaItem] = useState([]);
    const [nomeItem, setNomeItem] = useState("");
    const idItem = id;
    const [arrayID, setArrayID] = useState([]);

    const adicionarItem = () => {

        if(nomeItem.trim() != "") {
            const item = {
                id: adicionarID(),
                idCategoria: idItem,
                value: nomeItem
            }
    
            const novoItem = [...listaItem, item];
            setListaItem(novoItem);

            setNomeItem("")
        }

    }

    const adicionarID = () => {
        let idAleatorio = Math.floor(Math.random() * 1000);
        console.log("item gerado")

        if(arrayID.includes(idAleatorio) == true) {
            console.log("item repetiu")
            do {
                idAleatorio = Math.floor(Math.random() * 1000);
            }while (arrayID.includes(idAleatorio))
        }

        setArrayID([...arrayID, idAleatorio]);
        return(idAleatorio)
    }

    const enterKey = (event) => {
        if (event.key === 'Enter') {
            adicionarItem();
        }
    };

    const removerItem = (id) => {
        const novosItens = listaItem.filter(item => item.id !== id);
        setListaItem(novosItens);
    }

    return (
        <div>
            <div>
                <input type="text" placeholder="Insira a tarefa" value={nomeItem} onInput={event => setNomeItem(event.target.value)} onKeyPress={enterKey} />
                <button onClick={adicionarItem}>Adicionar Tarefa</button>
            </div>
            <div>
                <ul>
                    {
                        listaItem.length > 0 ? (
                            listaItem.map(item => {
                                return (
                                    <li key={item.id}>
                                        <p>{item.value}</p>
                                        <button onClick={() => {removerItem(item.id)}}>Deletar Tarefa</button>
                                    </li>
                                )
                            })
                        ) : (
                            <div>
                                <p>Nenhuma tarefa a ser feita!</p>
                            </div>
                        )
                    }
                </ul>
            </div>
        </div>
    )
}