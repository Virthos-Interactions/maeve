import React, { useState, useEffect, useRef, useContext } from 'react';

import { getHours, getDayWeek, getDate } from '../../Utils/index';
import { FaTimes, FaUser, FaClock, FaAlignLeft } from 'react-icons/fa';
import { editAppointmentEvent } from '../../Utils/request';
import { AuthContext } from '../../context';

import './styles.css';

export default function ModalEventEdit({ data, onClose }) {
   const [title, setTitle] = useState('');
   const [hourStart, setHourStart] = useState('');
   const [month, setMonth] = useState('');
   const [day, setDay] = useState('');
   const [year, setYear] = useState('');
   const [hourEnd, setHourEnd] = useState('');
   const [customer, setCustomer] = useState('');
   const [note, setNote] = useState('');
   const [message, setMessage] = useState('');
   const endHourinput = useRef(null);
   const titleInput = useRef(null);
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
      if (data.title) setTitle(data.title);
      if (data.note) setNote(data.note);
      if (data.customer) setCustomer(data.customer);
      if (data.start) setHourStart(getHours(data.start));
      if (data.end) setHourEnd(getHours(data.end));

      titleInput.current.focus();
      setMessage('Você está editando esse evento');

   }, []);

   function handleEditEvent(e) {
      e.preventDefault();

      if (!title || !hourStart || !hourEnd || !customer) {
         setMessage('Por favor preencha todos os campos');
      } else {
         editAppointmentEvent(data.id, hourStart, hourEnd, user.partnerId).then(() => {
            attFeed();
            onClose();
         });
      }
   }

   return (
      <div>
         <div className="edit-event">
            <form onSubmit={handleEditEvent}>
               <div className="edit-event-content">
                  <div className="input-title">
                     <input
                        type="text"
                        value={title}
                        ref={titleInput}
                        name="title"
                        autoComplete={false}
                        onChange={e => setTitle(e.target.value)}
                        placeholder="Nome do evento"
                        disabled
                     />
                     <FaTimes color="#cecece" size={20} onClick={() => onClose()} />
                  </div>

                  <div className="event-detail">
                     <p>{`${getDayWeek(data.start)}, ${getDate(data.start)}`}</p>

                     <div className="edit-container">
                        <div className="input-time">
                           <FaClock size={20} color="#cecece" />
                           <p>Início</p>
                           <input
                              value={hourStart}
                              onChange={e => {
                                 setHourStart(e.target.value);
                              }}
                              type="time"
                              name="hourStart"
                              maxLength="5"
                              placeholder="00:00"
                           />
                           <p>às</p>
                           <input
                              type="time"
                              maxLength="5"
                              name="hourEnd"
                              placeholder="00:00"
                              ref={endHourinput}
                              value={hourEnd}
                              onChange={e => {
                                 setHourEnd(e.target.value);
                              }}
                           />
                        </div>

                        <div className="input-customer-name">
                           <FaUser size={20} color="#cecece" />
                           <input type="text"
                              placeholder="Nome do Cliente"
                              value={customer} onChange={e => setCustomer(e.target.value)}
                              name="customer"
                              disabled
                           />

                        </div>

                        <div className="event-note">
                           <FaAlignLeft size={20} color="#cecece" />
                           <textarea value={note} placeholder="Adicionar Observações"
                              onChange={e => setNote(e.target.value)}
                              name="note"
                              disabled
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