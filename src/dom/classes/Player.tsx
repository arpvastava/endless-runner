import { BoxGeometry, Mesh, MeshBasicMaterial, Scene } from "three";

export class Player {
    player: Mesh | null = null
    scene: Scene

    constructor(scene: Scene) {
        this.scene = scene
    }

    setup() {
        const geometry = new BoxGeometry(1, 1, 1)
        const material = new MeshBasicMaterial({ color: "skyblue" })
        this.player = new Mesh(geometry, material)
        this.scene.add(this.player)
    }

    update(delta: number) {
        if (!this.player)
            return

        this.player.rotation.x += 1 * delta
        this.player.rotation.y += 1 * delta
    }

    destroy() {
        if (!this.player)
            return

        // Clear main reference beforehand
        const p = this.player
        this.player = null

        // Clear out geometry and material
        p.geometry.dispose()

        if (Array.isArray(p.material)) {
            p.material.forEach(m => m.dispose())
        }
        else {
            p.material.dispose()
        }

        // Remove from scene
        this.scene.remove(p)
    }
}