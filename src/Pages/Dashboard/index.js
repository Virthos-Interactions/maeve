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
import { deleteAppointmentEvent } from '../../Utils/request';
import { getCrafts } from '../../Utils/request';

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
      position: 'relative'
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

   const { signed, logout, user, dispatch } = useContext(AuthContext);

   const [currentEmployee, setCurrentEmployee] = useState(user?._id);
   const [crafts, setCrafts] = useState([]);
   const [partnerId, setPartnerId] = useState(user?.partnerId);
   const [employees, setEmployees] = useState([{ name: 'Elsie'}, { name: 'Fulano'}]);
   const [showModalConfig, setShowModalConfig] = useState(false);
   const [showModalEventDetail, setShowModalEventDetail] = useState(false);
   const [events, setEvents] = useState([]);
   const [eventDetail, setEventDetail] = useState(null);
   const [showModalEventCreate, setShowModalEventCreate] = useState(false);
   const [addEventWithDetail, setAddEventWithDetail] = useState(null);
   const [showChatbox, setShowChatbox] = useState(false);
   const [editEventDetail, setEditEventDetail] = useState(null);
   const [modalEditEvent, setModalEventEdit] = useState(false);

   function attFeed() {
      dispatch({
         type: 'reloadPage',
         payload: {
            reload: true,
         }
      });

      setTimeout(() => {
         dispatch({
            type: 'reloadPage',
            payload: {
               reload: false,
            }
         });
      }, 100);
   }

   useEffect(() => {
      if (!signed) {
         return history.push('/login');
      }
      fetchCrafts();
      fetchEmployees();
   }, []);


   const history = useHistory();

   async function fetchCrafts() {
      const crafts = await getCrafts(partnerId, currentEmployee);
      setCrafts(crafts);
   }

   async function fetchEmployees() {
      const employees = await getEmployees(partnerId, currentEmployee);
      setEmployees(employees);
   }

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
      console.log(e);
      setEventDetail(e);
   }

   function deleteEvent(data) {
      deleteAppointmentEvent(data.id, user.partnerId).then(() => {
         setShowModalEventDetail(false);
         attFeed();
      });
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

   const employeesList = employees.map(employee => {
      return (
         <option value={employee.name}>{employee.name}</option>
      )
   })

   return (
      <div className="dashboard">
         <header>
            <div className="header-logo ">
               <img src={logo} alt="Virthos" className="logo-image" />
            </div>
            <div className="header-config">
               <select
                  className="employees-selection"
                  name="employees"
                  id="employees-selection"
                  onChange={changeEployee}
               >
                  <option value="" disabled selected>Escolha um prestador</option>
                  {employeesList}
               </select>
               <FaComment size={28} color="#ce2026"
                  onClick={() => setShowChatbox(!showChatbox)}
               />

               <div className="header-image" >
                  <img src={noUser} alt="Imagem do Usuário" className="user-image" />
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
                  <div className="black-mask-content">
                     <ModalEventEdit onClose={() => setModalEventEdit(false)} data={editEventDetail} />
                  </div>
               </div>
            }
            {showModalConfig &&
               <div className="black-mask"
                  onClick={() => setShowModalConfig(false)}
               >
                  <div className="black-mask-config">
                     <ModalConfig onClose={onClose} logout={logOut} />
                  </div>
               </div>
            }

            {showModalEventCreate &&
               <div className="black-mask">
                  <div className="black-mask-content">
                     <ModalAddEvent
                        crafts={crafts}
                        editEventDetail={editEventDetail}
                        eventDetail={addEventWithDetail}
                        onClose={() => setShowModalEventCreate(false)}
                     />
                  </div>
               </div>
            }

            {showChatbox &&

               <div className="black-mask">

                  <div className="black-mask-left-content">
                     <Chatbox
                        onClose={() => setShowChatbox(false)}
                     />
                  </div>
               </div>
            }

            {showModalEventDetail &&
               <div className="black-mask"
                  onClick={() => setShowModalEventDetail(false)}
               >
                  <div className="black-mask-content">
                     <ModalEventDetail
                        data={eventDetail}
                        onClose={closeModalEventDetail}
                        deleteEvent={deleteEvent}
                        onEdit={editEvent}
                     />
                  </div>
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
                        <CardContent style={{ marginTop: -15 }}>
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
