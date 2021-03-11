import React, { useEffect } from 'react'
import { StyleSheet, Text, View, Image, BackHandler, Alert } from 'react-native'
import { FlatList, ScrollView } from 'react-native-gesture-handler'
import { useDispatch, useSelector } from 'react-redux'
import { windowHeight, windowWidth } from '../helpers/dimention'
import { fetchSimilarMovies, getMovieById } from '../store/actions/movie'
import { LinearGradient } from 'expo-linear-gradient';
import MovieCard from '../components/MovieCard'

export default ({ route, navigation }) => {
  const { movie, similarMovies: movies } = useSelector(state => state.movie)
  const dispatch = useDispatch()
  const id = route.params.id
  
  useEffect(() => {
    const backAction = () => {
      navigation.replace('Home')
      return true
    };
    const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction);
    dispatch(getMovieById(id))
    dispatch(fetchSimilarMovies(id))
    return () => backHandler.remove();
  }, [])

  return (
    <ScrollView style={styles.container}>
      <View style={styles.img_container}>
        <Image 
          style={styles.img}
          source={{
            uri: `https://image.tmdb.org/t/p/original/${movie.poster_path}`
          }}
        />
        <View style={styles.content}>
          <Text style={styles.title}>{movie.title}</Text>
          <Text style={styles.date}>Release: {movie.release_date && movie.release_date.slice(0,4)}</Text>
          <Text style={styles.overview}>{movie.overview}</Text>
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
  },
  content: {
    position: 'absolute', 
    bottom: 0, 
    zIndex: 100, 
    flex: 1, 
    paddingBottom: 20, 
    paddingHorizontal: 10 
  },
  title: {
    color: 'white', 
    fontSize: 24, 
    fontWeight: 'bold'
  },
  date: {
    color: 'white', 
    fontStyle: 'italic', 
    marginBottom: 5
  },
  overview: {
    color: 'white', 
    fontSize: 14
  }
})
