/* eslint-disable @typescript-eslint/no-explicit-any */
import { PresentationControls } from "@react-three/drei";
import gsap from "gsap";
import { useRef } from "react";

import MacbookModel16 from "../models/Macbook-16";
import MacbookModel14 from "../models/Macbook-14";
import { useGSAP } from "@gsap/react";

type ModelSwitcherProps = {
  scale: number;
  isMobile?: boolean;
};

const ANIMATION_DURATION = 1;
const OFFSET_DISTANCE = 5;

const fadeMeshes = (group: any, opacity: number) => {
  if (!group) return;

  group.traverse((child: any) => {
    if (child.isMesh) {
      child.material.transparent = true;
      gsap.to(child.material, {
        opacity: opacity,
        duration: ANIMATION_DURATION,
      });
    }
  });
};

const moveGroup = (group: any, positionX: number) => {
  if (!group) return;

  gsap.to(group.position, { x: positionX, duration: ANIMATION_DURATION });
};

const ModelSwitcher = ({ scale, isMobile }: ModelSwitcherProps) => {
  const smallMacbookRef = useRef<any>(null);
  const largeMacbookRef = useRef<any>(null);

  const showLargeMacbook = scale === 0.08 || scale === 0.05;

  useGSAP(() => {
    if (showLargeMacbook) {
      moveGroup(smallMacbookRef.current, -OFFSET_DISTANCE);
      moveGroup(largeMacbookRef.current, 0);

      fadeMeshes(smallMacbookRef.current, 0);
      fadeMeshes(largeMacbookRef.current, 1);
    } else {
        moveGroup(smallMacbookRef.current, 0);
        moveGroup(largeMacbookRef.current, OFFSET_DISTANCE);

        fadeMeshes(smallMacbookRef.current, 1);
        fadeMeshes(largeMacbookRef.current, 0);
    }
  }, [scale]);

  const controlConfig = {
    snap: true,
    speed: 2,
    zoom: 1,
    polar: [-Math.PI, Math.PI] as [number, number], // vertical rotation
    azimuth: [-Infinity, Infinity] as [number, number], // horizontal rotation
    config: { mass: 1, tension: 170, friction: 26 },
  };

  return (
    <>
      <PresentationControls {...controlConfig}>
        <group ref={largeMacbookRef}>
          <MacbookModel16 scale={isMobile ? 0.05 : 0.08} />
        </group>
      </PresentationControls>

      <PresentationControls {...controlConfig}>
            <group ref={smallMacbookRef}>
                <MacbookModel14 scale={isMobile ? 0.03 : 0.06}/>
            </group>
        </PresentationControls>
    </>
  );
};

export default ModelSwitcher;
