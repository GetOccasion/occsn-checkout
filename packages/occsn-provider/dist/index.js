/*!
 * @occsn/occsn-provider v0.0.17
 * (c) 2019-present Peak Labs LLC DBA Occasion App
 * Released under the MIT License.
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var PropTypes = _interopDefault(require('prop-types'));
require('mitragyna');
require('reactstrap');
var _ = _interopDefault(require('underscore'));
var ActiveResource = _interopDefault(require('active-resource'));
var Occasion = _interopDefault(require('occasion-sdk'));

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}

var OccsnContext = React__default.createContext();

var OccsnProvider =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(OccsnProvider, _PureComponent);

  function OccsnProvider(_ref) {
    var _this;

    var immutable = _ref.immutable,
        publicKey = _ref.publicKey,
        url = _ref.url;

    _classCallCheck(this, OccsnProvider);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(OccsnProvider).call(this));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "registerComponent", function (name, component) {
      _this.setState({
        components: _.extend(_this.state.components, _defineProperty({}, name, component))
      });
    });

    var options = {
      immutable: immutable,
      token: publicKey
    };

    if (url != undefined) {
      options.baseUrl = ActiveResource.Links.__constructLink(url, 'api', 'v1');
    }

    _this.state = {
      components: {},
      occsn: Occasion.Client(options)
    };
    return _this;
  } // Adds a subcomponent like MissingAnswers or Redeemables to the component register
  // so the OrderForm can use them in internal methods


  _createClass(OccsnProvider, [{
    key: "render",
    value: function render() {
      var children = this.props.children;
      return React__default.createElement(OccsnContext.Provider, {
        value: Object.assign({}, this.state, {
          registerComponent: this.registerComponent
        })
      }, children);
    }
  }]);

  return OccsnProvider;
}(React.PureComponent);

_defineProperty(OccsnProvider, "propTypes", {
  immutable: PropTypes.bool,
  publicKey: PropTypes.string.isRequired,
  privateKey: PropTypes.string.isRequired,
  url: PropTypes.string
});

_defineProperty(OccsnProvider, "defaultProps", {
  url: window.OCCSN.host_url
});

exports.OccsnContext = OccsnContext;
exports.default = OccsnProvider;
