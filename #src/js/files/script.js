import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.121.1/build/three.module.js';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/controls/OrbitControls.js';

window.onload = function() {
    //Размеры
    const width = window.innerWidth;
    const height = window.innerHeight;
    const canvas = document.getElementById('canvas');
    
    canvas.setAttribute('width', width),
    canvas.setAttribute('height', height);

    const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        antialias: true,
    });
    renderer.setClearColor(0x000000);

    const scene = new THREE.Scene();

    //Камера
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000); 

    scene.add(camera);

    const mediaRequest = window.matchMedia('all and (max-width: 767.98px)');
    if (mediaRequest.matches){
        camera.position.set(0, 0, 4);
    } else {
        camera.position.set(0, 0, 2);
    }

    // Скрипт управления планетой
    let controls = new OrbitControls(camera, renderer.domElement); 
    controls.enableZoom = false;

    //Свет
    const light = new THREE.AmbientLight(0xffffff, 0.1);
    scene.add(light);

    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(5, 3, 5);
    scene.add(pointLight);


    //--------Планета------//

    //Геометрия
    const geometry = new THREE.SphereGeometry(0.5, 50, 50);

    //Материял
    const material = new THREE.MeshPhongMaterial({
        roughness: 1,
        matalness: 0,
        map: THREE.ImageUtils.loadTexture('img/2k_mars.jpg'),
        bumpMap: THREE.ImageUtils.loadTexture('img/bump.jpg'),
        specularMap: THREE.ImageUtils.loadTexture('img/specularmap.jpg'),
        bumpScale: 0.030,
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    //--------Планета------//

    //--------Облака------//

    //геометрия
    //const cloudGeomentry = new THREE.SphereGeometry(0.53, 32, 32);

    //материял
    //const cloudMaterial  = new THREE.MeshPhongMaterial({
        //map: THREE.ImageUtils.loadTexture('img/earthCloud.png'),
        //transparent: true,
    //});

    //Меш
    //const cloudMesh = new THREE.Mesh(cloudGeomentry, cloudMaterial);
    //--------Облака------//

    //--------Звезды------//

    //Геометрия
    //const starGeometry = new THREE.SphereGeometry(80, 64, 64);
    
    //материял
    //const starMaterial = new THREE.MeshBasicMaterial({
       // map: THREE.ImageUtils.loadTexture('img/galaxy.png'),
       // side: THREE.BackSide,
    //});

    //Меш
    //const starMesh =  new THREE.Mesh(starGeometry, starMaterial);
    //scene.add(starMesh);

    //--------Звезды------//

    //Функция вызова, анимации и вызов управления.
    function loop (){
        mesh.rotation.y -= 0.0015;
        //cloudMesh.rotation.y -= 0.001;
        //starMesh.rotation.y -= 0.002;
        controls.update();
        renderer.render(scene, camera);
        requestAnimationFrame(function(){loop();});
    }

    loop();
};
   
