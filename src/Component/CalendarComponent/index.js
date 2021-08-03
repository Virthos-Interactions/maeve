import React from 'react';
import moment from 'moment';
import { Calendar, momentLocalizer, Views, Navigate } from 'react-big-calendar';
import '../../../node_modules/react-big-calendar/lib/css/react-big-calendar.css';
import 'moment/locale/pt-br';
import './style.css';
import { FaPlus, FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import Toolbar from 'react-big-calendar/lib/Toolbar';

let handleAddEvent = null;
let eventBackgroundColorMatch = new Map()
let eventBorderLeftMatch = new Map()

eventBackgroundColorMatch["Pending"] = '#93badb'
eventBorderLeftMatch["Pending"] = '6px solid #525866'
eventBackgroundColorMatch["Confirmed"] = '#68aae2'
eventBorderLeftMatch["Confirmed"] = '6px solid #3867d6'


export default function CalendarComponent({ addEvent, dblClick, events, newEvent }) {
   moment.locale('pt-br');




   const formatedEvents = events.map(event => {
      return {
         title: event.info.craft.name,
         start: new Date(Date.parse(event.info.appointmentStartHour)),
         end: new Date(Date.parse(event.info.appointmentEndHour)),
         id: event._id,
         customer: event.info.customer.firstName,
         note: event.info.information,
         customerNumber: event.info.customer.mobileNumber,
         backgroundColor: eventBackgroundColorMatch[event.info.confirmationStatus ?? "Pending"],
         boderLeft: eventBorderLeftMatch[event.info.confirmationStatus ?? "Pending"]
      }
   });

   const eventStyleGetter = (event, start, end, isSelected) => {
      return {
         style: {
            backgroundColor: event.backgroundColor,
            border: 0,
            borderLeft: event.boderLeft,
            color: '#fff',
            padding: 8,
            marginBottom: 5,
         }
      }
   }

   handleAddEvent = addEvent;

   const localizer = momentLocalizer(moment);

   return (
      <div className="calendar">
         <header className="calendar-header">

         </header>

         <Calendar
            localizer={localizer}
            events={formatedEvents}
            views={{ month: true, week: true, day: true }}
            selectable
            defaultView={Views.WEEK}
            onSelectEvent={(e) => dblClick(e)}
            onSelectSlot={({ start, end }) => newEvent(start, end)}
            style={{
               height: '87vh',
               paddingRight: 20,
               paddingLeft: 20,
               paddingTop: 10,
               paddingBottom: 10,
            }}
            eventPropGetter={(eventStyleGetter)}
            components={{ toolbar: CustomToolbar }}
            timeslots={1}
            min={new Date(2008, 0, 1, 8, 0)} // 8.00 AM
            max={new Date(2008, 0, 1, 23, 0)} // Max will be 6.00 PM!
         />
      </div>
   );
}

class CustomToolbar extends Toolbar {
   render() {
      return (
         <div>
            <div className='rbc-toolbar'>

               <div className="nav-buttons">
                  <button
                     onClick={() => this.navigate('PREV')}
                  >
                     <FaAngleLeft color="#737373" size={20} />
                  </button>
                  <button
                     onClick={() => this.navigate('TODAY')}
                  >Hoje</button>
                  <button
                     onClick={() => this.navigate('NEXT')}
                  >
                     <FaAngleRight color="#737373" size={20} />
                  </button>
                  <span className="calendar-info">{this.props.label}</span>
               </div>


               <span className="">
                  <button type="button" onClick={() => this.view('month')}>Mês</button>
                  <button type="button active" onClick={() => this.view('week')}>Semana</button>
                  <button type="button" onClick={() => this.view('day')}>Dia</button>
               </span>


               <button className="add-button" onClick={() => handleAddEvent()}>
                  <FaPlus size={13} color="white" />
                  <p>Adicionar</p>
               </button>

            </div>
         </div>
      );
   }
}
