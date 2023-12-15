if (process.env.NODE_ENV === "prodution"){
    // 배포 상태
    module.exports = require("./production.js");
} else {
    // 개발 상태
    module.exports = require("./dev.js");
}