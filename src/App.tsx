import "./App.css";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";

function App() {
  const initialOptions = {
    clientId:
      "AUyK4U2obgaatBOxn6dL7KRFMV9dxUYDZoLCmw9CkUOW6-4WQVVJOKoI4_GO3-tH7jZZnTSVBRPmPqoR",
    currency: "USD",
    intent: "capture",
  };

  const amount = "100.00";

  return (
    <>
      <PayPalScriptProvider options={initialOptions}>
        <PayPalButtons
          fundingSource="paypal"
          createOrder={(data, actions) => {
            return actions.order.create({
              intent: "CAPTURE",
              purchase_units: [
                {
                  amount: {
                    currency_code: "USD",
                    value: Number(amount).toFixed(2),
                  },
                  // payee: {
                  //   email_address: "seller1@example.com", // therapist account
                  // },
                },
                // {
                //   amount: {
                //     currency_code: "USD",
                //     value: ((Number(amount) * 30) / 100).toFixed(2),
                //   },
                //   payee: {
                //     email_address: "seller2@example.com", // our account.
                //   },
                // },
              ],
            });
          }}
          onApprove={(data, actions: any) => {
            return actions.order.capture().then((details: any) => {
              console.log(
                "Transaction completed by " + details.payer.name.given_name,
                "with capture id : ",
                details
              );
              alert("Transaction completed");
              // Handle the transaction completion
            });
          }}
        />
      </PayPalScriptProvider>
      {/* <Paypal /> */}
    </>
  );
}

export default App;
