import { Image } from "@chakra-ui/react";
import React from "react";

const ImageCard = ({ images }) => {
  return (
    <div>
      {images.map((image) => {
        return <Image py={4} maxW="290px" src={image}></Image>;
      })}
    </div>
  );
};

export default ImageCard;
