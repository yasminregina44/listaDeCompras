import "./Inicio.css";
import Categoria from '../Categoria';

export default function Lista() {

    return (
        <div className='header'>
            <h1 className='titulo'>Lista de Compras</h1>
            <Categoria />
        </div>
    )
}