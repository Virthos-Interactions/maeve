import React, { useState } from 'react';
import { FaUser, FaLock } from 'react-icons/fa';
import './style.css';
import logo from '../../assets/agendadorVirthos.svg';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
   root: {
      '& > *': {
         margin: theme.spacing(1),
         width: '25ch',
      },
   },
}));

export default function Login() {
   const [username, setUsername] = useState('');
   const [password, setPassword] = useState('');

   const history = useHistory();

   const classes = useStyles();

   function handleSubmit() {
      history.push('/dashboard');
   }

   return (
      <div className="container">
         <section className="form-section">
            <img src={logo} alt="Logo" />
            <div className="form-wrapper">
               <form className="form-login" onSubmit={handleSubmit} method="POST">
                  <div className="input-block">
                     <div className="icon">
                        <FaUser size={22} color="#131313" />
                     </div>
                     <TextField
                        label="Usuario"
                        name="username"
                        variant="outlined"
                        size="small"
                        color="secondary"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                     />
                  </div>
                  <div className="input-block">
                     <div className="icon">
                        <FaLock size={22} color="#131313" />
                     </div>
                     <TextField
                        label="Senha"
                        autoComplete="current-password"
                        variant="outlined"
                        size="small"
                        type="password"
                        color="secondary"
                        name="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                     />
                  </div>
                  <div class="text-center">
                     <Button type="submit" variant="contained" className="btn-login">
                        Entrar
                     </Button>
                  </div>
               </form>
            </div>
         </section>
      </div>
   );
}