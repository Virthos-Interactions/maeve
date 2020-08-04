import React, { useState, useEffect } from 'react';

import { FaTimes, FaUser, FaClock, FaAlignLeft, FaCalendar  } from 'react-icons/fa';
import { getHours, getDayWeek, getDate, formatedMonth } from '../../Utils/index';
import './style.css';

export default function ModalAddEvent({ onClose, eventDetail }) {
   const [title, setTitle] = useState('');
   const [hourStart, setHourStart] = useState('');
   const [month, setMonth] = useState('');
   const [day, setDay] = useState('');
   const [year, setYear] = useState('');
   const [hourEnd, setHourEnd] = useState('');
   const [customer, setCustomer] = useState('');
   const [note, setNote] = useState('');


   useEffect(() => {
      if(eventDetail) {
         setHourStart(getHours(eventDetail.start));
         setHourEnd(getHours(eventDetail.end));
      }
   }, []);

   async function handleSaveNewEvent(e) {
      e.preventDefault();

      if(eventDetail) {

         if(title && hourStart && hourEnd && customer) {
         
            const newEvent = {
               title,
               start: eventDetail.start,
               end: eventDetail.end,
               customer,
               note
            }
   
            console.log(newEvent); //dados do evento

            onClose();
   
         } else {
            alert('Por favor preencha todos os campos');
         }


      } else {

         if(title && hourStart && hourEnd && customer && day && month && year) {

            if(!hourStart.includes(':') || !hourEnd.includes(':')) {
               return alert('Por favor insira a hora corretamente');
            }

            if(month === '0' || Number(month) > 12) return alert('Por favor insira uma mês existente');

            if(Number(day) > 31) return alert('Por favor digite um dia existente');
            if(year.length === 1) return alert('Por favor digite um ano com 2 dígitos');

            const formatedYear = (year.length === 2) ? `20${year}` : year;

            const [startH, startM] = hourStart.split(':');
            const [endH, endM] = hourEnd.split(':');
         
            const newEvent = {
               title,
               start: new Date(formatedYear, formatedMonth(month), day, startH, startM),
               end: new Date(formatedYear, formatedMonth(month), day, endH, endM),
               customer,
               note
            }
   
            console.log(newEvent); //dados do evento

            onClose();
   
         } else {
            alert('Por favor preencha todos os campos');
         }
      }   
   }

   return(
      <div>
         <div className="create-event">
            <form onSubmit={handleSaveNewEvent}>
               <div className="create-event-content">
                  <div className="input-title">
                     <input 
                        type="text" 
                        value={title}
                        name="title"
                        onChange={e => setTitle(e.target.value)}
                        placeholder="Nome do evento"
                     />
                     <FaTimes color="#cecece" size={20} onClick={() => onClose()}/>
                  </div>

                  <div className="event-details">
                     {eventDetail && (
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
                                 onChange={ e => setDay(e.target.value)}
                              />

                              <p>/</p>

                              <input 
                                 type="text" 
                                 placeholder="mm" 
                                 maxLength="2"
                                 name="eventMonth"
                                 value={month}
                                 onChange={ e => setMonth(e.target.value)}
                              />

                              <p>/</p>

                              <input 
                                 type="text" 
                                 placeholder="aaaa" 
                                 maxLength="4"
                                 name="eventYear"
                                 value={year}
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

                        <div className="event-note">
                           <FaAlignLeft size={20} color="#cecece" />
                           <textarea value={note} placeholder="Adicionar Observações"
                              onChange={e => setNote(e.target.value)}
                              name="note"
                           ></textarea>
                        </div>

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