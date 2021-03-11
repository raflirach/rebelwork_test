import React, { useEffect } from 'react'
import { StyleSheet, Text, View, Image, BackHandler, Alert } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useDispatch, useSelector } from 'react-redux'
import MovieCard from '../components/MovieCard'
import { fetchMovies } from '../store/actions/movie'

export default ({ navigation }) => {
  const { movies } = useSelector(state => state.movie)
  const dispatch = useDispatch()

  useEffect(() => {
    const backAction = () => {
      Alert.alert("Exit", "Are you sure you want to exit?", [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel"
        },
        { text: "YES", onPress: () => BackHandler.exitApp() }
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    dispatch(fetchMovies())

    return () => backHandler.remove();
  }, [])

  const handleScroll = () => {
    dispatch(fetchMovies())
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Movies</Text>
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
  },
  title: {
    marginVertical: 10,
    fontSize: 32,
    fontWeight: 'bold'
  }
})
