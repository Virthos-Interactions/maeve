import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/virthosLogo.png';
import { FaRegSadCry } from 'react-icons/fa';

import './styles.css';

export default function Error() {
   return(
      <div className="page-error">
        <div className="header">
            <header>
               <img src={logo} alt="Virthos"/>
            </header>
         </div>
         
         <div className="content-page-error">
            <FaRegSadCry color="black" size={180}/>
            <h2>Error 404, page not found!</h2>
            <p>Ir para <Link to="/">página inicial</Link></p>
         </div>
      </div>
   );
}