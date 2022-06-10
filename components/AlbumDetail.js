import React, { useState, useEffect } from "react";
import { Text, View, Image } from "react-native";
import axios from "axios";
import Card from "./Card";
import CardSection from "./CardSection";
import Button from "./Button";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons/faAngleRight";

const AlbumDetail = ({ navigation, title, albumId, style }) => {
  const { headerContentStyle, headerTextStyle, buttonStyle } = styles;
  const [photoUrl, setPhoto] = useState(null);

  const getThumbnail = async () => {
    const response = await axios.get(
      `https://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key=6e8a597cb502b7b95dbd46a46e25db8d&photoset_id=${albumId}&user_id=137290658%40N08&format=json&nojsoncallback=1&per_page=1`
    );
    const item = response.data.photoset.photo[0];
    const url = `https://farm${item.farm}.staticflickr.com/${item.server}/${item.id}_${item.secret}.jpg`;
    setPhoto(url);
  };

  useEffect(() => {
    getThumbnail();
  }, []);

  return (
    <Card styles={style}>
      <CardSection style={{ flex: 3 }}>
        <Image source={{ uri: photoUrl }} style={{ flex: 1 }} />
      </CardSection>

      <CardSection>
        <View style={headerContentStyle}>
          <Text style={headerTextStyle}>{title}</Text>
        </View>
        <Button
          onPress={() => navigation.navigate("photoList", { albumId: albumId })}
          style={buttonStyle}
        >
          <FontAwesomeIcon icon={faAngleRight} />
        </Button>
      </CardSection>
    </Card>
  );
};

const styles = {
  headerContentStyle: {
    flexDirection: "column",
    justifyContent: "space-around",
    flex: 4,
  },
  headerTextStyle: {
    fontSize: 18,
    fontWeight: "bold",
    paddingLeft: 10,
  },
  buttonStyle: {
    marginTop: 1,
    marginBottom: 1,
  },
};

export default AlbumDetail;
