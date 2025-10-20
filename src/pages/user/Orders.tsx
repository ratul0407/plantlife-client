const Orders = () => {
  return (
    <div>
      <h1 className="bg-green-700 py-6 text-center text-2xl font-bold text-white lg:text-5xl">
        Your Orders
      </h1>
      <main className="grid min-h-[calc(100vh-200px)] items-center justify-center">
        <h3 className="px-12 text-center text-3xl font-bold text-gray-400">
          No orders placed yet :(
        </h3>
      </main>
    </div>
  );
};

export default Orders;
