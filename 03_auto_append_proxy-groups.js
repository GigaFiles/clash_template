//脚本作用：
//检测某个国家的节点，如果有，则添加该国家的代理组
//如：检测到HK的节点，就添加HK的代理组，并把所有HK节点拉进去

//后期如果要追加新的国家的节点，就在const patterns里追加就行了，其它地方的不用动

function main(config) {
  // 匹配规则及自动选择组名（用Unicode转义写法，保证与YAML一致）
  const patterns = [
  { regex: /香港|Hong|Kong|HK|🇭🇰/i, autoName: "\uD83C\uDDED\uD83C\uDDF0-自动选择HK延迟最低节点-\uD83C\uDDED\uD83C\uDDF0" },
  { regex: /台湾|台灣|Taiwan|TW|🇹🇼/i, autoName: "\uD83C\uDDF9\uD83C\uDDFC-自动选择TW延迟最低节点-\uD83C\uDDF9\uD83C\uDDFC" },
  { regex: /新加坡|Singapore|SG|🇸🇬/i, autoName: "\uD83C\uDDF8\uD83C\uDDEC-自动选择Singapore延迟最低节点-\uD83C\uDDF8\uD83C\uDDEC" },
  { regex: /日本|Japan|JP|Tokyo|Osaka|🇯🇵/i, autoName: "\uD83C\uDDEF\uD83C\uDDF5-自动选择JP延迟最低节点-\uD83C\uDDEF\uD83C\uDDF5" },
  { 
    regex: /美国|美國|USA|United *States|US|Los.?Angeles|LA|San.?Francisco|New.?York|San.?Jose|圣何塞|聖何塞|🇺🇸/i, 
    autoName: "\uD83C\uDDFA\uD83C\uDDF8-自动选择USA延迟最低节点-\uD83C\uDDFA\uD83C\uDDF8" 
  },
  { regex: /马来西亚|馬來西亞|Malaysia|MY|Kuala.?Lumpur|🇲🇾/i, autoName: "\uD83C\uDDF2\uD83C\uDDFE-自动选择Malaysia延迟最低节点-\uD83C\uDDF2\uD83C\uDDFE" },
  { regex: /加拿大|Canada|CA|Toronto|TRT|Montreal|Vancouver|Ottawa|🇨🇦/i, autoName: "\uD83C\uDDE8\uD83C\uDDE6-自动选择Canada延迟最低节点-\uD83C\uDDE8\uD83C\uDDE6" },
  { regex: /英国|英國|UK|United *Kingdom|England|London|🇬🇧/i, autoName: "\uD83C\uDDEC\uD83C\uDDE7-自动选择England延迟最低节点-\uD83C\uDDEC\uD83C\uDDE7" },
  { regex: /德国|德國|Germany|DE|Frankfurt|Berlin|Munich|🇩🇪/i, autoName: "\uD83C\uDDE9\uD83C\uDDEA-自动选择Germany延迟最低节点-\uD83C\uDDE9\uD83C\uDDEA" },
  { regex: /印度|India|IN|Bangalore|Delhi|Mumbai|🇮🇳/i, autoName: "\uD83C\uDDEE\uD83C\uDDF3-自动选择India延迟最低节点-\uD83C\uDDEE\uD83C\uDDF3" },
  { regex: /越南|Viet.?Nam|VN|Hanoi|Ho.?Chi.?Minh|Saigon|🇻🇳/i, autoName: "\uD83C\uDDFB\uD83C\uDDF3-自动选择VietNam延迟最低节点-\uD83C\uDDFB\uD83C\uDDF3" },
  { regex: /泰国|Thailand|TH|Bangkok|🇹🇭/i, autoName: "\uD83C\uDDF9\uD83C\uDDED-自动选择Thailand延迟最低节点-\uD83C\uDDF9\uD83C\uDDED" },
  { regex: /阿根廷|Argentina|AR|Buenos.?Aires|🇦🇷/i, autoName: "\uD83C\uDDE6\uD83C\uDDF7-自动选择Argentina延迟最低节点-\uD83C\uDDE6\uD83C\uDDF7" },
];

  // 检查每个地区节点是否存在
  const foundAreas = [];
  if (Array.isArray(config.proxies)) {
    for (const ptn of patterns) {
      if (config.proxies.some(proxy => proxy.name && ptn.regex.test(proxy.name))) {
        foundAreas.push(ptn.autoName);
      }
    }
  }

// 用户可自定义追加项
const toAdd = [...foundAreas];

  // 追加到 ProxyAtlas 组的 proxies
  const group = config["proxy-groups"].find(g => g.name === "ProxyAtlas");
  if (group) {
    for (const value of toAdd) {
      if (!group.proxies.includes(value)) {
        group.proxies.push(value);
      }
    }
  }

  return config;
}
