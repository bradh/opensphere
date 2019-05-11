goog.provide('plugin.featuretable.FeatureTablePlugin');

goog.require('os.data.DataManager');
goog.require('os.layer.config.LayerConfigManager');
goog.require('os.plugin.AbstractPlugin');
goog.require('os.ui.action.Action');
goog.require('os.ui.action.MenuOptions');
goog.require('plugin.featuretable.featureTableDirective');
goog.require('plugin.featuretable.menu');

/**
 * Adds the ability to view the contents of a vector layer as a table.
 * @extends {os.plugin.AbstractPlugin}
 * @constructor
 */
plugin.featuretable.FeatureTablePlugin = function() {
  plugin.featuretable.FeatureTablePlugin.base(this, 'constructor');
  this.id = 'featuretable';
};
goog.inherits(plugin.featuretable.FeatureTablePlugin, os.plugin.AbstractPlugin);
goog.addSingletonGetter(plugin.featuretable.FeatureTablePlugin);


/**
 * @type {string}
 * @const
 */
plugin.featuretable.ID = 'featuretable';


/**
 * @inheritDoc
 */
plugin.featuretable.FeatureTablePlugin.prototype.init = function() {
  // setup the layer action manager
  plugin.featuretable.menu.setup();

  // listen for source add so that we can set the action as supported
  var dm = os.dataManager;
  dm.listen(os.data.event.DataEventType.SOURCE_ADDED, function(event) {
    var source = event.source;
    if (source && source instanceof os.source.Vector) {
      source.setSupportsAction(plugin.featuretable.menu.EventType.SHOW_TABLE, true);
    }
  });
};
