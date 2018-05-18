import { h, Component } from 'preact'

import {
  Scene,
  PerspectiveCamera,
  AmbientLight,
  DirectionalLight,
  CylinderBufferGeometry,
  WebGLRenderer,
  Color,
  Fog,
  Mesh,
  MeshLambertMaterial,
  Vector3,
  Math as TMath
}  from 'three'

import 'Styles/components/anim'

interface PropTypes {}
interface StateTypes {}

export default class extends Component<PropTypes, StateTypes> {
  private mount
  private _objects = []
  private _mouse = {
    x: 0,
    y: 0,
    z: 0
  }
  private _frameId
  private _scene = new Scene();
  private _camera = new PerspectiveCamera(
    28,
    window.innerWidth / window.innerHeight,
    1,
    1000
  );
  private _ambientLight = new AmbientLight(0xffffff, 0.5)
  private _light = new DirectionalLight(0xffffff, 0.5, 100)
  private _geometry = new CylinderBufferGeometry(1, 1, 2000, 32)
  private _renderer = new WebGLRenderer({ antialias: false })
  private _radius = 10
  private _dolly = 0
  private _objectRotateSpeed = 0

  constructor () {
    super()

    this._start = this._start.bind(this)
    this._stop = this._stop.bind(this)
    this._animate = this._animate.bind(this)
  }

  componentDidMount () {
    this._camera.position.z = 100

    this._scene.background = new Color( 'rgb(240, 240, 240)' )

    this._light.position.set( 2, 2, 2 ).normalize()
    this._scene.add( this._light )
    this._scene.add( this._ambientLight )
    this._scene.fog = new Fog('rgb(240, 240, 240)', 0, 400)

    const count = 250;
    for ( let i = 0; i < count; i++ ) {
      const color = i % 10 === 1 ? Math.random() * 0xffffff : 0xffffff;
      const object = new Mesh( this._geometry, new MeshLambertMaterial( {
        color
      }))
      object.position.x = Math.random() * 800 - 400
      object.position.y = Math.random() * 800 - 400
      object.position.z = Math.random() * 800 - 400
      object.rotation.x = Math.random() * 2 * Math.PI
      object.rotation.y = Math.random() * 2 * Math.PI
      object.rotation.z = Math.random() * 2 * Math.PI
      this._scene.add( object )
      this._objects.push(object)
    }

    this._renderer.setPixelRatio(window.devicePixelRatio)
    this._renderer.setSize(window.innerWidth, window.innerHeight)

    const events= ['resize', 'orientationchange'];
    events.map(event => window.addEventListener(event, () => this._onWindowResize()) )

    window.addEventListener('mousemove', event => this._mouseMove(event), false);

    this.mount.appendChild(this._renderer.domElement)
    this._start()
  }

  componentWillUnmount () {
    this._stop()
    this.mount.removeChild(this._renderer.domElement)
  }

  private _mouseMove (event) {
    // Update the mouse variable
    event.preventDefault();
    this._mouse.x = (event.clientX / window.innerWidth) * 2 - 1
    this._mouse.y = -(event.clientY / window.innerHeight) * 2 + 1
  }

  private _renderScene () {
    this._dolly += 0.01;
    this._camera.position.x = this._radius * Math.sin( TMath.degToRad( this._dolly ) )
    this._camera.position.z = this._radius * Math.cos( TMath.degToRad( this._dolly ) )
    this._camera.lookAt( this._scene.position )
    this._camera.updateMatrixWorld()

    this._light.position.x = this._mouse.x
    this._light.position.y = this._mouse.y
    this._light.position.z = this._mouse.z  + 2

    for (let object of this._objects) {
      this._objectRotateSpeed += Math.random() * 0.0001
      object.rotation.x = TMath.degToRad( this._objectRotateSpeed )
      object.rotation.y = TMath.degToRad( this._objectRotateSpeed )
    }

    return this._renderer.render(this._scene, this._camera)
  }

  private _animate () {
    requestAnimationFrame(this._animate);
    this._renderScene();
  }

  private _start () {
    if (!this._frameId) {
      this._frameId = window.requestAnimationFrame(this._animate)
    }
  }

  private _stop () {
    window.cancelAnimationFrame(this._frameId)
  }

  private _onWindowResize() {
    this._camera.aspect = window.innerWidth / window.innerHeight;
    this._camera.updateProjectionMatrix();
    this._renderer.setSize( window.innerWidth, window.innerHeight );
  }

  render () {
    return <div className='animContainer' ref={mount => { this.mount = mount }} />
  }
}
