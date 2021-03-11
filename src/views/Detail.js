import React, { useEffect } from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { FlatList, ScrollView } from 'react-native-gesture-handler'
import { useDispatch, useSelector } from 'react-redux'
import { windowHeight, windowWidth } from '../helpers/dimention'
import { fetchMovies, getMovieById } from '../store/actions/movie'
import { LinearGradient } from 'expo-linear-gradient';
import MovieCard from '../components/MovieCard'

export default ({ route, navigation }) => {
  const { movie, movies } = useSelector(state => state.movie)
  const dispatch = useDispatch()
  const id = route.params.id

  useEffect(() => {
    dispatch(getMovieById(id))
  }, [])

  const handleScroll = () => {
    dispatch(fetchMovies())
  }


  return (
    <ScrollView style={styles.container}>
      <View style={styles.img_container}>
        <Image 
          style={styles.img}
          source={{
            uri: `https://image.tmdb.org/t/p/original/${movie.poster_path}`
          }}
        />
        <View style={{position: 'absolute', bottom: 0, zIndex: 100, flex: 1, paddingBottom: 20, paddingHorizontal: 10 }}>
          <Text style={{color: 'white', fontSize: 24, fontWeight: 'bold'}}>{movie.title}</Text>
          <Text style={{color: 'white', fontStyle: 'italic', marginBottom: 5}}>Release: {movie.release_date && movie.release_date.slice(0,4)}</Text>
          <Text style={{color: 'white', fontSize: 14}}>{movie.overview}</Text>
        </View>
        <LinearGradient 
          locations={[0, 0.2, 0.6, 0.93]}
          colors={[
            'rgba(0,0,0,0.5)',
            'rgba(0,0,0,0.2)',
            'rgba(0,0,0,0.2)',
            'rgba(0,0,0,0.8)',
          ]}
          style={styles.background}
        />
      </View>
      <Text style={{
        marginVertical: 5,
        fontSize: 24,
        fontWeight: 'bold'
      }}> Related Movies </Text>
      <FlatList 
        onEndReached={() => handleScroll()}
        onEndReachedThreshold={0.1}
        data={movies}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => <MovieCard key={item.id} movie={item} navigation={navigation}/>}
        horizontal
      />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  img: {
    width: windowWidth,
    height: windowHeight * 0.8
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: windowHeight * 0.8,
  },
  img_container: {
    height: windowHeight * 0.8,
    color: 'white'
  }
})
