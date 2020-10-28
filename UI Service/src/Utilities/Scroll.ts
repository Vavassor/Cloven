const findScrollParent = (element: Element) => {
  for (
    let nextElement: Element | null = element;
    !!nextElement;
    nextElement = nextElement.parentElement
  ) {
    if (nextElement.scrollHeight !== nextElement.clientHeight) {
      return nextElement;
    }
  }
  return null;
};

export const scrollToListItem = (
  list: HTMLUListElement,
  listItem: HTMLLIElement
) => {
  const scrollbox = findScrollParent(list);
  if (scrollbox) {
    const scrollBottom = scrollbox.clientHeight + scrollbox.scrollTop;
    const elementBottom = listItem.offsetTop + listItem.offsetHeight;
    if (elementBottom > scrollBottom) {
      scrollbox.scrollTop = elementBottom - scrollbox.clientHeight;
    } else if (listItem.offsetTop < scrollbox.scrollTop) {
      scrollbox.scrollTop = listItem.offsetTop;
    }
  }
};
