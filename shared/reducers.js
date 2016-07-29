import { List, Map } from 'immutable';

export default function(state = Map(), action) {
  switch(action.type) {
  case 'SET_CURRENT_PAGE':
    return state.set('currentPage', action.currentPage);
  case 'SET_PAGES':
    return state.set('pages', action.pages);
  case 'SET_LOADING':
    return state.set('loading', action.loading);
  }
  return state;
};

