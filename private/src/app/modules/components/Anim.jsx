import React, { Component } from 'react'
import * as THREE from 'three'

class Scene extends Component {
  constructor (props) {
    super(props)

    this.start = this.start.bind(this)
    this.stop = this.stop.bind(this)
    this.animate = this.animate.bind(this)
  }

  componentDidMount () {
    const width = this.mount.clientWidth
    const height = this.mount.clientHeight

    const scene = new THREE.Scene()
    scene.fog = new THREE.Fog(0xFFFBD0, 0, 5)
    const camera = new THREE.PerspectiveCamera(
      75,
      width / height,
      0.1,
      1000
    )
    const renderer = new THREE.WebGLRenderer({ antialias: true })
    const geometry = new THREE.SphereGeometry(2.5, 32, 32)
    const material = new THREE.MeshBasicMaterial({
      color: 'rgb(240, 240, 182)',
      wireframe: true
    })
    const cube = new THREE.Mesh(geometry, material)

    camera.position.z = 4
    scene.add(cube)
    renderer.setClearColor('rgb(255, 251, 208)')
    renderer.setSize(width, height)

    this.scene = scene
    this.camera = camera
    this.renderer = renderer
    this.material = material
    this.cube = cube

    this.mount.appendChild(this.renderer.domElement)
    this.start()
  }

  componentWillUnmount () {
    this.stop()
    this.mount.removeChild(this.renderer.domElement)
  }

  start () {
    if (!this.frameId) {
      this.frameId = window.requestAnimationFrame(this.animate)
    }
  }

  stop () {
    window.cancelAnimationFrame(this.frameId)
  }

  animate () {
    this.cube.rotation.x += 0.001
    this.cube.rotation.y += 0.001

    this.renderScene()
    this.frameId = window.requestAnimationFrame(this.animate)
  }

  renderScene () {
    this.renderer.render(this.scene, this.camera)
  }

  render () {
    return (
      <div
        style={{ width: '100vw', height: '100vh' }}
        ref={(mount) => { this.mount = mount }}
      />
    )
  }
}

export default Scene
