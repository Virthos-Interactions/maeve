import React from 'react';
import './style.css';
import { FiSend } from 'react-icons/fi';
import { FaTimes, FaAngleLeft } from 'react-icons/fa';
import { MdCheck } from 'react-icons/md';

export default function Chat({ data, onBack, onClose }) {
   return(
      <div>
         <div className="chat">
            <div className="header">
               <div className="header-content">
                  <FaAngleLeft size={20} color="#131313" onClick={() => onBack()}/>
                  <h2>{data.name}</h2>
                  <FaTimes size={18} color="#131313" onClick={() => onClose()}/>
               </div>
            </div>
            

            <div className="contact-chat">

               <div className="messages">

                  {data.messages.length === 0 &&
                     <p className="info">Ainda não possui mensagens com esse contato</p>
                  }
                  
                  {data.messages.map(message => {
                     if(message.customer) {
                        return (
                           <div className="message customer" key={message.id}>
                              <p>{message.text}</p>
                           </div>  
                        );
                     }

                     return (
                        <div className="message me" key={message.id}>
                           <p>{message.text}</p>
                        </div> 
                     );
                  })}
               

               </div>

               <div className="keyboard">
                  <form >
                     <input type="text" name="message" placeholder="Digite algo aqui" />
                     <button type="submit">
                        <FiSend color="#cecece" size={20} />
                     </button>

                  </form>
               </div>


               <div className="event-duration">
                  <p>Duração do Evento:</p>
                  <div className="duration">
                     <input type="text" name="hour" maxLength={2}/>
                     <p>:</p>
                     <input type="text" name="minute" maxLength={2}/>
                     <button>
                        <MdCheck size={20} color="white" />
                     </button>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}