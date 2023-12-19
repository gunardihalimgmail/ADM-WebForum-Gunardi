import React, { useEffect } from 'react'
import './listThread.scss'
import { useLocation, useParams } from 'react-router-dom'

const ListThread = () => {

    useEffect(()=>{
        sessionStorage.setItem('activePage', '/listThread');
    })

    const handleButtonClick = () => {
        // Set the new value for your context
    };

    const { search } = useLocation();
    const params = new URLSearchParams(search);
    const id_kategori = params.get("id_kategori");
    const id_komunitas = params.get("id_komunitas");

    console.log(id_komunitas, id_kategori);

    return (
        <div>ListThread</div>
    )
}

export default ListThread