// import React, { useEffect, useState, useContext } from 'react';
// import { useHistory } from 'react-router-dom';
// import { AuthContext } from '../../../context';
// import { FaTrash } from 'react-icons/fa';
// import { BsPencilSquare } from 'react-icons/bs';
// import Header from '../../../Component/Header';
// import '../style.css';
// import ModalConfigSettings from '../../../Component/ModalConfigSettings';
// import ModalAddService from '../../../Component/ModalAddService';
// import ModalEditService from '../../../Component/ModalEditService';
// import { formatDate } from '../../../Utils';
// import { confirmAlert } from 'react-confirm-alert'; // Import

// export default function Services() {
//    const { signed, user, dispatch } = useContext(AuthContext);

//    const [partnerId, setPartnerId] = useState(user?.partnerId);
//    const [services, setServicees] = useState([]);
//    const [currentService, setCurrentService] = useState(undefined);
//    const [showModalAddService, setModalAddService] = useState(false);
//    const [showModalEditService, setModalEditService] = useState(false);
//    const history = useHistory();

//    useEffect(() => {

//       if (!signed) {
//          return history.push('/login');
//       }

//       fetchCustomers();

//    }, []);

//    const handleDeleteService = (service) => {
//       confirmAlert({
//          closeOnEscape: true,
//          closeOnClickOutside: true,
//          customUI: ({ onClose }) => {
//             return (
//                <div className='confirm-box'>
//                   <p className='confirm-msg'>Tem certeza que quer excluir esse serviço?</p>
//                   <div className='btn-group'>
//                      <button 
//                         className='btn-no'
//                         onClick={() => {
//                            onClose();
//                         }}
//                      >
//                         Não
//                      </button>
//                      <button
//                         className='btn-yes'
//                         onClick={() => {
//                            deleteServices([customer.email], partnerId).then(_ => {
//                               onClose();
//                               fetchServices();
//                            });
//                         }}
//                      >
//                         Sim
//                  </button>
//                   </div>
//                </div>
//             );
//          },
//          overlayClassName: "black-mask-box"
//       });
//    };

//    const handleEditService = (service) => {
//       setCurrentService(service);
//       setModalEditService(true);
//    };


//    return (
//       <div>
//          <Header />
//          <div className="config">
//             <ModalConfigSettings customers />
//             <div className="content">
//                <div className="details">
//                   <header>
//                      <h3>Clientes</h3>
//                      <button onClick={() => setModalAddCustomer(!showModalAddCustomer)}>Adicionar</button>
//                   </header>
//                   {_getCustomersList}
//                   {showModalAddCustomer &&
//                      <div className="black-mask">
//                         <div className="black-mask-content">
//                            <ModalAddCustomer
//                               onClose={() => setModalAddCustomer(false)}
//                               fetchCustomers={fetchCustomers}
//                            />
//                         </div>
//                      </div>
//                   }
//                   {showModalEditCustomer &&
//                      <div className="black-mask">
//                         <div className="black-mask-content">
//                            <ModalEditCustomer
//                               currentCustomer={currentCustomer}
//                               fetchCustomers={fetchCustomers}
//                               onClose={() => setModalEditCustomer(false)}
//                            />
//                         </div>
//                      </div>
//                   }
//                </div>
//             </div>
//          </div>
//       </div>
//    );
// }

import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../../../context';
import { deleteServices, getCraftsByPartner } from '../../../Utils/request';
import Header from '../../../Component/Header';
import { FaTrash } from 'react-icons/fa';
import { BsPencilSquare } from 'react-icons/bs';
import '../style.css';
import ModalConfigSettings from '../../../Component/ModalConfigSettings';
import ModalAddService from '../../../Component/ModalAddService';


export default function Services() {
   const { signed, user } = useContext(AuthContext);

   const [partnerId, setPartnerId] = useState(user?.partnerId);
   const [services, setServices] = useState([]);
   const [showModalAddService, setShowModalAddService] = useState(false);
   const history = useHistory();

   useEffect(() => {
      if (!signed) {
         return history.push('/login');
      }

      fetchServices();

   }, []);

   const fetchServices = async () => {
      const services = await getCraftsByPartner(partnerId);
      setServices(services);
   }

   const _getServicesList = services.map(service => {

      return (
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
                     <label>Preço:</label> <p>R$ {service.price}</p>
                  </div>

                  <div className="service-settings">
                     <label>Duração:</label> <p>{service.duration} min</p>
                  </div>

                  <div className="service-settings client-details">
                     {service.durationQuestionList ?
                        <p>Questões para o cliente:</p> :
                        null
                     }
                     {service.durationQuestionList && service.durationQuestionList.map(question => {
                        return (
                           <div key={question}>{question}</div>
                        );
                     })}
                  </div>
               </form>
            </div>
         </details>
      )

   })

   return (
      <div>
         <Header />
         <div className="config">
            <ModalConfigSettings services />
            <div className="content">
               <div className="details">
                  <header>
                     <h3>Serviços</h3>
                     <button onClick={() => setShowModalAddService(!showModalAddService)}>Adicionar</button>
                  </header>

                  <div className="detail">
                     {_getServicesList}
                     {showModalAddService &&
                        <div className="black-mask">
                           <div className="black-mask-content">
                              <ModalAddService
                                 onClose={() => setShowModalAddService(false)}
                                 fetchServices={fetchServices}
                              />
                           </div>
                        </div>
                     }
                  </div>

               </div>
            </div>
         </div>

      </div>
   );
}