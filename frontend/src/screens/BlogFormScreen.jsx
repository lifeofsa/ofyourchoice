import {
  Avatar,
  Box,
  Button,
  Card,
  CardHeader,
  Container,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  HStack,
  IconButton,
  Image,
  Input,
  InputGroup,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  Textarea,
  useDisclosure,
  useToast,
  WrapItem,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import ImageCard from "../components/ImageCard";
import PreviewMultipleImages from "../components/PreviewMultipleImages";
import Dropzone from "react-dropzone";
import { useSelector, useDispatch } from "react-redux";
import {
  blogActionUpdate,
  blogExtraGetByIdAction,
  blogGetByIdAction,
  blogsActionPost,
  extraDeleteAction,
} from "../actions/blogsAction";
import { Form, useNavigate, useParams } from "react-router-dom";
import {
  BLOGS_EXTRA_RESET,
  BLOGS_REQUEST_UPDATE,
  BLOGS_RESET_BYID,
  BLOGS_RESET_UPDATE,
  BLOGS_SUCCESS_BYID,
  BLOGS_SUCCESS_UPDATE,
  EXTRA_DELETE_RESET,
  EXTRA_PUT_RESET,
} from "../constants/BlogsConstants";
import { m } from "framer-motion";
import { getBlogExtrabyIdReducer } from "../reducers/blogsReducer";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { Error, Message } from "../components/Message";
import EditExtraofBlog from "./EditExtraofBlog";
import { Helmet } from "react-helmet-async";
const BlogFormScreen = () => {
  const [title, setTitle] = useState("");
  const [subHeadingImage, setSubHeadingImage] = useState();
  const [description, setDescription] = useState("");
  const [titleImage, setTitleImage] = useState();
  const [updateImg, setUpdateImg] = useState("");

  const [imagePreview, setImagePreview] = useState();
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);

  const { loading, error, userInfo } = userLogin;

  const blogUpdate = useSelector((state) => state.userBlogUpdate);
  const { success: successUpdate, blog: updateBlog } = blogUpdate;

  const [message, setMessage] = useState("");
  const [addField, setAddField] = useState([
    { subHeading: "", description: "", image: "", imageName: "" },
  ]);
  const blogById = useSelector((state) => state.userBlogFetchById);
  const { blog, success } = blogById;
  const extraById = useSelector((state) => state.userBlogExtraById);
  const { extra, success: successExtra } = extraById;
  const extraUpdated = useSelector((state) => state.extraUpdatedByID);
  const { success: BSuccess } = extraUpdated;

  const extraDeleted = useSelector((state) => state.extraDelete);
  const { success: extraDeleteSuccess } = extraDeleted;

  const history = useNavigate();
  const toast = useToast();
  const match = useParams();
  const blogId = match.id;

  const upload = (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("email", userInfo.email);
    formData.append("name", userInfo.name);
    titleImage
      ? formData.append("file", titleImage)
      : formData.append("image", updateImg);
    formData.append("upload_preset", "geekyImages");
    dispatch(blogActionUpdate(formData, blogId));
  };

  const uploadSubHeadings = async (e, key) => {
    if (addField[key].subHeading === "" || addField[key].description === "") {
      return setMessage("PLEASE FILL OUT ALL THE FIELDS");
    } else {
      // window.location.reload();
      e.preventDefault();
      let formData = new FormData();
      formData.append(`subHeading`, addField[key].subHeading);
      formData.append(`content`, addField[key].description);
      // setTimeout(function () {
      //   window.location.reload(1);
      // }, 3000);
      formData.append("file", subHeadingImage);
      dispatch(blogExtraGetByIdAction(formData, blogId));
    }
  };

  useEffect(() => {
    if (!userInfo?.admin) {
      history("/topnews");
    }

    if (successUpdate) {
      dispatch({ type: BLOGS_RESET_UPDATE });
      toast({
        title: "Blog Added",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      history("/");
    }
    if (successExtra) {
      toast({
        title: "Subheading Added",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    }
    if (successExtra || BSuccess) {
      dispatch(blogGetByIdAction(blogId));
      dispatch({ type: EXTRA_PUT_RESET });
      dispatch({ type: BLOGS_EXTRA_RESET });
    }
    if (extraDeleteSuccess) {
      dispatch(blogGetByIdAction(blogId));
      toast({
        title: "Blog Deleted",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      dispatch({ type: EXTRA_DELETE_RESET });
    } else {
      if (!blog) {
        dispatch(blogGetByIdAction(blogId));
      } else {
        setTitle(blog.title);
        setDescription(blog.description);
        setImagePreview(blog?.image);
        setUpdateImg(blog?.image);
        blog?.extra.length != 0 && setAddField(blog?.extra);
      }
    }
  }, [
    dispatch,
    history,
    blogId,
    blog?.extra,
    successUpdate,
    successExtra,
    BSuccess,
    extraDeleteSuccess,
  ]);

  const singleTitleImage = (e) => {
    e.preventDefault();
    const files = e.target.files[0];
    setTitleImage(files);
    // titleImage.push(files);
    const url = URL.createObjectURL(files);
    console.log(titleImage, "titleImage");
    setImagePreview(url);
  };

  const onMultipleChanges = (e, index) => {
    const targetFiles = e.target.files[0];
    if (e.target.files) {
      setSubHeadingImage(targetFiles);
      const url = URL.createObjectURL(targetFiles);
      const filename = e.target.files[0].name;
      const data = [...addField];
      data[index].image = url;
      data[index].imageName = filename;
      setAddField(data);
    }
  };

  const AddSubheading = () => {
    // const newArray = ;
    setAddField([...addField, { subHeading: "", description: "", image: "" }]);
  };

  const RemoveSubHeading = (i) => {
    const removeHeading = [...addField];
    removeHeading.splice(i, 1);
    setAddField(removeHeading);
  };

  const onChangeData = (e, index) => {
    const { name, value, files } = e.target;
    const data = [...addField];
    data[index][name] = [value];
    setAddField(data);
  };
  const removeHandler = (e, index) => {
    e.preventDefault();
    console.log("subHeadingImage");
    // const url = URL.createObjectURL(null);
    // const filename = e.target.value;
    // const data = [...addField];
    // data[index].image = url;
    // data[index].imageName = filename;
    // setAddField(data);
    setSubHeadingImage(null);

    // const targetfile = e.target.files[0];
    // const url = URL.createObjectURL(!subHeadingImage);
    // setSubHeadingImage();
  };
  console.log(blog, "Blogs Data");
  const deleteHandler = (id) => {
    // e.preventDefault();
    dispatch(extraDeleteAction(id));
  };

  return (
    <>
      <Helmet>
        <title>Add a Blog</title>
        <meta name="description" content="Add your blog" />
      </Helmet>
      <Box
        borderWidth="1px"
        rounded="lg"
        shadow="1px 1px 3px rgba(0,0,0,0.3)"
        maxWidth={450}
        p={6}
        m="10px auto"
        // as="form"
      >
        <Box>
          <form onSubmit={upload}>
            <Box textAlign="center">
              <Heading>BLOG FORM</Heading>
            </Box>
            <Box py={10}>
              <Stack spacing={4}>
                <FormControl>
                  <FormLabel>Title</FormLabel>
                  <Input
                    placeholder="Enter your Blog Title"
                    type="text"
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                    required
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Content</FormLabel>
                  <Textarea
                    placeholder="Enter your content"
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                    required
                  />
                </FormControl>
                <input
                  value={updateImg}
                  type="text"
                  name="image"
                  onChange={(e) => setUpdateImg(e.target.value)}
                />
                <div className="file-upload">
                  <Input
                    type="file"
                    onChange={(e) => singleTitleImage(e)}
                    // name="image"
                  />
                  <Image src={imagePreview} />
                  {/* <Image src={input.image} /> */}
                </div>
                {/* <FormControl>
                  <FormLabel>Image title</FormLabel>
                  <Input
                    type="file"
                    onChange={(e) => singleTitleImage(e)}
                    required
                  />
                </FormControl> */}

                {/* <FormLabel>Base Image</FormLabel>
                <FormControl>
                  <Input
                    onChange={onImageChange}
                    height="100%"
                    width="100%"
                    type="file"
                  />
                  <Image py={4} maxW="290px" src={image}></Image>
                </FormControl> */}
                {addField.length !== 0 && blog?.extra.length !== 0 && (
                  <Button
                    onClick={(e) => {
                      AddSubheading(e);
                    }}
                  >
                    Add Heading
                  </Button>
                )}
                {/* {blog?.extra.map((ex, index) => (
                  <>
                    <Card
                      shadow="1px 1px 3px rgba(0,0,0,0.3)"
                      rounded="xl"
                      p={6}
                    >
                      <Flex gap={4} spacing="4">
                        <Flex
                          flex="1"
                          gap="4"
                          alignItems="center"
                          flexWrap="wrap"
                        >
                          <FormLabel>Sub Heading {index + 1}</FormLabel>
                        </Flex>
                        <HStack py={4}>
                          <EditExtraofBlog
                            blogId={blogId}
                            id={ex.id}
                            subHeading={ex.subHeading}
                            description={ex.content}
                            image={ex.image}
                          />
                          <IconButton
                            size="sm"
                            icon={<DeleteIcon color="red" />}
                            onClick={(e) => {
                              deleteHandler(ex?.id);
                            }}
                          />
                        </HStack>
                      </Flex>

                      <Textarea readOnly>{ex.subHeading}</Textarea>
                      <FormLabel py={4}>Content {index + 1}</FormLabel>
                      <Textarea readOnly>{ex.content}</Textarea>
                      <FormLabel py={4}>Image {index + 1}</FormLabel>
                      {<Image src={ex.image} />}
                    </Card>
                  </>
                ))} */}

                {addField?.map((input, key) => {
                  return (
                    <>
                      <Stack spacing={2}>
                        {message && <Error status="error">{message}</Error>}
                        {!blog?.extra[key] ? (
                          <>
                            <FormControl>
                              <FormControl>
                                <FormLabel>Subheading {key + 1}</FormLabel>
                                <Input
                                  value={input.subHeading}
                                  name="subHeading"
                                  onChange={(e) => onChangeData(e, key)}
                                  placeholder="Enter your content"
                                  // required
                                />
                              </FormControl>
                              <FormControl>
                                <FormLabel>Description {key + 1}</FormLabel>
                                <Textarea
                                  value={input.description}
                                  name="description"
                                  onChange={(e) => onChangeData(e, key)}
                                  placeholder="Enter your Description"
                                  // required
                                />
                              </FormControl>
                              <FormControl>
                                <FormLabel>
                                  SubHeading Image {key + 1}
                                </FormLabel>
                                <input value={input.imageName} type="text" />
                                <div className="file-upload">
                                  <Input
                                    key={key}
                                    type="file"
                                    onChange={(e) => onMultipleChanges(e, key)}
                                    name="image"
                                  />
                                  <Container>
                                    {input.image && (
                                      <>
                                        <IconButton
                                          onClick={(e) => removeHandler(e, key)}
                                          icon={<DeleteIcon />}
                                        />
                                      </>
                                    )}
                                    {subHeadingImage !== null && (
                                      <Image src={input.image} />
                                    )}
                                  </Container>
                                </div>
                              </FormControl>
                              {addField.length !== 0 &&
                                addField.length - 1 == key &&
                                !blog?.extra[key] && (
                                  <Button
                                    onChange={(e) => onChangeData(e, key)}
                                    onClick={(e) => {
                                      uploadSubHeadings(e, key);
                                    }}
                                  >
                                    Submit Headings
                                  </Button>
                                )}
                            </FormControl>
                          </>
                        ) : (
                          <>
                            <Card
                              shadow="1px 1px 3px rgba(0,0,0,0.3)"
                              rounded="xl"
                              p={6}
                            >
                              <Flex gap={4} spacing="4">
                                <Flex
                                  flex="1"
                                  gap="4"
                                  alignItems="center"
                                  flexWrap="wrap"
                                >
                                  <FormLabel>Subheading {key + 1}</FormLabel>
                                </Flex>
                                <HStack py={4}>
                                  <EditExtraofBlog
                                    blogId={blogId}
                                    id={blog?.extra[key].id}
                                    subHeading={blog?.extra[key].subHeading}
                                    description={blog?.extra[key].content}
                                    image={blog?.extra[key].image}
                                    imageName={blog?.extra[key].image}
                                  />
                                  <IconButton
                                    size="sm"
                                    icon={<DeleteIcon color="red" />}
                                    onClick={(e) => {
                                      deleteHandler(blog?.extra[key]?.id);
                                    }}
                                  />
                                </HStack>
                              </Flex>
                              <Textarea
                                key={key}
                                value={blog?.extra[key].subHeading}
                                readOnly
                              ></Textarea>
                              <FormLabel py={4}>Content {key + 1}</FormLabel>
                              <Textarea
                                key={key}
                                value={blog?.extra[key].content}
                                readOnly
                              ></Textarea>
                              <FormLabel py={4}>Image {key + 1}</FormLabel>
                              {<Image src={blog?.extra[key].image} />}
                            </Card>
                          </>
                        )}
                        {/* </form> */}
                      </Stack>
                      {addField.length > 1 &&
                        addField.length - 1 == key &&
                        !blog?.extra[key] && (
                          <WrapItem justifyContent="center">
                            <Button
                              // isDisabled={addField.length == 1}
                              onClick={() => RemoveSubHeading(key)}
                              colorScheme="red"
                            >
                              Remove SubHeading
                            </Button>
                          </WrapItem>
                        )}
                    </>
                  );
                })}
              </Stack>
              {/* {console.log(blog?.extra[0].subHeading)} */}
              <WrapItem py={45} justifyContent="center">
                <Button type="submit">Submit Form</Button>
              </WrapItem>
            </Box>
          </form>
        </Box>
      </Box>
    </>
  );
};

export default BlogFormScreen;
