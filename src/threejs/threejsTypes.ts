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

export type Geometries =
    THREE.BoxGeometry
    | THREE.CircleGeometry
    | THREE.ConeGeometry
    | THREE.CylinderGeometry
    | THREE.DodecahedronGeometry
    | THREE.EdgesGeometry
    | THREE.ExtrudeGeometry
    | THREE.IcosahedronGeometry
    | THREE.LatheGeometry
    | THREE.OctahedronGeometry
    | THREE.ParametricGeometry
    | THREE.PlaneGeometry
    | THREE.PolyhedronGeometry
    | THREE.RingGeometry
    | THREE.ShapeGeometry
    | THREE.SphereGeometry
    | THREE.TetrahedronGeometry
    | THREE.TextGeometry
    | THREE.TorusGeometry
    | THREE.TorusKnotGeometry
    | THREE.TubeGeometry
    | THREE.WireframeGeometry

export type MaterialConstructors = THREE.MeshPhongMaterial | THREE.MeshBasicMaterial | THREE.MeshLambertMaterial


//интерфейся для организации елементов объекта
interface GroupsElements {
    [name:string]:THREE.Group
}
interface ElementInElements {
    [name:string]:THREE.Mesh
}

export interface Elements {
    groups:GroupsElements,
    elements:ElementInElements
}