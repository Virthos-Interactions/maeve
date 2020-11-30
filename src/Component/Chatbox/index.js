import React, { useState } from 'react';
import './style.css';
import { FaTimes } from 'react-icons/fa';
import noUser from '../../assets/default-user-image-365x365.png';

import Chat from './chat';

const chats = [
   { id: 1, name: 'Nome Completo ', img: noUser, messages: []},
   { id: 2, name: 'Nome Completo Do Contato', img: noUser, messages: [
      { customer: true, text: 'Bom dia, gostaria de uma informação', id: 1},
      { customer: false, text: 'Bom dia, como posso te ajudar?', id: 2},
      { customer: true, text: 'Não estou conseguindo marcar horario via whatsapp, sera que consigo marcar por aqui?', id:2},
      { customer: false, text: 'Claro! Me passa seu nome completo e a hora que deseja', id: 4},
      { customer: true, text: 'Jennifer Carvalho, 18:00 - 19:00', id: 5},
      { customer: false, text: 'Marcado Jennifer!', id: 6},

   ]},
   { id: 3, name: 'Nome Completo Do Contato', img: noUser, messages: []},
   { id: 4, name: 'Nome Completo Do Contato', img: noUser, messages: []},
   { id: 5, name: 'Nome Completo Do Contato', img: noUser, messages: []},
   { id: 6, name: 'Nome Completo Do Contato', img: noUser, messages: []},
   { id: 7, name: 'Nome Completo Do Contato', img: noUser, messages: []},
   { id: 8, name: 'Nome Completo Do Contato', img: noUser, messages: []},
   { id: 9, name: 'Nome Completo Do Contato', img: noUser, messages: []},
   { id: 10, name: 'Nome Completo Do Contato', img: noUser, messages: []},
   { id: 11, name: 'Nome Completo Do Contato', img: noUser, messages: []},
   { id: 12, name: 'Nome Completo Do Contato', img: noUser, messages: []},
];

export default function Chatbox({ onClose }) {
   const [showChat, setShowChat] = useState(false);
   const [contactDetail, setContactDetail] = useState(null);

   function backChatbox() {
      setContactDetail(null);
      setShowChat(false);
   }

   return(
      <div>
         {showChat && 
            <div className="black-mask">
              <div className="black-mask-left-content">
               <Chat data={contactDetail} onBack={backChatbox} onClose={() => setShowChat(false)}/>
              </div>
            </div>
         }
         <div className="chatbox">
            <div className="header">
               <div className="header-content">
                  <h2>Inbox</h2>
                  <FaTimes size={20} color="#131313" onClick={() => onClose()}/>
               </div>
            </div>

            <div className="contacts">

               {chats.map(chat => (
                  <div className="contact" key={chat.id} onClick={() => {
                     setShowChat(true);
                     setContactDetail(chat);
                  }}>
                     <img src={chat.img} alt="Foto do Contato"/>
                     <p>{chat.name}</p>
                  </div>
               ))}
 
            </div>
         </div>
      </div>
   );
}