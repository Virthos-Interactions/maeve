import { arnold, bernard, chatpro } from '../services/api';

export function getEvents(
   partnerId,
   employeeId,
   endDate) {
   return new Promise(async (resolve, reject) => {
      const response = await bernard.post('/appointmentsByPeriod', {
         partnerId: partnerId,
         employeeId: employeeId,
         startDate: '1991-03-12',
         endDate: endDate,
      }, {
         headers: {
            Abernathy: process.env.REACT_APP_BERNARD_TOKEN,
         }
      });
      resolve(response.data);
   });
}

export function getEventsByPartnerId(partnerId) {
   return new Promise(async (resolve, reject) => {
      const response = await bernard.post('/appointmentsByPartner', {
         partnerId: partnerId,
      }, {
         headers: {
            Abernathy: process.env.REACT_APP_BERNARD_TOKEN,
         }
      });
      resolve(response.data);
   });
}

export function getCraftsByEmployee(
   partnerId,
   employeeId) {
   return new Promise(async (resolve, reject) => {
      const response = await arnold.post(`/employee/get`, {
         partnerId: partnerId,
         employeeId: employeeId,
      }, {
         headers: {
            Abernathy: process.env.REACT_APP_ARNOLD_TOKEN,
         }
      });
      resolve(response.data.craftList);
   });
}

export function getCraftsByPartner(partnerId) {
   return new Promise(async (resolve, reject) => {
      const response = await arnold.post(`/partner/getCrafts`, {
         partnerId: partnerId,
      }, {
         headers: {
            Abernathy: process.env.REACT_APP_ARNOLD_TOKEN,
         }
      });
      resolve(response.data);
   });
}

export function getEmployees(partnerId) {
   return new Promise(async (resolve, reject) => {
      const response = await arnold.post(`/employee/getEmployeesByPartnerId`, {
         partnerId: partnerId,
      }, {
         headers: {
            Abernathy: process.env.REACT_APP_ARNOLD_TOKEN,
         }
      });
      resolve(response.data);
   });
}

export function getPartnerData(partnerId) {
   return new Promise(async (resolve, reject) => {
      const response = await arnold.post('/partner/get', {
         partnerId: partnerId,
      }, {
         headers: {
            Abernathy: process.env.REACT_APP_ARNOLD_TOKEN,
         }
      });
      resolve(response.data);
   });
}

export function getCustomers(
   partnerId) {
   return new Promise(async (resolve, reject) => {
      const response = await arnold.post(`/customer/getByPartner`, {
         partnerId: partnerId,
      }, {
         headers: {
            Abernathy: process.env.REACT_APP_ARNOLD_TOKEN,
         }
      });
      resolve(response.data);
   });
}

export function deleteAppointmentEvent(id, partnerId) {
   return new Promise(async (resolve, reject) => {
      const response = await bernard.post('/appointment/deleteById', {
         partnerId: partnerId,
         appointmentId: id,
      }, {
         headers: {
            Abernathy: process.env.REACT_APP_BERNARD_TOKEN,
         }
      });
      resolve(response);
   });
}

export function deleteCustomers(emails, partnerId) {
   return new Promise(async (resolve, reject) => {
      const response = await arnold.post('/customer/delete', {
         partnerId: partnerId,
         emails: emails,
      }, {
         headers: {
            Abernathy: process.env.REACT_APP_ARNOLD_TOKEN,
         }
      });
      console.log(response);
      resolve(response);
   });
}

export function deleteEmployees(emails, partnerId) {
   return new Promise(async (resolve, reject) => {
      const response = await arnold.post('/employee/delete', {
         partnerId: partnerId,
         emails: emails,
      }, {
         headers: {
            Abernathy: process.env.REACT_APP_ARNOLD_TOKEN,
         }
      });
      console.log('delete employee');
      console.log(response);
      resolve(response);
   });
}

export function deleteServices(ids, partnerId) {
   return new Promise(async (resolve, reject) => {
      const response = await arnold.post('/craft/delete', {
         partnerId: partnerId,
         ids: ids,
      }, {
         headers: {
            Abernathy: process.env.REACT_APP_ARNOLD_TOKEN,
         }
      });
      console.log(response);
      resolve(response);
   });
}

export function getMobilePhoneStatus(chatproInstanceId, authToken) {
   let options = {
      headers: {
         Authorization: authToken
      }
   }
   return new Promise(async (resolve, reject) => {
      chatpro.get(`/${chatproInstanceId}/api/v1/status`, options).then(response => {
         if(response.data.connected) {
            resolve(true)
         } else {
            resolve(false)
         }
      }).catch(err => {
         console.log('err')
         console.log(err)
         resolve(false)
      })

   });
}

export function getQRCode(chatproInstanceId, authToken) {
   let options = {
      headers: {
         Authorization: authToken
      }
   }
   return new Promise(async (resolve, reject) => {
      chatpro.get(`/${chatproInstanceId}/api/v1/generate_qrcode`, options).then(response => {
         if(response.data.qr) {
            resolve(response.data.qr)
         } else {
            resolve(null)
         }
      }).catch(err => {
         console.log('err')
         console.log(err)
         resolve(false)
      })

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
      }, {
         headers: {
            Abernathy: process.env.REACT_APP_BERNARD_TOKEN,
         }
      });

      resolve(response);
   });
}