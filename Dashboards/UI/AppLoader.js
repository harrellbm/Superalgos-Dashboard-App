exports.newDashboardsUIApp = function newDashboardsUIApp() {
    let createApp = SA.nodeModules.vue.createApp()
    let router = SA.nodeModules.vueRouter
    let App = require('./App.vue')

    createApp(App).use(router).mount('#app')
}
