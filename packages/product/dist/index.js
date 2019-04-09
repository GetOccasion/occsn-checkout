/*!
 * @occsn/product v0.0.17
 * (c) 2019-present Peak Labs LLC DBA Occasion App
 * Released under the MIT License.
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var PropTypes = _interopDefault(require('prop-types'));
var classnames = _interopDefault(require('classnames'));
var _ = _interopDefault(require('underscore'));
var occsnProvider = require('@occsn/occsn-provider');

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

var Product =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(Product, _PureComponent);

  function Product() {
    var _this;

    _classCallCheck(this, Product);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Product).call(this));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "loadProduct", function () {
      var _this$props = _this.props,
          id = _this$props.id,
          onLoad = _this$props.onLoad;
      var Product = _this.context.occsn.Product;

      _this.setState({
        loading: true
      }, function () {
        return new Promise(function ($return, $error) {
          var product;
          return Promise.resolve(Product.includes('labels', {
            merchant: 'currency',
            venue: 'state'
          }).find(id)).then(function ($await_1) {
            try {
              product = $await_1;

              _this.setState({
                loading: false,
                product: product
              }, function () {
                return onLoad(product);
              });

              return $return();
            } catch ($boundEx) {
              return $error($boundEx);
            }
          }, $error);
        });
      });
    });

    _this.state = {
      loading: false,
      product: null
    };
    return _this;
  }

  _createClass(Product, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.loadProduct();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var id = this.props.id;
      var prevId = prevProps.id;
      if (id !== prevId) this.loadProduct();
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          children = _this$props2.children,
          className = _this$props2.className;
      var _this$state = this.state,
          loading = _this$state.loading,
          product = _this$state.product;
      var classNames = classnames(className, 'occsn-product', {
        loading: loading
      });
      return React__default.createElement("section", {
        className: classNames
      }, product && React__default.Children.map(children, function (child) {
        return React__default.cloneElement(child, {
          product: product
        });
      }));
    }
  }]);

  return Product;
}(React.PureComponent);

_defineProperty(Product, "contextType", occsnProvider.OccsnContext);

_defineProperty(Product, "propTypes", {
  id: PropTypes.string.isRequired,
  onLoad: PropTypes.func
});

_defineProperty(Product, "defaultProps", {
  onLoad: _.noop
});

exports.Product = Product;
