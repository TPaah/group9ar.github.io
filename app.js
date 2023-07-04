import * as THREE from '../group9ar.github.io/libs/three/three.module.js';
import { Stats } from '../group9ar.github.io/libs/stats.module.js';
import { OrbitControls } from '../group9ar.github.io/libs/three/jsm/OrbitControls.js';
import { ARButton } from '../group9ar.github.io/libs/ARButton.js';


class App{
    
	constructor(){
		const container = document.createElement( 'div' );
		document.body.appendChild( container );
        
        this.clock = new THREE.Clock();
        
		this.camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 0.1, 100 );
		this.camera.position.set( 0, 1.6, 3 );
        
		this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color( 0x505050 );

		this.scene.add( new THREE.HemisphereLight( 0x606060, 0x404040 ) );

        const light = new THREE.DirectionalLight( 0xffffff );
        light.position.set( 1, 1, 1 ).normalize();
		this.scene.add( light );
			
		this.renderer = new THREE.WebGLRenderer({ antialias: true } );
		this.renderer.setPixelRatio( window.devicePixelRatio );
		this.renderer.setSize( window.innerWidth, window.innerHeight );
        this.renderer.outputEncoding = THREE.sRGBEncoding;
        
		container.appendChild( this.renderer.domElement );
        
        this.controls = new OrbitControls( this.camera, this.renderer.domElement );
        this.controls.target.set(0, 1.6, 0);
        this.controls.update();
        
        this.stats = new Stats();
        container.appendChild( this.stats.dom );
        
        this.initScene();
        this.setupXR();
        
        window.addEventListener('resize', this.resize.bind(this) );
        
        this.renderer.setAnimationLoop( this.render.bind(this) );
	}	
    
    random( min, max ){
        return Math.random() * (max-min) + min;
    }
    
    initScene(){
        this.geometry = new THREE.BoxBufferGeometry( 0.06, 0.06, 0.06 ); 
        this.meshes = [];
    }
    
    setupXR(){
        this.renderer.xr.enabled = true;
        camera = addCamera()
        let group = new THREE.Group()
        group.add(camera)
        group.position.set(50, 100, 50)
        scene.add(group)

        const self = this;
        let controller;

        function OnSelect(){
            const material = new THREE.MeshPhongMaterial({Color: 0xFFFFFF * Math.random()});
            const mesh = new THREE.Mesh(self.geometry, material);
            mesh.position.set(0,0,-0.3).applyMatrix4(controller.matrixWorld);
            mesh.quarternion.setFromRotationMatrix(controller.matrixWorld);
            self.scene.add(mesh);
            self.meshes.push(mesh);
        }

        const btn = new ARButton (this.renderer);

        controller = this.renderer.xr.getController(0);
        controller.addEventListener('select', OnSelect);
        this.scene.add(controller);

        this.renderer.setAnimationLoop(this.render.bind(this));

        this.renderer.setAnimationLoop( this.render.bind(this) );
    }
    
    resize(){
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize( window.innerWidth, window.innerHeight );  
    }
    
	render( ) {   
        this.stats.update();
        this.meshes.forEach( (mesh) => { mesh.rotateY( 0.01 ); });
        this.renderer.render( this.scene, this.camera );
    }

    


}

function addCamera() {
    const camera = new THREE.PerspectiveCamera(
        90,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    )
    camera.position.set(50, 100, 50)
    camera.lookAt(0, 1, 15)
    return camera
}

export { App };