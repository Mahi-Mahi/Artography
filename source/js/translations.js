angular.module('gettext').run(['gettextCatalog', function (gettextCatalog) {
/* jshint -W100 */
    gettextCatalog.setStrings('fr_FR', {"Artistes":"Artists","Galeries":"Galleries"});
/* jshint +W100 */
}]);