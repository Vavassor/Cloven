export const getOwnerDocument = (
  node: Element | Document | null | undefined
): Document => {
  return (node && node.ownerDocument) || document;
};

export const getOwnerWindow = (
  node: Element | Document | null | undefined
): Window => {
  const currentDocument = getOwnerDocument(node);
  return currentDocument.defaultView || window;
};
