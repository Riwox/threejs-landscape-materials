import { fbm } from "../shared/fbm.glsl"

export const parsFragment =  /* glsl */`

uniform float nearDistance;
uniform float farDistance;
uniform float farTextureMagnification;
uniform float macroContrast;
uniform vec3 microColor;

#ifndef USE_ALPHAHASH

	varying vec3 vPosition;

#endif

varying float vCameraDistance;

${fbm}
`

export const mainFragment =  /* glsl */`

#ifdef USE_MAP

  vec4 nearColor = texture2D( map, vMapUv );

  #ifdef DISTANCE

    vec4 farColor = texture2D( map, vMapUv / farTextureMagnification );
    diffuseColor *= mix(nearColor, farColor, smoothstep(nearDistance, farDistance, clamp(vCameraDistance, nearDistance, farDistance)));

  #else

    diffuseColor *= nearColor;

  #endif

#endif

float macroBlend = 1.0;

#ifdef MACRO

  float macroAlpha = fbm(vPosition.xz + 343.0, 6, 0.1, 1.0);
  macroBlend = mix(1.0, macroContrast, macroAlpha);

#endif

#ifdef MICRO

  vec4 microVariation = vec4(microColor, 1) * diffuseColor;
  float microAlpha = fbm(vPosition.zx + 3652.0, 6, 0.05, 1.0);
  diffuseColor = mix(microVariation, diffuseColor, microAlpha);

#endif

diffuseColor *= macroBlend;
`