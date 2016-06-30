const Store = require('flux/utils').Store;
const AppDispatcher = require('../dispatcher/dispatcher');
const KeyStore = new Store(AppDispatcher);

let _keys = [];

KeyStore.all = () => return _keys.slice();

KeyStore.__onDispatch = (payload) => {
  switch(payload.actionType) {
    case OrganConstants.KEY_PRESSED:
      KeyStore._addKey(payload.note);
      break;
    case OrganConstants.KEY_RELEASED;
      KeyStore._removeKey(payload.note);
      break;
    case OrganConstants.GROUP_UPDATE;
      KeyStore._groupUpdate(payload.notes);
      break;
  }
};

KeyStore._addKey = (key) => {
  const idx = _keys.indexOf(key);
  if (idx === -1) {
    _keys.push(key);
    this.__emitChange();
  }
};

KeyStore._groupdUpdate = (keys) => {
  _keys = keys.slice();
  this.__emitChange();
};

KeyStore._removeKey = (key) => {
  const idx = _keys.indexOf(key);
  if (idx >= 0) {
    _keys.splice(idx, 1);
    this.__emitChange();
  }
};

module.exports = KeyStore;
