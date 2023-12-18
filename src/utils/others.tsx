import CryptoJS from 'crypto-js'
import { toast } from 'react-toastify'

export const secretKey = 'webforum123';

export const removeKeyLocalStorage = (key) => {

    if (localStorage.getItem(key)) 
    {
        localStorage.removeItem(key);
    }

}

export const getValueLocalStorage = (key) => {
    
    let result:any = null;
    let val:any = localStorage.getItem(key);

    if (val != null) 
    {
        result = CryptoJS.AES.decrypt(val, secretKey).toString(CryptoJS.enc.Utf8)
    }

    return result;

}

export const setToLocalStorage = (key, value) => {
    
    if (localStorage.getItem(key) != null) 
    {
        localStorage.removeItem(key);
    }

    if (value != null)
    {
        let enkrip:any = CryptoJS.AES.encrypt(value.toString(), secretKey);
        localStorage.setItem(key, enkrip);
    }
    else {
        throw new Error('Periksa kembali parameter nya');
    }
}

export const removeFromLocalStorage = (key) => {
    if (localStorage.getItem(key) != null) 
    {
        localStorage.removeItem(key);
    }
}

export const loadjs = (jsname: string) => {

    // const timer = setTimeout(() => {
        const script = document.createElement("script");

        let jsname_final: string = jsname
        if (jsname.lastIndexOf('.js') == -1){
            jsname_final = jsname + '.js'
        }
        script.src = "js/" + jsname_final;
        script.async = true;
        document.body.appendChild(script);
    // }, 300);
    // return () => {
    //     // window.removeEventListener("keypress", handleKeyPress);
    //     clearTimeout(timer);
    // }
}

export const formatDate = (tanggal:any, format:'yyyy/mm/dd') => {
    let tanggal_str:any;
    if (!isNaN(tanggal)){
        switch (format){
            case 'yyyy/mm/dd': 
                    tanggal_str = tanggal.getFullYear() + "/" 
                                    + ("0" + (tanggal.getMonth() + 1)).slice(-2) + "/"
                                    + ("0" + tanggal.getDate()).slice(-2)
                    break;
        }
        return tanggal_str;
    }
    return null
}

export const removeCustomjs = (jsname:string) => {
    let jsname_final: string = jsname
    if (jsname.lastIndexOf('.js') == -1){
        jsname_final = jsname + '.js'
    }

    var scriptElement = document.body.getElementsByTagName("script") 
    for (var i = scriptElement.length - 1; i >= 0; i--){
        var indexCustom = scriptElement[i].src.lastIndexOf("/" + jsname_final)
        if (indexCustom != -1){
            scriptElement[i].parentNode?.removeChild(scriptElement[i])
        }
    }
}

export const funcShowCheckedOrAll = (statusChecked:string) => {

    setTimeout(()=>{
        let rows = document.querySelectorAll<HTMLTableRowElement>("table.filterclass tr")
        rows.forEach(row=>{
            if (statusChecked == 'checked'){
                if (!row.classList.contains("showChecked")){
                    row.style.display = 'none'
                }
            }
            else if (statusChecked == 'all'){
                row.style.display = 'table-row'
            }
        })
    })

}

export const notify = (type:'info'|'error'|'success'|'warning', msg?:any) => {
    // React-toastify
    
    const obj_toastify:any = {
      position: toast.POSITION.TOP_CENTER,
      theme:"colored",
      autoClose: 1000,
      hideProgressBar: false,
      newestOnTop:true,
      rtl:false,
      // closeOnClick:true,
      // pauseOnFocusLoss:true,
      // draggable:true,
      // pauseOnHover:true
    }
    switch(type){
      case 'info':
        toast.info(msg, {...obj_toastify});
        break;
      case 'error':
        toast.error(msg, {...obj_toastify});
        break;
      case 'success':
        toast.success(msg, {...obj_toastify});
        break;
      case 'warning':
        toast.warning(msg, {...obj_toastify});
        break;
    }
  
  };
  