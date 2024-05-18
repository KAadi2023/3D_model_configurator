import React, { Suspense, useState } from "react";
import {
    Card,
    CardBody,
    CardHeader,
    Typography,
    Button,
} from "@material-tailwind/react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

export function SofaModel(props) {
    const { nodes, materials } = useGLTF('/SofaModel/Sofa.gltf')
    return (
        <group {...props} dispose={null}>
            <mesh geometry={nodes.Mesh.geometry} material={materials.ASSET_MAT_MR} />
        </group>
    )
}

export function ChairModel(props) {
    const { nodes, materials } = useGLTF('/ChairModel/Chair.gltf');
    return (
        <group {...props} dispose={null}>
            <mesh geometry={nodes.ASSET.geometry} material={materials.Blinn3} />
        </group>
    );
}

export function DeskModel(props) {
    const { nodes, materials } = useGLTF('/DeskModel/Desk.gltf');
    return (
        <group {...props} dispose={null}>
            <mesh geometry={nodes.polySurface3.geometry} material={materials.ASSET_MAT_MR} />
        </group>
    );
}

const Models = () => {
    const [model, setModel] = useState("sofa");
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
        // bed: {
        //   headboard: ["valvet", "leather", "fabric"],
        //   pillow: ["grey fabric", "white fabric", "sky fabric"]
        // }
    });

    const [selectedVariants, setSelectedVariants] = useState({
        seat: materialVariants[model]?.seat?.[0],
        legs: materialVariants[model]?.legs?.[0]
    });

    const renderModel = () => {
        switch (model) {
            case "sofa":
                return <SofaModel />;
            case "chair":
                return <ChairModel />;
            case "desk":
                return <DeskModel />;
            // Add case for bed if there's a BedModel component
            // case "bed":
            //   return <BedModel />;
            default:
                return null;
        }
    };

    const changeVariant = (part, variant) => {
        setSelectedVariants({ ...selectedVariants, [part]: variant });
        // You may need to update the GLTF model materials here
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
            <Card className="w-[100%] mx-auto shadow-lg border shadow-gray-500/10 rounded-lg flex-1">
                <CardHeader floated={false} className="relative flex bg-purple-200 justify-between items-center px-6 h-20">
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
                        {/* <Button color="blue" variant="filled" size="sm" onClick={() => setModel("bed")}>
                      Bed
                    </Button> */}
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
                        <div className="flex gap-2 mt-2 flex-wrap">
                            {renderVariantButtons("seat")}
                        </div>
                        <Typography className="font-normal text-blue-gray-500 mt-4">
                            Select legs variant:
                        </Typography>
                        <div className="flex gap-2 mt-2 flex-wrap">
                            {renderVariantButtons("legs")}
                        </div>
                    </div>
                </CardBody>
            </Card>

        </>
    );
}

export default Models;
