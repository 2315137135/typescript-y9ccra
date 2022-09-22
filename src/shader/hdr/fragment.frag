precision highp float;

// Lights
varying vec3 vPositionW;
varying vec3 vNormalW;

// Refs
uniform float h;
uniform vec3 cameraPosition;
uniform samplerCube textureSampler;

void main(void) {
    vec3 color = vec3(1., 1., 1.);
    vec3 viewDirectionW = normalize(cameraPosition - vPositionW);

    // Fresnel
    float fresnelTerm = dot(viewDirectionW, vNormalW);
    fresnelTerm = clamp(1.0 - fresnelTerm, 0., 1.);

    vec3 uv = vPositionW - vec3(0, h, 0);
    uv = normalize(uv);
    vec3 tex = textureCube(textureSampler, uv).rgb;

    gl_FragColor = vec4(tex, 1.);
}
