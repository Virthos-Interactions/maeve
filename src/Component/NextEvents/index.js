import React, { useEffect, useState } from 'react';
import './style.css';

import api, { bernard } from '../../services/api';

import { isEqual } from 'date-fns';
import { getHours, timeRemain } from '../../Utils';


export default function NextEvents({ data }) {
   const [events, setEvents] = useState([]);

   useEffect(() => {
      async function getEvents() {
         const response = await api.get(`appointments/partnerId`);

         response.data.forEach(data => console.log(data.info));

         setEvents(response.data);

      } 

      async function getEventsTeste() {
         const partnerId = 'partner_1';

         const response = await bernard.post(`maeve/appointmentsByPartner`, {
            partnerId,
         }, {
            headers: {
               Abernathy: process.env.REACT_APP_BERNARD_TOKEN
            },
         });

         console.log(response.data);
      }

      // getEvents();
      getEventsTeste();


   }, []);

   let currentEvent = 0;
   let currentEventUseEffect = 0;

   const todayEvents = data.filter(event => {

      const [dayEvent, monthEvent, yearEvent] = event.start.toLocaleDateString().split('/');
      const formatDateEvent = new Date(`${yearEvent}/${monthEvent}/${dayEvent}`);

      const dateToday = new Date().toLocaleDateString().split('/');
      const [dayToday, monthToday, yearToday] = dateToday;
      const formatDateToday = new Date(`${yearToday}/${monthToday}/${dayToday}`);


      if( event.end >= new Date() && isEqual(formatDateEvent, formatDateToday)) {
         return event;
      }

   });
   return(
      <div className="next-events">
         {todayEvents.sort((a, b) => a.end - b.end).map(event => {
            currentEvent++;

            if(currentEvent === 1) {
               return(
                  <div className="current-event" key={event.id}>
                     <div className="event-all-content">
                        <div className="time-and-client-name">
                           <h4>{getHours(event.start)}</h4>
                           <p>{event.customer}</p>
                        </div>

                        <div className="current-event-details">
                           <h4>{event.title}</h4>
                           <h3>Tempo de atendimento:</h3>
                           <p>{timeRemain(event.start, event.end)}</p>

                        </div>
                     </div>
                  </div>
               );
            }

            return(
               <div className="other-event" key={event.customer}>
                  <div className="event-all-content">
                     <h3>{getHours(event.start)}</h3>
                     <p>{event.customer}</p>
                  </div>
               </div>
            );
         })}

         {/* {events.map(event => {
            currentEventUseEffect++;

            if(currentEventUseEffect == 1) {
               return (
                  <div className="current-event" key={event.info.id}>
                     <div className="event-all-content">
                        <div className="time-and-client-name">
                           <h4>{getHours(event.info.appointmentStartHour)}</h4>
                           <p>{event.info.customer.firstName} {event.info.customer.lastName}</p>
                        </div>

                        <div className="current-event-details">
                           <h4>{event.info.craft.craftType}</h4>
                           <h3>Tempo de atendimento:</h3>
                           <p>{event.info.craft.duration}min</p>

                        </div>
                     </div>
                  </div>
               );
            } 

            return(
               <div className="other-event" key={event.info.id}>
                  <div className="event-all-content">
                     <h3>{getHours(event.info.appointmentStartHour)}</h3>
                     <p>{event.info.customer.firstName} {event.info.customer.lastName}</p>
                  </div>
               </div>
            );
         })} */}
      </div>
   );
}