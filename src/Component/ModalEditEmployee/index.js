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

export default function ModalEditEmployee({ 
   currentEmployee, 
   fetchEmployees, 
   onClose 
}) {

   const [firstName, setFirstName] = useState(currentEmployee.firstName);
   const [surname, setSurname] = useState(currentEmployee.lastName);
   const [phone, setPhone] = useState(currentEmployee.mobileNumber);
   const [email, setEmail] = useState(currentEmployee.email);

   const { user } = useContext(AuthContext);

   useEffect(() => {
      console.log(firstName)
      console.log(surname)
      console.log(phone)
      console.log(email)
   }, []);

   function updateEmployee(firstName, lastName, mobileNumber, email ) {
      console.log("UPDATING")
      console.log("craftList")
      console.log(currentEmployee.craftList)
      console.log("jobTimeList")
      console.log(currentEmployee.jobTimeList)
      return new Promise((resolve, reject) => {
         arnold.post('/employee/update', {
            partnerId: user.partnerId,
            firstName: firstName,
            lastName: lastName,
            mobileNumber: mobileNumber,
            email: email,
            craftList: currentEmployee.craftList,
            jobTimeList: currentEmployee.jobTimeList
         }, {
            headers: {
               Abernathy: process.env.REACT_APP_ARNOLD_TOKEN,
            }
         })
            .then(resp => {
               console.log("updated")
               console.log(resp)
               fetchEmployees();
               resolve();
            })
            .catch(err => {
               console.log("err")
               console.log(err)
               reject(err)
            });
      });
   }

   async function handleUpdateEmployee(e) {
      console.log(firstName)
      console.log(surname)
      console.log(phone)
      console.log(email)

      e.preventDefault();

      updateEmployee(
         firstName,
         surname,
         phone,
         email,
      ).then(() => {
         fetchEmployees();
         onClose();
      }).catch(err => console.log(err));

   }

   return (
      <div>
         <div className="create-customer">
            <form onSubmit={handleUpdateEmployee}>
               <div className="create-customer-content">
                  <div className="input-title">
                     <p className="create-costumen-label">Atualize os dados do colaborador</p>
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