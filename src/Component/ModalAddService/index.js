import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../context';
import { arnold } from '../../services/api';

import { FaTimes, FaUser, FaClock, FaRegEnvelope } from 'react-icons/fa';
import { AiFillPhone } from 'react-icons/ai';
import './style.css';

export default function ModalAddService({ onClose, fetchServices }) {
   const [serviceName, setServiceName] = useState('');
   const [serviceDescription, setServiceDescription] = useState('');
   const [price, setPrice] = useState('');
   const [duration, setDuration] = useState('');

   const { user } = useContext(AuthContext);

   useEffect(() => {
      console.log(serviceName)
      console.log(serviceDescription)
      console.log(price)
      console.log(duration)
   }, []);

   function createService(serviceName, serviceDescription, price, duration ) {
      return new Promise((resolve, reject) => {

         console.log('Adding craft')
         console.log(serviceName)
         console.log(serviceDescription)
         console.log(price)
         console.log(duration)

         arnold.post('/craft/create', {
            partnerId: user.partnerId,
            name: serviceName,
            description: serviceDescription,
            price: price,
            duration: duration
         }, {
            headers: {
               Abernathy: process.env.REACT_APP_ARNOLD_TOKEN,
            }
         })
            .then(() => {
               fetchServices();
               resolve();
            })
            .catch(err => reject(err));
      });
   }

   async function handleSaveNewService(e) {
      console.log(serviceName)
      console.log(serviceDescription)
      console.log(price)
      console.log(duration)

      e.preventDefault();

      createService(
         serviceName,
         serviceDescription,
         price,
         duration,
      ).then(() => {
         fetchServices();
         onClose();
      }).catch(err => console.log(err));

   }

   return (
      <div>
         <div className="create-service">
            <form onSubmit={handleSaveNewService}>
               <div className="create-service-content">
                  <div className="input-title">
                     <p className="create-service-label">Preencha com os dados do serviço</p>
                     <FaTimes color="#cecece" size={20} onClick={() => onClose()} />
                  </div>

                  <div className="customer-details">
                     <div className="create-container">

                        <div className="input-service-name">
                           <FaUser size={20} color="#cecece" />
                           <input type="text"
                              placeholder="Nome do Serviço"
                              value={serviceName} onChange={e => setServiceName(e.target.value)}
                              name="serviceName"
                              className="input-service-name-field"
                           />
                        </div>

                        <div className="input-service-description">
                           <AiFillPhone size={20} color="#cecece" />
                           <input type="text"
                              placeholder="Descrição do Serviço"
                              value={serviceDescription} onChange={e => setServiceDescription(e.target.value)}
                              name="serviceDescription"
                           />
                        </div>

                        <div className="input-service-price">
                           <FaRegEnvelope size={20} color="#cecece" />
                           <input type="text"
                              placeholder="Preço do Serviço"
                              value={price} onChange={e => setPrice(e.target.value)}
                              name="price"
                           />
                        </div>

                        <div className="input-service-duration">
                           <FaUser size={20} color="#cecece" />
                           <input type="text"
                              placeholder="Duração do Serviço"
                              value={duration} onChange={e => setDuration(e.target.value)}
                              name="duration"
                              className="input-service-duration-field"
                           />
                        </div>

                        <div className="btn-save-customer">
                           <button className="btn-save" type="submit">Criar</button>
                        </div>
                     </div>
                  </div>
               </div>
            </form>
         </div>
      </div>
   );
}