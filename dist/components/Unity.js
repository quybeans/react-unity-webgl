"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __importStar(require("react"));
var UnityLoaderService_1 = __importDefault(require("../services/UnityLoaderService"));
require("../Types");
var Unity = /** @class */ (function (_super) {
    __extends(Unity, _super);
    /**
     * Initialized the component.
     * @param {IUnityProps} props
     */
    function Unity(props) {
        var _this = _super.call(this, props) || this;
        /**
         * The component state.
         * @type {IUnityState}
         * @public
         */
        _this.state = {};
        _this.unityLoaderService = new UnityLoaderService_1.default();
        _this.onWindowResizeBinding = _this.onWindowResize.bind(_this);
        _this.unityContent = _this.props.unityContent;
        _this.unityContent.setComponentInstance(_this);
        return _this;
    }
    /**
     * An event that is triggered by the Unity player. This tracks
     * the loading progression of the player. It will send '1' when
     * the loading is completed.
     * @param {UnityInstance} unityInstance
     * @param {number} progression
     * @private
     */
    Unity.prototype.onProgress = function (unityInstance, progression) {
        this.unityContent.triggerUnityEvent("progress", progression);
        if (progression === 1)
            this.unityContent.triggerUnityEvent("loaded");
    };
    /**
     * When the window is resized.
     */
    Unity.prototype.onWindowResize = function () {
        if (this.unityContent.unityConfig.adjustOnWindowResize === true)
            this.adjustCanvasToContainer();
    };
    /**
     * Since the Unity canvas itself does not respond to the resizing
     * of it's container we have to manually do this. A width and height
     * of 100% does not seem to work, so we have to fetch it's parent's
     * size to adject the canvas.
     * @private
     */
    Unity.prototype.adjustCanvasToContainer = function () {
        var _width = this.htmlElement.offsetWidth;
        var _height = this.htmlElement.offsetHeight;
        var _canvas = this.htmlElement.getElementsByTagName("canvas")[0];
        if (_canvas !== null) {
            if (_canvas.height !== _height) {
                _canvas.height = _height;
            }
            if (_canvas.width !== _width) {
                _canvas.width = _width;
            }
        }
    };
    /**
     * Initialzied the Unity player when the component is mounted.
     * @public
     */
    Unity.prototype.componentDidMount = function () {
        var _this = this;
        window.addEventListener("resize", this.onWindowResizeBinding);
        // prettier-ignore
        this.unityLoaderService.append(this.props.unityContent.unityLoaderJsPath, function () {
            _this.unityContent.setUnityInstance(UnityLoader.instantiate("__ReactUnityWebGL_" + _this.props.unityContent.uniqueID + "__", _this.props.unityContent.buildJsonPath, {
                onProgress: _this.onProgress.bind(_this),
                Module: _this.props.unityContent.unityConfig.modules,
                width: "100%",
                height: "100%"
            }));
        });
    };
    /**
     * Will remove event listeners and clean up systems when the
     * component is about to unmount.
     * @public
     */
    Unity.prototype.componentWillUnmount = function () {
        window.removeEventListener("resize", this.onWindowResizeBinding);
    };
    /**
     * Renders the unity wrapper and player.
     * @returns {React.ReactNode} element
     * @public
     */
    Unity.prototype.render = function () {
        var _this = this;
        return React.createElement("div", {
            className: this.props.className || "",
            ref: function (ref) { return (_this.htmlElement = ref); },
            id: "__ReactUnityWebGL_" + this.props.unityContent.uniqueID + "__",
            style: {
                width: this.props.width || "800px",
                height: this.props.height || "600px"
            }
        });
    };
    return Unity;
}(React.Component));
exports.default = Unity;
//# sourceMappingURL=Unity.js.map