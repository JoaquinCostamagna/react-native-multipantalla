import { FlatList, Text, View, Dimensions } from "react-native";
import axios from "axios";
import PhotoDetail from "./PhotoDetail";
import { useEffect, useState } from "react";

const PhotoList = (props) => {
  const [photos, setPhotos] = useState(null);
  //Dimension lo usamos para tener acceso al tamaño de la pantalla y poder calcular la cantidad de columnas
  const [window, setWindow] = useState(Dimensions.get("window"));
  //estado con la cantidad de columnas mostradas (por defecto 3)
  const [colNumber, setColNumber] = useState(3);

  const getPhotos = async () => {
    const response = await axios.get(
      `https://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key=6e8a597cb502b7b95dbd46a46e25db8d&photoset_id=${props.route.params.albumId}&user_id=137290658%40N08&format=json&nojsoncallback=1`
    );
    setPhotos(response.data.photoset.photo);
  };

  useEffect(() => {
    getPhotos();
    //agrego un eventListener a dimentions para que se actualice cuando cambie el tamaño de la pantalla
    const subscription = Dimensions.addEventListener("change", ({ window }) => {
      setColNumber(Math.floor(window.width / 310)); //310 es el ancho de cada item con su margen
      setWindow(window);
    });
    setColNumber(Math.floor(window.width / 310));
    return () => subscription?.remove(); //al finalizar el componente, elimino el eventListener
  }, []);

  // La funcion RenderAlbums recibe el item ya iterado por el Flatlist
  // no necesita el .map
  const renderAlbums = ({ item }) => {
    return (
      <PhotoDetail
        key={item.title}
        title={item.title}
        imageUrl={`https://farm${item.farm}.staticflickr.com/${item.server}/${item.id}_${item.secret}.jpg`}
      />
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={photos}
        renderItem={renderAlbums}
        keyExtractor={(item) => item.id}
        numColumns={colNumber}
        key={colNumber}
        columnWrapperStyle={
          colNumber > 1 ? { flex: 1, justifyContent: "center" } : null
        }
        ListEmptyComponent={<Text>Loading...</Text>}
      />
    </View>
  );
};

export default PhotoList;
