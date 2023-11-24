// Import the necessary dependencies
import { useState, useRef, Suspense } from "react"; // React hooks
import { Canvas, useFrame } from "@react-three/fiber"; // react-three/fiber components for 3D rendering
import { Points, PointMaterial, Preload } from "@react-three/drei"; // Drei components for using points in 3D space and material properties
import * as random from "maath/random/dist/maath-random.esm"; // Import random function to generate random positions of stars

// Stars component
const Stars = (props) => {
  // useRef hook to get a reference to the group object in the 3D scene
  const ref = useRef();

  // useState hook to generate an array of 5000 random 3D points inside a sphere of radius 1.2
  const [sphere] = useState(() => random.inSphere(new Float32Array(5000), { radius: 1.2 }));

  // useFrame hook runs inside requestAnimationFrame, it's used to update the object each frame
  useFrame((state, delta) => {
    // Rotate the group object around the x and y axis by delta time, this gives a rotating star field effect
    ref.current.rotation.x -= delta / 10;
    ref.current.rotation.y -= delta / 15;
  });

  // Render a group of points
  return (
      <group rotation={[0, 0, Math.PI / 4]}>
        <Points ref={ref} positions={sphere} stride={3} frustumCulled {...props}>
          <PointMaterial
              transparent // Makes the points transparent
              color='#f272c8' // Color of the points
              size={0.002} // Size of the points
              sizeAttenuation={true} // Makes the size of points decrease as they move away from the camera
              depthWrite={false} // Disables writing to the depth buffer. This can be useful when you have transparency, to prevent other objects from being occluded by transparent objects
          />
        </Points>
      </group>
  );
};

// StarsCanvas component
const StarsCanvas = () => {
  return (
      // Create a full size div to hold the canvas, position it absolutely and set z-index to -1 so it's below other content
      <div className='w-full h-auto absolute inset-0 z-[-1]'>
        {/*// The Canvas component from react-three/fiber. This is where the 3D scene will be rendered*/}
        <Canvas camera={{ position: [0, 0, 1] }}>
          {/*// The Suspense component allows us to wait for some code to load and declaratively specify a loading state (fallback)*/}
          <Suspense fallback={null}>
            {/*// Render the Stars component inside the canvas*/}
            <Stars />
          </Suspense>

          {/*// Preload all textures and assets, to ensure they'react-three loaded before we try to render them*/}
          <Preload all />
        </Canvas>
      </div>
  );
};

// Export the StarsCanvas component as the default export
export default StarsCanvas;
