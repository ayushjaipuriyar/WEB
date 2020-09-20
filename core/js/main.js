(function(){function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s}return e})()({1:[function(require,module,exports){
'use strict';

var _viewportChecker = require('./viewportChecker');

var _sal = require('sal.js');

var _sal2 = _interopRequireDefault(_sal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// const ProgressBar = require(`progressbar.js`);
// import * as THREE from 'three';
/*eslint linebreak-style: 0*/
var scene = new THREE.Scene();

var menuIcon = document.querySelector('.hamburger');
var nav = document.querySelector('.nav');
var sweeper = document.querySelector('.sweeper');
var wandFeatures = document.querySelector('.wand__features');
var wandImg = document.querySelector('.wand__image');

// SmoothScroll Init

var scroll = new SmoothScroll('a[href*="#"]');

// Sal Init
(0, _sal2.default)();

$(document).ready(function () {
	// Hamburger Menu
	menuIcon.addEventListener('click', function () {
		$('.burger').toggleClass('close');
		$('.nav__link').toggleClass('fade-in-left');
		nav.classList.toggle('open');
		sweeper.classList.toggle('open');
	});

	$('.nav__link').on('click', function () {
		$('.burger').toggleClass('close');
		$('.nav__link').toggleClass('fade-in-left');
		nav.classList.toggle('open');
		sweeper.classList.toggle('open');
	});

	// ScrollMagic Controller

	var controller = new ScrollMagic.Controller();

	var wandTween = new TimelineMax();

	var wandImgTween = TweenMax.to('.wand__image', 0.5, {
		scale: 1.6,
		rotation: 90
	});

	// let wandSectionTween = TweenMax.to(`.wand`, 0.4, {
	// 	backgroundColor: '#eee',
	// 	color: '#111'
	// });

	var wandFeaturesTween = TweenMax.to('.wand__features', 0.2, { opacity: 1 });

	wandTween.add(wandImgTween);

	// let wandSectionScene = new ScrollMagic.Scene({
	// 	triggerElement: `.wand__description`,
	// 	duration: ( 60/100 * $(window).height())
	// })
	// 	.setTween(wandSectionTween)
	// 	.addIndicators(`Section Tween: 60vh`)
	// 	.addTo(controller);

	var wandImgScene = new ScrollMagic.Scene({
		triggerElement: '.wand__description',
		duration: $(window).height()
		// offset: 50,
		// pushFollowers: false
	}).setTween(wandTween)
	// .addIndicators({name: "1: duration(300)"})
	.addTo(controller);

	var knightImgTween = TweenMax.to('.shield__image', 0.5, { scale: 1.1 });

	var knightImgScene = new ScrollMagic.Scene({
		triggerElement: '.shield__model',
		duration: $(window).height()
	}).setTween(knightImgTween)
	// .addIndicators({name: `1: duration(300)`})
	.addTo(controller);

	var domeImgTween = TweenMax.to('.dome__image', 0.5, { scale: 1.02 });

	var domeImgScene = new ScrollMagic.Scene({
		triggerElement: '.dome',
		duration: $(window).height()
	}).setTween(domeImgTween)
	// .addIndicators({name: `1: duration(300)`})
	.addTo(controller);

	var sniperImgTween = TweenMax.to('.sniper__image', 0.5, { scale: 1.15 });

	var sniperImgScene = new ScrollMagic.Scene({
		triggerElement: '.sniper',
		duration: $(window).height()
	}).setTween(sniperImgTween)
	// .addIndicators({name: `1: duration(300)`})
	.addTo(controller);

	window.addEventListener('scroll', function () {
		var shieldOffset = $('.shield').offset();
		var top = shieldOffset.top;
		if ((0, _viewportChecker.isElementInViewport)(wandImg) || window.scrollY > window.innerHeight * 2 && window.scrollY < top - 200) {
			document.documentElement.style.setProperty('--primary', '#eee');
			document.querySelectorAll('.wand .feature').forEach(function (el) {
				el.style.setProperty('--title-color', '#111');
				el.style.setProperty('--text-color', '#222');
			});
		} else {
			document.querySelectorAll('.wand .feature').forEach(function (el) {
				el.style.setProperty('--title-color', '#fff');
				el.style.setProperty('--text-color', '#dadada');
			});
			document.documentElement.style.setProperty('--primary', '#010d0e');
		}
	});

	var wandFeaturesScene = new ScrollMagic.Scene({
		triggerElement: '.wand__image',
		duration: $(window).height(),
		offset: -150
	}).setTween(wandFeaturesTween)
	// .addIndicators({ name: "Text Tween" })
	.addTo(controller);

	// Wand 3D Model

	if (WEBGL.isWebGLAvailable()) {
		// Initiate function or other initializations here
		console.log('WebGL Exists');
	} else {
		var warning = WEBGL.getWebGLErrorMessage();
		alert(warning);
	}

	// Wand Model

	(function () {
		var container = void 0;

		var camera = void 0,
		    controls = void 0,
		    scene = void 0,
		    renderer = void 0;
		var lighting = void 0,
		    ambient = void 0,
		    keyLight = void 0,
		    fillLight = void 0,
		    backLight = void 0;

		init();
		animate();

		function init() {

			container = document.createElement('div');
			// document.querySelector(`.header__model`).appendChild(container);

			/* Camera */

			camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
			camera.position.z = 3;

			/* Scene */

			scene = new THREE.Scene();
			lighting = false;

			ambient = new THREE.AmbientLight(0xffffff, 1.0);
			scene.add(ambient);

			keyLight = new THREE.DirectionalLight(new THREE.Color('#823800'), 1.0);
			keyLight.position.set(-100, 0, 100);

			fillLight = new THREE.DirectionalLight(new THREE.Color('#351c00'), 0.75);
			fillLight.position.set(100, 0, 100);

			backLight = new THREE.DirectionalLight(0xffffff, 1.0);
			backLight.position.set(100, 0, -100).normalize();

			ambient.intensity = 0.25;
			scene.add(keyLight);
			scene.add(fillLight);
			scene.add(backLight);

			/* Model */

			var mtlLoader = new THREE.MTLLoader();
			mtlLoader.setBaseUrl('assets/models/');
			mtlLoader.setPath('assets/models/');
			mtlLoader.load('Wand.mtl', function (materials) {

				materials.preload();

				// materials.materials.default.map.magFilter = THREE.NearestFilter;
				// materials.materials.default.map.minFilter = THREE.LinearFilter;

				var objLoader = new THREE.OBJLoader();
				objLoader.setMaterials(materials);
				objLoader.setPath('assets/models/');
				objLoader.load('Wand.obj', function (object) {
					var size = 0.05;
					object.scale.x = size;
					object.scale.y = size;
					object.scale.z = size;
					scene.add(object);
				});
			});

			/* Renderer */

			renderer = new THREE.WebGLRenderer();
			renderer.setPixelRatio(window.devicePixelRatio);
			renderer.setSize(80 / 100 * window.innerWidth, 64 / 100 * window.innerHeight);
			renderer.setClearColor(new THREE.Color('#010D0E'));

			container.appendChild(renderer.domElement);

			/* Controls */

			controls = new THREE.OrbitControls(camera, renderer.domElement);
			controls.enableDamping = true;
			controls.dampingFactor = 0.25;
			controls.enableZoom = false;

			/* Events */

			window.addEventListener('resize', onWindowResize, false);
			// window.addEventListener('keydown', onKeyboardEvent, false);
		}

		function onWindowResize() {

			camera.aspect = window.innerWidth / window.innerHeight;
			camera.updateProjectionMatrix();

			renderer.setSize(window.innerWidth, window.innerHeight);
		}

		function onKeyboardEvent(e) {

			if (e.code === 'KeyL') {

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

		function animate() {

			requestAnimationFrame(animate);

			controls.update();

			render();
		}

		function render() {

			renderer.render(scene, camera);
		}
	})();

	// Arena Model

	(function () {
		var container = void 0;

		var camera = void 0,
		    controls = void 0,
		    scene = void 0,
		    renderer = void 0;
		var lighting = void 0,
		    ambient = void 0,
		    keyLight = void 0,
		    fillLight = void 0,
		    backLight = void 0;

		init();
		animate();

		function init() {

			container = document.createElement('div');
			document.querySelector('.arena__model').appendChild(container);

			/* Camera */

			camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
			camera.position.z = 3;

			/* Scene */

			scene = new THREE.Scene();
			lighting = false;

			ambient = new THREE.AmbientLight(0xffffff, 1.0);
			scene.add(ambient);

			keyLight = new THREE.DirectionalLight(new THREE.Color('#823800'), 1.0);
			keyLight.position.set(-100, 0, 100);

			fillLight = new THREE.DirectionalLight(new THREE.Color('#351c00'), 0.75);
			fillLight.position.set(100, 0, 100);

			backLight = new THREE.DirectionalLight(0xffffff, 1.0);
			backLight.position.set(100, 0, -100).normalize();

			ambient.intensity = 0.25;
			scene.add(keyLight);
			scene.add(fillLight);
			scene.add(backLight);

			/* Model */

			var mtlLoader = new THREE.MTLLoader();
			mtlLoader.setBaseUrl('assets/models/');
			mtlLoader.setPath('assets/models/');
			mtlLoader.load('FinalCastle.mtl', function (materials) {

				materials.preload();

				// materials.materials.default.map.magFilter = THREE.NearestFilter;
				// materials.materials.default.map.minFilter = THREE.LinearFilter;

				var objLoader = new THREE.OBJLoader();
				objLoader.setMaterials(materials);
				objLoader.setPath('assets/models/');
				objLoader.load('FinalCastle.obj', function (object) {
					var size = 0.05;
					object.scale.x = size;
					object.scale.y = size;
					object.scale.z = size;
					scene.add(object);
				});
			});

			/* Renderer */

			renderer = new THREE.WebGLRenderer();
			renderer.setPixelRatio(window.devicePixelRatio);
			renderer.setSize(80 / 100 * window.innerWidth, 11 / 10 * window.innerHeight);
			renderer.setClearColor(new THREE.Color('#101014'));

			container.appendChild(renderer.domElement);

			/* Controls */

			controls = new THREE.OrbitControls(camera, renderer.domElement);
			controls.enableDamping = true;
			controls.dampingFactor = 0.25;
			controls.enableZoom = false;

			/* Events */

			window.addEventListener('resize', onWindowResize, false);
			// window.addEventListener('keydown', onKeyboardEvent, false);
		}

		function onWindowResize() {

			camera.aspect = window.innerWidth / window.innerHeight;
			camera.updateProjectionMatrix();

			renderer.setSize(window.innerWidth, window.innerHeight);
		}

		function onKeyboardEvent(e) {

			if (e.code === 'KeyL') {

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

		function animate() {

			requestAnimationFrame(animate);

			controls.update();

			render();
		}

		function render() {

			renderer.render(scene, camera);
		}
	})();
});

},{"./viewportChecker":2,"sal.js":3}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
var isElementInViewport = function isElementInViewport(el) {

	//special bonus for those using jQuery
	if (typeof jQuery === "function" && el instanceof jQuery) {
		el = el[0];
	}

	var rect = el.getBoundingClientRect();

	return rect.top >= 0 && rect.left >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /*or $(window).height() */
	rect.right <= (window.innerWidth || document.documentElement.clientWidth) /*or $(window).width() */
	;
};

exports.isElementInViewport = isElementInViewport;

},{}],3:[function(require,module,exports){
!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.sal=t():e.sal=t()}(this,function(){return function(e){function t(r){if(n[r])return n[r].exports;var o=n[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,t),o.l=!0,o.exports}var n={};return t.m=e,t.c=n,t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:r})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="dist/",t(t.s=0)}([function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e};n(1);var o={rootMargin:"0% 50%",threshold:.5,animateClassName:"sal-animate",disabledClassName:"sal-disabled",selector:"[data-sal]",once:!0,disabled:!1},s=[],a=null,i=function(e){return e.classList.add(o.animateClassName)},l=function(e){return e.classList.remove(o.animateClassName)},c=function(e){return e.classList.contains(o.animateClassName)},u=function(){document.body.classList.remove(o.disabledClassName)},d=function(){document.body.classList.add(o.disabledClassName)},f=function(){return o.disabled||"function"==typeof o.disabled&&o.disabled()},b=function(e,t){e.forEach(function(e){e.intersectionRatio>=o.threshold?(i(e.target),o.once&&t.unobserve(e.target)):o.once||l(e.target)})},m=function(){d(),a.disconnect(),a=null},p=function(){u(),a=new IntersectionObserver(b,{rootMargin:o.rootMargin,threshold:o.threshold}),s=[].filter.call(document.querySelectorAll(o.selector),function(e){return!c(e,o.animateClassName)}),s.forEach(function(e){return a.observe(e)})},h=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:o;if(e!==o&&(o=r({},o,e)),!window.IntersectionObserver)throw d(),Error("\n      Your browser does not support IntersectionObserver!\n      Get a polyfill from here:\n      https://github.com/w3c/IntersectionObserver/tree/master/polyfill\n    ");return f()?d():p(),{elements:s,disable:m,enable:p}};t.default=h},function(e,t){}]).default});
},{}]},{},[1]);
