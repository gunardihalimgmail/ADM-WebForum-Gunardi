import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router'
import { notify, secretKey } from '../../../../utils/others';
import { Alert, Form, FormControl, FormGroup, FormLabel } from 'react-bootstrap';
import _ from 'lodash';
import './buatThread.scss'
import { IconButton, TextareaAutosize } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import CryptoJS from 'crypto-js';

const BuatThread = () => {

    const navigate = useNavigate();

		const dispatch = useDispatch();

		const [showAlert, setShowAlert] = useState(false);
		const [msgAlert, setMsgAlert] = useState('');
		const [statusDisabled, setStatusDisabled] = useState(false);
		const [textareaValue, setTextareaValue] = useState('');


		const { search } = useLocation();
		const params = new URLSearchParams(search);
		let id_kategori:any = params.get("id_kategori");
		let id_komunitas:any = params.get("id_komunitas");
		const [idUser, setIdUser] = useState<any>();

		const [inputFormBuat, setInputFormBuat] = useState({
					name_judul: {value:'',required:true, alias:'Judul'},
					name_content: {value:'',required:true, alias:'Content'}
		});

		
		useEffect(()=>{

				let newActivePage = `/buathread?id_kategori=${id_kategori}&id_komunitas=${id_komunitas}`;

				dispatch({type:'PARSE_TEXT', text:'Buat Thread'})
				
				sessionStorage.setItem('activePage', newActivePage);
				window.history.replaceState(null,'', newActivePage)

				try {
					let local_user:any = localStorage.getItem('ADM-USER');
					let admuser_dec:any = CryptoJS.AES.decrypt(local_user, secretKey).toString(CryptoJS.enc.Utf8);
					
					setIdUser(admuser_dec)

				}catch(error){
					console.log(error)
					setIdUser(null);
				}
			
		},[navigate, dispatch])
		
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

	
	const resetInput = async() => {

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

	
	const fetchData = async (param, method, path) => {
			if (param != null){
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
			return
	}

	
  const handleClickSubmitBuat = async(event) => {

    event?.preventDefault();

		let input_judul = inputFormBuat?.['name_judul'];
		let input_content = inputFormBuat?.['name_content'];

		let statusBreak:boolean = false;

		console.log(inputFormBuat)
		for(const nameinput of Object.keys(inputFormBuat))
		{
				let input_req:any = inputFormBuat?.[nameinput]?.['required'];
				let input_val:any = inputFormBuat?.[nameinput]?.['value'];
				let input_alias:any = inputFormBuat?.[nameinput]?.['alias'];
				if (typeof input_req != 'undefined' && input_req != null && input_req)
				{
						if (typeof input_val == 'undefined' || input_val == null || input_val.trim() == '')
						{
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

				let input_val:any = _.mapValues(inputFormBuat, 'value');

				// console.log("id_user : " + idUser);
				// console.log("id_kategori : " + id_kategori);
				// console.log("id_komunitas : " + id_komunitas);

				let hasil:any = await fetchData(
						{
							'user_id': parseInt(idUser),
							'id_kategori': parseInt(id_kategori),
							'id_komunitas': parseInt(id_komunitas),
							'judul': input_val?.['name_judul'], 
							'content' : input_val?.['name_content']
						},
						'POST','thread/create'
				)

				// console.log(hasil)

				if (hasil?.['status'] == 'success' && hasil?.['result'] == null && 
							hasil?.['message'] != '' && hasil?.['message'] != null){

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
							setStatusDisabled(false);
							resetInput();
							return
						},1500)
							
				}

				// console.log(hasil)
		}
  }

	const handleClickBack = () => {
			navigate(
				{
					pathname:`/listhread`,
					search:`?id_kategori=${id_kategori}&id_komunitas=${id_komunitas}`
				}
			)
	}

	const handleTextAreaChange = async(event) => {

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
				<div>
						<IconButton onClick={handleClickBack}>
								<ArrowBack />	
						</IconButton>
				</div>
				<div className='bt-cont'> 
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
								<FormGroup controlId='formbasicJudul'>
										<FormLabel className='required'>Judul</FormLabel>
										<FormControl type="text" name='name_judul' maxLength={100} placeholder='Enter Judul'
														onChange={handleChangeInputBuat} 
														disabled={statusDisabled}
														value = {inputFormBuat?.['name_judul']?.['value'] || ''} required></FormControl>
								</FormGroup>
								{/* <FormGroup controlId='formbasicPassword'> */}
										{/* <FormLabel className='required'>Content</FormLabel> */}
										
										<div className='form-group'>
												<label htmlFor = "formcontrol-textarea" className='form-label required'> Content </label>
												<textarea 
														className='form-control'
														id = "formcontrol-textarea"
														rows={10}
														name='name_content'
														placeholder='Enter Content ...'
														value = {inputFormBuat?.['name_content']?.['value'] || ''}
														onChange={handleTextAreaChange}
														disabled={statusDisabled}
														required
												/>
										</div>
										{/* <div className='buat-textarea-content'>
												<TextareaAutosize 
														minRows={4} 
														placeholder='Enter Content ...'
														value = {inputFormBuat?.['name_content']?.['value'] || ''}
														onChange={handleTextAreaChange}
														disabled={statusDisabled}
														required
												/>
										</div> */}
										
								{/* </FormGroup> */}
								<div className='mt-4'>
										<button className='btn btn-primary-custom btn-block' onClick={(event)=>handleClickSubmitBuat(event)} disabled={statusDisabled}>Buat</button>
								</div>

						</Form>
				</div>

			</>
		)
}

export default BuatThread