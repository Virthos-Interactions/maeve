import React from 'react';
import './style.css';

import { isEqual } from 'date-fns';

import { getHours, timeRemain } from '../../Utils';
export default function NextEvents({ data }) {
   let currentEvent = 0;

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
                  <div className="current-event">
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
               <div className="other-event">
                  <div className="event-all-content">
                     <h3>{getHours(event.start)}</h3>
                     <p>{event.customer}</p>
                  </div>
               </div>
            );
         })}
      </div>
   );
}