import type React from "react";
import { Link } from "@tanstack/react-router";
import { Twitter, Linkedin, Github, Mail } from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-r from-primary-800 to-secondary-800 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold font-display">LaTeX Resume Builder</h2>
            <p className="text-gray-300 font-serif">
              Create professional LaTeX resumes with ease. Stand out from the crowd and land your dream job.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 font-display">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-secondary-300 transition duration-300">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/templates" className="hover:text-secondary-300 transition duration-300">
                  Templates
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-secondary-300 transition duration-300">
                  About
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-secondary-300 transition duration-300">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 font-display">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/blog" className="hover:text-secondary-300 transition duration-300">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-secondary-300 transition duration-300">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/tutorials" className="hover:text-secondary-300 transition duration-300">
                  Tutorials
                </Link>
              </li>
              <li>
                <Link to="/support" className="hover:text-secondary-300 transition duration-300">
                  Support
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 font-display">Connect With Us</h3>
            <div className="flex space-x-4">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-secondary-300 transition duration-300">
                <Twitter size={24} />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-secondary-300 transition duration-300">
                <Linkedin size={24} />
                <span className="sr-only">LinkedIn</span>
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-secondary-300 transition duration-300">
                <Github size={24} />
                <span className="sr-only">GitHub</span>
              </a>
              <a href="mailto:contact@latexresumebuilder.com" className="hover:text-secondary-300 transition duration-300">
                <Mail size={24} />
                <span className="sr-only">Email</span>
              </a>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-300 text-sm mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} LaTeX Resume Builder. All rights reserved.
            </p>
            <div className="flex space-x-4 text-sm">
              <Link to="/privacy" className="hover:text-secondary-300 transition duration-300">
                Privacy Policy
              </Link>
              <Link to="/terms" className="hover:text-secondary-300 transition duration-300">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;