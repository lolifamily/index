import { visitParents } from 'unist-util-visit-parents';
import type { Root } from 'hast';

export default function rehypeSanitize() {
  return function (tree: Root) {
    visitParents(tree, 'element', (element, parents) => {
      // GFM checkbox: <input type="checkbox" checked disabled>
      if (element.tagName !== 'input'
        || element.properties.type !== 'checkbox'
        || !element.properties.disabled) {
        return;
      }

      // 获取紧邻的文本作为 aria-label
      const parent = parents[parents.length - 1];

      if (parent?.type !== 'element'
        || parent.tagName !== 'li' || !Array.isArray(parent.properties.className)
        || parent.properties.className[0] !== 'task-list-item') {
        return;
      }

      element.properties['aria-disabled'] = 'true';
      element.properties['aria-checked'] = element.properties.checked ? 'true' : 'false';
      element.properties['aria-label'] = element.properties.checked ? 'Completed task' : 'Incomplete task';
    });
  };
}
