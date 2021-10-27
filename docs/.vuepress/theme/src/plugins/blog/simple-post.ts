// 生成简易的页面信息，用于上下页跳转
export function createSimplePosts(pages) {
  return pages.map((page) => ({
    path: page.path,
    title: page.title
  }));
}