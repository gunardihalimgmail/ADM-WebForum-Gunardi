import React, { useEffect, useState } from 'react'

const PostThread = () => {

		const [data, setData] = useState(null);

		const fetchData = async () => {
			const response = await fetch('http://localhost:3001/api/data');
			const arr_data = await response.json();
			setData(arr_data);
			// alert(JSON.stringify(arr_data));
		}
		useEffect(() => {
				fetchData();
		}, [])

    return (
        <div>
						Cara Server {JSON.stringify(data)}
				</div>
    )
}

export default PostThread