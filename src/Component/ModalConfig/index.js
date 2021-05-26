import React from 'react';

import { FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import './style.css';

import noUser from '../../assets/default-user-image-365x365.png';

export default function ModalConfig({ 
   employeesList,
   partnerData,
   onClose, 
   logout,
}) {

   return (
      <div className="modal-config">
         <div className="modal">
            <button className="btn-close-modal" onClick={() => onClose()}>
               <FaTimes size={22} color="#131313" />
            </button>

            <div className="image">
               <img src={noUser} alt="Imagem do Usuário" />
            </div>

            <h2>{partnerData?.name}</h2>

            <div className="options-config-modal">
               {/* <Link to="/settings/my-account">Minha Conta</Link> */}
               <Link 
                  to={{
                     pathname: "/settings/employees",
                     state: { 
                        employeesList: employeesList,
                        partnerData: partnerData
                     },
                  }}
               >
                  Colaboradores
               </Link>
               <Link 
                  to={{
                     pathname: "/settings/customers",
                     state: { 
                        employeesList: employeesList,
                        partnerData: partnerData
                     },
                  }}
               >
                  Clientes
               </Link>
               {/* <Link to="/settings/services">Serviços</Link> */}
               {/* <Link to="/settings/configuration">Configurações</Link> */}
            </div>

            <div className="button-modal">
               <button onClick={() => logout()}>Sair</button>
            </div>
         </div>
      </div>
   );
}