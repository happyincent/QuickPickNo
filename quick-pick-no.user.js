// ==UserScript==
// @name        QuickPickNo
// @description 車牌號碼吉凶判斷
// @namespace   https://github.com/happyincent/QuickPickNo
// @match       https://www.mvdis.gov.tw/m3-emv-plate/webpickno/queryPickNo
// @version     1.0
// @author      happyincent
// @homepageURL https://github.com/happyincent/QuickPickNo
// @require     https://cdn.jsdelivr.net/npm/sweetalert2@11
// @grant       none
// ==/UserScript==

try {
  localStorage.setItem(
    "plates",
    JSON.stringify(
      [...document.querySelectorAll(".number_cell .number")]
        .map((o) => o.innerHTML)
        .concat(JSON.parse(localStorage.getItem("plates") || "[]"))
    )
  );

  document.querySelector("#next").click();
} catch {
  let 吉吉s = [];

  // http://tanzih.blogspot.com/2013/09/4-80-80-yw-6675-6675-80-83.html
  const 吉列表 = [
    { n: 1, s: "大展鴻圖．可獲成功", r: "吉" },
    { n: 2, s: "一盛一衰．勞而無功", r: "凶" },
    { n: 3, s: "蒸蒸日上．百事順遂", r: "吉" },
    { n: 4, s: "坎坷前途．苦難折磨", r: "凶" },
    { n: 5, s: "生意欣榮．名利雙收", r: "吉" },
    { n: 6, s: "天降幸運．可成大功", r: "吉" },
    { n: 7, s: "和氣致祥．必獲成功", r: "吉" },
    { n: 8, s: "貫徹志望．成功可期", r: "吉" },
    { n: 9, s: "獨營無力．財利無望", r: "凶" },
    { n: 10, s: "空費心力．徒勞無功", r: "凶" },
    { n: 11, s: "穩健著實．必得人望", r: "吉" },
    { n: 12, s: "薄弱無力．謀事難成", r: "凶" },
    { n: 13, s: "天賦吉運．能得人望", r: "吉" },
    { n: 14, s: "是成是敗．惟靠堅毅", r: "凶" },
    { n: 15, s: "大事成就．一定興隆", r: "吉" },
    { n: 16, s: "成就大業．名利雙收", r: "吉" },
    { n: 17, s: "有貴人助．可得成功", r: "吉" },
    { n: 18, s: "順利昌隆．百事亨通", r: "吉" },
    { n: 19, s: "內外不合．障礙重重", r: "凶" },
    { n: 20, s: "歷盡艱難．焦心憂勞", r: "凶" },
    { n: 21, s: "專心經營．善用智能", r: "吉" },
    { n: 22, s: "懷才不遇．事不如意", r: "凶" },
    { n: 23, s: "名顯四方．終成大業", r: "吉" },
    { n: 24, s: "須靠自力．能奏大功", r: "吉" },
    { n: 25, s: "天時地利．再得人格", r: "吉" },
    { n: 26, s: "波瀾起伏．凌駕萬難", r: "凶" },
    { n: 27, s: "一盛一衰．可守成功", r: "凶帶吉" },
    { n: 29, s: "青雲直上．才略奏功", r: "吉" },
    { n: 30, s: "吉凶參半．得失相伴", r: "凶" },
    { n: 31, s: "名利雙收．大業成就", r: "吉" },
    { n: 32, s: "池中之龍．成功可望", r: "吉" },
    { n: 33, s: "智能慎始．必可昌隆", r: "吉" },
    { n: 34, s: "災難不絕．難望成功", r: "凶" },
    { n: 35, s: "中吉之數．進退保守", r: "吉" },
    { n: 36, s: "波瀾重疊．常陷窮困", r: "凶" },
    { n: 37, s: "逢凶化吉．風調雨順", r: "吉" },
    { n: 38, s: "名雖可得．利則難獲", r: "凶帶吉" },
    { n: 39, s: "光明坦途．指日可待", r: "吉" },
    { n: 40, s: "一盛一衰．浮沉不定", r: "吉帶凶" },
    { n: 41, s: "天賦吉運．前途無限", r: "吉" },
    { n: 42, s: "事業不專．十九不成", r: "吉帶凶" },
    { n: 43, s: "忍耐自重．轉凶為吉", r: "吉帶凶" },
    { n: 44, s: "事難遂願．貪功好進", r: "凶" },
    { n: 45, s: "綠葉發枝．一舉成名", r: "吉" },
    { n: 46, s: "坎坷不平．艱難重重", r: "凶" },
    { n: 47, s: "有貴人助．可成大業", r: "吉" },
    { n: 48, s: "名利俱全．繁榮富貴", r: "吉" },
    { n: 49, s: "遇吉則吉．遇凶則凶", r: "凶" },
    { n: 50, s: "吉凶互見．一成一敗", r: "吉帶凶" },
    { n: 51, s: "一盛一衰．浮沉不常", r: "吉帶凶" },
    { n: 52, s: "雨過天青．即獲成功", r: "吉" },
    { n: 53, s: "盛衰參半．先吉後凶", r: "吉帶凶" },
    { n: 54, s: "雖傾全力．難望成功", r: "凶" },
    { n: 55, s: "外觀隆昌．內隱禍患", r: "吉帶凶" },
    { n: 56, s: "事與願違．終難成功", r: "凶" },
    { n: 57, s: "努力經營．時來運轉", r: "吉" },
    { n: 58, s: "浮沉多端．始凶終吉", r: "凶帶吉" },
    { n: 59, s: "遇事猶疑．難望成事", r: "凶" },
    { n: 60, s: "心迷意亂．難定方針", r: "凶" },
    { n: 61, s: "雲遮半月．百隱風波", r: "吉帶凶" },
    { n: 62, s: "煩悶懊惱．事事難展", r: "凶" },
    { n: 63, s: "萬物化育．繁榮之象", r: "吉" },
    { n: 64, s: "十九不成．徒勞無功", r: "凶" },
    { n: 65, s: "吉運自來．能享盛名", r: "吉" },
    { n: 66, s: "內外不和．信用缺乏", r: "凶" },
    { n: 67, s: "事事如意．富貴自來", r: "吉" },
    { n: 68, s: "不失先機．可望成功", r: "吉" },
    { n: 69, s: "動搖不安．常陷逆境", r: "凶" },
    { n: 70, s: "慘淡經營．難免貧困", r: "凶" },
    { n: 71, s: "吉凶參半．惟賴勇氣", r: "吉帶凶" },
    { n: 72, s: "得而復失．難以安順", r: "凶" },
    { n: 73, s: "安樂自來．自然吉祥", r: "吉" },
    { n: 74, s: "如無智謀．難望成功", r: "凶" },
    { n: 75, s: "吉中帶凶．進不如守", r: "吉帶凶" },
    { n: 76, s: "此數大凶．破產之象", r: "凶" },
    { n: 77, s: "先苦後甘．不致失敗", r: "吉帶凶" },
    { n: 78, s: "有得有失．華而不實", r: "吉帶凶" },
    { n: 79, s: "前途無光．希望不大", r: "凶" },
    { n: 80, s: "得而復失．枉費心機", r: "吉帶凶" },
    { n: 81, s: "最極之數．能得成功", r: "吉" },
  ];

  const mapPlateTo吉吉 = (plate) => {
    const num = parseInt(plate.replace(/[^0-9]/g, ""));
    return {
      plate,
      num,
      n1: num % 80,
      n2: [...num.toString()].reduce((sum, char) => sum + +char, 0),
    };
  };

  const map吉吉ToStr = (x) => {
    const 車牌 = x.plate;
    const 吉1 = 吉列表.filter((t) => t.n === x.n1).map((t) => `${t.s} (${t.r})`);
    const 吉2 = 吉列表.filter((t) => t.n === x.n2).map((t) => `${t.s} (${t.r})`);
    return `${車牌}: ${吉1} | ${吉2}`;
  };

  const isPrime = (num) => {
    for (let i = 2, s = Math.sqrt(num); i <= s; i++)
      if (num % i === 0) return false;
    return num > 1;
  };

  const shuffle = (arr) => {
    const array = [...arr];
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const filter吉吉 = (吉吉, callbackFn = (吉凶) => 吉凶 === "吉") => {
    const 吉列表n = 吉列表.filter((x) => callbackFn(x.r)).map((x) => x.n);
    return 吉列表n.includes(吉吉.n1) && 吉列表n.includes(吉吉.n2);
  };

  const random吉吉s = (
    top = undefined,
    callbackFn = (吉吉) => filter吉吉(吉吉)
  ) => shuffle(吉吉s.filter(callbackFn)).slice(0, top);

  const print吉吉s = (
    top = undefined,
    callbackFn = (吉吉) => filter吉吉(吉吉)
  ) => console.log(random吉吉s(top, callbackFn).map(map吉吉ToStr).join("\n"));

  const alert吉吉s = (
    top = undefined,
    callbackFn = (吉吉) => filter吉吉(吉吉)
  ) => {
    const result = random吉吉s(top, callbackFn);
    Swal.fire({
      title: "車牌選號",
      html: result.length === 0 ? "揣無" : result.map(map吉吉ToStr).join("<br>"),
      confirmButtonText: "繼續",
      cancelButtonText: "結束",
      showCancelButton: true,
      width: 560,
    }).then((swResult) => swResult.isConfirmed && alert吉吉s(top, callbackFn));
  };

  const plates = JSON.parse(localStorage.getItem("plates") || "[]");
  吉吉s = plates.map(mapPlateTo吉吉);

  window.吉車牌 = { plates, 吉列表, isPrime, filter吉吉, print吉吉s, alert吉吉s, };

  if (plates) {
    localStorage.removeItem("plates");

    console.log(`Usage: window.吉車牌.alert吉吉s(5);`);
    alert吉吉s(5);

    console.log(`Usage: window.吉車牌.print吉吉s(5, (x) => window.吉車牌.filter吉吉(x) && window.吉車牌.isPrime(x.num) && x.plate.includes("87"));`);
    print吉吉s(5, (x) => filter吉吉(x) && isPrime(x.num) && x.plate.includes("87"));
  }
}
