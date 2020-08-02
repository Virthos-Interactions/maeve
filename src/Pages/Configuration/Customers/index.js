import React, { useEffect, useState } from 'react';
import api from '../../../services/api';
import { FaTrash } from 'react-icons/fa';
import { BsPencilSquare } from 'react-icons/bs';
import Header from '../../../Component/Header';
import '../style.css';
import ModalConfigSettings from '../../../Component/ModalConfigSettings';


export default function Customers() {
   const [customers, setCustomers] = useState([]);

   useEffect(() => {
      async function getCustomers() {
         const response = await api.get(`customer/partnerId`);

         console.log(response.data.result);

         setCustomers(response.data.result);
      }  
      getCustomers();

   }, []);

   return(
      <div>
         <Header />
         <div className="config">
            <ModalConfigSettings customers />
            <div className="content">
               <div className="details">
                  <header>
                     <h3>Clientes</h3>
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
                           <p>Dados Cadastrados</p>

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
                           <p>Dados Cadastrados</p>
                        </div>
                     </details>
                  </div>


               </div>
            </div>
         </div>
      </div>
   );
}