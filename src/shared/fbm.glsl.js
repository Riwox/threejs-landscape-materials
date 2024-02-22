import { simplexNoise } from './simplexNoise.glsl'

export const fbm =  /* glsl */`
${simplexNoise}
float fbm (vec2 noiseInput, int octaves, float frequency, float amplitude) {
    float value = 0.0;
    for (int i = 0; i < octaves; i++) {
        value += amplitude * snoise(noiseInput*frequency);
        frequency *= 2.0;
        amplitude *= 0.5;
    }
    return smoothstep(-2.0, 2.0, value);
  }
  `