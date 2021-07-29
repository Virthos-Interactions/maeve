import React, { useState } from 'react';
import './style.css';
import { FaTimes } from 'react-icons/fa';
import noUser from '../../assets/default-user-image-365x365.png';

import Chat from './chat';

export default function Chatbox({ 
   onClose,
   onCheckNotification,
   notifications,
}) {

   const [showChat, setShowChat] = useState(false);
   const [contactDetail, setContactDetail] = useState(null);

   function backChatbox() {
      setContactDetail(null);
      setShowChat(false);
   }

   return (
      <div>
         {showChat &&
            <div className="black-mask">
               <div className="black-mask-left-content">
                  <Chat data={contactDetail} onBack={backChatbox} onClose={() => setShowChat(false)} />
               </div>
            </div>
         }
         <div className="chatbox">
            <div className="header">
               <div className="header-content">
                  <h2>Notificações</h2>
                  <FaTimes size={20} color="#131313" onClick={() => onClose()} />
               </div>
            </div>

            <div className="contacts">

               {notifications.map(notification => (
                  <div className="contact" key={notification.notificationId} onClick={() => {
                     onCheckNotification(notification.notificationId)
                  }}>
                     <p>{notification.name} enviou uma foto às {notification.timestamp} de hoje.</p>
                  </div>
               ))}

            </div>
         </div>
      </div>
   );
}