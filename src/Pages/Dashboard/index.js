import React, { useState, useEffect } from 'react';
import { FaComment } from 'react-icons/fa';
import { useHistory } from 'react-router-dom';
import api from '../../services/api';

import './style.css';
import logo from '../../assets/virthosLogo.png';
import noUser from '../../assets/default-user-image-365x365.png';
import ModalConfig from '../../Component/ModalConfig';
import ActivityMonitor from '../../Component/ActivityMonitor';
import NextEvents from '../../Component/NextEvents';
import CalendarComponent from '../../Component/CalendarComponent';
import ModalEventDetail from '../../Component/ModalEventDetail';
import ModalAddEvent from '../../Component/ModalAddEvent';



import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
// import Typography from '@material-ui/core/Typography';
// import Card from '@material-ui/core/Card';
// import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
// import Button from '@material-ui/core/Button';
import CardHeader from '@material-ui/core/CardHeader';


const useStyles = makeStyles((theme) => ({
   root: {
      flexGrow: 1,
      minWidth: 275,
      padding: theme.spacing(4)
   },
   paper: {
      color: theme.palette.text.secondary,
   },
   bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
   },
   title: {
      fontSize: 14,
   },
   pos: {
      marginBottom: 12,
   },
   cardHeader: {
      padding: 15,
   }
}));


export default function Dashboard() {



   const classes = useStyles();

   const [currentEmployee, setCurrentEmployee] = useState('');
   const [employees, setEmployees] = useState([]);
   const [showModalConfig, setShowModalConfig] = useState(false);
   const [showModalEventDetail, setShowModalEventDetail] = useState(false);
   const [events, setEvents] = useState([
      {
         title: 'Corte Feminino',
         start: new Date(2020, 6, 28, 18),
         end: new Date(2020, 6, 28, 19),
         id: 1,
         customer: 'Gabriela Santos',
         note: 'Cortar rápido'
      },
      {
         title: 'Corte Masculino',
         start: new Date(2020, 6, 28, 19, 30),
         end: new Date(2020, 6, 28, 20, 30),
         id: 2,
         customer: 'Raphael Capeto',
         note: 'Cortar o mais rápido que puder'
      },
      {
         title: 'Corte Infantil',
         start: new Date(2020, 6, 28, 21, 30),
         end: new Date(2020, 6, 28, 22),
         id: 3,
         customer: 'Jonathan Souza'
      }

   ]);
   const [eventDetail, setEventDetail] = useState(null);
   const [showModalEventCreate, setShowModalEventCreate] = useState(false);
   const [addEventWithDetail, setAddEventWithDetail] = useState(null);

   useEffect(() => {
      async function getEmployees() {
         const response = await api.get('employee/parterId');
         
         console.log(response.data);
      }

      getEmployees();
   }, [currentEmployee]);


   const history = useHistory();

   function changeEployee(e) {
      setCurrentEmployee(e.target.value);
   }

   function onClose() {
      setShowModalConfig(false);
   }

   function logOut() {
      history.push('/login');
   }

   function showEvent(e) {
      setShowModalEventDetail(true);
      setEventDetail(e);
   }

   function deleteEvent(data) {
      if(window.confirm(`Você realmente deseja apagar ${data.title}?`)) {
         setEvents(events.filter(event => event.id !== data.id));
         setShowModalEventDetail(false);
      }
   }

   function handleSelect(start, end) {
      setAddEventWithDetail({ start, end });

      setShowModalEventCreate(true);
   }

   function closeModalEventDetail() {
      setShowModalEventDetail(false);
      setEventDetail(null);
   }

   return (
      <div className="dashboard">
         <header>
            <div className="header-logo ">
               <img src={logo} alt="Logo" className="logo-image" />
            </div>
            <div className="header-config">
               <select name="employees" onChange={changeEployee}>
                  <option value="Raphael">Raphael</option>
                  <option value="Gabriel">Gabriel</option>
               </select>
               <FaComment size={30} color="#b71540" />
               <img src={noUser} alt="Imagem do Usuário" className="user-image"
                  onClick={() => setShowModalConfig(!showModalConfig)}
               />
            </div>
         </header>

         <div className="app-system">
            {showModalConfig &&
               <div className="black-mask">
                  <ModalConfig onClose={onClose} logout={logOut} />
               </div>
            }

            {showModalEventCreate &&
               <div className="black-mask">
                  <ModalAddEvent
                     onClose={() => setShowModalEventCreate(false)}
                     eventDetail={addEventWithDetail}
                  />
               </div>
            }

            {showModalEventDetail &&
               <div className="black-mask">
                  <ModalEventDetail
                     data={eventDetail}
                     onClose={closeModalEventDetail}
                     deleteEvent={deleteEvent}
                  />
               </div>
            }

            <div className={classes.root}>
               <Grid container spacing={2}>
                  <Grid item xs={3}>
                     <Grid item xs={12} style={{ paddingTop: 10 }} >
                        <Paper className={classes.paper}>
                           <CardHeader
                              title="Próximos Eventos"
                           />
                           <CardContent>
                              <NextEvents data={events} />
                           </CardContent>
                        </Paper>
                     </Grid>
                     <Grid item xs={12} style={{ paddingTop: 10 }} >
                        <Paper className={classes.paper}>
                           <CardHeader
                              title="Atividade"
                           />
                           <CardContent>
                              <ActivityMonitor />
                           </CardContent>
                        </Paper>
                     </Grid>
                  </Grid>

                  <Grid item xs={9} style={{ paddingTop: 14 }}>
                     <Paper className={classes.paper}>
                        <CalendarComponent
                           data={events}
                           newEvent={handleSelect}
                           dblClick={showEvent}
                           addEvent={() => {
                              setShowModalEventCreate(!showModalEventCreate);
                              setAddEventWithDetail(null);
                           }}
                        />
                     </Paper>
                  </Grid>
               </Grid>
            </div>
         </div>
      </div>
   );
}