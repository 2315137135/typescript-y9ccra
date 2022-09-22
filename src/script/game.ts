import {Engine, Scene} from "@babylonjs/core";

import "@babylonjs/loaders"

import "@babylonjs/inspector"

export class Game {
    private engine: Engine;
    private scene: Scene;
    private createScene: (scene: Scene) => Promise<void>;

    constructor(canvas: HTMLCanvasElement, createScene: (scene: Scene) => Promise<void>) {
        this.createScene = createScene;
        this.engine = new Engine(canvas)
        this.scene = new Scene(this.engine)
        this.init().then()
        window.addEventListener("resize", ev => {
            this.engine.resize()
        })
    }

    async init() {
        await this.createScene(this.scene)

        this.engine.runRenderLoop(() => {
            this.scene.render()
        })


    }
}
