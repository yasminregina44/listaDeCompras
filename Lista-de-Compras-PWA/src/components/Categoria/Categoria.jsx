import { useState } from "react";
import "./Categoria.css";
import Item from "../Item"

export default function Categoria() {

    const [categoria, setCategoria] = useState([]);
    const [nome, setNome] = useState("");


    const adicionarCategoria = () => {
        if (nome.trim() != "") {
            setCategoria([...categoria, { nome: nome, itens: [] }]);
            setNome("")
        }
    }

    const removerCategoria = (i) => {
        const novaCategoria = [...categoria];
        novaCategoria.splice(i, 1);
        setCategoria(novaCategoria)
    }

    const enterKey = (event) => {
        if (event.key === 'Enter') {
            adicionarCategoria();
        }
    };

    return (
        <>
            <div className='adicionaCategoria'>
                <input className='campo_texto' type="text" placeholder="Adicionar Lista" value={nome} onInput={event => setNome(event.target.value)} onKeyPress={enterKey} />
                <img src="../src/assets/adiciona.png" alt="Adicionar" className='imgAdicionar' onClick={adicionarCategoria} />
            </div>
            <div>
                <ul>
                    {
                        categoria.map((categoria, i) => {
                            return (
                                <li className="li" key={i}>
                                    <div className="headerCategoria">
                                        <h3 className="tituloCategoria">{categoria.nome}</h3>
                                        <img src="../src/assets/deletaBranco.png" alt="Delete" className="lixeira" onClick={() => { removerCategoria(i) }} />
                                    </div>
                                    <Item categoriaIndex={i} />
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        </>
    )
}