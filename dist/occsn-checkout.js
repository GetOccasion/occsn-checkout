/*!
 * occsn-checkout v0.0.17
 * (c) 2019-present Peak Labs LLC DBA Occasion App
 * Released under the MIT License.
 */
'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var ActiveResource = _interopDefault(require('active-resource'));
var Occasion = _interopDefault(require('occasion-sdk'));
var mirrorCreator = _interopDefault(require('mirror-creator'));
var React = require('react');
var React__default = _interopDefault(React);
var PropTypes = _interopDefault(require('prop-types'));
var ReactHtmlParser = _interopDefault(require('react-html-parser'));
var reactstrap = require('reactstrap');
var classnames = _interopDefault(require('classnames'));
var _ = _interopDefault(require('underscore'));
var mitragyna = require('mitragyna');
var moment = _interopDefault(require('moment'));
var FullCalendar = _interopDefault(require('fullcalendar-reactwrapper'));
require('fullcalendar-reactwrapper/dist/css/fullcalendar.min.css');
var reactRedux = require('react-redux');
var s = _interopDefault(require('underscore.string'));
var Currency = _interopDefault(require('react-currency-formatter'));
var Decimal = _interopDefault(require('decimal.js-light'));
var Q = _interopDefault(require('q'));
var Script = _interopDefault(require('react-load-script'));
var server = require('react-dom/server');
var Immutable = _interopDefault(require('immutable'));
var redux = require('redux');
var reduxDevtoolsExtension = require('redux-devtools-extension');
var thunkMiddleware = _interopDefault(require('redux-thunk'));

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

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

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    var ownKeys = Object.keys(source);

    if (typeof Object.getOwnPropertySymbols === 'function') {
      ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
      }));
    }

    ownKeys.forEach(function (key) {
      _defineProperty(target, key, source[key]);
    });
  }

  return target;
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

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  }
}

function _iterableToArray(iter) {
  if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}

var options = {
  token: window.OCCSN.api_key,
  immutable: true
};
var url = window.OCCSN.host_url;

if (url != undefined) {
  options.baseUrl = ActiveResource.prototype.Links.__constructLink(url, 'api', 'v1');
}

var occsn = Occasion.Client(options);

var actionTypes = mirrorCreator(['OCCSN_BOOK_ORDER_REQUEST', 'OCCSN_BOOK_ORDER_REQUEST_COMPLETE', 'OCCSN_CONSTRUCT_ORDER_REQUEST', 'OCCSN_FIND_REDEEMABLE_REQUEST', 'OCCSN_FIND_REDEEMABLE_REQUEST_COMPLETE', 'OCCSN_LOAD_PRODUCT_REQUEST', 'OCCSN_LOAD_PRODUCT_REQUEST_COMPLETE', 'OCCSN_SAVE_ORDER_REQUEST', 'OCCSN_SAVE_ORDER_REQUEST_COMPLETE', 'OCCSN_SET_ORDER', 'OCCSN_SET_PRODUCT', 'OCCSN_SET_PRODUCT_NOT_FOUND_ERROR', 'OCCSN_SET_SKIP_ATTENDEE']);

function constructOrder(product) {
  return function (dispatch) {
    dispatch(constructOrderRequest());
    return occsn.Order.construct({
      product: product,
      status: 'initialized'
    }).then(function (order) {
      dispatch(setOrder(order));
    });
  };
}
function constructOrderRequest() {
  return {
    type: actionTypes.OCCSN_CONSTRUCT_ORDER_REQUEST
  };
}
function bookOrder(order) {
  return (
    /*#__PURE__*/
    function () {
      var _ref = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(dispatch) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                dispatch(bookOrderRequest());
                _context.prev = 1;
                _context.next = 4;
                return order.update({
                  status: 'reserved'
                });

              case 4:
                order = _context.sent;
                _context.next = 10;
                break;

              case 7:
                _context.prev = 7;
                _context.t0 = _context["catch"](1);
                order = _context.t0;

              case 10:
                dispatch(setOrder(order));
                dispatch(bookOrderRequestComplete());

              case 12:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[1, 7]]);
      }));

      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }()
  );
}
function bookOrderRequest() {
  return {
    type: actionTypes.OCCSN_BOOK_ORDER_REQUEST
  };
}
function bookOrderRequestComplete(order) {
  return {
    type: actionTypes.OCCSN_BOOK_ORDER_REQUEST_COMPLETE,
    order: order
  };
}
function findRedeemable(product, code, onSuccess, onError) {
  return function (dispatch) {
    dispatch(findRedeemableRequest());
    return product.redeemables().findBy({
      code: code
    }).then(onSuccess, onError).finally(function () {
      dispatch(findRedeemableRequestComplete());
    });
  };
}
function findRedeemableRequest() {
  return {
    type: actionTypes.OCCSN_FIND_REDEEMABLE_REQUEST
  };
}
function findRedeemableRequestComplete() {
  return {
    type: actionTypes.OCCSN_FIND_REDEEMABLE_REQUEST_COMPLETE
  };
}
function loadProduct(id) {
  return function (dispatch) {
    dispatch(loadProductRequest());
    var query = occsn.Product.includes({
      merchant: 'currency',
      venue: 'state'
    }).find(id);
    return query.then(function (product) {
      dispatch(setProduct(product));
      dispatch(constructOrder(product));
    }).catch(function (error) {
      dispatch(productNotFoundError(error));
    }).finally(function () {
      dispatch(loadProductRequestComplete());
    });
  };
}
function loadProductRequest() {
  return {
    type: actionTypes.OCCSN_LOAD_PRODUCT_REQUEST
  };
}
function loadProductRequestComplete() {
  return {
    type: actionTypes.OCCSN_LOAD_PRODUCT_REQUEST_COMPLETE
  };
}
function saveOrder(order) {
  return (
    /*#__PURE__*/
    function () {
      var _ref2 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(dispatch) {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                dispatch(saveOrderRequest());
                _context2.next = 3;
                return order.save();

              case 3:
                order = _context2.sent;
                dispatch(setOrder(order));
                dispatch(saveOrderRequestComplete());

              case 6:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      return function (_x2) {
        return _ref2.apply(this, arguments);
      };
    }()
  );
}
function saveOrderRequest() {
  return {
    type: actionTypes.OCCSN_SAVE_ORDER_REQUEST
  };
}
function saveOrderRequestComplete() {
  return {
    type: actionTypes.OCCSN_SAVE_ORDER_REQUEST_COMPLETE
  };
}
function setOrder(order) {
  return {
    type: actionTypes.OCCSN_SET_ORDER,
    order: order
  };
}
function setProduct(product) {
  return {
    type: actionTypes.OCCSN_SET_PRODUCT,
    product: product
  };
}
function productNotFoundError(error) {
  return {
    type: actionTypes.OCCSN_SET_PRODUCT_NOT_FOUND_ERROR,
    error: error
  };
}
function setSkipAttendee(attendee, skip) {
  return {
    type: actionTypes.OCCSN_SET_SKIP_ATTENDEE,
    attendee: attendee,
    skip: skip
  };
}

var Header =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(Header, _PureComponent);

  function Header() {
    _classCallCheck(this, Header);

    return _possibleConstructorReturn(this, _getPrototypeOf(Header).apply(this, arguments));
  }

  _createClass(Header, [{
    key: "render",
    value: function render() {
      var product = this.props.product;
      var merchant = product.merchant();
      var venue = product.venue();
      return React__default.createElement("section", null, product.image.url ? React__default.createElement("section", {
        style: {
          maxHeight: '360px',
          overflow: 'hidden'
        }
      }, React__default.createElement("img", {
        style: {
          width: '100%'
        },
        src: product.image.url
      })) : null, React__default.createElement(reactstrap.Jumbotron, null, React__default.createElement(reactstrap.Row, null, React__default.createElement(reactstrap.Col, {
        className: "venue",
        sm: "3"
      }, React__default.createElement("h3", null, venue.name), React__default.createElement("p", null, venue.address, ", ", venue.city, ", ", venue.state().code, " ", venue.zip)), React__default.createElement(reactstrap.Col, {
        sm: "9"
      }, React__default.createElement("h2", null, merchant.name), React__default.createElement("hr", null), React__default.createElement("section", {
        className: "product"
      }, React__default.createElement("h1", null, product.title), React__default.createElement("span", null, ReactHtmlParser(product.description)))))));
    }
  }]);

  return Header;
}(React.PureComponent);

_defineProperty(Header, "propTypes", {
  product: PropTypes.instanceOf(occsn.Product)
});

var actionTypes$1 = mirrorCreator(['OCCSN_LOAD_PRODUCT_TIME_SLOTS_REQUEST', 'OCCSN_SET_ACTIVE_TIME_SLOTS_COLLECTION', 'OCCSN_SET_TIME_SLOTS_FROM_CALENDAR']);

function loadProductCalendar(product) {
  return function (dispatch) {
    dispatch(loadProductTimeSlotsRequest());
    return product.constructCalendar(product.firstTimeSlotStartsAt.clone().startOf('month')).then(function (timeSlots) {
      dispatch(setActiveTimeSlotsCollection(timeSlots));
    });
  };
}
function loadProductTimeSlots(product) {
  return function (dispatch) {
    dispatch(loadProductTimeSlotsRequest());
    var query = product.timeSlots().includes({
      product: 'merchant'
    }).where({
      status: 'bookable'
    }).all();
    return query.then(function (timeSlots) {
      dispatch(setActiveTimeSlotsCollection(timeSlots));
    });
  };
}
function loadProductTimeSlotsRequest() {
  return {
    type: actionTypes$1.OCCSN_LOAD_PRODUCT_TIME_SLOTS_REQUEST
  };
}
function setActiveTimeSlotsCollection(timeSlots) {
  return {
    type: actionTypes$1.OCCSN_SET_ACTIVE_TIME_SLOTS_COLLECTION,
    timeSlots: timeSlots
  };
}
function setTimeSlotsFromCalendar(timeSlots) {
  return {
    type: actionTypes$1.OCCSN_SET_TIME_SLOTS_FROM_CALENDAR,
    timeSlots: timeSlots
  };
}

var TimeSlotsSelector =
/*#__PURE__*/
function (_React$Component) {
  _inherits(TimeSlotsSelector, _React$Component);

  function TimeSlotsSelector() {
    var _this;

    _classCallCheck(this, TimeSlotsSelector);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(TimeSlotsSelector).call(this));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "selectTimeSlot", function (timeSlot) {
      var _this$props = _this.props,
          onSelect = _this$props.onSelect,
          subject = _this$props.subject;
      var timeSlots = subject.timeSlots().toArray();

      if (subject.product().sellsDropIns) {
        if (timeSlots.includes(timeSlot)) {
          timeSlots = timeSlots.filter(function (ts) {
            return ts !== timeSlot;
          });
        } else {
          timeSlots.push(timeSlot);
        }
      } else {
        timeSlots = [timeSlot];
      }

      var newSubject = subject.assignAttributes({
        timeSlots: timeSlots
      });
      onSelect(newSubject);
    });

    _this.state = {
      toolTips: {}
    };
    return _this;
  }

  _createClass(TimeSlotsSelector, [{
    key: "toggleToolTip",
    value: function toggleToolTip(id) {
      var _this2 = this;

      return function () {
        var toolTips = _this2.state.toolTips;
        toolTips[id] = !toolTips[id];

        _this2.setState({
          toolTips: toolTips
        });
      };
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var _this$props2 = this.props,
          calendar = _this$props2.calendar,
          disabled = _this$props2.disabled,
          timeSlots = _this$props2.timeSlots,
          showAvailability = _this$props2.showAvailability,
          subject = _this$props2.subject;
      var formatProps = this.context.formatProps;
      var customControlInputClassNames = classnames('custom-control-input', {
        'is-invalid': !subject.errors().forField('timeSlots').empty()
      });
      var timeSlotFormat;

      if (calendar) {
        timeSlotFormat = formatProps.calendarTimeSlotsSelector || 'LT';
      } else {
        timeSlotFormat = formatProps.listTimeSlotsSelector || 'LLLL';
      }

      return React__default.createElement("section", {
        className: "time-slots-selector"
      }, React__default.createElement("section", {
        className: "time-slots-selector-buttons"
      }, timeSlots.map(function (timeSlot) {
        return React__default.createElement("span", null, React__default.createElement(reactstrap.Button, {
          className: subject.timeSlots().target().include(timeSlot) ? 'active' : '',
          color: "primary",
          disabled: disabled,
          id: 'timeSlot-' + timeSlot.id.replace(/~/g, ''),
          key: timeSlot.id,
          onClick: function onClick() {
            return _this3.selectTimeSlot(timeSlot);
          },
          outline: true
        }, timeSlot.toString(timeSlotFormat)), showAvailability ? React__default.createElement(reactstrap.Tooltip, {
          placement: "bottom",
          isOpen: _this3.state.toolTips[timeSlot.id],
          target: 'timeSlot-' + timeSlot.id.replace(/~/g, ''),
          toggle: _this3.toggleToolTip(timeSlot.id)
        }, timeSlot.spotsAvailable, " open spots") : null);
      }).toArray()), React__default.createElement("section", {
        className: "time-slots-selector-errors custom-control"
      }, React__default.createElement("div", {
        className: customControlInputClassNames
      }), React__default.createElement(mitragyna.ErrorsFor, {
        component: reactstrap.FormFeedback,
        field: "timeSlots"
      })));
    }
  }]);

  return TimeSlotsSelector;
}(React__default.Component);

_defineProperty(TimeSlotsSelector, "propTypes", {
  calendar: PropTypes.bool,
  disabled: PropTypes.bool,
  onSelect: PropTypes.func.isRequired,
  subject: PropTypes.instanceOf(occsn.Order).isRequired,
  showAvailability: PropTypes.bool,
  timeSlots: PropTypes.shape({
    __collection: PropTypes.arrayOf(PropTypes.instanceOf(occsn.TimeSlot))
  }).isRequired
});

_defineProperty(TimeSlotsSelector, "contextTypes", {
  formatProps: PropTypes.object
});

var Calendar =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(Calendar, _PureComponent);

  function Calendar() {
    var _this;

    _classCallCheck(this, Calendar);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Calendar).call(this));

    _.bindAll(_assertThisInitialized(_assertThisInitialized(_this)), 'dateClicked');

    return _this;
  }

  _createClass(Calendar, [{
    key: "dateClicked",
    value: function dateClicked(selectedDate) {
      var _this$props = this.props,
          calendarTimeSlots = _this$props.calendarTimeSlots,
          onDateSelect = _this$props.onDateSelect;
      var timeSlotsForDay = calendarTimeSlots.detect(function (date) {
        return date.day.clone().utc().isSame(selectedDate, 'day');
      }).timeSlots;
      if (!timeSlotsForDay.empty()) onDateSelect(timeSlotsForDay);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var calendarTimeSlots = this.props.calendarTimeSlots;
      var events = calendarTimeSlots.map(function (day) {
        return day.timeSlots.map(function (timeSlot) {
          return {
            start: timeSlot.startsAt.format(),
            allDay: true,
            rendering: 'background'
          };
        }).toArray();
      }).flatten().toArray();
      return React__default.createElement("section", {
        className: "calendar"
      }, React__default.createElement(FullCalendar, {
        header: false,
        dayClick: this.dateClicked,
        defaultDate: calendarTimeSlots.first() && calendarTimeSlots.first().day,
        events: events,
        fixedWeekCount: 5,
        ref: function ref(r) {
          return _this2.fullCalendar = r;
        }
      }));
    }
  }]);

  return Calendar;
}(React.PureComponent);

_defineProperty(Calendar, "propTypes", {
  calendarTimeSlots: PropTypes.shape({
    __collection: PropTypes.arrayOf(PropTypes.shape({
      day: PropTypes.instanceOf(moment),
      timeSlots: PropTypes.shape({
        __collection: PropTypes.arrayOf(PropTypes.instanceOf(occsn.TimeSlot))
      })
    }))
  }).isRequired,
  onDateSelect: PropTypes.func.isRequired
});

var Paginator =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(Paginator, _PureComponent);

  function Paginator(props) {
    var _this;

    _classCallCheck(this, Paginator);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Paginator).call(this, props));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "nextClicked", function () {
      var _this$props = _this.props,
          cached = _this$props.cached,
          onChange = _this$props.onChange,
          preloadPages = _this$props.preloadPages,
          timeSlotsCollection = _this$props.timeSlotsCollection;
      var _this$state = _this.state,
          currentPage = _this$state.currentPage,
          cachedPages = _this$state.cachedPages,
          loading = _this$state.loading;

      _this.setState({
        currentPage: ++currentPage
      });

      if (cached && cachedPages[currentPage]) {
        if (!loading && cachedPages.length <= currentPage + preloadPages / 2) {
          _this.loadNextTimeSlotPages(preloadPages, cachedPages[cachedPages.length - 1]);
        }

        onChange(cachedPages[currentPage]);
      } else {
        timeSlotsCollection.nextPage().then(function (nextTimeSlotsCollection) {
          onChange(nextTimeSlotsCollection);
        });
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "prevClicked", function () {
      var _this$props2 = _this.props,
          cached = _this$props2.cached,
          onChange = _this$props2.onChange,
          timeSlotsCollection = _this$props2.timeSlotsCollection;
      var _this$state2 = _this.state,
          currentPage = _this$state2.currentPage,
          cachedPages = _this$state2.cachedPages;

      _this.setState({
        currentPage: --currentPage
      });

      if (cached) {
        onChange(cachedPages[currentPage]);
      } else {
        timeSlotsCollection.prevPage().then(function (prevTimeSlotsCollection) {
          onChange(prevTimeSlotsCollection);
        });
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "loadNextTimeSlotPages", function (numberOfPages, collection) {
      if (numberOfPages === 0 || !collection.hasNextPage()) return;
      var cachedPages = _this.state.cachedPages;

      _this.setState({
        loading: true
      });

      collection.nextPage().then(function (nextPage) {
        cachedPages.push(nextPage);

        _this.setState({
          loading: false
        });

        if (numberOfPages) {
          _this.loadNextTimeSlotPages(numberOfPages - 1, nextPage);
        }
      });
    });

    _this.state = {
      currentPage: 0,
      cachedPages: [],
      loading: false
    };
    return _this;
  }

  _createClass(Paginator, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      var cachedPages = this.state.cachedPages;
      var _this$props3 = this.props,
          cached = _this$props3.cached,
          preloadPages = _this$props3.preloadPages,
          timeSlotsCollection = _this$props3.timeSlotsCollection;

      if (cached && cachedPages.length == 0 && !nextProps.timeSlotsCollection.empty()) {
        cachedPages.push(nextProps.timeSlotsCollection);
        this.loadNextTimeSlotPages(preloadPages, nextProps.timeSlotsCollection);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props4 = this.props,
          className = _this$props4.className,
          timeSlotsCollection = _this$props4.timeSlotsCollection;
      var _this$state3 = this.state,
          currentPage = _this$state3.currentPage,
          cachedPages = _this$state3.cachedPages,
          loading = _this$state3.loading;
      return React__default.createElement("section", {
        className: "time-slots-paginator"
      }, React__default.createElement(reactstrap.Pagination, {
        className: className
      }, React__default.createElement(reactstrap.PaginationItem, {
        disabled: currentPage == 0
      }, React__default.createElement(reactstrap.PaginationLink, {
        previous: true,
        onClick: this.prevClicked
      })), React__default.createElement(reactstrap.PaginationItem, {
        disabled: !timeSlotsCollection.hasNextPage() || loading && currentPage >= cachedPages.length - 1
      }, React__default.createElement(reactstrap.PaginationLink, {
        next: true,
        onClick: this.nextClicked
      }))));
    }
  }]);

  return Paginator;
}(React.PureComponent);

_defineProperty(Paginator, "propTypes", {
  cached: PropTypes.bool,
  className: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  preloadPages: PropTypes.number,
  timeSlotsCollection: PropTypes.shape({
    __collection: PropTypes.arrayOf(PropTypes.any)
  }).isRequired
});

function stateToProps(state) {
  return {
    data: {
      product: state.$$appStore.get('product'),
      activeTimeSlotsCollection: state.$$calendarStore.get('activeTimeSlotsCollection'),
      timeSlotsFromCalendar: state.$$calendarStore.get('timeSlotsFromCalendar')
    }
  };
} // Bind relevant action creators and map them to properties


function dispatchToProps(dispatch) {
  return {
    actions: {
      loadProductCalendar: function loadProductCalendar$$1(product) {
        return dispatch(loadProductCalendar(product));
      },
      loadProductTimeSlots: function loadProductTimeSlots$$1(product) {
        return dispatch(loadProductTimeSlots(product));
      },
      saveOrder: function saveOrder$$1(order) {
        return dispatch(saveOrder(order));
      },
      setOrder: function setOrder$$1(order) {
        return dispatch(setOrder(order));
      },
      setActiveTimeSlotsCollection: function setActiveTimeSlotsCollection$$1(timeSlots) {
        return dispatch(setActiveTimeSlotsCollection(timeSlots));
      },
      setTimeSlotsFromCalendar: function setTimeSlotsFromCalendar$$1(timeSlots) {
        return dispatch(setTimeSlotsFromCalendar(timeSlots));
      }
    }
  };
}

var TimeSlotsContainer =
/*#__PURE__*/
function (_React$Component) {
  _inherits(TimeSlotsContainer, _React$Component);

  function TimeSlotsContainer() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, TimeSlotsContainer);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(TimeSlotsContainer)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onDateSelect", function (timeSlotsFromCalendar) {
      var actions = _this.props.actions;
      var callbackProps = _this.context.callbackProps;
      if (callbackProps.onDateSelect) callbackProps.onDateSelect(timeSlotsFromCalendar);
      actions.setTimeSlotsFromCalendar(timeSlotsFromCalendar);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onTimeSelect", function (order) {
      var actions = _this.props.actions;
      var callbackProps = _this.context.callbackProps;
      if (callbackProps.onTimeSelect) callbackProps.onTimeSelect(order);
      actions.setOrder(order);
      actions.saveOrder(order);
    });

    return _this;
  }

  _createClass(TimeSlotsContainer, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this$props = this.props,
          actions = _this$props.actions,
          data = _this$props.data,
          order = _this$props.order;

      switch (data.product.timeSlotView) {
        case 'calendar':
          actions.loadProductCalendar(data.product);
          break;

        case 'list':
          if (data.product.requiresTimeSlotSelection) actions.loadProductTimeSlots(data.product);
          break;
      }

      if (data.product.sellsSessions) {
        actions.setActiveTimeSlotsCollection(order.timeSlots().target().clone());
      }
    }
  }, {
    key: "render",
    value: function render() {
      var data = this.props.data;
      return React__default.createElement("section", {
        className: "time-slots"
      }, this.renderTimeSlotsScreen());
    }
  }, {
    key: "renderLoadingScreen",
    value: function renderLoadingScreen() {
      var componentProps = this.context.componentProps;
      var loadingComponent;

      if (componentProps.timeSlotsLoading) {
        loadingComponent = React__default.createElement(componentProps.timeSlotsLoading);
      }

      return React__default.createElement("section", {
        className: "time-slots-loading"
      }, loadingComponent);
    }
  }, {
    key: "renderTimeSlotsScreen",
    value: function renderTimeSlotsScreen() {
      var _this$props2 = this.props,
          actions = _this$props2.actions,
          data = _this$props2.data,
          order = _this$props2.order;

      switch (data.product.timeSlotView) {
        case 'calendar':
          return React__default.createElement("section", {
            className: "calendar-view"
          }, React__default.createElement(reactstrap.Row, null, React__default.createElement(reactstrap.Col, {
            xs: "9"
          }, React__default.createElement("h3", null, data.activeTimeSlotsCollection.first() && data.activeTimeSlotsCollection.first().day.format('MMMM YYYY'))), React__default.createElement(reactstrap.Col, {
            xs: "3"
          }, React__default.createElement(Paginator, {
            className: "float-right",
            onChange: actions.setActiveTimeSlotsCollection,
            timeSlotsCollection: data.activeTimeSlotsCollection
          }))), React__default.createElement(Calendar, {
            onDateSelect: this.onDateSelect,
            calendarTimeSlots: data.activeTimeSlotsCollection
          }), React__default.createElement("a", {
            name: "time-slots-selector",
            id: "time-slots-selector-anchor"
          }), data.timeSlotsFromCalendar.first() ? React__default.createElement("h3", {
            className: "calendar-date-selected"
          }, data.timeSlotsFromCalendar.first().startsAt.format('dddd, MMMM Do')) : null, React__default.createElement(TimeSlotsSelector, {
            calendar: true,
            onSelect: this.onTimeSelect,
            showAvailability: data.product.showOccurrenceAvailability,
            subject: order,
            timeSlots: data.timeSlotsFromCalendar
          }), data.activeTimeSlotsCollection.empty() ? this.renderLoadingScreen() : null);

        case 'list':
          return React__default.createElement("section", {
            className: "list-view"
          }, data.product.sellsSessions ? React__default.createElement("p", null, "Sessions are purchased together") : null, data.product.sellsDropIns && React__default.createElement("p", null, "Select the time slots you want to add:"), React__default.createElement("a", {
            name: "time-slots-selector",
            id: "time-slots-selector-anchor"
          }), React__default.createElement(TimeSlotsSelector, {
            disabled: data.product.sellsSessions,
            onSelect: this.onTimeSelect,
            showAvailability: data.product.showOccurrenceAvailability,
            subject: order,
            timeSlots: data.activeTimeSlotsCollection
          }), data.product.dropInsDiscountPercentage && (data.product.dropInsDiscountDaysThreshold - order.timeSlots().size() >= 0 ? React__default.createElement("div", {
            className: "drop-ins-discount alert alert-secondary"
          }, order.dropInsDiscountAppliesToWholeOrder ? React__default.createElement(React__default.Fragment, null, "Get ", React__default.createElement("strong", null, data.product.dropInsDiscountPercentage, "%"), " discount") : React__default.createElement(React__default.Fragment, null, "An automatic discount is applied"), order.timeSlots().size() == 0 ? React__default.createElement(React__default.Fragment, null, ' ', "when you select ", data.product.dropInsDiscountDaysThreshold + 1, " or more dates") : React__default.createElement(React__default.Fragment, null, ' ', "when you select", ' ', data.product.dropInsDiscountDaysThreshold - order.timeSlots().size() + 1, ' ', "more date(s)")) : React__default.createElement("div", {
            className: "drop-ins-discount alert alert-success"
          }, order.dropInsDiscountAppliesToWholeOrder ? React__default.createElement(React__default.Fragment, null, "\uD83C\uDF89 You got ", React__default.createElement("strong", null, data.product.dropInsDiscountPercentage, "%"), " off because you selected ", data.product.dropInsDiscountDaysThreshold + 1, " or more dates") : React__default.createElement(React__default.Fragment, null, "\uD83C\uDF89 You got a discount because you selected", ' ', data.product.dropInsDiscountDaysThreshold + 1, " or more dates"))), !data.product.sellsSessions ? React__default.createElement(reactstrap.Row, null, React__default.createElement(reactstrap.Col, {
            xs: {
              offset: '9'
            }
          }), React__default.createElement(reactstrap.Col, {
            xs: "3"
          }, React__default.createElement(Paginator, {
            cached: true,
            className: "float-right",
            onChange: actions.setActiveTimeSlotsCollection,
            timeSlotsCollection: data.activeTimeSlotsCollection,
            preloadPages: 9
          }))) : null, data.activeTimeSlotsCollection.empty() ? this.renderLoadingScreen() : null);
      }
    }
  }]);

  return TimeSlotsContainer;
}(React__default.Component); // See https://github.com/reactjs/react-redux/blob/master/docs/api.md#examples

_defineProperty(TimeSlotsContainer, "propTypes", {
  actions: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  order: PropTypes.instanceOf(occsn.Order),
  onSelect: PropTypes.func
});

_defineProperty(TimeSlotsContainer, "contextTypes", {
  callbackProps: PropTypes.object,
  componentProps: PropTypes.object
});

var TimeSlotsContainer$1 = reactRedux.connect(stateToProps, dispatchToProps)(TimeSlotsContainer);

var Attendee =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(Attendee, _PureComponent);

  function Attendee() {
    _classCallCheck(this, Attendee);

    return _possibleConstructorReturn(this, _getPrototypeOf(Attendee).apply(this, arguments));
  }

  _createClass(Attendee, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          indexOf = _this$props.indexOf,
          questions = _this$props.questions,
          skipAttendees = _this$props.skipAttendees,
          setSkipAttendee = _this$props.setSkipAttendee;
      return React__default.createElement(reactstrap.Card, {
        className: "attendee-container"
      }, React__default.createElement(reactstrap.CardBody, {
        className: "attendee"
      }, React__default.createElement(reactstrap.CardTitle, {
        className: "attendee-title d-flex flex-row justify-content-between"
      }, React__default.createElement("div", null, "Attendee ", indexOf + 1), React__default.createElement("small", null, React__default.createElement(reactstrap.Label, {
        check: true,
        for: "toggleAttendee"
      }, React__default.createElement(reactstrap.Input, {
        type: "checkbox",
        id: 'toggleAttendee_' + indexOf + 1,
        name: "toggleAttendees",
        checked: skipAttendees[indexOf],
        onChange: function onChange(e) {
          return setSkipAttendee(indexOf, e.target.checked);
        }
      }), "Skip this attendee for now"))), React__default.createElement("div", {
        className: skipAttendees[indexOf] ? 'd-none wel' : 'niet'
      }, questions.map(function (q) {
        return React__default.createElement(reactstrap.FormGroup, {
          className: "attendee-input-container"
        }, React__default.createElement(reactstrap.Label, {
          for: 'attendee-' + indexOf + '-' + q
        }, s.humanize(q)), React__default.createElement(mitragyna.Field, {
          type: "text",
          name: q,
          id: 'attendee-' + indexOf + '-' + q,
          component: reactstrap.Input,
          invalidClassName: "is-invalid"
        }));
      }).toArray())));
    }
  }]);

  return Attendee;
}(React.PureComponent);

_defineProperty(Attendee, "propTypes", {
  indexOf: PropTypes.number.isRequired,
  questions: PropTypes.shape({
    __collection: PropTypes.arrayOf(PropTypes.string)
  }).isRequired,
  subject: PropTypes.instanceOf(occsn.Attendee).isRequired
});

var Attendees =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Attendees, _React$Component);

  function Attendees() {
    _classCallCheck(this, Attendees);

    return _possibleConstructorReturn(this, _getPrototypeOf(Attendees).apply(this, arguments));
  }

  _createClass(Attendees, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          questions = _this$props.questions,
          skipAttendees = _this$props.skipAttendees,
          setSkipAttendee = _this$props.setSkipAttendee,
          subject = _this$props.subject;
      return React__default.createElement("section", {
        className: "attendees"
      }, React__default.createElement(mitragyna.Collection, {
        component: Attendee,
        componentProps: {
          questions: questions,
          skipAttendees: skipAttendees,
          setSkipAttendee: setSkipAttendee
        },
        reflection: "attendees",
        subject: subject.attendees()
      }));
    }
  }]);

  return Attendees;
}(React__default.Component);

_defineProperty(Attendees, "propTypes", {
  questions: PropTypes.shape({
    __collection: PropTypes.arrayOf(PropTypes.string)
  }).isRequired,
  setSkipAttendee: PropTypes.func,
  skipAttendees: PropTypes.object,
  subject: PropTypes.instanceOf(occsn.Order)
});

var Customer =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(Customer, _PureComponent);

  function Customer() {
    _classCallCheck(this, Customer);

    return _possibleConstructorReturn(this, _getPrototypeOf(Customer).apply(this, arguments));
  }

  _createClass(Customer, [{
    key: "render",
    value: function render() {
      return React__default.createElement("section", {
        className: "customer"
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
      })));
    }
  }]);

  return Customer;
}(React.PureComponent);

_defineProperty(Customer, "propTypes", {
  subject: PropTypes.instanceOf(occsn.Customer)
});

var MissingAnswers =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(MissingAnswers, _PureComponent);

  function MissingAnswers() {
    var _this;

    _classCallCheck(this, MissingAnswers);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(MissingAnswers).call(this));

    _.bindAll(_assertThisInitialized(_assertThisInitialized(_this)), 'empty', 'missingRequiredAnswers');

    return _this;
  }

  _createClass(MissingAnswers, [{
    key: "missingRequiredAnswers",
    value: function missingRequiredAnswers(override) {
      var order = this.props.order;
      if (override) order = override;
      var missingAnswers = ActiveResource.Collection.build();
      ActiveResource.Collection.build(['email', 'firstName', 'lastName', 'zip']).select(function (q) {
        return !order.customer()[q];
      }).each(function (q) {
        missingAnswers.push({
          id: q,
          label: 'Customer ' + s.titleize(s.humanize(q))
        });
      });
      order.answers().target().select(function (a) {
        return !a.valid();
      }).each(function (a) {
        missingAnswers.push({
          id: 'answer-' + a.question().id,
          label: a.question().title
        });
      });
      return missingAnswers;
    }
  }, {
    key: "empty",
    value: function empty() {
      return this.missingRequiredAnswers().empty();
    }
  }, {
    key: "render",
    value: function render() {
      var callbackProps = this.context.callbackProps;

      if (this.empty()) {
        return null;
      } else {
        return React__default.createElement(reactstrap.Alert, {
          color: "secondary",
          className: "missing-answers"
        }, React__default.createElement("p", {
          className: "missing-answers-text"
        }, "Please complete the following fields:"), React__default.createElement("ul", {
          className: "missing-answers-list"
        }, this.missingRequiredAnswers().map(function (a) {
          return React__default.createElement("li", {
            className: "missing-answer"
          }, callbackProps.onMissingAnswerClicked ? React__default.createElement("a", {
            onClick: function onClick() {
              return callbackProps.onMissingAnswerClicked(a.id);
            }
          }, a.label) : a.label);
        }).toArray()));
      }
    }
  }]);

  return MissingAnswers;
}(React.PureComponent);

_defineProperty(MissingAnswers, "propTypes", {
  order: PropTypes.instanceOf(occsn.Order)
});

_defineProperty(MissingAnswers, "contextTypes", {
  callbackProps: PropTypes.instanceOf(PropTypes.object)
});

var OrderErrors =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(OrderErrors, _PureComponent);

  function OrderErrors() {
    var _this;

    _classCallCheck(this, OrderErrors);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(OrderErrors).call(this));

    _.bindAll(_assertThisInitialized(_assertThisInitialized(_this)), 'empty');

    return _this;
  }

  _createClass(OrderErrors, [{
    key: "empty",
    value: function empty() {
      var order = this.props.order;
      return order.errors().empty();
    }
  }, {
    key: "render",
    value: function render() {
      var order = this.props.order;

      if (this.empty()) {
        return null;
      } else {
        return React__default.createElement(reactstrap.Alert, {
          color: "danger",
          className: "order-errors"
        }, React__default.createElement("p", {
          className: "order-errors-text"
        }, "The following errors occurred while booking:"), React__default.createElement("ul", {
          className: "order-errors-list"
        }, order.errors().toCollection().map(function (e) {
          return React__default.createElement("li", {
            className: "order-error"
          }, e.detail);
        }).toArray()));
      }
    }
  }]);

  return OrderErrors;
}(React.PureComponent);

_defineProperty(OrderErrors, "propTypes", {
  order: PropTypes.instanceOf(occsn.Order)
});

var Pricing =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(Pricing, _PureComponent);

  function Pricing() {
    _classCallCheck(this, Pricing);

    return _possibleConstructorReturn(this, _getPrototypeOf(Pricing).apply(this, arguments));
  }

  _createClass(Pricing, [{
    key: "render",
    value: function render() {
      var order = this.props.order;
      var rows = [];
      var currency = order.product().merchant().currency().name;
      var displaySubtotal = false;

      if (Decimal(order.couponAmount).isPositive()) {
        displaySubtotal = true;
        rows.push(React__default.createElement("p", {
          className: "coupon-discount"
        }, React__default.createElement("span", null, "Coupon Discount: "), React__default.createElement(Currency, {
          currency: currency,
          quantity: Decimal(order.couponAmount).neg().toNumber()
        })));
      }

      if (Decimal(order.dropInsDiscount).isPositive()) {
        displaySubtotal = true;
        rows.push(React__default.createElement("p", {
          className: "drop-ins-discount"
        }, React__default.createElement("span", null, "Drop In Discount: "), React__default.createElement(Currency, {
          currency: currency,
          quantity: Decimal(order.dropInsDiscount).neg().toNumber()
        })));
      }

      if (Decimal(order.taxPercentage).isPositive()) {
        displaySubtotal = true;
        rows.push(React__default.createElement("p", {
          className: "tax"
        }, React__default.createElement("span", null, "Tax (", order.taxPercentage, "%): "), React__default.createElement(Currency, {
          currency: currency,
          quantity: order.tax
        })));
      }

      if (displaySubtotal) {
        rows.unshift(React__default.createElement("p", {
          className: "subtotal"
        }, React__default.createElement("span", null, "Subtotal: "), React__default.createElement(Currency, {
          currency: currency,
          quantity: order.subtotal
        })));
      }

      rows.push(React__default.createElement("p", {
        className: "total"
      }, "Order Total: ", React__default.createElement(Currency, {
        currency: currency,
        quantity: order.price
      })));

      if (order.product().depositBehavior && order.product().depositBehavior != 'no_deposit') {
        rows.push(React__default.createElement(React__default.Fragment, null, React__default.createElement("p", {
          className: "deposit-total"
        }, "Deposit Due Today:", ' ', React__default.createElement(Currency, {
          currency: currency,
          quantity: order.priceDueOnInitialOrder
        })), React__default.createElement("div", {
          className: "alert alert-info"
        }, "A deposit of", ' ', React__default.createElement("strong", null, React__default.createElement(Currency, {
          currency: currency,
          quantity: order.priceDueOnInitialOrder
        })), ' ', "is due today and", ' ', React__default.createElement("strong", null, React__default.createElement(Currency, {
          currency: currency,
          quantity: order.price - order.priceDueOnInitialOrder
        })), ' ', "will be due before the reservation date.")));
      }

      if (order.giftCardAmount && order.giftCardAmount.isPositive()) {
        rows.push(React__default.createElement("p", {
          className: "gift-card-amount"
        }, React__default.createElement("span", null, "Gift Cards: "), React__default.createElement(Currency, {
          currency: currency,
          quantity: order.giftCardAmount.neg().toNumber()
        })), React__default.createElement("p", {
          className: "outstanding-balance"
        }, React__default.createElement("span", null, "Balance due today: "), React__default.createElement(Currency, {
          currency: currency,
          quantity: order.outstandingBalance.toNumber()
        })));
      }

      return React__default.createElement("section", {
        className: "total-due"
      }, React__default.createElement("section", {
        className: "pricing"
      }, React__default.createElement("section", {
        className: "pricing-list"
      }, rows)));
    }
  }]);

  return Pricing;
}(React.PureComponent);

_defineProperty(Pricing, "propTypes", {
  order: PropTypes.instanceOf(occsn.Order)
});

var PaymentServiceProvider =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(PaymentServiceProvider, _PureComponent);

  function PaymentServiceProvider() {
    var _this;

    _classCallCheck(this, PaymentServiceProvider);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(PaymentServiceProvider).call(this));

    _this.reset();

    _.bindAll(_assertThisInitialized(_assertThisInitialized(_this)), 'buildPaymentMethod', 'tokenizePaymentMethodData', 'reset');

    return _this;
  }

  _createClass(PaymentServiceProvider, [{
    key: "buildPaymentMethod",
    value: function buildPaymentMethod() {
      this.reset();
      this.tokenizePaymentMethodData();
      return this.paymentMethodDeferred.promise;
    } // Sends the data contained the payment method form to the 3rd party PSP

  }, {
    key: "tokenizePaymentMethodData",
    value: function tokenizePaymentMethodData() {
      throw 'tokenizePaymentMethodData must be defined by subclasses';
    }
  }, {
    key: "reset",
    value: function reset() {
      this.paymentMethodDeferred = Q.defer();
    }
  }]);

  return PaymentServiceProvider;
}(React.PureComponent);

_defineProperty(PaymentServiceProvider, "propTypes", {
  order: PropTypes.instanceOf(occsn.Order)
});

var Cash =
/*#__PURE__*/
function (_PaymentServiceProvid) {
  _inherits(Cash, _PaymentServiceProvid);

  function Cash() {
    _classCallCheck(this, Cash);

    return _possibleConstructorReturn(this, _getPrototypeOf(Cash).apply(this, arguments));
  }

  _createClass(Cash, [{
    key: "initializeForm",
    value: function initializeForm() {}
  }, {
    key: "tokenizePaymentMethodData",
    value: function tokenizePaymentMethodData() {
      this.paymentMethodDeferred.resolve(null);
    }
  }, {
    key: "render",
    value: function render() {
      return React__default.createElement("section", {
        className: "cash-container"
      }, React__default.createElement(reactstrap.Alert, {
        color: "warning",
        className: "cash"
      }, "No payment required at this time. Payment will be collected at the venue."));
    }
  }]);

  return Cash;
}(PaymentServiceProvider);

var CardNumber =
/*#__PURE__*/
function (_React$Component) {
  _inherits(CardNumber, _React$Component);

  function CardNumber() {
    _classCallCheck(this, CardNumber);

    return _possibleConstructorReturn(this, _getPrototypeOf(CardNumber).apply(this, arguments));
  }

  _createClass(CardNumber, [{
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate() {
      return false;
    }
  }, {
    key: "render",
    value: function render() {
      return React__default.createElement("div", {
        id: "spreedly-number",
        style: {
          height: '52px'
        }
      });
    }
  }]);

  return CardNumber;
}(React__default.Component);

var CardNumber$1 =
/*#__PURE__*/
function (_React$Component) {
  _inherits(CardNumber, _React$Component);

  function CardNumber() {
    _classCallCheck(this, CardNumber);

    return _possibleConstructorReturn(this, _getPrototypeOf(CardNumber).apply(this, arguments));
  }

  _createClass(CardNumber, [{
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate() {
      return false;
    }
  }, {
    key: "render",
    value: function render() {
      return React__default.createElement("div", null, React__default.createElement(reactstrap.Label, null, "CVV"), React__default.createElement("div", {
        id: "spreedly-cvv",
        style: {
          height: '52px'
        }
      }));
    }
  }]);

  return CardNumber;
}(React__default.Component);

function camelCaseToDash(str) {
  return str.replace(/([a-zA-Z])(?=[A-Z])/g, '$1-').toLowerCase();
}

var SpreedlyIframe =
/*#__PURE__*/
function (_PaymentServiceProvid) {
  _inherits(SpreedlyIframe, _PaymentServiceProvid);

  function SpreedlyIframe() {
    var _this;

    _classCallCheck(this, SpreedlyIframe);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(SpreedlyIframe).call(this));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "initializeForm", function () {
      Spreedly.init(global.OCCSN.spreedly_key, {
        numberEl: 'spreedly-number',
        cvvEl: 'spreedly-cvv'
      });
      var spreedlyIframeInputStyles = _this.props.spreedlyIframeInputStyles;
      var defaultInputStyle = {
        display: 'block',
        width: '80%',
        padding: '0.375rem 0.75rem',
        fontSize: '1rem',
        lineHeight: 1.5,
        color: '#495057',
        backgroundColor: '#fff',
        backgroundClip: 'padding-box',
        border: '1px solid #ced4da',
        borderRadius: '0.25rem',
        transition: 'border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out'
      };
      var focusInputStyle = 'color: #495057;' + '  background-color: #fff;' + '  border-color: #80bdff;';

      if (spreedlyIframeInputStyles) {
        Object.assign(defaultInputStyle, spreedlyIframeInputStyles);
      } // Covert to string and hyphen-case the keys


      var inputStyleString = '';

      for (var prop in defaultInputStyle) {
        inputStyleString += "".concat(camelCaseToDash(prop), ": ").concat(defaultInputStyle[prop], ";");
      }

      Spreedly.on('ready', function () {
        Spreedly.setFieldType('number', 'text');
        Spreedly.setNumberFormat('prettyFormat');
        Spreedly.setPlaceholder('number', '•••• •••• •••• ••••');
        Spreedly.setPlaceholder('cvv', '•••');
        Spreedly.setStyle('number', inputStyleString);
        Spreedly.setStyle('cvv', inputStyleString);
      });
      Spreedly.on('fieldEvent', function (name, type, activeEl, inputProperties) {
        if (type == 'focus') {
          Spreedly.setStyle(name, focusInputStyle);
        }

        if (type == 'blur') {
          Spreedly.setStyle(name, inputStyleString);
        }
      });
      Spreedly.on('errors', function (errors) {
        console.log(errors);

        _this.paymentMethodDeferred.reject(_.map(errors, function (error) {
          return ['creditCard.' + s.camelize(error.attribute, true), error.key.replace('errors.', ''), error.message];
        }));
      });
      Spreedly.on('paymentMethod', function (token) {
        _this.paymentMethodDeferred.resolve(occsn.CreditCard.build({
          id: token
        }));
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleChange", function (name, e) {
      _this.setState(_defineProperty({}, name, e.target.value));
    });

    _this.state = {
      month: null,
      full_name: null,
      year: null
    };
    return _this;
  } // Initializes the iFrame using the global Spreedly object imported as a separate script
  // @note Called on componentDidMount
  // @see PaymentServiceProvider#componentDidMount


  _createClass(SpreedlyIframe, [{
    key: "tokenizePaymentMethodData",
    // Triggers paymentMethod event
    value: function tokenizePaymentMethodData() {
      Spreedly.tokenizeCreditCard(this.state);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var order = this.props.order;
      return React__default.createElement(React__default.Fragment, null, React__default.createElement(Script, {
        url: "https://core.spreedly.com/iframe/iframe-v1.min.js",
        onLoad: this.initializeForm
      }), React__default.createElement("section", {
        className: "spreedly-container"
      }, React__default.createElement(reactstrap.FormGroup, {
        className: "spreedly-full-name"
      }, React__default.createElement("label", null, "Name On Card"), React__default.createElement(reactstrap.Input, {
        type: "text",
        id: "full_name",
        name: "full_name",
        placeholder: "Name On Card",
        onChange: function onChange(e) {
          return _this2.handleChange('full_name', e);
        },
        className: order.errors().forField('creditCard.firstName').empty() && order.errors().forField('creditCard.lastName').empty() ? '' : 'is-invalid'
      }), React__default.createElement(mitragyna.ErrorsFor, {
        className: "spreedly-first-name-errors",
        component: reactstrap.FormFeedback,
        field: "creditCard.firstName"
      }), React__default.createElement(mitragyna.ErrorsFor, {
        className: "spreedly-last-name-errors",
        component: reactstrap.FormFeedback,
        field: "creditCard.lastName"
      })), React__default.createElement(reactstrap.FormGroup, {
        className: "spreedly-card-number"
      }, React__default.createElement(reactstrap.Label, null, "Credit Card Number"), React__default.createElement("div", {
        class: "custom-file"
      }, React__default.createElement("div", {
        className: "custom-file-input is-invalid",
        style: {
          opacity: 1
        }
      }, React__default.createElement(CardNumber, null)), React__default.createElement(mitragyna.ErrorsFor, {
        className: "spreedly-card-number-errors",
        component: reactstrap.FormFeedback,
        field: "creditCard.number"
      }))), React__default.createElement(reactstrap.FormGroup, {
        className: "spreedly-expiration-cvv"
      }, React__default.createElement(reactstrap.Row, null, React__default.createElement(reactstrap.Col, {
        className: "spreedly-expiration",
        xs: "6"
      }, React__default.createElement(reactstrap.Label, null, "Expiration Date"), React__default.createElement(reactstrap.Row, null, React__default.createElement(reactstrap.Col, {
        xs: "6"
      }, React__default.createElement(reactstrap.Input, {
        type: "text",
        id: "month",
        name: "month",
        maxlength: "2",
        placeholder: "MM",
        onChange: function onChange(e) {
          return _this2.handleChange('month', e);
        },
        className: order.errors().forField('creditCard.year').empty() ? '' : 'is-invalid'
      }), React__default.createElement(mitragyna.ErrorsFor, {
        className: "spreedly-expiration-month-errors",
        component: reactstrap.FormFeedback,
        field: "creditCard.month"
      })), React__default.createElement(reactstrap.Col, {
        xs: "6"
      }, React__default.createElement(reactstrap.Input, {
        type: "text",
        id: "year",
        name: "year",
        maxlength: "4",
        placeholder: "YYYY",
        onChange: function onChange(e) {
          return _this2.handleChange('year', e);
        },
        className: order.errors().forField('creditCard.year').empty() ? '' : 'is-invalid'
      }), React__default.createElement(mitragyna.ErrorsFor, {
        className: "spreedly-expiration-year-errors",
        component: reactstrap.FormFeedback,
        field: "creditCard.year"
      })))), React__default.createElement(reactstrap.Col, {
        className: "spreedly-cvv",
        xs: "3"
      }, React__default.createElement(CardNumber$1, null))))));
    }
  }]);

  return SpreedlyIframe;
}(PaymentServiceProvider);

var CardNumber$2 =
/*#__PURE__*/
function (_React$Component) {
  _inherits(CardNumber, _React$Component);

  function CardNumber() {
    _classCallCheck(this, CardNumber);

    return _possibleConstructorReturn(this, _getPrototypeOf(CardNumber).apply(this, arguments));
  }

  _createClass(CardNumber, [{
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate() {
      return false;
    }
  }, {
    key: "render",
    value: function render() {
      return React__default.createElement("div", {
        id: "sq-card-number"
      });
    }
  }]);

  return CardNumber;
}(React__default.Component);

var ExpirationDate =
/*#__PURE__*/
function (_React$Component) {
  _inherits(ExpirationDate, _React$Component);

  function ExpirationDate() {
    _classCallCheck(this, ExpirationDate);

    return _possibleConstructorReturn(this, _getPrototypeOf(ExpirationDate).apply(this, arguments));
  }

  _createClass(ExpirationDate, [{
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate() {
      return false;
    }
  }, {
    key: "render",
    value: function render() {
      return React__default.createElement("div", {
        id: "sq-expiration-date"
      });
    }
  }]);

  return ExpirationDate;
}(React__default.Component);

var CVV =
/*#__PURE__*/
function (_React$Component) {
  _inherits(CVV, _React$Component);

  function CVV() {
    _classCallCheck(this, CVV);

    return _possibleConstructorReturn(this, _getPrototypeOf(CVV).apply(this, arguments));
  }

  _createClass(CVV, [{
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate() {
      return false;
    }
  }, {
    key: "render",
    value: function render() {
      return React__default.createElement("div", {
        id: "sq-cvv"
      });
    }
  }]);

  return CVV;
}(React__default.Component);

var PostalCode =
/*#__PURE__*/
function (_React$Component) {
  _inherits(PostalCode, _React$Component);

  function PostalCode() {
    _classCallCheck(this, PostalCode);

    return _possibleConstructorReturn(this, _getPrototypeOf(PostalCode).apply(this, arguments));
  }

  _createClass(PostalCode, [{
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate() {
      return false;
    }
  }, {
    key: "render",
    value: function render() {
      return React__default.createElement("div", {
        id: "sq-postal-code"
      });
    }
  }]);

  return PostalCode;
}(React__default.Component);

var Square =
/*#__PURE__*/
function (_PaymentServiceProvid) {
  _inherits(Square, _PaymentServiceProvid);

  function Square() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Square);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Square)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "initializeForm", function () {
      console.log('ting');
      var inputStyles = {
        padding: '0.375em 0.75em',
        fontSize: '1em',
        lineHeight: 1.5,
        color: '#495057',
        backgroundColor: '#fff'
      };
      var squareIframeInputStyles = _this.props.squareIframeInputStyles;

      if (squareIframeInputStyles) {
        inputStyles = _objectSpread({}, inputStyles, squareIframeInputStyles);
      }

      _this.sqPaymentForm = new SqPaymentForm({
        // Initialize the payment form elements
        applicationId: global.OCCSN.square_key,
        inputClass: 'form-control-square',
        inputStyles: [inputStyles],
        // Initialize the credit card placeholders
        cardNumber: {
          elementId: 'sq-card-number',
          placeholder: '•••• •••• •••• ••••'
        },
        cvv: {
          elementId: 'sq-cvv',
          placeholder: 'CVV'
        },
        expirationDate: {
          elementId: 'sq-expiration-date',
          placeholder: 'MM/YY'
        },
        postalCode: {
          elementId: 'sq-postal-code',
          placeholder: '#####'
        },
        // SqPaymentForm callback functions
        callbacks: {
          cardNonceResponseReceived: function cardNonceResponseReceived(errors, nonce) {
            if (errors) {
              _this.paymentMethodDeferred.reject(_.map(errors, function (error) {
                return ['creditCard.' + error.field, 'invalid', error.message];
              }));
            } else {
              _this.paymentMethodDeferred.resolve(occsn.CreditCard.build({
                id: nonce
              }));
            }
          }
        }
      });

      _this.sqPaymentForm.build();
    });

    return _this;
  }

  _createClass(Square, [{
    key: "tokenizePaymentMethodData",
    // Triggers cardNonceResponseReceived event
    value: function tokenizePaymentMethodData() {
      this.sqPaymentForm.requestCardNonce();
    }
  }, {
    key: "render",
    value: function render() {
      return React__default.createElement(React__default.Fragment, null, React__default.createElement(Script, {
        url: "https://js.squareup.com/v2/paymentform",
        onLoad: this.initializeForm
      }), React__default.createElement("section", {
        className: "square-container"
      }, React__default.createElement("div", {
        id: "sq-ccbox"
      }, React__default.createElement(reactstrap.FormGroup, {
        className: "square-card-number"
      }, React__default.createElement(reactstrap.Label, null, "Card Number"), React__default.createElement("div", {
        class: "custom-file"
      }, React__default.createElement("div", {
        className: "custom-file-input is-invalid",
        style: {
          opacity: 1
        }
      }, React__default.createElement(CardNumber$2, null)), React__default.createElement(mitragyna.ErrorsFor, {
        className: "square-card-number-errors",
        component: reactstrap.FormFeedback,
        field: "creditCard.cardNumber"
      }))), React__default.createElement(reactstrap.FormGroup, {
        className: "square-expiration-cvv"
      }, React__default.createElement(reactstrap.Row, null, React__default.createElement(reactstrap.Col, {
        className: "square-expiration",
        xs: "6"
      }, React__default.createElement(reactstrap.Label, null, "Expiration Date"), React__default.createElement("div", {
        class: "custom-file"
      }, React__default.createElement("div", {
        className: "custom-file-input is-invalid",
        style: {
          opacity: 1
        }
      }, React__default.createElement(ExpirationDate, null)), React__default.createElement(mitragyna.ErrorsFor, {
        className: "square-expiration-errors",
        component: reactstrap.FormFeedback,
        field: "creditCard.expirationDate"
      }))), React__default.createElement(reactstrap.Col, {
        className: "square-cvv",
        xs: "3"
      }, React__default.createElement(reactstrap.Label, null, "CVV"), React__default.createElement(CVV, null)))), React__default.createElement(reactstrap.FormGroup, {
        className: "square-postal-code"
      }, React__default.createElement(reactstrap.Label, null, "Postal Code"), React__default.createElement("div", {
        class: "custom-file"
      }, React__default.createElement("div", {
        className: "custom-file-input is-invalid",
        style: {
          opacity: 1
        }
      }, React__default.createElement(PostalCode, null)), React__default.createElement(mitragyna.ErrorsFor, {
        className: "square-postal-code-errors",
        component: reactstrap.FormFeedback,
        field: "creditCard.postalCode"
      }))))));
    }
  }]);

  return Square;
}(PaymentServiceProvider);

var PaymentForm =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(PaymentForm, _PureComponent);

  function PaymentForm() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, PaymentForm);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(PaymentForm)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "chargeOutstandingBalanceToPaymentMethod", function (subject) {
      return _this.pspForm.buildPaymentMethod().then(function (paymentMethod) {
        var newSubject = subject.clone();
        newSubject.charge(paymentMethod, subject.outstandingBalance.toString());
        return newSubject;
      }).catch(function (errors) {
        var _subject$errors;

        subject.errors().clear();
        throw (_subject$errors = subject.errors()).addAll.apply(_subject$errors, _toConsumableArray(errors));
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "paymentServiceProvider", function () {
      var order = _this.props.order;
      return order.product().merchant().pspName;
    });

    return _this;
  }

  _createClass(PaymentForm, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          order = _this$props.order,
          spreedlyIframeInputStyles = _this$props.spreedlyIframeInputStyles,
          squareIframeInputStyles = _this$props.squareIframeInputStyles;
      var pspFormProps = {
        order: order,
        ref: function ref(form) {
          _this2.pspForm = form;
        }
      };
      var currency = order.product().merchant().currency().name;
      return React__default.createElement("section", {
        className: "payment"
      }, {
        cash: React__default.createElement(Cash, pspFormProps),
        spreedly: React__default.createElement(SpreedlyIframe, _extends({}, pspFormProps, {
          spreedlyIframeInputStyles: spreedlyIframeInputStyles
        })),
        square: React__default.createElement(Square, _extends({}, pspFormProps, {
          squareIframeInputStyles: squareIframeInputStyles
        }))
      }[this.paymentServiceProvider()], order.product().merchant().canRetainCards && React__default.createElement("div", {
        className: "alert alert-secondary"
      }, "Your credit card will be stored so we can charge the remaining", ' ', React__default.createElement(Currency, {
        currency: currency,
        quantity: order.price - order.priceDueOnInitialOrder
      }), ' ', "before the reservation date."), this.paymentServiceProvider() != 'cash' ? null // TODO @kieranklaassen Replace this line with padlock code
      : null);
    }
  }]);

  return PaymentForm;
}(React.PureComponent);

_defineProperty(PaymentForm, "propTypes", {
  order: PropTypes.instanceOf(occsn.Order),
  spreedlyIframeInputStyles: PropTypes.object,
  squareIframeInputStyles: PropTypes.object
});

var Checkbox =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(Checkbox, _PureComponent);

  function Checkbox() {
    _classCallCheck(this, Checkbox);

    return _possibleConstructorReturn(this, _getPrototypeOf(Checkbox).apply(this, arguments));
  }

  _createClass(Checkbox, [{
    key: "render",
    value: function render() {
      var answer = this.props.answer;
      var question = answer.question();
      var label = [React__default.createElement("span", null, answer.question().title)];

      if (question.price) {
        var currency = question.product().merchant().currency();
        var price = Decimal(question.price);

        if (question.operation == 'add') {
          label.push(React__default.createElement("span", null, "\xA0(", React__default.createElement(Currency, {
            currency: currency.name,
            quantity: price.toNumber()
          }), " extra)"));
        } else if (question.operation == 'subtract') {
          label.push(React__default.createElement("span", null, "\xA0(", React__default.createElement(Currency, {
            currency: currency.name,
            quantity: price.toNumber()
          }), " off)"));
        }
      }

      if (question.percentage) {
        if (question.operation == 'multiply') {
          label.push(React__default.createElement("span", null, "\xA0(", question.percentage, "% extra)"));
        } else if (question.operation == 'divide') {
          label.push(React__default.createElement("span", null, "\xA0(", question.percentage, "% off)"));
        }
      }

      if (question.required) {
        label.push(React__default.createElement("span", null, "\xA0*"));
      }

      var id = 'answer-' + answer.question().id;
      return React__default.createElement(reactstrap.FormGroup, {
        className: "checkbox-container"
      }, React__default.createElement("a", {
        name: id
      }), React__default.createElement(reactstrap.FormGroup, {
        check: true
      }, React__default.createElement(reactstrap.Label, {
        check: true,
        for: id
      }, React__default.createElement(mitragyna.Field, {
        id: id,
        name: "value",
        type: "checkbox",
        component: reactstrap.Input,
        value: true,
        uncheckedValue: false
      }), label)));
    }
  }]);

  return Checkbox;
}(React.PureComponent);

_defineProperty(Checkbox, "propTypes", {
  answer: PropTypes.instanceOf(occsn.Answer)
});

var DropDown =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(DropDown, _PureComponent);

  function DropDown() {
    _classCallCheck(this, DropDown);

    return _possibleConstructorReturn(this, _getPrototypeOf(DropDown).apply(this, arguments));
  }

  _createClass(DropDown, [{
    key: "renderOptionTitle",
    value: function renderOptionTitle(option) {
      if (option.price) {
        return option.title + ' ' + server.renderToString(React__default.createElement(Currency, {
          quantity: Decimal(option.price),
          currency: option.question().product().merchant().currency().name
        }));
      } else {
        return option.title;
      }
    }
  }, {
    key: "render",
    value: function render() {
      var answer = this.props.answer;
      var id = 'answer-' + answer.question().id;
      return React__default.createElement(reactstrap.FormGroup, {
        className: "dropdown-container"
      }, React__default.createElement("a", {
        name: id
      }), React__default.createElement(reactstrap.Label, {
        for: id
      }, answer.question().title, answer.question().required ? '*' : ''), React__default.createElement(mitragyna.Field, {
        id: id,
        name: "option",
        type: "select",
        component: reactstrap.Input,
        includeBlank: !answer.option(),
        options: answer.question().options().target(),
        optionsLabel: this.renderOptionTitle
      }));
    }
  }]);

  return DropDown;
}(React.PureComponent);

_defineProperty(DropDown, "propTypes", {
  answer: PropTypes.instanceOf(occsn.Answer)
});

var OptionList =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(OptionList, _PureComponent);

  function OptionList() {
    _classCallCheck(this, OptionList);

    return _possibleConstructorReturn(this, _getPrototypeOf(OptionList).apply(this, arguments));
  }

  _createClass(OptionList, [{
    key: "render",
    value: function render() {
      var answer = this.props.answer;
      var id = 'answer-' + answer.question().id;
      return React__default.createElement(reactstrap.FormGroup, {
        className: "option-list-container",
        tag: "fieldset"
      }, React__default.createElement("a", {
        name: id
      }), React__default.createElement(reactstrap.Label, {
        for: id
      }, answer.question().title, answer.question().required ? '*' : ''), React__default.createElement(mitragyna.Field, {
        type: "radioGroup",
        name: "option"
      }, answer.question().options().target().map(function (option) {
        return React__default.createElement(reactstrap.FormGroup, {
          check: true
        }, React__default.createElement(reactstrap.Label, {
          for: option.id,
          check: true
        }, React__default.createElement(mitragyna.Field, {
          id: option.id,
          name: "option",
          type: "radio",
          component: reactstrap.Input,
          value: option
        }), React__default.createElement("span", {
          className: "mr-1"
        }, option.title), option.price ? React__default.createElement("span", null, "(", React__default.createElement(Currency, {
          quantity: Decimal(option.price).toNumber(),
          currency: answer.order().product().merchant().currency().name
        }), ")") : null));
      }).toArray()));
    }
  }]);

  return OptionList;
}(React.PureComponent);

_defineProperty(OptionList, "propTypes", {
  answer: PropTypes.instanceOf(occsn.Answer)
});

var SpinButton =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(SpinButton, _PureComponent);

  function SpinButton() {
    var _this;

    _classCallCheck(this, SpinButton);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(SpinButton).call(this));

    _.bindAll(_assertThisInitialized(_assertThisInitialized(_this)), 'decrementValue', 'incrementValue');

    return _this;
  }

  _createClass(SpinButton, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var answer = this.props.answer;
      this.fieldRef.setValue(answer.question().min);
    }
  }, {
    key: "decrementValue",
    value: function decrementValue() {
      var currentValue = this.fieldRef.getValue();
      if (_.isString(currentValue)) currentValue = parseInt(currentValue);
      this.fieldRef.setValue(currentValue - 1);
    }
  }, {
    key: "incrementValue",
    value: function incrementValue() {
      var currentValue = this.fieldRef.getValue();
      if (_.isString(currentValue)) currentValue = parseInt(currentValue);
      this.fieldRef.setValue(currentValue + 1);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var answer = this.props.answer;
      var question = answer.question();
      var label = [React__default.createElement("span", {
        className: "mr-1"
      }, question.title)];
      label.push(React__default.createElement("span", {
        className: "mr-1"
      }, "(Max of ", question.max, ")"));

      if (question.required) {
        label.push(React__default.createElement("span", null, "*"));
      }

      var priceContribution;

      if (question.price) {
        var value = Decimal(answer.value);
        var price = Decimal(question.price);
        var currency = question.product().merchant().currency().name;
        priceContribution = React__default.createElement("span", null, answer.value, " x ", question.price, " =\xA0", React__default.createElement(Currency, {
          currency: currency,
          quantity: price.times(value).toNumber()
        }));
      }

      var id = 'answer-' + answer.question().id;
      return React__default.createElement(reactstrap.FormGroup, {
        className: "spin-button-container"
      }, React__default.createElement("a", {
        name: id
      }), React__default.createElement(reactstrap.Label, {
        for: id
      }, label), React__default.createElement(reactstrap.InputGroup, null, React__default.createElement(mitragyna.Field, {
        id: id,
        name: "value",
        type: "number",
        component: reactstrap.Input,
        max: question.max,
        min: question.min,
        ref: function ref(r) {
          return _this2.fieldRef = r;
        }
      }), React__default.createElement(reactstrap.InputGroupAddon, {
        addonType: "append"
      }, React__default.createElement(reactstrap.Button, {
        className: "spin-button-minus",
        color: "secondary",
        onClick: this.decrementValue
      }, "-"), React__default.createElement(reactstrap.Button, {
        className: "spin-button-plus",
        color: "secondary",
        onClick: this.incrementValue
      }, "+"))), React__default.createElement(reactstrap.FormText, {
        className: "spin-button-calculation"
      }, priceContribution));
    }
  }]);

  return SpinButton;
}(React.PureComponent);

_defineProperty(SpinButton, "propTypes", {
  answer: PropTypes.instanceOf(occsn.Answer)
});

var TextArea =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(TextArea, _PureComponent);

  function TextArea() {
    _classCallCheck(this, TextArea);

    return _possibleConstructorReturn(this, _getPrototypeOf(TextArea).apply(this, arguments));
  }

  _createClass(TextArea, [{
    key: "render",
    value: function render() {
      var answer = this.props.answer;
      var id = 'answer-' + answer.question().id;
      return React__default.createElement(reactstrap.FormGroup, {
        className: "text-area-container"
      }, React__default.createElement("a", {
        name: id
      }), React__default.createElement(reactstrap.Label, {
        for: id
      }, answer.question().title, answer.question().required ? '*' : ''), React__default.createElement(mitragyna.Field, {
        id: id,
        name: "value",
        type: "textarea",
        component: reactstrap.Input
      }));
    }
  }]);

  return TextArea;
}(React.PureComponent);

_defineProperty(TextArea, "propTypes", {
  answer: PropTypes.instanceOf(occsn.Answer)
});

var TextInput =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(TextInput, _PureComponent);

  function TextInput() {
    _classCallCheck(this, TextInput);

    return _possibleConstructorReturn(this, _getPrototypeOf(TextInput).apply(this, arguments));
  }

  _createClass(TextInput, [{
    key: "render",
    value: function render() {
      var answer = this.props.answer;
      var id = 'answer-' + answer.question().id;
      return React__default.createElement(reactstrap.FormGroup, {
        className: "text-input-container"
      }, React__default.createElement("a", {
        name: id
      }), React__default.createElement(reactstrap.Label, {
        for: id
      }, answer.question().title, answer.question().required ? '*' : ''), React__default.createElement(mitragyna.Field, {
        id: id,
        name: "value",
        type: "text",
        component: reactstrap.Input
      }));
    }
  }]);

  return TextInput;
}(React.PureComponent);

_defineProperty(TextInput, "propTypes", {
  answer: PropTypes.instanceOf(occsn.Answer)
});

var Waiver =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(Waiver, _PureComponent);

  function Waiver() {
    _classCallCheck(this, Waiver);

    return _possibleConstructorReturn(this, _getPrototypeOf(Waiver).apply(this, arguments));
  }

  _createClass(Waiver, [{
    key: "render",
    value: function render() {
      var answer = this.props.answer;
      var id = 'answer-' + answer.question().id;
      return React__default.createElement(reactstrap.FormGroup, {
        className: "waiver-container"
      }, React__default.createElement("a", {
        name: id
      }), React__default.createElement(reactstrap.Card, {
        color: "light"
      }, React__default.createElement(reactstrap.CardBody, null, React__default.createElement(reactstrap.CardText, null, ReactHtmlParser(answer.question().waiverText)))), React__default.createElement(reactstrap.FormGroup, {
        check: true
      }, React__default.createElement(reactstrap.Label, {
        for: id,
        check: true,
        className: "mt-2"
      }, React__default.createElement(mitragyna.Field, {
        id: id,
        name: "value",
        type: "checkbox",
        component: reactstrap.Input,
        value: true,
        uncheckedValue: false
      }), answer.question().title, "*")));
    }
  }]);

  return Waiver;
}(React.PureComponent);

_defineProperty(Waiver, "propTypes", {
  answer: PropTypes.instanceOf(occsn.Answer)
});

var Answer =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(Answer, _PureComponent);

  function Answer() {
    _classCallCheck(this, Answer);

    return _possibleConstructorReturn(this, _getPrototypeOf(Answer).apply(this, arguments));
  }

  _createClass(Answer, [{
    key: "render",
    value: function render() {
      var subject = this.props.subject;
      var answerProps = {
        answer: subject,
        className: s.camelize(subject.question().formControl)
      };

      switch (subject.question().formControl) {
        case 'checkbox':
          return React__default.createElement(Checkbox, answerProps);

        case 'drop_down':
          return React__default.createElement(DropDown, answerProps);

        case 'option_list':
          return React__default.createElement(OptionList, answerProps);

        case 'spin_button':
          return React__default.createElement(SpinButton, answerProps);

        case 'text_area':
          return React__default.createElement(TextArea, answerProps);

        case 'text_input':
          return React__default.createElement(TextInput, answerProps);

        case 'waiver':
          return React__default.createElement(Waiver, answerProps);
      }
    }
  }]);

  return Answer;
}(React.PureComponent);

_defineProperty(Answer, "propTypes", {
  subject: PropTypes.instanceOf(occsn.Answer)
});

var Questions =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(Questions, _PureComponent);

  function Questions() {
    _classCallCheck(this, Questions);

    return _possibleConstructorReturn(this, _getPrototypeOf(Questions).apply(this, arguments));
  }

  _createClass(Questions, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          subject = _this$props.subject,
          questions = _this$props.questions;
      return React__default.createElement("section", {
        className: "questions"
      }, questions.map(function (question) {
        switch (question.formControl) {
          case 'text_output':
            if (question.displayAsTitle) {
              return React__default.createElement("legend", {
                className: "question text-output-title",
                key: question.id
              }, question.title);
            } else {
              return React__default.createElement("p", {
                className: "question text-output",
                key: question.id
              }, question.title);
            }

          case 'separator':
            return React__default.createElement("hr", {
              className: "question separator",
              key: question.id
            });

          default:
            var answer = subject.answers().target().detect(function (a) {
              return a.question() == question;
            });
            return React__default.createElement(mitragyna.Resource, {
              className: "question",
              component: Answer,
              key: question.id,
              reflection: "answers",
              subject: answer
            });
        }
      }).toArray());
    }
  }]);

  return Questions;
}(React.PureComponent);

_defineProperty(Questions, "propTypes", {
  questions: PropTypes.shape({
    __collection: PropTypes.arrayOf(PropTypes.instanceOf(occsn.Question))
  }).isRequired,
  subject: PropTypes.instanceOf(occsn.Order)
});

var Coupon =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(Coupon, _PureComponent);

  function Coupon() {
    _classCallCheck(this, Coupon);

    return _possibleConstructorReturn(this, _getPrototypeOf(Coupon).apply(this, arguments));
  }

  _createClass(Coupon, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          currency = _this$props.currency,
          subject = _this$props.subject;
      var removeRedeemable = this.context.removeRedeemable;
      var discount;

      if (!_.isNull(subject.discountFixed)) {
        discount = React__default.createElement(Currency, {
          currency: currency,
          quantity: Decimal(subject.discountFixed).toNumber()
        });
      } else {
        discount = React__default.createElement("span", null, subject.discountPercentage, "%");
      }

      var onRemove = function onRemove() {
        removeRedeemable(subject);
      };

      return React__default.createElement(reactstrap.Card, {
        className: "coupon-container"
      }, React__default.createElement(reactstrap.CardBody, {
        className: "coupon"
      }, React__default.createElement(reactstrap.Button, {
        className: "close",
        onClick: onRemove
      }, React__default.createElement("span", {
        "aria-hidden": "true"
      }, "\xD7")), React__default.createElement(reactstrap.CardTitle, {
        className: "coupon-title"
      }, subject.name, " - ", subject.code), React__default.createElement(reactstrap.CardText, {
        className: "coupon-message"
      }, discount)));
    }
  }]);

  return Coupon;
}(React.PureComponent);

_defineProperty(Coupon, "propTypes", {
  currency: PropTypes.string.isRequired,
  subject: PropTypes.instanceOf(occsn.Coupon)
});

_defineProperty(Coupon, "contextTypes", {
  removeRedeemable: PropTypes.func
});

var GiftCard =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(GiftCard, _PureComponent);

  function GiftCard() {
    _classCallCheck(this, GiftCard);

    return _possibleConstructorReturn(this, _getPrototypeOf(GiftCard).apply(this, arguments));
  }

  _createClass(GiftCard, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          currency = _this$props.currency,
          subject = _this$props.subject;
      var removeRedeemable = this.context.removeRedeemable;
      var giftCard = subject.paymentMethod();
      var giftCardValue = new Decimal(giftCard.value);
      var transactionValue = new Decimal(subject.amount);
      var remainingBalance = giftCardValue.minus(transactionValue);

      var onRemove = function onRemove() {
        removeRedeemable(giftCard);
      };

      return React__default.createElement(reactstrap.Card, {
        className: "gift-card-container"
      }, React__default.createElement(reactstrap.CardBody, {
        className: "gift-card"
      }, React__default.createElement(reactstrap.Button, {
        className: "close",
        onClick: onRemove
      }, React__default.createElement("span", {
        "aria-hidden": "true"
      }, "\xD7")), React__default.createElement(reactstrap.CardText, {
        className: "gift-card-messages"
      }, React__default.createElement(reactstrap.CardTitle, {
        className: "gift-card-title"
      }, "Gift Card - ", subject.paymentMethod().code), React__default.createElement(reactstrap.FormText, {
        className: "gift-card-remaining-balance"
      }, "Remaining balance will be", ' ', React__default.createElement(Currency, {
        currency: currency,
        quantity: remainingBalance.toNumber()
      }), " after checkout."), React__default.createElement("span", {
        className: "gift-card-amount"
      }, React__default.createElement(Currency, {
        currency: currency,
        quantity: transactionValue.toNumber()
      }), "\xA0/\xA0"), React__default.createElement("span", {
        className: "gift-card-value"
      }, React__default.createElement(Currency, {
        currency: currency,
        quantity: giftCardValue.toNumber()
      })))));
    }
  }]);

  return GiftCard;
}(React.PureComponent);

_defineProperty(GiftCard, "propTypes", {
  currency: PropTypes.string.isRequired,
  subject: PropTypes.instanceOf(occsn.Transaction)
});

_defineProperty(GiftCard, "contextTypes", {
  removeRedeemable: PropTypes.func
});

var Redeemables =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(Redeemables, _PureComponent);

  function Redeemables() {
    var _this;

    _classCallCheck(this, Redeemables);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Redeemables).call(this));

    _.bindAll(_assertThisInitialized(_assertThisInitialized(_this)), 'addErrors', 'addRedeemable', 'checkForRedeemable', 'handleChange', 'showInput', 'removeRedeemable');

    return _this;
  }

  _createClass(Redeemables, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      this.setState({
        code: '',
        focused: false
      });
    }
  }, {
    key: "addErrors",
    value: function addErrors(errors) {
      var _this$props = this.props,
          onErrors = _this$props.onErrors,
          order = _this$props.order;
      var newOrder = order.clone();
      newOrder.errors().clear();
      errors.each(function (e) {
        e.field = 'redeemables.' + e.parameter.replace('filter/', '');
        newOrder.errors().push(e);
      });
      onErrors(newOrder);
    }
  }, {
    key: "addRedeemable",
    value: function addRedeemable(redeemable) {
      var _this$props2 = this.props,
          onChange = _this$props2.onChange,
          order = _this$props2.order;
      this.setState({
        code: ''
      });

      if (redeemable.isA(occsn.Coupon)) {
        onChange(order.assignAttributes({
          coupon: redeemable
        }));
      } else if (redeemable.isA(occsn.GiftCard)) {
        var outstandingBalance = order.outstandingBalance;
        var giftCardValue = new Decimal(redeemable.value);
        var transactionAmount;

        if (outstandingBalance.greaterThan(giftCardValue)) {
          transactionAmount = giftCardValue;
        } else {
          transactionAmount = outstandingBalance;
        }

        order = order.clone();
        order.charge(redeemable, transactionAmount.toString());
        onChange(order);
      }
    }
  }, {
    key: "checkForRedeemable",
    value: function checkForRedeemable(code) {
      var _this$props3 = this.props,
          findRedeemable = _this$props3.findRedeemable,
          order = _this$props3.order;
      findRedeemable(order.product(), code, this.addRedeemable, this.addErrors);
    }
  }, {
    key: "getChildContext",
    value: function getChildContext() {
      return {
        removeRedeemable: this.removeRedeemable
      };
    }
  }, {
    key: "handleChange",
    value: function handleChange(e) {
      this.setState({
        code: e.target.value
      });
    } // If true, display the input to search for more redeemables
    //
    // @note Displays in two cases:
    //   - outstandingBalance is greater than zero (more gift cards can be added)
    //   - outstandingBalance is zero, but a coupon has not been added (coupon can still lower order.price)
    //
    // @return [Boolean] whether or not to show the input to search for more redeemables

  }, {
    key: "showInput",
    value: function showInput() {
      var order = this.props.order;
      return order.outstandingBalance && !order.outstandingBalance.isZero() || _.isNull(order.coupon());
    }
  }, {
    key: "removeRedeemable",
    value: function removeRedeemable(redeemable) {
      var _this$props4 = this.props,
          onChange = _this$props4.onChange,
          order = _this$props4.order;

      if (redeemable.isA(occsn.Coupon)) {
        onChange(order.assignAttributes({
          coupon: null
        }));
      } else if (redeemable.isA(occsn.GiftCard)) {
        order = order.clone();
        order.removeCharge(redeemable);
        onChange(order);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var order = this.props.order;
      var code = this.state.code;
      var currency = order.product().merchant().currency();
      var redeemables = [];

      if (!_.isNull(order.coupon())) {
        redeemables.push(React__default.createElement(Coupon, {
          currency: currency.name,
          subject: order.coupon()
        }));
      }

      var giftCardTransactions = order.transactions().target().select(function (t) {
        return t.paymentMethod() && t.paymentMethod().isA(occsn.GiftCard);
      });
      giftCardTransactions.each(function (giftCardTransaction) {
        redeemables.push(React__default.createElement(GiftCard, {
          currency: currency.name,
          subject: giftCardTransaction
        }));
      });
      return React__default.createElement("section", {
        className: "redeemables"
      }, React__default.createElement("section", {
        className: "redeemables-list"
      }, redeemables), this.showInput() ? React__default.createElement(reactstrap.FormGroup, {
        className: "redeemable-code"
      }, React__default.createElement(reactstrap.InputGroup, {
        className: order.errors().forField('redeemables.code').empty() ? '' : 'is-invalid'
      }, React__default.createElement(reactstrap.Input, {
        className: "redeemable-code-input",
        onChange: this.handleChange,
        onFocus: function onFocus() {
          return _this2.setState({
            focused: true
          });
        },
        onBlur: function onBlur() {
          return _this2.setState({
            focused: false
          });
        },
        value: code,
        onKeyPress: function onKeyPress(event) {
          if (event.key == 'Enter') {
            _this2.checkForRedeemable(code);
          }
        }
      }), React__default.createElement(reactstrap.InputGroupAddon, {
        addonType: "append"
      }, React__default.createElement(reactstrap.Button, {
        className: "redeemable-code-input-button",
        onClick: function onClick() {
          return _this2.checkForRedeemable(code);
        }
      }, "Apply"))), React__default.createElement(mitragyna.ErrorsFor, {
        className: "redeemable-code-errors",
        component: reactstrap.FormFeedback,
        field: "redeemables.code"
      })) : null);
    }
  }]);

  return Redeemables;
}(React.PureComponent);

_defineProperty(Redeemables, "propTypes", {
  findRedeemable: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onErrors: PropTypes.func.isRequired,
  order: PropTypes.instanceOf(occsn.Order).isRequired
});

_defineProperty(Redeemables, "childContextTypes", {
  removeRedeemable: PropTypes.func
});

var Order =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(Order, _PureComponent);

  function Order() {
    var _this;

    _classCallCheck(this, Order);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Order).call(this));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "renderBookOrderButton", function () {
      var _this$props = _this.props,
          bookingOrder = _this$props.bookingOrder,
          onSubmit = _this$props.onSubmit,
          subject = _this$props.subject;
      var _this$context = _this.context,
          callbackProps = _this$context.callbackProps,
          componentProps = _this$context.componentProps;
      var button = React__default.createElement(reactstrap.Button, {
        block: true,
        className: "book-order-button",
        color: "success",
        id: "bookOrder",
        size: "lg",
        disabled: !_this.allowedToBookOrder(),
        onClick: onSubmit
      }, React__default.createElement("span", null, subject.product().orderButtonText), bookingOrder && componentProps.orderBooking && React__default.createElement(componentProps.orderBooking));
      if (callbackProps.onBookOrderButtonRender) callbackProps.onBookOrderButtonRender(button);
      return button;
    });

    _.bindAll(_assertThisInitialized(_assertThisInitialized(_this)), 'allowedToBookOrder', 'headerForSection', 'showPaymentForm', 'showPrice');

    return _this;
  }

  _createClass(Order, [{
    key: "allowedToBookOrder",
    value: function allowedToBookOrder() {
      var _this$props2 = this.props,
          bookingOrder = _this$props2.bookingOrder,
          savingOrder = _this$props2.savingOrder,
          subject = _this$props2.subject;
      if (!subject || !this.missingAnswers) return false;
      return !bookingOrder && !savingOrder && this.missingAnswers.missingRequiredAnswers(subject).empty();
    } // Mitragyna callback

  }, {
    key: "beforeSubmit",
    value: function beforeSubmit(subject) {
      if (this.redeemables && this.redeemables.state.focused) {
        this.redeemables.checkForRedeemable(this.redeemables.state.code);
        throw subject;
      }

      if (!subject.outstandingBalance.isZero()) {
        var balanceTransaction = subject.transactions().target().detect(function (t) {
          return !(t.paymentMethod() && t.paymentMethod(occsn.GiftCard));
        });
        if (balanceTransaction) subject.transactions().target().delete(balanceTransaction);
        return this.paymentForm.chargeOutstandingBalanceToPaymentMethod(subject);
      } else {
        return subject;
      }
    } // @param [String] section the name of the section to get the custom or default section title for, rendered as <h2>

  }, {
    key: "headerForSection",
    value: function headerForSection(section) {
      var subject = this.props.subject;
      var product = subject.product();

      switch (section) {
        case 'contact':
          return React__default.createElement("div", {
            className: "container-title",
            id: "widgetContactTitle"
          }, React__default.createElement("h4", null, _.isNull(product.widgetContactTitle) ? 'Customer Information' : product.widgetContactTitle), React__default.createElement("hr", {
            className: "pb-3"
          }));

        case 'timeSlots':
          return React__default.createElement("div", {
            className: "container-title",
            id: "widgetTimeSlotsTitle"
          }, React__default.createElement("h4", null, _.isNull(product.widgetTimeSlotsTitle) ? 'Select which day you would like to reserve' : product.widgetTimeSlotsTitle), React__default.createElement("hr", {
            className: "pb-3"
          }));

        case 'questions':
          return React__default.createElement("div", {
            className: "container-title",
            id: "widgetQuestionsTitle"
          }, React__default.createElement("h4", null, _.isNull(product.widgetQuestionsTitle) ? 'Additional Questions' : product.widgetQuestionsTitle), React__default.createElement("hr", {
            className: "pb-3"
          }));

        case 'attendees':
          return React__default.createElement("div", {
            className: "container-title",
            id: "widgetAttendeesTitle"
          }, React__default.createElement("h4", null, "Attendee Information"), React__default.createElement("hr", {
            className: "pb-3"
          }));

        case 'payment':
          return React__default.createElement("div", {
            className: "container-title",
            id: "widgetPaymentTitle"
          }, React__default.createElement("h4", null, _.isNull(product.widgetPaymentTitle) ? 'Payment Information' : product.widgetPaymentTitle), React__default.createElement("hr", {
            className: "pb-3"
          }));

        case 'redeemables':
          return React__default.createElement("div", {
            className: "container-title",
            id: "widgetRedeemableTitle"
          }, React__default.createElement("h4", null, "Coupons and Gift Cards"), React__default.createElement("hr", {
            className: "pb-3"
          }));

        case 'totalDue':
          return React__default.createElement("div", {
            className: "container-title",
            id: "widgetTotalDueTitle"
          }, React__default.createElement("h4", null, _.isNull(product.widgetTotalDueTitle) ? !product.depositBehavior || product.depositBehavior == 'no_deposit' ? 'Total Due Today' : 'Deposit Due Today' : product.widgetTotalDueTitle), React__default.createElement("hr", {
            className: "pb-3"
          }));
      }
    } // Determines if should show Attendees
    // @note If the product is quantity aware && has attendeeQuestions, and order.quantity > 0, show Attendees
    //
    // @return [Boolean] whether or not to show Attendees

  }, {
    key: "showAttendees",
    value: function showAttendees() {
      var subject = this.props.subject;
      var product = subject.product();
      if (subject.newResource()) return false;
      return !product.attendeeQuestions.empty() && subject.quantity > 0;
    } // Determines if should show TimeSlotsContainer
    // @note If the product has firstTimeSlotStartsAt and requiresTimeSlotSelection, and a timeSlot has not been
    //   pre-selected via window.OCCSN.time_slot_id, then show TimeSlotsContainer
    //
    // @return [Boolean] whether or not to show TimeSlotsContainer

  }, {
    key: "showTimeSlots",
    value: function showTimeSlots() {
      var subject = this.props.subject;
      var product = subject.product();
      return product.firstTimeSlotStartsAt && (product.requiresTimeSlotSelection || product.sellsSessions) && !window.OCCSN.time_slot_id;
    } // Determines if should show Questions
    // @note If the product.questions() is empty, don't show questions
    //
    // @return [Boolean] whether or not to show Questions

  }, {
    key: "showQuestions",
    value: function showQuestions() {
      var subject = this.props.subject;
      var product = subject.product();
      return !product.questions().empty();
    } // Determines if should show Redeemables
    // @note If the product is not free && hasRedeemables then show Redeemables
    //
    // @return [Boolean] whether or not to show Redeemables

  }, {
    key: "showRedeemables",
    value: function showRedeemables() {
      var subject = this.props.subject;
      var product = subject.product();
      if (subject.newResource()) return false;
      return !product.free && product.hasRedeemables && (subject.subtotal && !subject.subtotal.isZero() || window.OCCSN.coupon_code);
    } // Determines if should show the payment form
    // @note If the product is free or outstandingBalance is zero, do not show the payment form
    //
    // @return [Boolean] whether or not to show the payment form

  }, {
    key: "showPaymentForm",
    value: function showPaymentForm() {
      var subject = this.props.subject;
      var product = subject.product();
      if (subject.newResource()) return false;
      return !(product.free || !subject.outstandingBalance || subject.outstandingBalance.isZero());
    } // Determines if should show the price output
    // @note If the product is free or price is null (required price-calculating questions are missing answers),
    //   do not show the price display
    //
    // @return [Boolean] whether or not to show the payment form

  }, {
    key: "showPrice",
    value: function showPrice() {
      var subject = this.props.subject;
      var product = subject.product();
      if (subject.newResource()) return false;
      return !product.free && subject.price;
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props3 = this.props,
          afterError = _this$props3.afterError,
          saveOrder = _this$props3.saveOrder,
          findRedeemable = _this$props3.findRedeemable,
          setSkipAttendee = _this$props3.setSkipAttendee,
          skipAttendees = _this$props3.skipAttendees,
          subject = _this$props3.subject,
          spreedlyIframeInputStyles = _this$props3.spreedlyIframeInputStyles,
          squareIframeInputStyles = _this$props3.squareIframeInputStyles;
      var customer = subject.customer();
      var product = subject.product();
      return React__default.createElement("section", {
        className: "order-container"
      }, this.showTimeSlots() && React__default.createElement("section", {
        className: "time-slots-container",
        id: "time-slots-container"
      }, React__default.createElement("a", {
        name: "time-slots",
        id: "time-slots-anchor"
      }), this.headerForSection('timeSlots'), React__default.createElement(TimeSlotsContainer$1, {
        order: subject
      })), React__default.createElement("section", {
        className: "information-container",
        id: "information-container"
      }, React__default.createElement("section", {
        className: "customer-container",
        id: "customer-container"
      }, React__default.createElement("a", {
        name: "customer",
        id: "customer-anchor"
      }), this.headerForSection('contact'), React__default.createElement(mitragyna.Resource, {
        component: Customer,
        reflection: "customer",
        subject: customer
      })), this.showQuestions() && React__default.createElement("section", {
        className: "questions-container",
        id: "questions-container"
      }, React__default.createElement("a", {
        name: "questions",
        id: "questions-anchor"
      }), this.headerForSection('questions'), React__default.createElement(Questions, {
        subject: subject,
        questions: product.questions().target()
      })), this.showAttendees() && React__default.createElement("section", {
        className: "attendees-container",
        id: "attendees-container"
      }, React__default.createElement("a", {
        name: "attendees",
        id: "attendees-anchor"
      }), this.headerForSection('attendees'), React__default.createElement(Attendees, {
        questions: product.attendeeQuestions,
        setSkipAttendee: setSkipAttendee,
        skipAttendees: skipAttendees,
        subject: subject
      }))), React__default.createElement("section", {
        className: "payments-container",
        id: "payments-container"
      }, this.showRedeemables() && React__default.createElement("section", {
        className: "redeemables-container",
        id: "redeemables-container"
      }, React__default.createElement("a", {
        name: "redeemables",
        id: "redeemables-anchor"
      }), this.headerForSection('redeemables'), React__default.createElement(Redeemables, {
        findRedeemable: findRedeemable,
        order: subject,
        onChange: saveOrder,
        onErrors: afterError,
        ref: function ref(r) {
          return _this2.redeemables = r;
        }
      })), this.showPrice() && React__default.createElement("section", {
        className: "total-due-container",
        id: "total-due-container"
      }, React__default.createElement("a", {
        name: "total-due",
        id: "total-due-anchor"
      }), this.headerForSection('totalDue'), React__default.createElement(Pricing, {
        order: subject
      })), this.showPaymentForm() && React__default.createElement("section", {
        className: "payment-container",
        id: "payment-container"
      }, React__default.createElement("a", {
        name: "payment",
        id: "payment-anchor"
      }), this.headerForSection('payment'), React__default.createElement(PaymentForm, {
        order: subject,
        spreedlyIframeInputStyles: spreedlyIframeInputStyles,
        squareIframeInputStyles: squareIframeInputStyles,
        ref: function ref(form) {
          return _this2.paymentForm = form;
        }
      }))), React__default.createElement("section", {
        className: "missing-answers-container",
        id: "missing-answers-container"
      }, React__default.createElement("a", {
        name: "missing-answers"
      }), React__default.createElement(MissingAnswers, {
        order: subject,
        ref: function ref(r) {
          return _this2.missingAnswers = r;
        }
      })), React__default.createElement("section", {
        className: "order-errors-container",
        id: "order-errors-container"
      }, React__default.createElement("a", {
        name: "order-errors"
      }), React__default.createElement(OrderErrors, {
        order: subject
      })), React__default.createElement("section", {
        className: "book-order-container",
        id: "book-order-container"
      }, this.renderBookOrderButton()));
    }
  }]);

  return Order;
}(React.PureComponent);

_defineProperty(Order, "propTypes", {
  activeTimeSlotsCollection: PropTypes.shape({
    // __collection: PropTypes.arrayOf(PropTypes.instanceOf(occsn.TimeSlot))
    __collection: PropTypes.array
  }),
  timeSlotsFromCalendar: PropTypes.shape({
    __collection: PropTypes.arrayOf(PropTypes.instanceOf(occsn.TimeSlot))
  }),
  afterError: PropTypes.func.isRequired,
  afterUpdate: PropTypes.func.isRequired,
  bookingOrder: PropTypes.bool,
  findRedeemable: PropTypes.func.isRequired,
  onSubmit: PropTypes.func,
  saveOrder: PropTypes.func,
  savingOrder: PropTypes.bool,
  setSkipAttendee: PropTypes.func,
  skipAttendees: PropTypes.object,
  subject: PropTypes.instanceOf(occsn.Order).isRequired,
  spreedlyIframeInputStyles: PropTypes.object,
  squareIframeInputStyles: PropTypes.object
});

_defineProperty(Order, "contextTypes", {
  callbackProps: PropTypes.object,
  componentProps: PropTypes.object
});

var OrderComplete =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(OrderComplete, _PureComponent);

  function OrderComplete() {
    _classCallCheck(this, OrderComplete);

    return _possibleConstructorReturn(this, _getPrototypeOf(OrderComplete).apply(this, arguments));
  }

  _createClass(OrderComplete, [{
    key: "render",
    value: function render() {
      var order = this.props.order;
      return React__default.createElement("section", {
        className: "order-complete-container"
      }, React__default.createElement("h1", {
        className: "verification-code"
      }, "Order #", order.verificationCode), !order.timeSlots().empty() ? React__default.createElement("section", {
        className: "order-complete-time-slot-details"
      }, order.timeSlots().target().map(function (timeSlot) {
        return React__default.createElement("h4", null, timeSlot.toString('LLLL'));
      }).toArray()) : null, React__default.createElement("section", {
        className: "order-complete-messages"
      }, React__default.createElement("p", {
        className: "custom-confirmation-message"
      }, ReactHtmlParser(order.product().customerConfirmationMessage)), React__default.createElement("p", {
        className: "confirmation-email-message"
      }, "An order confirmation email with receipt has been sent to ", order.customer().email, ".")));
    }
  }]);

  return OrderComplete;
}(React.PureComponent);

_defineProperty(OrderComplete, "propTypes", {
  order: PropTypes.instanceOf(occsn.Order)
});

function stateToProps$1(state) {
  return {
    data: {
      bookingOrder: state.$$appStore.get('bookingOrder'),
      savingOrder: state.$$appStore.get('savingOrder'),
      loadingProduct: state.$$appStore.get('loadingProduct'),
      skipAttendees: state.$$appStore.get('skipAttendees').toObject(),
      order: state.$$appStore.get('order'),
      product: state.$$appStore.get('product'),
      productNotFoundError: state.$$appStore.get('productNotFoundError'),
      activeTimeSlotsCollection: state.$$calendarStore.get('activeTimeSlotsCollection'),
      timeSlotsFromCalendar: state.$$calendarStore.get('timeSlotsFromCalendar')
    }
  };
} // Bind relevant action creators and map them to properties


function dispatchToProps$1(dispatch) {
  return {
    actions: {
      bookOrder: function bookOrder$$1(order) {
        return dispatch(bookOrder(order));
      },
      findRedeemable: function findRedeemable$$1(product, code, onSuccess, onError) {
        return dispatch(findRedeemable(product, code, onSuccess, onError));
      },
      loadProduct: function loadProduct$$1() {
        return dispatch(loadProduct(window.OCCSN.product_id));
      },
      saveOrder: function saveOrder$$1(order) {
        return dispatch(saveOrder(order));
      },
      setOrder: function setOrder$$1(order) {
        return dispatch(setOrder(order));
      },
      setSkipAttendee: function setSkipAttendee$$1(attendee, skip) {
        return dispatch(setSkipAttendee(attendee, skip));
      }
    }
  };
}

var AppContainer =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(AppContainer, _PureComponent);

  function AppContainer(props) {
    var _this;

    _classCallCheck(this, AppContainer);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(AppContainer).call(this, props));

    _.bindAll(_assertThisInitialized(_assertThisInitialized(_this)), 'renderBookingScreen', 'renderCompleteScreen', 'renderLoadingScreen', 'checkPrefilledAttributes', 'setPrefilledAttributes');

    return _this;
  }

  _createClass(AppContainer, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this$props = this.props,
          actions = _this$props.actions,
          callbacks = _this$props.callbacks;
      actions.loadProduct();

      if (callbacks && callbacks.onOrderChange) {
        this.onOrderChange = _.debounce(callbacks.onOrderChange, 25);
      }

      if (callbacks && callbacks.onOrderComplete) {
        this.onOrderComplete = _.debounce(callbacks.onOrderComplete, 25);
      }

      if (callbacks && callbacks.onPersonalInformationComplete) {
        this.onPersonalInformationComplete = _.once(callbacks.onPersonalInformationComplete);
      }
    } // @todo Only execute the relevant parts based on the props that actually changed

  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      var _this$props2 = this.props,
          actions = _this$props2.actions,
          callbacks = _this$props2.callbacks,
          data = _this$props2.data;

      if (nextProps.data.order != null) {
        if (data.order == null) {
          actions.saveOrder(nextProps.data.order);
          this.checkPrefilledAttributes(nextProps.data.product);
        }

        if (this.onOrderChange) this.onOrderChange(nextProps.data.order);

        if (this.onOrderComplete && nextProps.data.order.status == 'booked') {
          this.onOrderComplete(nextProps.data.order);
        }

        if (this.onPersonalInformationComplete) {
          var order = nextProps.data.order;

          if (order.customer().complete() && !order.answers().target().detect(function (a) {
            return !a.valid();
          }) && !order.attendees().target().detect(function (a, index) {
            return !(a.complete() || nextProps.data.skipAttendees[index]);
          }) && nextProps.data.order.status == 'initialized') {
            this.onPersonalInformationComplete(nextProps.data.order);
          }
        }
      }

      if (data.product == null && nextProps.data.product != null) {
        if (callbacks && callbacks.onProductLoad) callbacks.onProductLoad(nextProps.data.product);
      } else if (data.productNotFoundError) {
        if (callbacks && callbacks.onProductNotFound) callbacks.onProductNotFound(data.productNotFoundError);
      }
    }
  }, {
    key: "getChildContext",
    value: function getChildContext() {
      return {
        callbackProps: this.props.callbacks || {},
        componentProps: this.props.components || {},
        formatProps: this.props.format || {}
      };
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props3 = this.props,
          actions = _this$props3.actions,
          data = _this$props3.data;

      if (data.product) {
        if (data.order != null && data.order.status == 'booked') {
          return this.renderCompleteScreen();
        } else {
          return this.renderBookingScreen();
        }
      } else {
        return this.renderLoadingScreen();
      }
    }
  }, {
    key: "renderLoadingScreen",
    value: function renderLoadingScreen() {
      var components = this.props.components;
      var loadingComponent;

      if (components && components.orderLoading) {
        loadingComponent = React__default.createElement(components.orderLoading);
      }

      return React__default.createElement("section", {
        className: "order-loading"
      }, loadingComponent);
    }
  }, {
    key: "renderBookingScreen",
    value: function renderBookingScreen() {
      var _this$props4 = this.props,
          actions = _this$props4.actions,
          data = _this$props4.data,
          className = _this$props4.className,
          formRef = _this$props4.formRef,
          spreedlyIframeInputStyles = _this$props4.spreedlyIframeInputStyles,
          squareIframeInputStyles = _this$props4.squareIframeInputStyles;
      var classNames = classnames('occsn-app-container', className);
      return React__default.createElement("section", {
        className: classNames
      }, data.order ? React__default.createElement(mitragyna.Resource, {
        afterError: actions.setOrder,
        afterUpdate: actions.saveOrder,
        component: Order,
        componentProps: {
          activeTimeSlotsCollection: data.activeTimeSlotsCollection,
          bookingOrder: data.bookingOrder,
          findRedeemable: actions.findRedeemable,
          saveOrder: actions.saveOrder,
          savingOrder: data.savingOrder,
          setSkipAttendee: actions.setSkipAttendee,
          skipAttendees: data.skipAttendees,
          timeSlotsFromCalendar: data.timeSlotsFromCalendar,
          spreedlyIframeInputStyles: spreedlyIframeInputStyles,
          squareIframeInputStyles: squareIframeInputStyles
        },
        componentRef: formRef,
        onSubmit: actions.bookOrder,
        onInvalidSubmit: actions.setOrder,
        subject: data.order
      }) : null);
    }
  }, {
    key: "renderCompleteScreen",
    value: function renderCompleteScreen() {
      var data = this.props.data;
      return React__default.createElement(OrderComplete, {
        order: data.order
      });
    }
  }, {
    key: "checkPrefilledAttributes",
    value: function checkPrefilledAttributes(product) {
      var actions = this.props.actions;
      var promises = [];

      if (window.OCCSN.coupon_code) {
        promises.push(new Promise(function (resolve) {
          actions.findRedeemable(product, window.OCCSN.coupon_code, function (coupon) {
            return resolve(coupon);
          }, null);
        }));
      } else {
        promises.push(new Promise(function (resolve) {
          return resolve();
        }));
      }

      if (window.OCCSN.time_slot_id) {
        promises.push(product.timeSlots().includes({
          product: 'merchant'
        }).where({
          status: 'bookable'
        }).find(window.OCCSN.time_slot_id));
      }

      if (promises.size == 0) return;
      Promise.all(promises).then(this.setPrefilledAttributes);
    }
  }, {
    key: "setPrefilledAttributes",
    value: function setPrefilledAttributes(prefills) {
      var _this$props5 = this.props,
          actions = _this$props5.actions,
          data = _this$props5.data;
      var attributes = {};

      if (prefills[0]) {
        attributes.coupon = prefills[0];
      }

      if (prefills[1]) {
        attributes.timeSlots = [prefills[1]];
      }

      if (attributes == {}) return;
      actions.saveOrder(data.order.assignAttributes(attributes));
    }
  }]);

  return AppContainer;
}(React.PureComponent); // See https://github.com/reactjs/react-redux/blob/master/docs/api.md#examples

_defineProperty(AppContainer, "propTypes", {
  actions: PropTypes.object.isRequired,
  callbacks: PropTypes.shape({
    onBookOrderButtonRender: PropTypes.func,
    onDateSelect: PropTypes.func,
    onOrderComplete: PropTypes.func,
    onOrderChange: PropTypes.func,
    onMissingAnswerClicked: PropTypes.func,
    onPersonalInformationComplete: PropTypes.func,
    onProductLoad: PropTypes.func,
    onProductNotFound: PropTypes.func,
    onTimeSelect: PropTypes.func
  }),
  components: PropTypes.shape({
    orderBooking: PropTypes.func,
    orderLoading: PropTypes.func,
    timeSlotsLoading: PropTypes.func
  }),
  data: PropTypes.object.isRequired,
  format: PropTypes.shape({
    calendarTimeSlotsSelector: PropTypes.string,
    listTimeSlotsSelector: PropTypes.string
  }),
  formRef: PropTypes.func,
  spreedlyIframeInputStyles: PropTypes.object,
  squareIframeInputStyles: PropTypes.object
});

_defineProperty(AppContainer, "childContextTypes", {
  callbackProps: PropTypes.object,
  componentProps: PropTypes.object,
  formatProps: PropTypes.object
});

var AppContainer$1 = reactRedux.connect(stateToProps$1, dispatchToProps$1)(AppContainer);

var $$initialState = Immutable.fromJS({
  bookingOrder: false,
  loadingProduct: false,
  order: null,
  product: null,
  productNotFoundError: false,
  savingOrder: 0,
  skipAttendees: {}
});

function setSkipAttendee$1(attendees, attendee, skip) {
  return attendees.set(attendee, skip);
}

function appReducer() {
  var $$state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : $$initialState;
  var action = arguments.length > 1 ? arguments[1] : undefined;
  var type = action.type;

  switch (type) {
    case actionTypes.OCCSN_BOOK_ORDER_REQUEST:
      return $$state.merge({
        bookingOrder: true
      });

    case actionTypes.OCCSN_BOOK_ORDER_REQUEST_COMPLETE:
      return $$state.merge({
        bookingOrder: false
      });

    case actionTypes.OCCSN_LOAD_PRODUCT_REQUEST:
      return $$state.merge({
        loadingProduct: true
      });

    case actionTypes.OCCSN_LOAD_PRODUCT_REQUEST_COMPLETE:
      return $$state.merge({
        loadingProduct: false
      });

    case actionTypes.OCCSN_SAVE_ORDER_REQUEST:
      return $$state.merge({
        savingOrder: $$state.get('savingOrder') + 1
      });

    case actionTypes.OCCSN_SAVE_ORDER_REQUEST_COMPLETE:
      return $$state.merge({
        savingOrder: $$state.get('savingOrder') - 1
      });

    case actionTypes.OCCSN_SET_ORDER:
      return $$state.merge({
        order: action.order
      });

    case actionTypes.OCCSN_SET_PRODUCT:
      return $$state.merge({
        product: action.product
      });

    case actionTypes.OCCSN_SET_PRODUCT_NOT_FOUND_ERROR:
      return $$state.merge({
        productNotFoundError: action.error
      });

    case actionTypes.OCCSN_SET_SKIP_ATTENDEE:
      return $$state.merge({
        skipAttendees: setSkipAttendee$1($$state.get('skipAttendees'), action.attendee, action.skip)
      });

    default:
      return $$state;
  }
}

var $$initialState$1 = Immutable.fromJS({
  activeTimeSlotsCollection: ActiveResource.CollectionResponse.build(),
  timeSlotsFromCalendar: ActiveResource.Collection.build()
});
function calendarReducer() {
  var $$state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : $$initialState$1;
  var action = arguments.length > 1 ? arguments[1] : undefined;
  var type = action.type;

  switch (type) {
    case actionTypes$1.OCCSN_SET_ACTIVE_TIME_SLOTS_COLLECTION:
      return $$state.merge({
        activeTimeSlotsCollection: action.timeSlots
      });

    case actionTypes$1.OCCSN_SET_TIME_SLOTS_FROM_CALENDAR:
      return $$state.merge({
        timeSlotsFromCalendar: action.timeSlots
      });

    default:
      return $$state;
  }
}

// Manifest of all reducers for the app
var reducers = {
  $$appStore: appReducer,
  $$calendarStore: calendarReducer
};
var initialStates = {
  $$appState: $$initialState,
  $$calendarState: $$initialState$1
};

function configureStore(_$$1) {
  var $$appState = initialStates.$$appState,
      $$calendarState = initialStates.$$calendarState; // Redux expects to initialize the store using an Object, not an Immutable.Map

  var initialState = {
    $$appStore: $$appState,
    $$calendarStore: $$calendarState // https://github.com/reactjs/react-router-redux

  };
  var reducer = redux.combineReducers(_objectSpread({}, reducers)); // Sync dispatched route actions to the history

  var finalCreateStore = reduxDevtoolsExtension.composeWithDevTools(redux.applyMiddleware(thunkMiddleware))(redux.createStore);
  var store = finalCreateStore(reducer, initialState);
  return store;
}

var store = configureStore();

var OccsnCheckout =
/*#__PURE__*/
function (_React$Component) {
  _inherits(OccsnCheckout, _React$Component);

  function OccsnCheckout() {
    _classCallCheck(this, OccsnCheckout);

    return _possibleConstructorReturn(this, _getPrototypeOf(OccsnCheckout).apply(this, arguments));
  }

  _createClass(OccsnCheckout, [{
    key: "render",
    value: function render() {
      return React__default.createElement(reactRedux.Provider, {
        store: store
      }, React__default.createElement(AppContainer$1, _objectSpread({}, this.props)));
    }
  }]);

  return OccsnCheckout;
}(React__default.Component);

module.exports = OccsnCheckout;
