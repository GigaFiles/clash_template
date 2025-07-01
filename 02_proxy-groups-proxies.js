//脚本作用：
//检测节点的区域，自动在总代理组ProxyAtlas的 proxies: 中，添加对应的节点名称
//如：/香港|Hong|Kong|HK|🇭🇰/i 检测到HK的节点，自动添加"\uD83C\uDDED\uD83C\uDDF0-自动选择HK延迟最低节点-\uD83C\uDDED\uD83C\uDDF0"

function main(config) {
  // 基础模板
  const baseGroup = {
    type: 'url-test',
    hidden: true,
    lazy: true,
    "include-all": true,
    "exclude-filter": "(?i)Traffic|Expire|Premium|频道|订阅|ISP|流量|到期|重置",
    url: 'https://www.google.com/generate_204',
    "expected-status": 204,
    interval: 30,
    timeout: 2000,
    "max-failed-times": 2,
    tolerance: 50,
    proxies: []
  };

  // 每个国家/地区的专属配置
const patterns = [
  {
    regex: /香港|Hong|Kong|HK|🇭🇰/i,
    autoName: "\uD83C\uDDED\uD83C\uDDF0-自动选择HK延迟最低节点-\uD83C\uDDED\uD83C\uDDF0",
    name: '🇭🇰-自动选择HK延迟最低节点-🇭🇰',
    icon: 'https://raw.githubusercontent.com/Orz-3/mini/master/Color/HK.png',
    filter: "(?i)香港|Hong|Kong|HK|🇭🇰"
  },
  {
    regex: /台湾|台灣|Taiwan|TW|🇹🇼/i,
    autoName: "\uD83C\uDDF9\uD83C\uDDFC-自动选择TW延迟最低节点-\uD83C\uDDF9\uD83C\uDDFC",
    name: '🇹🇼-自动选择TW延迟最低节点-🇹🇼',
    icon: 'https://raw.githubusercontent.com/Orz-3/mini/master/Color/TW.png',
    filter: "(?i)台湾|台灣|Taiwan|TW|🇹🇼"
  },
  {
    regex: /新加坡|Singapore|SG|🇸🇬/i,
    autoName: "\uD83C\uDDF8\uD83C\uDDEC-自动选择Singapore延迟最低节点-\uD83C\uDDF8\uD83C\uDDEC",
    name: '🇸🇬-自动选择Singapore延迟最低节点-🇸🇬',
    icon: 'https://raw.githubusercontent.com/Orz-3/mini/master/Color/SG.png',
    filter: "(?i)新加坡|Singapore|SG|🇸🇬"
  },
  {
    regex: /日本|Japan|JP|Tokyo|Osaka|🇯🇵/i,
    autoName: "\uD83C\uDDEF\uD83C\uDDF5-自动选择JP延迟最低节点-\uD83C\uDDEF\uD83C\uDDF5",
    name: '🇯🇵-自动选择JP延迟最低节点-🇯🇵',
    icon: 'https://raw.githubusercontent.com/Orz-3/mini/master/Color/JP.png',
    filter: "(?i)日本|Japan|JP|Tokyo|Osaka|🇯🇵"
  },
  {
    regex: /美国|美國|USA|United *States|US|Los.?Angeles|LA|San.?Francisco|New.?York|San.?Jose|圣何塞|聖何塞/i,
    autoName: "\uD83C\uDDFA\uD83C\uDDF8-自动选择USA延迟最低节点-\uD83C\uDDFA\uD83C\uDDF8",
    name: '<d83c><ddfa><d83c><ddf8>-自动选择USA延迟最低节点-<d83c><ddfa><d83c><ddf8>',
    icon: 'https://raw.githubusercontent.com/Orz-3/mini/master/Color/US.png',
    filter: "(?i)美国|美國|USA|United *States|US|Los.?Angeles|LA|San.?Francisco|New.?York|San.?Jose|圣何塞|聖何塞"
  },
  {
    regex: /马来西亚|馬來西亞|Malaysia|MY|Kuala.?Lumpur|🇲🇾/i,
    autoName: "\uD83C\uDDF2\uD83C\uDDFE-自动选择Malaysia延迟最低节点-\uD83C\uDDF2\uD83C\uDDFE",
    name: '🇲🇾-自动选择Malaysia延迟最低节点-🇲🇾',
    icon: 'https://raw.githubusercontent.com/Orz-3/mini/master/Color/MY.png',
    filter: "(?i)马来西亚|馬來西亞|Malaysia|MY|Kuala.?Lumpur|🇲🇾"
  },
  {
    regex: /加拿大|Canada|CA|Toronto|TRT|多伦多|多倫多|Montreal|Vancouver|Ottawa|<d83c><dde8><d83c><dde6>/i,
    autoName: "\uD83C\uDDE8\uD83C\uDDE6-自动选择Canada延迟最低节点-\uD83C\uDDE8\uD83C\uDDE6",
    name: '<d83c><dde8><d83c><dde6>-自动选择Canada延迟最低节点-<d83c><dde8><d83c><dde6>',
    icon: 'https://raw.githubusercontent.com/Orz-3/mini/master/Color/CA.png',
    filter: "(?i)加拿大|Canada|CA|Toronto|TRT|多伦多|多倫多|Montreal|Vancouver|Ottawa|<d83c><dde8><d83c><dde6>"
  }，
  {
    regex: /英国|英國|UK|United *Kingdom|England|London|🇬🇧/i,
    autoName: "\uD83C\uDDEC\uD83C\uDDE7-自动选择England延迟最低节点-\uD83C\uDDEC\uD83C\uDDE7",
    name: '🇬🇧-自动选择England延迟最低节点-🇬🇧',
    icon: 'https://raw.githubusercontent.com/Orz-3/mini/master/Color/UK.png',
    filter: "(?i)英国|英國|UK|United *Kingdom|England|London|🇬🇧"
  },
  {
    regex: /德国|德國|Germany|DE|Frankfurt|Berlin|Munich|🇩🇪/i,
    autoName: "\uD83C\uDDE9\uD83C\uDDEA-自动选择Germany延迟最低节点-\uD83C\uDDE9\uD83C\uDDEA",
    name: '🇩🇪-自动选择Germany延迟最低节点-🇩🇪',
    icon: 'https://raw.githubusercontent.com/Orz-3/mini/master/Color/DE.png',
    filter: "(?i)德国|德國|Germany|DE|Frankfurt|Berlin|Munich|🇩🇪"
  },
  {
    regex: /印度|India|IN|Bangalore|Delhi|Mumbai|🇮🇳/i,
    autoName: "\uD83C\uDDEE\uD83C\uDDF3-自动选择India延迟最低节点-\uD83C\uDDEE\uD83C\uDDF3",
    name: '🇮🇳-自动选择India延迟最低节点-🇮🇳',
    icon: 'https://raw.githubusercontent.com/Orz-3/mini/master/Color/IN.png',
    filter: "(?i)印度|India|IN|Bangalore|Delhi|Mumbai|🇮🇳"
  },
  {
    regex: /越南|Viet.?Nam|VN|Hanoi|Ho.?Chi.?Minh|Saigon|🇻🇳/i,
    autoName: "\uD83C\uDDFB\uD83C\uDDF3-自动选择VietNam延迟最低节点-\uD83C\uDDFB\uD83C\uDDF3",
    name: '🇻🇳-自动选择VietNam延迟最低节点-🇻🇳',
    icon: 'https://raw.githubusercontent.com/Orz-3/mini/master/Color/VN.png',
    filter: "(?i)越南|Viet.?Nam|VN|Hanoi|Ho.?Chi.?Minh|Saigon|🇻🇳"
  },
  {
    regex: /泰国|Thailand|TH|Bangkok|🇹🇭/i,
    autoName: "\uD83C\uDDF9\uD83C\uDDED-自动选择Thailand延迟最低节点-\uD83C\uDDF9\uD83C\uDDED",
    name: '🇹🇭-自动选择Thailand延迟最低节点-🇹🇭',
    icon: 'https://raw.githubusercontent.com/Orz-3/mini/master/Color/TH.png',
    filter: "(?i)泰国|Thailand|TH|Bangkok|🇹🇭"
  },
  {
    regex: /阿根廷|Argentina|AR|Buenos.?Aires|🇦🇷/i,
    autoName: "\uD83C\uDDE6\uD83C\uDDF7-自动选择Argentina延迟最低节点-\uD83C\uDDE6\uD83C\uDDF7",
    name: '🇦🇷-自动选择Argentina延迟最低节点-🇦🇷',
    icon: 'https://raw.githubusercontent.com/Orz-3/mini/master/Color/AR.png',
    filter: "(?i)阿根廷|Argentina|AR|Buenos.?Aires|🇦🇷"
  }
];

  // 检查每个地区节点是否存在，并追加 proxy-group
  if (Array.isArray(config.proxies) && Array.isArray(config["proxy-groups"])) {
    for (const ptn of patterns) {
      if (
        config.proxies.some(proxy => proxy.name && ptn.regex.test(proxy.name)) &&
        !config["proxy-groups"].some(g => g.name === ptn.name)
      ) {
        // 构建 group 对象，复用模板
        config["proxy-groups"].push({
          ...baseGroup,
          name: ptn.name,
          icon: ptn.icon,
          filter: ptn.filter
        });
      }
    }
  }

  // 下面如果需要，保留 ProxyAtlas 自动添加逻辑
  // ...

  return config;
}
