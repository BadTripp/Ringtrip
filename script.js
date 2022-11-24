import * as THREE from './node_modules/three/build/three.module.js';
import {OrbitControls} from './OrbitControls.js'

var stars = [];
var arrayRing = [];
var reverse = false;
var start = 2;  /// 2 not start  / 1 started 
var speedRotationRing = 0.011; //0.09
var speed = 0.5

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000);
const renderer = new THREE.WebGL1Renderer({
    canvas : document.getElementById('canvas'),
});
const pointLight = new THREE.PointLight( 0xFFFFFF, 1, 100 );
const lightHelper = new THREE.PointLightHelper(pointLight,5);
const controls = new OrbitControls(camera,renderer.domElement);
////////////////////////////////////////////////////////////////////     CONTROLS DIABLED USER
controls.enabled = false;
/////////////////////////////////////////////////////////////          RENDERER RATIO - SIZE 
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth,window.innerHeight);
 /////////////////////////////////////////////////////////          CAMERA - LIGHT POSITION START
camera.position.setZ(150);
pointLight.position.set( 0, 0, 150 );
//////////////////////////////////////////////                                RENDERER
renderer.render(scene,camera);
controls.saveState();
scene.add(pointLight);
//scene.add(lightHelper);   


function randomEffectsRing(arrayRing){
    let ringScale = Math.random() * (2 - 0 ) + 0;
    speedRotationRing = Math.random() * (0.09 - 0.01 ) + 0.01;
    

    arrayRing.map((ring)=>{
        ring.scale.set(ringScale,ringScale,ringScale)
    })
}

//controls.update();
///////////////////////////////////////////////////////////                     UTILS 
function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  addEventListener('click', () => {
    if(start === 2){
        start = 1;
        controls.reset();
        //audio.play();
    }
});
function Coin (){
    let Coin = Math.floor(Math.random() * 2)
    if(Coin === 1)return true
    else return false    
}
speedRingController.addEventListener('change', (event) => {
    console.log(speedRingController.value);
    speedRotationRing = speedRingController.value;
    
});
speedController.addEventListener('change', (event) => {
    console.log(speedController.value);
    speed = speedController.value;
    
});

///////////////////////////////////////////////////////////                      STARS 
function generateSphere(){

    // The loop will move from z position of -1000 to z position 1000, adding a random particle at each position. 
    for ( var z= -1000; z < 1000; z+=20 ) {

        // Make a sphere (exactly the same as before). 
        var geometry   = new THREE.SphereGeometry(0.5, 32, 32)
        var material = new THREE.MeshBasicMaterial( {color: 0xffffff} );
        var sphere = new THREE.Mesh(geometry, material)

        // This time we give the sphere random x and y positions between -500 and 500
        sphere.position.x = Math.random() * 1000 - 500;
        sphere.position.y = Math.random() * 1000 - 500;

        // Then set the z position to where it is in the loop (distance of camera)
        sphere.position.z = z;

        // scale it up a bit
        sphere.scale.x = sphere.scale.y = 2;

        //add the sphere to the scene
        scene.add( sphere );

        //finally push it to the stars array 
        stars.push(sphere); 
    }
}

function animateStars() { 
    
// loop through each star
for(var i=0; i<stars.length; i++) {

let star = stars[i]; 
    
// and move it forward dependent on the mouseY position. 
star.position.z +=  i/10;
    
// if the particle is too close move it to the back
if(star.position.z>1000) star.position.z-=2000; 

}

}
///////////////////////////////////////////////////////////                    RING CLASS
class Ring extends THREE.Mesh{
    constructor(geometry,material){
        super(geometry,material)
    }

    getRandomNotInt(number){
       return  Math.ceil(Math.random() * number) * (Math.round(Math.random()) ? 1 : -1)
    }
    getRandomInt(number){
        return Math.floor(Math.random() * number)+ 1
    }

    setRandomPosition(){
        this.position.set(this.getRandom(100),this.getRandom(100),this.getRandom(150))
    }
    RandomMove(number){
        
        let direction = this.getRandomInt(3);
        if(direction === 1 ) this.moveX(number);
        if(direction === 2 ) this.moveY(number);
        if(direction === 3 ) this.moveZ(number);
        
    }
    moveX(number){
        this.position.set(this.position.x += number,this.position.y,this.position.z);
        }
    moveY(number){
        this.position.set(this.position.x,this.position.y += number,this.position.z);
        }
    moveZ(number){
        this.position.set(this.position.x,this.position.y,this.position.z += number);
        }
}
function generateRings(){
    const geometry = new THREE.TorusGeometry(10,2.2,16,100);
    arrayRing = []  // ARRAY OF RING MESH
    let zIncrease = 20; // SET DEFAULT Z FOR SPAWN 
////////////////////////////////////////// GENERATE 20 RING WITH RANDOM COLOR 
for(let i = 0; i < 20 ; i++){
    let material = new THREE.MeshStandardMaterial({color: getRandomColor()});
    arrayRing[i] = new Ring(geometry,material);
    arrayRing[i].position.set(0,0,0)
    arrayRing[i].position.set(0,0, zIncrease -= 30)
    scene.add(arrayRing[i]);
}
}
function animateRings(){
    if(camera.position.z  < -580 || camera.position.z > 151) reverse=!reverse
    if(!reverse){
        pointLight.position.set(0,0,pointLight.position.z -= 0.5);
        camera.position.setZ(camera.position.z -= 0.5);
    }if(reverse){
        pointLight.position.set(0,0,pointLight.position.z += 0.5)
        camera.position.setZ(camera.position.z += 0.5);
    }
    arrayRing.map((ring)=>{
        (Coin()) ? ring.rotateX(speedRotationRing) : '';
        (Coin()) ? ring.rotateY(speedRotationRing) : '';
        (Coin()) ? ring.rotateZ(speedRotationRing) : '';
    });
}
function cameraRandomMove(){
    camera.rotateX(0.01);
}

generateRings();
generateSphere();
randomEffectsRing(arrayRing)
///////ANIMATE LOOP FUNCTION 
function animate (){
    renderer.render(scene,camera);
    animateStars();
    requestAnimationFrame(animate);
    if(start === 1){
   
    
    animateRings();
    //controls.update();
    
    }if(start === 2) {
        cameraRandomMove()
    }

    
}

animate()