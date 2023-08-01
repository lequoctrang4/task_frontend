import TextField from "@mui/material/TextField/TextField";
import Box from "@mui/material/Box";
import Autocomplete from "@mui/material/Autocomplete/Autocomplete";
import Container from "@mui/material/Container";
import DetailsProduct from "../components/DetailsProduct/DetailsProduct";
import { Button, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import DrawerBar from "../components/nav-bar/DrawerBar";
import Toolbar from "@mui/material/Toolbar";
import { getCategories, addProduct } from "../api/api";
import { useDispatch } from "react-redux";
import { setState } from "../redux/state";
import { ProductType, DetailsProductType } from "../types/product";
import LoadingButton from "@mui/lab/LoadingButton";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const defaultTheme = createTheme();

export default function AddProduct() {
  const dispatch = useDispatch();
  dispatch(setState({ state: "Product" }));
  const [click, setClick] = useState(undefined);
  const [loadButton, setLoadButton] = useState(false);
  const [categories, setCategories] = useState([]);
  const [formValue, setFormValue] = useState({
    code: "",
    name: "",
    style: "",
    pattern: "",
    material: "",
    climate: "",
    publish_date: "",
    quantity: 0,
    category_id: 0,
    details: [
      {
        size: "",
        color: "",
        price: 0,
        sale_price: 0,
        image: [],
      },
    ],
  } as ProductType);
  const detailsProp: DetailsProductType = {
    color: "",
    size: "",
    price: 0,
    sale_price: 0,
    image: [],
  };

  const handleChangeProduct = (field: string, value: any) => {
    setFormValue((prevValue: any) => ({ ...prevValue, [field]: value }));
    console.log(formValue);
  };
  const deleteVariant = (index: number) => {
    console.log(index);
    setFormValue((prevValue: any) => {
      const updatedDetails = prevValue.details;
      updatedDetails[index] = undefined;
      console.log(updatedDetails);
      return { ...prevValue, details: updatedDetails };
    });
  };
  const handleVariantChange = (index: number, field: string, value: any) => {
    setFormValue((prevValue: any) => {
      const updatedDetails = prevValue.details.map(
        (
          detail: {
            color: string;
            size: string;
            price: number;
            sale_price: number;
            image: any;
          },
          i: number
        ) => {
          if (i === index) {
            return { ...detail, [field]: value };
          } else {
            return detail;
          }
        }
      );
      return { ...prevValue, details: updatedDetails };
    });
  };

  const handleChangeImage = (index1: number, value: any) => {
    setFormValue((prevValue: any) => {
      const updatedDetails = prevValue.details.map(
        (
          detail: {
            color: string;
            size: string;
            price: number;
            sale_price: number;
            image: any;
          },
          i: number
        ) => {
          if (i === index1) {
            return { ...detail, image: [...detail.image, value] };
          } else {
            return detail;
          }
        }
      );
      return { ...prevValue, details: updatedDetails };
    });
  };
  function handleDeleteImage(index1: number, index2: number) {
    setFormValue((prevValue: any) => {
      const updatedDetails = prevValue.details.map(
        (
          detail: {
            color: string;
            size: string;
            price: number;
            sale_price: number;
            image: any;
          },
          i: number
        ) => {
          if (i === index1) {
            return {
              ...detail,
              image: detail.image.filter(
                (item: any, index: number) => index2 !== index
              ),
            };
          } else {
            return detail;
          }
        }
      );
      return { ...prevValue, details: updatedDetails };
    });
  }
  useEffect(() => {
    (async () => {
      await getCategories().then((res) => {
        setCategories(res);
      });
    })();
  }, []);
  useEffect(() => {
    if (click === undefined) return;
    setLoadButton(true);
    (async () => {
      let res = await addProduct(formValue);
      setTimeout(() => setLoadButton(false), 1000);
      console.log(res);
      if (res.error === 1) {
        toast.error("Thêm thất bại");
      }
      toast.success("Thêm thành công");
      setClick(() => undefined);
      setFormValue(() => ({
        code: "",
        name: "",
        style: "",
        pattern: "",
        material: "",
        climate: "",
        publish_date: "",
        quantity: 0,
        category_id: 0,
        details: [
          {
            size: "",
            color: "",
            price: 0,
            sale_price: 0,
            image: [],
          },
        ],
      }));
    })();
  }, [click]);
  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: "flex" }}>
        <DrawerBar />
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />
          <Container
            maxWidth="xl"
            sx={{ mt: 4, mb: 4, display: "flex", flexDirection: "column" }}
          >
            <div style={{ padding: 10 }}>
              <h2>Add new Product</h2>
              <hr />
              <Container
                sx={{
                  display: "flex",
                  gap: 3,
                  justifyContent: "flex-start",
                  flexWrap: "wrap",
                }}
              >
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={categories as any}
                  getOptionLabel={(option: any) => option.name}
                  isOptionEqualToValue={(option, value) =>
                    option.id === value.id
                  }
                  onChange={(event, value) => {
                    if (value) {
                      handleChangeProduct("category_id", value.id);
                    }
                  }}
                  sx={{ width: 210 }}
                  renderInput={(params) => (
                    <TextField {...params} label="Category" />
                  )}
                />
                <TextField
                  id="outlined-basic"
                  label="Product Code"
                  variant="outlined"
                  onChange={(event) =>
                    handleChangeProduct("code", event.target.value)
                  }
                />
                <TextField
                  id="outlined-basic"
                  label="Product Name"
                  variant="outlined"
                  onChange={(event) =>
                    handleChangeProduct("name", event.target.value)
                  }
                />

                <TextField
                  id="outlined-basic"
                  label="Style"
                  variant="outlined"
                  onChange={(event) =>
                    handleChangeProduct("style", event.target.value)
                  }
                />
                <TextField
                  id="outlined-basic"
                  label="Pattern"
                  variant="outlined"
                  onChange={(event) =>
                    handleChangeProduct("pattern", event.target.value)
                  }
                />
                <TextField
                  id="outlined-basic"
                  label="Material"
                  variant="outlined"
                  onChange={(event) =>
                    handleChangeProduct("material", event.target.value)
                  }
                />
                <TextField
                  id="outlined-basic"
                  label="Climate"
                  variant="outlined"
                  onChange={(event) =>
                    handleChangeProduct("climate", event.target.value)
                  }
                />
                <TextField
                  id="outlined-basic"
                  label="Publish_date"
                  variant="outlined"
                  InputLabelProps={{ shrink: true, required: true }}
                  type="date"
                  onChange={(event) =>
                    handleChangeProduct("publish_date", event.target.value)
                  }
                />
                <TextField
                  id="outlined-basic"
                  label="Quantity"
                  variant="outlined"
                  type="number"
                  onChange={(event) =>
                    handleChangeProduct("quantity", event.target.value)
                  }
                />
              </Container>
              <h2 style={{ textAlign: "left" }}>Variant</h2>
              <Container
                maxWidth={"xl"}
                sx={{ display: "flex", gap: 5, flexDirection: "column" }}
              >
                {formValue.details.map(
                  (detail, index) =>
                    detail && (
                      <div key={index}>
                        <Typography
                          component="h1"
                          variant="h6"
                          color="inherit"
                          noWrap
                          sx={{ flexGrow: 1, paddingLeft: 3 }}
                        >
                          {index}
                        </Typography>
                        <DetailsProduct
                          index={index}
                          handleVariantChange={handleVariantChange}
                          handleChangeImage={handleChangeImage}
                          handleDeleteImage={handleDeleteImage}
                          deleteVariant={deleteVariant}
                        />
                      </div>
                    )
                )}
              </Container>

              <Container
                sx={{ justifyContent: "center", display: "flex", gap: 10 }}
              >
                <Button
                  sx={{ width: "30%", marginTop: 2, height: 50 }}
                  variant="outlined"
                  onClick={() =>
                    setFormValue((prev: ProductType) => ({
                      ...prev,
                      details: [...prev.details, detailsProp],
                    }))
                  }
                >
                  Add Variant
                </Button>
                <LoadingButton
                  loading={loadButton}
                  sx={{ width: "30%", marginTop: 2, height: 50 }}
                  variant="contained"
                  color="success"
                  onClick={() => setClick((prev: any) => !prev as any)}
                >
                  Save
                </LoadingButton>
              </Container>
            </div>
          </Container>
        </Box>
      </Box>
      <ToastContainer />
    </ThemeProvider>
  );
}
