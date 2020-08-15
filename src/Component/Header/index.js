import React from 'react';

import logo from '../../assets/virthosLogo.png';
import { FaCalendar } from 'react-icons/fa';
import './style.css';
import { useHistory } from 'react-router-dom';

export default function Header() {
   const history = useHistory();

   return(
      <div className="header">
         <header>
            <img src={logo} alt="Virthos"/>
            <FaCalendar size={20} color="#b71540" onClick={() => history.push('/dashboard')}/>  
         </header>
      </div>
   );
}