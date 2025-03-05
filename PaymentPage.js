import React, { useState } from "react";
import { Button, Typography, Box } from "@mui/material";
import PaymentSuccessPopup from "./PaymentSuccessPopup";

const PaymentPage = () => {
  const [openPopup, setOpenPopup] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState("");

  const handlePayment = (method) => {
    setSelectedPayment(method);
    setOpenPopup(true);
  };

  return (
    <Box style={{ textAlign: "center", marginTop: "20px" }}>
      <Typography variant="h5" fontWeight="bold" mb={2}>
        Select Payment Method
      </Typography>

      {/* Payment Buttons */}
      <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
      <Button variant="contained" color="success" onClick={() => handlePayment("UPI")}>
  Pay with UPI
</Button>
<Button variant="contained" color="success" onClick={() => handlePayment("Card")}>
  Pay with Credit/Debit Card
</Button>
<Button variant="contained" color="success" onClick={() => handlePayment("Net Banking")}>
  Pay with Net Banking
</Button>
<Button variant="contained" color="success" onClick={() => handlePayment("COD")}>
  Cash on Delivery (COD)
</Button>

      </Box>

      {/* Payment Success Modal */}
      <PaymentSuccessPopup 
  open={openPopup} 
  handleClose={() => setOpenPopup(false)} 
  paymentMethod={selectedPayment}  // ✅ Pass selectedPayment
/>

    </Box>
  );
};

export default PaymentPage;
