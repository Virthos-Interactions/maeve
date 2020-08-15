import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../../../context';
import api from '../../../services/api';
import { FaTrash } from 'react-icons/fa';
import { BsPencilSquare } from 'react-icons/bs';
import Header from '../../../Component/Header';
import '../style.css';
import ModalConfigSettings from '../../../Component/ModalConfigSettings';


export default function Employees() {
   const [employees, setEmployees] = useState([]);
   const { signed } = useContext(AuthContext);
   const history = useHistory();

   useEffect(() => {
      async function getEmployess() {
         const response = await api.get(`employee/partnerId`);

         setEmployees(response.data.result);
      }

      if(!signed) {
         return history.push('/login');
      }

      getEmployess();

   }, []);
   
   return(
      <div>
         <Header />

         <div className="config">
            <ModalConfigSettings employees />
            <div className="content">
               <div className="details">
                  <header>
                     <h3>Colaboradores</h3>
                     <button>Adicionar</button>
                  </header>

                  {employees.map(employee => (
                     <div className="detail" key={employee._id}>
                        <details>
                           <summary>{employee.firstName} {employee.lastName}</summary>
                           <div className="current-detail">
                              <header>
                                 <p>{employee.firstName} {employee.lastName}</p>
                                 <div>
                                    <BsPencilSquare size={18} color="#131313" />
                                    <FaTrash size={18} color="#131313" />
                                 </div>
                              </header>
                              <p>
                                 Horário de Atendimento: {employee.jobTimeList[0].jobStartHour} às {employee.jobTimeList[0].jobEndHour}
                              </p>
                              <p>{employee.email}</p>
                              <p><strong>Whatsapp:</strong> {employee.whatsNotificationNumber}</p>
   
                           </div>
                      </details>
                   </div>  
                  ))}
               </div>
            </div>
         </div>
      </div>
   );
}