import { useState } from "react";
import "./Item.css";

export default function Inicio ({ categoriaIndex }) {

    const [item, setItem] = useState([]);
    const [nome, setNome] = useState("");

    const adicionarItem = () => {
        if (nome.trim() != "") {
            setItem([...item, nome]);
            setNome("")
        }
    }

    const removerItem = (i) => {
        const novoItem = [...item];
        novoItem.splice(i, 1);
        setItem(novoItem)
    }

    const enterKey = (event) => {
        if (event.key === 'Enter') {
            adicionarItem();
        }
    };

    return (
        <>
            <div className='input'>
                        <input className='campoTextoItem' type="text" placeholder="Nome do item" value={nome} onInput={event => setNome(event.target.value)} onKeyPress={enterKey} />
                        <button onClick={adicionarItem} className='botaoAdicionar'>
                            <img src="../src/assets/circle-plus-solid.png" alt="Botão Adicionar" className='adicionarimg'/>
                        </button>
            </div>
            <div>
                <ul>
                    {
                        item.map((nome, i) => {
                            return(
                                <li key={i}>
                                    <h3>{nome}</h3>
                                    <button onClick={() => {removerItem(i)}}>Remover Item</button>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        </>
    )
}