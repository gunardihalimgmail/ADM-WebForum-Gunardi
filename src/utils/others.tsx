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


export const formatDate = (tanggal:any, format: 
                            "HH:mm:ss"|
                            "HH:mm"|"DD MMMM YYYY"|
                            "DD MMMM YYYY HH:mm:ss"|
                            "DD MMM YYYY HH:mm:ss" |
                            "YYYY-MM-DD" |
                            "yyyy/mm/dd" |
                            "YYYY-MM-DD HH:mm" |
                            "YYYY-MM-DDTHH:mm:ssZ" |
                            "YYYY-MM-DDTHH:mm:ss" |
                            "YYYY-MM-DD HH:mm:ss" |
                            "YYYY-MM-DD 00:00:00") => {
        let final_format:any = '';
        if (!isNaN(tanggal)){
						let month_arr = ["January","February","March","April","May","June","July","August","September","October","November","December"]
						let tanggal_d:any = ("0" + tanggal.getDate()).slice(-2);
						let month_m:any = ("0" + (tanggal.getMonth()+1)).slice(-2);
						let date_d:any = ("0" + tanggal.getDate()).slice(-2);
						let month_idx:any = tanggal.getMonth();
						let year_y:any = tanggal.getFullYear();
						let hour_d:any = ("0" + tanggal.getHours()).slice(-2);
						let minutes_d:any = ("0" + tanggal.getMinutes()).slice(-2);
						let seconds_d:any = ("0" + tanggal.getSeconds()).slice(-2);

						switch(format){
								case 'HH:mm:ss':
									final_format = hour_d + ":" + minutes_d + ":" + seconds_d;
									break;
								case 'HH:mm':
									final_format = hour_d + ":" + minutes_d;
									break;
								case 'DD MMMM YYYY':
									final_format = tanggal_d + " " + month_arr[month_idx] + " " + year_y;
									break;
								case 'DD MMMM YYYY HH:mm:ss':
									final_format = tanggal_d + " " + month_arr[month_idx] + " " + year_y
														+ " " + hour_d + ":" + minutes_d + ":" + seconds_d;
									break;
								case 'DD MMM YYYY HH:mm:ss':
									final_format = tanggal_d + " " + month_m + " " + year_y
														+ " " + hour_d + ":" + minutes_d + ":" + seconds_d;
									break;
								case 'YYYY-MM-DDTHH:mm:ssZ':
									final_format = year_y + "-" + month_m + "-" + date_d + "T" + hour_d + ":" + minutes_d + ":" + seconds_d + "Z";
									break;
								case 'YYYY-MM-DDTHH:mm:ss':
									final_format = year_y + "-" + month_m + "-" + date_d + "T" + hour_d + ":" + minutes_d + ":" + seconds_d + "+0000";
									break;
								case 'YYYY-MM-DD HH:mm:ss':
									final_format = year_y + "-" + month_m + "-" + date_d + " " + hour_d + ":" + minutes_d + ":" + seconds_d;
									break;
								case 'YYYY-MM-DD HH:mm':
									final_format = year_y + "-" + month_m + "-" + date_d + " " + hour_d + ":" + minutes_d;
									break;
								case 'YYYY-MM-DD':
									final_format = year_y + "-" + month_m + "-" + date_d;
									break;
								case 'yyyy/mm/dd':
									final_format = year_y+ "/" + month_m + "/" + date_d;
									break;
								case 'YYYY-MM-DD 00:00:00':
									final_format = year_y + "-" + month_m + "-" + date_d + " 00:00:00";
									break;
						}

      	}
				return final_format
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
  
      
  export const fetchDataGlobal = async (param, method, path) => {
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