import React, { useEffect, useState } from "react"

const fetchCategory = () => {
    const [categoryData, setCategory] = useState([]);
    useEffect(() => {
        // Mở cmd -> ipconfig
        // Đổi url bên dưới thành địa chỉ ip của máy mình http://192.168.x.x:3000/category trong phần Wifi để có thể truy cập data từ Expo Go
        fetch('http://192.168.0.4:3000/category')
        .then(response => response.json())
        .then(data => setCategory(data))
        .catch(error => console.error(error));
  }, []);
  return categoryData;  
}

export default fetchCategory;