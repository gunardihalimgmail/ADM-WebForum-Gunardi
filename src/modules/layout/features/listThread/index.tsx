import React, { useEffect } from 'react'
import './listThread.scss'
import { useLocation, useParams } from 'react-router-dom'
import ReactPaginate from 'react-paginate'

const ListThread = () => {

    const { search } = useLocation();
    const params = new URLSearchParams(search);
    const id_kategori = params.get("id_kategori");
    const id_komunitas = params.get("id_komunitas");

    
    useEffect(()=>{
      sessionStorage.setItem('activePage', `/listhread?id_kategori=${id_kategori}&id_komunitas=${id_komunitas}`);
    },[])

    const handleButtonClick = () => {
        // Set the new value for your context
    };

    const sanitizeHtmlCustom = (phtml) => {
        return phtml;
    }

    const handlePageClick = (event) => {
      let page = event.selected
    }

    console.log(id_komunitas, id_kategori);

    return (
        <>
        {
          Array.from({length:10}).map((_,idx)=>{
            return (
                <div className='list-cont' key={idx}>
                    <div className={`d-flex justify-content-between subperiode`}>
                        <div className='d-flex align-items-center'>
                            <span>a</span>
                            <span className='ml-1'>•</span>
                            <span className='tanggal-judul'>18-09-2022 21:48</span>
                        </div>
                    </div>

                  {/* judul */}
                    <div className='list-title'>
                        <a> Warung Kopi Berita Politik </a>
                    </div>

                    <div className='list-content-topic'>
                        <a className='subtopic-cont'>
                            <p className='subtopic' dangerouslySetInnerHTML={{__html: sanitizeHtmlCustom(`<div class="htmlContentRenderer_html-content___EjM3"><b>Transmigrasi</b>&nbsp;menurut Kamus Besar Bahasa Indonesia (KBBI) artinya adalah <em>perpindahan dari satu daerah (pulau) yang berpenduduk padat ke daerah (pulau) lain yang berpenduduk jarang.&nbsp;</em><br>
        <br>
        Tidak jarang, pemerintah mencanangkan program transmigrasi demi menekan jumlah penduduk di perkotaan. Akan tetapi, di sebuah desa, sebut saja desa 158, dengan pak kades yang bernama bapak Gunarso, saat ini sedang tidak menerima para transmigran, karena diduga para transmigran yang baru akan pindah ke desa 158 tidak memiliki latar belakang yang kredibel yang bisa menjaga keutuhan dan keamanan desa 158.&nbsp;<br>
        <br>
        Warga desa 158 menolak dengan keras para transmigran yang baru akan masuk ke desa158 karena takut membawa hawa-hawa pencemaran udara desa 158, apalagi jika melihat ke arah langit maupun video-video yang saat ini viral tampak jelas bahwa langit desa agak kurang cerah karena pencemaran udara sehingga warga desa 158 tidak dapat melihat keindahan awan kinton di langit.<br>
        <br>
        Di samping itu, warga lama desa 158 pun mencium adanya warga desa yang gemar membuka aib desa ke desa tetangga, oleh karena itu warga lama desa 158 memilih untuk membuka lahan baru yang lebih privat demi mencegah terjadinya hal-hal yang tidak diinginkan, karena apapun juga aib itu tidak baik jika diumbar.</div>`)}}>

                            </p>

                            <span className='subtopic-efek-transp'></span>

                        </a>
                    </div>
                </div>
            )
          })
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
              pageCount={10}
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