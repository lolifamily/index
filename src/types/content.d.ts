/**
 * 页面上下文 - 只包含必要信息
 */
export interface PageContext {
  path: string;           // 当前页面路径
  noindex?: boolean;      // 是否禁止搜索引擎索引
  redirect?: {            // 重定向信息
    to?: string;
    timeout: number;
  };
}
