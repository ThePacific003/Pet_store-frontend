import React from "react";

const AboutUs = () => {
  return (
    <div className="font-sans">
      {/* Hero Section */}
      <section className="relative bg-[var(--c5)] text-white text-center py-20 px-6">
        <h1 className="text-5xl font-bold mb-4">About PetNest 🐾</h1>
        <p className="text-lg max-w-2xl mx-auto">
          We’re more than just a pet store – we’re a community of pet lovers
          dedicated to connecting animals with caring families.
        </p>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-16 px-6 bg-[var(--c2)] text-[var(--c5)] text-center">
        <h2 className="text-3xl font-bold mb-6">Our Mission & Vision</h2>
        <div className="max-w-4xl mx-auto space-y-6">
          <p className="text-lg">
            <span className="font-bold">Mission:</span> To provide a loving home
            for every pet by connecting them with responsible families and offering
            high-quality pet products.
          </p>
          <p className="text-lg">
            <span className="font-bold">Vision:</span> To become the most trusted
            pet adoption and supply platform, where pets and families thrive
            together.
          </p>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-6 text-center">
        <h2 className="text-3xl font-bold text-[var(--c5)] mb-12">Meet Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {/* Team Member 1 */}
          <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2 p-6">
            <img
              src="https://randomuser.me/api/portraits/women/44.jpg"
              alt="Team Member"
              className="w-32 h-32 rounded-full mx-auto mb-4"
            />
            <h3 className="text-xl font-bold text-[var(--c3)]">Emily Carter</h3>
            <p className="text-gray-600 mb-2">Founder & Pet Advocate</p>
            <p className="text-sm text-gray-500">
              Passionate about animal welfare, Emily has dedicated her life to
              rescuing and rehoming pets.
            </p>
          </div>

          {/* Team Member 2 */}
          <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2 p-6">
            <img
              src="https://randomuser.me/api/portraits/men/32.jpg"
              alt="Team Member"
              className="w-32 h-32 rounded-full mx-auto mb-4"
            />
            <h3 className="text-xl font-bold text-[var(--c3)]">James Miller</h3>
            <p className="text-gray-600 mb-2">Veterinary Consultant</p>
            <p className="text-sm text-gray-500">
              James ensures every pet listed is healthy and provides expert
              guidance on pet care.
            </p>
          </div>

          {/* Team Member 3 */}
          <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2 p-6">
            <img
              src="https://randomuser.me/api/portraits/women/68.jpg"
              alt="Team Member"
              className="w-32 h-32 rounded-full mx-auto mb-4"
            />
            <h3 className="text-xl font-bold text-[var(--c3)]">Sophia Lee</h3>
            <p className="text-gray-600 mb-2">Adoption Coordinator</p>
            <p className="text-sm text-gray-500">
              Sophia matches pets with the right families, making sure each adoption
              is a perfect fit.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-[var(--c1)] text-white py-16 text-center">
        <h2 className="text-3xl font-bold mb-4">Join the PetNest Family</h2>
        <p className="max-w-2xl mx-auto mb-6">
          Whether you’re adopting a new friend or shopping for your furry buddy,
          you’re helping us create a world where every pet is loved. 💕
        </p>
        <button className="bg-[var(--c2)] text-[var(--c5)] px-6 py-3 rounded-full font-semibold hover:bg-white hover:text-[var(--c3)] transition">
          Get Started
        </button>
      </section>

      {/* Footer */}
      <footer className="bg-[var(--c5)] text-white text-center py-6">
        <p>© 2025 PetNest | Bringing pets & families together 🐾</p>
      </footer>
    </div>
  );
};

export default AboutUs;
