import React from 'react';
import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Card, Icon } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import LottieView from 'lottie-react-native';

const InfoDcc = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <LinearGradient colors={['#6DD5FA', '#2980B9']} style={styles.header}>
        {/* <LottieView 
          source={require('../../assets/animation/done.json')} 
          autoPlay 
          loop 
          style={styles.lottieHeader}
        /> */}
        <Text style={styles.headerText}>Dipanegara Computer Club</Text>
        <Text style={styles.subHeaderText}>at Universitas Dipanegara Makassar</Text>
      </LinearGradient>
      <View style={styles.content}>
        <TouchableOpacity activeOpacity={0.8}>
          <Card containerStyle={styles.card}>
            <View style={styles.cardHeader}>
              <Icon name="history" type="font-awesome" color="#2980B9" />
              <Card.Title style={styles.cardTitle}>Sejarah DCC</Card.Title>
            </View>
            <Card.Divider />
            <Text style={styles.cardText}>
              Dipanegara Computer Club (DCC) terbentuk karena adanya ketidakpuasan dari sekelompok Mahasiswa STMIK Dipanegara akan sebuah sistem Pendidikan yang mereka geluti selama ini. Sehingga mereka berusaha untuk mencari dan terus mencari bentuk wadah yang mampu menampung kebutuhan akan tinjauan ke depan mereka tentang kebutuhan teknologi masa depan yang akan datang.
              {'\n\n'}
              Hal inilah yang mengakibatkan beberapa di antara mereka membentuk aliansi kecil-kecilan untuk mencari pengetahuan di luar hal-hal yang mereka anggap tidak pernah dan tidak akan mereka dapatkan dan temukan dari sistem pendidikan tempat mereka melakukan interaksi akademik saat ini yaitu STMIK Dipanegara. Hal yang mereka alami tersebut terjadi pada saat mahasiswa-mahasiswa itu berada di Kampus I STMIK Dipanegara. Pindah ke kampus II, dorongan untuk membentuk suatu wadah yang memungkinkan mampu memenuhi kebutuhan akan perspektif ke depan mereka semakin besar. Sehingga akhirnya pada tanggal 27 September 1997 di Bantimurung tercetuslah suatu Lembaga Kemahasiswaan yang berbentuk Study Club(SC) yaitu Dipanegara Computer Club(DCC) dan kemudian menjadi Unit Kegiatan Mahasiswa dengan konstitusi KABESMA.
            </Text>
          </Card>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.8}>
          <Card containerStyle={styles.card}>
            <View style={styles.cardHeader}>
              <Icon name="lightbulb-outline" type="material" color="#2980B9" />
              <Card.Title style={styles.cardTitle}>Visi</Card.Title>
            </View>
            <Card.Divider />
            <Text style={styles.cardText}>
              Ikut menyukseskan proses belajar mengajar di kampus Universitas Dipa Makassar khususnya pada mata kuliah berbasis komputer, sebagai wadah untuk mengembangkan kemampuan dan keahlian Anggota DCC pada khususnya dan mahasiswa Universitas Dipa Makassar pada umumnya, dalam upaya pencapaian tujuan pendidikan.
            </Text>
          </Card>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.8}>
          <Card containerStyle={styles.card}>
            <View style={styles.cardHeader}>
              <Icon name="target" type="foundation" color="#2980B9" />
              <Card.Title style={styles.cardTitle}>Misi</Card.Title>
            </View>
            <Card.Divider />
            <Text style={styles.cardText}>
              Menciptakan insan-insan informasi berintelektual yang dapat menjawab tantangan dalam dunia IT (Information Technology) serta dapat mempertanggung jawabkan keahlian dalam dunia komputer.
            </Text>
          </Card>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.8}>
          <Card containerStyle={styles.card}>
            <View style={styles.cardHeader}>
              <Icon name="users" type="font-awesome" color="#2980B9" />
              <Card.Title style={styles.cardTitle}>Struktur Organisasi</Card.Title>
            </View>
            <Card.Divider />
            <View style={styles.activitiesContainer}>
              <Image source={{uri:'https://dcc-dp.com/public/file/STRUKTUR20242025.jpg'}} style={styles.orgImage} />
            </View>
          </Card>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    paddingVertical: 20,
  },
  header: {
    width: '100%',
    paddingVertical: 40,
    alignItems: 'center',
    marginBottom: 30,
    borderRadius: 20,
    overflow: 'hidden',
  },
  lottieHeader: {
    width: '100%',
    height: 200,
    position: 'absolute',
    top: 0,
  },
  headerText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 50,
    textTransform: 'uppercase', 
  },
  subHeaderText: {
    fontSize: 20,
    color: '#fff',
    marginTop: 5,
    fontStyle: 'italic',
  },
  content: {
    width: '90%',
  },
  card: {
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
    marginBottom: 20,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2980B9',
    marginLeft: 10,
  },
  cardText: {
    fontSize: 16,
    marginBottom: 10,
    color: '#333',
    lineHeight: 22,
    textAlign:'justify'
  },
  activitiesContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  orgImage: {
    width: 300,
    height: 300,
    borderRadius: 10,
    resizeMode: 'contain',
  },
});

export default InfoDcc;
 