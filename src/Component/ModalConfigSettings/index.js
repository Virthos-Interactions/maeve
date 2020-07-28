import React from 'react';
import { Link } from 'react-router-dom';
import { FaUserAlt, FaUserCog, FaUsers, FaCog } from 'react-icons/fa';
import { MdBusinessCenter } from 'react-icons/md';

export default function ModalConfigSettings({
    myAccount, employees, customers, services, configuration
}) {

   return(
      <div>
         <div className="navigation-options">
            <div className={myAccount ? ' config-link active' : 'config-link'}>
               <div className="background">
                  <FaUserAlt size={20} color="#131313" />
                  <Link to="/settings/my-account">Minha Conta</Link>
               </div>
            </div>

            <div className={employees ? ' config-link active' : 'config-link'}>
               <div className="background">
                  <FaUserCog size={20} color="#131313" />
                  <Link to="/settings/employees">Colaboradores</Link>
               </div>
            </div>

            <div className={customers ? ' config-link active' : 'config-link'}>
               <div className="background">
                  <FaUsers size={20} color="#131313" />
                  <Link to="/settings/customers">Clientes</Link>
               </div>
            </div>


            <div className={services ? ' config-link active' : 'config-link'}>
               <div className="backgo">
                  <MdBusinessCenter size={20} color="#131313" />
                  <Link to="/settings/services">Serviços</Link>
               </div>
            </div>


            <div className={configuration ? ' config-link active' : 'config-link'}>
               <div className="background">
                  <FaCog size={20} color="#131313" />
                  <Link to="/settings/configuration">Configurações</Link>
               </div>
            </div>
         </div>
      </div>
   );
}