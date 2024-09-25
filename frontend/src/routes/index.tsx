import React from 'react';
import { Link, createFileRoute } from '@tanstack/react-router';
import { motion } from 'framer-motion';
import { ChevronRight, Upload, Edit, Briefcase, Zap, Download, Star, FileText } from 'lucide-react';

export const Route = createFileRoute('/')({
  component: Index,
});

function Index() {
  const features = [
    {
      icon: <Zap className="h-8 w-8 text-primary-500" />,
      title: 'Zero LaTeX Knowledge Required',
      description: 'Our intelligent system handles all the complex LaTeX formatting, so you don\'t have to.',
    },
    {
      icon: <Star className="h-8 w-8 text-secondary-500" />,
      title: 'FAANG-Approved Templates',
      description: 'Choose from battle-tested resume templates that land jobs at top Fortune 500 companies.',
    },
    {
      icon: <Upload className="h-8 w-8 text-primary-500" />,
      title: 'AI-Powered Resume Conversion',
      description: 'Upload your existing resume and watch our AI transform it into a LaTeX masterpiece.',
    },
    {
      icon: <Edit className="h-8 w-8 text-secondary-500" />,
      title: 'AI-Assisted Resume Creation',
      description: 'Starting from scratch? Our AI guide helps you craft a winning resume, step by step.',
    },
    {
      icon: <Download className="h-8 w-8 text-primary-500" />,
      title: 'Instant PDF Download',
      description: 'Get your polished LaTeX resume as a professional PDF with just one click.',
    },
    {
      icon: <Briefcase className="h-8 w-8 text-secondary-500" />,
      title: 'Skyrocket Your Career',
      description: 'Stand out from the crowd and increase your chances of landing your dream job.',
    },
  ];

  const testimonials = [
    {
      name: 'Sarah J.',
      role: 'Software Engineer at Big Tech Co.',
      quote: 'I uploaded my old resume, and the AI transformed it into a LaTeX marvel. It helped me land interviews at FAANG companies!',
    },
    {
      name: 'Michael C.',
      role: 'Recent Graduate, Now at Fortune 500',
      quote: 'As a newcomer, I used the AI-assisted creation. It guided me through every step, resulting in a resume that got me hired!',
    },
    {
      name: 'Emily R.',
      role: 'Marketing Director, Tech Startup',
      quote: 'The FAANG-approved templates are game-changers. I switched to one and started getting calls from top companies immediately!',
    },
  ];

  return (
    <div className="bg-gradient-to-br from-primary-50 to-secondary-50 min-h-screen">
      <div className="container py-20">
        <header className="text-center mb-20">
          <motion.h1
            className="text-5xl sm:text-6xl font-bold text-primary-800 mb-4 font-display"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            LaTeX Resumes, Simplified
          </motion.h1>
          <motion.p
            className="text-xl sm:text-2xl text-neutral-600 mb-8 font-serif"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Transform your career with FAANG-approved LaTeX resumes. No LaTeX skills required. Upload or create from scratch with AI assistance.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row justify-center items-center gap-4"
          >
            <Link
              to="/templates"
              className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:from-primary-700 hover:to-secondary-700 transition duration-300 inline-flex items-center group shadow-lg hover:shadow-xl"
            >
              Upload Your Resume
              <Upload className="ml-2 h-5 w-5 group-hover:translate-y-[-2px] transition duration-300" />
            </Link>
            <Link
              to="/templates"
              className="bg-white text-primary-600 border-2 border-primary-600 px-8 py-3 rounded-full text-lg font-semibold hover:bg-primary-50 transition duration-300 inline-flex items-center group shadow-lg hover:shadow-xl"
            >
              Create with AI
              <Zap className="ml-2 h-5 w-5 group-hover:translate-y-[-2px] transition duration-300" />
            </Link>
          </motion.div>
        </header>

        <section id="features" className="mb-20">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-primary-800 mb-12 font-display">
            Why Our LaTeX Resume Builder is Your Secret Weapon
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition duration-300 border-t-4 border-primary-500"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2 text-primary-700 font-display">{feature.title}</h3>
                <p className="text-neutral-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white py-16 rounded-xl mb-20">
          <div className="container">
            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 font-display">Your Path to Success</h2>
            <div className="flex flex-col md:flex-row justify-between items-center space-y-8 md:space-y-0 md:space-x-8">
              <motion.div
                className="flex-1 text-center"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="bg-white text-primary-600 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4 text-3xl font-bold font-display">
                  1
                </div>
                <h3 className="text-2xl font-semibold mb-2 font-display">Choose Your Path</h3>
                <p className="text-lg">Upload your resume or let our AI guide you from scratch.</p>
              </motion.div>
              <motion.div
                className="flex-1 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="bg-white text-primary-600 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4 text-3xl font-bold font-display">
                  2
                </div>
                <h3 className="text-2xl font-semibold mb-2 font-display">LaTeX Transformation</h3>
                <p className="text-lg">Watch as we turn your content into a FAANG-worthy LaTeX resume.</p>
              </motion.div>
              <motion.div
                className="flex-1 text-center"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <div className="bg-white text-primary-600 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4 text-3xl font-bold font-display">
                  3
                </div>
                <h3 className="text-2xl font-semibold mb-2 font-display">Download & Conquer</h3>
                <p className="text-lg">Get your polished PDF and start landing those dream job interviews.</p>
              </motion.div>
            </div>
          </div>
        </section>

        <section id="testimonials" className="mb-20">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-primary-800 mb-12 font-display">
            Real Success Stories
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition duration-300 border-t-4 border-secondary-500"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-neutral-700 mb-4 text-lg italic font-serif">"{testimonial.quote}"</p>
                <div className="font-semibold text-lg text-primary-800 font-display">{testimonial.name}</div>
                <div className="text-secondary-600">{testimonial.role}</div>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="bg-gradient-to-r from-primary-100 to-secondary-100 py-16 rounded-xl">
          <div className="container text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-primary-800 mb-4 font-display">
              Ready to Land Your Dream Job?
            </h2>
            <p className="text-xl text-neutral-600 mb-8 font-serif">
              Join thousands who've skyrocketed their careers with our FAANG-approved LaTeX resumes.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <Link
                to="/templates"
                className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:from-primary-700 hover:to-secondary-700 transition duration-300 inline-flex items-center group shadow-lg hover:shadow-xl"
              >
                Upload Your Resume
                <Upload className="ml-2 h-5 w-5 group-hover:translate-y-[-2px] transition duration-300" />
              </Link>
              <Link
                to="/templates"
                className="bg-white text-primary-600 border-2 border-primary-600 px-8 py-3 rounded-full text-lg font-semibold hover:bg-primary-50 transition duration-300 inline-flex items-center group shadow-lg hover:shadow-xl"
              >
                Create with AI
                <Zap className="ml-2 h-5 w-5 group-hover:translate-y-[-2px] transition duration-300" />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Index;