import {
    Color3,
    CubeTexture,
    DirectionalLight,
    MeshBuilder,
    PBRBaseMaterial,
    PBRMaterial,
    Scene,
    SceneLoader, ShadowGenerator, Vector3
} from "@babylonjs/core";
import {qiondin} from "../assetMap/mainScene";
import {HdrMaterial} from "../shader/hdr/hdrMaterial";
import {ShadowOnlyMaterial} from "@babylonjs/materials";

export const createTestScene = async (scene: Scene) => {
    let box = MeshBuilder.CreateSphere("box", {})
    box.position.y = 0.5
    let mat = new PBRMaterial("pbr", scene)
    box.material = mat
    mat.metallic = 0
    mat.roughness = 0.1

    scene.createDefaultCamera(true, true, true)

    await SceneLoader.AppendAsync("", qiondin, scene)

    let texUrl = new URL("../assets/hdr.env", import.meta.url).href
    let hdr = new CubeTexture(texUrl, scene)

    let qdMesh = scene.getMeshByName("qd")
    if (qdMesh) {
        qdMesh.material = new HdrMaterial(scene, hdr, 2)
        scene.environmentTexture = hdr
        scene.debugLayer.select(qdMesh.material, "")
    }

    let ground = MeshBuilder.CreatePlane('ground', {size: 100}, scene)
    ground.rotation.x = Math.PI / 2
    ground.position.y = 0.01
    ground.material = new ShadowOnlyMaterial('shadowOnly', scene)
    ground.receiveShadows = true
    ground.visibility = 0.5

    // await SceneLoader.AppendAsync("https://www.babylonjs.com/Assets/DamagedHelmet/glTF/", "DamagedHelmet.gltf", scene,)
    let light = new DirectionalLight("light1", new Vector3(-1, -4, -4), scene);
    light.position = new Vector3(6, 9, 3);
    let generator = new ShadowGenerator(512, light);
    generator.useBlurExponentialShadowMap = true;
    generator.blurKernel = 32;
    generator.addShadowCaster(box)


    if (qdMesh) {
        generator.removeShadowCaster(qdMesh)
    }

    let helper = scene.createDefaultEnvironment({
        createGround: false,
    });


    scene.debugLayer.show({embedMode: true}).then()
}

