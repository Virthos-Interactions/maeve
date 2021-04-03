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

export default function ModalEditCustomer({ 
   currentCustomer, 
   fetchCustomers, 
   onClose 
}) {

   const [firstName, setFirstName] = useState(currentCustomer.firstName);
   const [surname, setSurname] = useState(currentCustomer.lastName);
   const [phone, setPhone] = useState(currentCustomer.mobileNumber);
   const [email, setEmail] = useState(currentCustomer.email);
   const [adress, setAdress] = useState(currentCustomer.address);
   const [birthDate, setBirthDate] = useState(currentCustomer.birthday);

   const { user } = useContext(AuthContext);

   useEffect(() => {
      console.log(firstName)
      console.log(surname)
      console.log(phone)
      console.log(email)
      console.log(birthDate)
      console.log(new Date(new Date(birthDate).getFullYear(), new Date(birthDate).getMonth(), new Date(birthDate).getDate()))
   }, []);

   function updateCustomer(firstName, lastName, address, email, mobileNumber, birthday ) {
      return new Promise((resolve, reject) => {
         arnold.post('/customer/update', {
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

   async function handleUpdateCustomer(e) {
      console.log(firstName)
      console.log(surname)
      console.log(adress)
      console.log(phone)
      console.log(email)
      console.log(birthDate)

      e.preventDefault();

      updateCustomer(
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
            <form onSubmit={handleUpdateCustomer}>
               <div className="create-customer-content">
                  <div className="input-title">
                     <p className="create-costumen-label">Atualize os dados do cliente</p>
                     <FaTimes color="#cecece" size={20} onClick={() => onClose()} />
                  </div>

                  <div className="customer-details">
                     <div className="create-container">

                        <div className="input-customer-name">
                           <FaUser size={20} color="#cecece" />
                           <input type="text"
                              placeholder={firstName} 
                              name="customerName"
                              onChange={e => setFirstName(e.target.value)}
                              className="input-customer-first-name-field"
                           />
                           <input type="text"
                              placeholder={surname} 
                              name="customerSurname"
                              onChange={e => setSurname(e.target.value)}
                              className="input-customer-surname-field"
                           />
                        </div>

                        <div className="input-customer-phone">
                           <AiFillPhone size={20} color="#cecece" />
                           <input type="text"
                              placeholder={phone} 
                              onChange={e => setPhone(e.target.value)}
                              name="phone"
                           />
                        </div>

                        <div className="input-customer-email">
                           <FaRegEnvelope size={20} color="#cecece" />
                           <input type="text"
                              placeholder={email} 
                              onChange={e => setEmail(e.target.value)}
                              name="customerEmail"
                           />
                        </div>

                        <div className="input-customer-name">
                           <FaUser size={20} color="#cecece" />
                           <input type="text"
                              placeholder={adress} 
                              name="customerName"
                              onChange={e => setAdress(e.target.value)}
                              className="input-customer-first-name-field"
                           />
                        </div>

                        <div className="input-time">
                           <FaClock size={20} color="#cecece" />
                           <DatePicker 
                              selected={new Date(new Date(birthDate).getFullYear(), new Date(birthDate).getMonth(), new Date(birthDate).getDate())}
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