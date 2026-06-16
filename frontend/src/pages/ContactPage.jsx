function ContactPage() {
  return (
    <div className="min-h-screen bg-slate-50">

      <section className="bg-blue-600 text-white py-20">
        <div className="max-w-6xl mx-auto px-8 text-center">
          <h1 className="text-5xl font-bold mb-4">
            Contact Us
          </h1>
          <p className="text-lg">
            Get in touch with our team for support and business inquiries.
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-8 py-16">

        <div className="grid md:grid-cols-2 gap-10">

          <div className="bg-white p-8 rounded-3xl shadow-sm">

            <h2 className="text-3xl font-bold mb-8">
              Contact Information
            </h2>

            <div className="space-y-6">

              <div>
                <h3 className="font-semibold">📧 Email</h3>
                <p className="text-slate-600">
                  support@shnoor.com
                </p>
              </div>

              <div>
                <h3 className="font-semibold">📞 Phone</h3>
                <p className="text-slate-600">
                  +91 98765 43210
                </p>
              </div>

              <div>
                <h3 className="font-semibold">📍 Location</h3>
                <p className="text-slate-600">
                  Mumbai, India
                </p>
              </div>

              <div>
                <h3 className="font-semibold">🕒 Working Hours</h3>
                <p className="text-slate-600">
                  Monday - Friday
                  <br />
                  9:00 AM - 6:00 PM
                </p>
              </div>

            </div>

          </div>

          <div className="bg-white p-8 rounded-3xl shadow-sm">

            <h2 className="text-3xl font-bold mb-8">
              Send Message
            </h2>

            <form className="space-y-4">

              <input
                type="text"
                placeholder="Full Name"
                className="w-full border p-4 rounded-xl"
              />

              <input
                type="email"
                placeholder="Email Address"
                className="w-full border p-4 rounded-xl"
              />

              <input
                type="text"
                placeholder="Company Name"
                className="w-full border p-4 rounded-xl"
              />

              <textarea
                rows="5"
                placeholder="Your Message"
                className="w-full border p-4 rounded-xl"
              />

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-4 rounded-xl"
              >
                Send Message
              </button>

            </form>

          </div>

        </div>

      </section>

    </div>
  );
}

export default ContactPage;
