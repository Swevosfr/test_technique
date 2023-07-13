import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import AddIcon from "@mui/icons-material/Add";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";

const defaultTheme = createTheme();

export default function AjoutProduit() {
  const [formData, setFormData] = React.useState({
    name: "",
    type: "",
    price: "",
    rating: "",
    warranty_years: "",
    available: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    let inputValue = value;
    if (name === "available") {
      inputValue = value === "oui";
    }

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: inputValue,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:8089/products/product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const product = await response.json();
        console.log("Produit ajouté avec succès", product);
        // Réinitialiser le formulaire après l'ajout du produit
        setFormData({
          name: "",
          type: "",
          price: "",
          rating: "",
          warranty_years: "",
          available: true, // Réinitialiser à true au lieu de ""
        });
      } else {
        console.log("Une erreur s'est produite lors de l'ajout du produit");
      }
    } catch (error) {
      console.log(
        "Une erreur s'est produite lors de l'ajout du produit:",
        error
      );
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <AddIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Ajouter un produit
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label="Nom du produit"
                  autoFocus
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="type"
                  label="Type du produit"
                  name="type"
                  autoComplete="family-name"
                  value={formData.type}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="price"
                  label="Prix du produit"
                  name="price"
                  autoComplete="family-name"
                  value={formData.price}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="rating"
                  label="Note du produit"
                  name="rating"
                  autoComplete="family-name"
                  value={formData.rating}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="warranty_years"
                  label="Garantie"
                  name="warranty_years"
                  autoComplete="family-name"
                  value={formData.warranty_years}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Disponibilité</InputLabel>
                  <Select
                    labelId="available"
                    id="available"
                    name="available"
                    value={formData.available ? "oui" : "non"}
                    onChange={handleInputChange}
                  >
                    <MenuItem value="oui">Oui</MenuItem>
                    <MenuItem value="non">Non</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Ajouter
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
