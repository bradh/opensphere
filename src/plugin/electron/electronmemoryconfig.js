goog.module('plugin.electron.ElectronMemoryConfigUI');
goog.module.declareLegacyNamespace();

const Module = goog.require('os.ui.Module');


/**
 * The electron configuration directive.
 * @return {angular.Directive}
 */
const directive = () => ({
  restrict: 'E',
  replace: true,
  templateUrl: os.ROOT + 'views/plugin/electron/electronmemoryconfig.html',
  controller: Controller,
  controllerAs: 'ctrl'
});


/**
 * Add the directive to the module
 */
Module.directive('electronmemoryconfig', [directive]);



/**
 * Controller function for the electron configuration.
 * @unrestricted
 */
class Controller {
  /**
   * Constructor.
   * @param {!angular.Scope} $scope The Angular scope
   * @param {!angular.JQLite} $element The root DOM element
   * @ngInject
   */
  constructor($scope, $element) {
    this['maxMemory'] = ElectronOS.getMaxMemory();
    this['minMemory'] = 512;
    this['systemMemory'] = ElectronOS.getSystemMemory();
    this['restartButtonActive'] = false;
  }

  /**
   * @export
   */
  update() {
    if (this['maxMemory']) {
      const maxMem = this['maxMemory'];
      if (maxMem >= this['minMemory'] && maxMem <= this['systemMemory']) {
        this['restartButtonActive'] = true;
      } else {
        this['restartButtonActive'] = false;
      }
    }
  }

  /**
   * Restarts the application.
   * @export
   */
  restart() {
    ElectronOS.setMaxMemory(this['maxMemory']);
    ElectronOS.restart();
  }
}

exports = {
  Controller,
  directive
};
