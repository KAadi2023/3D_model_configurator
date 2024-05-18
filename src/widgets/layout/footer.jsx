import PropTypes from "prop-types";
import { Typography } from "@material-tailwind/react";

const year = new Date().getFullYear();

export function Footer({copyright }) {
  return (
    <footer className="relative px-4 pt-8 pb-6">
        <div className="flex flex-wrap items-center justify-center md:justify-between">
          <div className="mx-auto w-full px-4 text-center">
            <Typography
              variant="small"
              className="font-normal text-blue-gray-500"
            >
              {copyright}
            </Typography>
          </div>
        </div>
    </footer>
  );
}

Footer.defaultProps = {
  title: "Material Tailwind",
  description:
    "Easy to use React components for Tailwind CSS and Material Design.",
  socials: [
    {
      color: "gray",
      name: "twitter",
      path: "https://www.twitter.com/creativetim",
    },
    {
      color: "gray",
      name: "youtube",
      path: "https://www.youtube.com/channel/UCVyTG4sCw-rOvB9oHkzZD1w",
    },
    {
      color: "gray",
      name: "instagram",
      path: "https://www.instagram.com/creativetimofficial/",
    },
    {
      color: "black",
      name: "github",
      path: "https://github.com/creativetimofficial/material-tailwind",
    },
  ],
  menus: [
    {
      name: "useful links",
      items: [
        { name: "About Us", path: "https://www.creative-tim.com/presentation" },
        { name: "Blog", path: "https://www.creative-tim.com/blog" },
        {
          name: "Github",
          path: "https://www.github.com/creativetimofficial/material-tailwind?ref=mtk",
        },
        {
          name: "Free Products",
          path: "https://www.creative-tim.com/templates/free?ref=mtk",
        },
      ],
    },
    {
      name: "other resources",
      items: [
        {
          name: "MIT License",
          path: "https://github.com/creativetimofficial/material-tailwind/blob/main/LICENSE.md?ref=mtk",
        },
        {
          name: "Contribute",
          path: "https://github.com/creativetimofficial/material-tailwind/blob/main/CONTRIBUTING.md?ref=mtk",
        },
        {
          name: "Change Log",
          path: "https://github.com/creativetimofficial/material-tailwind/blob/main/CHANGELOG.md?ref=mtk",
        },
        {
          name: "Contact Us",
          path: "https://creative-tim.com/contact-us?ref=mtk",
        },
      ],
    },
  ],
  copyright: (
    <>
      Copyright © {year} Material Tailwind by{" "}
      <a
        href="https://www.creative-tim.com?ref=mtk"
        target="_blank"
        className="text-blue-gray-500 transition-colors hover:text-blue-500"
      >
        Creative Tim
      </a>
      .
    </>
  ),
};

Footer.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  socials: PropTypes.arrayOf(PropTypes.object),
  menus: PropTypes.arrayOf(PropTypes.object),
  copyright: PropTypes.node,
};

Footer.displayName = "/src/widgets/layout/footer.jsx";

export default Footer;
