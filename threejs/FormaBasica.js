/**
 * Seminario GPC #2. Forma Básica.
 * Dibujar formas básicas y un modelo importado.
 * Muestra el bucle típico de inicialización, escena y render.
 * 
 * Autor: David Villanova Aparisi
 * Fecha: 23-09-2020
 */

 //Variables de consenso
 // Motor, escena y cámara
 var renderer, scene, camera;

 //Otras globales
 var esferaCubo, angulo = 0;

 //Acciones
 init();
 loadScene();
 render();

 function init() {
    //Configurar el motor de render y el canvas
    renderer = new THREE.WebGLRenderer();
    //Tomar el tamaño máximo posible
    renderer.setSize(window.innerWidth, window.innerHeight);
    //Dar color de borrado al renderer (En RGB hexadecimal)
    renderer.setClearColor(new THREE.Color(0x00BBBB));
    //Añadir un canvas al container
    document.getElementById("container").appendChild(renderer.domElement);
    
    // Escena
    scene = new THREE.Scene();

    // Camara
    // Razón de aspecto
    var ar = window.innerWidth / window.innerHeight;
    // Instanciar cámara (fovy, ar, near, far)
    camera = new THREE.PerspectiveCamera(50, ar, 0.1, 1000);
    scene.add(camera);
    //Situar la cámara
    camera.position.set(300, 400, 300);
    //Dirección en la que mira la cámara
    camera.lookAt( new THREE.Vector3(0,2,0));
 }


 function loadScene() {
    //Construir el grafo de escena

    //Materiales
    var material = new THREE.MeshBasicMaterial({color: 'yellow',wireframe: true});

    //Geometrias
    var geocubo = new THREE.BoxGeometry(2,2,2);
    var geoesfera = new THREE.SphereGeometry(1,30,30);

    //Objtos
    var cubo = new THREE.Mesh(geocubo, material);

    //Rotación y después traslación
    //Orden en el que se indican las rotaciones, traslaciones y escalado
    //no importan. Se hacen sobre el sistema de coordenadas fijo (0,0,0).
    cubo.position.x = -1;
    cubo.rotation.y = Math.PI/4;

    var esfera = new THREE.Mesh(geoesfera, material);
    esfera.position.x = 3;
    
    esferaCubo = new THREE.Object3D();
    esferaCubo.position.y = 0.5;
    esferaCubo.rotation.y = angulo;

    //Modelo externo
    var loader = new THREE.ObjectLoader();
    loader.load('../models/soldado/soldado.json',
                 function(obj) {
                     obj.position.set(0,1,0);
                     cubo.add(obj);
    });

    //Organización de la escena
    esferaCubo.add(cubo);
    esferaCubo.add(esfera);
    scene.add(esferaCubo);
    scene.add(new THREE.AxisHelper(3));
 }

 //Variación de la escena entre frames
 function update() {
    angulo += Math.PI/100;
    esferaCubo.rotation.y = angulo;
 }


 function render() {
    //Construir el frame
    requestAnimationFrame(render);
    update();
    renderer.render(scene, camera);
 }