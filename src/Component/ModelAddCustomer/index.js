import React from 'react';

import './style.css';
import { getDate, getHours, getDayWeek } from '../../Utils';
import { FaTimes, FaUser, FaClock, FaAlignLeft, FaTrash, FaPencilAlt } from 'react-icons/fa';
import { AiFillPhone } from 'react-icons/ai';

export default function ModalAddCustomer({ data, onClose, deleteEvent, onEdit }) {
   return (
      <div className="modal-add-customer"

      >
         <header>
            <p>{data.title}</p>
            <div className="modal-navigation">
               <FaPencilAlt size={18} color="#cecece" onClick={() => onEdit(data)} />
               <FaTrash size={18} color="#cecece" onClick={() => deleteEvent(data)} />
               <FaTimes size={22} color="#cecece" onClick={() => onClose()} />
            </div>
         </header>

         <div className="detail-container">

            <div className="event-customer-name">
               <FaUser size={20} color="#cecece" />
               <span className="input"></span>
            </div>

            <div className="event-customer-phone">
               <AiFillPhone size={20} color="#cecece" />
               <span className="input"></span>
            </div>

            <div className="event-customer-phone">
               <AiFillPhone size={20} color="#cecece" />
               <span className="input"></span>
            </div>

         </div>
      </div>
   );
}