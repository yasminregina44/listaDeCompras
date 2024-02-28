import { useState } from "react"
import "./CriadorItem.css";

export default function CriadorItem({ id }) {

    const [listaItem, setListaItem] = useState([]);
    const [nomeItem, setNomeItem] = useState("");
    const idItem = id;
    const [arrayID, setArrayID] = useState([]);

    const adicionarItem = () => {

        if (nomeItem.trim() != "") {
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

        if (arrayID.includes(idAleatorio) == true) {
            console.log("item repetiu")
            do {
                idAleatorio = Math.floor(Math.random() * 1000);
            } while (arrayID.includes(idAleatorio))
        }

        setArrayID([...arrayID, idAleatorio]);
        return (idAleatorio)
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
            <div className="headerItem">
                <input className="campoTextoItem" type="text" placeholder="Adicionar Item" value={nomeItem} onInput={event => setNomeItem(event.target.value)} onKeyPress={enterKey} />
                <img className="imgAdicionarItem" src="../src/assets/adicionarCinza.png" alt="Adicionar Item" onClick={adicionarItem} />
            </div>
            <div>
                <ul className="divItens">
                    {
                        listaItem.length > 0 ? (
                            listaItem.map(item => {
                                return (
                                    <li className="item" key={item.id}>
                                        <input type="checkbox" id={`checkbox`} />
                                        <label htmlFor={`checkbox`}>
                                            <img src="caminho/para/sua/imagem.png" alt="Checkbox" />
                                            {item.value}
                                        </label>
                                        <img className="imgDeletarItem" src="../src/assets/lixeiraCinza.png" alt="Deletar Item" onClick={() => { removerItem(item.id) }} />
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