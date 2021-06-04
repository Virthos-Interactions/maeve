import React, { useState, useEffect, useContext } from 'react';
import Loader from "react-loader-spinner";

import { FaTimes } from 'react-icons/fa';
import zapCinza from '../../assets/ZapCinza.svg';
import zapVerde from '../../assets/ZapVerde.svg';
import greenLikeIcon from '../../assets/greenLikeIcon.png';
import {
   getQRCode
} from '../../Utils/request';
import './style.css';

export default function ModalQRCode({
   authToken,
   chatproInstanceId,
   mobilePhoneConnected,
   onClose
}) {

   const [qrCode, setQRCode] = useState(null);
   const [showQRCode, setShowQRCode] = useState(false);

   useEffect(() => {
      getQRCode(
         chatproInstanceId, authToken
      ).then(qr => {
         console.log("setting")
         if (qr) {
            setShowQRCode(true)
            setQRCode(qr)
         }
      })
   }, []);

   return (
      <div>
         <div className="qr-code-modal">
            <div className="header">
               <img className="whatsapp-icon" src={mobilePhoneConnected ? zapVerde : zapCinza} width="30" height="30" />
               <p className="header-text">Whatsapp {mobilePhoneConnected ? 'conectado' : 'desconectado'}! </p>
               <FaTimes className="close-icon" color="#cecece" size={20} onClick={() => onClose()} />
            </div>
            <div className="qr-container">
               <p className="container-text">
                  {mobilePhoneConnected ?
                     'Seu Whatsapp foi conectado com sucesso.' :
                     'Leia o QR Code abaixo com seu Whatsapp para reconectar.'
                  }
               </p>
               {
                  (mobilePhoneConnected) ?
                     <div className="loader-container">
                        <img className="whatsapp-icon" src={greenLikeIcon} width="190" height="190" />
                     </div> :
                     (showQRCode) ?
                        <img className="whatsapp-icon" src={qrCode} width="265" height="265" /> :
                        <div className="loader-container">
                           <Loader
                              type="TailSpin"
                              color="#C0091E"
                              height={100}
                              width={100}
                           />
                        </div>
               }
            </div>
         </div>
      </div>
   );
}