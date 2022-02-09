/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export default function Model({ ...props }) {
  const group = useRef()
  const { nodes, materials } = useGLTF('/Final.gltf')
  return (
    <group ref={group} {...props} dispose={null}>
      <group position={[691.2, 18.03, 15.74]}>
        <mesh geometry={nodes.Brain1.geometry} material={nodes.Brain1.material} position={[164.69, -7.85, 3.45]} />
        <mesh geometry={nodes.Brain.geometry} material={nodes.Brain.material} position={[164.69, -7.85, 3.45]} />
        <mesh geometry={nodes.Left_51.geometry} material={nodes.Left_51.material} position={[-48.36, -18.03, -15.74]} />
        <mesh geometry={nodes.Left_41.geometry} material={nodes.Left_41.material} position={[-48.36, -18.03, -15.74]} />
        <mesh geometry={nodes.Left_31.geometry} material={nodes.Left_31.material} position={[-48.36, -18.03, -15.74]} />
        <mesh geometry={nodes.Left_21.geometry} material={nodes.Left_21.material} position={[-49.74, -18.03, -15.74]} />
        <mesh geometry={nodes.Left_11.geometry} material={nodes.Left_11.material} position={[35.96, 79.98, 59.49]} />
        <mesh
          geometry={nodes.Right_51.geometry}
          material={nodes.Right_51.material}
          position={[-17.23, -18.03, -15.74]}
        />
        <mesh
          geometry={nodes.Right_41.geometry}
          material={nodes.Right_41.material}
          position={[-17.23, -18.03, -15.74]}
        />
        <mesh
          geometry={nodes.Right_31.geometry}
          material={nodes.Right_31.material}
          position={[-17.23, -18.03, -15.74]}
        />
        <mesh
          geometry={nodes.Right_21.geometry}
          material={nodes.Right_21.material}
          position={[-18.61, -18.03, -15.74]}
        />
        <mesh
          geometry={nodes.Right_11.geometry}
          material={nodes.Right_11.material}
          position={[-100.22, 79.98, 59.49]}
        />
      </group>
    </group>
  )
}

useGLTF.preload('/Final.gltf')
