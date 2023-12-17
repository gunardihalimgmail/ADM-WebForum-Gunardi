import React, { useEffect, useState } from 'react'
import { Menu, MenuItem, Sidebar, SubMenu } from 'react-pro-sidebar'
import { svgCustom } from '../../../../utils/svgcustom'
import './sideMenu.scss'
import { Link } from 'react-router-dom'
import { FormControl, Form, FormGroup, FormLabel, Modal, ModalBody, ModalFooter, ModalTitle } from 'react-bootstrap'
import ModalHeader from 'react-bootstrap/esm/ModalHeader'

const SideMenu = () => {

  const [user, setUser] = useState('');
  const [statusLogin, setStatusLogin] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showModalBuat, setShowModalBuat] = useState(false);

  useEffect(()=>{
      if (!statusLogin){
        setUser('Masuk')
      }
  })

  const handleClickSignIn = (status) => {
      setShowModal(status)
  }
  const handleCloseModal = () => {
      setShowModal(false)
  }
  const handleCloseModalBuat = () => {
      setShowModalBuat(false)
  }

  const handleClickMasuk = (event) => {
    event?.preventDefault();
  }

  const handleClickBuat = (event) => {
    setShowModal(false);
    setShowModalBuat(true);
    event?.preventDefault();
  }

  return (
    <>
        <div className='side-left-sub'>

            <Sidebar
								className='sidebarClasses'
								backgroundColor='rgb(249,249,249,0.5)'
								collapsed={false} // menu pindah ke kanan
            >
                <Menu
                menuItemStyles={{
                    button: ({ level, active, disabled }) => {
                    if (level === 0)
                    {
                        return {
                            // color: disabled ? '#f5d9ff' : '#d359ff',
                            backgroundColor: active ? '#eecef9' : undefined,
                            fontWeight: 500,
                            paddingLeft:'25px',
                            ['&:hover']:{
                                backgroundColor:'rgb(197, 228, 255)',
                                color:'rgb(68, 89, 110)',
                                borderRadius:'0'
                            },
                            ['&.active']: { 
                                backgroundColor: '#13395e',
                                color: '#b6c8d9',
                            },
                            // ketika menu item level 0 lagi open
                            ['&.ps-open']:{
                                fontFamily:'Titillium_Web_Bold'
                            }
                            ,
                            fontFamily:'Titillium_Web_Regular',
                            fontSize:'14px'
                        }
                    }
                    else
                    {
                        return {
                        ['&']:{
                            backgroundColor:'rgba(249, 249, 249, 0.5)',  // background menu item
                            paddingLeft:'50px'
                        },
                        ['&:hover']:{
                            backgroundColor:'rgb(197, 228, 255)',
                            color:'rgb(68, 89, 110)',
                            borderRadius:'0'
                        },
                        [`&.active`]: {
                            backgroundColor: '#13395e',
                            color: '#b6c8d9',
                        }
                        }
                    }
                    },
                }}
                >

                <div className='logo-header'>
                    <div className='logo-title'>
                        W
                    </div>
                    <p className='logo-subtitle'>
                        eb Forum
                    </p>

                </div>

                <div className='signin-title' onClick={()=>{handleClickSignIn(true)}}>
                  {/* sign in */}
                    {user}
                </div>


                <div className='pre-title-submenu'>
                    <p>General</p>
                </div>

                    <SubMenu className='submenu-custom' label="Charts" defaultOpen={false} icon={svgCustom('searchengin', 'rgb(7, 110, 97)', 18)}>
                        <MenuItem>Pie Charts</MenuItem>
                        <MenuItem>Line Charts</MenuItem>
                    </SubMenu>
                    <MenuItem className='submenu-custom' icon={svgCustom('rectangle-list', 'rgb(7, 110, 97)', 18)}>Dashboard</MenuItem>
                    <SubMenu label="Transaksi" defaultOpen ={false} icon={svgCustom('file-lines', 'rgb(7, 110, 97)', 18)}>
                        <MenuItem>Sales</MenuItem>
                        <MenuItem>Purchase</MenuItem>
                    </SubMenu>

                    <SubMenu className='submenu-custom' label="Charts" defaultOpen={false} icon={svgCustom('searchengin', 'rgb(7, 110, 97)', 18)}>
                        <MenuItem>Pie Charts</MenuItem>
                        <MenuItem>Line Charts</MenuItem>
                    </SubMenu>
                    <MenuItem className='submenu-custom' icon={svgCustom('rectangle-list', 'rgb(7, 110, 97)', 18)}>Dashboard</MenuItem>

                </Menu>
            </Sidebar>
            <div className='side-bottom'>
                <div className='logo-img-bottom'>
                </div>
            </div>
        </div>

{/* MODAL MASUK */}
        <Modal show={showModal} centered={false} onHide={handleCloseModal}>
            <ModalHeader closeButton>
                <ModalTitle> 
                    <div className='modal-title'>Masuk </div>
                </ModalTitle>
            </ModalHeader>
            <ModalBody>
                
                <Form>
                    <FormGroup controlId='formbasicUsername'>
                        <FormLabel>Username / Email</FormLabel>
                        <FormControl type="text" name='name-user-masuk' maxLength={50} placeholder='Enter User'></FormControl>
                    </FormGroup>
                    <FormGroup controlId='formbasicPassword'>
                        <FormLabel>Password</FormLabel>
                        <FormControl type="password" name='name-password-masuk' maxLength={50} placeholder='Enter Password'></FormControl>
                    </FormGroup>
                    <div className='mt-4'>
                        <button className='btn btn-primary-custom btn-block' onClick={(event)=>handleClickMasuk(event)}>Masuk</button>
                    </div>

                    <div className='buatuser mt-4'>
                        <span className='garis'></span>
                        <span className='labeluser'>atau buat user baru</span>
                    </div>

                    <div className='mt-4'>
                        <button className='btn btn-info btn-block' onClick={(event)=>handleClickBuat(event)}>Buat User</button>
                    </div>
                </Form>

            </ModalBody>
            <ModalFooter>

            </ModalFooter>
        </Modal>


{/* MODAL BUAT USER */}

        <Modal show={showModalBuat} centered={false} backdrop='static' onHide={handleCloseModalBuat}>
            <ModalHeader closeButton>
                <ModalTitle> 
                    <div className='modal-title'>Buat User </div>
                </ModalTitle>
            </ModalHeader>
            <ModalBody>
                
                <Form>
                    <FormGroup controlId='formbasicUsername'>
                        <FormLabel>Username / Email</FormLabel>
                        <FormControl type="text" name='name-user-baru' maxLength={50} placeholder='Enter User'></FormControl>
                    </FormGroup>
                    <FormGroup controlId='formbasicPassword'>
                        <FormLabel>Password</FormLabel>
                        <FormControl type="password" name='name-password-baru' maxLength={50} placeholder='Enter Password'></FormControl>
                    </FormGroup>
                    <div className='mt-4'>
                        <button className='btn btn-primary-custom btn-block' onClick={(event)=>handleClickMasuk(event)}>Buat</button>
                    </div>

                </Form>

            </ModalBody>
            <ModalFooter>

            </ModalFooter>
        </Modal>
    </>
  )
}

export default SideMenu