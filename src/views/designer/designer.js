class Designer {
    constructor(options) {
        options = options || {}
        Object.assign(this, options)
        this.initOptions()

    }

    initOptions() {
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
        this.setDefault(this.viewport, "scale", 80)
        // 滚轮缩放
        this.setDefault(this.viewport, "wheelScale", true)


    }
    setDefault(data, key, defaultValue) {
        if (data[key] == undefined || data[key] == null) {
            data[key] = defaultValue
        }
    }
}
export { Designer }