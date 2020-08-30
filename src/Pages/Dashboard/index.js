import React, { useState, useEffect, useContext } from 'react';
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
import Chatbox from '../../Component/Chatbox/index';
import ModalEventEdit from '../../Component/ModalEditEvent';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
// import Typography from '@material-ui/core/Typography';
// import Card from '@material-ui/core/Card';
// import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
// import Button from '@material-ui/core/Button';
import CardHeader from '@material-ui/core/CardHeader';

import { AuthContext } from '../../context';
import { bernard } from '../../services/api';

const useStyles = makeStyles((theme) => ({
   root: {
      flexGrow: 1,
      minWidth: 275,
      padding: theme.spacing(4),
      height: '100% !important',
   },
   paper: {
      color: theme.palette.text.secondary,
      height: '100% !important',
   },
   calendar: {
      color: theme.palette.text.secondary,
      padding: '0px 10px',
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
   const testEvents = [
      {
         title: 'Corte Feminino',
         start: new Date(2020, 7, 29, 18),
         end: new Date(2020, 7, 29, 19),
         id: 1,
         customer: 'Gabriela Santos',
         note: 'Cortar rápido'
      },
      {
         title: 'Corte Masculino',
         start: new Date(2020, 7, 29, 18),
         end: new Date(2020, 7, 29, 19),
         id: 2,
         customer: 'Raphael Capeto',
         note: 'Cortar o mais rápido que puder'
      }
   ];

   const { signed, logout, user } = useContext(AuthContext);

   const [currentEmployee, setCurrentEmployee] = useState('');
   const [employees, setEmployees] = useState([]);
   const [showModalConfig, setShowModalConfig] = useState(false);
   const [showModalEventDetail, setShowModalEventDetail] = useState(false);
   const [events, setEvents] = useState([]);
   const [eventDetail, setEventDetail] = useState(null);
   const [showModalEventCreate, setShowModalEventCreate] = useState(false);
   const [addEventWithDetail, setAddEventWithDetail] = useState(null);
   const [showChatbox, setShowChatbox] = useState(false);
   const [editEventDetail, setEditEventDetail] = useState(null);
   const [modalEditEvent, setModalEventEdit] = useState(false);

   useEffect(() => {
      if(!signed) {
         return history.push('/login');
      }
   }, []);


   const history = useHistory();

   function changeEployee(e) {
      setCurrentEmployee(e.target.value);
   }

   function onClose() {
      setShowModalConfig(false);
   }

   function logOut() {
      logout();
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

   function editEvent(data) {
      setEditEventDetail(data);
      setShowModalEventDetail(false);
      setModalEventEdit(true);
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
               <img src={logo} alt="Virthos" className="logo-image" />
            </div>
            <div className="header-config">
               <select name="employees" onChange={changeEployee}>
                  <option value="Raphael">Raphael Capeto</option>
                  <option value="Pedro">Pedro Araujo</option>        
               </select>
               <FaComment size={28} color="#ce2026" 
                  onClick={() => setShowChatbox(!showChatbox)}
               />

               <div className="header-image" >
                  <img src={noUser} alt="Imagem do Usuário" className="user-image"/>
                  <div className="opacity"
                     onClick={() => setShowModalConfig(!showModalConfig)}
                  ></div>
               </div>

               
            </div>
         </header>

         <div className="app-system">
            {modalEditEvent && 
            <div className="black-mask"
               onClick={() => setShowModalConfig(false)}
            >
               <ModalEventEdit onClose={() => setModalEventEdit(false)} data={editEventDetail}/>
            </div>
            }
            {showModalConfig &&
               <div className="black-mask"
                  onClick={() => setShowModalConfig(false)}
               >
                  <ModalConfig onClose={onClose} logout={logOut} />
               </div>
            }

            {showModalEventCreate &&
               <div className="black-mask">
                  <ModalAddEvent
                     onClose={() => setShowModalEventCreate(false)}
                     eventDetail={addEventWithDetail}
                     editEventDetail={editEventDetail}
                  />
               </div>
            }

            {showChatbox && 
            
               <div className="black-mask">
                  <Chatbox 
                     onClose={() => setShowChatbox(false)}
                  />
               </div>
            }

            {showModalEventDetail &&
               <div className="black-mask"
                  onClick={() => setShowModalEventDetail(false)}
               >
                  <ModalEventDetail
                     data={eventDetail}
                     onClose={closeModalEventDetail}
                     deleteEvent={deleteEvent}
                     onEdit={editEvent}
                  />
               </div>
            }
         </div>
            <div className={classes.root}>
               <Grid container spacing={2}>
                  <Grid item container xs={3}>
                     <Grid item xs={12} style={{ paddingTop: 0 }} >
                        <Paper className={classes.paper}>
                           <CardHeader
                              title="Próximos Eventos"
                              color="#737373"
                              style={{ padding: 1, marginLeft: 10, fontSize: '24px' }}
                           />
                           <CardContent style={{ marginTop: -15}}>
                              <NextEvents />
                           </CardContent>
                        </Paper>
                     </Grid>
                     <Grid item xs={12} style={{ paddingTop: 10 }} >
                        <Paper className={classes.paper}>
                           <CardHeader
                              title="Atividade"
                              color="#737373"
                              style={{ padding: 1, marginLeft: 10, fontSize: '24px' }}
                           />
                           <CardContent style={{ marginTop: -15}}>
                              <ActivityMonitor />
                           </CardContent>
                        </Paper>
                     </Grid>
                  </Grid>

                  <Grid item xs={9} style={{ paddingTop: 4 }}>
                     <Paper className={classes.calendar}>
                        <CalendarComponent
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
   );
}
