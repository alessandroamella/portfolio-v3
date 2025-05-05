"use client";

import React, { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import type { Container, Engine } from "@tsparticles/engine";
import { loadLinksPreset } from "@tsparticles/preset-links";

interface ParticlesComponentProps
  extends React.ComponentProps<typeof Particles> {}

const ParticlesComponent: React.FC<ParticlesComponentProps> = (props) => {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine: any) => {
      await loadLinksPreset(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = async (container?: Container) => {
    console.log("particlesLoaded", container);
  };

  const options = {
    preset: "links",
  };

  if (init) {
    return (
      <Particles
        id="tsparticles"
        particlesLoaded={particlesLoaded}
        options={options}
        {...props}
      />
    );
  }

  return null;
};

export default ParticlesComponent;
