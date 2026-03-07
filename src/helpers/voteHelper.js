export const voteHelper = {
  existPrevious: (categories, categoryId) => {
    const actualIndex = categories.findIndex(c => c.category_id === categoryId);
    
    if (actualIndex - 1 === -1 ) {
      return false;
    }
    return true;
  },
  existsNext: (categories, categoryId) => {
    const actualIndex = categories.findIndex(c => c.category_id === categoryId);
    
    if (actualIndex + 1 === categories.length) {
      return false;
    }
    return true;
  },
  
}