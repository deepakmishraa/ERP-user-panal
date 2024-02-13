import React, { useState } from "react";
import { Avatar, Box, Stack, Typography, Button } from "@mui/material";
// import OutlineInput from "../../../../core/InputField"; // Adjust import paths as needed
import { OutlineInput } from "../../../../core/InputField";
import WType from "../../../../core/WType";
import Contained from "../../../../core/Button/Contained";
import Tosted from "../../../../core/Tosted";
// import useIsUserStore from "../../../../store/isUser"; // Assuming use if needed

interface IShopItem {
  shopNo: string;
  quantity: string;
  weightType: string;
  nameValid: { isValid: boolean; message: string };
  sTypeValid: { isValid: boolean; message: string };
}

interface IProps {
  handleClose: () => void;
  data: any; // Assuming data has a structure, adjust accordingly
}

const TUpdateForm = ({ handleClose, data }: IProps) => {
  const [shopItems, setShopItems] = useState<IShopItem[]>([
    {
      shopNo: "",
      quantity: "",
      weightType: "kilogram",
      nameValid: { isValid: false, message: "" },
      sTypeValid: { isValid: false, message: "" },
    },
  ]);

  const [state, setState] = useState({
    loader: false,
    tosted: false,
    severity: undefined,
    message: "",
  });

  const handleShopItemChange = (
    index: number,
    field: keyof IShopItem,
    value: string
  ) => {
    const newShopItems = [...shopItems];
    if (field === "shopNo" || field === "quantity") {
      newShopItems[index][field] = value;
      // Validation can be adjusted here
    } else if (field === "weightType") {
      newShopItems[index][field] = value;
    }
    setShopItems(newShopItems);
  };

  const handleAddShopItem = () => {
    setShopItems([
      ...shopItems,
      {
        shopNo: "",
        quantity: "",
        weightType: "kilogram",
        nameValid: { isValid: false, message: "" },
        sTypeValid: { isValid: false, message: "" },
      },
    ]);
  };

  const handleRemoveShopItem = (index: number) => {
    if (shopItems.length > 1) {
      const newShopItems = [...shopItems];
      newShopItems.splice(index, 1);
      setShopItems(newShopItems);
    } else {
      // Optionally show an error message or toast notification here
      console.log("Cannot remove the last item.");
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    // Process submission here, using `shopItems` state
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        {shopItems.map((item, index) => (
          <div key={index}>
            <OutlineInput
              value={item.shopNo}
              type="text"
              label="Shop No"
              handleInputChange={(e) =>
                handleShopItemChange(index, "shopNo", e.target.value)
              }
              error={
                item.nameValid.isValid ? item.nameValid.message : undefined
              }
              disabled={state.loader}
            />
            <Stack direction={"row"} gap={"20px"}>
              <OutlineInput
                value={item.quantity}
                type="text"
                label="Quantity"
                handleInputChange={(e) =>
                  handleShopItemChange(index, "quantity", e.target.value)
                }
                error={
                  item.nameValid.isValid ? item.nameValid.message : undefined
                }
                disabled={state.loader}
              />
              <WType
                uRole={item.weightType}
                handleChange={(e) =>
                  handleShopItemChange(index, "weightType", e.target.value)
                }
                error={
                  item.sTypeValid.isValid ? item.sTypeValid.message : undefined
                }
              />
              <Button onClick={() => handleRemoveShopItem(index)}>
                Remove
              </Button>
            </Stack>
          </div>
        ))}
        <Button onClick={handleAddShopItem} style={{ marginTop: "10px" }}>
          Add More
        </Button>
        <br />
        <Box textAlign={"center"} pt={1}>
          <Contained
            type="submit"
            variant="text"
            disabled={false}
            loader={false}
          >
            Update Now
          </Contained>
        </Box>
      </form>
      {/* Tosted and other components */}
    </>
  );
};

export default TUpdateForm;
