import React, { useState, useEffect, useRef, useContext } from 'react';
import { FaComment } from 'react-icons/fa';
import Loader from "react-loader-spinner";
import { useHistory } from 'react-router-dom';

import api from '../../services/api';

import './style.css';
import logo from '../../assets/virthosLogo.png';
import noUser from '../../assets/default-user-image-365x365.png';
import zapVerde from '../../assets/ZapVerde.svg';
import zapCinza from '../../assets/ZapCinza.svg';
import ModalConfig from '../../Component/ModalConfig';
import ActivityMonitor from '../../Component/ActivityMonitor';
import NextEvents from '../../Component/NextEvents';
import CalendarComponent from '../../Component/CalendarComponent';
import ModalEventDetail from '../../Component/ModalEventDetail';
import ModalAddEvent from '../../Component/ModalAddEvent';
import ModalQRCode from '../../Component/ModalQRCode';
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
import {
   getCraftsByEmployee,
   getEmployees,
   getEvents,
   getEventsByPartnerId,
   getMobilePhoneStatus,
   getPartnerData,
} from '../../Utils/request';

const MOBILE_PHONE_CHECK_INTERVAL = 5000;

const useInterval = (callback, delay) => {
   const savedCallback = useRef();

   // Remember the latest callback.
   useEffect(() => {
      savedCallback.current = callback;
   }, [callback]);

   // Set up the interval.
   useEffect(() => {
      function tick() {
         savedCallback.current();
      }
      if (delay !== null) {
         let id = setInterval(tick, delay);
         return () => clearInterval(id);
      }
   }, [delay]);
}

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

   const { signed, logout, user, dispatch } = useContext(AuthContext);

   const [currentEmployee, setCurrentEmployee] = useState(user?._id);
   const [crafts, setCrafts] = useState([]);
   const [events, setEvents] = useState([]);
   const [partnerId, setPartnerId] = useState(user?.partnerId);
   const [partnerData, setPartnerData] = useState(null);
   const [mobilePhoneConnected, setMobilePhoneConnected] = useState(false);
   const [employees, setEmployees] = useState([]);
   const [showModalConfig, setShowModalConfig] = useState(false);
   const [showModalEventDetail, setShowModalEventDetail] = useState(false);
   const [showModalQRCode, setShowModalQRCode] = useState(false);
   const [eventDetail, setEventDetail] = useState(null);
   const [showModalEventCreate, setShowModalEventCreate] = useState(false);
   const [addEventWithDetail, setAddEventWithDetail] = useState(null);
   const [showChatbox, setShowChatbox] = useState(false);
   const [editEventDetail, setEditEventDetail] = useState(null);
   const [modalEditEvent, setModalEventEdit] = useState(false);
   const [isLoadingEvents, setIsLoadingEvents] = useState(false);

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
      fetchPartnerData();
      (currentEmployee === "all_employees") ?
         fetchEventsForAllEmployees() :
         fetchEventsForCurrentEmployee();
   }, []);

   useEffect(() => {
      if (!signed) {
         return history.push('/login');
      }
      (currentEmployee === "all_employees") ?
         fetchEventsForAllEmployees() :
         fetchEventsForCurrentEmployee();
   }, [currentEmployee]);

   useInterval(() => {
      if (partnerData) {
         fetchPhoneConnectionStatus();
      }
   }, MOBILE_PHONE_CHECK_INTERVAL);

   const history = useHistory();

   async function fetchCrafts() {
      const crafts = await getCraftsByEmployee(partnerId, currentEmployee);
      setCrafts(crafts);
   }

   async function fetchEventsForCurrentEmployee() {
      setIsLoadingEvents(true);
      getEvents(partnerId, currentEmployee, '2100-08-20').then(data => {
         if (data instanceof Array) {
            setEvents(data);
            setIsLoadingEvents(false);
         }
      });
   }

   async function fetchEventsForAllEmployees() {
      console.log('partnerId');
      console.log(partnerId);
      setIsLoadingEvents(true);
      getEventsByPartnerId(partnerId).then(data => {
         console.log(data);
         if (data instanceof Array) {
            setEvents(data);
            setIsLoadingEvents(false);
         }
      });
   }

   async function fetchEmployees() {
      const employees = await getEmployees(partnerId, currentEmployee);
      setEmployees(employees);
   }

   async function fetchPhoneConnectionStatus() {
      const status = await getMobilePhoneStatus(partnerData.chatproInstanceId, partnerData.chatproInstanceToken);
      setMobilePhoneConnected(status);
   }

   async function fetchPartnerData() {
      const fetchedPartnerData = await getPartnerData(partnerId);
      console.log('Partner Id')
      console.log(partnerId);
      console.log('Partner Data')
      console.log(fetchedPartnerData);
      setPartnerData(fetchedPartnerData);
   }

   const _changeEmployee = (employeeId) => {
      setCurrentEmployee(employeeId);
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
      return new Promise((resolve) => {
         deleteAppointmentEvent(data.id, user.partnerId).then(() => {
            setShowModalEventDetail(false);
            resolve(true);
         });
      })
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
      if (employee._id === currentEmployee) {
         return <option value={employee._id} selected>{employee.firstName}</option>
      } else {
         return <option value={employee._id}>{employee.firstName}</option>
      }
   })

   return (
      <div className="dashboard">
         <header>
            <div className="header-logo ">
               <img src={logo} alt="Virthos" className="logo-image" />
            </div>
            <div className="header-config">

               <img
                  src={mobilePhoneConnected ? zapVerde : zapCinza}
                  width="30"
                  height="30"
                  onClick={() => { setShowModalQRCode(true) }}
               />

               <div
                  className="employees-selection-div"
               >
                  <select
                     className="employees-selection"
                     name="employees"
                     id="employees-selection"
                     onChange={e => _changeEmployee(e.target.value)}
                  >
                     {employeesList}
                     <option value="all_employees">Todos os colaboradores</option>
                  </select>
               </div>

               {/* 
                  Disabled for now.
                  <FaComment size={28} color="#ce2026"
                     onClick={() => setShowChatbox(!showChatbox)}
                  /> 
               */}

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
                     <ModalEventEdit 
                        data={editEventDetail} 
                        fetchEvents={fetchEventsForCurrentEmployee}
                        onClose={() => setModalEventEdit(false)}    
                     />
                  </div>
               </div>
            }
            {showModalConfig &&
               <div className="black-mask"
                  onClick={() => setShowModalConfig(false)}
               >
                  <div className="black-mask-config">
                     <ModalConfig
                        partnerData={partnerData}
                        employeesList={employees}
                        onClose={onClose}
                        logout={logOut}
                        setEmployees={setEmployees}
                     />
                  </div>
               </div>
            }

            {showModalQRCode &&
               <div className="black-mask"
                  onClick={() => setShowModalQRCode(false)}
               >
                  <div className="black-mask-config">
                     <ModalQRCode
                        authToken={partnerData.chatproInstanceToken}
                        chatproInstanceId={partnerData.chatproInstanceId}
                        mobilePhoneConnected={mobilePhoneConnected}
                        onClose={onClose}
                     />
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
                        fetchEvents={fetchEventsForCurrentEmployee}
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
                        fetchEvents={fetchEventsForCurrentEmployee}
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
                     {isLoadingEvents ?
                        (
                           <div className="loader-container">
                              <Loader
                                 type="TailSpin"
                                 color="#C0091E"
                                 height={100}
                                 width={100}
                              />
                           </div>
                        ) :
                        (
                           <CalendarComponent
                              addEvent={() => {
                                 setShowModalEventCreate(!showModalEventCreate);
                                 setAddEventWithDetail(null);
                              }}
                              dblClick={showEvent}
                              events={events}
                              newEvent={handleSelect}
                           />
                        )
                     }
                  </Paper>
               </Grid>
            </Grid>
         </div>
      </div>
   );
}
