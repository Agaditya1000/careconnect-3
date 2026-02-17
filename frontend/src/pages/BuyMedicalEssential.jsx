import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { ShoppingCart, CreditCard, Truck, Check, Clock, Shield, Zap } from 'lucide-react';
import { AppContext } from '../context/AppContext';

export default function BuyMedicalEssentials() {
  const { products, currencySymbol, placeOrder } = useContext(AppContext);
  const [cart, setCart] = useState([]);
  const [isCheckout, setIsCheckout] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();

  const addToCart = (product) => {
    const existingItem = cart.find((item) => item.product._id === product._id);
    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.product._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { product, quantity: 1 }]);
    }
    toast.success(`${product.name} added to cart!`);
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter((item) => item.product._id !== productId));
    toast.success('Item removed from cart!');
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.product.price * item.quantity, 0).toFixed(2);
  };

  const onSubmitCheckout = (data) => {
    console.log('Checkout Data:', data);
    toast.success('Order placed successfully!');
    setCart([]);
    setIsCheckout(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* 10 Minute Delivery Banner */}
        <div className="bg-gradient-to-r from-blue-600 to-green-500 rounded-xl p-6 mb-8 text-white">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center mb-4 md:mb-0">
              <Zap className="h-12 w-12 mr-4 animate-pulse" />
              <div>
                <h2 className="text-2xl md:text-3xl font-bold flex items-center">
                  <Clock className="mr-2" /> 10 Minute Emergency Delivery!
                </h2>
                <p className="text-lg mt-1">Life-saving essentials at your doorstep in minutes</p>
              </div>
            </div>
            <div className="flex items-center bg-white/20 rounded-lg p-3">
              <Shield className="h-8 w-8 mr-2" />
              <p className="text-sm font-medium">Sanitized & Contactless Delivery</p>
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-3">
              <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-full mr-3">
                <Check className="h-5 w-5 text-blue-600 dark:text-blue-300" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white">Lightning Fast</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              "Received my order in just 8 minutes when I needed it most. Truly life-saving service!"
              <span className="block mt-2 font-medium">- Priya K., Mumbai</span>
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-3">
              <div className="bg-green-100 dark:bg-green-900 p-2 rounded-full mr-3">
                <Truck className="h-5 w-5 text-green-600 dark:text-green-300" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white">Reliable Service</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              "Even during lockdown, they delivered my mother's medicines within 10 minutes. Amazing!"
              <span className="block mt-2 font-medium">- Rajesh T., Delhi</span>
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-3">
              <div className="bg-purple-100 dark:bg-purple-900 p-2 rounded-full mr-3">
                <Shield className="h-5 w-5 text-purple-600 dark:text-purple-300" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white">Safe & Secure</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              "All products were properly sealed and the delivery executive maintained full safety protocols."
              <span className="block mt-2 font-medium">- Ananya S., Bangalore</span>
            </p>
          </div>
        </div>

        {/* How It Works */}
        <div className="mb-12 bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            How Our 10 Minute Delivery Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-blue-100 dark:bg-blue-900 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-3">
                <span className="text-2xl font-bold text-blue-600 dark:text-blue-300">1</span>
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white">Order Online</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">
                Select your medical essentials
              </p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 dark:bg-green-900 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-3">
                <span className="text-2xl font-bold text-green-600 dark:text-green-300">2</span>
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white">Nearest Pharmacy</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">
                Our system automatically assigns the closest store
              </p>
            </div>
            <div className="text-center">
              <div className="bg-yellow-100 dark:bg-yellow-900 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-3">
                <span className="text-2xl font-bold text-yellow-600 dark:text-yellow-300">3</span>
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white">Dispatch Rider</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">
                Dedicated rider picks up immediately
              </p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 dark:bg-purple-900 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-3">
                <span className="text-2xl font-bold text-purple-600 dark:text-purple-300">4</span>
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white">Fast Delivery</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">
                At your doorstep in 10 minutes or less
              </p>
            </div>
          </div>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Shop Medical Essentials</h1>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover"
                onError={(e) => {
                  e.target.src = '/images/fallback.jpg';
                }}
              />
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{product.name}</h2>
                <p className="text-gray-600 dark:text-gray-300 mt-2">{currencySymbol}{product.price.toFixed(2)}</p>
                <p className="text-gray-500 dark:text-gray-400 text-sm">{product.category}</p>
                <button
                  onClick={() => addToCart(product)}
                  className="mt-4 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Shopping Cart */}
        <div className="mt-12 bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            <ShoppingCart className="inline-block mr-2" />
            Shopping Cart
          </h2>
          {cart.length === 0 ? (
            <p className="text-gray-600 dark:text-gray-300">Your cart is empty.</p>
          ) : (
            <>
              <div className="space-y-4">
                {cart.map((item) => (
                  <div key={item.product._id} className="flex justify-between items-center">
                    <div className="flex items-center">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-12 h-12 object-cover rounded-md"
                        onError={(e) => {
                          e.target.src = '/images/fallback.jpg';
                        }}
                      />
                      <div className="ml-4">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{item.product.name}</h3>
                        <p className="text-gray-600 dark:text-gray-300">{currencySymbol}{item.product.price.toFixed(2)} x {item.quantity}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.product._id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
              <div className="mt-6 border-t border-gray-200 dark:border-gray-700 pt-6">
                <p className="text-xl font-bold text-gray-900 dark:text-white">
                  Total: ₹{calculateTotal()}
                </p>
                <button
                  onClick={() => setIsCheckout(true)}
                  className="mt-4 w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700"
                >
                  Proceed to Checkout
                </button>
              </div>
            </>
          )}
        </div>

        {/* Checkout Form */}
        {isCheckout && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                <CreditCard className="inline-block mr-2" />
                Checkout
              </h2>
              <form onSubmit={handleSubmit(onSubmitCheckout)} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    {...register('name', { required: 'Name is required' })}
                    className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="John Doe"
                  />
                  {errors.name && (
                    <p className="text-sm text-red-600 dark:text-red-400 mt-1">{errors.name.message}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Address
                  </label>
                  <input
                    type="text"
                    {...register('address', { required: 'Address is required' })}
                    className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="123 Main St"
                  />
                  {errors.address && (
                    <p className="text-sm text-red-600 dark:text-red-400 mt-1">{errors.address.message}</p>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      City
                    </label>
                    <input
                      type="text"
                      {...register('city', { required: 'City is required' })}
                      className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      placeholder="New York"
                    />
                    {errors.city && (
                      <p className="text-sm text-red-600 dark:text-red-400 mt-1">{errors.city.message}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      State
                    </label>
                    <input
                      type="text"
                      {...register('state', { required: 'State is required' })}
                      className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      placeholder="NY"
                    />
                    {errors.state && (
                      <p className="text-sm text-red-600 dark:text-red-400 mt-1">{errors.state.message}</p>
                    )}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    ZIP Code
                  </label>
                  <input
                    type="text"
                    {...register('zip', { required: 'ZIP Code is required' })}
                    className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="10001"
                  />
                  {errors.zip && (
                    <p className="text-sm text-red-600 dark:text-red-400 mt-1">{errors.zip.message}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Payment Method
                  </label>
                  <select
                    {...register('paymentMethod', { required: 'Payment method is required' })}
                    className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  >
                    <option value="">Select Payment Method</option>
                    <option value="credit_card">Credit Card</option>
                    <option value="debit_card">Debit Card</option>
                    <option value="paypal">PayPal</option>
                  </select>
                  {errors.paymentMethod && (
                    <p className="text-sm text-red-600 dark:text-red-400 mt-1">{errors.paymentMethod.message}</p>
                  )}
                </div>
                <div className="flex justify-end gap-4">
                  <button
                    type="button"
                    onClick={() => setIsCheckout(false)}
                    className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                  >
                    Place Order
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
      {/* Footer */}
      <footer className="mt-20 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center md:text-left">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">CareConnect</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">Your trusted partner in healthcare.</p>
            </div>
            <div className="text-center md:text-left">
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Quick Links</h4>
              <ul className="mt-2 space-y-2">
                <li><a href="/privacy-policy" className="text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600">Privacy Policy</a></li>
                <li><a href="/terms-of-service" className="text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600">Terms of Service</a></li>
                <li><a href="/contact" className="text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600">Contact Us</a></li>
              </ul>
            </div>
            <div className="text-center md:text-left">
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Contact Us</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">📧 support@careconnect.com</p>
              <p className="text-sm text-gray-600 dark:text-gray-300">📞 +1 (123) 456-7890</p>
              <p className="text-sm text-gray-600 dark:text-gray-300">📍 123 Health St, Wellness City, HC 56789</p>
            </div>
          </div>
          <div className="mt-8 text-center text-sm text-gray-600 dark:text-gray-300">
            &copy; {new Date().getFullYear()} CareConnect. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}