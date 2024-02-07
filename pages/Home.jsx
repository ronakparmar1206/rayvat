import {
  Button,
  ButtonGroup,
  CircularProgress,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import { getProductApi } from "../src/redux/slices/productSlice";
import Edit from "@mui/icons-material/Edit";
import BasicModal from "../src/components/Modal";

export const Home = () => {
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();
  const [productList, setProductList] = useState([]);
  const [editData, setEditData] = useState({});
  const [type, setType] = useState("add");
  const { product, isSuccess, isLoading } = useSelector(
    (state) => state.product
  );

  useEffect(() => {
    dispatch(getProductApi());
  }, [dispatch]);
  useEffect(() => {
    if (isSuccess) {
      setProductList(product);
    }
  }, [product, isSuccess]);

  //   ---Edit the Data---//
  const storeData = (data) => {
    console.log(data);
    setEditData(data);
    setType("edit");
  };
  //   ----Delete the Data---//
  const deleteHandler = (id) => {
    let filterData = productList.filter((product) => product.id !== id);
    setProductList(filterData);
  };
  return (
    <TableContainer sx={{ padding: "1rem" }}>
      <Button
        variant="contained"
        onClick={() => {
          setOpen(true);
          setEditData({});
          setType("add");
        }}
      >
        Add
      </Button>
      <Table
        sx={{
          width: "min(1200px,98%)",
          margin: "auto",
          border: "1px solid black",
          boxShadow: " rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;",
        }}
      >
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Stock</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell
                colSpan="100%"
                sx={{ border: "none", py: 3, textAlign: "center" }}
              >
                <CircularProgress />
              </TableCell>
            </TableRow>
          ) : (
            productList.map((row) => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {row.title}
                </TableCell>
                <TableCell>{row.description}</TableCell>
                <TableCell>{row.category}</TableCell>
                <TableCell>{row.price}</TableCell>
                <TableCell>{row.stock}</TableCell>
                <TableCell
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%",
                  }}
                >
                  <Button
                    onClick={() => {
                      storeData(row);
                      setOpen(true);
                    }}
                  >
                    <Edit style={{ color: "black", fontSize: "1.2rem" }} />
                  </Button>

                  <Button onClick={() => deleteHandler(row.id)}>
                    <DeleteIcon
                      style={{ color: "#FF5A5A", fontSize: "1.2rem" }}
                    />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
      {open && (
        <BasicModal
          open={open}
          setOpen={setOpen}
          productList={productList}
          setProductList={setProductList}
          editData={editData}
          type={type}
        />
      )}
    </TableContainer>
  );
};
