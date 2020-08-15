import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../../../context';
import { arnold } from '../../../services/api';
import { FaTrash } from 'react-icons/fa';
import { BsPencilSquare } from 'react-icons/bs';
import Header from '../../../Component/Header';
import '../style.css';
import ModalConfigSettings from '../../../Component/ModalConfigSettings';
import { formatDate } from '../../../Utils';


export default function Customers() {
   const [customers, setCustomers] = useState([]);
   const { signed } = useContext(AuthContext);
   const history = useHistory();

   useEffect(() => {
      async function getCustomers() {
         const response = await arnold.post(`customer/get`, { email: 'teste1@teste.com', partnerId: ''}, {
            headers: {
               Abernathy : process.env.REACT_APP_ARNOLD_TOKEN,
            }
         });

         console.log(response.data);
         setCustomers(response.data);
      } 
      
      if(!signed) {
         return history.push('/login');
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

                     {/* {customers.map(customer => (
                        <details key={customer._id}>
                           <summary>{customer.firstName} {customer.lastName}</summary>

                           <div className="current-detail">
                              <header>
                                 <p>{customer.firstName} {customer.lastName}</p>
                                 <div>
                                    <BsPencilSquare size={18} color="#131313" />
                                    <FaTrash size={18} color="#131313" />
                                 </div>
                              </header>
                              <p><strong>E-mail:</strong> {customer.email}</p>
                              <p><strong>Número:</strong> {customer.mobileNumber}</p>
                              <p><strong>Aniversário:</strong> {formatDate(customer.birthday)}</p>

                           </div>
                        </details>
                     ))} */}
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