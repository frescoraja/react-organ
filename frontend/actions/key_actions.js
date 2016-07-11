import { OrganConstants } from '../constants/organ_constants';

export const groupUpdate = notes => {
  return {
    type: OrganConstants.GROUP_UPDATE,
    notes
  }
}

export const keyPressed = note => {
  return {
    type: OrganConstants.KEY_PRESSED,
    note
  }
}

export const keyReleased = note => {
  return {
    type: OrganConstants.KEY_RELEASED,
    note
  }
}
