import { observer } from "mobx-react-lite";
import { useContext, useEffect, useRef, useState } from "react";
// import { Router, Route, Switch, Redirect, HashRouter, BrowserRouter } from "react-router-dom";
import { Router, Route, HashRouter, BrowserRouter, Routes, Navigate, useNavigate } from "react-router-dom";
import Login from "./login";
import MainPage from "./modules/main/features/utama"
import Footer from "./layout/Footer";
import Header from "./layout/Header";
import Menu from "./layout/Menu";
import modules from "./modules";
import { RootStoreContext } from "./stores/RootStore";
import Home from "./login/home";
// import { createBrowserHistory } from "history";
import PASPeriodeLalu from "./modules/agronomi/features/periodelalu";
import PASHistory from "./modules/agronomi/features/history";
import DetailProblemKebun from "./modules/agronomi/features/detail";
import UbahPassword from "./login/changepassword";
import DetailIOM from "./modules/memo/features/Detail/IOM";
import DetailPengajuan from "./modules/memo/features/Detail/Pengajuan";
import './App.css'
import PostThread from "./modules/layout/features/postThread";
import { gapi } from "gapi-script";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";
import ListThread from "./modules/layout/features/listThread";

// export const appHistory = createBrowserHistory();

function App() {

  const navigate = useNavigate();

  const [myValue, setMyValue] = useState('Default Value');
  
  const rootStore = useContext(RootStoreContext);
  const { token } = rootStore.commonStore;
  const [authenticated, isAuthenticated] = useState(false);

  let pageWrapperRef:any;

  useEffect(() => {

    const activePage = sessionStorage.getItem('activePage');

    if (activePage) {
      // Navigasi ke halaman aktif
      navigate(activePage);
    }

    // if (token != null) {
    //   isAuthenticated(true);
    // }
    // const handleScroll = (e) => {
    //   console.log(e?.target?.scrollingElement?.scrollTop)
    // } 

    // document.addEventListener("scroll",handleScroll,{passive:true})

    // return () => {
    //   document.removeEventListener("scroll", handleScroll)
    // }
    
  }, [navigate])

  return (
      <div className="div-utama">
        
        {/* <BrowserRouter> */}
        <Routes>
              {/* <Route index element = {<Navigate to="/"}></Route> */}
              {/* <Route index element path="/"></Route> */}

              <Route path = "/" element={<MainPage />}>
              {/* <Route path = "/"> */}
                  {/* <Route index element={<Navigate to="/main" />} /> */}
                  {/* <Route path="/main" element={<MainPage />}> */}
                  {/* <Route index element={<MainPage />}> */}
                      <Route path="posthread" element={<PostThread />} />
                      <Route path="listhread" element={<ListThread />} />

                  {/* </Route> */}

              </Route>

        </Routes>

        <ToastContainer 
          draggable
          pauseOnHover
        />

            {/* <Route exact path="/" component={Login} /> */}

            {/* <Route exact path = "/" component = {MainPage} /> */}
            {/* {modules.map((module)=>(
                // <Route {...module.routeProps} key = {module.name} />
                <Route {...module} key = {module.name} />
            ))} */}
        {/* </BrowserRouter> */}
        
        {/* {
          authenticated ?
            <>
              <HashRouter>

                  <div id="wrapper">
                    <Menu />
                    <div id="page-wrapper" className="gray-bg">
                      <Header />

                      <Route exact path="/" component={Home} />
                      <Route exact path="/agronomi/list/listpasperiodelalu" component={PASPeriodeLalu} />
                      <Route exact path="/agronomi/list/listpashistory" component={PASHistory} />
                      <Route exact path="/agronomi/detail/detailproblemkebun" component={DetailProblemKebun} />

                      <Route exact path="/memo/detail/detailmemo" component={DetailIOM} />
                      <Route exact path="/memo/detail/detailpengajuan" component={DetailPengajuan} />

                      <Route exact path="/changepassword" component={UbahPassword} />

                      {modules.map((module) => (
                        <Route {...module.routeProps} key={module.name} />
                      ))}

                      <Footer />
                    </div>  
                  </div>

              </HashRouter>
            </> :
            <>
              <HashRouter>
                  <Route exact path="/" component={Login} />
              </HashRouter>

            </>
        } */}
      </div>
  );

}

export default observer(App);
