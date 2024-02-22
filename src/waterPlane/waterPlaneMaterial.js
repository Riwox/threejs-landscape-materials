import { MeshStandardMaterial } from 'three'
import { parsVertex, mainVertex } from './vertex.glsl.js'
import { parsFragment, mainFragment } from './fragment.glsl.js'

export class WaterPlaneMaterial extends MeshStandardMaterial {
    constructor(parametrs) {
        super()

		this.isWaterPlaneMaterial = true
		// this.type = 'WaterPlaneMaterial'

        this.onBeforeCompile = shader => {
            shader.vertexShader = shader.vertexShader.replace(`#include <displacementmap_pars_vertex>`,
            `#include <displacementmap_pars_vertex>` + parsVertex)
            shader.vertexShader = shader.vertexShader.replace(`#include <displacementmap_vertex>`,
            `#include <displacementmap_vertex>` + mainVertex)
            shader.fragmentShader = shader.fragmentShader.replace(`#include <color_pars_fragment>`,
            `#include <color_pars_fragment>` + parsFragment)
            shader.fragmentShader = shader.fragmentShader.replace(`#include <color_fragment>`,
            `#include <color_fragment>` + mainFragment)
        }

        this.setValues(parametrs)
    }
}