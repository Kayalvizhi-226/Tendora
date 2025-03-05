import React from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Typography } from "@mui/material";

const PaymentSuccessPopup = ({ open, handleClose }) => {
  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Typography variant="h5" align="center" fontWeight="bold" color="green">
          🎉 Order placed successfully
        </Typography>
      </DialogTitle>
      
      <DialogContent>
      <div style={{
  display: "flex", justifyContent: "center", alignItems: "center", marginTop: "10px"
}}>
  <svg width="120" height="120" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" fill="#4CAF50"/>
    <path d="M7 12l3 3 6-6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
</div>

        <Typography align="center" variant="body1">
          Thank you for your purchase. Your order has been placed successfully!
        </Typography>
      </DialogContent>

      <DialogActions sx={{ justifyContent: "center" }}>
        <Button variant="contained" color="primary" onClick={handleClose}>
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PaymentSuccessPopup;
