

const logger = (req, res, next) => {
    let logStr = new Date().toLocaleTimeString("da-DK");
    logStr += ` ${req.method} ${req.path}`;
    res.on("finish", () => {
        logStr += ` ${res.statusCode} ${res.statusMessage}`;
        console.log(logStr);
    })
    next();   //-
}

module.exports = logger; //