import { useEffect, useState } from "react";
import { FlatList, Text, View, Dimensions } from "react-native";
import axios from "axios";
import AlbumDetail from "./AlbumDetail";

const AlbumList = (props) => {
    //seteamos los estados que utilizamos  
    const [photoset, setPhotoset] = useState(null);
    //Dimension lo usamos para tener acceso al tamaño de la pantalla y poder calcular la cantidad de columnas
    const [window, setWindow] = useState(Dimensions.get("window"));
    //estado con la cantidad de columnas mostradas (por defecto 3)
    const [colNumber, setColNumber] = useState(3);

    const getAlbums = async () => {
        const response = await axios.get(
            "https://api.flickr.com/services/rest/?method=flickr.photosets.getList&api_key=6e8a597cb502b7b95dbd46a46e25db8d&user_id=137290658%40N08&format=json&nojsoncallback=1"
        );
        setPhotoset(response.data.photosets.photoset);
    };

    useEffect(() => {
        getAlbums();
        //agrego un eventListener a dimentions para que se actualice cuando cambie el tamaño de la pantalla
        const subscription = Dimensions.addEventListener("change", ({ window }) => {
            setColNumber(Math.floor(window.width / 210)); //210 es el ancho de cada item con su margen
            setWindow(window);
        });
        setColNumber(Math.floor(window.width / 210));
        return () => subscription?.remove(); //al finalizar el componente, elimino el eventListener
    }, []);

    //renderAlbums recibe el item ya iterado por el Flatlist
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
