import { h, Component } from 'preact'

import * as THREE from 'three'

import 'Styles/components/anim'

interface PropTypes {}
interface StateTypes {}

export default class extends Component<PropTypes, StateTypes> {
  private mount
  private INTERSECTED
  private _frameId
  private _scene = new THREE.Scene();
  private _camera = new THREE.PerspectiveCamera(
    28,
    window.innerWidth / window.innerHeight,
    1,
    1000
  );
  private _ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
  private _light = new THREE.DirectionalLight(0xffffff, 1, 100);
  private _geometry = new THREE.BoxBufferGeometry(1, 500, 1);
  private _renderer = new THREE.WebGLRenderer({ antialias: true })
  private _raycaster = new THREE.Raycaster()
  private _mouse = new THREE.Vector2()
  private _radius = 100
  private _theta = 0

  constructor () {
    super()

    this._start = this._start.bind(this)
    this._stop = this._stop.bind(this)
    this._animate = this._animate.bind(this)
  }

  componentDidMount () {
    this._camera.position.z = 100

    this._scene.background = new THREE.Color( 'rgb(240, 240, 240)' )

    this._light.position.set( 0, 1, 0 ).normalize()
    this._light.castShadow = true
    this._scene.add( this._light )
    this._scene.add( this._ambientLight )
    this._scene.fog = new THREE.Fog('rgb(240, 240, 240)', 0, 400)

    for ( let i = 0; i < 500; i++ ) {
      const object = new THREE.Mesh( this._geometry, new THREE.MeshLambertMaterial( { color: 'white' } ))
      object.position.x = Math.random() * 800 - 400
      object.position.y = Math.random() * 800 - 400
      object.position.z = Math.random() * 800 - 400
      object.rotation.x = Math.random() * 2 * Math.PI
      object.rotation.y = Math.random() * 2 * Math.PI
      object.rotation.z = Math.random() * 2 * Math.PI
      object.scale.y = Math.random() + 1
      this._scene.add( object )
    }

    this._renderer.setPixelRatio(window.devicePixelRatio)
    this._renderer.setSize(window.innerWidth, window.innerHeight)

    window.addEventListener('resize', () => this._onWindowResize())

    this.mount.appendChild(this._renderer.domElement)
    this._start()
  }

  componentWillUnmount () {
    this._stop()
    this.mount.removeChild(this._renderer.domElement)
  }

  _renderScene () {

    this._theta += 0.05;
    this._camera.position.x = this._radius * Math.sin( THREE.Math.degToRad( this._theta ) )
    this._camera.position.y = this._radius * Math.sin( THREE.Math.degToRad( this._theta ) )
    this._camera.position.z = this._radius * Math.cos( THREE.Math.degToRad( this._theta ) )
    this._camera.lookAt( this._scene.position )
    this._camera.updateMatrixWorld()

    this._raycaster.setFromCamera(this._mouse, this._camera)
    const intersects = this._raycaster.intersectObjects( this._scene.children );


    if ( intersects.length > 0 ) {
      if ( this.INTERSECTED != intersects[ 0 ].object ) {
        if ( this.INTERSECTED ) this.INTERSECTED.material.emissive.setHex( this.INTERSECTED.currentHex );
        this.INTERSECTED = intersects[ 0 ].object;
        this.INTERSECTED.currentHex = this.INTERSECTED.material.emissive.getHex();
        this.INTERSECTED.material.emissive.setHex( 0xff0000 );
      }
    } else {
      if ( this.INTERSECTED ) this.INTERSECTED.material.emissive.setHex( this.INTERSECTED.currentHex );
      this.INTERSECTED = null;
    }

    return this._renderer.render(this._scene, this._camera)
  }

  _animate () {
    requestAnimationFrame(this._animate);
    this._renderScene();
  }

  _start () {
    if (!this._frameId) {
      this._frameId = window.requestAnimationFrame(this._animate)
    }
  }

  _stop () {
    window.cancelAnimationFrame(this._frameId)
  }

  _onWindowResize() {
    this._camera.aspect = window.innerWidth / window.innerHeight;
    this._camera.updateProjectionMatrix();
    this._renderer.setSize( window.innerWidth, window.innerHeight );
  }

  render () {
    return <div className='animContainer' ref={mount => { this.mount = mount }} />
  }
}
