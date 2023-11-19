import React, { useEffect, useState } from "react"

const fetchProducts = () => {
    const [productsData, setProducts] = useState([]);
    useEffect(() => {
        // Mở cmd -> ipconfig
        // Đổi url bên dưới thành địa chỉ ip của máy mình http://192.168.x.x:3000/products trong phần Wifi để có thể truy cập data từ Expo Go
        fetch('http://192.168.0.4:3000/products')
        .then(response => response.json())
        .then(data => setProducts(data))
        .catch(error => console.error(error));
  }, []);
  return productsData;  
}

export default fetchProducts;