import React, { useEffect, useContext } from 'react';
import Logo from '../../assets/virthosLogo.png';
import { Link, useHistory } from 'react-router-dom';
import './style.css';

import { AuthContext } from '../../context';

export default function Home() {
   const { signed } = useContext(AuthContext);

   const history = useHistory();

   useEffect(() => {
      if (signed) {
         return history.push('/dashboard');
      }

      history.push('/login');

   }, []);

   return (
      <div className="home-content">
         <img src={Logo} alt="Logo" />
         <Link to="/login">Logar</Link>
      </div>
   );
}