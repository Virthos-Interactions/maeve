import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../../../context';
import api from '../../../services/api';
import Header from '../../../Component/Header';
import { FaTrash } from 'react-icons/fa';
import { BsPencilSquare } from 'react-icons/bs';
import '../style.css';
import ModalConfigSettings from '../../../Component/ModalConfigSettings';


export default function Services() {
   const [services, setServices] = useState([]);
   const { signed } = useContext(AuthContext);
   const history = useHistory();

   useEffect(() => {
      async function loadServices() {
         const response = await api.get(`craft/parterId`);

         console.log(response.data);

         setServices(response.data.result);
      }

      if(!signed) {
         return history.push('/login');
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

                  <div className="detail">

                  {services.map(service => (
                     <details key={service._id}>
                        <summary>{service.name}</summary>

                        <div className="current-detail services">
                           <header>
                              <p>{service.description}</p>
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
                                 {service.durationQuestionList && service.durationQuestionList.map(question => {
                                    return(
                                       <div key={question}>{question}</div>
                                    );
                                 })}
                              </div>
                           </form>
                        </div>
                     </details>
                  ))}

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