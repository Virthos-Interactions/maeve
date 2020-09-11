import React, { useEffect, useState, useContext } from 'react';
import './style.css';

import { isEqual } from 'date-fns';
import { getHours, timeRemain } from '../../Utils';
import { getEvents } from '../../Utils/request';
import { AuthContext } from '../../context';


export default function NextEvents() {
   const [events, setEvents] = useState([]);
   const { user } = useContext(AuthContext);
   const partnerId = user && user.partnerId; 
   const employeeId = user && user._id;

   useEffect(() => {
      getEvents(partnerId, employeeId, '2100-08-20').then(data => {
         setTimeout(() => {
            setEvents(data);
        }, 10);
      });

   }, []);

   let currentEvent = 0;

   const todayEvents = events.filter(event => {

      const [dayEvent, monthEvent, yearEvent] = new Date(Date.parse(event.info.appointmentStartHour))
         .toLocaleDateString()
         .split('/');  
      const formatDateEvent = new Date(`${yearEvent}/${monthEvent}/${dayEvent}`);

      const dateToday = new Date().toLocaleDateString().split('/');
      const [dayToday, monthToday, yearToday] = dateToday;
      const formatDateToday = new Date(`${yearToday}/${monthToday}/${dayToday}`);


      if(new Date(Date.parse(event.info.appointmentEndHour)) >= new Date() && isEqual(formatDateEvent, formatDateToday)) {
         return event;
      }

   });

   console.log(todayEvents);
   return(
      <div className="next-events">
         {todayEvents.map(event => {
            currentEvent++;

            if(currentEvent == 1) {
               return (
                  <div className="current-event" key={event._id}>
                     <div className="event-all-content">
                        <div className="time-and-client-name">
                           <h4>{getHours(event.info.appointmentStartHour)}</h4>
                           <p>{event.info.customerName}</p>
                        </div>

                        <div className="current-event-details">
                           <h4>{event.info.craftName}</h4>
                           <h3>Tempo de atendimento:</h3>
                           <p>{timeRemain(
                               new Date(Date.parse(event.info.appointmentStartHour)),
                               new Date(Date.parse(event.info.appointmentEndHour))
                           )}</p>

                        </div>
                     </div>
                  </div>
               );
         } 

            return(
               <div className="other-event" key={event._id}>
                  <div className="event-all-content">
                     <h3>{getHours(event.info.appointmentStartHour)}</h3>
                     <p>{event.info.customerName}</p>
                  </div>
               </div>
            );
         })}
      </div>
   );
}