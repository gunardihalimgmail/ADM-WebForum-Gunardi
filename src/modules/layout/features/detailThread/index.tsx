import React, {  useEffect, useState } from 'react'
import './detailThread.scss'
import { useLocation, useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { fetchDataGlobal, formatDate, notify, secretKey } from '../../../../utils/others';
import { IconButton, useStepContext } from '@mui/material';
import { ArrowBack, Reply, ReplyAll, ReplyOutlined, ReplyTwoTone } from '@mui/icons-material';
import CryptoJS from 'crypto-js';

const DetailThread = () => {
	
		const dispatch = useDispatch();

		const [showAlert, setShowAlert] = useState(false);
		const [msgAlert, setMsgAlert] = useState('');

		// const { search } = useLocation();
		const { search } = useLocation();
		const params = new URLSearchParams(search);
		const id_kategori = params.get("id_kategori");
		const id_komunitas = params.get("id_komunitas");
		const id = params.get("id");

		const [arrThreadRow, setArrThreadRow] = useState<any[]>([]);
		const [arrThreadRowSingle, setArrThreadRowSingle] = useState<any>({});
    const [arrThreadCount, setArrThreadCount] = useState(0);

		const [inputFormReply, setInputFormReply] = useState('');
		const [statusDisabled, setStatusDisabled] = useState(false);


		const [objShowReply, setObjShowReply] = useState<any>({});
		
		const navigate = useNavigate();

		const hasilFetch = async(limit, offset) => {
				let objReply:any = {};
		
				let hasil = await fetchDataGlobal({id_kategori, id_komunitas, limit, offset, id}, 'POST', 'list/thread');
				if (hasil){
					setArrThreadRow(hasil?.['result']?.['row']);
					if (hasil?.['result']?.['row'].length > 0){
						setArrThreadRowSingle(hasil?.['result']?.['row']?.[0]);

						objReply['id'] = {
								...objReply?.['id'],
								showReply: false
						}

						setObjShowReply({...objReply});

					}

					let totalpage = Math.ceil(parseFloat(hasil?.['result']?.['count']) / 5);
					setArrThreadCount(totalpage);

				}
				else{
					setArrThreadRow([]);
					setArrThreadCount(0);
					setArrThreadRowSingle({});
				}
		}

    useEffect(()=> {
				let newActivePage = `/detailthread?id_kategori=${id_kategori}&id_komunitas=${id_komunitas}&id=${id}`
        sessionStorage.setItem('activePage', newActivePage);
				dispatch({type:'PARSE_TEXT', text:'Detail Thread'})
				window.history.replaceState(null,'', newActivePage)

				// hasilkan single data
				hasilFetch(5,0);


				return () => {
				}
    }, [id_kategori, id_komunitas, id, dispatch])


		const handleClickBack = () => {
				navigate(
					{
						pathname:`/listhread`,
						search:`?id_kategori=${id_kategori}&id_komunitas=${id_komunitas}`
					}
				)
		}

		const handleClickReply = (id) => {
				let objReplyTemp:any = {...objShowReply};
				objReplyTemp = {
						...objReplyTemp,
						[id]: true
				};

				setObjShowReply({...objReplyTemp});
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

		const handleClickSubmitReply = async(id) => {
				
				if (!inputFormReply){
						notify('error', 'Reply Content harus dimasukkan !');
						return
				} 
				else 
				{
						let trimReply:any = inputFormReply.trim();
						if (!trimReply){
							notify('error', 'Reply Content harus dimasukkan !');
							return
						}
				}

				let admuser_dec:any;
				try {
					let local_user:any = localStorage.getItem('ADM-USER');
					admuser_dec = CryptoJS.AES.decrypt(local_user, secretKey).toString(CryptoJS.enc.Utf8);
				}catch(error){
					console.log(error)
					admuser_dec = null
				}

				setStatusDisabled(true);

				// console.log(formatDate(new Date(),'YYYY-MM-DD HH:mm:ss').toString())
				// console.log(id_kategori)
				// console.log(id_komunitas)
				// console.log(id)
				// console.log(inputFormReply)

				let hasil:any = await fetchData(
						{
							'user_id': parseInt(admuser_dec),
							'tanggal': formatDate(new Date(),'YYYY-MM-DD HH:mm:ss').toString(),
							'content' : inputFormReply,
							'id_thread_parent': id
						},
						'POST','thread/reply'
				)

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
							setInputFormReply('');
							return
						},1500)
							
				}
		}

		const handleClickBatalReply = (id) => {

				let objReplyTemp:any = {...objShowReply};
				objReplyTemp = {
						...objReplyTemp,
						[id]: false
				};

				setObjShowReply({...objReplyTemp});
		}

		const handleTextAreaChange = (event) => {
				setInputFormReply(event.target.value)
		}

  return (
			<>	
					<IconButton onClick={handleClickBack}>
							<ArrowBack />	
					</IconButton>
					
					<div className='detail-list-cont'>
						<div className={`d-flex justify-content-between detail-subperiode`}>
								<div className='d-flex align-items-center'>
										<span>{arrThreadRowSingle?.['user_id']}</span>
										<span className='ml-1'>•</span>
										<span className='detail-tanggal-judul'>{formatDate(new Date(arrThreadRowSingle?.['tanggal']),'DD MMMM YYYY HH:mm:ss')}</span>
								</div>
						</div>

						{/* judul */}
						<div className='detail-list-title'>
								<span> {arrThreadRowSingle?.['judul']} </span>
						</div>

						<div className='detail-list-content-topic'>
									<a className='detail-subtopic-cont'>

									<p className='detail-subtopic' dangerouslySetInnerHTML={{__html: `${arrThreadRowSingle?.['content']}`}}>
									</p>

									{/* <span className='detail-subtopic-efek-transp'></span> */}

								</a>
						</div>

						<div className='d-flex justify-content-end'>
							<IconButton onClick={()=>{handleClickReply(arrThreadRowSingle?.['id'])}}>
									<Reply sx={{color:'darkcyan'}}/>
							</IconButton>
						</div>
					</div>

					{ 
							objShowReply?.[arrThreadRowSingle?.['id']] && 
							(
									<div className='form-group ml-5'>
											<label htmlFor = "formcontrol-textarea" className='form-label required'> Reply Content </label>
											<textarea 
													className='form-control'
													id = "formcontrol-textarea"
													rows={3}
													name='name_content'
													placeholder='Enter Content ...'
													value = {inputFormReply || ''}
													onChange={handleTextAreaChange}
													disabled={statusDisabled}
													required
											/>

											<div className='d-flex justify-content-start'>
												<button className='btn btn-success text-success btn-custom-buat-threa btn-submit-reply' onClick={()=>{handleClickSubmitReply(arrThreadRowSingle?.['id'])}} disabled={statusDisabled}>Submit</button>
												<button className='ml-1 btn btn-dark text-success btn-custom-buat-threa btn-submit-reply' onClick={()=>{handleClickBatalReply(arrThreadRowSingle?.['id'])}} disabled={statusDisabled}>Batal</button>
											</div>
									</div>
							)
					}
			</>
  )
}

export default DetailThread