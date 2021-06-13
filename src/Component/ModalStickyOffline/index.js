import React, { Image } from 'react';
import noConnectionIcon from '../../assets/noConnection.png';
import './style.css';

export default function ModalStickyOffline() {

   return (
      <div className='modal-offline-container'>
         <img className="noConnectionIcon" src={noConnectionIcon}/>
         <p>Sem conexão com a internet</p>
      </div>
   );
}