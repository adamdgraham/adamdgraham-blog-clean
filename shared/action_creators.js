export function setState(currentPage) {
  return {
    type: 'SET_CURRENT_PAGE',
    currentPage: currentPage
  };
};

export function setPages(pages) {
  return {
    type: 'SET_PAGES',
    pages: pages
  };
}

export function setLoading(loading) {
  return {
    type: 'SET_LOADING',
    loading: loading
  };
}
