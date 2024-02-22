export const parsVertex = /* glsl */`

#ifndef USE_ALPHAHASH

	varying vec3 vPosition;

#endif

varying float vCameraDistance;

`

export const mainVertex = /* glsl */`

vPosition = position;
vCameraDistance = -mvPosition.z;

`