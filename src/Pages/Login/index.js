import React, { useState, useContext, useEffect } from 'react';
import { FaUser, FaLock, FaWhatsapp, FaLinkedin } from 'react-icons/fa';
import { AiOutlineMail, AiFillFacebook } from 'react-icons/ai';
import './style.css';
import logo from '../../assets/virthosLogo.png';
import footerCircle from '../../assets/footer.png';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import { AuthContext } from '../../context';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
   root: {
      '& > *': {
         margin: theme.spacing(1),
         width: '25ch',
      },
   },
}));

export default function Login() {
   const { signed, login } = useContext(AuthContext);
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const history = useHistory();
   const [message, setMessage] = useState('');

   const classes = useStyles();

   function handleSubmit(e) {
      setMessage('');

      e.preventDefault();

      if(!email || !password) {
         setMessage('Por favor preencha todos os campos');

      } else {
         login(email, password).then(() => {
            setEmail('');
            setPassword('');

         }).catch(error => {
            console.log(error);
            setMessage('Ops! Ocorreu um erro, tente novamente!');
            setPassword('');
            setEmail('');
         });
      }
   }

   
  useEffect(() => {
   if(signed) {
      return history.push('/dashboard'); 
   }
  }, [signed]);

   return (
      <div className="container">
         <section className="form-section">
            <p>Agendador</p>
            <img src={logo} alt="Logo" />
            <div className="form-wrapper">
               <form className="form-login" onSubmit={handleSubmit} method="POST">
                  <div className="input-block">
                     <div className="icon">
                        <FaUser size={20} color="#131313" />
                     </div>
                     <TextField
                        label="Nome do Usuário"
                        name="username"
                        variant="outlined"
                        size="small"
                        color="secondary"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                     />
                  </div>
                  <div className="input-block">
                     <div className="icon">
                        <FaLock size={20} color="#131313" />
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
                  <div className="text-center">
                    <p>{message}</p>
                     <Button type="submit" variant="contained" className="btn-login">
                        Entrar
                     </Button>
                  </div>
               </form>
            </div>
         </section>
         <div className="footer">
            <footer>
               <h3>Atenda seus clientes de maneira <br/>mais rápida, mais humanizada e mais moderna.</h3>
               <div className="border-bottom">
                  <img src={footerCircle} alt="Imagem do Rodapé"/>
               </div>
               
               <p className="footer-explication">
                  O Agendador Virthos utiliza inteligência artificial para 
                  <br/>
                  atender clientes e realizar agendamentos no seu calendário automaticamente.
               </p>

               <p className="contact-text">
                  Quer saber mais? Fale com a gente!
               </p>

               <div className="social-midias">
                  <FaWhatsapp color="white" size={25}/>
                  <AiOutlineMail color="white" size={25}/>
                  <FaLinkedin color="white" size={25}/>
                  <AiFillFacebook color="white" size={25}/>
               </div>

               <p className="site">www.virthos.com.br</p>

            </footer>
         </div>
      </div>
   );
}