import React from 'react'
import { StyleSheet, Text, Image, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { windowHeight, windowWidth } from '../helpers/dimention'

export default ({ navigation, movie }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={() => navigation.push('Detail', { id: movie.id })}>
      <Image 
        style={styles.img}
        source={{
          uri: `https://image.tmdb.org/t/p/original/${movie.poster_path}`
        }}
      />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 6,
    elevation: 3,
    backgroundColor: '#fff',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.3,
    shadowRadius: 2,
    overflow: 'hidden',
    margin: 5
  },
  img: {
    width: windowWidth * 0.4,
    height: windowHeight * 0.3
  }
})
