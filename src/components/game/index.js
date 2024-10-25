/** 库 */

import util from "./util"
import action from "./action"
import animation from "./animation"
import scene from "./scene"
import sprite from "./sprite"

let config = null;
const r = {}
const onStart = () => {
    console.log("onStart", cc.game)
    let resources = [];
    if (config.resources) {
        config.resources.forEach(one => {
            r[one.name] = one
            resources.push(one.path)
        })
    }
    console.log("preload", resources)
    cc.view.setOrientation(cc.ORIENTATION_LANDSCAPE);
    cc.LoaderScene.preload(resources, onPreload);
}
const onPreload = () => {
    console.log("onPreload", cc.game)
}


const start = (opts) => {
    config = opts.config

    cc.game.config = {
        project_type: "javascript",
        debugMode: 1,
        showFPS: true,
        frameRate: 10,
        id: "gameCanvas",
        renderMode: 0,
        engineDir: "frameworks/cocos2d-html5",
        modules: ["cocos2d"],
        width: config.width,
        height: config.height,
        // jsList: ["src/resource.js", "src/app.js"],
    };

    cc._loaderImage = config.loaderImage
    cc.game.run(opts.id, onStart,);
}

export default {
    start,
    util,
    action,
    animation,
    scene,
    sprite,

}