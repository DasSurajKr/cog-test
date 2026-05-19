import { Link } from 'react-router-dom';
import { Github, Twitter, Linkedin, Zap } from 'lucide-react';
import { APP_NAME } from '../../utils/constants';

const footerLinks = {
  Product: [
    { label: 'Shop', to: '/products' },
    { label: 'Dashboard', to: '/dashboard' },
    { label: 'Cart', to: '/cart' },
  ],
  Company: [
    { label: 'About', to: '/' },
    { label: 'Careers', to: '/' },
    { label: 'Contact', to: '/' },
  ],
  Legal: [
    { label: 'Privacy', to: '/' },
    { label: 'Terms', to: '/' },
  ],
};

const social = [
  { icon: Twitter, href: '#' },
  { icon: Github, href: '#' },
  { icon: Linkedin, href: '#' },
];

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/30 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10">
          <div className="col-span-2 md:col-span-2">
            <Link to="/" className="flex items-center gap-2 font-heading font-bold text-xl mb-4">
              <div className="p-1.5 rounded-xl btn-gradient">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="text-gradient">{APP_NAME}</span>
            </Link>
            <p className="text-slate-500 dark:text-slate-400 text-sm max-w-xs">
              Enterprise-grade cloud-native commerce. Built for teams who demand Stripe-level polish.
            </p>
            <div className="flex gap-3 mt-6">
              {social.map(({ icon: Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  className="p-2.5 rounded-xl glass hover:glow-hover text-slate-500 hover:text-indigo-500"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-heading font-semibold mb-4">{title}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link to={link.to} className="text-sm text-slate-500 hover:text-indigo-500">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="text-center text-sm text-slate-400 mt-12">
          © {new Date().getFullYear()} {APP_NAME}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
