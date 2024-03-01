import { useState } from "react";
import "./CriadorLista.css";
import CriadorItem from "../CriadorItem/CriadorItem";

export default function Lista() {

    const arraySuporte = JSON.parse(localStorage.getItem('listas')) || [];

    const [lista, setLista] = useState(arraySuporte);
    const [nomeLista, setNomeLista] = useState("");
    const [arrayID, setArrayID] = useState([]);

    const adicionarLista = () => {

        if (nomeLista.trim() != "") {

            const item = {
                id: adicionarID(),
                value: nomeLista
            };

            const novaLista = [...lista, item];
            setLista(novaLista);

            setNomeLista("");
        }

    }

    if (lista) {
        localStorage.listas = JSON.stringify(lista);
    }

    const removerLista = (i) => {
        const novaLista = lista.filter(item => item.id !== i);
        setLista(novaLista);

    }

    const enterKey = (event) => {
        if (event.key === 'Enter') {
            adicionarLista();
        }
    };

    const adicionarID = () => {
        let idAleatorio = Math.floor(Math.random() * 1000);

        if (arrayID.includes(idAleatorio) == true) {
            do {
                console.log("repetiu")
                idAleatorio = Math.floor(Math.random() * 1000);
            } while (arrayID.includes(idAleatorio))
        }

        setArrayID([...arrayID, idAleatorio]);
        return (idAleatorio)
    }

    return (
        <div>
            <div>
                <div className="header">
                    <h1 className='titulo'>Lista de Compras</h1>
                    <div className="adicionaCategoria">
                        <input className="campoTextoCategoria" type="text" placeholder="Adicionar Lista" value={nomeLista} onInput={event => setNomeLista(event.target.value)} onKeyPress={enterKey} />
                        <img className="imgAdicionarCategoria" src="../src/assets/adicionarCinza.png" alt="Adicionar" onClick={adicionarLista} />
                    </div>
                </div>
            </div>
            <div >
                <ul className="categorias">
                    {
                        lista.map(item => {
                            return (
                                <li className="cadaCategoria" key={item.id}>
                                    <div className="headerCategoria">
                                        <h3 className="tituloCategoria">{item.value}</h3>
                                        <img className="imgDeletar" src="../src/assets/lixeiraBranca.png" alt="Deletar Lista" onClick={() => { removerLista(item.id) }}/>
                                    </div>
                                    <CriadorItem id={item.id} />
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        </div>
    )
}