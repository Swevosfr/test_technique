import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function Dashboard() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [editForm, setEditForm] = useState({
    name: "",
    type: "",
    price: "",
    rating: "",
    warranty_years: "",
    available: "",
  });
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:8089/products/product");
      if (response.ok) {
        const data = await response.json();
        setProducts(data);
      } else {
        console.log(
          "Une erreur s'est produite lors de la récupération des produits"
        );
      }
    } catch (error) {
      console.log(
        "Une erreur s'est produite lors de la récupération des produits:",
        error
      );
    }
  };

  const handleDelete = async (productId) => {
    try {
      const response = await fetch(
        `http://localhost:8089/products/product/${productId}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        console.log("Produit supprimé avec succès");
        fetchProducts();
      } else {
        console.log(
          "Une erreur s'est produite lors de la suppression du produit"
        );
      }
    } catch (error) {
      console.log(
        "Une erreur s'est produite lors de la suppression du produit:",
        error
      );
    }
  };

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setEditForm(product);
    setOpenModal(true);
  };

  const handleInputChange = (e) => {
    setEditForm({
      ...editForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(
        `http://localhost:8089/products/product/${selectedProduct._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editForm),
        }
      );
      if (response.ok) {
        const updatedProduct = await response.json();
        const updatedProducts = products.map((product) =>
          product._id === updatedProduct._id ? updatedProduct : product
        );
        setProducts(updatedProducts);
        handleCloseModal();
      } else {
        console.log(
          "Une erreur s'est produite lors de la mise à jour du produit"
        );
      }
    } catch (error) {
      console.log(
        "Une erreur s'est produite lors de la mise à jour du produit:",
        error
      );
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setEditForm({
      name: "",
      type: "",
      price: "",
      rating: "",
      warranty_years: "",
      available: "",
    });
    setSelectedProduct(null);
  };

  return (
    <Grid item xs={8}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Nom</StyledTableCell>
              <StyledTableCell align="right">Type</StyledTableCell>
              <StyledTableCell align="right">Prix&nbsp;(€)</StyledTableCell>
              <StyledTableCell align="right">Note&nbsp;(sur 5)</StyledTableCell>
              <StyledTableCell align="right">
                Garantie&nbsp;(année)
              </StyledTableCell>
              <StyledTableCell align="right">Disponibilité</StyledTableCell>
              <StyledTableCell align="right">Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <StyledTableRow key={product._id}>
                <StyledTableCell component="th" scope="row">
                  {product.name}
                </StyledTableCell>
                <StyledTableCell align="right">{product.type}</StyledTableCell>
                <StyledTableCell align="right">{product.price}</StyledTableCell>
                <StyledTableCell align="right">
                  {product.rating}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {product.warranty_years}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {product.available ? "Disponible" : "Non Disponible"}
                </StyledTableCell>
                <StyledTableCell align="right">
                  <IconButton
                    color="primary"
                    aria-label="Modifier"
                    onClick={() => handleEdit(product)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="secondary"
                    aria-label="Supprimer"
                    onClick={() => handleDelete(product._id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            minWidth: 400,
          }}
        >
          <h2>Modifier le produit</h2>
          <TextField
            name="name"
            label="Nom"
            value={editForm.name}
            onChange={handleInputChange}
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            name="type"
            label="Type"
            value={editForm.type}
            onChange={handleInputChange}
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            name="price"
            label="Prix"
            type="number"
            value={editForm.price}
            onChange={handleInputChange}
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            name="rating"
            label="Note"
            type="number"
            value={editForm.rating}
            onChange={handleInputChange}
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            name="warranty_years"
            label="Garantie"
            type="number"
            value={editForm.warranty_years}
            onChange={handleInputChange}
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            name="available"
            label="Disponible"
            value={editForm.available}
            onChange={handleInputChange}
            select
            fullWidth
            sx={{ mb: 2 }}
            SelectProps={{
              native: true,
            }}
          >
            <option value={true}>Oui</option>
            <option value={false}>Non</option>
          </TextField>
          <Button
            variant="contained"
            color="primary"
            onClick={handleUpdate}
            fullWidth
          >
            Enregistrer
          </Button>
        </Box>
      </Modal>
    </Grid>
  );
}
