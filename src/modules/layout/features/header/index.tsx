import React, { useState, useEffect } from 'react'
import './header.scss'
import HamburgerMenu from '../hamburgerMenu'
import BreadCrumb from '../breadcrumb'
import { store } from '../../../../reducers'

const HeaderMain = (props:any) => {

    const [paths, setPath] = useState<any[]>([]);

    
    useEffect(()=>{

        const unsubscribe = store.subscribe(()=>{
            let getText:any = store.getState()?.['funcRed']?.['parseText']?.['text'];
            if (typeof getText !== undefined)
            {
                setPath([getText])
            }
        });

        let initialText:any = store.getState()?.['funcRed']?.['parseText']?.['text'];
        if (typeof initialText != 'undefined'){
            if ((Array.isArray(initialText) && initialText.length == 0) || initialText == ''){
                setPath(['Home'])
            }
        }
        
        return ()=>{
            unsubscribe()
        }  
    },[])


    return (
        <>
            <nav className='header-nav'>
                <div className='blok-nav'>
                    <div className='label-menu'>

                        {/* <HamburgerMenu /> */}

                        <div className='text title'>Komunitas Populer</div>
                    </div>
                </div>
            </nav>

            <div className='header-subnav'>
                <BreadCrumb 
                    // path = {["Home", "Transaksi", "Penjualan"]}
                    path = {paths}
                    lastActive = {true}
                    // idxActive = {2}
                />
            </div>
        </>
    )
}

export default HeaderMain