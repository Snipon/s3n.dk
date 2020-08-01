import { LitElement, html, customElement, TemplateResult } from 'lit-element';
import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  BoxGeometry,
  MeshPhongMaterial,
  Mesh,
  Color,
  PointLight,
} from 'three';

@customElement('three-anim')
export default class extends LitElement {
  private _scene = new Scene();
  private _camera = new PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  private _renderer = new WebGLRenderer();

  private _setScene(): void {
    const material = new MeshPhongMaterial({
      color: 'white',
    });

    const count = 50;
    for (let x = 0; x < count; x++) {
      for (let z = 0; z < count; z++) {
        const geometry = new BoxGeometry(1, Math.ceil(Math.random() * 5), 1);
        const cube = new Mesh(geometry, material);
        cube.position.x = x * 1.5;
        cube.position.z = z * 1.5;
        cube.position.y = 0;
        this._scene.add(cube);
      }
    }
    const light = new PointLight(0xffffff, 1, 200);
    light.position.set(0, 50, 100);
    light.castShadow = true;
    this._scene.add(light);
    this._scene.background = new Color('white');
    this._camera.position.x = 40;
    this._camera.position.y = 5;
    this._camera.position.z = 60;
    this._camera.rotateX(-0.2);
    this._scene.add(this._camera);
  }

  private _render(): void {
    this._renderer.render(this._scene, this._camera);
  }

  firstUpdated(): void {
    this._renderer.setSize(window.innerWidth, window.innerHeight);
    this._setScene();
    this._render();
  }

  render(): TemplateResult {
    return html`${this._renderer.domElement} `;
  }
}
