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