import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import styles from '../style/DetailScreenStyles';

const DetailScreen = ({ route }) => {
  const { itemId } = route.params;
  const [itemDetail, setItemDetail] = useState(null);

  useEffect(() => {
    axios.get(`https://jsonplaceholder.typicode.com/posts/${itemId}`)
      .then(response => {
        setItemDetail(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, [itemId]);

  if (!itemDetail) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{itemDetail.title}</Text>
      <Text style={styles.body}>{itemDetail.body}</Text>
    </View>
  );
};


export default DetailScreen;
