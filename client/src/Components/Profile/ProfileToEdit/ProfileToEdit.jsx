import React, { useState,useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useAuth0 } from '@auth0/auth0-react';
import {
  FormControl,
  InputLabel,
  Input,
  Button,
  FormHelperText,
  IconButton,
} from '@mui/material';
import { IoSend } from 'react-icons/io5';
import { BsCameraFill } from 'react-icons/bs';
import theme from '../MaterialUIColors';
import { ThemeProvider } from '@emotion/react';
import swal from 'sweetalert';
import s from './ProfileToEdit.module.css';
import Loading from '../../Loading/Loading';
import validate from '../validateFunction';
import { updateUser } from '../../../Redux/actions';
import RenderProfilePic from '../../Cloudinary/renderProfilePic';
import { getUser } from '../../../Redux/actions/index';

export const ProfileToEdit = () => {
  const logo = 'https://res.cloudinary.com/pflet/image/upload/v1663098045/Let/image/logo1_bdo7fl.png'
  const image = 'https://res.cloudinary.com/pflet/image/upload/v1662686111/Let/image/persona_logeada_hatkhk.png'
  const dispatch = useDispatch();
  const cloudName = 'pflet'
  const history = useHistory();
  const userLogged = useSelector(state=>state.user);
  const {isLoading, user } = useAuth0();
  const [errors, setErrors] = useState({});
  const [photo, setPhoto] = useState(undefined);
  const [toUpload, setToUpload] = useState('');
  const [uploadedImage, setUploadedImage] = useState(userLogged.profilePic)
  const [uploading, setUploading] = useState(false)
  const [input, setInput] = useState({
    firstName: '',
    lastName: '',
    cellphone: ''
  });

  useEffect(() => {
    if(user) dispatch(getUser(user?.email));
    if(!isLoading) {
      if(!user?.email) history.push('/')
    }
  }, [isLoading]); // eslint-disable-line react-hooks/exhaustive-deps

  if (isLoading || uploading) return <Loading />;
  if (!isLoading && !user?.email) return <Loading />;
  
  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.id]: e.target.value,
    });
    if (e.target.id === 'profilePic'){
      setPhoto(URL.createObjectURL(e.target.files[0]));
      setToUpload(e.target.files[0])
    }
    setErrors(
      validate(
        {
          ...input,
          [e.target.id]: e.target.value,
        },
        e.target.id,
        errors
      )
    );
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if(toUpload) {
      setUploading(true)  
      const data = new FormData()
      data.append('file',toUpload)
      data.append('upload_preset','ProfilePictures')
      const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, { method:'POST', body:data })
      const file = await res.json() 
      setUploadedImage(file.public_id)
      await dispatch(updateUser({...input, email: user.email, profilePic: file.public_id }))
    } else{
      await dispatch(updateUser({ ...input, email: user.email }))
    }
    dispatch(getUser(userLogged.email));
    window.history.go(-1);
    return swal('Felicidades!', 'Tus datos fueron modificados!', 'success');
  };

  const goBack = () => {
    window.history.go(-1);
  };

  const disabled = Object.keys(errors).length > 0 ||
   !(input.firstName || input.lastName || input.cellphone || toUpload)
  const name = (userLogged.firstName && userLogged.lastName)?
  `${userLogged.firstName} ${userLogged.lastName}`:
  userLogged.firstName? userLogged.firstName:
  user?.name
  return (
    <section className={s.allPage}>
      <div className={s.container}>
        <Button
          variant='contained'
          color='success'
          className={s.btnBack}
          onClick={goBack}>
          Volver
        </Button>
        <div className={s.logoContainer}>
          <img src={logo} alt='logo' className={s.logo} />
        </div>
        <p className={s.etiquetap}>EDITA SOLO LOS CAMPOS QUE DESEAS ACTUALIZAR</p>
        <div className={s.nameAndImg}>
          <h2>{name}</h2>
          <IconButton
            color='primary'
            aria-label='upload picture'
            component='label'
            className={s.imgContainer}
          >
            <input
              hidden
              accept='image/*'
              type='file'
              onChange={handleChange}
              // value={input.profilePic}
              id='profilePic'
            />
            {uploadedImage && !photo?
            <RenderProfilePic publicId={uploadedImage}
            alt={user?.name}
            />
            :
            <img
              src={photo ? photo : image}
              alt={user?.name}
              className={s.img}
            />
            }
            <BsCameraFill className={s.iconCamera} />
          </IconButton>
        </div>
        <form className={s.form} onSubmit={handleSubmit}>
          <ThemeProvider theme={theme}>
            <FormControl>
              <InputLabel htmlFor='firstName'>Nombre</InputLabel>
              <Input
                id='firstName'
                aria-describedby='my-helper-text'
                error={errors.firstName ? true : false}
                placeholder={userLogged?userLogged.firstName?userLogged.firstName:'Vacio':'Vacio'}
                value={input.firstName}
                onChange={handleChange}
                className={s.input}
              />
            </FormControl>
            <FormControl>
              <InputLabel htmlFor='lastName'>Apellido</InputLabel>
              <Input
                id='lastName'
                aria-describedby='my-helper-text'
                error={errors.lastName ? true : false}
                placeholder={userLogged?userLogged.lastName?userLogged.lastName:'Vacio':'Vacio'}
                value={input.lastName}
                onChange={handleChange}
                className={s.input}
              />
              <FormHelperText id='my-helper-text'></FormHelperText>
            </FormControl>
            <FormControl>
              <InputLabel htmlFor='cellphone'>Telefono</InputLabel>
              <Input
                id='cellphone'
                aria-describedby='my-helper-text'
                error={errors.cellphone ? true : false}
                placeholder={userLogged?userLogged.cellphone?userLogged.cellphone:'Vacio':'Vacio'}
                type='tel'
                value={input.cellphone}
                onChange={handleChange}
                className={s.input}
              />
            </FormControl>
          </ThemeProvider>
        </form>
            <Button
              variant='contained'
              color='success'
              className={s.btnHome}
              onClick={() => history.push('/')}>
              HOME
            </Button>
            <Button
              variant='contained'
              endIcon={<IoSend />}
              className={s.btnSend}
              type='submit'
              disabled={disabled}
              onClick={handleSubmit}
            >
              ENVIAR
            </Button>
      </div>
      <div className={s.background}></div>
    </section>
  );
};
