  prototype.addListeners = function () {
    var options = this.options;

    this.$element.on(EVENT_DRAG_START, options.dragstart).on(EVENT_DRAG_MOVE, options.dragmove).on(EVENT_DRAG_END, options.dragend).on(EVENT_ZOOM_IN, options.zoomin).on(EVENT_ZOOM_OUT, options.zoomout);
    this.$cropper.on(EVENT_MOUSE_DOWN, $.proxy(this.dragstart, this)).on(EVENT_DBLCLICK, $.proxy(this.dblclick, this));

    if (options.zoomable && options.mouseWheelZoom) {
      this.$cropper.on(EVENT_WHEEL, $.proxy(this.wheel, this));
    }

    if (options.global) {
      $document.on(EVENT_MOUSE_MOVE, (this._dragmove = proxy(this.dragmove, this))).on(EVENT_MOUSE_UP, (this._dragend = proxy(this.dragend, this)));
    } else {
      this.$cropper.on(EVENT_MOUSE_MOVE, $.proxy(this.dragmove, this)).on(EVENT_MOUSE_UP, $.proxy(this.dragend, this));
    }

    if (options.responsive) {
      $window.on(EVENT_RESIZE, (this._resize = proxy(this.resize, this)));
    }
  };

  prototype.removeListeners = function () {
    var options = this.options;

    this.$element.off(EVENT_DRAG_START, options.dragstart).off(EVENT_DRAG_MOVE, options.dragmove).off(EVENT_DRAG_END, options.dragend).off(EVENT_ZOOM_IN, options.zoomin).off(EVENT_ZOOM_OUT, options.zoomout);
    this.$cropper.off(EVENT_MOUSE_DOWN, this.dragstart).off(EVENT_DBLCLICK, this.dblclick);

    if (options.zoomable && options.mouseWheelZoom) {
      this.$cropper.off(EVENT_WHEEL, this.wheel);
    }

    if (options.global) {
      $document.off(EVENT_MOUSE_MOVE, this._dragmove).off(EVENT_MOUSE_UP, this._dragend);
    } else {
      this.$cropper.off(EVENT_MOUSE_MOVE, this.dragmove).off(EVENT_MOUSE_UP, this.dragend);
    }

    if (options.responsive) {
      $window.off(EVENT_RESIZE, this._resize);
    }
  };
