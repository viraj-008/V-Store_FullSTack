import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";


const Footer = () => {
  return (
    <footer className="bg-black  text-white py-8 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between">
        
        {/* Branding */}
        <div className="text-center md:text-left">
          <h2 className="text-[12px] text-gray-700 font-bold">Vivek Kumar</h2>
          <p className="text-gray-400">Full-Stack Developer | MERN | Next.js</p>
          <p className="text-gray-400">virajshekhar008@gmail.com</p>
        </div>

        {/* Social Links */}
        <div className="flex space-x-5 mt-4 md:mt-0">
          <a href="https://github.com/viraj-008" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white text-2xl">
            <FaGithub />
          </a>
          <a href="https://www.linkedin.com/in/vivek-kumar-24ab832a2" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white text-2xl">
            <FaLinkedin />
          </a>
         
          <a href="mailto:virajshekhar008@email.com" className="text-gray-400 hover:text-white text-2xl">
            <FaEnvelope />
          </a>
          <a href="https://www.instagram.com/virajshekhar63/" className="text-gray-400 hover:text-white text-2xl">
          <FaInstagram />
          </a>
        </div>

      </div>

      {/* Copyright */}
      <div className="mt-6 text-center text-gray-500">
        © {new Date().getFullYear()} Vivek Kumar. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
