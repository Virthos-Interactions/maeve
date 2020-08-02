import React, { useEffect, useState } from 'react';
import api from '../../../services/api';
import Header from '../../../Component/Header';
import { FaTrash } from 'react-icons/fa';
import { BsPencilSquare } from 'react-icons/bs';
import '../style.css';
import ModalConfigSettings from '../../../Component/ModalConfigSettings';


export default function Services() {
   const [services, setServices] = useState([]);

   useEffect(() => {
      async function loadServices() {
         const response = await api.get(`craft/parterId`);

         console.log(response.data);

         setServices(response.data.result);
      }
      loadServices();
   }, []);

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

                  {services.map(service => (
                     <div key={service._id}>
                        teste
                     </div>
                  ))}

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
                                 <input type="text" id="price" maxLength="8"/>
                              </div>

                              <div className="service-settings">
                                 <label>Pré-definir Duração:</label>
                                 <input type="text" maxLength="2"/>
                                 <label>:</label>
                                 <input type="text" maxLength="2"/>
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