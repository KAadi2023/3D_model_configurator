import React, { Suspense, useEffect, useState } from "react";
import {
    Card,
    CardBody,
    CardHeader,
    Typography,
    Button,
} from "@material-tailwind/react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import * as THREE from "three";

export function SofaModel({ selectedVariants }) {
    const { nodes, materials } = useGLTF('/SofaModel/Sofa.gltf');

    useEffect(() => {
        console.log('Updating materials for sofa:', selectedVariants);

        if (materials.ASSET_MAT_MR) {
            const initialColor = new THREE.Color(0.529, 0.808, 0.922); // Light Sky Blue color

            const newColor = selectedVariants.seat === "velvet" ? new THREE.Color(0.7, 0.1, 0.1) :
                selectedVariants.seat === "leather" ? new THREE.Color(0.4, 0.2, 0.1) :
                    selectedVariants.seat === "fabric" ? new THREE.Color(0.8, 0.8, 0.8) :
                        initialColor;

            materials.ASSET_MAT_MR.color.set(newColor);
            console.log('Updated material color:', materials.ASSET_MAT_MR.color);
        } else {
            console.warn('Material ASSET_MAT_MR not found');
        }
    }, [selectedVariants, materials]);

    return (
        <group dispose={null}>
            {Object.keys(nodes).map((key) => (
                <mesh key={key} geometry={nodes[key].geometry} material={materials.ASSET_MAT_MR} />
            ))}
        </group>
    );
}

export function ChairModel({ selectedVariants }) {
    const { nodes, materials } = useGLTF('/ChairModel/Chair.gltf');

    useEffect(() => {
        console.log('Updating materials for chair:', selectedVariants);

        if (materials.Blinn3) {
            const newColor = selectedVariants.seat === "leather" ? new THREE.Color(0.3, 0.15, 0.05) :
                selectedVariants.seat === "pattern" ? new THREE.Color(0.5, 0.5, 0.5) :
                    selectedVariants.seat === "velvet" ? new THREE.Color(0.5, 0.0, 0.5) :
                        selectedVariants.seat === "white fabric" ? new THREE.Color(1, 1, 1) :
                            materials.Blinn3.color;

            materials.Blinn3.color.set(newColor);
            console.log('Updated material color:', materials.Blinn3.color);
        } else {
            console.warn('Material Blinn3 not found');
        }
    }, [selectedVariants, materials]);

    return (
        <group dispose={null}>
            {Object.keys(nodes).map((key) => (
                <mesh key={key} geometry={nodes[key].geometry} material={materials.Blinn3} />
            ))}
        </group>
    );
}

export function DeskModel({ selectedVariants }) {
    const { nodes, materials } = useGLTF('/DeskModel/Desk.gltf');

    useEffect(() => {
        console.log('Updating materials for desk:', selectedVariants);

        if (materials.ASSET_MAT_MR) {
            const newColor = selectedVariants.top === "pollywood" ? new THREE.Color(0.55, 0.27, 0.07) :
                selectedVariants.top === "white oak" ? new THREE.Color(0.93, 0.86, 0.75) :
                    selectedVariants.top === "black" ? new THREE.Color(0, 0, 0) :
                        selectedVariants.top === "poplar" ? new THREE.Color(0.67, 0.84, 0.45) :
                            materials.ASSET_MAT_MR.color;

            materials.ASSET_MAT_MR.color.set(newColor);
            console.log('Updated material color:', materials.ASSET_MAT_MR.color);
        } else {
            console.warn('Material ASSET_MAT_MR not found');
        }
    }, [selectedVariants, materials]);

    return (
        <group dispose={null}>
            {Object.keys(nodes).map((key) => (
                <mesh key={key} geometry={nodes[key].geometry} material={materials.ASSET_MAT_MR} />
            ))}
        </group>
    );
}

const Models = () => {
    const [model, setModel] = useState("sofa");
    const [materialVariants] = useState({
        sofa: {
            seat: ["velvet", "leather", "fabric"],
            legs: ["gold", "chrome", "black"]
        },
        chair: {
            seat: ["leather", "pattern", "velvet", "white fabric"]
        },
        desk: {
            top: ["pollywood", "white oak", "black", "poplar"]
        },
    });

    const initialVariants = {
        sofa: { seat: "velvet", legs: "gold" },
        chair: { seat: "leather" },
        desk: { top: "pollywood" },
    };

    const [selectedVariants, setSelectedVariants] = useState(initialVariants);

    const renderModel = () => {
        switch (model) {
            case "sofa":
                return <SofaModel selectedVariants={selectedVariants.sofa} />;
            case "chair":
                return <ChairModel selectedVariants={selectedVariants.chair} />;
            case "desk":
                return <DeskModel selectedVariants={selectedVariants.desk} />;
            default:
                return null;
        }
    };

    const changeVariant = (part, variant) => {
        setSelectedVariants((prevState) => ({
            ...prevState,
            [model]: {
                ...prevState[model],
                [part]: variant,
            },
        }));
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

    const handleModelChange = (modelName) => {
        setModel(modelName);
    };

    return (
        <Card className="w-[100%] mx-auto shadow-lg border shadow-gray-500/10 rounded-lg flex-1">
            <CardHeader floated={false} className="relative flex bg-purple-200 justify-between items-center px-6 h-20">
                <Typography variant="h6" className="text-center">
                    3D Model Configurator
                </Typography>
                <div className="flex gap-2">
                    <Button color="blue" variant="filled" size="sm" onClick={() => handleModelChange("sofa")}>
                        Sofa
                    </Button>
                    <Button color="blue" variant="filled" size="sm" onClick={() => handleModelChange("chair")}>
                        Chair
                    </Button>
                    <Button color="blue" variant="filled" size="sm" onClick={() => handleModelChange("desk")}>
                        Desk
                    </Button>
                </div>
            </CardHeader>
            <CardBody className="flex h-[500px]">
                <div className="w-3/4 pr-4 h-full flex justify-center items-end pb-10 overflow-hidden">
                    <Canvas className="w-full h-full" style={{ background: "#f0f0f0" }}>
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
                        {model === "desk" ? "Select top variant:" : "Select seat variant:"}
                    </Typography>
                    <div className="flex gap-2 mt-2 flex-wrap">
                        {renderVariantButtons(model === "desk" ? "top" : "seat")}
                    </div>
                    {model !== "chair" && model !== "desk" && (
                        <>
                            <Typography className="font-normal text-blue-gray-500 mt-4">
                                Select legs variant:
                            </Typography>
                            <div className="flex gap-2 mt-2 flex-wrap">
                                {renderVariantButtons("legs")}
                            </div>
                        </>
                    )}
                </div>
            </CardBody>
        </Card>
    );
};

export default Models;
