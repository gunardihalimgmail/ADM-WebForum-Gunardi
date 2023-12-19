import React, { useEffect, useState } from 'react'
import './breadcrumb.scss'
import { store } from '../../../../reducers';

const BreadCrumb = (props:any) => {
    const [path, setPath] = useState([""]);
    const [active, setActive] = useState(-1);

    const loadToComponent = () => {
        // if (typeof props?.['path'] != 'undefined' && props?.['path'] != null){
        if (props?.['path']){
            // console.log(props?.['path'])
            setPath([...props?.['path']]);

            if (typeof props?.['lastActive'] != 'undefined' && props?.['lastActive'] != null &&
                    props?.['lastActive']){
                setActive(props?.['path'].length - 1)
            }
        }
        else{
            setPath(["Home"]);
        }
        
    }

    // props.path => ["Home","Transaksi","Penjualan"]
    // props.idxActive => 0 / 1 / 2
    // props.lastActive => true / false (index terakhir)

    useEffect(()=>{
        loadToComponent();

        // nilai index
        if (typeof props?.['idxActive'] != 'undefined' && props?.['idxActive'] != null){
            setActive(props?.['idxActive'])
        }
        
        // setPath(["Home","Transaksi","Penjualan"])

        return () => {
        }
    }, [props.path, props.lastActive, props.idxActive])



    return (
        <>
            <div className='breadcrumb'>
                {
                    path.length > 0 && (
                        path.map((val, index)=>{
                            return (
                                <a key = {val} onClick={()=>setActive(index)}
                                    className={`${index == active ? 'active':''}`}
                                >{val}</a>
                            )   
                        })
                    )
                }

                {
                    path.length > 0 && (
                        <a href = ""></a>
                    )
                }

            </div>
        </>
    )
}

export default BreadCrumb