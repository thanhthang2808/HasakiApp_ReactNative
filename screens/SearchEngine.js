import React, { useState } from 'react';
import { View, TextInput, FlatList, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SearchEngine = ({ route }) => {
  const navigation = useNavigation();
  const { keyword } = route.params;
  const [searchKeyword, setSearchKeyword] = useState(keyword);
  const [productsData, setProducts] = useState([]);
  useEffect(() => {
    fetch('http://192.168.0.4:3000/products')
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error(error));
  }, []);
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = () => {
    const filteredResults = productsData.filter(product => product.name.toLowerCase().includes(searchKeyword.toLowerCase()));
    setSearchResults(filteredResults);
    // navigation.navigate('SearchResults', { keyword: searchKeyword });
  };

  return (
    <View>
      <TextInput
        placeholder="Tìm kiếm sản phẩm..."
        value={searchKeyword}
        onChangeText={text => setSearchKeyword(text)}
        onSubmitEditing={handleSearch}
      />
      <FlatList
      data={searchResults}
      renderItem={({ item }) => (
        <TouchableOpacity>
          <Text>{item.name}</Text>
        </TouchableOpacity>
      )}
      keyExtractor={(item) => item.id.toString()}
    />
    </View>
  );
};

export default SearchEngine;
