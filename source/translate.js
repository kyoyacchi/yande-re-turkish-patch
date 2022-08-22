const tags = [{ path: "source/data/tags.json" }]
const menus = [{ path: "source/data/menus.json" }]
const footers = [{ path: "source/data/footers.json" }]

// 翻译标签
export const translateTags = function() {
  const elementList = Array.from(document.getElementsByTagName("a"))
  elementList.forEach(element => {
    const href = element.getAttribute("href")
    if (typeof href === "string" && /^\/post\?tags=(\S+)$/.test(href)) {
      const en = RegExp.$1
      const cn = tags[en]
      if (cn) {
        element.innerText = `[${cn}]${en.replace(/_/g, " ")}`
      }
    }
  })
}

// 翻译菜单
export const translateMenus = function() {
  const mainMenuList = Array.from(document.querySelectorAll("#main-menu>ul>li>a"))
  const subMenuList = Array.from(document.querySelectorAll("ul.submenu>li>a"))
  const elementList = [...mainMenuList, ...subMenuList]
  elementList.forEach(element => {
    if (element.getAttribute("href") === "#") return
    const en = element.innerText
    const cn = menus[en]
    if (cn) {
      element.innerText = cn
    }
  })
}

// 翻译提示
export const translateNotice = function() {
  // EN: This image has been resized. Click on the `View larger version` link in the sidebar
  //     for a high-quality version. Hide this message
  // CN: 这张图片已经被压缩，单击侧边栏中的 `显示高清图` 可以获取更高质量的版本。不再提醒
  // EN: This post belongs to a parent post.
  // EN: This post has child posts. (post #728160, 746235)
  // EN: This post has a child post. (post #383703)
  const elementList = Array.from(document.querySelectorAll(".status-notice"))
  elementList.forEach(element => {
    console.log(element.innerHTML)
    element.innerHTML = element.innerHTML
      .replace(/^[\s]+This image has been resized. Click on the /, "Bu resim yeniden boyutlandırılmıştır，Şuraya tıklatın:")
      .replace(/View larger version/, "Daha büyük versiyonunu görüntüle")
      .replace(/ link in the sidebar for a high-quality version./, "Yüksek kalite versiyonu için kenar çubuğundaki bağlantıya")
      .replace(/Hide this message<\/a>\./, "Bu mesajı gizle</a>")
      /* 相关父作品 */
      .replace(/This post belongs to a /, "Bu gönderi bir")
      .replace(/parent post<\/a>\./, "Üst öğeye aittir")
      /* 相关子作品 */
      .replace(/This post has /, "这张图片从属于一个")
      .replace(/child posts<\/a>\. \(post #/, "作品集</a>。相关子作品：")
      .replace(/a child post<\/a>\. \(post #/, "bir alt gönderi：")
      .replace(/<\/a>, <a /, "</a> | <a ")
      .replace(/<\/a>\)/, "</a>")
  })
}
//Baya devrik olacak, sonra halledeceğim.
// 翻译点击
export const translateButtons = function() {
  [
    ['#highres-show', 'View larger version', 'Daha büyük versiyonunu görüntüle'],
    ['#highres', 'Download larger version', 'Daha büyük versiyonunu indir'],
    ['#png', 'Download PNG', 'PNG'yi indir'],
    ['li#add-to-favs>a', 'Add to favorites', 'Favorilere ekle'],
    ['li#set-avatar>a', 'Set avatar', 'Avatar ayarlayın'],
    ['h4>a.js-posts-show-edit-tab', 'Edit', 'Düzenle'],
    ['h4>a.js-posts-show-comments-tab', 'Respond', 'Cevapla'],
    ['.pagination>.previous_page', '← Previous', 'Önceki'],
    ['.pagination>.next_page', 'Next →', 'Sonraki'],
  ].forEach(data => {
    const [selector, en, cn] = data
    const element = document.querySelector(selector)
    if (element) {
      element.innerText = element.innerText.replace(en, cn)
    }
  })
}

// 翻译页脚
export const translateFooters = function() {
  const elementList = Array.from(document.querySelectorAll('#subnavbar>li>a'))
  elementList.forEach(element => {
    const en = element.innerText
    const cn = footers[en]
    if (cn) {
      element.innerText = cn
    }
  })
}

// 合并
export const initTranslate = function() {
  translateTags()
  translateMenus()
  translateNotice()
  translateButtons()
  translateFooters()
}
