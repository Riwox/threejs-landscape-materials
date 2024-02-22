import { MeshStandardMaterial, Color } from 'three'
import { parsVertex, mainVertex } from './vertex.glsl.js'
import { parsFragment, mainFragment } from './fragment.glsl.js'

export class HideRepetitionMaterial extends MeshStandardMaterial {
    constructor(parametrs) {
        super()

		this.isHideRepetitionMaterial = true;

		// this.type = 'HideRepetitionMaterial'

        this._distanceTilling = true;
        this._nearDistance = 5.0;
        this._farDistance = 20.0;
        this._farTextureMagnification = 2.7;
        this._macroVariation = true;
        this._macroContrast = 2.0;
        this._microVariation = true;
        this._microColor = new Color(0xffffff);

        this.onBeforeCompile = shader => {
            shader.vertexShader = shader.vertexShader.replace(`#include <common>`,
            `#include <common>` + parsVertex)
            shader.vertexShader = shader.vertexShader.replace(`#include <project_vertex>`,
            `#include <project_vertex>` + mainVertex)
            shader.fragmentShader = shader.fragmentShader.replace(`#include <map_pars_fragment>`,
            `#include <map_pars_fragment>` + parsFragment)
            shader.fragmentShader = shader.fragmentShader.replace(`#include <map_fragment>`,
            mainFragment)
            this.uniforms = {...this.uniforms, ...shader.uniforms}
            shader.uniforms = this.uniforms
        }
		
        this.defines = {
			...this.defines,
            'DISTANCE': this._distanceTilling,
            'MACRO': this._macroVariation,
            'MICRO': this._microVariation
        }
		
        this.uniforms = {
			nearDistance: {value: this._nearDistance},
            farDistance: {value: this._farDistance},
            farTextureMagnification: {value: this._farTextureMagnification},
            macroContrast: {value: this._macroContrast},
            microColor: {value: this._microColor}
        }

		this.setValues(parametrs);
    }

	get distanceTilling() {
		return this._distanceTilling;
	}

	set distanceTilling( value ) {
		if ( this._distanceTilling !== value ) {
			this.version ++;
		}
		this._distanceTilling = value;
        this.defines.DISTANCE = this._distanceTilling;
	}

    get nearDistance() {
		return this._nearDistance;
	}

	set nearDistance( value ) {
		this._nearDistance = value;
        this.uniforms.nearDistance.value = value;
	}

    get farDistance() {
		return this._farDistance;
	}

	set farDistance( value ) {
		this._farDistance = value;
        this.uniforms.farDistance.value = value;
	}

    get farTextureMagnification() {
		return this._farTextureMagnification;
	}

	set farTextureMagnification( value ) {
		this._farTextureMagnification = value;
        this.uniforms.farTextureMagnification.value = value;
	}

	get macroVariation() {
		return this._macroVariation;
	}

	set macroVariation( value ) {
		if ( this._macroVariation !== value ) {
			this.version ++;
		}
		this._macroVariation = value;
        this.defines.MACRO = this._macroVariation;
	}

	get microVariation() {
		return this._microVariation;
	}

	set microVariation( value ) {
		if ( this._microVariation !== value ) {
			this.version ++;
		}
		this._microVariation = value;
        this.defines.MICRO = this._microVariation;
	}

    get macroContrast() {
		return this._macroContrast;
	}

	set macroContrast( value ) {
		this._macroContrast = value;
        this.uniforms.macroContrast.value = value;
	}

    get microColor() {
		return this._microColor;
	}

	set microColor( value ) {
		this._microColor = value;
        this.uniforms.microColor.value.copy(value);
	}
}