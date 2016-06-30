const AppDispatcher = require('../dispatcher/dispatcher');
const OrganConstants = require('../constants/organ_constants');

const KeyActions = {
  groupUpdate(notes) {
    AppDispatcher.dispatch({
      actionType: OrganConstants.GROUP_UPDATE,
      notes
    });
  },

  keyPressed(note) {
    AppDispatcher.dispatch({
      actionType: OrganConstants.KEY_PRESSED,
      note: note
    });
  },

  keyReleased(note) {
    AppDispatcher.dispatch({
      actionType: OrganConstants.KEY_RELEASED,
      note: note
    });
  }
};

module.exports = KeyActions;
