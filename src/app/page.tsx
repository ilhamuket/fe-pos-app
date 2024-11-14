import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-base-200 p-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-primary">POS Application</h1>
        <p className="text-xl text-gray-600">Manage your sales and transactions</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Card for Sales Overview */}
        <div className="card w-full bg-primary text-white shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Total Sales</h2>
            <p className="text-3xl font-bold">$12,340</p>
            <p className="text-sm">Today's total sales</p>
            <div className="mt-4">
              <Image
                src="https://placeimg.com/300/200/any"
                alt="Sales"
                width={300}
                height={200}
              />
            </div>
          </div>
        </div>

        {/* Card for New Orders */}
        <div className="card w-full bg-info text-white shadow-xl">
          <div className="card-body">
            <h2 className="card-title">New Orders</h2>
            <p className="text-3xl font-bold">5</p>
            <p className="text-sm">Pending orders to be processed</p>
            <div className="mt-4">
              <Image
                src="https://placeimg.com/300/200/any"
                alt="Orders"
                width={300}
                height={200}
              />
            </div>
          </div>
        </div>

        {/* Card for Stock Overview */}
        <div className="card w-full bg-success text-white shadow-xl">
          <div className="card-body">
            <h2 className="card-title">In Stock</h2>
            <p className="text-3xl font-bold">150 Items</p>
            <p className="text-sm">Available stock in inventory</p>
            <div className="mt-4">
              <Image
                src="https://placeimg.com/300/200/any"
                alt="Inventory"
                width={300}
                height={200}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold text-center mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <a
            href="#"
            className="btn btn-lg btn-accent w-full flex items-center justify-between"
          >
            <span>Create New Order</span>
            <Image
              src="https://placeimg.com/24/24/any"
              alt="Create"
              width={24}
              height={24}
            />
          </a>
          <a
            href="#"
            className="btn btn-lg btn-secondary w-full flex items-center justify-between"
          >
            <span>View Transactions</span>
            <Image
              src="https://placeimg.com/24/24/any"
              alt="Transactions"
              width={24}
              height={24}
            />
          </a>
          <a
            href="#"
            className="btn btn-lg btn-warning w-full flex items-center justify-between"
          >
            <span>Inventory Management</span>
            <Image
              src="https://placeimg.com/24/24/any"
              alt="Inventory"
              width={24}
              height={24}
            />
          </a>
        </div>
      </div>
    </div>
  );
}
