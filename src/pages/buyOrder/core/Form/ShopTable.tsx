import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";

export const shoplist = [
  {
    shopname: 1,
    quantity: "10kg",
  },
  {
    shopname: 5,
    quantity: "30kg",
  },
  {
    shopname: 16,
    quantity: "30kg",
  },
  {
    shopname: 5,
    quantity: "30kg",
  },
  {
    shopname: 16,
    quantity: "30kg",
  },
];

const ShopTable = () => {
  const [visibleItems, setVisibleItems] = useState(2); // Start with 2 items

  const handleViewMore = () => {
    setVisibleItems(shoplist.length); // Show all items
  };

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Shop Name</TableCell>
            <TableCell>Quantity</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {shoplist.slice(0, visibleItems).map((shop, index) => (
            <TableRow key={index}>
              <TableCell>{shop.shopname}</TableCell>
              <TableCell>{shop.quantity}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {visibleItems < shoplist.length && (
        <Button onClick={handleViewMore} style={{ marginTop: "10px" }}>
          View More
        </Button>
      )}
    </TableContainer>
  );
};

export default ShopTable;
