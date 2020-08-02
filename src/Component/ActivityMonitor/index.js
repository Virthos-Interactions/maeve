import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import './style.css';

export default function ActivityMonitor() {

   const [activities, setActivities] = useState([]);

   useEffect(() => {
      async function loadActivities() {
         const response = await api.get(`activities/partnerId`);
         
         console.log(response.data);
      }
      loadActivities();
   }, []);

   return (
      <div className="activity-monitor">
         <div className="activities">

            <div className="activity">
               <header>Novo Agendamento</header>
               <div className="activity-info">
                  <p>Corte Masculino</p>
                  <p>20/10/2020 às 13:00</p>
               </div>

               <div className="date-time-activity activity-info">
                  <p>Cliente: Matheus Connolyn</p>
                  <p>Hoje 12:35:00</p>
               </div>
            </div>

            <div className="activity cancel">
               <header>Cancelamento</header>

               <div className="activity-info">
                  <p>Corte Masculino</p>
                  <p>20/10/2020 às 13:00</p>
               </div>

               <div className="date-time-activity activity-info">
                  <p>Cliente: Matheus Connolyn</p>
                  <p>Hoje 12:35:00</p>
               </div>
            </div>

         </div>
      </div>
   );
}