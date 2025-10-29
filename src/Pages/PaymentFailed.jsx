import { Link } from "react-router-dom";

const PaymentFailed = () => (
  <div className="flex flex-col items-center justify-center min-h-screen bg-red-50 text-center p-4">
    <h1 className="text-3xl font-bold text-red-600 mb-4">Payment Failed ❌</h1>
    <p className="text-lg mb-6">
      Something went wrong or you cancelled the payment.
    </p>
    <Link to="/cart" className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition">
      Try Again
    </Link>
  </div>
);

export default PaymentFailed;
