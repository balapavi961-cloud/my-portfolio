import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaLinkedin } from 'react-icons/fa';
import emailjs from '@emailjs/browser';

// ─── Replace these with your real EmailJS credentials ────────────────────────
const EMAILJS_SERVICE_ID  = 'service_nybi6rr';
const EMAILJS_TEMPLATE_ID = 'template_ho2u1ck';
const EMAILJS_PUBLIC_KEY  = '_28kJW069ffc9kgmz';
// ─────────────────────────────────────────────────────────────────────────────

const Contact = () => {
  const formRef = useRef(null);
  const [formData, setFormData] = useState({ from_name: '', from_email: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | loading | success | error

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.from_name || !formData.from_email || !formData.message) return;

    setStatus('loading');
    try {
      await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        formRef.current,
        EMAILJS_PUBLIC_KEY
      );
      setStatus('success');
      setFormData({ from_name: '', from_email: '', message: '' });
    } catch (err) {
      console.error('EmailJS error:', err);
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="section-container bg-light/50 pb-0">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden mb-24 border border-slate-100">
          <div className="grid md:grid-cols-2">

            {/* Contact Information */}
            <div className="bg-primary-900 text-white p-10 md:p-14 flex flex-col justify-between relative overflow-hidden">
              {/* Decorative Circles */}
              <div className="absolute top-0 right-0 -tranglate-y-12 translate-x-1/3 w-64 h-64 bg-primary-800 rounded-full blur-3xl opacity-50"></div>
              <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/3 w-64 h-64 bg-primary-700 rounded-full blur-3xl opacity-50"></div>

              <div className="relative z-10">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Let's Connect</h2>
                <p className="text-primary-100 mb-12 max-w-sm">
                  I'm currently looking for new opportunities in Product Design and Engineering. Feel free to reach out!
                </p>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <FaPhoneAlt className="w-6 h-6 text-primary-300 mt-1" />
                    <div>
                      <p className="text-sm text-primary-200 font-medium">Phone</p>
                      <a href="tel:+916379097362" className="text-lg hover:text-primary-300 transition-colors">+91 63790 97362</a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <FaEnvelope className="w-6 h-6 text-primary-300 mt-1" />
                    <div>
                      <p className="text-sm text-primary-200 font-medium">Email</p>
                      <a href="mailto:srinimurali121@gmail.com" className="text-lg hover:text-primary-300 transition-colors">srinimurali121@gmail.com</a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <FaMapMarkerAlt className="w-6 h-6 text-primary-300 mt-1" />
                    <div>
                      <p className="text-sm text-primary-200 font-medium">Location</p>
                      <p className="text-lg">Salem, Tamil Nadu, India</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-12 relative z-10">
                <p className="text-sm text-primary-200 font-medium mb-4">Social Profiles</p>
                <div className="flex gap-4">
                  <a
                    href="https://www.linkedin.com/in/muralikrishnan-srinivasan-6214aa27b"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary-600 transition-colors"
                    aria-label="LinkedIn"
                  >
                    <FaLinkedin className="w-6 h-6" />
                  </a>
                  <a
                    href="mailto:srinimurali121@gmail.com"
                    className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary-600 transition-colors"
                    aria-label="Email"
                  >
                    <FaEnvelope className="w-6 h-6" />
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="p-10 md:p-14 bg-white">
              <h3 className="text-2xl font-bold text-dark mb-6">Send me a message</h3>

              <form ref={formRef} className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="from_name" className="block text-sm font-medium text-slate-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    id="from_name"
                    name="from_name"
                    value={formData.from_name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label htmlFor="from_email" className="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
                  <input
                    type="email"
                    id="from_email"
                    name="from_email"
                    value={formData.from_email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-2">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="4"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all resize-none"
                    placeholder="Your message here..."
                  ></textarea>
                </div>

                {/* Feedback Messages */}
                {status === 'success' && (
                  <div className="flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 rounded-lg px-4 py-3 text-sm font-medium">
                    ✅ Message sent successfully! I'll get back to you soon.
                  </div>
                )}
                {status === 'error' && (
                  <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 text-sm font-medium">
                    ❌ Something went wrong. Please try again or email me directly.
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {status === 'loading' ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    'Send Message'
                  )}
                </button>
              </form>
            </div>

          </div>
        </div>
      </motion.div>

      {/* Footer */}
      <footer className="border-t border-slate-200 py-8 text-center bg-white">
        <p className="text-slate-500 text-sm">
          &copy; {new Date().getFullYear()} Muralikrishnan Srinivasan. All rights reserved.
        </p>
      </footer>
    </section>
  );
};

export default Contact;
