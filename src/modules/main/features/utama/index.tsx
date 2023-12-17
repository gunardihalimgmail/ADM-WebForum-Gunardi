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
import { GoogleLogin, GoogleLogout } from 'react-google-login'
// import {GoogleLogin, GoogleOAuthProvider} from '@react-oauth/google'
import { gapi } from 'gapi-script'

// import { createBrowserHistory } from 'history';


// const history = createBrowserHistory();
// const history = useNavigate();


const MainPage = () => {
  
  const navigate = useNavigate();

  useEffect(()=>{
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
  })
    
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
                  <HeaderMain></HeaderMain>
                  <div style = {{height:'100%', padding: '2rem'}}>

                      <Link to="child1">Click sini</Link>

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

                      
                      <Outlet />
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