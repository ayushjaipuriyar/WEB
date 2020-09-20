/*eslint linebreak-style: 0*/
import { isElementInViewport } from './viewportChecker';
import sal from 'sal.js';
// const ProgressBar = require(`progressbar.js`);
// import * as THREE from 'three';
let scene = new THREE.Scene();

const menuIcon = document.querySelector(`.hamburger`);
const nav = document.querySelector(`.nav`);
const sweeper = document.querySelector(`.sweeper`);
const wandFeatures = document.querySelector(`.wand__features`);
const wandImg = document.querySelector(`.wand__image`);

// SmoothScroll Init

const scroll = new SmoothScroll(`a[href*="#"]`);

// Sal Init
sal();


$(document).ready(function () {
	// Hamburger Menu
	menuIcon.addEventListener(`click`, function () {
		$(`.burger`).toggleClass(`close`);
		$(`.nav__link`).toggleClass(`fade-in-left`);
		nav.classList.toggle(`open`);
		sweeper.classList.toggle(`open`);
	});

	$(`.nav__link`).on(`click`, () => {
		$(`.burger`).toggleClass(`close`);
		$(`.nav__link`).toggleClass(`fade-in-left`);
		nav.classList.toggle(`open`);
		sweeper.classList.toggle(`open`);
	});

	// ScrollMagic Controller

	const controller = new ScrollMagic.Controller();

	let wandTween = new TimelineMax();

	let wandImgTween = TweenMax.to(`.wand__image`, 0.5, {
		scale: 1.6,
		rotation: 90
	});

	// let wandSectionTween = TweenMax.to(`.wand`, 0.4, {
	// 	backgroundColor: '#eee',
	// 	color: '#111'
	// });

	let wandFeaturesTween = TweenMax.to(`.wand__features`, 0.2, {opacity: 1,});

	wandTween.add(wandImgTween);

	// let wandSectionScene = new ScrollMagic.Scene({
	// 	triggerElement: `.wand__description`,
	// 	duration: ( 60/100 * $(window).height())
	// })
	// 	.setTween(wandSectionTween)
	// 	.addIndicators(`Section Tween: 60vh`)
	// 	.addTo(controller);

	let wandImgScene = new ScrollMagic.Scene(
		{
			triggerElement: `.wand__description`,
			duration: $(window).height()
			// offset: 50,
			// pushFollowers: false
		})
		.setTween(wandTween)
		// .addIndicators({name: "1: duration(300)"})
		.addTo(controller);

	let knightImgTween = TweenMax.to(`.shield__image`, 0.5, {scale: 1.1});

	let knightImgScene = new ScrollMagic.Scene({
		triggerElement: `.shield__model`,
		duration: $(window).height()
	})
		.setTween(knightImgTween)
		// .addIndicators({name: `1: duration(300)`})
		.addTo(controller);

	let domeImgTween = TweenMax.to(`.dome__image`, 0.5, {scale: 1.02});

	let domeImgScene = new ScrollMagic.Scene({
		triggerElement: `.dome`,
		duration: $(window).height()
	})
		.setTween(domeImgTween)
		// .addIndicators({name: `1: duration(300)`})
		.addTo(controller);

	let sniperImgTween = TweenMax.to(`.sniper__image`, 0.5, {scale: 1.15});

	let sniperImgScene = new ScrollMagic.Scene({
		triggerElement: `.sniper`,
		duration: $(window).height()
	})
		.setTween(sniperImgTween)
		// .addIndicators({name: `1: duration(300)`})
		.addTo(controller);

	window.addEventListener(`scroll`, () => {
		let shieldOffset = $(`.shield`).offset();
		let top = shieldOffset.top;
		if (isElementInViewport(wandImg) || (window.scrollY > (window.innerHeight * 2) && window.scrollY < (top - 200))) {
			document.documentElement.style.setProperty(`--primary`, `#eee`);
			document.querySelectorAll(`.wand .feature`).forEach((el) => {
				el.style.setProperty(`--title-color`, `#111`);
				el.style.setProperty(`--text-color`, `#222`);
			});
		} else {
			document.querySelectorAll(`.wand .feature`).forEach((el) => {
				el.style.setProperty(`--title-color`, `#fff`);
				el.style.setProperty(`--text-color`, `#dadada`);
			});
			document.documentElement.style.setProperty(`--primary`, `#010d0e`);
		}
	});

	let wandFeaturesScene = new ScrollMagic.Scene(
		{
			triggerElement: `.wand__image`,
			duration: $(window).height(),
			offset: -150,
		})
		.setTween(wandFeaturesTween)
		// .addIndicators({ name: "Text Tween" })
		.addTo(controller);

	// Wand 3D Model

	if (WEBGL.isWebGLAvailable()) {
		// Initiate function or other initializations here
		console.log(`WebGL Exists`);
	} else {
		const warning = WEBGL.getWebGLErrorMessage();
		alert(warning);
	}

	// Wand Model

	( function () {
		let container;

		let camera, controls, scene, renderer;
		let lighting, ambient, keyLight, fillLight, backLight;

		init();
		animate();

		function init () {

			container = document.createElement(`div`);
			// document.querySelector(`.header__model`).appendChild(container);

			/* Camera */

			camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
			camera.position.z = 3;

			/* Scene */

			scene = new THREE.Scene();
			lighting = false;

			ambient = new THREE.AmbientLight(0xffffff, 1.0);
			scene.add(ambient);

			keyLight = new THREE.DirectionalLight(new THREE.Color(`#823800`), 1.0);
			keyLight.position.set(-100, 0, 100);

			fillLight = new THREE.DirectionalLight(new THREE.Color(`#351c00`), 0.75);
			fillLight.position.set(100, 0, 100);

			backLight = new THREE.DirectionalLight(0xffffff, 1.0);
			backLight.position.set(100, 0, -100).normalize();

			ambient.intensity = 0.25;
			scene.add(keyLight);
			scene.add(fillLight);
			scene.add(backLight);

			/* Model */

			let mtlLoader = new THREE.MTLLoader();
			mtlLoader.setBaseUrl(`assets/models/`);
			mtlLoader.setPath(`assets/models/`);
			mtlLoader.load(`Wand.mtl`, function (materials) {

				materials.preload();

				// materials.materials.default.map.magFilter = THREE.NearestFilter;
				// materials.materials.default.map.minFilter = THREE.LinearFilter;

				let objLoader = new THREE.OBJLoader();
				objLoader.setMaterials(materials);
				objLoader.setPath(`assets/models/`);
				objLoader.load(`Wand.obj`, function (object) {
					const size = 0.05;
					object.scale.x = size;
					object.scale.y = size;
					object.scale.z = size;
					scene.add(object);

				});

			});

			/* Renderer */

			renderer = new THREE.WebGLRenderer();
			renderer.setPixelRatio(window.devicePixelRatio);
			renderer.setSize((80/100 * (window.innerWidth)), (64/100 * window.innerHeight));
			renderer.setClearColor(new THREE.Color(`#010D0E`));

			container.appendChild(renderer.domElement);

			/* Controls */

			controls = new THREE.OrbitControls(camera, renderer.domElement);
			controls.enableDamping = true;
			controls.dampingFactor = 0.25;
			controls.enableZoom = false;

			/* Events */

			window.addEventListener(`resize`, onWindowResize, false);
			// window.addEventListener('keydown', onKeyboardEvent, false);

		}

		function onWindowResize () {

			camera.aspect = window.innerWidth / window.innerHeight;
			camera.updateProjectionMatrix();

			renderer.setSize(window.innerWidth, window.innerHeight);

		}

		function onKeyboardEvent (e) {

			if (e.code === `KeyL`) {

				lighting = !lighting;

				if (lighting) {

					ambient.intensity = 0.25;
					scene.add(keyLight);
					scene.add(fillLight);
					scene.add(backLight);

				} else {

					ambient.intensity = 1.0;
					scene.remove(keyLight);
					scene.remove(fillLight);
					scene.remove(backLight);

				}

			}

		}

		function animate () {

			requestAnimationFrame(animate);

			controls.update();

			render();

		}

		function render () {

			renderer.render(scene, camera);

		}
	}());

	// Arena Model

	( function () {
		let container;

		let camera, controls, scene, renderer;
		let lighting, ambient, keyLight, fillLight, backLight;

		init();
		animate();

		function init () {

			container = document.createElement(`div`);
			document.querySelector(`.arena__model`).appendChild(container);

			/* Camera */

			camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
			camera.position.z = 3;

			/* Scene */

			scene = new THREE.Scene();
			lighting = false;

			ambient = new THREE.AmbientLight(0xffffff, 1.0);
			scene.add(ambient);

			keyLight = new THREE.DirectionalLight(new THREE.Color(`#823800`), 1.0);
			keyLight.position.set(-100, 0, 100);

			fillLight = new THREE.DirectionalLight(new THREE.Color(`#351c00`), 0.75);
			fillLight.position.set(100, 0, 100);

			backLight = new THREE.DirectionalLight(0xffffff, 1.0);
			backLight.position.set(100, 0, -100).normalize();

			ambient.intensity = 0.25;
			scene.add(keyLight);
			scene.add(fillLight);
			scene.add(backLight);

			/* Model */

			let mtlLoader = new THREE.MTLLoader();
			mtlLoader.setBaseUrl(`assets/models/`);
			mtlLoader.setPath(`assets/models/`);
			mtlLoader.load(`FinalCastle.mtl`, function (materials) {

				materials.preload();

				// materials.materials.default.map.magFilter = THREE.NearestFilter;
				// materials.materials.default.map.minFilter = THREE.LinearFilter;

				let objLoader = new THREE.OBJLoader();
				objLoader.setMaterials(materials);
				objLoader.setPath(`assets/models/`);
				objLoader.load(`FinalCastle.obj`, function (object) {
					const size = 0.05;
					object.scale.x = size;
					object.scale.y = size;
					object.scale.z = size;
					scene.add(object);

				});

			});

			/* Renderer */

			renderer = new THREE.WebGLRenderer();
			renderer.setPixelRatio(window.devicePixelRatio);
			renderer.setSize((80/100 * (window.innerWidth)), (11/10* window.innerHeight));
			renderer.setClearColor(new THREE.Color(`#101014`));

			container.appendChild(renderer.domElement);

			/* Controls */

			controls = new THREE.OrbitControls(camera, renderer.domElement);
			controls.enableDamping = true;
			controls.dampingFactor = 0.25;
			controls.enableZoom = false;

			/* Events */

			window.addEventListener(`resize`, onWindowResize, false);
			// window.addEventListener('keydown', onKeyboardEvent, false);

		}

		function onWindowResize () {

			camera.aspect = window.innerWidth / window.innerHeight;
			camera.updateProjectionMatrix();

			renderer.setSize(window.innerWidth, window.innerHeight);

		}

		function onKeyboardEvent (e) {

			if (e.code === `KeyL`) {

				lighting = !lighting;

				if (lighting) {

					ambient.intensity = 0.25;
					scene.add(keyLight);
					scene.add(fillLight);
					scene.add(backLight);

				} else {

					ambient.intensity = 1.0;
					scene.remove(keyLight);
					scene.remove(fillLight);
					scene.remove(backLight);

				}

			}

		}

		function animate () {

			requestAnimationFrame(animate);

			controls.update();

			render();

		}

		function render () {

			renderer.render(scene, camera);

		}
	}());

});
