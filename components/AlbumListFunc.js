import { useEffect, useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import axios from 'axios';
import AlbumDetail from './AlbumDetail';

const AlbumList = (props) => {
    const [photoset, setPhotoset] = useState(null);
    useEffect(() => {
        axios
            .get(
                'https://api.flickr.com/services/rest/?method=flickr.photosets.getList&api_key=6e8a597cb502b7b95dbd46a46e25db8d&user_id=137290658%40N08&format=json&nojsoncallback=1',
            )
            .then((response) =>
                setPhotoset(response.data.photosets.photoset),
            );
    });

    const renderAlbums = ({ item }) => {
        return (
            <AlbumDetail
                navigation={props.navigation}
                key={item.id}
                title={item.title._content}
                albumId={item.id}
            />
        );
    }


    if (!photoset) {
        return <Text>Loading...</Text>;
    }
    return (
        <View style={{ flex: 1 }}>
            <FlatList
                data={photoset}
                renderItem={renderAlbums}
                keyExtractor={item => item.id}
            />
        </View>
    );
}

export default AlbumList;