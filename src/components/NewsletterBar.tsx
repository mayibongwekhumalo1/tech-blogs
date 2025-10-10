"use client"

import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import { useState } from "react";

export default function NewsletterBar() {
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
      } else {
        setError(data.error || "Something went wrong");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (success) {
    return (
      <section className="w-full bg-[#eaf1f1] py-8">
        <div className="max-w-6xl mx-auto px-4 flex flex-col lg:flex-row items-center justify-between gap-6">
          {/* Onboarding Message */}
          <div className="flex-1 text-center lg:text-left">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Welcome to Our Newsletter! 🎉
            </h2>
            <p className="text-gray-600">
              Thank you for subscribing! You&apos;ll now receive our latest tech blogs, updates, and exclusive content directly in your inbox. Stay tuned for amazing insights!
            </p>
          </div>

          {/* Right Section - Social Icons */}
          <div className="flex items-center gap-3">
            <span className="font-semibold text-gray-800">Follow Us:</span>
            <div className="flex gap-2">
              <a
                href="#"
                className="bg-[#0b2149] text-white p-2 rounded-full hover:opacity-80 transition"
              >
                <Facebook size={16} />
              </a>
              <a
                href="#"
                className="bg-[#0b2149] text-white p-2 rounded-full hover:opacity-80 transition"
              >
                <Twitter size={16} />
              </a>
              <a
                href="#"
                className="bg-[#0b2149] text-white p-2 rounded-full hover:opacity-80 transition"
              >
                <Instagram size={16} />
              </a>
              <a
                href="#"
                className="bg-[#0b2149] text-white p-2 rounded-full hover:opacity-80 transition"
              >
                <Linkedin size={16} />
              </a>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full bg-[#eaf1f1] py-8">
      <div className="max-w-6xl mx-auto px-4 flex flex-col lg:flex-row items-center justify-between gap-6">
        {/* Left Section - Text */}
        <h2 className="text-lg font-semibold text-gray-800 whitespace-nowrap">
          Get Our Latest <br className="hidden md:block" />
          <span className="text-gray-900">News & Update</span>
        </h2>

        {/* Center Section - Form */}
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center gap-3 flex-grow justify-center text-gray-900">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="px-4 py-2 w-48 md:w-56 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-400 text-sm text-gray-900 placeholder:text-gray-500"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="E-mail"
            value={formData.email}
            onChange={handleChange}
            className="px-4 py-2 w-48 md:w-56 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-400 text-sm text-gray-900 placeholder:text-gray-500"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-red-400 hover:bg-red-500 disabled:bg-red-300 text-white font-semibold px-5 py-2 rounded-md text-sm transition-colors"
          >
            {loading ? "Submitting..." : "Submit Now"}
          </button>
        </form>

        {/* Right Section - Social Icons */}
        <div className="flex items-center gap-3">
          <span className="font-semibold text-gray-800">Follow Us:</span>
          <div className="flex gap-2">
            <a
              href="#"
              className="bg-[#0b2149] text-white p-2 rounded-full hover:opacity-80 transition"
            >
              <Facebook size={16} />
            </a>
            <a
              href="#"
              className="bg-[#0b2149] text-white p-2 rounded-full hover:opacity-80 transition"
            >
              <Twitter size={16} />
            </a>
            <a
              href="#"
              className="bg-[#0b2149] text-white p-2 rounded-full hover:opacity-80 transition"
            >
              <Instagram size={16} />
            </a>
            <a
              href="#"
              className="bg-[#0b2149] text-white p-2 rounded-full hover:opacity-80 transition"
            >
              <Linkedin size={16} />
            </a>
          </div>
        </div>
      </div>
      {error && (
        <div className="max-w-6xl mx-auto px-4 mt-4">
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      )}
    </section>
  );
}
