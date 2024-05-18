import PropTypes from "prop-types";
import { Typography } from "@material-tailwind/react";
import { HeartIcon } from "@heroicons/react/24/solid";

export function SimpleFooter({ brandName, brandLink }) {
  const year = new Date().getFullYear();

  return (
    <footer className="py-2">
      <div className="flex w-full flex-wrap items-center justify-center px-2">
        <Typography variant="small" className="font-normal text-inherit">
          &copy; {year}, made with{" "}
          <HeartIcon className="-mt-0.5 inline-block h-3.5 w-3.5 text-red-500" /> by{" "}
          <a
            href={brandLink}
            target="_blank"
            className="transition-colors hover:text-blue-500"
          >
            {brandName}
          </a>
        </Typography>
      </div>
    </footer>
  );
}

SimpleFooter.defaultProps = {
  brandName: "3D Model Configurator",
  brandLink: "https://configurator-model.netlify.app/",
};

SimpleFooter.propTypes = {
  brandName: PropTypes.string,
  brandLink: PropTypes.string,
};

SimpleFooter.displayName = "/src/widgets/layout/simple-footer.jsx";

export default SimpleFooter;
