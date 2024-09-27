import React from "react"
import { Link } from "@tanstack/react-router"
import { Twitter, Mail, ArrowRight } from "lucide-react"

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-r from-primary-800 to-secondary-800 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold font-display">TeXResume.ai</h2>
            <p className="text-gray-300 font-serif leading-relaxed">
              Craft stunning LaTeX resumes effortlessly. Stand out to employers and skyrocket your career prospects.
            </p>
            <div className="flex space-x-4">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-secondary-300 transition duration-300">
                <Twitter size={20} />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="mailto:contact@texresume.ai" className="hover:text-secondary-300 transition duration-300">
                <Mail size={20} />
                <span className="sr-only">Email</span>
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-6 font-display">Quick Links</h3>
            <ul className="space-y-3">
              {["Home", "Templates", "About", "Contact"].map((item) => (
                <li key={item}>
                  <Link to={`/${item.toLowerCase()}`} className="hover:text-secondary-300 transition duration-300 flex items-center">
                    <ArrowRight size={16} className="mr-2" />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-6 font-display">Resources</h3>
            <ul className="space-y-3">
              {["Blog", "FAQ", "Tutorials", "Career Tips"].map((item) => (
                <li key={item}>
                  <Link to={`/${item.toLowerCase().replace(' ', '-')}`} className="hover:text-secondary-300 transition duration-300 flex items-center">
                    <ArrowRight size={16} className="mr-2" />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-300 text-sm mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} TeXResume.ai. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <Link to="/" className="hover:text-secondary-300 transition duration-300">
                Privacy Policy
              </Link>
              <Link to="/" className="hover:text-secondary-300 transition duration-300">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer