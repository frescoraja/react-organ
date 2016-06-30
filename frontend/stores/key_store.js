const Store = require('flux/utils').Store;
const AppDispatcher = require('../dispatcher/dispatcher');
const OrganConstants = require('../constants/organ_constants');
const KeyStore = new Store(AppDispatcher);

let _keys = [];

KeyStore.all = () => _keys.slice(0);

KeyStore.__onDispatch = (payload) => {
  switch(payload.actionType) {
    case OrganConstants.KEY_PRESSED:
      KeyStore._addKey(payload.note);
      break;
    case OrganConstants.KEY_RELEASED:
      KeyStore._removeKey(payload.note);
      break;
    case OrganConstants.GROUP_UPDATE:
      KeyStore._groupUpdate(payload.notes);
      break;
  }
};

KeyStore._addKey = function(key) {
  const idx = _keys.indexOf(key);
  if (idx === -1) {
    _keys.push(key);
    this.__emitChange();
  }
};

KeyStore._groupUpdate = function(keys) {
  _keys = keys.slice();
  this.__emitChange();
};

KeyStore._removeKey = function(key) {
  const idx = _keys.indexOf(key);
  if (idx >= 0) {
    _keys.splice(idx, 1);
    this.__emitChange();
  }
};

module.exports = KeyStore;
