"use client";

import React from "react";
import Particles from "react-tsparticles";
import type { Engine } from "tsparticles-engine";
import { loadLinksPreset } from "tsparticles-preset-links";

interface IProps extends React.ComponentProps<typeof Particles> {}

export class ParticlesComponent extends React.PureComponent<IProps> {
    // this customizes the component tsParticles installation
    async customInit(engine: Engine): Promise<void> {
        // this adds the preset to tsParticles, you can safely use the
        await loadLinksPreset(engine);
    }

    render() {
        const options = {
            preset: "links"
        };

        return <Particles options={options} init={this.customInit} />;
    }
}

export default ParticlesComponent;
