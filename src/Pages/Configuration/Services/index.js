import React from 'react';

import Header from '../../../Component/Header';
import { FaTrash } from 'react-icons/fa';
import { BsPencilSquare } from 'react-icons/bs';
import '../style.css';
import { useHistory } from 'react-router-dom';
import ModalConfigSettings from '../../../Component/ModalConfigSettings';


export default function Services() {
   const history = useHistory();

   return(
      <div>
         <Header />
         <div className="config">
            <ModalConfigSettings services />
            <div className="content">
               <div className="details">
                  <header>
                     <h3>Serviços</h3>
                     <button>Adicionar</button>
                  </header>

                  <div className="detail">
                     <details>
                        <summary>Corte Feminino</summary>

                        <div className="current-detail services">
                           <header>
                              <p>Corte Feminino</p>
                              <div>
                                 <BsPencilSquare size={18} color="#131313" />
                                 <FaTrash size={18} color="#131313" />
                              </div>
                           </header>

                           <form>
                              <div className="service-settings">
                                 <label>Pré-definir preço: R$</label>
                                 <input type="text"/>
                              </div>

                              <div className="service-settings">
                                 <label>Pré-definir Duração:</label>
                                 <input type="text"/>
                                 <label>:</label>
                                 <input type="text"/>
                              </div>

                              <div className="service-settings client-details">
                                 <p>Determinar detalhes com o cliente</p>
                                 <div>Pergunta 1</div>
                                 <div>Pergunta 1</div>
                                 <div>Pergunta 1</div>
                                 <div>Pergunta 1</div>
                              </div>
                           </form>
                        </div>
                     </details>
                  </div>

                  <div className="detail">
                     <details>
                        <summary>Corte Masculino</summary>

                        <div className="current-detail services">
                           <header>
                              <p>Corte Masculino</p>
                              <div>
                                 <BsPencilSquare size={18} color="#131313" />
                                 <FaTrash size={18} color="#131313" />
                              </div>
                           </header>

                           <form>
                              <div className="service-settings">
                                 <label>Pré-definir preço: R$</label>
                                 <input type="text"/>
                              </div>

                              <div className="service-settings">
                                 <label>Pré-definir Duração:</label>
                                 <input type="text"/>
                                 <label>:</label>
                                 <input type="text"/>
                              </div>

                              <div className="service-settings client-details">
                                 <p>Determinar detalhes com o cliente</p>
                                 <div>Pergunta 1</div>
                                 <div>Pergunta 1</div>
                                 <div>Pergunta 1</div>
                                 <div>Pergunta 1</div>
                              </div>
                           </form>
                        </div>
                     </details>
                  </div>



               </div>
            </div>
         </div>
        
      </div>
   );
}