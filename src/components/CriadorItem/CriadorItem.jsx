import { useState } from "react"
import "./CriadorItem.css";

export default function CriadorItem({ id }) {

    const arraySuporte = JSON.parse(localStorage.getItem('itens')) || [];
    var arrayCondicao = [];

    for (let contador = 0; contador < arraySuporte.length; contador++) {
        if (arraySuporte[contador].idCategoria == id) {
            console.log(arraySuporte[contador].idCategoria);
            arrayCondicao.push(arraySuporte[contador]);
            console.log("ArrayCondicao: ", arrayCondicao)
        }
        console.log(arraySuporte[contador].idCategoria);
    }

    console.log("Array condicaooo: ", arrayCondicao)

    const [listaItem, setListaItem] = useState(arrayCondicao);
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

    if(listaItem) {
        localStorage.itens = JSON.stringify(listaItem);
    }

    const adicionarID = () => {
        let idAleatorio = Math.floor(Math.random() * 1000);

        if (arrayID.includes(idAleatorio) == true) {
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
                    {listaItem.length > 0 ? (
                        listaItem.map(item => {
                            const checkboxId = `checkbox-${item.id}`;

                            return (
                                <li className="item" key={item.id}>
                                    <div>
                                        <input type="checkbox" id={checkboxId} />
                                        <label className="labelItem" htmlFor={checkboxId}>{item.value}</label>
                                    </div>
                                    <img className="imgDeletarItem" src="../src/assets/lixeiraCinza.png" alt="Deletar Item" onClick={() => { removerItem(item.id) }} />
                                </li>
                            );
                        })
                    ) : (
                        <div>
                            <p className="mensagemSemItem">Nenhum item adicionado!</p>
                        </div>
                    )}
                </ul>
            </div>
        </div>
    )
}