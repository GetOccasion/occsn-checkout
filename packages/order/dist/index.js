/*!
 * @occsn/order v0.0.17
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
var occsnProvider = require('@occsn/occsn-provider');
var mitragyna = require('mitragyna');
require('reactstrap');
var _ = _interopDefault(require('underscore'));

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

var BookOrder =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(BookOrder, _PureComponent);

  function BookOrder() {
    var _this;

    _classCallCheck(this, BookOrder);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(BookOrder).call(this));
    var registerComponent = _this.context.registerComponent;
    registerComponent('bookOrder', _assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  _createClass(BookOrder, [{
    key: "render",
    value: function render() {
      var order = this.context.components.order;
      return React__default.Children.only(this.props.children, function (child) {
        return React__default.cloneElement(child, {
          className: classnames(child.props.className, {
            booking: order.isBooking()
          }),
          disabled: !order.allowedToBookOrder(),
          onClick: order.submit
        });
      });
    }
  }]);

  return BookOrder;
}(React.PureComponent);

_defineProperty(BookOrder, "contextType", occsnProvider.OccsnContext);

var Order =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(Order, _PureComponent);

  function Order(_ref) {
    var _this;

    var onChange = _ref.onChange,
        _product = _ref.product;

    _classCallCheck(this, Order);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Order).call(this));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "allowedToBookOrder", function () {
      var missingAnswers = _this.context.components.missingAnswers;
      var _this$state = _this.state,
          bookingOrder = _this$state.bookingOrder,
          order = _this$state.order,
          savingOrder = _this$state.savingOrder;
      if (!order || !missingAnswers) return false;
      return !bookingOrder && !savingOrder && missingAnswers.missingRequiredAnswers(order).empty();
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "validateOrderBookable", function (order) {
      var _this$context = _this.context,
          paymentForm = _this$context.paymentForm,
          redeemables = _this$context.redeemables; // If the user hits enter while focused on the redeemables input, then submit the
      // redeemable search and cancel the order form submissionm

      if (redeemables && redeemables.state.focused) {
        redeemables.checkForRedeemable(redeemables.state.code);
        throw order;
      }

      if (!order.outstandingBalance.isZero()) {
        var balanceTransaction = order.transactions().target().detect(function (t) {
          return !(t.paymentMethod() && t.paymentMethod(occsn.GiftCard));
        });
        if (balanceTransaction) order.transactions().target().delete(balanceTransaction);
        return paymentForm.chargeOutstandingBalanceToPaymentMethod(order);
      } else {
        return order;
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "bookOrder", function (order) {
      _this.setState({
        bookingOrder: true
      }, function () {
        return new Promise(function ($return, $error) {
          var $Try_1_Post = function () {
            try {
              _this.setOrder(order, function () {
                return _this.setState({
                  bookingOrder: false
                });
              });

              return $return();
            } catch ($boundEx) {
              return $error($boundEx);
            }
          };

          var $Try_1_Catch = function (invalidOrder) {
            try {
              order = invalidOrder;
              return $Try_1_Post();
            } catch ($boundEx) {
              return $error($boundEx);
            }
          };

          try {
            return Promise.resolve(order.update({
              status: 'reserved'
            })).then(function ($await_2) {
              try {
                order = $await_2;
                return $Try_1_Post();
              } catch ($boundEx) {
                return $Try_1_Catch($boundEx);
              }
            }, $Try_1_Catch);
          } catch (invalidOrder) {
            $Try_1_Catch(invalidOrder);
          }
        });
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "constructOrder", function () {
      var product = _this.props.product;
      var Order = _this.context.occsn.Order;
      Order.construct({
        product: product,
        status: 'initialized'
      }).then(_this.setOrder);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "isBooking", function () {
      return _this.state.bookingOrder;
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "isSaving", function () {
      return _this.state.savingOrder;
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "getOrder", function () {
      return _this.state.order;
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "saveOrder", function (order) {
      return new Promise(function ($return, $error) {
        _this.setState({
          savingOrder: true
        }, function () {
          return new Promise(function ($return, $error) {
            var newOrder;
            return Promise.resolve(order.save()).then(function ($await_3) {
              try {
                newOrder = $await_3;

                _this.setOrder(newOrder, function () {
                  return _this.setState({
                    savingOrder: false
                  });
                });

                return $return();
              } catch ($boundEx) {
                return $error($boundEx);
              }
            }, $error);
          });
        });

        return $return();
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "setOrder", function (order) {
      var onSet = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _.noop;

      _this.setState({
        order: order
      }, function () {
        onSet(order);

        _this.onChange(order);
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "submit", function () {
      _this.resourceRef.handleSubmit();
    });

    _this.onChange = onChange;
    _this.resourceRef = React__default.createRef();
    _this.state = {
      bookingOrder: false,
      order: null,
      savingOrder: false
    };
    return _this;
  }

  _createClass(Order, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var product = this.props.product;
      var _this$context2 = this.context,
          Product = _this$context2.occsn.Product,
          registerComponent = _this$context2.registerComponent;

      if (!(product.isA && product.isA(Product))) {
        throw TypeError('Order component received prop product not of type Product');
      }

      registerComponent('order', this);
      this.constructOrder();
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          children = _this$props.children,
          className = _this$props.className;
      var _this$state2 = this.state,
          bookingOrder = _this$state2.bookingOrder,
          order = _this$state2.order,
          savingOrder = _this$state2.savingOrder;
      var classNames = classnames('occsn-order-form', className);
      return React__default.createElement("section", {
        className: classNames
      }, order && React__default.createElement(mitragyna.Resource, {
        afterError: this.setOrder,
        afterUpdate: this.saveOrder,
        beforeSubmit: this.validateOrderBookable,
        onInvalidSubmit: this.setOrder,
        onSubmit: this.bookOrder,
        ref: this.resourceRef,
        subject: order
      }, children));
    }
  }]);

  return Order;
}(React.PureComponent);

_defineProperty(Order, "contextType", occsnProvider.OccsnContext);

_defineProperty(Order, "propTypes", {
  onChange: PropTypes.func,
  product: PropTypes.object.isRequired
});

_defineProperty(Order, "defaultProps", {
  onChange: _.noop
});

exports.default = Order;
exports.BookOrder = BookOrder;
