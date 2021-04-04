import React, { useState, useEffect, useContext } from 'react';
import DatePicker from "react-datepicker";
import { AuthContext } from '../../context';
import { arnold } from '../../services/api';

import "react-datepicker/dist/react-datepicker.css";

import { FaTimes, FaUser, FaClock, FaRegEnvelope } from 'react-icons/fa';
import { AiFillPhone } from 'react-icons/ai';
import './style.css';

import { registerLocale, setDefaultLocale } from  "react-datepicker";
import ptBR from 'date-fns/locale/pt-BR';
registerLocale('ptBR', ptBR)
setDefaultLocale('ptBR', ptBR)

export default function ModalAddCustomer({ onClose, fetchCustomers }) {
   const [firstName, setFirstName] = useState('');
   const [surname, setSurname] = useState('');
   const [phone, setPhone] = useState('');
   const [email, setEmail] = useState('');
   const [adress, setAdress] = useState('');
   const [birthDate, setBirthDate] = useState(Date.now);

   const { user, dispatch } = useContext(AuthContext);

   useEffect(() => {
      console.log(firstName)
      console.log(surname)
      console.log(phone)
      console.log(email)
      console.log(birthDate)
   }, []);

   function createCustomer(firstName, lastName, address, email, mobileNumber, birthday ) {
      return new Promise((resolve, reject) => {
         arnold.post('/customer/create', {
            partnerId: user.partnerId,
            firstName: firstName,
            lastName: lastName,
            address: address,
            email: email,
            mobileNumber: mobileNumber,
            birthday: birthday,
         }, {
            headers: {
               Abernathy: process.env.REACT_APP_ARNOLD_TOKEN,
            }
         })
            .then(() => {
               fetchCustomers();
               resolve();
            })
            .catch(err => reject(err));
      });
   }

   async function handleSaveNewCustomer(e) {
      console.log(firstName)
      console.log(surname)
      console.log(adress)
      console.log(phone)
      console.log(email)
      console.log(birthDate)

      e.preventDefault();

      createCustomer(
         firstName,
         surname,
         adress,
         email,
         phone,
         birthDate,
      ).then(() => {
         fetchCustomers();
         onClose();
      }).catch(err => console.log(err));

   }

   return (
      <div>
         <div className="create-customer">
            <form onSubmit={handleSaveNewCustomer}>
               <div className="create-customer-content">
                  <div className="input-title">
                     <p className="create-costumen-label">Preencha com os dados do cliente</p>
                     <FaTimes color="#cecece" size={20} onClick={() => onClose()} />
                  </div>

                  <div className="customer-details">
                     <div className="create-container">

                        <div className="input-customer-name">
                           <FaUser size={20} color="#cecece" />
                           <input type="text"
                              placeholder="Nome do Cliente"
                              value={firstName} onChange={e => setFirstName(e.target.value)}
                              name="customerName"
                              className="input-customer-first-name-field"
                           />
                           <input type="text"
                              placeholder="Sobrenome do Cliente"
                              value={surname} onChange={e => setSurname(e.target.value)}
                              name="customerSurname"
                              className="input-customer-surname-field"
                           />
                        </div>

                        <div className="input-customer-phone">
                           <AiFillPhone size={20} color="#cecece" />
                           <input type="text"
                              placeholder="Telefone do Cliente"
                              value={phone} onChange={e => {
                                 e.target.value = e.target.value.replace(/\D/g, '');
                                 setPhone(e.target.value);
                              }}
                              name="phone"
                           />
                        </div>

                        <div className="input-customer-email">
                           <FaRegEnvelope size={20} color="#cecece" />
                           <input type="text"
                              placeholder="Email do Cliente"
                              value={email} onChange={e => setEmail(e.target.value)}
                              name="customerEmail"
                           />
                        </div>

                        <div className="input-customer-name">
                           <FaUser size={20} color="#cecece" />
                           <input type="text"
                              placeholder="Endereço do Cliente"
                              value={adress} onChange={e => setAdress(e.target.value)}
                              name="customerName"
                              className="input-customer-first-name-field"
                           />
                        </div>

                        <div className="input-time">
                           <FaClock size={20} color="#cecece" />
                           <DatePicker 
                              value={`${new Date(birthDate).getDate()}/${new Date(birthDate).getMonth()+1}/${new Date(birthDate).getFullYear()}`}
                              selected={birthDate} 
                              onChange={date => setBirthDate(date)} 
                              locale={ptBR}
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