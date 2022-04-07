import { useLoader, Canvas, useFrame } from "@react-three/fiber"
import { useFBX } from "@react-three/drei"
import { useSpring, animated, config } from "@react-spring/three"
import { useRef } from "react"
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { AnimationBlendMode, AnimationLoader } from "three"

export default function ThreeJSTomato() {
  const mesh = useRef();

  useFrame(({clock}) => {
    mesh.current.rotation.y = clock.getElapsedTime() / 2;
    mesh.current.rotation.x = clock.getElapsedTime();

  })

  const tomato = useLoader(GLTFLoader, "/tomato.gltf")
  return (
    <mesh ref={mesh}>
      <primitive object={tomato.scene} />
    </mesh>
  )
}