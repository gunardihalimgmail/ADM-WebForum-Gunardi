import React, { useEffect, useRef, useState } from 'react'
import { Menu, MenuItem, Sidebar, SubMenu } from 'react-pro-sidebar'
import { svgCustom } from '../../../../utils/svgcustom'
import './sideMenu.scss'
import { Link } from 'react-router-dom'
import { FormControl, Form, FormGroup, FormLabel, Modal, ModalBody, ModalFooter, ModalTitle, Alert } from 'react-bootstrap'
import ModalHeader from 'react-bootstrap/esm/ModalHeader'
import _ from 'lodash'
import CryptoJS from 'crypto-js'
import { getValueLocalStorage, notify, removeKeyLocalStorage, secretKey, setToLocalStorage } from '../../../../utils/others'
import 'react-toastify/dist/ReactToastify.css';

const SideMenu = () => {
	
  const [user, setUser] = useState('');
  const [statusLogin, setStatusLogin] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showModalBuat, setShowModalBuat] = useState(false);
  const [inputForm, setInputForm] = useState({
						name_user_masuk: {value:'',required:true, alias:'Username'},
						name_password_masuk: {value:'',required:true, alias:'Password'}
	});

  const [inputFormBuat, setInputFormBuat] = useState({
						name_user_baru: {value:'',required:true, alias:'Username'},
						name_password_baru: {value:'',required:true, alias:'Password'}
	});

	let refInput:any = useRef(null);

	const [showAlert, setShowAlert] = useState(false);
	const [msgAlert, setMsgAlert] = useState('');
	const [statusDisabled, setStatusDisabled] = useState(false);

  const menuList:any = [
      {name: 'Charts', icon: 'profile_small.jpg'}
  ];

	let objInput:any = {}

  useEffect(()=>{


			let user:any = getValueLocalStorage('ADM-USER');
			if (user != null){
					setStatusLogin(true);
					setUser(user);
			}
			else {
					setStatusLogin(false);
					setUser('Masuk')
				}
      
  }, [])


	const resetInput = async() => {
			let objInput:any = {...inputForm};
			Object.keys(objInput).forEach((nameinput, idx)=>{
						objInput = {
								...objInput,
								[nameinput]: {
										...objInput?.[nameinput],
										value: ''
								}
						}
			});

			await setInputForm({...objInput})

			let objInputBuat:any = {...inputFormBuat};
			Object.keys(objInputBuat).forEach((nameinput, idx)=>{
						objInputBuat = {
								...objInputBuat,
								[nameinput]: {
										...objInputBuat?.[nameinput],
										value: ''
								}
						}
			});

			await setInputFormBuat({...objInputBuat})

	}

  const handleClickSignIn = (status, idelement) => {
      setShowModal(status);
			setShowAlert(false);
			setMsgAlert('');
			resetInput();
			
			setTimeout(()=>{
				refInput.current?.focus();
			})
  }

	const handleClickSignOut = () => {
			setMsgAlert('');
			setShowAlert(false);
			setUser('Masuk');
			setStatusLogin(false);
			removeKeyLocalStorage('ADM-USER')
	}	

  const handleCloseModal = () => {
			resetInput();
			setMsgAlert('');
			setShowAlert(false);
      setShowModal(false)
  }
  const handleCloseModalBuat = () => {
      setShowModalBuat(false)
  }

	const fetchData = async (param, method, path) => {
			if (param != null){

			}
			let response = await fetch('http://' + window.location.hostname + ':3001/' + path,{
					method,
					headers: {
						'Content-Type':'application/json'
					},
					body: JSON.stringify(param)
			}).catch(err=>err)

			let result = response.json();
			return result;
	}

  const handleClickMasuk = async(event) => {
    event?.preventDefault();

		let statusBreak:boolean = false;

		for(const nameinput of Object.keys(inputForm))
		{
				let input_req:any = inputForm?.[nameinput]?.['required'];
				let input_val:any = inputForm?.[nameinput]?.['value'];
				let input_alias:any = inputForm?.[nameinput]?.['alias'];
				if (typeof input_req != 'undefined' && input_req != null && input_req)
				{
						if (typeof input_val == 'undefined' || input_val == null || input_val == '')
						{
								console.log(input_alias)
								statusBreak = true;
								setShowAlert(true);
								setMsgAlert(input_alias + ' is Required !');
								break;
						}
				}
		}

		if (statusBreak){
				return
		}
		else{
				setShowAlert(false);
				setMsgAlert('');

				// contoh : {"name_user_masuk":"asd","name_password_masuk":"12312"}
				let input_val:any = _.mapValues(inputForm, 'value');

				let hasil:any = await fetchData(
						{'user_id': input_val?.['name_user_masuk'], 
							'password' : input_val?.['name_password_masuk']
						},
						'POST','user/login'
				)

				if (hasil?.['status'] == 'success' && hasil?.['result'] != null){
						setStatusLogin(true);
						setUser(hasil?.['result']?.['user_id']);
						setShowModal(false);
						resetInput();

						setToLocalStorage('ADM-USER', input_val?.['name_user_masuk'])
				}
				else {
						setMsgAlert(`Periksa kembali username dan password !`);
						setShowAlert(true);
						return
				}

				console.log(hasil)
		}
  }

  const handleClickSubmitBuat = async(event) => {
    event?.preventDefault();

		let statusBreak:boolean = false;
		console.log(inputFormBuat)
		for(const nameinput of Object.keys(inputFormBuat))
		{
				console.log(nameinput)
				let input_req:any = inputFormBuat?.[nameinput]?.['required'];
				let input_val:any = inputFormBuat?.[nameinput]?.['value'];
				let input_alias:any = inputFormBuat?.[nameinput]?.['alias'];
				if (typeof input_req != 'undefined' && input_req != null && input_req)
				{
						if (typeof input_val == 'undefined' || input_val == null || input_val == '')
						{
								// console.log(input_alias)
								statusBreak = true;
								setShowAlert(true);
								setMsgAlert(input_alias + ' is Required !');
								break;
						}
				}
		}

		if (statusBreak){
				return
		}
		else{
				setShowAlert(false);
				setMsgAlert('');
				setStatusDisabled(true);

				// contoh : {"name_user_masuk":"asd","name_password_masuk":"12312"}
				let input_val:any = _.mapValues(inputFormBuat, 'value');

				let hasil:any = await fetchData(
						{'user_id': input_val?.['name_user_baru'], 
							'password' : input_val?.['name_password_baru']
						},
						'POST','user/create'
				)

				if (hasil?.['status'] == 'success' && hasil?.['result'] == null && 
							hasil?.['message'] != '' && hasil?.['message'] != null){
						// user sudah ada
						setMsgAlert(`${hasil?.['message']}`);
						setShowAlert(true);	
						setStatusDisabled(false);
						return;
				}
				else 
				{
					// result != null => berhasil simpan
						setMsgAlert('');
						setShowAlert(false);	

						notify('success', `${hasil?.['result']}`);

						setTimeout(()=>{
							setShowModalBuat(false);
							setStatusDisabled(false);
							resetInput();
							return
						},1500)
							
				}

				console.log(hasil)
		}
  }

  // const handleClickbuat = async(event) => {
  //   event?.preventDefault();

	// 	let statusBreak:boolean = false;

	// 	for(const nameinput of Object.keys(inputForm))
	// 	{
	// 			let input_req:any = inputForm?.[nameinput]?.['required'];
	// 			let input_val:any = inputForm?.[nameinput]?.['value'];
	// 			let input_alias:any = inputForm?.[nameinput]?.['alias'];
	// 			if (typeof input_req != 'undefined' && input_req != null && input_req)
	// 			{
	// 					if (typeof input_val == 'undefined' || input_val == null || input_val == '')
	// 					{
	// 							console.log(input_alias)
	// 							statusBreak = true;
	// 							setShowAlert(true);
	// 							setMsgAlert(input_alias + ' is Required !');
	// 							break;
	// 					}
	// 			}
	// 	}

	// 	if (statusBreak){
	// 			return
	// 	}
	// 	else{
	// 			setShowAlert(false);
	// 			setMsgAlert('');

	// 			// contoh : {"name_user_masuk":"asd","name_password_masuk":"12312"}
	// 			let input_val:any = _.mapValues(inputForm, 'value');

	// 			let hasil:any = await fetchData(
	// 					{'user_id': input_val?.['name_user_masuk'], 
	// 						'password' : input_val?.['name_password_masuk']
	// 					},
	// 					'POST','user/login'
	// 			)

	// 			if (hasil?.['status'] == 'success' && hasil?.['result'] != null){
	// 					setStatusLogin(true);
	// 					setUser(hasil?.['result']?.['user_id']);
	// 					setShowModal(false);
	// 					resetInput();

	// 					setToLocalStorage('ADM-USER', input_val?.['name_user_masuk'])
	// 			}
	// 			else {
	// 					setMsgAlert(`Periksa kembali username dan password !`);
	// 					setShowAlert(true);
	// 					return
	// 			}

	// 			console.log(hasil)
	// 	}
  // }

  const handleClickBuat = (event) => {
    setShowModal(false);
    setShowModalBuat(true);
		setShowAlert(false);
		setMsgAlert('');
		resetInput()
    event?.preventDefault();
  }

	const handleChangeInput = async (event) => {
			
			let inputname = event.target.name;
			
			let objInput:any = {...inputForm};
			objInput = {
					...objInput,
					[inputname]: {
							...objInput?.[inputname],
							value: event.target.value,
							required: event.target.required
					}
			}

			await setInputForm({...objInput});

			console.log(inputForm)
	}

	const handleChangeInputBuat = async (event) => {
			
			let inputname = event.target.name;
			
			let objInputBuat:any = {...inputFormBuat};
			objInputBuat = {
					...objInputBuat,
					[inputname]: {
							...objInputBuat?.[inputname],
							value: event.target.value,
							required: event.target.required
					}
			}

			if (event.target.value != null && event.target.value != '')
			{
					setMsgAlert('');
					setShowAlert(false);
			}

			await setInputFormBuat({...objInputBuat});

			console.log(inputFormBuat)
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

                <div className='signin-title'>
                  {/* sign in */}
                    <span className='user' onClick={()=>{handleClickSignIn(true, 'modal-masuk')}}>{user}</span>
										
                </div>
								<div className='signin-title2'>
										{
											statusLogin &&
											(
												<span className='keluar' onClick={()=>{handleClickSignOut()}}>{'Keluar'}</span>
											)
										}
								</div>


                <div className='pre-title-submenu'>
                    <p>General</p>
                </div>

                    {menuList.length > 0 &&
                      (
                        menuList.map((obj, idx)=>{
                            return (
                                <MenuItem className='submenu-custom' key={obj.name + idx} >
                                  <img src = {process.env.PUBLIC_URL + '/img/' + obj.icon} width="25" height="25"/>
                                  <span>{obj.name}</span>
                                </MenuItem>
                            )
                        })
                      )
                    }

                    {/* <SubMenu className='submenu-custom' label="Charts" defaultOpen={false} icon={svgCustom('searchengin', 'rgb(7, 110, 97)', 18)}>
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
                    <MenuItem className='submenu-custom' icon={svgCustom('rectangle-list', 'rgb(7, 110, 97)', 18)}>Dashboard</MenuItem> */}

                </Menu>
            </Sidebar>
            <div className='side-bottom'>
                <div className='logo-img-bottom'>
                </div>
            </div>
        </div>

{/* MODAL MASUK */}
        <Modal show={showModal} centered={false} onHide={handleCloseModal} id = 'modal-masuk'>
            <ModalHeader closeButton>
                <ModalTitle> 
                    <div className='modal-title'> Masuk </div>
                </ModalTitle>
            </ModalHeader>
            <ModalBody>

								{ showAlert && 
									(
											<div className='warning-msg'> 
												<Alert show={showAlert} variant='danger' className='alert-form'>
														{msgAlert}
												</Alert>
											</div>
									)
								}

                <Form>
                    <FormGroup controlId='formbasicUsername'>
                        <FormLabel className='required'>Username / Email</FormLabel>
                        <FormControl type="text" onChange={(event)=>handleChangeInput(event)}  
															value = {inputForm?.['name_user_masuk']?.['value'] || ''}
															ref={refInput}
															name='name_user_masuk' maxLength={50} placeholder='Enter User' required></FormControl>
                    </FormGroup>

                    <FormGroup controlId='formbasicPassword'>
                        <FormLabel className='required'>Password</FormLabel>
                        <FormControl type="password" onChange={handleChangeInput} 
															value = {inputForm?.['name_password_masuk']?.['value'] || ''}
															name='name_password_masuk' maxLength={50} placeholder='Enter Password' required></FormControl>
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

        <Modal show={showModalBuat} centered={false} backdrop='static' onHide={handleCloseModalBuat} id = 'modal-buat'>
            <ModalHeader closeButton>
                <ModalTitle> 
                    <div className='modal-title'>Buat User </div>
                </ModalTitle>
            </ModalHeader>
            <ModalBody>

								{ showAlert && 
									(
											<div className='warning-msg'> 
												<Alert show={showAlert} variant='danger' className='alert-form'>
														{msgAlert}
												</Alert>
											</div>
									)
								}

                <Form>
                    <FormGroup controlId='formbasicUsername'>
                        <FormLabel className='required'>Username / Email</FormLabel>
                        <FormControl type="text" name='name_user_baru' maxLength={50} placeholder='Enter User'
																onChange={handleChangeInputBuat} 
																disabled={statusDisabled}
																value = {inputFormBuat?.['name_user_baru']?.['value'] || ''} required></FormControl>
                    </FormGroup>
                    <FormGroup controlId='formbasicPassword'>
                        <FormLabel className='required'>Password</FormLabel>
                        <FormControl type="password" name='name_password_baru' maxLength={50} placeholder='Enter Password' 
																	onChange={handleChangeInputBuat} 
																	disabled={statusDisabled}
																	value = {inputFormBuat?.['name_password_baru']?.['value'] || ''}
													required></FormControl>
                    </FormGroup>
                    <div className='mt-4'>
                        <button className='btn btn-primary-custom btn-block' onClick={(event)=>handleClickSubmitBuat(event)} disabled={statusDisabled}>Buat</button>
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