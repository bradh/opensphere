goog.provide('plugin.featuretable.featureTableCtrl');
goog.provide('plugin.featuretable.featureTableDirective');

goog.require('goog.array');
goog.require('os.defines');
goog.require('os.ui.Module');
goog.require('os.ui.window');


/**
 * The Feature Table directive
 * @return {angular.Directive}
 */
plugin.featuretable.featureTableDirective = function() {
  return {
    restrict: 'AE',
    replace: true,
    templateUrl: os.ROOT + 'views/plugin/featuretable/featuretable.html',
    controller: plugin.featuretable.featureTableCtrl,
    controllerAs: 'ctrl'
  };
};


/**
 * Add the directive to the module
 */
os.ui.Module.directive('featuretable', [plugin.featuretable.featureTableDirective]);


/**
 * Controller function for the Feature Table directive
 * @param {!angular.Scope} $scope
 * @param {!angular.JQLite} $element
 * @constructor
 * @ngInject
 */
plugin.featuretable.featureTableCtrl = function($scope, $element) {
  /**
   * @type {?angular.Scope}
   * @private
   */
  this.scope_ = $scope;
  this.scope_['gridOptions'] = {
    'enableColumnReorder': true,
    'forceFitColumns': true,
    'multiColumnSort': false,
    'multiSelect': false,
    'defaultFormatter': os.ui.slick.formatter.columnFormatter, // os.ui.slick.formatter.urlNewTabFormatter,
    'enableAsyncPostRender': true
  };
  this.scope_['idField'] = 'ID';

  /**
   * @type {?angular.JQLite}
   * @private
   */
  this.element_ = $element;

  $scope.$on('$destroy', this.destroy_.bind(this));
};


/**
 * Clean up
 * @private
 */
plugin.featuretable.featureTableCtrl.prototype.destroy_ = function() {
  this.element_ = null;
};


/**
 * Close
 * @export
 */
plugin.featuretable.featureTableCtrl.prototype.close = function() {
  os.ui.window.close(this.element_);
};

