import React from 'react';

import { FaAngleLeft } from 'react-icons/fa';
import Header from '../../../Component/Header';
import '../style.css';
import { useHistory } from 'react-router-dom';
import ModalConfigSettings from '../../../Component/ModalConfigSettings';


export default function Services() {
   const history = useHistory();

   return(
      <div>
         <Header />

         <div className="config">
            <ModalConfigSettings configuration />

            <div className="content">
               <h2>Configurações</h2>
            </div>
         </div> 
      </div>
   );
}