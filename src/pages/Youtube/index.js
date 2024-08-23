import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  Modal,
  TextInput,
} from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';
import {WebView} from 'react-native-webview';
import {
  widthPercentageToDP as w,
  heightPercentageToDP as h,
} from '../../../responsive';

// API Key dan Channel ID untuk YouTube
const YOUTUBE_API_KEY = 'AIzaSyAPTWnZDRB2lT4ZF4lUhWY5stZ4s5eLnJc';
const CHANNEL_ID = 'UCLPgZFt84PFzFLTEFwpNyog';

const YouTubeVideos = () => {
  const [videos, setVideos] = useState([]);
  const [allVideos, setAllVideos] = useState([]); // State untuk menyimpan semua video
  const [isLoading, setIsLoading] = useState(true);
  const [playlists, setPlaylists] = useState([]);
  const [selectedVideoId, setSelectedVideoId] = useState(null);

  useEffect(() => {
    fetchPlaylists();
  }, []);

  const fetchPlaylists = async () => {
    try {
      const res = await axios.get(
        'https://www.googleapis.com/youtube/v3/playlists',
        {
          params: {
            part: 'snippet',
            channelId: CHANNEL_ID,
            maxResults: 10,
            key: YOUTUBE_API_KEY,
          },
        },
      );
      setPlaylists(res.data.items);

      // Ambil video dari semua playlist
      if (res.data.items.length > 0) {
        fetchAllVideos(res.data.items);
      }
    } catch (error) {
      console.error('Error fetching playlists:', error);
      setIsLoading(false);
    }
  };

  const fetchAllVideos = async playlists => {
    setIsLoading(true);
    try {
      let allVideos = [];
      for (let playlist of playlists) {
        const res = await axios.get(
          'https://www.googleapis.com/youtube/v3/playlistItems',
          {
            params: {
              part: 'snippet',
              playlistId: playlist.id,
              maxResults: 50,
              key: YOUTUBE_API_KEY,
            },
          },
        );
        allVideos = [...allVideos, ...res.data.items];
      }
      setAllVideos(allVideos); // Simpan semua video
      setVideos(allVideos); // Tampilkan semua video secara default
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching all videos:', error);
      setIsLoading(false);
    }
  };

  const getVideos = async playlistId => {
    setIsLoading(true);
    try {
      const res = await axios.get(
        'https://www.googleapis.com/youtube/v3/playlistItems',
        {
          params: {
            part: 'snippet',
            playlistId: playlistId,
            maxResults: 50,
            key: YOUTUBE_API_KEY,
          },
        },
      );
      setVideos(res.data.items);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching videos:', error);
      setIsLoading(false);
    }
  };

  const renderPlaylistButtons = () => (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.playlistButtonsContainer}>
      <TouchableOpacity
        style={styles.playlistButton}
        onPress={() => setVideos(allVideos)}>
        <Text style={styles.playlistButtonText}>All</Text>
      </TouchableOpacity>
      {playlists.map(playlist => (
        <TouchableOpacity
          key={playlist.id}
          style={styles.playlistButton}
          onPress={() => onPlaylistPress(playlist.id)}>
          <Text style={styles.playlistButtonText}>
            {playlist.snippet.title}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );

  const onPlaylistPress = playlistId => {
    getVideos(playlistId);
  };

  const renderItem = ({item}) => (
    <TouchableOpacity
      key={item.id}
      onPress={() => setSelectedVideoId(item.snippet.resourceId.videoId)}
      style={styles.videoCard}>
      <View style={styles.thumbnailContainer}>
        <Image
          source={{uri: item.snippet.thumbnails.medium.url}}
          style={styles.thumbnail}
        />
        <Icon
          name="play-circle"
          size={w(12)}
          color="#fff"
          style={styles.playIcon}
        />
      </View>
      <Text style={styles.title}>{item.snippet.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Search"
          placeholderTextColor="#666"
        />
        <Icon name="search" size={w(5)} color="#666" style={styles.icon} />
      </View>

      <View style={styles.playlistContainer}>{renderPlaylistButtons()}</View>

      {isLoading ? (
        <View style={[styles.container, styles.loadingContainer]}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text>Loading...</Text>
        </View>
      ) : (
        <FlatList
          contentContainerStyle={styles.videoList}
          data={videos}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      )}

      <Modal
        visible={!!selectedVideoId}
        animationType="slide"
        onRequestClose={() => setSelectedVideoId(null)}>
        <WebView
          source={{uri: `https://www.youtube.com/embed/${selectedVideoId}`}}
        />
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => setSelectedVideoId(null)}>
          <Text style={styles.closeButtonText}>Close</Text>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default YouTubeVideos;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: w(2),
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  playlistContainer: {
    marginBottom: h(2),
  },
  playlistButtonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  playlistButton: {
    paddingVertical: h(1),
    paddingHorizontal: w(4),
    borderRadius: w(10),
    marginHorizontal: w(1),
    borderWidth: w(0.5),
    borderColor: '#79A1ED',
    backgroundColor: '#fff',
  },
  playlistButtonText: {
    fontSize: w(4),
    color: '#79A1ED',
    fontFamily: 'Poppins-Bold',
  },
  videoList: {
    flexGrow: 1,
  },
  videoCard: {
    backgroundColor: '#fff',
    borderRadius: w(2),
    overflow: 'hidden',
    marginBottom: h(2),
    shadowColor: '#000',
    shadowOffset: {width: 0, height: h(0.5)},
    shadowOpacity: 0.3,
    shadowRadius: w(1),
    elevation: 3,
  },
  thumbnailContainer: {
    position: 'relative',
  },
  thumbnail: {
    width: '100%',
    height: h(25),
    borderRadius: w(2),
  },
  playIcon: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginLeft: -w(6),
    marginTop: -w(6),
  },
  title: {
    padding: w(2),
    fontSize: w(4),
    fontWeight: 'bold',
    color: '#333',
  },
  closeButton: {
    position: 'absolute',
    top: h(2),
    right: w(2),
    backgroundColor: '#000',
    padding: w(2),
    borderRadius: w(2),
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: w(0.5),
    borderColor: '#ddd',
    borderRadius: w(5),
    paddingHorizontal: w(3),
    margin: w(2),
    backgroundColor: '#f8f8f8',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: h(0.5)},
    shadowOpacity: 0.2,
    shadowRadius: w(1),
    elevation: 3,
  },
  input: {
    flex: 1,
    height: h(6),
    fontSize: w(4),
    color: '#000',
    paddingHorizontal: w(2),
  },
  icon: {
    position: 'absolute',
    right: w(2),
  },
});
