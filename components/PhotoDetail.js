import React from "react";
import { Text, Image, Linking, TouchableOpacity } from "react-native";
import Card from "./Card";
import CardSection from "./CardSection";

const PhotoDetail = ({ title, imageUrl }) => {
  const { imageStyle, headerTextStyle } = styles;
//Modificamos el detalle de la foto para que al tocar la misma la abriera
  return (
    <TouchableOpacity onPress={() => Linking.openURL(imageUrl)}>
      <Card>
        <CardSection>
          <Image style={imageStyle} source={{ uri: imageUrl }} />
        </CardSection>
        <CardSection>
          <Text style={headerTextStyle}>{title}</Text>
        </CardSection>
      </Card>
    </TouchableOpacity>
  );
};

const styles = {
  imageStyle: {
    height: 300,
    flex: 1,
    width: "auto",
    aspectRatio: 1,
  },
  headerTextStyle: {
    fontSize: 18,
    fontWeight: "bold",
    paddingLeft: 10,
  },
};

export default PhotoDetail;
