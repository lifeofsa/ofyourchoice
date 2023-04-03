import { Box, Button, Input } from "@chakra-ui/react";
import React, { useState } from "react";
import ImageCard from "./ImageCard";

const PreviewMultipleImages = () => {
  const [image, setImage] = useState([]);
  const [imageName, setImageName] = useState([]);

  const onMultipleChanges = (event) => {
    const ImageData = [];
    const targetFiles = event.target.files;
    const selectedFiles = [...targetFiles];

    selectedFiles.map((image) => {
      return ImageData.push(URL.createObjectURL(image));
    });
    setImageName(selectedFiles.map((img) => img.name));
    setImage(ImageData);
    // console.log(ImageData);
  };
  const removeImage = () => {
    setImage([]);
    setImageName([]);
  };
  return (
    <>
      <input value={imageName} onChange={(e) => setImageName(e)} disabled />
      <div className="file-upload">
        {/* <span style={{ fontWeight: "bold" }}>
          {imageName.length == 0
            ? "Upload A File"
            : imageName.map((img) => img.name)}
        </span> */}

        <input
          type="file"
          onChange={onMultipleChanges}
          name="image"
          //   value={input.image}
        ></input>
      </div>
      <Box>
        {image.length !== 0 && <Button onClick={removeImage}>X</Button>}
        <ImageCard images={image} />
      </Box>
    </>
  );
};

export default PreviewMultipleImages;
