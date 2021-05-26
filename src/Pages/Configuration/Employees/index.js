import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../../../context';
import { FaTrash } from 'react-icons/fa';
import { BsPencilSquare } from 'react-icons/bs';
import Header from '../../../Component/Header';
import '../style.css';
import ModalConfigSettings from '../../../Component/ModalConfigSettings';
import ModalAddEmployee from '../../../Component/ModalAddEmployee';
import ModalEditEmployee from '../../../Component/ModalEditEmployee';
import { confirmAlert } from 'react-confirm-alert';
import {
   getEmployees,
   deleteEmployees,
} from '../../../Utils/request';

const Employees = props => {
   console.log('State on Employees')
   console.log(props.location.state)

   const { 
      employeesList, 
      partnerData
   } = props.location.state;

   const { signed } = useContext(AuthContext);
   const history = useHistory();
   const partnerId = partnerData._id;

   const [currentEmployee, setCurrentEmployee] = useState(null);
   const [currentEmployees, setCurrentEmployees] = useState(employeesList);
   const [showModalAddEmployee, setModalAddEmployee] = useState(false);
   const [showModalEditEmployee, setModalEditEmployee] = useState(false);

   useEffect(() => {

      if (!signed) {
         return history.push('/login');
      }

      console.log('Employees')
      console.log(props.location.state.employeesList)

      console.log('PartnerData')
      console.log(props.location.state.partnerData)
   }, []);

   async function fetchEmployees() {
      const employees = await getEmployees(partnerId);
      setCurrentEmployees(employees);
   }

   const handleDeleteEmployee = (employee) => {
      confirmAlert({
         closeOnEscape: true,
         closeOnClickOutside: true,
         customUI: ({ onClose }) => {
            return (
               <div className='confirm-box'>
                  <p className='confirm-msg'>Tem certeza que quer excluir esse colaborador?</p>
                  <div className='btn-group'>
                     <button 
                        className='btn-no'
                        onClick={() => {
                           onClose();
                        }}
                     >
                        Não
                     </button>
                     <button
                        className='btn-yes'
                        onClick={() => {
                           deleteEmployees([employee.email], partnerId).then(_ => {
                              onClose();
                              fetchEmployees();
                           });
                        }}
                     >
                        Sim
                 </button>
                  </div>
               </div>
            );
         },
         overlayClassName: "black-mask-box"
      });
   };

   const handleEditEmployee = (employee) => {
      setCurrentEmployee(employee);
      setModalEditEmployee(true);
   };

   return (
      <div>
         <Header />

         <div className="config">
            <ModalConfigSettings 
               employees
               employeesList={currentEmployees}
               partnerData={partnerData}
            />
            <div className="content">
               <div className="details">
                  <header>
                     <h3>Colaboradores</h3>
                     <button onClick={() => setModalAddEmployee(!showModalAddEmployee)}>Adicionar</button>
                  </header>

                  {currentEmployees.map(employee => (
                     <div className="detail" key={employee._id}>
                        <details>
                           <summary>{employee.firstName} {employee.lastName}</summary>
                           <div className="current-detail">
                              <header>
                                 <p>{employee.firstName} {employee.lastName}</p>
                                 <div>
                                    <BsPencilSquare size={18} color="#131313" onClick={() => handleEditEmployee(employee)}/>
                                    <FaTrash size={18} color="#131313" onClick={() => handleDeleteEmployee(employee)}/>
                                 </div>
                              </header>
                              {employee.jobTimeList[0] ? (
                                 <p>
                                    Horário de Atendimento: {employee.jobTimeList[0].jobStartHour} às {employee.jobTimeList[0].jobEndHour}
                                 </p>
                              ) : null}
                              <p>{employee.email}</p>
                              {/* <p><strong>Whatsapp:</strong> {employee.whatsNotificationNumber}</p> */}

                           </div>
                        </details>
                     </div>
                  ))}
                  {showModalAddEmployee &&
                     <div className="black-mask">
                        <div className="black-mask-content">
                           <ModalAddEmployee
                              onClose={() => setModalAddEmployee(false)}
                              fetchEmployees={fetchEmployees}
                           />
                        </div>
                     </div>
                  }
                  {showModalEditEmployee &&
                     <div className="black-mask">
                        <div className="black-mask-content">
                           <ModalEditEmployee
                              currentEmployee={currentEmployee}
                              fetchEmployees={fetchEmployees}
                              onClose={() => setModalEditEmployee(false)}
                           />
                        </div>
                     </div>
                  }
               </div>
            </div>
         </div>
      </div>
   );
}

export default Employees;