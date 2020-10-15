module.exports = app => {

    // Base URLS
    app.use('/api/auth', require('./auth.routes.js'))
    app.use('/api/profile', require('./profile.routes.js'))
    app.use('/api/project', require('./project.routes.js'))
    app.use('/api/character', require('./character.routes.js'))
    app.use('/api/folder', require('./folder.routes.js'))
    app.use('/api/archive', require('./archive.routes.js'))
    app.use('/api/common', require('./common.routes.js'))




    // app.use('/api/kraken', require('./kraken.routes.js'))

}