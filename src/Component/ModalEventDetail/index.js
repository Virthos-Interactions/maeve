import React from 'react';

import './style.css';
import { getDate, getHours, getDayWeek } from '../../Utils';
import { FaTimes, FaUser, FaClock, FaAlignLeft, FaTrash, FaPencilAlt } from 'react-icons/fa';
import { AiFillPhone } from 'react-icons/ai';

export default function ModalEventDetail({ data, onClose, deleteEvent, onEdit }) {
   return (
      <div className="modal-detail-event"

      >
         <header>
            <p>{data.title}</p>
            <div className="modal-navigation">
               <FaPencilAlt size={18} color="#cecece" onClick={() => onEdit(data)} />
               <FaTrash size={18} color="#cecece" onClick={() => deleteEvent(data)} />
               <FaTimes size={22} color="#cecece" onClick={() => onClose()} />
            </div>
         </header>

         <p className="date">{`${getDayWeek(data.start)}, ${getDate(data.start)}`}</p>

         <div className="detail-container">
            <div className="event-hour">
               <FaClock size={20} color="#cecece" />
               <span className="input">{getHours(data.start)}</span>
               <p>às</p>
               <span className="input">{getHours(data.end)}</span>
            </div>

            <div className="event-customer-name">
               <FaUser size={20} color="#cecece" />
               <span className="input">{data.customer}</span>
            </div>

            <div className="event-customer-phone">
               <AiFillPhone size={20} color="#cecece" />
               <span className="input">{data.customerNumber ? data.customerNumber : '1111111'}</span>
            </div>

            <div className="event-note">
               <FaAlignLeft size={20} color="#cecece" />

               <div className="textarea">
                  <p>{data.note ? data.note : 'Nenhuma observação'}</p>
               </div>
            </div>
         </div>
      </div>
   );
}