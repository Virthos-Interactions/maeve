import React from 'react';

import { FaTrash } from 'react-icons/fa';
import { BsPencilSquare } from 'react-icons/bs';
import Header from '../../../Component/Header';
import '../style.css';
import { useHistory } from 'react-router-dom';
import ModalConfigSettings from '../../../Component/ModalConfigSettings';


export default function Employees() {
   const history = useHistory();

   return(
      <div>
         <Header />

         <div className="config">
            <ModalConfigSettings employees />
            <div className="content">
               <div className="details">
                  <header>
                     <h3>Colaboradores</h3>
                     <button>Adicionar</button>
                  </header>

                  <div className="detail">
                     <details>
                        <summary>Raphael Capeto</summary>

                        <div className="current-detail">
                           <header>
                              <p>Raphael Capeto</p>
                              <div>
                                 <BsPencilSquare size={18} color="#131313" />
                                 <FaTrash size={18} color="#131313" />
                              </div>
                           </header>
                           <p>Cargo</p>
                           <p>Horário de Atendimento: 00:00 às 00:00</p>
                           <p>dados</p>

                        </div>
                     </details>
                  </div>


                  <div className="detail">
                     <details>
                        <summary>Pedro Araujo</summary>

                        <div className="current-detail">
                           <header>
                              <p>Pedro Araujo</p>
                              <div>
                                 <BsPencilSquare size={18} color="#131313" />
                                 <FaTrash size={18} color="#131313" />
                              </div>
                           </header>
                           <p>Cargo</p>
                           <p>Horário de Atendimento: 00:00 às 00:00</p>
                           <p>dados</p>

                        </div>
                     </details>
                  </div>


               </div>
            </div>
         </div>
      </div>
   );
}