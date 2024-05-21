import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";

const DetailScreen = ({ route }) => {
  const { place } = route.params;

  const placeDescriptions = {
    "Zonguldak limanı":
      "Zonguldak Limanı, Karadeniz'in doğal güzellikleriyle çevrili, stratejik bir ticaret merkezidir. Yemyeşil tepelerle çevrili olan liman, sakin denizi ve temiz havasıyla dikkat çeker. Gün batımında muhteşem manzaralar sunan Zonguldak Limanı, hem ticari faaliyetler hem de doğayla iç içe vakit geçirmek için ideal bir yerdir.",
    "Zonguldak maden müzesi":
      "Zonguldak Maden Müzesi, Türkiye'nin ilk maden müzesi olarak, Zonguldak'ın kömür madenciliği tarihini gözler önüne serer. Modern sergileme teknikleriyle donatılmış olan müze, ziyaretçilere kömür madenciliğinin tarihsel gelişimini ve madencilerin zorlu çalışma koşullarını etkileyici bir şekilde anlatır",
    "Gökgöl mağrası":
      "Gökgöl Mağarası, Zonguldak'ın doğal güzelliklerinden biri olup, büyüleyici sarkıt ve dikitleriyle ünlüdür. Yaklaşık 3,350 metre uzunluğundaki bu mağara, serin ve nemli havasıyla doğa severlere eşsiz bir yer altı deneyimi sunar. Mağara içindeki yürüyüş parkurları, ziyaretçileri doğal bir sanat galerisi gibi hissettiren görkemli oluşumlarla doludur. Gökgöl Mağarası, doğanın gizemli yüzünü keşfetmek isteyenler için ideal bir destinasyondur.",
    "Harmankaya şelalesi":
      "Harmankaya Şelalesi, Zonguldak'ın doğal güzelliklerinden biri olarak, doğa severlerin gözdesidir. Yemyeşil ormanlarla çevrili olan bu şelale, serin suları ve huzur verici sesiyle ziyaretçilere sakinlik sunar. Şelalenin etrafındaki yürüyüş parkurları, doğa yürüyüşü ve piknik için mükemmel alanlar sağlar.",
    Filyos:
      "Filyos, tarihi kalıntılar ve güzel bir plaj sunar. Doğal güzellikler ve tarih bir arada, herkes için bir şeyler sunar.",
    "Tios antik kenti":
      "Tios Antik Kenti, Zonguldak'ın tarihi miraslarından biridir ve antik dönemin izlerini günümüze taşır. Bu antik kent, Roma ve Bizans dönemlerine ait kalıntılarıyla dikkat çeker.",
    "Çakırköy mağrası":
      "Çakırköy Mağarası, Zonguldak'ın doğal güzelliklerinden biridir ve ziyaretçilere eşsiz bir yer altı macerası sunar. Mağara, benzersiz sarkıt ve dikit oluşumlarıyla ünlüdür ve doğa meraklıları için keşfedilmeyi bekleyen bir cennettir.",
    "Ulutan barajı":
      " Ulutan Barajı, Zonguldak'ın önemli su kaynaklarından biridir ve bölgenin doğal güzelliklerini keşfetmek isteyenler için ideal bir yerdir. Baraj gölü, çevresindeki yeşil vadilerle çevrili olup, muhteşem bir doğa manzarası sunar.",
    "Gümeli porsuk ağacı":
      "Gümelik Porsuk Ağacı, Zonguldak'ın doğal ve kültürel mirasının önemli bir simgesidir. Yüzyıllardır bu topraklarda yaşayan ve köklü bir geçmişi olan bu ağaç, bölgenin tarihini ve doğal yaşamını temsil eder. Gümelik Porsuk Ağacı'nın gölgesinde dinlenmek, huzur bulmak ve doğanın tadını çıkarmak, yerel halk ve ziyaretçiler için geleneksel bir aktivitedir. ",
    "Bölüklü yaylası":
      "Bölüklü Yaylası, Zonguldak'ın doğal güzelliklerini keşfetmek isteyenler için vazgeçilmez bir destinasyondur. Yüksek rakımlı ve serin iklimiyle ünlü olan bu yayla, muhteşem dağ manzaraları ve temiz havasıyla ziyaretçilerini büyüler. Yayla, geleneksel yayla evleri ve doğal yaşamıyla yerel kültürün bir yansımasıdır. Bölüklü Yaylası'nda yapılan doğa yürüyüşleri ve piknikler, ziyaretçilere unutulmaz anlar yaşatır. ",
    "Cehennemağzı mağraları":
      "Cehennemağzı Mağaraları, Zonguldak'ın doğal harikalarından biridir ve keşfedilmeyi bekleyen gizemli bir dünyayı ziyaretçilere sunar. Bu mağaralar, etkileyici sarkıt ve dikit oluşumlarıyla ünlüdür ve doğa tutkunları için benzersiz bir yeraltı macerası sunar. Mağara içindeki geniş galeriler ve sıra dışı oluşumlar, ziyaretçilere doğanın sanatını keşfetme fırsatı verir. Cehennemağzı Mağaraları, tarih öncesi dönemlere ait izlerin yanı sıra mağara ekosisteminin benzersiz örneklerini de barındırır. Bu doğal mucize, macera arayanlar ve doğa meraklıları için kaçırılmayacak bir keşif noktasıdır.",
    "Deniz feneri":
      "Zonguldak Deniz Feneri, Karadeniz'in kıyısında yer alan ve gemilere yönelik bir kılavuz olan önemli bir yapıdır. Tarihi ve denizcilik açısından büyük bir değere sahiptir. Zonguldak Limanı'nda ve çevresinde seyreden gemilere yol gösteren bu fener, bölgenin denizcilik tarihinde önemli bir rol oynamıştır. Ayrıca, çevresindeki sahil şeridini aydınlatarak denizcilere güvenli seyir imkanı sağlar. Zonguldak Deniz Feneri, bölgenin denizcilik mirasını ve sahil şeridinin güvenliğini korumak için önemli bir simgedir.",
    "Kapuz plajı":
      "Kapuz Plajı, Zonguldak'ın doğal güzelliklerinden biridir ve Karadeniz'in serin sularıyla ünlüdür. Altın rengi kumları ve temiz deniziyle ziyaretçilerine eşsiz bir plaj deneyimi sunar. Plajın etrafındaki doğal kayalıklar ve yeşillikler, manzarayı tamamlar ve ziyaretçilere huzurlu bir ortam sağlar. Kapuz Plajı, yaz aylarında serinlemek ve güneşin tadını çıkarmak isteyenler için popüler bir destinasyondur. Ayrıca, çevresindeki tesisler ve aktivite olanakları, ziyaretçilere keyifli bir gün geçirme imkanı sunar. Kapuz Plajı, Zonguldak'ın doğal güzelliklerini keşfetmek isteyenler için mükemmel bir seçenektir.",
    "Zonguldak kent ormanı":
      "Zonguldak Kent Ormanı, şehrin kalbinde yer alan ve doğal yaşamı şehirle buluşturan önemli bir yeşil alanıdır. Bu orman, şehir sakinlerinin dinlenme ve rekreasyon için sık sık tercih ettiği bir noktadır. Geniş yeşil alanları, yürüyüş ve koşu parkurları, çocuk oyun alanları ve piknik alanlarıyla zenginleştirilmiştir.",
    "Bastoncular çarşısı":
      "Bastoncular Çarşısı, Zonguldak'ın kültürel mirasını yansıtan önemli bir noktadır. Bu çarşı, geleneksel el yapımı bastonların üretildiği ve satıldığı bir merkezdir. Burada ustalar, uzun yılların deneyimiyle el işçiliğiyle bastonlar yaparlar ve ziyaretçilere sunarlar. ",
    "Ilıksu plajı":
      "Ilıksu Plajı, Zonguldak'ın doğal güzelliklerinden biridir ve ziyaretçilere serinleme ve dinlenme imkanı sunar. Adını, çevresindeki kaynak sularından alan bu plajın suyu serin ve rahatlatıcıdır. Altın rengi kumları ve temiz deniziyle Ilıksu Plajı, yaz aylarında yerel halkın ve turistlerin uğrak noktalarından biridir. Plajda şezlong ve şemsiye kiralama gibi olanaklar bulunurken, çevresindeki kafeler ve restoranlar da ziyaretçilere hizmet verir. Ilıksu Plajı, doğanın ve denizin tadını çıkarmak isteyenler için mükemmel bir seçenektir.",
    "Varagel tüneli":
      "Varagel Tüneli, Zonguldak'ın tarihi ve endüstriyel mirasının önemli bir parçasıdır. Türkiye'nin ilk demiryolu tünellerinden biri olan Varagel Tüneli, Karadeniz Bölgesi'nin maden kömürüyle zenginleşmesinde kritik bir rol oynamıştır. 19. yüzyılda inşa edilen bu tünel, maden taşımacılığını ve bölgenin ekonomik kalkınmasını desteklemiştir. Günümüzde, tünelin çevresindeki alanlar, tarih meraklıları ve doğa severler için ilgi çekici bir keşif noktasıdır. Varagel Tüneli, Zonguldak'ın endüstriyel geçmişini ve demiryolu mirasını yaşatmak için önemli bir simgedir.",
  };

  // Örnek resim URL'leri
  const images = [
    "https://cdn.pixabay.com/photo/2015/09/18/20/17/eiffel-tower-950359_1280.jpg",
    "https://cdn.pixabay.com/photo/2017/02/21/21/00/great-wall-of-china-2088667_1280.jpg",
    "https://cdn.pixabay.com/photo/2016/11/29/05/08/rocks-1867416_1280.jpg",
    "https://cdn.pixabay.com/photo/2016/01/19/17/42/sydney-opera-house-1149949_1280.jpg",
  ];

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Image source={{ uri: place.imageUrl }} style={styles.image} />
        <View style={styles.content}>
          <Text style={styles.title}>{place.name}</Text>
          <Text style={styles.description}>{place.description}</Text>
          <Text style={styles.details}>{placeDescriptions[place.name]}</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.imageGallery}
          >
            {images.map((image, index) => (
              <Image
                key={index}
                source={{ uri: image }}
                style={styles.galleryImage}
              />
            ))}
          </ScrollView>
        </View>
      </ScrollView>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Rotaya Ekle</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollView: {
    flex: 1,
  },
  image: {
    width: "100%",
    height: 300,
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: "#666",
    marginBottom: 20,
  },
  details: {
    fontSize: 16,
    color: "#333",
    marginBottom: 20,
  },
  imageGallery: {
    flexDirection: "row",
  },
  galleryImage: {
    width: 120,
    height: 120,
    borderRadius: 10,
    marginRight: 10,
  },
  button: {
    backgroundColor: "#344955",
    paddingVertical: 15,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 20,
    borderRadius: 10,
    position: "absolute",
    bottom: 90,
    left: 0,
    right: 0,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default DetailScreen;
