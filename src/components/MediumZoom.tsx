import { onMount, onCleanup } from 'solid-js';
import mediumZoom from 'medium-zoom-next';

export default function MediumZoom() {
  onMount(() => {
    // 初始化 zoom 实例
    const zoom = mediumZoom('[data-content] img');

    onCleanup(() => {
      zoom.detach();
    });
  });

  return null;
}
