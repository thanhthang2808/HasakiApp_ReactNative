import React, { useEffect, useState } from "react"

const fetchCategoryHomepage = () => {
    const [cateHomepageData, setCateHomepage] = useState([]);
    useEffect(() => {
        // Mở cmd -> ipconfig
        // Đổi url bên dưới thành địa chỉ ip của máy mình http://192.168.x.x:3000/categoryHomepage trong phần Wifi để có thể truy cập data từ Expo Go
        fetch('http://192.168.0.4:3000/categoryHomepage')
        .then(response => response.json())
        .then(data => setCateHomepage(data))
        .catch(error => console.error(error));
  }, []);
  return cateHomepageData;  
}

export default fetchCategoryHomepage;