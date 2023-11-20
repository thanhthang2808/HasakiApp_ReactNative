import React, { useEffect, useState } from "react"
import IPv4Address from "../ipAddress/IPv4Address";

const fetchCategory = () => {
    const [categoryData, setCategory] = useState([]);
    const ip = IPv4Address();
    
    const url = `http://${ip}:3000/category`;
    console.log(url);
    useEffect(() => {
        // Mở cmd -> ipconfig
        // Đổi url bên dưới thành địa chỉ ip của máy mình http://192.168.x.x:3000/category trong phần Wifi để có thể truy cập data từ Expo Go
        fetch(url)
        .then(response => response.json())
        .then(data => setCategory(data))
        .catch(error => console.error(error));
  }, []);
  return categoryData;
}

export default fetchCategory;