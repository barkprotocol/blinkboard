import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-4">
      <div className="container mx-auto text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} BARK Protocol. All rights reserved.
        </p>
        <div className="flex justify-center space-x-4 mt-2">
          <a
            href="/pages/terms"
            className="hover:text-gray-400 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            Terms of Use
          </a>
          <a
            href="/pages/privacy"
            className="hover:text-gray-400 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            Privacy Policy
          </a>
          <a
            href="https://twitter.com/bark_rotocol"
            className="hover:text-gray-400 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            Twitter
          </a>
          <a
            href="https://discord.com/invite/barkprotocol"
            className="hover:text-gray-400 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            Discord
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
