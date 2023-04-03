import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  Heading,
  IconButton,
  Spinner,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { BsTrash } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { blogDeleteAction, getAllBlogsAction } from "../actions/blogsAction";
import { BLOG_DELETE_RESET } from "../constants/BlogsConstants";

const ViewEditDeleteBlogs = () => {
  const getAllBlogs = useSelector((state) => state.getBlogs);
  const { blogs, loading } = getAllBlogs;

  const deletedBlogs = useSelector((state) => state.blogDelete);
  const { success } = deletedBlogs;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const dispatch = useDispatch();
  const history = useNavigate();

  const deleteHandler = (e, id) => {
    e.preventDefault();
    dispatch(blogDeleteAction(id));
  };
  useEffect(() => {
    if (!userInfo?.admin) {
      history("/");
    }
    if (success) {
      dispatch(getAllBlogsAction());
      dispatch({ type: BLOG_DELETE_RESET });
    }
    dispatch(getAllBlogsAction());
  }, [dispatch, success]);
  return (
    <>
      <Stack py={5} align="center">
        <Heading> Blogs List </Heading>
        {loading ? (
          <Stack py={20} align="center">
            <Spinner size="xl" />
          </Stack>
        ) : (
          <TableContainer py={5}>
            <Table size="md">
              <Thead>
                <Tr>
                  <Th>Id</Th>
                  <Th>Title</Th>
                  <Th>Description</Th>
                  <Th>Edit</Th>
                  <Th>Delete</Th>
                </Tr>
              </Thead>

              {blogs
                ?.sort()
                ?.reverse()
                ?.map((blog, index) => (
                  <Tbody>
                    <Tr key={index}>
                      <Td>{blog.id}</Td>
                      <Td>{blog.title}</Td>
                      <Td>
                        {blog.description.length > 100
                          ? `${blog.description.substring(0, 100)}...`
                          : blog.description}
                      </Td>
                      <Td>
                        {
                          <a href={`/blogForm/${blog.id}/edit`}>
                            <IconButton icon={<EditIcon />} />
                          </a>
                        }
                      </Td>
                      <Td>
                        {
                          <IconButton
                            onClick={(e) => deleteHandler(e, blog.id)}
                            icon={<DeleteIcon />}
                          />
                        }
                      </Td>
                    </Tr>
                  </Tbody>
                ))}
            </Table>
          </TableContainer>
        )}
      </Stack>
    </>
  );
};

export default ViewEditDeleteBlogs;
