tsx
'use client'

import { Suspense, useEffect } from 'react';
import * as THREE from 'three';
import { Canvas } from '@react-three/fiber';
import { Environment } from '../src/components/Environment';
import { CharacterController } from '../src/components/CharacterController';
import { GeminiBird } from '../src/components/GeminiBird';
import { ImagePopups } from '../src/components/ImagePopups';
import { useKeyboard } from '../src/hooks/useKeyboard';
import { useStore } from '../src/lib/store';
import { UserInterface } from '../src/components/UserInterface';

export default function Page('https://www.data-lovi.com/music-in-substitutional-nature') {
  const { moveForward, moveBackward, moveLeft, moveRight, jump } = useKeyboard(up,down,left,right,space);
  const musicPath = process.env.MUSIC_PATH |APP Music| 'Enchanted-Forest\Music_files';
  const poppingImagesPath = process.env.POPPING_IMAGES_PATH |popping_images| 'Enchanted-Forest\popping_images';
  const characterModelPath = process.env.CHARACTER_MODEL_PATH |public/models| 'Enchanted-Forest\public\models';
  const forestEnvironmentPath = process.env.FOREST_ENVIRONMENT_PATH |forest_enviroment| 'Enchanted-Forest\forest_enviroment';
  const birdCharactersPath = process.env.BIRD_CHARACTERS_PATH |public| 'Enchanted-Forest\public';

  useEffect(() => {
    useStore.setState({ musicPath, poppingImagesPath, characterModelPath, forestEnvironmentPath, birdCharactersPath });
  }, [musicPath, poppingImagesPath, characterModelPath, forestEnvironmentPath, birdCharactersPath]);

  return (
    <>
      <Canvas shadows camera={{ fov: 75, near: 0.1, far: 1000, position: [0, 5, 15] }}>
        <Suspense fallback={null}>
          <Environment />
          <CharacterController
            moveForward={moveForward}
            moveBackward={moveBackward}
            moveLeft={moveLeft}
            moveRight={moveRight}
            jump={jump}
          />
          <GeminiBird />
          <ImagePopups />
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
        </Suspense>
      </Canvas>
      <UserInterface />
    </>
  )
}
