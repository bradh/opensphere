goog.provide('plugin.featuretable.menu');

goog.require('os.ui.menu.MenuItemType');
goog.require('os.ui.menu.layer');


/**
 * Feature Table event group label.
 * @type {string}
 * @const
 */
plugin.featuretable.menu.GROUP_LABEL = 'Feature Table';


/**
 * FeatureTable menu events.
 * @enum {string}
 */
plugin.featuretable.menu.EventType = {
  SHOW_TABLE: 'featuretable:showtable'
};


/**
 * Add Feature Table menu items to the layer menu.
 */
plugin.featuretable.menu.setup = function() {
  var menu = os.ui.menu.layer.MENU;
  if (menu && !menu.getRoot().find(plugin.featuretable.menu.EventType.SHOW_TABLE)) {
    var menuRoot = menu.getRoot();
    var toolsGroup = menuRoot.find(os.ui.menu.layer.GroupLabel.TOOLS);
    goog.asserts.assert(toolsGroup, 'Group should exist! Check spelling?');

    // this item is added for vector layers to be able to generate Feature Tables
    toolsGroup.addChild({
      label: 'Show Table View',
      eventType: plugin.featuretable.menu.EventType.SHOW_TABLE,
      tooltip: 'Show a table of current features',
      icons: ['<i class="fa fa-fw fa-table"></i>'],
      handler: plugin.featuretable.menu.showTable_
    });
  }
};


/**
 * Handle generate Feature Table event. Adds a Feature Table layer to the map.
 * @param {!os.ui.menu.MenuEvent<os.ui.menu.layer.Context>} event The menu event.
 * @private
 */
plugin.featuretable.menu.showTable_ = function(event) {
  var context = event.getContext();
  if (context) {
    var layers = os.ui.menu.layer.getLayersFromContext(context);
    if (layers.length) {
      for (var i = 0; i < layers.length; i++) {
        var layer = layers[i];
        var source = /** @type {os.source.Vector} */ (layer.getSource());
        if (!source || source.getFeatureCount() <= 0) {
          os.alertManager.sendAlert('No features in selected layer. Unable to generate Feature Table.',
              os.alert.AlertEventSeverity.WARNING);
        } else {
          var windowOptions = {
            'id': plugin.featuretable.ID,
            'label': 'Features',
            'icon': 'fa fa-table',
            'x': 'center',
            'y': 'center',
            'width': 400,
            'min-width': 400,
            'max-width': 0,
            'height': 400,
            'min-height': 300,
            'max-height': 0,
            'show-close': true
          };
          var template = '<featuretable></featuretable>';

          var scopeOptions = {'gridCols': source.getColumns(), 'properties': source.getFeatures()};
          os.ui.window.create(windowOptions, template, undefined, undefined, undefined, scopeOptions);
        }
      }
    }
  }
};
