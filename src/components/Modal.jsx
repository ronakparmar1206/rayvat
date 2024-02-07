import {
  Box,
  Button,
  Modal,
  Stack,
  TextField,

} from "@mui/material";
import React, { useState } from "react";


const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const BasicModal = ({
  open,
  setOpen,
  editData,
  type,
  productList,
  setProductList,
}) => {
  const [input, setInput] = useState({
    title: `${type == "edit" ? editData?.title : ""}`,
    price: `${type == "edit" ? editData?.price : ""}`,
  });
  const handleSubmit = (e) => {
    e.preventDefault();

    if (type === "add") {
      setProductList([
        ...productList,
        { id: productList.length + 1, ...input },
      ]);
    } else {
      let filterData = productList.map((product) => {
        if (product.id === editData.id) {
          return {
            ...product,
            title: input.title,
            price: input.price,
          };
        }
        return product;
      });

      setProductList(filterData);
    }
    setOpen(false);
  };

  return (
    <>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} component={"form"} onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <TextField
              id="outlined-basic"
              variant="outlined"
              size="small"
              fullWidth
              value={input.title}
              onChange={(e) => setInput({ ...input, title: e.target.value })}
            />
            <TextField
              id="outlined-basic"
              variant="outlined"
              size="small"
              fullWidth
              value={input.price}
              onChange={(e) => setInput({ ...input, price: e.target.value })}
            />
            <Button variant="contained" type="submit">
              {type === "add" ? "Add" : "Edit"}
            </Button>
          </Stack>
        </Box>
      </Modal>
    </>
  );
};

export default BasicModal;
