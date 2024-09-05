import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import {Card, Icon} from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import LottieView from 'lottie-react-native';
import {
  widthPercentageToDP as w,
  heightPercentageToDP as h,
} from '../../../responsive';
import RenderHtml from 'react-native-render-html';

const InfoDcc = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('../../../src/assets/icons/logo.png')}
          style={styles.image}
        />
        <Text style={styles.headerText}>Dipanegara Computer Club</Text>
      </View>
      <View style={styles.content}>
        <TouchableOpacity activeOpacity={0.8}>
          <Card containerStyle={styles.card}>
            <View style={styles.cardHeader}>
              <Icon name="history" type="font-awesome" color="#2980B9" />
              <Card.Title style={styles.cardTitle}>Sejarah DCC</Card.Title>
            </View>
            <Card.Divider />
            <Text style={styles.cardText}>
              Dipanegara Computer Club (DCC) terbentuk karena adanya
              ketidakpuasan dari sekelompok Mahasiswa STMIK Dipanegara akan
              sebuah sistem Pendidikan yang mereka geluti selama ini. Sehingga
              mereka berusaha untuk mencari dan terus mencari bentuk wadah yang
              mampu menampung kebutuhan akan tinjauan ke depan mereka tentang
              kebutuhan teknologi masa depan yang akan datang.
              {'\n\n'}
              Hal inilah yang mengakibatkan beberapa di antara mereka membentuk
              aliansi kecil-kecilan untuk mencari pengetahuan di luar hal-hal
              yang mereka anggap tidak pernah dan tidak akan mereka dapatkan dan
              temukan dari sistem pendidikan tempat mereka melakukan interaksi
              akademik saat ini yaitu STMIK Dipanegara. Hal yang mereka alami
              tersebut terjadi pada saat mahasiswa-mahasiswa itu berada di
              Kampus I STMIK Dipanegara. Pindah ke kampus II, dorongan untuk
              membentuk suatu wadah yang memungkinkan mampu memenuhi kebutuhan
              akan perspektif ke depan mereka semakin besar. Sehingga akhirnya
              pada tanggal 27 September 1997 di Bantimurung tercetuslah suatu
              Lembaga Kemahasiswaan yang berbentuk Study Club(SC) yaitu
              Dipanegara Computer Club(DCC) dan kemudian menjadi Unit Kegiatan
              Mahasiswa dengan konstitusi KABESMA.
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
              Ikut menyukseskan proses belajar mengajar di kampus Universitas
              Dipa Makassar khususnya pada mata kuliah berbasis komputer,
              sebagai wadah untuk mengembangkan kemampuan dan keahlian Anggota
              DCC pada khususnya dan mahasiswa Universitas Dipa Makassar pada
              umumnya, dalam upaya pencapaian tujuan pendidikan.
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
              Menciptakan insan-insan informasi berintelektual yang dapat
              menjawab tantangan dalam dunia IT (Information Technology) serta
              dapat mempertanggung jawabkan keahlian dalam dunia komputer.
            </Text>
          </Card>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.8}>
          <Card containerStyle={styles.card}>
            <View style={styles.cardHeader}>
              <Icon name="users" type="font-awesome" color="#2980B9" />
              <Card.Title style={styles.cardTitle}>
                Struktur Organisasi
              </Card.Title>
            </View>
            <Card.Divider />
            <View style={styles.activitiesContainer}>
              <Image
                source={{
                  uri: 'https://dcc-dp.com/public/file/STRUKTUR20242025.jpg',
                }}
                style={styles.orgImage}
              />
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
    paddingVertical: h(2),
  },
  header: {
    backgroundColor: '#79A1ED',
    width: w(100),
    paddingVertical: h(5),
    alignItems: 'center',
    marginBottom: h(4),
    borderRadius: w(5),
    overflow: 'hidden',
    marginTop: h(-2),
  },
  headerText: {
    fontSize: w(6),
    fontWeight: 'bold',
    color: '#fff',
    textTransform: 'uppercase',
  },
  content: {
    width: w(90),
  },
  card: {
    borderRadius: w(3),
    shadowColor: '#000',
    shadowOffset: {width: 0, height: h(1)},
    shadowOpacity: 0.3,
    shadowRadius: w(3),
    elevation: 5,
    marginBottom: h(3),
    backgroundColor: '#fff',
    paddingHorizontal: w(3),
    paddingVertical: h(2),
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: h(2),
  },
  cardTitle: {
    fontSize: w(5),
    fontWeight: 'bold',
    color: '#2980B9',
    marginLeft: w(2),
  },
  cardText: {
    fontSize: w(4),
    marginBottom: h(2),
    color: 'black',
    lineHeight: h(2.5),
    textAlign: 'justify',
  },
  activitiesContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: h(2),
  },
  orgImage: {
    width: w(80),
    height: h(30),
    borderRadius: w(2),
    resizeMode: 'contain',
  },
  image: {
    width: w(50),
    height: h(20),
    resizeMode: 'contain',
  },
});

export default InfoDcc;
