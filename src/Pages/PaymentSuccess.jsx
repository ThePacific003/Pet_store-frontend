import { useSearchParams, Link } from "react-router-dom";
import { useEffect } from "react";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("orderId");

  useEffect(() => {
    console.log("Payment successful for order:", orderId);
  }, [orderId]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-50 text-center p-4">
      <h1 className="text-3xl font-bold text-green-600 mb-4">Payment Successful 🎉</h1>
      <p className="text-lg mb-6">
        Thank you! Your payment for order <strong>{orderId}</strong> has been completed successfully.
      </p>
      <Link
        to="/shop"
        className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
      >
        Go Back
      </Link>
    </div>
  );
};

export default PaymentSuccess;

