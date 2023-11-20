import React, { useEffect, useState } from "react"
import IPv4Address from "../ipAddress/IPv4Address";

const fetchProducts = () => {
    const [productsData, setProducts] = useState([]);
    const ip = IPv4Address();
    const url = `http://${ip}:3000/products`;
    useEffect(() => {
        fetch(url)
        .then(response => response.json())
        .then(data => setProducts(data))
        .catch(error => console.error(error));
  }, []);
  return productsData;
}

export default fetchProducts;