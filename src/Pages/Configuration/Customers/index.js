import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../../../context';
import { FaTrash } from 'react-icons/fa';
import Loader from "react-loader-spinner";
import { BsPencilSquare } from 'react-icons/bs';
import Header from '../../../Component/Header';
import '../style.css';
import ModalConfigSettings from '../../../Component/ModalConfigSettings';
import ModalAddCustomer from '../../../Component/ModalAddCustomer';
import ModalEditCustomer from '../../../Component/ModalEditCustomer';
import { formatDate } from '../../../Utils';
import { getCustomers, deleteCustomers } from '../../../Utils/request';
import { confirmAlert } from 'react-confirm-alert';

const Customers = props => {
   console.log('State on Customers')
   console.log(props.location.state)

   const {
      employeesList,
      partnerData
   } = props.location.state;

   const { signed, user, dispatch } = useContext(AuthContext);

   const [partnerId, setPartnerId] = useState(user?.partnerId);
   const [customers, setCustomers] = useState([]);
   const [currentCustomer, setCurrentCustomer] = useState(undefined);
   const [showModalAddCustomer, setModalAddCustomer] = useState(false);
   const [showModalEditCustomer, setModalEditCustomer] = useState(false);
   const [isFetchingCustomers, setIsFetchingCustomers] = useState(false);

   const history = useHistory();

   useEffect(() => {

      if (!signed) {
         return history.push('/login');
      }

      fetchCustomers();

   }, []);

   const fetchCustomers = async () => {
      setIsFetchingCustomers(true);
      const customers = await getCustomers(partnerId);
      setCustomers(customers);
      setIsFetchingCustomers(false);
   }

   const handleDeleteCustomer = (customer) => {
      confirmAlert({
         closeOnEscape: true,
         closeOnClickOutside: true,
         customUI: ({ onClose }) => {
            return (
               <div className='confirm-box'>
                  <p className='confirm-msg'>Tem certeza que quer excluir esse cliente?</p>
                  <div className='btn-group'>
                     <button
                        className='btn-no'
                        onClick={() => {
                           onClose();
                        }}
                     >
                        Não
                     </button>
                     <button
                        className='btn-yes'
                        onClick={() => {
                           deleteCustomers([customer.email], partnerId).then(_ => {
                              onClose();
                              fetchCustomers();
                           });
                        }}
                     >
                        Sim
                     </button>
                  </div>
               </div>
            );
         },
         overlayClassName: "black-mask-box"
      });
   };

   const handleEditCustomer = (customer) => {
      setCurrentCustomer(customer);
      setModalEditCustomer(true);
   };

   const _getCustomersList = () => {
      if (isFetchingCustomers) {
         return (
            <div className="loader-container">
               <Loader
                  type="TailSpin"
                  color="#C0091E"
                  height={100}
                  width={100}
               />
            </div>
         );
      } else {
         return customers.map(customer => {
            return (
               <div className='detail'>
                  <details key={customer._id}>
                     <summary>{customer.firstName} {customer.lastName}</summary>

                     <div className="current-detail">
                        <header>
                           <p>{customer.firstName} {customer.lastName}</p>
                           <div>
                              <BsPencilSquare size={18} color="#131313" onClick={() => handleEditCustomer(customer)} />
                              <FaTrash size={18} color="#131313" onClick={() => handleDeleteCustomer(customer)} />
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
      }
   }

   return (
      <div>
         <Header />
         <div className="config">
            <ModalConfigSettings
               customers
               employeesList={employeesList}
               partnerData={partnerData}
            />
            <div className="content">
               <div className="details">
                  <header>
                     <h3>Clientes</h3>
                     <button onClick={() => setModalAddCustomer(!showModalAddCustomer)}>Adicionar</button>
                  </header>
                  {_getCustomersList()}
                  {showModalAddCustomer &&
                     <div className="black-mask">
                        <div className="black-mask-content">
                           <ModalAddCustomer
                              onClose={() => setModalAddCustomer(false)}
                              fetchCustomers={fetchCustomers}
                           />
                        </div>
                     </div>
                  }
                  {showModalEditCustomer &&
                     <div className="black-mask">
                        <div className="black-mask-content">
                           <ModalEditCustomer
                              currentCustomer={currentCustomer}
                              fetchCustomers={fetchCustomers}
                              onC lose={() => setModalEditCustomer(false)}
                           />
                        </div>
                     </div>
                  }
               </div>
            </div>
         </div>
      </div>
   );
}

export default Customers;