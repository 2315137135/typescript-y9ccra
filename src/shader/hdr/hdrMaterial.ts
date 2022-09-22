import {BaseTexture, Effect, InspectableType, Scene, ShaderMaterial} from "@babylonjs/core";
import fragment from "./fragment.frag?raw"
import vertex from "./vertex.vert?raw"

Effect.ShadersStore["HdrVertexShader"] = vertex
Effect.ShadersStore["HdrFragmentShader"] = fragment


export class HdrMaterial extends ShaderMaterial {
    get h(): number {
        return this._h;
    }

    set h(value: number) {
        this._h = value;
        this.setFloat("h", this.h)
    }

    private _h = 3;

    constructor(scene: Scene, texture: BaseTexture, h = 3) {
        super("hdr", scene, {fragment: "Hdr", vertex: "Hdr"}, {
            uniforms: ["world", "worldView", "worldViewProjection", "view", "projection", "h"],
            samplers: ["textureSample"],
            needAlphaBlending: false
        });
        this.setTexture("textureSampler", texture)
        this.h = h

        this.inspectableCustomProperties = [
            {
                label: "h",
                propertyName: "h",
                type: InspectableType.Slider,
                min: 0,
                max: 100,
            }
        ]
    }

}
