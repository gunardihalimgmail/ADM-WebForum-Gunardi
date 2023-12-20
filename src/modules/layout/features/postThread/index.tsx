import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import './postThread.scss'

import React, { useEffect, useState } from 'react'
import { Badge, IconButton } from '@mui/material';
import sanitizeHtml from 'sanitize-html'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const PostThread = () => {

    const navigate = useNavigate();

    const dispatch = useDispatch();

		const [data, setData] = useState(null);
    const [activeMenu, setActiveMenu] = useState(0);
    const [activeMenuKom, setActiveMenuKom] = useState(0);

    // src = {process.env.PUBLIC_URL + '/img/' + obj.icon}
    const listKategori = [
        {id:0, name: 'Semua', icon:'Uiconstock-Classy-Media-Item-next.512.png'},
        {id:1, name: 'News', icon:'news.png'},
        {id:2, name: 'Hobby', icon:'hobby.png'},
        {id:3, name: 'Games', icon:'games.png'},
        {id:4, name: 'Entertaiment', icon:'entertaiment.png'},
        {id:5, name: 'Tech', icon:'tech.png'}
    ]

    const listKomunitas = [
        {id:1, name:'Berita dan Politik', icon: 'berita dan politik.png', id_kategori: 1, count:0},
        {id:2, name:'Berita Luar Negeri', icon: 'berita luar negeri.png', id_kategori: 1, count:0},
        {id:3, name:'Education', icon: 'education.png', id_kategori: 1, count:0},
        {id:4, name:'Manga', icon: 'manga.png', id_kategori: 2, count:0},
        {id:5, name:'Health', icon: 'health.png', id_kategori: 2, count:0},
        {id:6, name:'Lifestyle', icon: 'lifestyle.png', id_kategori: 2, count:0},
        {id:7, name:'Mobile Legends', icon: 'mobilelegend.png', id_kategori: 3, count:0},
        {id:8, name:'PC Games', icon: 'pcgames.png', id_kategori: 3, count:0},
        {id:9, name:'Mobile Games', icon: 'mobilegames.png', id_kategori: 3, count:0},
        {id:10, name:'Gosip', icon: 'gosip.png', id_kategori: 4, count:0},
        {id:11, name:'TV', icon: 'tv.png', id_kategori: 4, count:0},
        {id:12, name:'Movies', icon: 'movies.png', id_kategori: 4, count:0},
        {id:13, name:'Android', icon: 'android.png', id_kategori: 5, count:0},
        {id:14, name:'ISP', icon: 'isp.png', id_kategori: 5, count:0},
        {id:15, name:'Website', icon: 'website.png', id_kategori: 5, count:0}
    ]

    const [arrFilterKom, setArrFilterKom] = useState<any[]>([]);

		const fetchData = async () => {
			// const response = await fetch('http://localhost:3001/api/data');
			// const arr_data = await response.json();
			// setData(arr_data);
			// alert(JSON.stringify(arr_data));
		}

    const randomArrKom = () => {
      let arrRandomKom = listKomunitas.sort((a,b)=>Math.random() - 0.5);
      setArrFilterKom([...arrRandomKom]);
    }
		useEffect(() => {
				fetchData();

        sessionStorage.setItem('activePage', '/posthread');

        dispatch({type:'PARSE_TEXT', text:'Post Thread'})

        randomArrKom();
		}, [navigate, dispatch])

    const handleClickActive = (idx) => {
      setActiveMenu(idx);
      let listFilter = listKomunitas.filter((obj, idxKom)=>{
          if (obj?.['id_kategori'] == idx){
            return true;
          }
      });
      
      // semua kategori
      if (idx == 0){
        // arrFilterkom sudah di set ke dalam variabel randomArrKom
        randomArrKom();
      }
      else{
        setArrFilterKom([...listFilter])
      }

    }

    const handleClickActiveKomunitas = (idx, obj) => {
        setActiveMenuKom(idx);

        navigate(`/listhread?id_komunitas=${obj?.['id']}&id_kategori=${obj?.['id_kategori']}`);
    }

    // const sanitizeHtmlContent =  sanitizeHtml('<div style="color: red"><b>Transmigrasi</b>&nbsp;menurut Kamus Besar Bahasa Indonesia (KBBI) artinya adalah <em>perpindahan dari satu daerah (pulau) yang berpenduduk padat ke daerah (pulau) lain yang berpenduduk jarang.&nbsp;</em><br>' + 
    // '<br>' + 
    // 'Tidak jarang, pemerintah <span>mencanangkan</span> program transmigrasi demi menekan jumlah penduduk di perkotaan. Akan tetapi, di sebuah desa, sebut saja desa 158, dengan pak kades yang bernama bapak Gunarso, saat ini sedang tidak menerima para transmigran, karena diduga para transmigran yang baru akan pindah ke desa 158 tidak memiliki latar belakang yang kredibel yang bisa menjaga keutuhan dan keamanan desa 158.&nbsp;<br>' + 
    // '<br>' + 
    // 'Warga desa 158 menolak dengan keras para transmigran yang baru akan masuk ke desa158 karena takut membawa hawa-hawa pencemaran udara desa 158, apalagi jika melihat ke arah langit maupun video-video yang saat ini viral tampak jelas bahwa langit desa agak kurang cerah karena pencemaran udara sehingga warga desa 158 tidak dapat melihat keindahan awan kinton di langit.<br>' + 
    // '<br>' + 
    // 'Di samping itu, warga lama desa 158 pun mencium adanya warga desa yang gemar membuka aib desa ke desa tetangga, oleh karena itu warga lama desa 158 memilih untuk membuka lahan baru yang lebih privat demi mencegah terjadinya hal-hal yang tidak diinginkan, karena apapun juga aib itu tidak baik jika diumbar.</div>'
    // ,
    //   {
    //     allowedTags: sanitizeHtml.defaults.allowedTags.concat(['span']),
    //     allowAttributes: {
    //       ...sanitizeHtml.defaults.allowedAttributes,
    //       div: ['style']
    //     }
    //   }
    // );

    // const sanitizeHtmlContent = `<div class="testing"><b>Transmigrasi</b>&nbsp;menurut Kamus Besar Bahasa Indonesia (KBBI) artinya adalah <em>perpindahan dari satu daerah (pulau) yang berpenduduk padat ke daerah (pulau) lain yang berpenduduk jarang.&nbsp;</em><br>
    // <br>
    // Tidak jarang, pemerintah mencanangkan <span class = "testing2">program</span> transmigrasi demi menekan jumlah penduduk di perkotaan. Akan tetapi, di sebuah desa, sebut saja desa 158, dengan pak kades yang bernama bapak Gunarso, saat ini sedang tidak menerima para transmigran, karena diduga para transmigran yang baru akan pindah ke desa 158 tidak memiliki latar belakang yang kredibel yang bisa menjaga keutuhan dan keamanan desa 158.&nbsp;<br>
    // <br>
    // Warga desa 158 menolak dengan keras para transmigran yang baru akan masuk ke desa158 karena takut membawa hawa-hawa pencemaran udara desa 158, apalagi jika melihat ke arah langit maupun video-video yang saat ini viral tampak jelas bahwa langit desa agak kurang cerah karena pencemaran udara sehingga warga desa 158 tidak dapat melihat keindahan awan kinton di langit.<br>
    // <br>
    // Di samping itu, warga lama desa 158 pun mencium adanya warga desa yang gemar membuka aib desa ke desa tetangga, oleh karena itu warga lama desa 158 memilih untuk membuka lahan baru yang lebih privat demi mencegah terjadinya hal-hal yang tidak diinginkan, karena apapun juga aib itu tidak baik jika diumbar.</div>`;
    
    // const sanitizeHtmlContent = `<span data-attr="face" data-value="v_Verdana" style="font-family:Verdana !important;">Sebagai sarana pengaduan atas thread/postingan bermasalah di <a target="_blank" href="http://www.kaskus.co.id/forum/10/berita-dan-politik" rel="ugc" onclick="dataLayer.push({'event': 'trackEvent','eventDetails.category': 'outbond', 'eventDetails.action': 'click', 'eventDetails.label': 'http://www.kaskus.co.id/forum/10/berita-dan-politik'});">Forum Berita Politik</a>, <br>
    //                           Yaitu melaporkan dan mengadukan Threads atau Posts yang melanggar UU BP Raya, maka dibuatlah thread ini.<br>
    //                           <br>
    //                           Adapun format pengaduan adalah sebagai berikut<br>
    //                           <br>
    //                           <div class="sceditor-ignore quote-mark 3035827264">Quote:</div><div class="quote expandable" data-by="" data-postid="">tret/postingan bermasalah :<br>
    //                           alasan :</div><br>
    //                           <br>
    //                           dan sebagai tempat Saran, Kritikan terhadap seluruh aturan yg berlaku di BerPol<br>
    //                           <b><br>
    //                           <span data-attr="size" data-value="v_4" style="font-size:18px !important;">untuk mempermudah mods mengakses TKP dan tidak perlu membuka keseluruhan halaman TKP, CUKUP tulis linknya saja disini, gak perlu multiquoting dan tampilin barbuk disini.</span></b><br>
    //                           <br>
    //                           <div style="text-align: center;">=================<br>
    //                           </div><br>
    //                           <br>
    //                           <span data-attr="size" data-value="v_5" style="font-size:20px !important;"><span data-attr="color" data-value="v_red" style="color:red !important;"><br>
    //                           <b><div style="text-align: center;">Rules Thread Pelaporan</div><br>
    //                           - Dilarang OOT<br>
    //                           - Dilarang chit-chat <br>
    //                           - Dilarang berdebat <br>
    //                           - Dilarang insult member<br>
    //                           - Dilarang menggangu kinerja moderator<br>
    //                           - Dilarang Lapor pakai kloningan / Laporan tidak valid <br>
    //                           <br>
    //                           Hukuman? <br>
    //                           BANNED PERMANEN!</b></span></span></span>`;
    

    return (
      <>
        {/* <div dangerouslySetInnerHTML={{ __html: sanitizeHtmlContent }} className="d-block" /> */}

        <div className='post-container'>

            <div className='post-subcon'>
                <List sx={{ width: '100%',bgcolor: 'background.paper' }}>
                      <span className='kategori'> Kategori</span>
                    {
                      listKategori.map((value, idx)=>{
                          const labelId = `checkbox-list-label-${value}`;

                          return (
                            <ListItem className={`list-item kategori ${activeMenu == idx ? 'active' : ''}`}
                                key={`${value} + ${idx}`}
                                alignItems='flex-start'
                                // sx={{
                                //   '&:not(.active):hover':{
                                //       backgroundColor:'#f0f0f0',
                                //       cursor:'pointer'
                                //   }
                                // }}
                                onClick={()=>{handleClickActive(idx)}}
                            >
                              <ListItemAvatar>
                                  {/* <Avatar alt="Remy Sharp" src={`/img/${value.icon}`} /> */}
                                  <img src = {`img/${value.icon}`} width="25" height="25" />
                                  <span className='menu-icon'>{value.name}</span>
                              </ListItemAvatar>
                            </ListItem>
                          )
                      })
                    }
                </List>
            </div>

            <div className='post-subcon ml-3 w-100'>
              
                <List sx={{ width: '100%',bgcolor: 'background.paper' }}>
                    <span className='komunitas'> Komunitas</span>
                    {
                      arrFilterKom.map((value, idx)=>{
                          const labelId = `checkbox-list-label-${value}`;

                          return (
                            <ListItem className={`list-item komunitas ${activeMenuKom == idx ? 'active' : ''}`}
                                key={`${value} + ${idx}`}
                                alignItems='flex-start'
                                // sx={{
                                //   '&:not(.active):hover':{
                                //       backgroundColor:'#f0f0f0',
                                //       cursor:'pointer'
                                //   }
                                // }}
                                onClick={()=>{handleClickActiveKomunitas(idx, value)}}
                            >
                              <ListItemAvatar className='w-100 list-kom'>
                                  <span className='menu-icon-rownum'>{idx + 1}</span>
                                  {/* <Avatar alt="Remy Sharp" src={`/img/${value.icon}`} /> */}
                                  <img className='menu-pic' src = {`img/${value.icon}`} width="25" height="25" />
                                  <span className='menu-icon'>{value.name}</span>

                                  {
                                    value?.['count'] > 0 && (
                                      <Badge className='badge-kom' badgeContent={value?.['count']} max={999} color="secondary"></Badge>
                                    )
                                  }
                              </ListItemAvatar> 

                            </ListItem>
                          )
                      })
                    }
                </List>
            </div>
        </div>
      </>
    )
}

export default PostThread