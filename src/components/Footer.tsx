"use client";

import { Facebook, Twitter, Instagram, Youtube} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#0d131f] text-gray-300 py-14 px-6 md:px-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-10 border-b border-gray-800 pb-10">
        {/* Logo + Description */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="bg-red-400 w-7 h-7 rounded-full flex items-center justify-center text-white font-bold text-sm">
              Z
            </div>
            <h2 className="text-2xl font-semibold text-white">zaira</h2>
          </div>
          <p className="text-sm leading-relaxed text-gray-400">
            Browned Butter And Brown Sugar <br />
            Caramelly Goodness, Crispy Edges <br />
            Thick And Soft Centres And Melty <br />
            Little Puddles Of Chocolate.
          </p>
        </div>

        {/* Columns */}
        <FooterColumn
          title="Company"
          links={["About Us", "The Test Kitchen", "Podcast", "Events", "Jobs"]}
        />
        <FooterColumn
          title="Get Help"
          links={[
            "Contact & Faq",
            "Orders & Returns",
            "Gift Cards",
            "Register",
            "Catalog",
          ]}
        />
        <FooterColumn
          title="Explore"
          links={["The Shop", "Recipes", "Food", "Travel", "Hotline"]}
        />
        <FooterColumn
          title="Follow Us On"
          links={[
            { label: "Facebook", icon: <Facebook size={16} /> },
            { label: "Twitter", icon: <Twitter size={16} /> },
            { label: "Instagram", icon: <Instagram size={16} /> },
            { label: "Youtube", icon: <Youtube size={16} /> },
          
          ]}
        />
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 pt-6 space-y-3 md:space-y-0">
        <p>
          Privacy Policy & Terms • Site Credits
        </p>
        <p>© 2023 All Rights Reserved</p>
      </div>
    </footer>
  );
}

/* --- Subcomponent for columns --- */


function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: (string | { label: string; icon?: React.ReactNode })[];
}) {
  return (
    <div>
      <h3 className="text-white font-semibold mb-4 relative inline-block">
        {title}
        <span className="block w-8 h-[2px] bg-red-400 mt-1 rounded-full"></span>
      </h3>
      <ul className="space-y-2 text-sm text-gray-400">
        {links.map((link, i) =>
          typeof link === "string" ? (
            <li key={i} className="hover:text-white cursor-pointer transition">
              {link}
            </li>
          ) : (
            <li
              key={i}
              className="flex items-center gap-2 hover:text-white cursor-pointer transition"
            >
              {link.icon}
              {link.label}
            </li>
          )
        )}
      </ul>
    </div>
  );
}
