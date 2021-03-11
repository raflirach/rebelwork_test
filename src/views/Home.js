import React, { useEffect } from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useDispatch, useSelector } from 'react-redux'
import MovieCard from '../components/MovieCard'
import { fetchMoreMovies, fetchMovies } from '../store/actions/movie'

export default ({ navigation }) => {
  const { movies } = useSelector(state => state.movie)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchMovies())
  }, [])

  const handleScroll = () => {
    dispatch(fetchMovies())
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text>Movies</Text>
      <FlatList 
        onEndReached={() => handleScroll()}
        onEndReachedThreshold={0.1}
        data={movies}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => <MovieCard key={item.id} movie={item} navigation={navigation}/>}
        numColumns={2}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    margin: 0,
    padding: 0,
    borderRadius: 5
  }
})
