import moment from 'moment';

export function getHours(date) {
   let hour = moment(date).toDate().getHours();
   let minute = moment(date).toDate().getMinutes();

   if(hour < 10) hour = '0' + hour;
   if(minute < 10) minute = '0' + minute;

   return `${hour}:${minute}`;
}

export function getDate(date) {
  let day = moment(date).toDate().getDate();
  let month = moment(date).toDate().getMonth();
  let year = moment(date).toDate().getFullYear();

  day = (day < 10) ? '0' + day : day;
  month = (month < 10) ? '0' + month : month;

  const monthArray = [
     'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro',
     'Outubro', 'Novembro', 'Dezembro'
   ];

   month = monthArray[Number(month)];

  return `${day} de ${month} de ${year}`;
}

export function timeRemain(timeStart, timeEnd) {
  const timestampStart = timeStart.getTime();
  const timestampEnd = timeEnd.getTime();
  const duration = timestampEnd - timestampStart;

  let minutes = parseInt((duration / (1000 * 60)) % 60);
  let hours = parseInt((duration / (1000 * 60 * 60)) % 24);

  minutes = (minutes < 10) ? `0${minutes}` : minutes;
  hours = (hours < 10) ? `0${hours}` : hours;

  if(hours > 0) {
    return `${hours}h${minutes}min`;
  }

  if(minutes > 0) {
    return `${minutes}min`;
  }
}

export function getDayWeek(date) {
  const names = [
    'Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'
  ];

  const dayNumber = date.getDay();

  return names[dayNumber];
}

export function formatedMonth(month) {
  return `${Number(month) - 1}`;
}

export function formatDate(date) {
  const [year, month, day] = date.split('-');
  return `${day[0] + day[1]}/${month}/${year}`;
}