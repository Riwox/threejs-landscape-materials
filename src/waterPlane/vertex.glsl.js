import { simplexNoise } from '../shared/simplexNoise.glsl'

export const parsVertex = /* glsl */`
    
//uniform float uTime;

varying vec3 vPosition;
//varying vec3 vNormal;
varying vec2 vUv;
varying float vHeightVariation;

${simplexNoise}
`

export const mainVertex = /* glsl */`
    vPosition = position;
    vNormal = normal;
    vUv = uv;

    float time = mod(12.0, 100.0);
    
    vHeightVariation = mix(0.1, 0.25, 1.0 - abs(sin((snoise(vPosition.xz * 0.1 - time * 0.3)) * 0.3)))
    + mix(0.02, 0.06, 1.0 - abs(sin((vPosition.x + snoise(vPosition.xz * 0.1)) * 0.3 - time)))
    + mix(0.01, 0.02, 1.0 - snoise(vPosition.xz + time));
    //transformed.y += vHeightVariation * 10.0;

    //gl_Position = projectionMatrix * modelViewMatrix * vec4(vPosition.xyz, 1.0);
`