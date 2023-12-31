// MyERP
import React, { useEffect } from 'react'
import './bodystyle.css'
import './main.scss'
import HeaderMain from '../../../layout/features/header'
import { Sidebar, Menu, SubMenu, MenuItem } from 'react-pro-sidebar'
import { svgCustom } from '../../../../utils/svgcustom'
import SideMenu from '../../../layout/features/sideMenu'
import PrintBody from '../../../layout/features/printBody'
import PostThread from '../../../layout/features/postThread'
import { Link, Outlet, Route, Router, Routes, useNavigate } from 'react-router-dom'
// import { GoogleLogin, GoogleLogout } from 'react-google-login'
// import {GoogleLogin, GoogleOAuthProvider} from '@react-oauth/google'
import { gapi } from 'gapi-script'
import { store } from '../../../../reducers'
import { useDispatch, useSelector } from 'react-redux'

// import { createBrowserHistory } from 'history';


// const history = createBrowserHistory();
// const history = useNavigate();


const MainPage = () => {
  
  const navigate = useNavigate();

  // const funcRedText = useSelector((state:any)=>state);

  // const handleStoreChange = () => {
  //   console.log('Store ' + JSON.stringify(funcRedText));
  // }

  // const unsubscribe = store.subscribe(()=>{
  //     console.log(JSON.stringify(store.getState()?.['funcRed']?.['parseText']))
  // });

  // const getdata = store.subscribe(
  useEffect(()=>{
    
    navigate({
      pathname:'/posthread'
    })
    
    // clientId: '994442954425-n4bc6lobpf99mqfa16kcg3ck0v96dill.apps.googleusercontent.com',
    function start(){
      try{
          gapi.client.start({
            clientId: '994442954425-snhnca7f4itjpp9d12lribd7gcatrfes.apps.googleusercontent.com',
            scope:''
          })
      }catch(err){
        // console.log('error ini')
      }
    }

    gapi.load('client:auth2', start);

    return () => {
      // unsubscribe();
    }
  },[])
    
  const responseGoogle = (response) => {
      console.log(response)
  }

  const onSuccess = response => {
    console.log('SUCCESS', response);
  };

  const onFailure = response => {
    console.log('FAILED', response);
  };


  return (
      <>

        <div className='main-page-wrapper'>

            <div className='sub-wrapper'>

              <div className='side-left'>
                  <SideMenu></SideMenu>
              </div>
              <div className='side-right' >
                  <div className='posisi-header'>
                      <HeaderMain></HeaderMain>
                  </div>
                  <div style = {{height:'100%', padding: '2rem', marginTop:'90px'}}>

                      {/* <Link to="child1">Click sini</Link> */}

                      <Outlet />

                      {/* clientId='994442954425-n4bc6lobpf99mqfa16kcg3ck0v96dill.apps.googleusercontent.com' */}

                      {/* <GoogleLogin
                        clientId='994442954425-snhnca7f4itjpp9d12lribd7gcatrfes.apps.googleusercontent.com'
                        buttonText='Login'
                        onSuccess={onSuccess}
                        onFailure={onFailure}
                        cookiePolicy={'single_host_origin'}
                        isSignedIn={true}
                      /> */}

                      {/* <GoogleLogout
                        clientId='994442954425-snhnca7f4itjpp9d12lribd7gcatrfes.apps.googleusercontent.com'
                        onLogoutSuccess={()=>onSuccess}
                      /> */}
                      

                      {/* <GoogleOAuthProvider clientId='994442954425-snhnca7f4itjpp9d12lribd7gcatrfes.apps.googleusercontent.com'>

                          <GoogleLogin
                            text={'signin_with'}
                              // buttonText='Login With Google'
                              onSuccess={responseGoogle}
                              onError={()=>{console.log('Login Failed')}}
                              // cookiePolicy={'single_host_origin'}
                          />

                      </GoogleOAuthProvider> */}

                      
                      
                  </div>

              </div>

            </div>
            

        </div>

    </>
  )
}

export default MainPage;

// export default {
//     routeProps:{
//         path: '/main',
//         exact: true,
//         component: MainPage,
//         name: 'Main'
//     },
//     name:'Main'
// }