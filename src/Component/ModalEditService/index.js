import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../context';
import { arnold } from '../../services/api';

import "react-datepicker/dist/react-datepicker.css";

import { FaTimes, FaUser, FaClock, FaRegEnvelope } from 'react-icons/fa';
import { AiFillPhone } from 'react-icons/ai';
import './style.css';

export default function ModalEditService({ 
   currentService, 
   fetchServices, 
   onClose 
}) {

   const [id, setId] = useState(currentService._id);
   const [name, setName] = useState(currentService.name);
   const [description, setDescription] = useState(currentService.description);
   const [price, setPrice] = useState(currentService.price);
   const [duration, setDuration] = useState(currentService.duration);

   const { user } = useContext(AuthContext);

   useEffect(() => {
      console.log(id)
      console.log(name)
      console.log(description)
      console.log(price)
      console.log(duration)
   }, []);

   function updateService(id, name, description, price, duration ) {
      return new Promise((resolve, reject) => {
         arnold.post('/craft/update', {
            partnerId: user.partnerId,
            id: id,
            name: name,
            description: description,
            price: price,
            duration: duration,
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

   async function handleUpdateService(e) {
      console.log('Updating')
      console.log(id)
      console.log(name)
      console.log(description)
      console.log(price)
      console.log(duration)

      e.preventDefault();

      updateService(
         id,
         name,
         description,
         price,
         duration,
      ).then(() => {
         fetchServices();
         onClose();
      }).catch(err => console.log(err));

   }

   return (
      <div>
         <div className="create-customer">
            <form onSubmit={handleUpdateService}>
               <div className="create-customer-content">
                  <div className="input-title">
                     <p className="create-costumen-label">Atualize os dados do serviço</p>
                     <FaTimes color="#cecece" size={20} onClick={() => onClose()} />
                  </div>

                  <div className="customer-details">
                     <div className="create-container">

                        <div className="input-customer-name">
                           <FaUser size={20} color="#cecece" />
                           <input type="text"
                              placeholder={name} 
                              name="serviceName"
                              onChange={e => setName(e.target.value)}
                              className="input-customer-first-name-field"
                           />
                        </div>

                        <div className="input-customer-phone">
                           <AiFillPhone size={20} color="#cecece" />
                           <input type="text"
                              placeholder={description} 
                              onChange={e => setDescription(e.target.value)}
                              name="serviceDescription"
                           />
                        </div>

                        <div className="input-customer-email">
                           <FaRegEnvelope size={20} color="#cecece" />
                           <input type="text"
                              placeholder={price} 
                              onChange={e => setPrice(e.target.value)}
                              name="servicePrice"
                           />
                        </div>

                        <div className="input-customer-name">
                           <FaUser size={20} color="#cecece" />
                           <input type="text"
                              placeholder={duration} 
                              name="serviceDuration"
                              onChange={e => setDuration(e.target.value)}
                              className="input-customer-first-name-field"
                           />
                        </div>

                        <div className="btn-save-customer">
                           <button className="btn-save" type="submit">Atualizar</button>
                        </div>
                     </div>
                  </div>
               </div>
            </form>
         </div>
      </div>
   );
}