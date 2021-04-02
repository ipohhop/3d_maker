import * as THREE from "three";

export interface SceneSettings {
    background?: THREE.Color | THREE.Texture | THREE.WebGLCubeRenderTarget | null ,
    fog?: THREE.FogBase | null,
    overrideMaterial?: THREE.Material | null,
    autoUpdate?: boolean,
    environment?: null | THREE.Texture
}

export type Light =
    THREE.DirectionalLight
    | THREE.PointLight
    | THREE.HemisphereLight
    | THREE.AmbientLight
    | THREE.RectAreaLight
    | THREE.SpotLight

export type Camera = THREE.PerspectiveCamera | THREE.OrthographicCamera | THREE.CubeCamera
export type Grid = THREE.GridHelper | THREE.PolarGridHelper
