formatDate = (tanggal, format = 
    "HH:mm:ss"||
    "HH:mm"|"DD MMMM YYYY"||
    "DD MMMM YYYY HH:mm:ss"||
    "DD MMM YYYY HH:mm:ss" ||
    "YYYY-MM-DD" ||
    "yyyy/mm/dd" ||
    "YYYY-MM-DD HH:mm" ||
    "YYYY-MM-DDTHH:mm:ssZ" ||
    "YYYY-MM-DDTHH:mm:ss" ||
    "YYYY-MM-DD HH:mm:ss" ||
    "YYYY-MM-DD 00:00:00") => 
{

    let final_format = '';

    if (!isNaN(tanggal)){
        let month_arr = ["January","February","March","April","May","June","July","August","September","October","November","December"]
        let tanggal_d = ("0" + tanggal.getDate()).slice(-2);
        let month_m = ("0" + (tanggal.getMonth()+1)).slice(-2);
        let date_d = ("0" + tanggal.getDate()).slice(-2);
        let month_idx = tanggal.getMonth();
        let year_y = tanggal.getFullYear();
        let hour_d = ("0" + tanggal.getHours()).slice(-2);
        let minutes_d = ("0" + tanggal.getMinutes()).slice(-2);
        let seconds_d = ("0" + tanggal.getSeconds()).slice(-2);

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

module.exports = {
	formatDate	
}