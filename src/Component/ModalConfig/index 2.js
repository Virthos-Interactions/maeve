import React from 'react';

import { FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import './style.css';

import noUser from '../../assets/default-user-image-365x365.png';

export default function ModalConfig({ onClose, logout }) {

   return(
      <div className="modal-config">
         <div className="modal">
            <button className="btn-close-modal" onClick={() => onClose()}>
               <FaTimes size={22} color="#131313" />
            </button>

            <div className="image">
               <img src={noUser} alt="Imagem do Usuário"/>
            </div>
            
            <h2>Raphael Capeto</h2>

            <hr/>

            <div className="options-config-modal">
               <Link to="/settings/my-account">Minha Conta</Link>
               <Link to="/settings/employees">Colaboradores</Link>
               <Link to="/settings/customers">Clientes</Link>
               <Link to="/settings/services">Serviços</Link>
               <Link to="/settings/configuration">Configurações</Link>
            </div>

            <hr/>
            <div className="button-modal">
               <button onClick={() => logout()}>Sair</button>
            </div>
         </div>
   </div>
   );
}