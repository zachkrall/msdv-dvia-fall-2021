import React, { useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'

const CanvasContent = React.memo(() => {
  const planes = useRef<any[]>([])
  const width = useThree((state) => state.size.width)

  const meshes = React.useMemo(() => [...new Array(30).fill(null)], [])

  useFrame(() => {
    if (!planes.current) {
      return
    }

    planes.current.forEach(({ mesh, speed }) => {
      if (!mesh) {
        return
      }

      if (mesh.position.x < -30) {
        mesh.position.x = 30
        return
      }

      mesh.position.x -= speed
    })
  })

  const setRef = (e, i) => {
    planes.current[i] = {
      mesh: e,
      speed: Math.random() * 0.2,
    }
  }

  return (
    <>
      {meshes.map((e, i) => {
        let size = Math.max(Math.random() * 3, 1)
        return (
          <mesh
            ref={(e) => setRef(e, i)}
            key={i}
            position={[Math.random() * 30, Math.random() * 20 - 10, 0]}
          >
            <planeBufferGeometry args={[size, size, size]} />
            <meshBasicMaterial
              color={0xffffff * Math.random()}
              transparent={true}
              opacity={0.5}
            />
          </mesh>
        )
      })}
    </>
  )
})

const WebGL = React.memo(() => {
  return (
    <Canvas
      style={{
        position: 'absolute',
        pointerEvents: 'none',
      }}
    >
      <CanvasContent />
    </Canvas>
  )
})

export default WebGL
