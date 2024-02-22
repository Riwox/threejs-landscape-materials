import { fbm } from "../shared/fbm.glsl"

export const parsFragment =  /* glsl */`
    
//uniform float uTime;
uniform sampler2D uTexture;

varying vec3 vPosition;
//varying vec3 vNormal;
varying vec2 vUv;
${fbm}
`

export const mainFragment =  /* glsl */`
    float time = mod(12., 100.0);

    vec3 colorVariation = vec3(
    mix(0.1, 0.25, 1.0 - abs(sin((snoise(vPosition.xz * 0.1 - time * 0.3)) * 0.3)))
    + mix(0.02, 0.06, 1.0 - abs(sin((vPosition.x + snoise(vPosition.xz * 0.1)) * 0.3 - time)))
    + mix(0.01, 0.02, 1.0 - snoise(vPosition.xz + time))
    );
    colorVariation = vec3(fbm(vPosition.xz, 6, 0.05, 1.0));
    vec3 color = vec3(0.1, 0.4, 0.9);
    diffuseColor.rgb = mix(diffuseColor.rgb, vec3(1.0), colorVariation);
    diffuseColor.rgb = colorVariation;
    //gl_FragColor = mix(vec4(vec3(0.0), 1.0), vec4(1.0), macroAlpha);
    //gl_FragColor = textureColor;
`