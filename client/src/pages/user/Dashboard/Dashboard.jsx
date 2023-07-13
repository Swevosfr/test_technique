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
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function Dashboard() {
  const [products, setProducts] = useState([]);

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
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
  );
}
