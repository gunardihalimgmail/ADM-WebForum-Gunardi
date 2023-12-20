import React, { useEffect, useState } from 'react'
import './listThread.scss'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import ReactPaginate from 'react-paginate'
import { fetchDataGlobal, formatDate, notify, secretKey } from '../../../../utils/others'
import { useDispatch } from 'react-redux'
import { IconButton } from '@mui/material'
import { ArrowBack } from '@mui/icons-material'
import CryptoJS from 'crypto-js'

const ListThread = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { search } = useLocation();
    const params = new URLSearchParams(search);
    const id_kategori = params.get("id_kategori");
    const id_komunitas = params.get("id_komunitas");

    const [arrThreadRow, setArrThreadRow] = useState<any[]>([]);
    const [arrThreadCount, setArrThreadCount] = useState(0);

    const hasilFetch = async(limit, offset) => {
        let hasil = await fetchDataGlobal({id_kategori:null, id_komunitas:null, limit, offset}, 'POST', 'list/thread');
        if (hasil){
          setArrThreadRow(hasil?.['result']?.['row']);

          let totalpage = Math.ceil(parseFloat(hasil?.['result']?.['count']) / 5);
          setArrThreadCount(totalpage);

        }
        else{
          setArrThreadRow([]);
          setArrThreadCount(0);
        }
    }
    
    useEffect(()=>{
      let newActivePage = `/listhread?id_kategori=${id_kategori}&id_komunitas=${id_komunitas}`;

      sessionStorage.setItem('activePage', newActivePage);
      hasilFetch(5, 0);

      dispatch({type:'PARSE_TEXT', text:'List Thread'})
      dispatch({type:'OTHER_TEXT', text:''})

      window.history.replaceState(null,'', newActivePage)

      return () => {
      }

    },[id_kategori, id_komunitas, navigate, dispatch])



    const handleButtonClick = () => {
        // Set the new value for your context
    };

    const sanitizeHtmlCustom = (phtml) => {
        return phtml;
    }

    const handlePageClick = (event) => {
      let page = event.selected
      hasilFetch(5, (page * 5));
    }

    const handleClickTitle = (kategori, komunitas, id) => {
        navigate({
          pathname:'/detailthread',
          search:`?id_kategori=${kategori}&id_komunitas=${komunitas}&id=${id}`
        })
    }

    const handleClickBack = () => {
      navigate(
        {
          pathname:`/posthread`
        }
      )
    }

    const handleClickBuatThread = () => {
      let admuser:any = null;
      try{
          let localadmuser:any = localStorage.getItem('ADM-USER');
          admuser = CryptoJS.AES.decrypt(localadmuser, secretKey);
      }catch(error){
          admuser = null
      }

      if (admuser == null)
      {
          notify('error', 'Silahkan Login terlebih dahulu sebelum buat thread baru !');
          dispatch({type:'OTHER_TEXT', text:'signin'});
          return;
      } else {
          dispatch({type:'OTHER_TEXT', text:''});
          navigate(
            {
              pathname:`/buathread`,
              search:`?id_kategori=${id_kategori}&id_komunitas=${id_komunitas}`
            }
          )
      }
        
    }

    console.log(id_komunitas, id_kategori);

    return (
        <>
          <div className='list-header-button'>
              <div>
                  <IconButton onClick={handleClickBack}>
                      <ArrowBack />	
                  </IconButton>
              </div>
              <div className='list-button-buat'>
                  <button className='btn btn-success btn-outline text-success btn-custom-buat-thread' onClick={handleClickBuatThread}>Buat Thread</button>
              </div>

          </div>
        {
          // Array.from({length:10}).map((_,idx)=>{
            arrThreadRow.map((obj, idx)=>{
              return (
                  <div className='list-cont' key={obj?.['id'] + idx}>
                      <div className={`d-flex justify-content-between subperiode`}>
                          <div className='d-flex align-items-center'>
                              <span>{obj?.['user_id']}</span>
                              <span className='ml-1'>•</span>
                              <span className='tanggal-judul'>{formatDate(new Date(obj?.['tanggal']),'DD MMMM YYYY HH:mm:ss')}</span>
                          </div>
                      </div>
  
                    {/* judul */}
                      <div className='list-title'>
                          <a onClick={()=>{handleClickTitle(obj?.['id_kategori'], obj?.['id_komunitas'], obj?.['id'])}}> {obj?.['judul']} </a>
                      </div>
  
                      <div className='list-content-topic'>
                            <a className='subtopic-cont'>

                            <p className='subtopic' dangerouslySetInnerHTML={{__html: sanitizeHtmlCustom(`${obj?.['content']}`)}}>
                            </p>
                              {/* <p className='subtopic' dangerouslySetInnerHTML={{__html: sanitizeHtmlCustom(`<div class="htmlContentRenderer_html-content___EjM3"><b>Transmigrasi</b>&nbsp;menurut Kamus Besar Bahasa Indonesia (KBBI) artinya adalah <em>perpindahan dari satu daerah (pulau) yang berpenduduk padat ke daerah (pulau) lain yang berpenduduk jarang.&nbsp;</em><br>
          <br>
          Tidak jarang, pemerintah mencanangkan program transmigrasi demi menekan jumlah penduduk di perkotaan. Akan tetapi, di sebuah desa, sebut saja desa 158, dengan pak kades yang bernama bapak Gunarso, saat ini sedang tidak menerima para transmigran, karena diduga para transmigran yang baru akan pindah ke desa 158 tidak memiliki latar belakang yang kredibel yang bisa menjaga keutuhan dan keamanan desa 158.&nbsp;<br>
          <br>
          Warga desa 158 menolak dengan keras para transmigran yang baru akan masuk ke desa158 karena takut membawa hawa-hawa pencemaran udara desa 158, apalagi jika melihat ke arah langit maupun video-video yang saat ini viral tampak jelas bahwa langit desa agak kurang cerah karena pencemaran udara sehingga warga desa 158 tidak dapat melihat keindahan awan kinton di langit.<br>
          <br>
          Di samping itu, warga lama desa 158 pun mencium adanya warga desa yang gemar membuka aib desa ke desa tetangga, oleh karena itu warga lama desa 158 memilih untuk membuka lahan baru yang lebih privat demi mencegah terjadinya hal-hal yang tidak diinginkan, karena apapun juga aib itu tidak baik jika diumbar.</div>`)}}>
  
                              </p> */}
  
                              {/* <span>ads</span> */}
  
                          </a>
                      </div>
                      <span className='subtopic-efek-transp'></span>
                  </div>
              )

            })
          // })
        }
        
        <div className='page-footer'>
            <ReactPaginate
              breakLabel="..."

              breakClassName={'page-item'}
              breakLinkClassName={'page-link'}
              containerClassName={'pagination'}
              pageClassName={'page-item'}
              pageLinkClassName={'page-link'}
              previousClassName={'page-item'}
              previousLinkClassName={'page-link'}
              nextClassName={'page-item'}
              nextLinkClassName={'page-link'}
              activeClassName={'active'}

              nextLabel="Next >"
              pageCount={arrThreadCount}
              previousLabel="< Previous"
              onPageChange={handlePageClick}
              pageRangeDisplayed={5}
              renderOnZeroPageCount={null}
              
            ></ReactPaginate>
        </div>

        </>
    )
}

export default ListThread