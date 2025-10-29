import React from "react";
import { Link } from "react-router-dom";
import Recommendation from "../Components/Recommendation";

const HomePage = () => {
  return (
    <div className="font-sans">
      {/* Hero Section */}
      <section className="relative bg-[var(--c5)] text-white text-center py-20 md:py-28 px-4 md:px-6">
        <h1 className="text-3xl md:text-5xl font-bold mb-4">Welcome to PetNest 🐾</h1>
        <p className="text-base md:text-lg mb-8 max-w-2xl mx-auto px-2">
          Your one-stop destination for adopting pets, shopping supplies, and giving
          animals a loving home.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            to="/shop"
            className="bg-[var(--c2)] text-[var(--c5)] px-6 py-3 rounded-full font-semibold hover:bg-white hover:text-[var(--c3)] transition"
          >
            Shop Now
          </Link>
          <Link
            to="/adopt"
            className="border-2 border-[var(--c2)] text-[var(--c2)] px-6 py-3 rounded-full font-semibold hover:bg-[var(--c2)] hover:text-[var(--c5)] transition"
          >
            Adopt a Friend
          </Link>
        </div>
      </section>

      {/* Categories Section */}
      <section className="bg-[var(--c2)] py-14 text-center px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-[var(--c5)] mb-8">Our Categories</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 md:gap-6 max-w-6xl mx-auto">
          {["Dogs 🐶", "Cats 🐱","Rabbits 🐇", "Guinea Pigs 🐹", "Fishes 🐠"].map((cat, i) => (
            <div
              key={i}
              className="bg-[var(--c1)] text-white py-6 md:py-8 rounded-xl font-semibold text-sm md:text-lg hover:bg-[var(--c5)] transition transform hover:-translate-y-2 shadow-md"
            >
              {cat}
            </div>
          ))}
        </div>
      </section>

      {/* Featured Section */}
      <section className="py-14 md:py-20 px-4 md:px-6 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-[var(--c5)] mb-8 md:mb-12">
          Featured Pets & Products
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-10 max-w-6xl mx-auto">
          {/* Card 1 */}
          <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2 p-4 md:p-6">
            <img
              src="https://placekitten.com/300/200"
              alt="Cat"
              className="rounded-lg mb-4 w-full h-48 object-cover"
            />
            <h3 className="text-lg md:text-xl font-bold text-[var(--c3)] mb-2">Persian Cat</h3>
            <p className="text-gray-600 mb-4 text-sm md:text-base">Friendly & playful companion.</p>
            <Link
              to="/adopt"
              className="bg-[var(--c2)] text-[var(--c5)] px-4 py-2 md:px-5 md:py-2 rounded-full hover:bg-[var(--c3)] hover:text-white transition"
            >
              Adopt Now
            </Link>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2 p-4 md:p-6">
            <img
              src="https://placedog.net/300/200"
              alt="Dog"
              className="rounded-lg mb-4 w-full h-48 object-cover"
            />
            <h3 className="text-lg md:text-xl font-bold text-[var(--c3)] mb-2">Golden Retriever</h3>
            <p className="text-gray-600 mb-4 text-sm md:text-base">Loyal and perfect family dog.</p>
            <Link
              to="/adopt"
              className="bg-[var(--c2)] text-[var(--c5)] px-4 py-2 md:px-5 md:py-2 rounded-full hover:bg-[var(--c3)] hover:text-white transition"
            >
              Adopt Now
            </Link>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2 p-4 md:p-6">
            <img
              src="https://picsum.photos/300/200?random=1"
              alt="Pet Food"
              className="rounded-lg mb-4 w-full h-48 object-cover"
            />
            <h3 className="text-lg md:text-xl font-bold text-[var(--c3)] mb-2">Pet Food</h3>
            <p className="text-gray-600 mb-4 text-sm md:text-base">
              Nutritious & healthy meals for pets.
            </p>
            <Link
              to="/shop"
              className="bg-[var(--c2)] text-[var(--c5)] px-4 py-2 md:px-5 md:py-2 rounded-full hover:bg-[var(--c3)] hover:text-white transition"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </section>

      {/* Recommendation section */}

      <section className="bg-[var(--c4)] py-20 px-6 text-center text-white">
        <Recommendation/>
      </section>

      {/* About Section */}
      <section className="bg-[var(--c1)] text-white py-16 md:py-20 px-4 md:px-6 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-[var(--c2)] mb-4 md:mb-6">Why Choose PetNest?</h2>
        <p className="max-w-3xl mx-auto text-base md:text-lg">
          At PetNest, we believe pets are family. We help you find the perfect furry
          (or finned!) companion and provide all the essentials for their happy life.
        </p>
      </section>

      {/* Footer */}
      <footer className="bg-[var(--c5)] text-white text-center py-4 md:py-6 px-2">
        <p className="text-sm md:text-base">© 2025 PetNest | Made with ❤️ for pet lovers</p>
      </footer>
    </div>
  );
};

export default HomePage;
