import React, { useEffect, useState } from "react"
import IPv4Address from "../ipAddress/IPv4Address";

const fetchCategoryHomepage = () => {
    const [cateHomepageData, setCateHomepage] = useState([]);
    const ip = IPv4Address();
    const url = `http://${ip}:3000/categoryHomepage`;
      useEffect(() => {
        fetch(url)
        .then(response => response.json())
        .then(data => setCateHomepage(data))
        .catch(error => console.error(error));
  }, []);
  return cateHomepageData;
}

export default fetchCategoryHomepage;