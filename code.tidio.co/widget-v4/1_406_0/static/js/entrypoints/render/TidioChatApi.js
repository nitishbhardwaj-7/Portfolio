/* eslint-disable no-underscore-dangle */
/**
 * Tidio Chat API
 * All public methods except for [on, trigger, method] are overridden by bindTidioChatApiMethods function after the store is created
 * Before bindTidioChatApiMethods is fired all events are put on queue (to solve problems with not running methods before 'ready' event is emitted
 */
export default class TidioChatApi {
  constructor() {
    this.eventPrefix = "tidioChat-";
    this.readyEventWasFired = false;
    this.queue = [];

    /**
     * @deprecated
     */
    this.popUpOpen = this.open;
    /**
     * @deprecated
     */
    this.popUpHide = this.close;
    /**
     * @deprecated
     */
    this.chatDisplay = this.display;
    /**
     * @deprecated
     */
    this.setColorPallete = this.setColorPalette;
  }

  on(eventName, callback) {
    if (eventName === "ready" && this.readyEventWasFired) {
      callback();
    } else {
      document.addEventListener(
        `${this.eventPrefix}${eventName}`,
        (event) => {
          callback(event.data);
        },
        false
      );
    }
  }

  trigger(eventName, data) {
    // eslint-disable-next-line no-console
    console.debug("tidioChatApi trigger", eventName, data);
    if (eventName === "ready" && this.readyEventWasFired) {
      return false;
    }
    try {
      const event = document.createEvent("Event");
      event.initEvent(`${this.eventPrefix}${eventName}`, true, true);
      event.data = data;
      document.dispatchEvent(event);
      if (eventName === "ready") {
        if (this.readyEventWasFired) {
          return false;
        }
        this._flushAllFromQueue();
        this.readyEventWasFired = true;
      }
    } catch {
      return false;
    }
    return true;
  }

  method(action, data) {
    // Support for old method, deprecated.
    if (action === "ready" && typeof data === "function") {
      this.on("ready", data);
      return true;
    }
    if (this[action]) {
      this[action](data);
    }
    return true;
  }

  _addToQueue(method, args = null) {
    // eslint-disable-next-line no-console
    console.debug("tidioChatApi add to queue", method, args);
    this.queue.push({ method, args });
  }

  _flushAllFromQueue() {
    // eslint-disable-next-line no-console
    console.debug(
      "tidioChatApi flushAllFrom queue. Events:",
      this.queue.length
    );
    while (this.queue.length !== 0) {
      const { method, args } = this.queue.shift();
      this[method].apply(null, args);
    }
  }

  open() {
    this._addToQueue("open");
  }

  close() {
    this._addToQueue("close");
  }

  display(shouldDisplay = true) {
    this._addToQueue("display", [shouldDisplay]);
  }

  show() {
    this._addToQueue("show");
  }

  hide() {
    this._addToQueue("hide");
  }

  setColorPalette(color) {
    this._addToQueue("setColorPalette", [color]);
  }

  track(eventName, eventData, successCallback) {
    if (eventName === undefined) {
      // eslint-disable-next-line no-param-reassign
      eventName = "track";
    }

    if (eventData === undefined) {
      // eslint-disable-next-line no-param-reassign
      eventData = {};
    }

    if (successCallback === undefined) {
      // eslint-disable-next-line no-param-reassign
      successCallback = () => {};
    }
    this._addToQueue("track", [eventName, eventData, successCallback]);
  }

  messageFromVisitor(message) {
    this._addToQueue("messageFromVisitor", [message]);
  }

  messageFromOperator(message, preventIfOperatorResponded = true) {
    this._addToQueue("messageFromOperator", [
      message,
      preventIfOperatorResponded,
    ]);
  }

  setVisitorData(updateData, callback) {
    this._addToQueue("setVisitorData", [updateData, callback]);
  }

  setContactProperties(properties, callback) {
    this._addToQueue("setContactProperties", [properties, callback]);
  }

  addVisitorTags(tags, callback) {
    this._addToQueue("addVisitorTags", [tags, callback]);
  }

  setFeatures(features = {}) {
    this._addToQueue("setFeatures", [features]);
  }

  adjustStyles(styles) {
    this._addToQueue("adjustStyles", [styles]);
  }

  setVisitorCurrency(currencyData) {
    this._addToQueue("setVisitorCurrency", [currencyData]);
  }

  setDeviceType(deviceType) {
    this._addToQueue("setDeviceType", [deviceType]);
  }
}
/* eslint-enable no-underscore-dangle */
