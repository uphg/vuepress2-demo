import { navbar } from "../../../config/index"

export const getNavPages = (pages) => {
  const navbarLinks = [...navbar] as { text: string; link: string; name: string; }[]

  for (const page of pages) {
    const index = navbarLinks.findIndex((item) => item.link === page.path)
    if (index === -1) continue
    navbarLinks[index].name = page.key
  }

  const navbarPages = {
    home: navbarLinks.find((item)=> item.text === '首页'),
    archives: navbarLinks.find((item)=> item.text === '归档'),
    tags: navbarLinks.find((item)=> item.text === '标签'),
    about: navbarLinks.find((item)=> item.text === '关于'),
  }
  return navbarPages
}