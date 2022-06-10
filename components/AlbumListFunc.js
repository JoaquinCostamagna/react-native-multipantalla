import { useEffect, useState } from "react";
import { FlatList, Text, View, Dimensions } from "react-native";
import axios from "axios";
import AlbumDetail from "./AlbumDetail";

const AlbumList = (props) => {
  const [photoset, setPhotoset] = useState(null);
  const [window, setWindow] = useState(Dimensions.get("window"));
  const [colNumber, setColNumber] = useState(3);

  const getAlbums = async () => {
    const response = await axios.get(
      "https://api.flickr.com/services/rest/?method=flickr.photosets.getList&api_key=6e8a597cb502b7b95dbd46a46e25db8d&user_id=137290658%40N08&format=json&nojsoncallback=1"
    );
    setPhotoset(response.data.photosets.photoset);
  };

  useEffect(() => {
    getAlbums();

    const subscription = Dimensions.addEventListener("change", ({ window }) => {
      setColNumber(Math.floor(window.width / 210));
      setWindow(window);
    });
    setColNumber(Math.floor(window.width / 210));
    return () => subscription?.remove();
  }, []);

  const renderAlbums = ({ item }) => {
    return (
      <AlbumDetail
        navigation={props.navigation}
        key={item.id}
        title={item.title._content}
        albumId={item.id}
        style={{ maxWidth: colNumber > 1 ? 200 : null, aspectRatio: 1 }}
      />
    );
  };

  return (
    <View>
      <FlatList
        data={photoset}
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

export default AlbumList;
