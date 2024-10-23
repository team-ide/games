class Designer {
    constructor(options) {
        options = options || {}
        Object.assign(this, options)
        this.initOptions()
    }

    initOptions() {
        this.mouse_do_ing = false
        this.disabled = false
        this.minScale = 20
        this.maxScale = 800
        let keys = ["head", "toolbar", "body", "foot"]
        keys.forEach(key => {
            this.setDefault(this, key, {})
            this.setDefault(this[key], "left", {})
            this.setDefault(this[key]["left"], "width", 240)
            this.setDefault(this[key], "center", {})
            this.setDefault(this[key], "right", {})
            this.setDefault(this[key]["right"], "width", 240)
            if (key == "head") {
                this.setDefault(this[key], "height", 40)
            }
            if (key == "toolbar") {
                this.setDefault(this[key], "height", 40)
            }
            if (key == "foot") {
                this.setDefault(this[key], "height", 25)
            }
        })

        this.setDefault(this, "viewport", {})
        this.setDefault(this.viewport, "width", 1024)
        this.setDefault(this.viewport, "height", 720)
        // 默认 试图 缩放 transform: scale(0.6)
        this.setDefault(this.viewport, "scale", 110)
        // 滚轮缩放
        this.setDefault(this.viewport, "wheelScale", true)


    }
    setDefault(data, key, defaultValue) {
        if (data[key] == undefined || data[key] == null) {
            data[key] = defaultValue
        }
    }

    disable() {
        this.disabled = true;
    }
    mouseup() {
        if (this.disabled) {
            return
        }
        this.unbindMouseEvent()
        this.mouse_do_ing = false
        delete this.onMouseMove
    }
    mousemove(event) {
        if (this.disabled) {
            return
        }
        let onMouseMove = this.onMouseMove
        if (onMouseMove) {
            let clientX = event.clientX
            let clientY = event.clientY
            let moveX = clientX - this.mouseDownX;
            this.mouseDownX = clientX
            let moveY = clientY - this.mouseDownY;
            this.mouseDownY = clientY
            onMouseMove(moveX, moveY)
        }
    }
    changeSizeStart(event, opts) {
        if (this.disabled) {
            return
        }
        if (opts == null || opts.obj == null) {
            return
        }
        // 鼠标按下时的位置
        this.mouseDownX = event.clientX;
        this.mouseDownY = event.clientY;
        this.change_size_opts = opts
        this.mouse_do_ing = true
        this.onMouseMove = (moveX, moveY) => {
            if (opts.width) {
                let width = null;
                // 反向
                if (opts.widthReverse) {
                    width = opts.obj.width - moveX
                } else {
                    width = opts.obj.width + moveX
                }
                if (opts.minWidth > 0) {
                    width = Math.max(opts.minWidth, width)
                }
                if (opts.maxWidth > 0) {
                    width = Math.min(opts.maxWidth, width)
                }
                opts.obj.width = width;
            }

            if (opts.height) {
                let height = null;
                // 反向
                if (opts.heightReverse) {
                    height = opts.obj.height - moveY
                } else {
                    height = opts.obj.height + moveY
                }
                if (opts.minHeight > 0) {
                    height = Math.max(opts.minHeight, height)
                }
                if (opts.maxHeight > 0) {
                    height = Math.min(opts.maxHeight, height)
                }
                opts.obj.height = height;
            }
        }
        this.bindMouseEvent()
    }
}
export { Designer }