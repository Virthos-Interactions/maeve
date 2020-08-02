import React from 'react';

import { FaCalendar } from 'react-icons/fa';
import Header from '../../../Component/Header';
import '../style.css';
import ModalConfigSettings from '../../../Component/ModalConfigSettings';


export default function Services() {

   return(
      <div>
         <Header />

         <div className="config">
            <ModalConfigSettings configuration />

            <div className="content">
               <div className="details">
                  <header>
                     <h3>Configurações</h3>
                  </header>

                  <div className="detail detail-config">
                     <h4>Dashboard</h4>

                     <div className="config">
                       <p>Painel Atividade</p>

                        <label className="switch">
                           <input type="checkbox" name="activity-panel"/>
                           <span className="slider round"></span>
                        </label>
                     </div>

                     <div className="config">
                       <p>Painel Calendário</p>

                        <label className="switch">
                           <input type="checkbox" name="calendar-panel"/>
                           <span className="slider round"></span>
                        </label>
                     </div>

                     <div className="config">
                       <p>Painel Próximos Eventos</p>

                        <label className="switch">
                           <input type="checkbox" name="next-events-panel"/>
                           <span className="slider round"></span>
                        </label>
                     </div>
                     
                  </div>


                  <div className="detail detail-config">
                     <h4>Antecedência de Lembrete</h4>

                    <div className="hour-minute">
                       <p>Lembrar clientes</p>
                       <input type="text" name="hour" maxLength={2}/>
                       <p>:</p>
                       <input type="text" name="minute"maxLength={2}/>
                       <p>antes do evento</p>
                    </div>
                  </div>

                  <div className="detail detail-config">
                     <h4>Sincronizar Calendário</h4>

                     <div className="detail-info">
                        <p>Conecte com o seu calendário Google ou iOS</p>
                        <button>
                           <FaCalendar size={19} color="#131313" />
                        </button>
                     </div>
                  </div>

                  <div className="detail detail-config">
                     <h4>Suporte</h4>

                     <div className="detail-info">
                        <p>Fale com a gente através do email: <strong>atendimento@virthos.com.br</strong></p>
                     </div>
                  </div>
               </div>
            </div>
         </div> 
      </div>
   );
}