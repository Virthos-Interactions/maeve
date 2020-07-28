import React, { useEffect } from 'react';
import Logo from '../../assets/virthosLogo.png';
import { Link, useHistory } from 'react-router-dom';
import './style.css';

export default function Home() {
   const history = useHistory();

   useEffect(() => {

      history.push('/login');
   }, []);

   return(
      <div className="home-content">
         <img src={Logo} alt="Logo"/>
         <Link to="/login">Logar</Link>
      </div>
   );
}