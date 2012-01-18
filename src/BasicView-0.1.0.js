/**
 * @fileOverview
 * @name BasicView.js
 * @author alumican yukiya@alumican.net http://alumican.net/
 * @url
 * @version 0.1.0
 * @license <a href="http://en.wikipedia.org/wiki/MIT_License">X11/MIT License</a>
 */

var ALUMICAN;
if (!ALUMICAN) ALUMICAN = {}; 

/**
 * BasicView class is very simple template for getting started Three.js.
 * @class
 * @param {string} [rendererType="WebGL"] Renderer type ("WebGL" or "Canvas" or "SVG" or "DOM").
 * @param {object} [rendererParams={}] Renderer construct parameters.
 * @param {string} [cameraType="Perspective"] Camera type ("Perspective" or "Orthographic").
 * @param {bool} [useStats=true] Whether stats is used or not.
 * @param {bool} [useAutoScalingToStage=true] Whether content is scaled to fit stage (true) or not.
 * @param {integer} [viewportWidth=640] Viewport width. If auto scaling is used, this value is ignored.
 * @param {integer} [viewportHeight=480] Viewport height. If auto scaling is used, this value is ignored.
 *
 * @property {DOM element} container Viewport Container.
 * @property {Three.js Scene object} scene Three.js Scene Object.
 * @property {Three.js Camera object} camera Three.js Camera Object.
 * @property {Three.js Renderer object} renderer Three.js Renderer Object.
 * @property {integer} mouseX Current mouse position x.
 * @property {integer} mouseY Current mouse position y.
 * @property {integer} oldMouseX Previous mouse position x.
 * @property {integer} oldMouseY Previous mouse position y.
 * @property {integer} screenWidth Window width.
 * @property {integer} screenHeight Window height.
 * @property {bool} isMouseDown Whether mouse is being pressed.
 * @property {bool} isMouseDragging Whether mouse is being dragged.
 * @property {bool} isKeyDown Whether keyboard is being pressed.
 * @property {string} rendererType Renderer Type.
 * @property {string} cameraType Camera Type.
 * @property {bool} useAutoScalingToStage Whether content is scaled to fit stage (true) or not.
 *
 * @return void
 */
ALUMICAN.BasicView = function(rendererType, rendererParams, cameraType, useStats, useAutoScalingToStage, viewportWidth, viewportHeight)
{
	this.container;

	this.scene;
	this.camera;
	this.renderer;

	this.mouseX;
	this.mouseY;
	this.oldMouseX;
	this.oldMouseY;

	this.screenWidth;
	this.screenHeight;

	this.isMouseDown;
	this.isMouseDragging;
	this.isKeyDown;
	
	this.rendererType;
	this.cameraType;
	
	this.useAutoScalingToStage;

	//----------------------------------------
	//call construntor
	this._initialize.apply(this, arguments);
}

/**
 * Version information
 * @static
 */
ALUMICAN.BasicView.version = "1.0.1";

ALUMICAN.BasicView.prototype =
{
	/**
	 * This function is called once when application starts.
	 * @event
	 * @return void
	 */
	setup : function()
	{
	},

	/**
	 * This function is called each frame.
	 * @event
	 * @return void
	 */
	update : function()
	{
	},

	/**
	 * This function is called after update().
	 * @event
	 * @return void
	 */
	draw : function()
	{
	},

	/**
	 * This function is called when window is closing.
	 * @event
	 * @return void
	 */
	exit : function()
	{
	},

	/**
	 * This function is called when mouse button is pressed.
	 * @event
	 * @param {object} event Event object.
	 * @return void
	 */
	onMouseDown : function(event)
	{
	},

	/**
	 * This function is called when mouse button is released.
	 * @event
	 * @param {object} event Event object.
	 * @return void
	 */
	onMouseUp : function(event)
	{
	},

	/**
	 * This function is called when mouse position is updated.
	 * @event
	 * @param {object} event Event object.
	 * @return void
	 */
	onMouseMove : function(event)
	{
	},

	/**
	 * This function is called when mouse drag position is updated.
	 * @event
	 * @param {object} event Event object.
	 * @return void
	 */
	onMouseDragged : function(event)
	{
	},

	/**
	 * This function is called when keyboard is pressed.
	 * @event
	 * @param {integer} keyCode Key code.
	 * @param {object} event Event object.
	 * @return void
	 */
	onKeyDown : function(keyCode, event)
	{
	},

	/**
	 * This function is called when keyboard is released.
	 * @event
	 * @param {integer} keyCode Key code.
	 * @param {object} event Event object.
	 * @return void
	 */
	onKeyUp : function(keyCode, event)
	{
	},

	/**
	 * This function is called when window is resized.
	 * @event
	 * @param {object} event Event object.
	 * @return void
	 */
	onResize : function(event)
	{
	},

	//----------------------------------------
	/**
	 * #@+
	 * @private
	 */
	_initialize : function(rendererType, rendererParams, cameraType, useStats, useAutoScalingToStage, viewportWidth, viewportHeight)
	{
		//set default value
		if (rendererType == undefined) rendererType = "WebGL";
		if (rendererParams == undefined) rendererParams = {};
		if (cameraType == undefined) cameraType = "Perspective";
		if (useStats == undefined) useStats = true;
		if (useAutoScalingToStage == undefined) useAutoScalingToStage = true;
		if (viewportWidth == undefined) viewportWidth = 640;
		if (viewportHeight == undefined) viewportHeight = 480;

		//output version
		if (useStats)
		{
			console.log("BasicView " + ALUMICAN.BasicView.version);
		}

		//WebGL is not supported
		if(rendererType == "WebGL" && !Detector.webgl)
		{
			Detector.addGetWebGLMessage();
			return;
		}

		//setup
		{
			this.rendererType = rendererType;
			this.cameraType = cameraType;
			this.useAutoScalingToStage = useAutoScalingToStage;

			this.isMouseDown = false;
			this.isMouseDragging = false;
			this.isKeyDown = false;

			this.oldMouseX = this.mouseX = 0;
			this.oldMouseY = this.mouseY = 0;

			var self = this;
			$(function() {

				if (self.useAutoScalingToStage)
				{
					self.screenWidth  = $(window).width();
					self.screenHeight = $(window).height();
				}
				else
				{
					self.screenWidth  = viewportWidth;
					self.screenHeight = viewportHeight;
				}

				//create scene
				self.scene = new THREE.Scene();

				//create camera
				switch (cameraType)
				{
					case "Orthographic":
						self.camera = new THREE.OrthographicCamera(-self.screenWidth * 0.5, self.screenWidth * 0.5, self.screenHeight * 0.5, -self.screenHeight * 0.5, 1, 10000);
						break;

					default:
						self.cameraType = "Perspective";
						self.camera = new THREE.PerspectiveCamera(75, self.screenWidth / self.screenHeight, 1, 10000);
						break;
				}
				self.camera.position.z = 1000;

				//create renderer
				switch (rendererType)
				{
					case "Canvas":
						self.renderer = new THREE.CanvasRenderer(rendererParams);
						break;

					case "SVG":
						self.renderer = new THREE.SVGRenderer();
						break;

					case "DOM":
						self.renderer = new THREE.DOMRenderer();
						break;

					default:
						this.rendererType = "WebGL";
						self.renderer = new THREE.WebGLRenderer(rendererParams);
						break;
				}
				self.renderer.setSize(self.screenWidth, self.screenHeight);

				//create container
				self.container = $("<div>").get(0);
				$(document.body).append(self.container);

				//stats
				if (useStats)
				{
					self.stats = new Stats();
					$(self.stats.domElement).css("position", "absolute");
					$(self.stats.domElement).css("top", "0px");
					$(self.container).append(self.stats.domElement);
				}

				//container
				self.container.appendChild(self.renderer.domElement);
				self.scene.add(self.camera);

				//event
				$(document).mousedown(function(e) { self._mouseDownHandler(e); });
				$(document).mousemove(function(e) { self._mouseMoveHandler(e); });
				$(document).mouseup(function(e) { self._mouseUpHandler(e); });
				$(window).keydown(function(e){ self._keyDownHandler(e); });
				$(window).keyup(function(e){ self._keyUpHandler(e); });
				$(window).resize(function(e) { self._resizeHandler(e); });
				$(window).unload(function(e) { self._unloadHandler(e); });

				self.setup();
				self._enterFrameHandler(null);
			});
		}
	},

	_enterFrameHandler : function(e)
	{
		var self = this;
		requestAnimationFrame(function(e) { self._enterFrameHandler(e); });

		this.oldMouseX = this.mouseX;
		this.oldMouseY = this.mouseY;

		this.update();
		this.draw();

		this.stats.update();
	},

	_mouseDownHandler : function(e)
	{
		this.isMouseDown = true;
		this.onMouseDown(e);
	},

	_mouseMoveHandler : function(e)
	{
		if (e.pageX == this.mouseX && e.pageY == this.mouseY) return;
		this.mouseX = e.pageX;
		this.mouseY = e.pageY;

		if (this.isMouseDown)
		{
			this.isMouseDragging = true;
			this.onMouseDragged(e);
		}
		else
		{
			this.onMouseMove(e);
		}
	},

	_mouseUpHandler : function(e)
	{
		this.isMouseDown = false;
		this.isMouseDragging = false;
		this.onMouseUp(e);
	},

	_keyDownHandler : function(e)
	{
		this.isKeyDown = true;
		this.onKeyDown(e.keyCode, e);
	},

	_keyUpHandler : function(e)
	{
		this.isKeyDown = false;
		this.onKeyUp(e.keyCode, e);
	},

	_resizeHandler : function(e)
	{
		if (this.useAutoScalingToStage)
		{
			this.screenWidth  = $(window).width();
			this.screenHeight = $(window).height();
		}

		if (this.useAutoScalingToStage)
		{
			switch (this.cameraType)
			{
				case "Orthographic":
					this.camera.aspect = this.screenWidth / this.screenHeight;
					this.camera.left = -this.screenWidth * 0.5;
					this.camera.right = this.screenWidth * 0.5;
					this.camera.top = this.screenHeight * 0.5;
					this.camera.bottom = -this.screenHeight * 0.5;
					this.camera.updateProjectionMatrix();
					this.renderer.setSize(this.screenWidth, this.screenHeight);
					break;

				default:
					this.camera.aspect = this.screenWidth / this.screenHeight;
					this.camera.updateProjectionMatrix();
					this.renderer.setSize(this.screenWidth, this.screenHeight);
					break;
			}
		}

		this.onResize(e);
	},
	
	_unloadHandler : function(e)
	{
		this.exit();
	}
	
	/** #@- */
}