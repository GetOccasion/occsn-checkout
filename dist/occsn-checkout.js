/*!
 * occsn-checkout v0.0.5
 * (c) 2018-present Peak Labs LLC DBA Occasion App
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
var classNames = _interopDefault(require('classnames'));
var _ = _interopDefault(require('underscore'));
var mitragyna = require('mitragyna');
var moment = _interopDefault(require('moment'));
var FullCalendar = _interopDefault(require('fullcalendar-reactwrapper'));
require('fullcalendar-reactwrapper/dist/css/fullcalendar.min.css');
var reactRedux = require('react-redux');
var s = _interopDefault(require('underscore.string'));
var Currency = _interopDefault(require('react-currency-formatter'));
var Decimal = _interopDefault(require('decimal.js'));
var Q = _interopDefault(require('q'));
var SpreedlyAPI = _interopDefault(require('spreedly'));
var SquareAPI = _interopDefault(require('square'));
var Immutable = _interopDefault(require('immutable'));
var redux = require('redux');
var reduxDevtoolsExtension = require('redux-devtools-extension');
var thunkMiddleware = _interopDefault(require('redux-thunk'));
require('bootstrap/dist/css/bootstrap.css');

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function step(key, arg) {
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

      function _next(value) {
        step("next", value);
      }

      function _throw(err) {
        step("throw", err);
      }

      _next();
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

var actionTypes = mirrorCreator(['OCCSN_BOOK_ORDER_REQUEST', 'OCCSN_BOOK_ORDER_REQUEST_COMPLETE', 'OCCSN_CONSTRUCT_ORDER_REQUEST', 'OCCSN_FIND_REDEEMABLE_REQUEST', 'OCCSN_FIND_REDEEMABLE_REQUEST_COMPLETE', 'OCCSN_LOAD_PRODUCT_REQUEST', 'OCCSN_SAVE_ORDER_REQUEST', 'OCCSN_SAVE_ORDER_REQUEST_COMPLETE', 'OCCSN_SET_ORDER', 'OCCSN_SET_PRODUCT']);

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
    });
  };
}
function loadProductRequest() {
  return {
    type: actionTypes.OCCSN_LOAD_PRODUCT_REQUEST
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

var Header =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(Header, _PureComponent);

  function Header() {
    _classCallCheck(this, Header);

    return _possibleConstructorReturn(this, (Header.__proto__ || Object.getPrototypeOf(Header)).apply(this, arguments));
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
function (_PureComponent) {
  _inherits(TimeSlotsSelector, _PureComponent);

  function TimeSlotsSelector() {
    var _this;

    _classCallCheck(this, TimeSlotsSelector);

    _this = _possibleConstructorReturn(this, (TimeSlotsSelector.__proto__ || Object.getPrototypeOf(TimeSlotsSelector)).call(this));

    _.bindAll(_assertThisInitialized(_this), ['selectTimeSlot']);

    return _this;
  }

  _createClass(TimeSlotsSelector, [{
    key: "selectTimeSlot",
    value: function selectTimeSlot(timeSlot) {
      var _this$props = this.props,
          onSelect = _this$props.onSelect,
          subject = _this$props.subject;
      var newSubject = subject.assignAttributes({
        timeSlots: [timeSlot]
      });
      onSelect(newSubject);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props2 = this.props,
          disabled = _this$props2.disabled,
          timeSlots = _this$props2.timeSlots,
          subject = _this$props2.subject;
      var customControlInputClassNames = classNames('custom-control-input', {
        'is-invalid': !subject.errors().forField('timeSlots').empty()
      });
      return React__default.createElement("section", {
        className: "time-slots-selector"
      }, React__default.createElement("section", {
        className: "time-slots-selector-buttons"
      }, timeSlots.map(function (timeSlot) {
        return React__default.createElement(reactstrap.Button, {
          className: subject.timeSlots().target().include(timeSlot) ? 'active' : '',
          color: "primary",
          disabled: disabled,
          key: timeSlot.id,
          onClick: function onClick() {
            return _this2.selectTimeSlot(timeSlot);
          },
          outline: true
        }, timeSlot.startsAt.format('lll'));
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
}(React.PureComponent);

_defineProperty(TimeSlotsSelector, "propTypes", {
  disabled: PropTypes.bool,
  onSelect: PropTypes.func.isRequired,
  subject: PropTypes.instanceOf(occsn.Order).isRequired,
  timeSlots: PropTypes.shape({
    __collection: PropTypes.arrayOf(PropTypes.instanceOf(occsn.TimeSlot))
  }).isRequired
});

var Calendar =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(Calendar, _PureComponent);

  function Calendar() {
    var _this;

    _classCallCheck(this, Calendar);

    _this = _possibleConstructorReturn(this, (Calendar.__proto__ || Object.getPrototypeOf(Calendar)).call(this));

    _.bindAll(_assertThisInitialized(_this), 'dateClicked');

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
        defaultDate: calendarTimeSlots.first().day,
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

  function Paginator() {
    var _this;

    _classCallCheck(this, Paginator);

    _this = _possibleConstructorReturn(this, (Paginator.__proto__ || Object.getPrototypeOf(Paginator)).call(this));

    _.bindAll(_assertThisInitialized(_this), 'nextClicked', 'prevClicked');

    return _this;
  }

  _createClass(Paginator, [{
    key: "nextClicked",
    value: function nextClicked() {
      var _this$props = this.props,
          onChange = _this$props.onChange,
          timeSlotsCollection = _this$props.timeSlotsCollection;
      timeSlotsCollection.nextPage().then(function (nextTimeSlotsCollection) {
        onChange(nextTimeSlotsCollection);
      });
    }
  }, {
    key: "prevClicked",
    value: function prevClicked() {
      var _this$props2 = this.props,
          onChange = _this$props2.onChange,
          timeSlotsCollection = _this$props2.timeSlotsCollection;
      timeSlotsCollection.prevPage().then(function (prevTimeSlotsCollection) {
        onChange(prevTimeSlotsCollection);
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props3 = this.props,
          className = _this$props3.className,
          timeSlotsCollection = _this$props3.timeSlotsCollection;
      return React__default.createElement("section", {
        className: "time-slots-paginator"
      }, React__default.createElement(reactstrap.Pagination, {
        className: className
      }, React__default.createElement(reactstrap.PaginationItem, {
        disabled: !timeSlotsCollection.hasPrevPage()
      }, React__default.createElement(reactstrap.PaginationLink, {
        previous: true,
        onClick: this.prevClicked
      })), React__default.createElement(reactstrap.PaginationItem, {
        disabled: !timeSlotsCollection.hasNextPage()
      }, React__default.createElement(reactstrap.PaginationLink, {
        next: true,
        onClick: this.nextClicked
      }))));
    }
  }]);

  return Paginator;
}(React.PureComponent);

_defineProperty(Paginator, "propTypes", {
  className: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
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
function (_PureComponent) {
  _inherits(TimeSlotsContainer, _PureComponent);

  function TimeSlotsContainer() {
    _classCallCheck(this, TimeSlotsContainer);

    return _possibleConstructorReturn(this, (TimeSlotsContainer.__proto__ || Object.getPrototypeOf(TimeSlotsContainer)).apply(this, arguments));
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
      }, data.activeTimeSlotsCollection.empty() ? this.renderLoadingScreen() : this.renderTimeSlotsScreen());
    }
  }, {
    key: "renderLoadingScreen",
    value: function renderLoadingScreen() {
      return React__default.createElement("section", {
        className: "time-slots-loading"
      }, React__default.createElement("p", null, "Loading..."));
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
          }, React__default.createElement("h3", null, data.activeTimeSlotsCollection.first().day.format('MMMM YYYY'))), React__default.createElement(reactstrap.Col, {
            xs: "3"
          }, React__default.createElement(Paginator, {
            className: "float-right",
            onChange: actions.setActiveTimeSlotsCollection,
            timeSlotsCollection: data.activeTimeSlotsCollection
          }))), React__default.createElement(Calendar, {
            onDateSelect: actions.setTimeSlotsFromCalendar,
            calendarTimeSlots: data.activeTimeSlotsCollection
          }), React__default.createElement(TimeSlotsSelector, {
            onSelect: actions.saveOrder,
            subject: order,
            timeSlots: data.timeSlotsFromCalendar
          }));

        case 'list':
          return React__default.createElement("section", {
            className: "list-view"
          }, data.product.sellsSessions ? React__default.createElement("p", null, "Sessions are purchased together") : null, React__default.createElement(TimeSlotsSelector, {
            disabled: data.product.sellsSessions,
            onSelect: actions.saveOrder,
            subject: order,
            timeSlots: data.activeTimeSlotsCollection
          }), !data.product.sellsSessions ? React__default.createElement(reactstrap.Row, null, React__default.createElement(reactstrap.Col, {
            xs: {
              offset: "9"
            }
          }), React__default.createElement(reactstrap.Col, {
            xs: "3"
          }, React__default.createElement(Paginator, {
            className: "float-right",
            onChange: actions.setActiveTimeSlotsCollection,
            timeSlotsCollection: data.activeTimeSlotsCollection
          }))) : null);
      }
    }
  }]);

  return TimeSlotsContainer;
}(React.PureComponent); // See https://github.com/reactjs/react-redux/blob/master/docs/api.md#examples

_defineProperty(TimeSlotsContainer, "propTypes", {
  actions: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  order: PropTypes.instanceOf(occsn.Order),
  onSelect: PropTypes.func
});

var TimeSlotsContainer$1 = reactRedux.connect(stateToProps, dispatchToProps)(TimeSlotsContainer);

var Attendee =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(Attendee, _PureComponent);

  function Attendee() {
    _classCallCheck(this, Attendee);

    return _possibleConstructorReturn(this, (Attendee.__proto__ || Object.getPrototypeOf(Attendee)).apply(this, arguments));
  }

  _createClass(Attendee, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          indexOf = _this$props.indexOf,
          questions = _this$props.questions;
      return React__default.createElement(reactstrap.Card, {
        className: "attendee-container"
      }, React__default.createElement(reactstrap.CardBody, {
        className: "attendee"
      }, React__default.createElement(reactstrap.CardTitle, {
        className: "attendee-title"
      }, "Attendee ", indexOf + 1), questions.map(function (q) {
        return React__default.createElement(reactstrap.FormGroup, {
          className: "attendee-input-container"
        }, React__default.createElement(mitragyna.Field, {
          type: "text",
          name: q,
          placeholder: s.humanize(q),
          component: reactstrap.Input,
          invalidClassName: "is-invalid"
        }));
      }).toArray()));
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

    return _possibleConstructorReturn(this, (Attendees.__proto__ || Object.getPrototypeOf(Attendees)).apply(this, arguments));
  }

  _createClass(Attendees, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          questions = _this$props.questions,
          subject = _this$props.subject;
      return React__default.createElement("section", {
        className: "attendees"
      }, React__default.createElement(mitragyna.Collection, {
        component: Attendee,
        componentProps: {
          questions: questions
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
  subject: PropTypes.instanceOf(occsn.Order)
});

var Customer =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(Customer, _PureComponent);

  function Customer() {
    _classCallCheck(this, Customer);

    return _possibleConstructorReturn(this, (Customer.__proto__ || Object.getPrototypeOf(Customer)).apply(this, arguments));
  }

  _createClass(Customer, [{
    key: "render",
    value: function render() {
      return React__default.createElement("section", {
        className: "customer"
      }, React__default.createElement(reactstrap.FormGroup, {
        className: "customer-email-form-group"
      }, React__default.createElement(mitragyna.Field, {
        className: "customer-email-field",
        type: "email",
        name: "email",
        placeholder: "Email",
        component: reactstrap.Input,
        invalidClassName: "is-invalid"
      }), React__default.createElement(mitragyna.ErrorsFor, {
        className: "customer-email-errors",
        component: reactstrap.FormFeedback,
        field: "email"
      })), React__default.createElement(reactstrap.FormGroup, {
        className: "customer-first-name-form-group"
      }, React__default.createElement(mitragyna.Field, {
        className: "customer-first-name-field",
        type: "text",
        name: "firstName",
        placeholder: "First Name",
        component: reactstrap.Input,
        invalidClassName: "is-invalid"
      }), React__default.createElement(mitragyna.ErrorsFor, {
        className: "customer-first-name-errors",
        component: reactstrap.FormFeedback,
        field: "firstName"
      })), React__default.createElement(reactstrap.FormGroup, {
        className: "customer-last-name-form-group"
      }, React__default.createElement(mitragyna.Field, {
        className: "customer-last-name-field",
        type: "text",
        name: "lastName",
        placeholder: "Last Name",
        component: reactstrap.Input,
        invalidClassName: "is-invalid"
      }), React__default.createElement(mitragyna.ErrorsFor, {
        className: "customer-last-name-errors",
        component: reactstrap.FormFeedback,
        field: "lastName"
      })), React__default.createElement(reactstrap.FormGroup, {
        className: "customer-zip-form-group"
      }, React__default.createElement(mitragyna.Field, {
        className: "customer-zip-field",
        type: "text",
        name: "zip",
        placeholder: "Zip Code",
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

    _this = _possibleConstructorReturn(this, (MissingAnswers.__proto__ || Object.getPrototypeOf(MissingAnswers)).call(this));

    _.bindAll(_assertThisInitialized(_this), 'empty', 'missingRequiredAnswers');

    return _this;
  }

  _createClass(MissingAnswers, [{
    key: "missingRequiredAnswers",
    value: function missingRequiredAnswers() {
      var order = this.props.order;
      return order.answers().target().select(function (a) {
        return a.question().required && (a.question().optionable && !a.option() || !a.question().optionable && !a.value);
      });
    }
  }, {
    key: "empty",
    value: function empty() {
      return this.missingRequiredAnswers().empty();
    }
  }, {
    key: "render",
    value: function render() {
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
          }, a.question().title);
        }).toArray()));
      }
    }
  }]);

  return MissingAnswers;
}(React.PureComponent);

_defineProperty(MissingAnswers, "propTypes", {
  order: PropTypes.instanceOf(occsn.Order)
});

var Pricing =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(Pricing, _PureComponent);

  function Pricing() {
    _classCallCheck(this, Pricing);

    return _possibleConstructorReturn(this, (Pricing.__proto__ || Object.getPrototypeOf(Pricing)).apply(this, arguments));
  }

  _createClass(Pricing, [{
    key: "render",
    value: function render() {
      var order = this.props.order;
      var rows = [];
      var currency = order.product().merchant().currency().name;
      var displaySubtotal = false;

      if (!_.isNull(order.coupon())) {
        displaySubtotal = true;
        rows.push(React__default.createElement("p", {
          className: "coupon-discount"
        }, React__default.createElement("span", null, "Coupon Discount: "), React__default.createElement(Currency, {
          currency: currency,
          quantity: Decimal(order.couponAmount).neg().toNumber()
        })));
      }

      if (Decimal(order.taxPercentage).toNumber() > 0.0) {
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
      }, "Total: ", React__default.createElement(Currency, {
        currency: currency,
        quantity: order.price
      })));

      if (!_.isNull(order.giftCardAmount)) {
        rows.push(React__default.createElement("p", {
          className: "gift-card-amount"
        }, React__default.createElement("span", null, "Gift Cards: "), React__default.createElement(Currency, {
          currency: currency,
          quantity: Decimal(order.giftCardAmount).neg().toNumber()
        })), React__default.createElement("p", {
          className: "outstanding-balance"
        }, React__default.createElement("span", null, "Balance due today: "), React__default.createElement(Currency, {
          currency: currency,
          quantity: Decimal(order.outstandingBalance).toNumber()
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

    _this = _possibleConstructorReturn(this, (PaymentServiceProvider.__proto__ || Object.getPrototypeOf(PaymentServiceProvider)).call(this));

    _this.reset();

    _.bindAll(_assertThisInitialized(_this), 'buildPaymentMethod', 'initializeForm', 'tokenizePaymentMethodData', 'reset');

    return _this;
  }

  _createClass(PaymentServiceProvider, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.initializeForm();
    }
  }, {
    key: "buildPaymentMethod",
    value: function buildPaymentMethod() {
      this.reset();
      this.tokenizePaymentMethodData();
      return this.paymentMethodDeferred.promise;
    } // Initializes the iFrame form that the 3rd party PSP provides for their PCI-compliant service

  }, {
    key: "initializeForm",
    value: function initializeForm() {
      throw 'initializeForm must be defined by subclasses';
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

    return _possibleConstructorReturn(this, (Cash.__proto__ || Object.getPrototypeOf(Cash)).apply(this, arguments));
  }

  _createClass(Cash, [{
    key: "initializeForm",
    value: function initializeForm() {}
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

var Spreedly =
/*#__PURE__*/
function (_PaymentServiceProvid) {
  _inherits(Spreedly, _PaymentServiceProvid);

  function Spreedly() {
    var _this;

    _classCallCheck(this, Spreedly);

    _this = _possibleConstructorReturn(this, (Spreedly.__proto__ || Object.getPrototypeOf(Spreedly)).call(this));

    _.bindAll(_assertThisInitialized(_this), 'handleChange');

    _this.state = {
      month: null,
      full_name: null,
      year: null
    };
    return _this;
  } // Initializes the iFrame using the global SpreedlyAPI object imported as a separate script
  // @note Called on componentDidMount
  // @see PaymentServiceProvider#componentDidMount


  _createClass(Spreedly, [{
    key: "initializeForm",
    value: function initializeForm() {
      var _this2 = this;

      SpreedlyAPI.init(global.OCCSN.spreedly_key, {
        "numberEl": "spreedly-number",
        "cvvEl": "spreedly-cvv"
      });
      var defaultInputStyle = 'display: block;' + '  width: 80%;' + '  padding: 0.375rem 0.75rem;' + '  font-size: 1rem;' + '  line-height: 1.5;' + '  color: #495057;' + '  background-color: #fff;' + '  background-clip: padding-box;' + '  border: 1px solid #ced4da;' + '  border-radius: 0.25rem;' + '  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out';
      var focusInputStyle = 'color: #495057;' + '  background-color: #fff;' + '  border-color: #80bdff;' + '  outline: 0;' + '  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25)';
      SpreedlyAPI.on("ready", function () {
        SpreedlyAPI.setFieldType("number", "text");
        SpreedlyAPI.setNumberFormat("prettyFormat");
        SpreedlyAPI.setPlaceholder("number", "•••• •••• •••• ••••");
        SpreedlyAPI.setPlaceholder("cvv", "•••");
        SpreedlyAPI.setStyle("number", defaultInputStyle);
        SpreedlyAPI.setStyle("cvv", defaultInputStyle);
      });
      SpreedlyAPI.on('fieldEvent', function (name, type, activeEl, inputProperties) {
        if (type == 'focus') {
          SpreedlyAPI.setStyle(name, focusInputStyle);
        }

        if (type == 'blur') {
          SpreedlyAPI.setStyle(name, defaultInputStyle);
        }
      });
      SpreedlyAPI.on('errors', function (errors) {
        console.log(errors);

        _this2.paymentMethodDeferred.reject(_.map(errors, function (error) {
          return ['creditCard.' + s.camelize(error.attribute, true), error.key.replace('errors.', ''), error.message];
        }));
      });
      SpreedlyAPI.on('paymentMethod', function (token) {
        _this2.paymentMethodDeferred.resolve(occsn.CreditCard.build({
          id: token
        }));
      });
    } // Triggers paymentMethod event

  }, {
    key: "tokenizePaymentMethodData",
    value: function tokenizePaymentMethodData() {
      SpreedlyAPI.tokenizeCreditCard(this.state);
    }
  }, {
    key: "handleChange",
    value: function handleChange(name, e) {
      this.setState(_defineProperty({}, name, e.target.value));
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var order = this.props.order;
      return React__default.createElement("section", {
        className: "spreedly-container"
      }, React__default.createElement(reactstrap.FormGroup, {
        className: "spreedly-full-name"
      }, React__default.createElement("label", null, "Name On Card"), React__default.createElement(reactstrap.Input, {
        type: "text",
        id: "full_name",
        name: "full_name",
        placeholder: "Name On Card",
        onChange: function onChange(e) {
          return _this3.handleChange('full_name', e);
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
        "class": "custom-file"
      }, React__default.createElement("div", {
        className: "custom-file-input is-invalid",
        style: {
          opacity: 1
        }
      }, React__default.createElement("div", {
        id: "spreedly-number",
        style: {
          height: '48px'
        }
      })), React__default.createElement(mitragyna.ErrorsFor, {
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
          return _this3.handleChange('month', e);
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
          return _this3.handleChange('year', e);
        },
        className: order.errors().forField('creditCard.year').empty() ? '' : 'is-invalid'
      }), React__default.createElement(mitragyna.ErrorsFor, {
        className: "spreedly-expiration-year-errors",
        component: reactstrap.FormFeedback,
        field: "creditCard.year"
      })))), React__default.createElement(reactstrap.Col, {
        className: "spreedly-cvv",
        xs: "3"
      }, React__default.createElement(reactstrap.Label, null, "CVV"), React__default.createElement("div", {
        id: "spreedly-cvv",
        style: {
          height: '48px'
        }
      })))));
    }
  }]);

  return Spreedly;
}(PaymentServiceProvider);

var Square =
/*#__PURE__*/
function (_PaymentServiceProvid) {
  _inherits(Square, _PaymentServiceProvid);

  function Square() {
    _classCallCheck(this, Square);

    return _possibleConstructorReturn(this, (Square.__proto__ || Object.getPrototypeOf(Square)).apply(this, arguments));
  }

  _createClass(Square, [{
    key: "initializeForm",
    // Initializes the iFrame using the global SqPaymentForm library imported as SquareAPI
    value: function initializeForm() {
      var _this = this;

      this.sqPaymentForm = new SquareAPI({
        // Initialize the payment form elements
        applicationId: global.OCCSN.square_key,
        inputClass: 'form-control-square',
        inputStyles: [{
          padding: '0.375em 0.75em',
          fontSize: '1em',
          lineHeight: 1.5,
          color: '#495057',
          backgroundColor: '#fff'
        }],
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
      this.sqPaymentForm.build();
    } // Triggers cardNonceResponseReceived event

  }, {
    key: "tokenizePaymentMethodData",
    value: function tokenizePaymentMethodData() {
      this.sqPaymentForm.requestCardNonce();
    }
  }, {
    key: "render",
    value: function render() {
      return React__default.createElement("section", {
        className: "square-container"
      }, React__default.createElement("div", {
        id: "sq-ccbox"
      }, React__default.createElement(reactstrap.FormGroup, {
        className: "square-card-number"
      }, React__default.createElement(reactstrap.Label, null, "Card Number"), React__default.createElement("div", {
        "class": "custom-file"
      }, React__default.createElement("div", {
        className: "custom-file-input is-invalid",
        style: {
          opacity: 1
        }
      }, React__default.createElement("div", {
        id: "sq-card-number"
      })), React__default.createElement(mitragyna.ErrorsFor, {
        className: "square-card-number-errors",
        component: reactstrap.FormFeedback,
        field: "creditCard.cardNumber"
      }))), React__default.createElement(reactstrap.FormGroup, {
        className: "square-expiration-cvv"
      }, React__default.createElement(reactstrap.Row, null, React__default.createElement(reactstrap.Col, {
        className: "square-expiration",
        xs: "6"
      }, React__default.createElement(reactstrap.Label, null, "Expiration Date"), React__default.createElement("div", {
        "class": "custom-file"
      }, React__default.createElement("div", {
        className: "custom-file-input is-invalid",
        style: {
          opacity: 1
        }
      }, React__default.createElement("div", {
        id: "sq-expiration-date"
      })), React__default.createElement(mitragyna.ErrorsFor, {
        className: "square-expiration-errors",
        component: reactstrap.FormFeedback,
        field: "creditCard.expirationDate"
      }))), React__default.createElement(reactstrap.Col, {
        className: "square-cvv",
        xs: "3"
      }, React__default.createElement(reactstrap.Label, null, "CVV"), React__default.createElement("div", {
        id: "sq-cvv"
      })))), React__default.createElement(reactstrap.FormGroup, {
        className: "square-postal-code"
      }, React__default.createElement(reactstrap.Label, null, "Postal Code"), React__default.createElement("div", {
        "class": "custom-file"
      }, React__default.createElement("div", {
        className: "custom-file-input is-invalid",
        style: {
          opacity: 1
        }
      }, React__default.createElement("div", {
        id: "sq-postal-code"
      })), React__default.createElement(mitragyna.ErrorsFor, {
        className: "square-postal-code-errors",
        component: reactstrap.FormFeedback,
        field: "creditCard.postalCode"
      })))));
    }
  }]);

  return Square;
}(PaymentServiceProvider);

var PaymentForm =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(PaymentForm, _PureComponent);

  function PaymentForm() {
    var _this;

    _classCallCheck(this, PaymentForm);

    _this = _possibleConstructorReturn(this, (PaymentForm.__proto__ || Object.getPrototypeOf(PaymentForm)).call(this));

    _.bindAll(_assertThisInitialized(_this), 'chargeOutstandingBalanceToPaymentMethod', 'paymentServiceProvider');

    return _this;
  }

  _createClass(PaymentForm, [{
    key: "chargeOutstandingBalanceToPaymentMethod",
    value: function chargeOutstandingBalanceToPaymentMethod(subject) {
      return this.pspForm.buildPaymentMethod().then(function (paymentMethod) {
        var newSubject = subject.clone();
        newSubject.charge(paymentMethod, newSubject.outstandingBalance);
        return newSubject;
      }).catch(function (errors) {
        var _subject$errors;

        subject.errors().clear();
        throw (_subject$errors = subject.errors()).addAll.apply(_subject$errors, _toConsumableArray(errors));
      });
    }
  }, {
    key: "paymentServiceProvider",
    value: function paymentServiceProvider() {
      var order = this.props.order;
      return order.product().merchant().pspName;
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var order = this.props.order;
      var pspFormProps = {
        order: order,
        ref: function ref(form) {
          _this2.pspForm = form;
        }
      };
      return React__default.createElement("section", {
        className: "payment"
      }, {
        cash: React__default.createElement(Cash, null),
        spreedly: React__default.createElement(Spreedly, pspFormProps),
        square: React__default.createElement(Square, pspFormProps)
      }[this.paymentServiceProvider()]);
    }
  }]);

  return PaymentForm;
}(React.PureComponent);

_defineProperty(PaymentForm, "propTypes", {
  order: PropTypes.instanceOf(occsn.Order)
});

var Checkbox =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(Checkbox, _PureComponent);

  function Checkbox() {
    _classCallCheck(this, Checkbox);

    return _possibleConstructorReturn(this, (Checkbox.__proto__ || Object.getPrototypeOf(Checkbox)).apply(this, arguments));
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

      return React__default.createElement(reactstrap.FormGroup, {
        className: "checkbox-container"
      }, React__default.createElement(reactstrap.FormGroup, {
        check: true
      }, React__default.createElement(reactstrap.Label, {
        check: true
      }, React__default.createElement(mitragyna.Field, {
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

    return _possibleConstructorReturn(this, (DropDown.__proto__ || Object.getPrototypeOf(DropDown)).apply(this, arguments));
  }

  _createClass(DropDown, [{
    key: "renderOptionTitle",
    value: function renderOptionTitle(option) {
      if (option.price) {
        return React__default.createElement("span", null, option.title, "\xA0 (", React__default.createElement(Currency, {
          quantity: Decimal(option.price),
          currency: option.question().product().merchant().currency().name
        }), ")");
      } else {
        return React__default.createElement("span", null, option.title);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var answer = this.props.answer;
      return React__default.createElement(reactstrap.FormGroup, {
        className: "dropdown-container"
      }, React__default.createElement(reactstrap.Label, null, answer.question().title, answer.question().required ? '*' : ''), React__default.createElement(mitragyna.Field, {
        name: "option",
        type: "select",
        component: reactstrap.Input,
        includeBlank: true,
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

    return _possibleConstructorReturn(this, (OptionList.__proto__ || Object.getPrototypeOf(OptionList)).apply(this, arguments));
  }

  _createClass(OptionList, [{
    key: "render",
    value: function render() {
      var answer = this.props.answer;
      return React__default.createElement(reactstrap.FormGroup, {
        className: "option-list-container",
        tag: "fieldset"
      }, React__default.createElement("label", null, answer.question().title, answer.question().required ? '*' : ''), React__default.createElement(mitragyna.Field, {
        type: "radioGroup"
      }, answer.question().options().target().map(function (option) {
        return React__default.createElement(reactstrap.FormGroup, {
          check: true
        }, React__default.createElement(reactstrap.Label, {
          check: true
        }, React__default.createElement(mitragyna.Field, {
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
    _classCallCheck(this, SpinButton);

    return _possibleConstructorReturn(this, (SpinButton.__proto__ || Object.getPrototypeOf(SpinButton)).apply(this, arguments));
  }

  _createClass(SpinButton, [{
    key: "render",
    value: function render() {
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

      return React__default.createElement(reactstrap.FormGroup, {
        className: "spin-button-container"
      }, React__default.createElement(reactstrap.Label, null, label), React__default.createElement(mitragyna.Field, {
        name: "value",
        type: "number",
        component: reactstrap.Input,
        max: question.max,
        min: question.min
      }), React__default.createElement(reactstrap.FormText, {
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

    return _possibleConstructorReturn(this, (TextArea.__proto__ || Object.getPrototypeOf(TextArea)).apply(this, arguments));
  }

  _createClass(TextArea, [{
    key: "render",
    value: function render() {
      var answer = this.props.answer;
      return React__default.createElement(reactstrap.FormGroup, {
        className: "text-area-container"
      }, React__default.createElement(reactstrap.Label, null, answer.question().title, answer.question().required ? '*' : ''), React__default.createElement(mitragyna.Field, {
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

    return _possibleConstructorReturn(this, (TextInput.__proto__ || Object.getPrototypeOf(TextInput)).apply(this, arguments));
  }

  _createClass(TextInput, [{
    key: "render",
    value: function render() {
      var answer = this.props.answer;
      return React__default.createElement(reactstrap.FormGroup, {
        className: "text-input-container"
      }, React__default.createElement(reactstrap.Label, null, answer.question().title, answer.question().required ? '*' : ''), React__default.createElement(mitragyna.Field, {
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

    return _possibleConstructorReturn(this, (Waiver.__proto__ || Object.getPrototypeOf(Waiver)).apply(this, arguments));
  }

  _createClass(Waiver, [{
    key: "render",
    value: function render() {
      var answer = this.props.answer;
      return React__default.createElement(reactstrap.FormGroup, {
        className: "waiver-container"
      }, React__default.createElement(reactstrap.Card, {
        color: "light"
      }, React__default.createElement(reactstrap.CardBody, null, React__default.createElement(reactstrap.CardText, null, ReactHtmlParser(answer.question().waiverText)))), React__default.createElement(reactstrap.FormGroup, {
        check: true
      }, React__default.createElement(reactstrap.Label, {
        check: true,
        className: "mt-2"
      }, React__default.createElement(mitragyna.Field, {
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

    return _possibleConstructorReturn(this, (Answer.__proto__ || Object.getPrototypeOf(Answer)).apply(this, arguments));
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

    return _possibleConstructorReturn(this, (Questions.__proto__ || Object.getPrototypeOf(Questions)).apply(this, arguments));
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

    return _possibleConstructorReturn(this, (Coupon.__proto__ || Object.getPrototypeOf(Coupon)).apply(this, arguments));
  }

  _createClass(Coupon, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          currency = _this$props.currency,
          subject = _this$props.subject;
      var discount;

      if (!_.isNull(subject.discountFixed)) {
        discount = React__default.createElement(Currency, {
          currency: currency,
          quantity: Decimal(subject.discountFixed).toNumber()
        });
      } else {
        discount = React__default.createElement("span", null, subject.discountPercentage, "%");
      }

      return React__default.createElement(reactstrap.Card, {
        className: "coupon-container"
      }, React__default.createElement(reactstrap.CardBody, {
        className: "coupon"
      }, React__default.createElement(reactstrap.Button, {
        className: "close"
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

var GiftCard =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(GiftCard, _PureComponent);

  function GiftCard() {
    _classCallCheck(this, GiftCard);

    return _possibleConstructorReturn(this, (GiftCard.__proto__ || Object.getPrototypeOf(GiftCard)).apply(this, arguments));
  }

  _createClass(GiftCard, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          currency = _this$props.currency,
          subject = _this$props.subject;
      var giftCard = subject.paymentMethod();
      var giftCardValue = Decimal(giftCard.value);
      var transactionValue = Decimal(subject.amount);
      var remainingBalance = giftCardValue.minus(transactionValue);
      return React__default.createElement(reactstrap.Card, {
        className: "gift-card-container"
      }, React__default.createElement(reactstrap.CardBody, {
        className: "gift-card"
      }, React__default.createElement(reactstrap.Button, {
        className: "close"
      }, React__default.createElement("span", {
        "aria-hidden": "true"
      }, "\xD7")), React__default.createElement(reactstrap.CardText, {
        className: "gift-card-messages"
      }, React__default.createElement(reactstrap.CardTitle, {
        className: "gift-card-title"
      }, "Gift Card - ", subject.paymentMethod().code), React__default.createElement(reactstrap.FormText, {
        className: "gift-card-remaining-balance"
      }, "Remaining balance will be ", React__default.createElement(Currency, {
        currency: currency,
        quantity: remainingBalance.toNumber()
      }), " after checkout.")), React__default.createElement(reactstrap.CardText, {
        className: "gift-card-value"
      }, React__default.createElement(Currency, {
        currency: currency,
        quantity: giftCardValue.toNumber()
      }))));
    }
  }]);

  return GiftCard;
}(React.PureComponent);

_defineProperty(GiftCard, "propTypes", {
  currency: PropTypes.string.isRequired,
  subject: PropTypes.instanceOf(occsn.Transaction)
});

var Redeemables =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(Redeemables, _PureComponent);

  function Redeemables() {
    var _this;

    _classCallCheck(this, Redeemables);

    _this = _possibleConstructorReturn(this, (Redeemables.__proto__ || Object.getPrototypeOf(Redeemables)).call(this));

    _.bindAll(_assertThisInitialized(_this), 'addErrors', 'addRedeemable', 'checkForRedeemable', 'handleChange', 'showInput');

    return _this;
  }

  _createClass(Redeemables, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      this.setState({
        code: ''
      });
    }
  }, {
    key: "addErrors",
    value: function addErrors(errors) {
      var _this$props = this.props,
          onErrors = _this$props.onErrors,
          order = _this$props.order;
      order = order.clone();
      order.errors().clear();
      errors.each(function (e) {
        e.field = 'redeemables.' + e.parameter.replace('filter/', '');
        order.errors().push(e);
      });
      onErrors(order);
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
        order = order.clone();
        var outstandingBalance = Decimal(order.outstandingBalance);
        var giftCardValue = Decimal(redeemable.value);
        var transactionAmount;

        if (outstandingBalance.greaterThan(giftCardValue)) {
          transactionAmount = giftCardValue;
        } else {
          transactionAmount = outstandingBalance;
        }

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
      return !Decimal(order.outstandingBalance).isZero() || _.isNull(order.coupon());
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
        return t.paymentMethod().isA(occsn.GiftCard);
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
        value: code
      }), React__default.createElement(reactstrap.InputGroupAddon, {
        addonType: "append"
      }, React__default.createElement(reactstrap.Button, {
        className: "redeemable-code-input-button",
        onClick: function onClick() {
          return _this2.checkForRedeemable(code);
        }
      }, "Search"))), React__default.createElement(mitragyna.ErrorsFor, {
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

var Order =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(Order, _PureComponent);

  function Order() {
    var _this;

    _classCallCheck(this, Order);

    _this = _possibleConstructorReturn(this, (Order.__proto__ || Object.getPrototypeOf(Order)).call(this));

    _.bindAll(_assertThisInitialized(_this), 'acceptsPayment', 'allowedToBookOrder', 'headerForSection', 'showPaymentForm', 'showPrice');

    return _this;
  }

  _createClass(Order, [{
    key: "acceptsPayment",
    value: function acceptsPayment() {
      var subject = this.props.subject;
      return subject.product().merchant().pspName != 'cash';
    }
  }, {
    key: "allowedToBookOrder",
    value: function allowedToBookOrder() {
      var bookingOrder = this.props.bookingOrder;
      var missingAnswers = false;
      if (this.missingAnswers && !this.missingAnswers.empty()) missingAnswers = true;
      return !bookingOrder && !missingAnswers;
    } // Mitragyna callback

  }, {
    key: "beforeSubmit",
    value: function beforeSubmit(subject) {
      if (this.acceptsPayment() && !Decimal(subject.outstandingBalance).isZero()) {
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
          return React__default.createElement("h2", {
            className: "container-title",
            id: "widgetContactTitle"
          }, _.isNull(product.widgetContactTitle) ? "Contact Information" : product.widgetContactTitle);

        case 'timeSlots':
          return React__default.createElement("h2", {
            className: "container-title",
            id: "widgetTimeSlotsTitle"
          }, _.isNull(product.widgetTimeSlotsTitle) ? "Time Slots" : product.widgetTimeSlotsTitle);

        case 'questions':
          return React__default.createElement("h2", {
            className: "container-title",
            id: "widgetQuestionsTitle"
          }, _.isNull(product.widgetQuestionsTitle) ? "Additional Information" : product.widgetQuestionsTitle);

        case 'attendees':
          return React__default.createElement("h2", {
            className: "container-title",
            id: "widgetAttendeesTitle"
          }, "Attendee Information");

        case 'payment':
          return React__default.createElement("h2", {
            className: "container-title",
            id: "widgetPaymentTitle"
          }, _.isNull(product.widgetPaymentTitle) ? "Payment Information" : product.widgetPaymentTitle);

        case 'redeemables':
          return React__default.createElement("h2", {
            className: "container-title",
            id: "widgetRedeemableTitle"
          }, "Coupons and Gift Cards");

        case 'totalDue':
          return React__default.createElement("h2", {
            className: "container-title",
            id: "widgetTotalDueTitle"
          }, _.isNull(product.widgetTotalDueTitle) ? "Total Due Today" : product.widgetTotalDueTitle);
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
    // @note If the product hasTimeSlots then show TimeSlotsContainer
    //
    // @return [Boolean] whether or not to show TimeSlotsContainer

  }, {
    key: "showTimeSlots",
    value: function showTimeSlots() {
      var subject = this.props.subject;
      var product = subject.product();
      return product.hasTimeSlots;
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
      return !product.free && product.hasRedeemables && !Decimal(subject.subtotal || '0.0').isZero();
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
      return !(product.free || Decimal(subject.outstandingBalance || '0.0').isZero());
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

      var _this$props = this.props,
          afterError = _this$props.afterError,
          afterUpdate = _this$props.afterUpdate,
          findRedeemable = _this$props.findRedeemable,
          subject = _this$props.subject;
      var customer = subject.customer();
      var product = subject.product();
      return React__default.createElement("section", {
        className: "order-container"
      }, React__default.createElement("section", {
        className: "customer-container"
      }, this.headerForSection('contact'), React__default.createElement(mitragyna.Resource, {
        component: Customer,
        reflection: "customer",
        subject: customer
      })), product.firstTimeSlotStartsAt ? React__default.createElement("section", {
        className: "time-slots-container"
      }, this.headerForSection('timeSlots'), React__default.createElement(TimeSlotsContainer$1, {
        order: subject
      })) : null, this.showQuestions() ? React__default.createElement("section", {
        className: "questions-container"
      }, this.headerForSection('questions'), React__default.createElement(Questions, {
        subject: subject,
        questions: product.questions().target()
      })) : null, this.showAttendees() ? React__default.createElement("section", {
        className: "attendees-container"
      }, this.headerForSection('attendees'), React__default.createElement(Attendees, {
        questions: product.attendeeQuestions,
        subject: subject
      })) : null, this.showRedeemables() ? React__default.createElement("section", {
        className: "redeemables-container"
      }, this.headerForSection('redeemables'), React__default.createElement(Redeemables, {
        findRedeemable: findRedeemable,
        order: subject,
        onChange: afterUpdate,
        onErrors: afterError
      })) : null, this.showPaymentForm() ? React__default.createElement("section", {
        className: "payment-container"
      }, this.headerForSection('payment'), React__default.createElement(PaymentForm, {
        order: subject,
        ref: function ref(form) {
          return _this2.paymentForm = form;
        }
      })) : null, this.showPrice() ? React__default.createElement("section", {
        className: "total-due-container"
      }, this.headerForSection('totalDue'), React__default.createElement(Pricing, {
        order: subject
      })) : null, React__default.createElement("section", {
        className: "missing-answers-container"
      }, React__default.createElement(MissingAnswers, {
        order: subject,
        ref: function ref(r) {
          return _this2.missingAnswers = r;
        }
      })), React__default.createElement("section", {
        className: "book-order-container"
      }, React__default.createElement(reactstrap.Button, {
        block: true,
        className: "book-order-button",
        color: "success",
        id: "bookOrder",
        size: "lg",
        type: "submit",
        disabled: !this.allowedToBookOrder()
      }, product.orderButtonText)));
    }
  }]);

  return Order;
}(React.PureComponent);

_defineProperty(Order, "propTypes", {
  activeTimeSlotsCollection: PropTypes.shape({
    __collection: PropTypes.arrayOf(PropTypes.instanceOf(occsn.TimeSlot))
  }),
  timeSlotsFromCalendar: PropTypes.shape({
    __collection: PropTypes.arrayOf(PropTypes.instanceOf(occsn.TimeSlot))
  }),
  afterError: PropTypes.func.isRequired,
  afterUpdate: PropTypes.func.isRequired,
  bookingOrder: PropTypes.bool,
  findRedeemable: PropTypes.func.isRequired,
  subject: PropTypes.instanceOf(occsn.Order).isRequired
});

var OrderComplete =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(OrderComplete, _PureComponent);

  function OrderComplete() {
    _classCallCheck(this, OrderComplete);

    return _possibleConstructorReturn(this, (OrderComplete.__proto__ || Object.getPrototypeOf(OrderComplete)).apply(this, arguments));
  }

  _createClass(OrderComplete, [{
    key: "render",
    value: function render() {
      var order = this.props.order;
      return React__default.createElement("section", {
        className: "order-complete-container"
      }, React__default.createElement("h1", {
        className: "verification-code"
      }, "Order #", order.verificationCode), React__default.createElement("section", {
        className: "order-complete-time-slot-details"
      }, React__default.createElement("h4", null, order.timeSlots().target().first().startsAt.format('dddd MMMM Do, YYYY h:mm A'))), React__default.createElement("section", {
        className: "order-complete-messages"
      }, React__default.createElement("p", {
        className: "post-transactional"
      }, order.product().postTransactionalMessage), React__default.createElement("p", {
        className: "confirmation"
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
      order: state.$$appStore.get('order'),
      product: state.$$appStore.get('product'),
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

    _this = _possibleConstructorReturn(this, (AppContainer.__proto__ || Object.getPrototypeOf(AppContainer)).call(this, props));
    console.log(props);

    _.bindAll(_assertThisInitialized(_this), 'renderBookingScreen', 'renderCompleteScreen', 'renderLoadingScreen');

    return _this;
  }

  _createClass(AppContainer, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var actions = this.props.actions;
      actions.loadProduct();
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      var _this$props = this.props,
          actions = _this$props.actions,
          callbacks = _this$props.callbacks,
          data = _this$props.data;

      if (nextProps.data.order != null) {
        if (data.order == null) actions.saveOrder(nextProps.data.order);
        if (callbacks && callbacks.onOrderChange) callbacks.onOrderChange(nextProps.data.order);
      }

      if (data.product == null && nextProps.data.product != null) {
        if (callbacks && callbacks.onProductLoad) callbacks.onProductLoad(nextProps.data.product);
      }
    }
  }, {
    key: "getChildContext",
    value: function getChildContext() {
      return {
        callbackProps: this.props.callbacks
      };
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          actions = _this$props2.actions,
          data = _this$props2.data;
      var body;

      if (data.product) {
        if (data.order != null && data.order.status == 'booked') {
          body = this.renderCompleteScreen();
        } else {
          body = this.renderBookingScreen();
        }
      } else {
        body = this.renderLoadingScreen();
      }

      return React__default.createElement(reactstrap.Container, null, body);
    }
  }, {
    key: "renderLoadingScreen",
    value: function renderLoadingScreen() {
      return React__default.createElement("section", {
        className: "order-loading"
      }, React__default.createElement("p", null, "Loading..."));
    }
  }, {
    key: "renderBookingScreen",
    value: function renderBookingScreen() {
      var _this$props3 = this.props,
          actions = _this$props3.actions,
          data = _this$props3.data;
      return React__default.createElement("section", {
        className: "occsn-app-container"
      }, data.order ? React__default.createElement(mitragyna.Resource, {
        afterError: actions.setOrder,
        afterUpdate: actions.saveOrder,
        component: Order,
        componentProps: {
          findRedeemable: actions.findRedeemable,
          activeTimeSlotsCollection: data.activeTimeSlotsCollection,
          timeSlotsFromCalendar: data.timeSlotsFromCalendar
        },
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
  }]);

  return AppContainer;
}(React.PureComponent); // See https://github.com/reactjs/react-redux/blob/master/docs/api.md#examples

_defineProperty(_defineProperty(AppContainer, "propTypes", {
  actions: PropTypes.object.isRequired,
  callbacks: PropTypes.shape({
    onOrderChange: PropTypes.func,
    onProductLoad: PropTypes.func
  }),
  data: PropTypes.object.isRequired
}), "childContextTypes", {
  callbackProps: PropTypes.object
});

var AppContainer$1 = reactRedux.connect(stateToProps$1, dispatchToProps$1)(AppContainer);

var $$initialState = Immutable.fromJS({
  bookingOrder: false,
  order: null,
  product: null,
  savingOrder: false
});
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

    case actionTypes.OCCSN_SAVE_ORDER_REQUEST:
      return $$state.merge({
        savingOrder: true
      });

    case actionTypes.OCCSN_SAVE_ORDER_REQUEST_COMPLETE:
      return $$state.merge({
        savingOrder: false
      });

    case actionTypes.OCCSN_SET_ORDER:
      return $$state.merge({
        order: action.order
      });

    case actionTypes.OCCSN_SET_PRODUCT:
      return $$state.merge({
        product: action.product
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
    $$calendarStore: $$calendarState
  }; // https://github.com/reactjs/react-router-redux

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

    return _possibleConstructorReturn(this, (OccsnCheckout.__proto__ || Object.getPrototypeOf(OccsnCheckout)).apply(this, arguments));
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
