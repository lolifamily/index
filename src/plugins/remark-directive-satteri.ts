import { defineMdastPlugin } from 'satteri';
import type { MdastPluginInstance } from 'satteri';
import { h } from 'hastscript';

// satteri 主入口未导出 directive 节点类型,从 visitor 签名提取(已是 Readonly)
type ContainerNode = Parameters<NonNullable<MdastPluginInstance['containerDirective']>>[0];
type LeafNode = Parameters<NonNullable<MdastPluginInstance['leafDirective']>>[0];
type TextNode = Parameters<NonNullable<MdastPluginInstance['textDirective']>>[0];
type DirectiveNode = ContainerNode | LeafNode | TextNode;
type DirectiveCtx = Parameters<NonNullable<MdastPluginInstance['containerDirective']>>[1];

/**
 * remark-directive-rehype 的 Sätteri 版。
 * 三个 directive visitor 共用 processDirective,通过 ctx.setProperty 写 data.hName/hProperties,
 * ctx.prependChild / setProperty('children') 调整子节点。danger→caution 用局部变量,不改 node.name。
 */
function processDirective(node: DirectiveNode, ctx: DirectiveCtx): void {
  const hast = h(node.name, node.attributes ?? {});
  const baseProps: Record<string, unknown> = 'properties' in hast ? { ...hast.properties } : {};

  switch (node.name) {
    case 'note':
    case 'tip':
    case 'important':
    case 'warning':
    case 'caution':
    case 'danger': {
      if (node.type !== 'containerDirective' || node.children.length === 0) {
        ctx.setProperty(node, 'data', { hProperties: { ...baseProps, class: 'hidden' } });
        console.warn('github admonitions to directives: not a container directive or no children');
        break;
      }

      const type = node.name === 'danger' ? 'caution' : node.name;
      ctx.setProperty(node, 'data', {
        hName: 'blockquote',
        hProperties: { ...baseProps, 'data-directive-type': type },
      });

      const first = node.children[0];
      if (first?.type === 'paragraph' && first.data?.directiveLabel !== true) {
        ctx.prependChild(node, {
          type: 'paragraph',
          children: [{ type: 'text', value: type.toUpperCase() }],
        });
      }
      break;
    }

    case 'abbr':
      // leafDirective: ::abbr[HTML]{title="HyperText Markup Language"}
      if (node.type === 'containerDirective') {
        ctx.setProperty(node, 'data', { hProperties: { ...baseProps, class: 'hidden' } });
        console.warn('abbr directive should be a leaf directive (::) or text directive (:)');
      } else {
        ctx.setProperty(node, 'data', { hName: node.name, hProperties: baseProps });
      }
      break;

    case 'mark':
    case 'sup':
    case 'sub':
    case 'kbd':
    case 'samp':
    case 'center':
      ctx.setProperty(node, 'data', { hName: node.name, hProperties: baseProps });
      break;

    case 'more':
      if (node.type === 'textDirective') {
        console.warn('more directive should not be a text directive');
      }
      ctx.setProperty(node, 'data', { hName: 'span', hProperties: { id: 'more' } });
      ctx.setProperty(node, 'children', []);
      break;

    default:
      console.warn(`Unknown directive: ${node.name}`);
      break;
  }
}

export default function remarkDirectiveSatteri() {
  return defineMdastPlugin({
    name: 'remark-directive-satteri',
    containerDirective(node, ctx) {
      processDirective(node, ctx);
    },
    leafDirective(node, ctx) {
      processDirective(node, ctx);
    },
    textDirective(node, ctx) {
      processDirective(node, ctx);
    },
  });
}
