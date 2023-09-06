import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import styles from '../style/BerandaScreenStyles';

const ListScreen = () => {
  const [data, setData] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [noResults, setNoResults] = useState(false);
  const navigation = useNavigation();

  const truncateText = (text, maxWords) => {
    const words = text.split(' ');
    if (words.length <= maxWords) {
      return text;
    }
    const truncatedText = words.slice(0, maxWords).join(' ');
      return `${truncatedText} ...`;
  };

  const handleSearch = () => {
      if (!searchKeyword) {
        setFilteredData(data);
        setNoResults(false);
      } else {
        const filtered = data.filter(item =>
                  item.title.toLowerCase().includes(searchKeyword.toLowerCase())
                );
        setFilteredData(filtered);
        setNoResults(filtered.length === 0);
      }
    };

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/posts')
      .then(response => {
        setData(response.data);
        setFilteredData(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Daftar Item</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Search ..."
          value={searchKeyword}
          onChangeText={text => setSearchKeyword(text)}
        />
        <TouchableOpacity
            style={styles.searchButton}
            onPress={handleSearch}
          >
            <Icon name="search" type="font-awesome" color="white" size={20} />
          </TouchableOpacity>
      </View>
        {noResults ? (
                <Text style={styles.noResultsText}>Tidak ada hasil ditemukan.</Text>
              ) : (
      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Detail', { itemId: item.id });
            }}
          >
              <View style={styles.card}>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text >{truncateText(item.body, 15)}</Text>
              </View>
          </TouchableOpacity>
        )}
      />
      )}
    </View>
  );
};

export default ListScreen;
