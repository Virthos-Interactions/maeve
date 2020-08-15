import React, { useRef, useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../../../context';

import Header from '../../../Component/Header';
import '../style.css';
import noUser from '../../../assets/default-user-image-365x365.png';
import ModalConfigSettings from '../../../Component/ModalConfigSettings';

export default function MyAccount() {
   const [currentImage, setCurrentImage] = useState(null);
   const { signed } = useContext(AuthContext);
   const history = useHistory();
   const inputFile = useRef();

   useEffect(() => {
      if(!signed) {
         return history.push('/login');
      }
   }, []);

   function getFile(e) {
      let file = null;

      if(e.target.files.length > 0) {
         file = e.target.files[0];
      }

      setCurrentImage(URL.createObjectURL(file));
   }

   function openChooseFile() {
      inputFile.current.click();
   }

   function handleSubmit(e) {
      e.preventDefault();
   }

   return(
      <div>
         <Header />

         <div className="config">
            <ModalConfigSettings myAccount />

            <div className="content">
               <form className="form-edit-user" onSubmit={handleSubmit}>
                  <header>
                     <h3>Minha Conta</h3>
                     <div className="button">
                        <button>Cancelar</button>
                        <button type="submit">Salvar</button>
                     </div>
                  </header>

                  <div className="input">
                     <label>Foto</label>

                     <div className="user-photo">
                        <img src={currentImage ? currentImage : noUser} alt="Imagem do Usuário"/>
                        <button onClick={openChooseFile}>Alterar</button>
                        <input type="file" style={{ display: 'none' }}
                           name="user-photo"
                           ref={inputFile}
                           onChange={getFile}
                        />
                     </div>
                  </div>

                  <div className="input-group">
                     <div>
                        <label>Nome</label>
                        <input type="text" name="firstName"/>
                     </div>

                     <div>
                        <label>Sobrenome</label>
                        <input type="text" name="lastName"/>
                     </div>
                  </div>

                  <div className="input">
                     <label>Email</label>
                     <input type="text" name="userEmail"/>
                  </div>

                  <div className="change-password">
                     <button>Alterar Senha</button>
                  </div>


                  <div className="input">
                     <label>Endereço</label>
                     <textarea name="address" ></textarea>
                  </div>
               </form>
               
            </div>
         </div>         
      </div>
   );
}