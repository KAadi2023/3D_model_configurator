import React, { Suspense, useRef, useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
  Button,
  IconButton,
  Input,
  Textarea,
  Checkbox,
} from "@material-tailwind/react";
import { PageTitle, Footer } from "@/widgets/layout";
import { FeatureCard, TeamCard } from "@/widgets/cards";
import { featuresData, teamData, contactData } from "@/data";
import { Canvas, useLoader } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";

function ObjModel({ modelPath, materialColors }) {
  const obj = useLoader(OBJLoader, modelPath);

  return (
    <group>
      {obj.children.map((child, index) => (
        <mesh key={index} geometry={child.geometry}>
          <meshStandardMaterial
            attach="material"
            color={materialColors[index] || "gray"}
          />
        </mesh>
      ))}
    </group>
  );
}

const Home = () => {
  const [model, setModel] = useState("chair");
  const [materialVariants, setMaterialVariants] = useState({
    sofa: {
      seat: ["valvet", "leather", "fabric"],
      legs: ["gold", "chrome", "black"]
    },
    chair: {
      seat: ["leather", "pattern", "valvet", "white fabric"],
      legs: ["gold", "chrome", "black"]
    },
    desk: {
      top: ["pollywood", "white oak", "black", "poplar"],
      bottom: ["gold", "chrome", "black"]
    },
    bed: {
      headboard: ["valvet", "leather", "fabric"],
      pillow: ["grey fabric", "white fabric", "sky fabric"]
    }
  });

  const [selectedVariants, setSelectedVariants] = useState({
    seat: materialVariants[model]?.seat?.[0],
    legs: materialVariants[model]?.legs?.[0]
  });

  const [materialColors, setMaterialColors] = useState(Array(2).fill("gray"));

  const renderModel = () => {
    const colors = [selectedVariants.seat, selectedVariants.legs];
    switch (model) {
      case "sofa":
        return <ObjModel modelPath="/sofa.obj" materialColors={materialColors} />;
      case "chair":
        return <ObjModel modelPath="/chair.obj" materialColors={materialColors} />;
      case "desk":
        return <ObjModel modelPath="/desk.obj" materialColors={materialColors} />;
      case "bed":
        return <ObjModel modelPath="/bed.obj" materialColors={materialColors} />;
      default:
        return null;
    }
  };

  const changeVariant = (part, variant) => {
    setSelectedVariants({ ...selectedVariants, [part]: variant });
    const newColors = [...materialColors];
    switch (part) {
      case "seat":
        newColors[0] = variant;
        break;
      case "legs":
        newColors[1] = variant;
        break;
      default:
        break;
    }
    setMaterialColors(newColors);
  };

  const renderVariantButtons = (part) => {
    return materialVariants[model]?.[part]?.map((variant, index) => (
      <Button
        key={index}
        onClick={() => changeVariant(part, variant)}
      >
        {variant}
      </Button>
    ));
  };

    return (
      <>
        <div className="relative flex h-screen content-center items-center justify-center pt-16 pb-32">
          <div className="absolute top-0 h-full w-full bg-[url('/img/background-3.png')] bg-cover bg-center" />
          <div className="absolute top-0 h-full w-full bg-black/60 bg-cover bg-center" />
          <div className="max-w-8xl container relative mx-auto">
            <div className="flex flex-wrap items-center">
              <div className="ml-auto mr-auto w-full px-4 text-center lg:w-8/12">
                <Typography
                  variant="h1"
                  color="white"
                  className="mb-6 font-black"
                >
                  Your story starts with us.
                </Typography>
                <Typography variant="lead" color="white" className="opacity-80">
                  This is a simple example of a Landing Page you can build using
                  Material Tailwind. It features multiple components based on the
                  Tailwind CSS and Material Design by Google.
                </Typography>
              </div>
            </div>
          </div>
        </div>
        <section className="-mt-32 bg-white px-4 pb-20 pt-4">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {featuresData.map(({ color, title, icon, description }) => (
                <FeatureCard
                  key={title}
                  color={color}
                  title={title}
                  icon={React.createElement(icon, {
                    className: "w-5 h-5 text-white",
                  })}
                  description={description}
                />
              ))}
            </div>
            <div className="mt-32 flex flex-wrap items-center">
              <div className="mx-auto mt-24 flex w-full justify-center px-4 md:w-12/12 lg:mt-0 h-[580px]">
                <Card className="shadow-lg border shadow-gray-500/10 rounded-lg flex-1">
                  <CardHeader floated={false} className="relative flex justify-between items-center px-6 h-20">
                    <Typography variant="h6" className="text-center">
                      3D Model Configurator
                    </Typography>
                    <div className="flex gap-2">
                      <Button color="blue" variant="filled" size="sm" onClick={() => setModel("sofa")}>
                        Sofa
                      </Button>
                      <Button color="blue" variant="filled" size="sm" onClick={() => setModel("chair")}>
                        Chair
                      </Button>
                      <Button color="blue" variant="filled" size="sm" onClick={() => setModel("desk")}>
                        Desk
                      </Button>
                      <Button color="blue" variant="filled" size="sm" onClick={() => setModel("bed")}>
                        Bed
                      </Button>
                    </div>
                  </CardHeader>
                  <CardBody className="flex h-[500px]">
                    <div className="w-3/4 pr-4 h-full flex justify-center items-end pb-10 overflow-hidden">
                      <Canvas className="w-full h-full">
                        <Suspense fallback={null}>
                          <ambientLight />
                          <spotLight intensity={0.9} angle={0.1} penumbra={1} position={[10, 15, 10]} castShadow />
                          {renderModel()}
                          <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
                        </Suspense>
                      </Canvas>
                    </div>
                    <div className="border-l border-gray-300"></div>
                    <div className="w-1/4 pl-4">
                      <Typography className="font-normal text-blue-gray-500">
                        Select seat variant:
                      </Typography>
                      <div className="flex gap-2 mt-2">
                        {renderVariantButtons("seat")}
                      </div>
                      <Typography className="font-normal text-blue-gray-500 mt-4">
                        Select legs variant:
                      </Typography>
                      <div className="flex gap-2 mt-2">
                        {renderVariantButtons("legs")}
                      </div>
                    </div>
                  </CardBody>
                </Card>

              </div>
            </div>
          </div>
        </section>
        <section className="px-4 pt-20 pb-48">
          <div className="container mx-auto">
            <PageTitle section="Our Team" heading="Here are our heroes">
              According to the National Oceanic and Atmospheric Administration,
              Ted, Scambos, NSIDClead scentist, puts the potentially record
              maximum.
            </PageTitle>
            <div className="mt-24 grid grid-cols-1 gap-12 gap-x-24 md:grid-cols-2 xl:grid-cols-4">
              {teamData.map(({ img, name, position, socials }) => (
                <TeamCard
                  key={name}
                  img={img}
                  name={name}
                  position={position}
                  socials={
                    <div className="flex items-center gap-2">
                      {socials.map(({ color, name }) => (
                        <IconButton key={name} color={color} variant="text">
                          <i className={`fa-brands text-xl fa-${name}`} />
                        </IconButton>
                      ))}
                    </div>
                  }
                />
              ))}
            </div>
          </div>
        </section>
        <section className="relative bg-white py-24 px-4">
          <div className="container mx-auto">
            <PageTitle section="Co-Working" heading="Build something">
              Put the potentially record low maximum sea ice extent tihs year down
              to low ice. According to the National Oceanic and Atmospheric
              Administration, Ted, Scambos.
            </PageTitle>
            <div className="mx-auto mt-20 mb-48 grid max-w-5xl grid-cols-1 gap-16 md:grid-cols-2 lg:grid-cols-3">
              {contactData.map(({ title, icon, description }) => (
                <Card
                  key={title}
                  color="transparent"
                  shadow={false}
                  className="text-center text-blue-gray-900"
                >
                  <div className="mx-auto mb-6 grid h-14 w-14 place-items-center rounded-full bg-blue-gray-900 shadow-lg shadow-gray-500/20">
                    {React.createElement(icon, {
                      className: "w-5 h-5 text-white",
                    })}
                  </div>
                  <Typography variant="h5" color="blue-gray" className="mb-2">
                    {title}
                  </Typography>
                  <Typography className="font-normal text-blue-gray-500">
                    {description}
                  </Typography>
                </Card>
              ))}
            </div>
            <PageTitle section="Contact Us" heading="Want to work with us?">
              Complete this form and we will get back to you in 24 hours.
            </PageTitle>
            <form className="mx-auto w-full mt-12 lg:w-5/12">
              <div className="mb-8 flex gap-8">
                <Input variant="outlined" size="lg" label="Full Name" />
                <Input variant="outlined" size="lg" label="Email Address" />
              </div>
              <Textarea variant="outlined" size="lg" label="Message" rows={8} />
              <Checkbox
                label={
                  <Typography
                    variant="small"
                    color="gray"
                    className="flex items-center font-normal"
                  >
                    I agree the
                    <a
                      href="#"
                      className="font-medium transition-colors hover:text-gray-900"
                    >
                      &nbsp;Terms and Conditions
                    </a>
                  </Typography>
                }
                containerProps={{ className: "-ml-2.5" }}
              />
              <Button variant="gradient" size="lg" className="mt-8" fullWidth>
                Send Message
              </Button>
            </form>
          </div>
        </section>
        <div className="bg-white">
          <Footer />
        </div>
      </>
    );
  }

  export default Home;
