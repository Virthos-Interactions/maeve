import { bernard } from '../services/api';

export function getEvents(
   partnerId, 
   employeeId,  
   endDate) {
   return new Promise(async (resolve, reject) => {
      const response = await bernard.post('/appointmentsByPeriod', {
         partnerId: partnerId,
         employeeId: employeeId,
         startDate: new Date().toLocaleDateString(),
         endDate: endDate,

      },{  
         headers: {
            Abernathy: process.env.REACT_APP_BERNARD_TOKEN,
         }
      });

      resolve(response.data);
   });
}  

export function deleteAppointmentEvent(id, partnerId) {
   return new Promise(async (resolve, reject) => {
      const response = await bernard.delete('/appointment/delete', {
         partnerId: partnerId,
         appointmentId: id,
      },{  
         headers: {
            Abernathy: process.env.REACT_APP_BERNARD_TOKEN,
         }
      });        
      resolve(response);
   });
}

export function editAppointmentEvent(id, newHourStart, newHourEnd, partnerId) {
   return new Promise(async (resolve, reject) => {
      const response = await bernard.post('/appointment/update', {
         partnerId: partnerId,
         info:
            { 
            appointmentStartHour: newHourStart,
            appointmentEndHour: newHourEnd,
            appointmentId: id
         },
      },{  
         headers: {
            Abernathy: process.env.REACT_APP_BERNARD_TOKEN,
         }
      });  

      resolve(response);
   });
}