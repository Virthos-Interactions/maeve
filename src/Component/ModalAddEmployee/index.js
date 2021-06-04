import React, { useState, useEffect, useContext } from 'react';
import TimePicker from 'react-time-picker';
import { AuthContext } from '../../context';
import { arnold } from '../../services/api';

import "react-datepicker/dist/react-datepicker.css";

import { FaTimes, FaUser, FaClock, FaRegEnvelope } from 'react-icons/fa';
import { AiFillPhone } from 'react-icons/ai';
import './style.css';

export default function ModalAddEmployee({ onClose, fetchEmployees }) {
   const { user, dispatch } = useContext(AuthContext);

   const [firstName, setFirstName] = useState('');
   const [surname, setSurname] = useState('');
   const [phone, setPhone] = useState('');
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [password2, setPassword2] = useState('');

   const partnerId = useState(user.partnerId);

   useEffect(() => {
      console.log(firstName)
      console.log(surname)
      console.log(phone)
      console.log(email)
      console.log(partnerId)
   }, []);

   function createEmployee(firstName, lastName, email, password, password2 ) {
      return new Promise((resolve, reject) => {
         arnold.post('/employee/create', {
            partnerId: user.partnerId,
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
            password2: password2,
         }, {
            headers: {
               Abernathy: process.env.REACT_APP_ARNOLD_TOKEN,
            }
         })
            .then(() => {
               resolve();
            })
            .catch(err => reject(err));
      });
   }

   async function handleSaveNewEmployee(e) {
      console.log(firstName)
      console.log(surname)
      console.log(phone)
      console.log(email)
      console.log(partnerId)

      e.preventDefault();

      createEmployee(
         firstName,
         surname,
         email,
         password,
         password2
      ).then(() => {
         fetchEmployees();
         onClose();
      }).catch(err => console.log(err));

   }

   return (
      <div>
         <div className="create-employee">
            <form onSubmit={handleSaveNewEmployee}>
               <div className="create-employee-content">
                  <div className="input-title">
                     <p className="create-employee-label">Preencha com os dados do colaborador</p>
                     <FaTimes color="#cecece" size={20} onClick={() => onClose()} />
                  </div>

                  <div className="employee-details">
                     <div className="create-container">

                        <div className="input-employee-name">
                           <FaUser size={20} color="#cecece" />
                           <input type="text"
                              placeholder="Nome do Colaborador"
                              value={firstName} onChange={e => setFirstName(e.target.value)}
                              name="employeeName"
                              className="input-employee-first-name-field"
                           />
                           <input type="text"
                              placeholder="Sobrenome do Colaborador"
                              value={surname} onChange={e => setSurname(e.target.value)}
                              name="employeeSurname"
                              className="input-employee-surname-field"
                           />
                        </div>

                        <div className="input-employee-phone">
                           <AiFillPhone size={20} color="#cecece" />
                           <input type="text"
                              placeholder="Telefone do colaborador"
                              value={phone} onChange={e => {
                                 e.target.value = e.target.value.replace(/\D/g, '');
                                 setPhone(e.target.value);
                              }}
                              name="phone"
                           />
                        </div>

                        <div className="input-employee-email">
                           <FaRegEnvelope size={20} color="#cecece" />
                           <input type="text"
                              placeholder="Email do colaborador"
                              value={email} onChange={e => setEmail(e.target.value)}
                              name="employeeEmail"
                           />
                        </div>


                        <div className="input-employee-email">
                           <TimePicker
                              onChange={() => null}
                              value={"10:00"}
                           />
                        </div>
                        
                        <div className="input-employee-password">
                           <FaRegEnvelope size={20} color="#cecece" />
                           <input type="password"
                              placeholder="Senha do colaborador"
                              value={password} onChange={e => setPassword(e.target.value)}
                              name="employeePassword"
                           />
                        </div>

                        <div className="input-employee-password2">
                           <FaRegEnvelope size={20} color="#cecece" />
                           <input type="password"
                              placeholder="Confirme a senha"  
                              value={password2} onChange={e => setPassword2(e.target.value)}
                              name="employeePassword2"
                           />
                        </div>

                        <div className="btn-save-employee">
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