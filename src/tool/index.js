import server from "server"
import tm from 'c/tm'


let tool = {};
Object.assign(tool, tm);


tool.setJWT = function (jwt) {
    server.jwt = jwt;
    if (tool.isNotEmpty(jwt)) {
        tool.setCookie(server.keyPrefix + "jwt", jwt, 60);
    } else {
        tool.setCookie(server.keyPrefix + "jwt", jwt, 0);
    }
}
tool.getJWT = function () {
    if (tool.isNotEmpty(server.jwt)) {
        return server.jwt;
    }
    return tool.getCookie(server.keyPrefix + "jwt");
}
tool.getClientTabKey = function () {
    if (tool.isNotEmpty(server.clientTabKey)) {
        return server.clientTabKey;
    }
    return;
}
tool.setClientTabKey = function (clientTabKey) {
    server.clientTabKey = clientTabKey;
}
tool.getClientKey = function () {
    if (tool.isNotEmpty(server.clientKey)) {
        return server.clientKey;
    }
    return tool.getCookie(server.keyPrefix + "client-key");
}
tool.setClientKey = function (clientKey) {
    server.clientKey = clientKey;
    if (tool.isNotEmpty(clientKey)) {
        tool.setCookie(server.keyPrefix + "client-key", clientKey, 60);
    } else {
        tool.setCookie(server.keyPrefix + "client-key", clientKey, 0);
    }
}
tool.setCookie = function (cname, cvalue, exms) {
    var d = new Date();
    d.setTime(d.getTime() + (exms * 60 * 1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}
tool.getCookie = function (cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i].trim();
        if (c.indexOf(name) == 0) { return c.substring(name.length, c.length); }
    }
    return "";
}

export default tool;