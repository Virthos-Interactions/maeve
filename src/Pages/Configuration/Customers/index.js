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
import { getCustomers } from '../../../Utils/request';


export default function Customers() {
   const { signed, logout, user, dispatch } = useContext(AuthContext);

   const [partnerId, setPartnerId] = useState(user?.partnerId);
   const [customers, setCustomers] = useState([]);
   const history = useHistory();

   useEffect(() => {

      if (!signed) {
         return history.push('/login');
      }

      _fetchCustomers();

   }, []);

   const _fetchCustomers = async () => {
      const customers = await getCustomers(partnerId);
      console.log(customers)
      setCustomers(customers);
   }

   const _getCustomersList = customers.map(customer => {
      return (
         <div className='detail'>
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
                  <p><strong>Endereço: </strong>{customer.address}</p>
                  <p><strong>E-mail: </strong> {customer.email}</p>
                  <p><strong>Número: </strong> {customer.mobileNumber}</p>
                  <p><strong>Aniversário: </strong> {formatDate(customer.birthday)}</p>
               </div>
            </details>
         </div>
      )
   })


   return (
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
                  {_getCustomersList}
               </div>
            </div>
         </div>
      </div>
   );
}