import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';

const YOUTUBE_API_KEY = 'AIzaSyAPTWnZDRB2lT4ZF4lUhWY5stZ4s5eLnJc';
const CHANNEL_ID = 'UCLPgZFt84PFzFLTEFwpNyog'; 

const YouTubeVideos = () => {
  const [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    fetchPlaylists();
  }, []);

  const fetchPlaylists = async () => {
    try {
      const res = await axios.get('https://www.googleapis.com/youtube/v3/playlists', {
        params: {
          part: 'snippet',
          channelId: CHANNEL_ID,
          maxResults: 10, 
          key: YOUTUBE_API_KEY,
        },
      });
      setPlaylists(res.data.items);

      // Ambil video dari playlist pertama sebagai default
      if (res.data.items.length > 0) {
        getVideos(res.data.items[0].id);
      }
    } catch (error) {
      console.error('Error fetching playlists:', error);
      setIsLoading(false);
    }
  };

  const getVideos = async (playlistId) => {
    setIsLoading(true);
    try {
      const res = await axios.get('https://www.googleapis.com/youtube/v3/playlistItems', {
        params: {
          part: 'snippet',
          playlistId: playlistId,
          maxResults: 50, 
          key: YOUTUBE_API_KEY,
        },
      });
      setVideos(res.data.items);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching videos:', error);
      setIsLoading(false);
    }
  };

  const renderPlaylistButtons = () => {
    return (
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.playlistButtonsContainer}
      >
        {playlists.map((playlist) => (
          <TouchableOpacity
            key={playlist.id}
            style={styles.playlistButton}
            onPress={() => onPlaylistPress(playlist.id)}
          >
            <Text style={styles.playlistButtonText}>{playlist.snippet.title}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    );
  };

  const onPlaylistPress = (playlistId) => {
    getVideos(playlistId);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      key={item.id}
      onPress={() => {
       
      }}
      style={styles.videoCard}
    >
      <View style={styles.thumbnailContainer}>
        <Image
          source={{ uri: item.snippet.thumbnails.medium.url }}
          style={styles.thumbnail}
        />
        <Icon name="play-circle" size={50} color="#fff" style={styles.playIcon} />
      </View>
      <Text style={styles.title}>{item.snippet.title}</Text>
    </TouchableOpacity>
  );

  if (isLoading) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.playlistContainer}>
        <Text style={styles.playlistLabel}>Playlist</Text>
        {renderPlaylistButtons()}
      </View>
      
      <FlatList
        contentContainerStyle={styles.videoList}
        data={videos}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default YouTubeVideos;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  playlistContainer: {
    marginBottom: 10,
  },
  playlistLabel: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  playlistButtonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  playlistButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  playlistButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  videoList: {
    flexGrow: 1,
  },
  videoCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 3,
  },
  thumbnailContainer: {
    position: 'relative',
  },
  thumbnail: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  playIcon: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginLeft: -25,
    marginTop: -25,
  },
  title: {
    padding: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
});
