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
        this.clientX = 0
        this.clientY = 0

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
            if (key == "body") {
                this[key]["left"]["close"] = false
                this[key]["right"]["close"] = false
            }
        })

        this.setDefault(this, "viewport", {})
        this.setDefault(this.viewport, "width", 1024)
        this.setDefault(this.viewport, "height", 720)
        // 默认 试图 缩放 transform: scale(0.6)
        this.setDefault(this.viewport, "scale", 100)
        // 滚轮缩放
        this.setDefault(this.viewport, "wheelScale", true)

        this.setDefault(this, "scale", {})
        // 小格刻度 每格 多少 像素
        this.setDefault(this.scale, "small", 10)
        // 小格刻度 尺寸 像素
        this.setDefault(this.scale, "smallSize", 5)
        // 中格刻度 每格 多少 像素
        this.setDefault(this.scale, "medium", 5)
        // 中格刻度 尺寸 像素
        this.setDefault(this.scale, "mediumSize", 10)
        // 大格刻度 每格 多少 像素
        this.setDefault(this.scale, "large", 10)
        // 大格刻度 尺寸 像素
        this.setDefault(this.scale, "largeSize", 15)

    }
    setDefault(data, key, defaultValue) {
        if (data[key] == undefined || data[key] == null) {
            data[key] = defaultValue
        }
    }

    preventDefault(event) {
        event.preventDefault();
    }
    close(obj, event) {
        event.preventDefault();
        obj.close = true;
    }
    open(obj, event) {
        event.preventDefault();
        obj.close = false;
    }
    disable() {
        this.disabled = true;
    }
    mouseup() {
        if (this.disabled) {
            return
        }
        this.mouse_do_ing = false
        delete this.onMouseMove
    }
    mousemove(event) {
        if (this.disabled) {
            return
        }
        const { clientX, clientY } = event
        this.clientX = clientX
        this.clientY = clientY
        let onMouseMove = this.onMouseMove
        if (onMouseMove) {
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
        const { clientX, clientY } = event
        this.mouseDownX = clientX;
        this.mouseDownY = clientY;
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
    }
}
export { Designer }