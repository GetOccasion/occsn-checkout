/*!
 * @occsn/customer v0.0.17
 * (c) 2019-present Peak Labs LLC DBA Occasion App
 * Released under the MIT License.
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
require('prop-types');
var classnames = _interopDefault(require('classnames'));
var mitragyna = require('mitragyna');
var reactstrap = require('reactstrap');
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

var Customer =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(Customer, _PureComponent);

  function Customer() {
    var _this;

    _classCallCheck(this, Customer);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Customer).call(this));
    _this.state = {};
    return _this;
  }

  _createClass(Customer, [{
    key: "render",
    value: function render() {
      var className = this.props.className;
      var order = this.context.components.order;
      var classNames = classnames('occsn-customer', className);
      var customer = order.getOrder().customer();
      return React__default.createElement("section", {
        className: classNames
      }, React__default.createElement(mitragyna.Resource, {
        reflection: "customer",
        subject: customer
      }, React__default.createElement(reactstrap.FormGroup, {
        className: "customer-email-form-group"
      }, React__default.createElement(reactstrap.Label, {
        for: "email"
      }, "Email*"), React__default.createElement(mitragyna.Field, {
        className: "customer-email-field",
        type: "email",
        name: "email",
        id: "email",
        component: reactstrap.Input,
        invalidClassName: "is-invalid"
      }), React__default.createElement(mitragyna.ErrorsFor, {
        className: "customer-email-errors",
        component: reactstrap.FormFeedback,
        field: "email"
      })), React__default.createElement(reactstrap.FormGroup, {
        className: "customer-first-name-form-group"
      }, React__default.createElement(reactstrap.Label, {
        for: "firstName"
      }, "First Name*"), React__default.createElement(mitragyna.Field, {
        className: "customer-first-name-field",
        type: "text",
        name: "firstName",
        id: "firstName",
        component: reactstrap.Input,
        invalidClassName: "is-invalid"
      }), React__default.createElement(mitragyna.ErrorsFor, {
        className: "customer-first-name-errors",
        component: reactstrap.FormFeedback,
        field: "firstName"
      })), React__default.createElement(reactstrap.FormGroup, {
        className: "customer-last-name-form-group"
      }, React__default.createElement(reactstrap.Label, {
        for: "lastName"
      }, "Last Name*"), React__default.createElement(mitragyna.Field, {
        className: "customer-last-name-field",
        type: "text",
        name: "lastName",
        id: "lastName",
        component: reactstrap.Input,
        invalidClassName: "is-invalid"
      }), React__default.createElement(mitragyna.ErrorsFor, {
        className: "customer-last-name-errors",
        component: reactstrap.FormFeedback,
        field: "lastName"
      })), React__default.createElement(reactstrap.FormGroup, {
        className: "customer-zip-form-group"
      }, React__default.createElement(reactstrap.Label, {
        for: "zip"
      }, "Zip Code*"), React__default.createElement(mitragyna.Field, {
        className: "customer-zip-field",
        type: "text",
        name: "zip",
        id: "zip",
        component: reactstrap.Input,
        invalidClassName: "is-invalid"
      }), React__default.createElement(mitragyna.ErrorsFor, {
        className: "customer-zip-errors",
        component: reactstrap.FormFeedback,
        field: "zip"
      }))));
    }
  }]);

  return Customer;
}(React.PureComponent);

_defineProperty(Customer, "contextType", occsnProvider.OccsnContext);

exports.Customer = Customer;
