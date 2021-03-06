import React, { useState, useEffect, useRef, useContext } from 'react';
import { AuthContext } from '../../context';
import { bernard } from '../../services/api';

import { FaTimes, FaUser, FaClock, FaAlignLeft, FaCalendar  } from 'react-icons/fa';
import { AiFillPhone } from 'react-icons/ai';
import { getHours, getDayWeek, getDate, formatedMonth } from '../../Utils/index';
import './style.css';

{/* <input 
                        type="text" 
                        value={title}
                        ref={eventNameInput}
                        name="title"
                        autoComplete="false"
                        onChange={e => setTitle(e.target.value)}
                        placeholder="Nome do evento"
                     /> */}

export default function ModalAddEvent({ crafts, eventDetail, onClose }) {
   const [craftName, setCraftName] = useState('');
   const [hourStart, setHourStart] = useState('');
   const [month, setMonth] = useState('');
   const [phone, setPhone] = useState('');
   const [day, setDay] = useState('');
   const [year, setYear] = useState('');
   const [hourEnd, setHourEnd] = useState('');
   const [customer, setCustomer] = useState('');
   const [note, setNote] = useState('');
   const [message, setMessage] = useState('');
   const endHourinput = useRef(null);
   const eventNameInput = useRef(null);
   const monthInput = useRef(null);
   const yearInput = useRef(null);
   
   const { user, dispatch } = useContext(AuthContext);

   function attFeed() {
      dispatch({
         type: 'reloadPage',
         payload: {
            reload: true,
         }
      });
   
      setTimeout(() => {
         dispatch({
            type: 'reloadPage',
            payload: {
               reload: false,
            }
         });
      }, 100);
   }

   useEffect(() => {
      if(eventDetail) {
         setHourStart(getHours(eventDetail.start));
         setHourEnd(getHours(eventDetail.end));
      }
      //eventNameInput.current.focus();      
   }, []);

   function createEvent(start, end, craftName, phone, employeeId, customer, information) {
      return new Promise((resolve, reject) => {
         bernard.post('/appointment/create', {
            partnerId: user.partnerId,
            info: {
               appointmentStartHour: start,
               appointmentEndHour: end,
               craft: {
                  name: craftName
               },
               information: information ? information : '',
               employee : {
                  _id: employeeId,
               },
               customer: {
                  name: customer,
                  mobileNumber: phone, // TODO - Generalizar.
               },
               partner: {
                  _id: user.partnerId,
               }
            },           
         }, {
            headers: {
               Abernathy: process.env.REACT_APP_BERNARD_TOKEN,
            }
         })
         .then(() => {
            attFeed();

            resolve();
         })
         .catch(err => reject(err));         
      });
   }

   async function handleSaveNewEvent(e) {
      e.preventDefault();

      if(eventDetail) {

         if(craftName && hourStart && hourEnd && customer && phone) {
         
            createEvent(
               eventDetail.start,
               eventDetail.end,
               craftName,
               phone,
               user._id,
               customer,
               note,
            )
            .then(() => {
               attFeed();
               onClose();
            })
            .catch(err => console.log(err));
            
         } else {
            setMessage('Por favor preencha todos os campos');
         }


      } else {

         if(craftName && phone && hourStart && hourEnd && customer && day && month && year) {

            if(!hourStart.includes(':') || !hourEnd.includes(':')) {
               return setMessage('Por favor insira a hora corretamente');
            }

            if(month === '0' || Number(month) > 12) return setMessage('Por favor insira uma mês existente');

            if(Number(day) > 31) return setMessage('Por favor digite um dia existente');
            if(year.length === 1) return setMessage('Por favor digite um ano com 2 dígitos');

            const formatedYear = (year.length === 2) ? `20${year}` : year;

            const [startH, startM] = hourStart.split(':');
            const [endH, endM] = hourEnd.split(':');
         
            createEvent(
               new Date(formatedYear, formatedMonth(month), day, startH, startM),
               new Date(formatedYear, formatedMonth(month), day, startH, startM),
               craftName,
               phone,
               user._id,
               customer,
               note,
            )
            .then(() => {
               attFeed();
               onClose();
            })
            .catch(err => console.log(err));
   
   
         } else {
            setMessage('Por favor preencha todos os campos');
         }
      }   
   }

   const craftsList = crafts.map(craft => {
      return (
          <option value={craft.name}>{craft.name}</option>
      )
   })

   return(
      <div>
         <div className="create-event">
            <form onSubmit={handleSaveNewEvent}>
               <div className="create-event-content">
                  <div className="input-title">
                     <select 
                        className="crafts-selection" 
                        name="craftName" 
                        id="crafts-selection"
                        onChange={e => setCraftName(e.target.value)}
                     >
                        <option value="" disabled selected>Escolha um serviço</option>
                        {craftsList}
                     </select>
                     <FaTimes color="#cecece" size={20} onClick={() => onClose()}/>
                  </div>

                  <div className="event-details">
                     { eventDetail && (
                        <p>{`${getDayWeek(eventDetail.start)}, ${getDate(eventDetail.start)}`}</p>
                     )}
                     <div className="create-container">  
                        <div className="input-time">
                           <FaClock size={20} color="#cecece"/>
                           <p>Início</p>
                           <input 
                              value={hourStart} onChange={e => {
                                 e.target.value = e.target.value.replace(/\D/g, '');

                                 if(e.target.value.length === 4) {

                                    const regex = /(\d{2})(\d{2})/;
                                    e.target.value = e.target.value.replace(regex, '$1:$2');

                                    endHourinput.current.focus();
                                 }

                                 setHourStart(e.target.value);
                              }}
                              type="text"
                              name="hourStart"
                              maxLength="5"
                              placeholder="00:00"
                              disabled={eventDetail}
                           />
                           <p>às</p>
                           <input 
                              type="text" 
                              maxLength="5"
                              name="hourEnd"
                              disabled={eventDetail}
                              placeholder="00:00"
                              ref={endHourinput}
                              value={hourEnd} onChange={e => {
                                 e.target.value = e.target.value.replace(/\D/g, '')

                                 if(e.target.value.length === 4) {
                                    const regex = /(\d{2})(\d{2})/;

                                    e.target.value = e.target.value.replace(regex, '$1:$2');
                                 }

                                 setHourEnd(e.target.value);
                              }} 
                           />
                        </div>

                        {!eventDetail && (
                           <div className="event-date">

                              <FaCalendar size={20} color="#Cecece" />

                              <input 
                                 type="text" 
                                 placeholder="dd"
                                 maxLength="2"
                                 name="eventDay"
                                 value={day}
                                 onChange={ e => {
                                    setDay(e.target.value);
                                    if(e.target.value.length === 2) {
                                       monthInput.current.focus();
                                    }
                                 }}
                              />

                              <p>/</p>

                              <input 
                                 type="text" 
                                 placeholder="mm" 
                                 maxLength="2"
                                 name="eventMonth"
                                 value={month}
                                 ref={monthInput}
                                 onChange={ e => {
                                    setMonth(e.target.value);

                                    if(e.target.value.length === 2) {
                                       yearInput.current.focus();
                                    }
                                 }}
                              />

                              <p>/</p>

                              <input 
                                 type="text" 
                                 placeholder="aaaa" 
                                 maxLength="4"
                                 name="eventYear"
                                 value={year}
                                 ref={yearInput}
                                 onChange={ e => setYear(e.target.value)}
                              />

                           </div>
                        )}

                        <div className="input-customer-name">
                           <FaUser size={20} color="#cecece" />
                           <input type="text" 
                              placeholder="Nome do Cliente"
                              value={customer} onChange={e => setCustomer(e.target.value)} 
                              name="customer"
                           />
                              
                        </div>

                        <div className="input-customer-phone">
                           <AiFillPhone size={20} color="#cecece" />
                           <input type="text" 
                              placeholder="Telefone do Cliente"
                              value={phone} onChange={e => {
                                 e.target.value = e.target.value.replace(/\D/g, '');
                                 setPhone(e.target.value);
                                 // if(e.target.value.length > 11) {
                                 //    e.target.value.split(0, -1);
                                 // } else {
                                 //    setPhone(e.target.value);
                                 // }
                              }} 
                              name="phone"
                           />
                              
                        </div>

                        <div className="event-note">
                           <FaAlignLeft size={20} color="#cecece" />
                           <textarea value={note} placeholder="Adicionar Observações"
                              onChange={e => setNote(e.target.value)}
                              name="note"
                           ></textarea>
                        </div>

                        {message && (
                           <p className="message">{message}</p>
                        )}

                     <div className="btn-save-event">
                        <button type="submit">Salvar</button>
                     </div>
                     </div>
                  </div>
               </div>
            </form>
         </div>
      </div>
   );
}