import React from 'react';
import moment from 'moment';
import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
import '../../../node_modules/react-big-calendar/lib/css/react-big-calendar.css';
import 'moment/locale/pt-br';
import './style.css';
import { FaPlus } from 'react-icons/fa';
import Toolbar from 'react-big-calendar/lib/Toolbar';

let handleAddEvent = null;

export default function CalendarComponent({ data, newEvent, dblClick, addEvent }) {
   moment.locale('pt-br');

   const eventStyleGetter = (event, start, end, isSelected) => {
      return {
         style: { 
            backgroundColor: '#68aae2',
            border: 0,
            borderLeft: '6px solid #3867d6',
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
            events={data}
            views={{ month: true, week: true, day: true }}
            selectable
            defaultView={Views.WEEK}
            onDoubleClickEvent={(e) => dblClick(e)}
            onSelectSlot={({ start, end }) => newEvent(start, end)}
            style={{ height: 612, padding: 10 }}
            eventPropGetter={(eventStyleGetter)}
            components={{ toolbar: CustomToolbar }}
            timeslots={1}
            min={new Date(2008, 0, 1, 8, 0)} // 8.00 AM
            max={new Date(2008, 0, 1, 23, 0)} // Max will be 6.00 PM!
            date={new Date()}
         />
      </div>
   );
}

class CustomToolbar extends Toolbar {
   render() {
      return (
         <div>
            <div className='rbc-toolbar'>

               <span className="calendar-info">{this.props.label}</span>

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
