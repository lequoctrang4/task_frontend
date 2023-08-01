import { Button } from "@mui/material";
import TextField from "@mui/material/TextField/TextField";
import Container from "@mui/material/Container";
import { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import ClearIcon from "@mui/icons-material/Clear";
export default function DetailsProduct({
  handleVariantChange,
  index,
  handleChangeImage,
  handleDeleteImage,
  deleteVariant,
}: {
  handleDeleteImage: (index1: number, index2: number) => void;
  handleChangeImage: (index1: number, value: any) => void;
  handleVariantChange: (index: number, field: string, value: any) => void;
  deleteVariant: (index: number) => void;
  index: number;
}) {
  const [selectedFile, setSelectedFile] = useState([] as any);
  const handleSelectedFile = (event: any) => {
    const files: any = Array.from(event.target.files);
    if (files.length === 0) return;
    for (let i = 0; i < files.length; i++) {
      if (files[i].type.split("/")[0] !== "image") continue;
      if (!selectedFile.some((e: any) => e.name == files[i].name)) {
        setSelectedFile((prev: any) => [
          ...prev,
          {
            name: files[i].name,
            url: URL.createObjectURL(files[i]),
          } as any,
        ]);
        const reader = new FileReader();
        reader.readAsDataURL(files[i]);
        reader.onloadend = () => {
          handleChangeImage(index, reader.result);
        };
      }
    }
  };
  function deleteImage(index1: number) {
    setSelectedFile((prev: any) =>
      prev.filter((item: any, i: number) => {
        if (i === index1) URL.revokeObjectURL(item.url);
        return i !== index1;
      })
    );
    handleDeleteImage(index, index1);
  }

  return (
    <>
      <Container
        sx={{
          display: "flex",
          gap: 3,
          justifyContent: "flex-start",
          flexWrap: "wrap",
        }}
      >
        <TextField
          sx={{ width: 180 }}
          id="outlined-basic"
          label="Size"
          variant="outlined"
          onChange={(event) =>
            handleVariantChange(index, "size", event?.target.value)
          }
        />
        <TextField
          sx={{ width: 180 }}
          id="outlined-basic"
          label="Color"
          variant="outlined"
          onChange={(event) =>
            handleVariantChange(index, "color", event?.target.value)
          }
        />
        <TextField
          sx={{ width: 180 }}
          id="outlined-basic"
          label="Price"
          variant="outlined"
          type="number"
          onChange={(event) =>
            handleVariantChange(index, "price", event?.target.value)
          }
        />
        <TextField
          sx={{ width: 180 }}
          id="outlined-basic"
          label="Sale Price"
          type="number"
          variant="outlined"
          onChange={(event) =>
            handleVariantChange(index, "sale_price", event?.target.value)
          }
        />
        <Button
          variant="contained"
          size="large"
          color="info"
          component="label"
          sx={{ height: 50, width: 200 }}
        >
          Upload Image
          <input type="file" hidden multiple onChange={handleSelectedFile} />
        </Button>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 20,
            width: "100%",
            border: "1px solid #ccc",
            height: 100,
            borderRadius: 3,
            padding: 2,
          }}
        >
          {selectedFile &&
            selectedFile.map((item: any, index: number) => (
              <div style={{ position: "relative" }} key={index}>
                <span onClick={() => deleteImage(index)} key={index}>
                  <ClearIcon
                    style={{
                      position: "absolute",
                      cursor: "pointer",
                      right: 10,
                      backgroundColor: "#ccc",
                      borderRadius: 10,
                    }}
                  />
                </span>

                <img src={item.url} style={{ height: "100%" }} />
              </div>
            ))}
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            justifyContent: "flex-end",
          }}
        >
          <Button
            variant="outlined"
            color="error"
            startIcon={<DeleteIcon color="inherit" />}
            sx={{ right: 0 }}
            onClick={() => {deleteVariant(index)}}
          >
            Delete
          </Button>
        </div>
      </Container>
    </>
  );
}
