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

const get = () => JSON.parse(localStorage.getItem("plates") || "[]");
const set = (plates) => localStorage.setItem("plates", JSON.stringify(plates));
const remove = () => localStorage.removeItem("plates");
const query = () =>
  Array.from(document.querySelectorAll(".number_cell .number")).map(
    (x) => x.innerText
  );

let 吉吉s = [
  {
    plate: "ABC-8787",
    num: 8787,
    num1: 8787 % 80,
    num2: [..."8787"].reduce((sum, char) => sum + +char, 0),
  },
].slice(0, 0);

try {
  set(get().concat(query()));
  document.querySelector("#next").click();
} catch (e) {
  console.debug(e);

  // http://irene.cgu.edu.tw/ireneweb/tel.htm
  // https://ychsiaoe.pixnet.net/blog/post/4663116
  const 吉祥如意表 = [
    { n: 1, s: "大展鴻圖．信用得固．無遠弗界．可獲成功", r: "吉" },
    { n: 2, s: "根基不固．搖搖欲墜．一盛一衰．勞而無功", r: "凶" },
    { n: 3, s: "根深蒂固．蒸蒸日上．如意吉祥．百事順遂", r: "吉" },
    { n: 4, s: "坎坷前途．苦難折磨．非有毅力．難望成功", r: "凶" },
    { n: 5, s: "陰陽和合．生意欣榮．名利雙收．後福重重", r: "吉" },
    { n: 6, s: "萬寶雲集．天降幸運．立志奮發．可成大功", r: "吉" },
    { n: 7, s: "專心經營．和氣致祥．排除萬難．必獲成功", r: "吉" },
    { n: 8, s: "努力發達．貫徹志望．不忘進退．成功可期", r: "吉" },
    { n: 9, s: "雖抱奇才．有才無命．獨營無力．財利無望", r: "凶" },
    { n: 10, s: "烏雲遮月．暗淡無光．空費心力．徒勞無功", r: "凶" },
    { n: 11, s: "草木逢春．枯葉沾露．穩健著實．必得人望", r: "吉" },
    { n: 12, s: "薄弱無力．孤立無搖．外祥內苦．謀事難成", r: "凶" },
    { n: 13, s: "天賦吉運．能得人望．善用智慧．必獲成功", r: "吉" },
    { n: 14, s: "忍得苦難．必有後福．是成是敗．惟靠堅毅", r: "凶" },
    { n: 15, s: "謙恭做事．必得人和．大事成就．一定興隆", r: "吉" },
    { n: 16, s: "能獲眾望．成就大業．名利雙收．盟主四方", r: "吉" },
    { n: 17, s: "排除萬難．有貴人助．把握時機．可得成功", r: "吉" },
    { n: 18, s: "經商做事．順利昌隆．如能慎始．百事亨通", r: "吉" },
    { n: 19, s: "成功雖早．慎防空虧．內外不合．障礙重重", r: "凶" },
    { n: 20, s: "智高志大．歷盡艱難．焦心憂勞．進退兩難", r: "凶" },
    { n: 21, s: "專心經營．善用智慧．霜雪梅花．春來怒放", r: "吉" },
    { n: 22, s: "秋草逢霜．懷才不遇．憂愁怨苦．事不如意", r: "凶" },
    { n: 23, s: "旭日昇天．名顯四方．漸次進展．終成大業", r: "吉" },
    { n: 24, s: "錦繡前程．須靠自力．多用智謀．能奏大功", r: "吉" },
    { n: 25, s: "天時地利．再得人格．講信修睦．即可成功", r: "吉" },
    { n: 26, s: "波瀾起伏．千變萬化．凌駕萬難．必可成功", r: "凶" },
    { n: 27, s: "一成一敗．一盛一衰．惟靠謹慎．可守成功", r: "凶帶吉" },
    { n: 28, s: "魚臨旱地．難逃惡運．此數大凶．不如更名", r: "凶" },
    { n: 29, s: "如龍得雲．青雲直上．智謀奮進．才略奏功", r: "吉" },
    { n: 30, s: "吉凶參半．得失相伴．投機取巧．如賽一樣", r: "凶" },
    { n: 31, s: "此數大吉．名利雙收．漸進向上．大業成就", r: "吉" },
    { n: 32, s: "池中之龍．風雲際會．一躍上天．成功可望", r: "吉" },
    { n: 33, s: "不可意氣．善用智慧．如能慎始．必可昌隆", r: "吉" },
    { n: 34, s: "災難不絕．難望成功．此數大凶．不如更名", r: "凶" },
    { n: 35, s: "中吉之數．進退保守．生意安穩．成就可期", r: "吉" },
    { n: 36, s: "波瀾重疊．常陷窮困．動不如靜．有才無命", r: "凶" },
    { n: 37, s: "逢凶化吉．吉人天相．風調雨順．生意興隆", r: "吉" },
    { n: 38, s: "名雖可得．利則難獲．藝界發展．可望成功", r: "凶帶吉" },
    { n: 39, s: "雲開見月．雖有勞碌．光明坦途．指日可期", r: "吉" },
    { n: 40, s: "一盛一衰．浮沉不定．知難而退．自獲天佑", r: "吉帶凶" },
    { n: 41, s: "天賦吉運．德望兼備．繼續努力．前途無限", r: "吉" },
    { n: 42, s: "事業不專．十九不成．專心進取．可望成功", r: "吉帶凶" },
    { n: 43, s: "雨夜之花．外祥內苦．忍耐自重．轉凶為吉", r: "吉帶凶" },
    { n: 44, s: "雖用心計．事難遂願．貪功好進．必招失敗", r: "凶" },
    { n: 45, s: "楊柳遇春．綠葉發枝．沖破難關．一舉成名", r: "吉" },
    { n: 46, s: "坎坷不平．艱難重重．若無耐心．難望有成", r: "凶" },
    { n: 47, s: "有貴人助．可成大業．雖遇不幸．浮沉不大", r: "吉" },
    { n: 48, s: "美化豐實．鶴立雞群．名利俱全．繁榮富貴", r: "吉" },
    { n: 49, s: "遇吉則吉．遇凶則凶．惟靠謹慎．逢凶化吉", r: "凶" },
    { n: 50, s: "吉凶互見．一成一敗．凶中有吉．吉中有凶", r: "吉帶凶" },
    { n: 51, s: "一盛一衰．浮沉不常．自重自處．可保平安", r: "吉帶凶" },
    { n: 52, s: "草木逢春．雨過天晴．渡過難關．即獲成功", r: "吉" },
    { n: 53, s: "盛衰參半．外祥內苦．先吉後凶．先凶後吉", r: "吉帶凶" },
    { n: 54, s: "雖傾全力．難望成功．此數大凶．最好改名", r: "凶" },
    { n: 55, s: "外觀隆昌．內隱禍患．克服難關．開出泰運", r: "吉帶凶" },
    { n: 56, s: "事與願違．終難成功．欲速不達．有始有終", r: "凶" },
    { n: 57, s: "努力經營．時來運轉．曠野枯草．春來花開", r: "吉" },
    { n: 58, s: "半凶半吉．浮沉多端．始凶終吉．能保成功", r: "凶帶吉" },
    { n: 59, s: "遇事猶疑．難望成事．大刀闊斧．始可有成", r: "凶" },
    { n: 60, s: "黑暗無光．心迷意亂．出爾反爾．難定方針", r: "凶" },
    { n: 61, s: "雲遮半月．百隱風波．應自謹慎．始保平安", r: "吉帶凶" },
    { n: 62, s: "煩悶懊惱．事事難展．自防災禍．始免困境", r: "凶" },
    { n: 63, s: "萬物化育．繁榮之象．專心一意．始能成功", r: "吉" },
    { n: 64, s: "見異思遷．十九不成．徒勞無功．不如更名", r: "凶" },
    { n: 65, s: "吉運自來．能享盛名．把握機會．必獲成功", r: "吉" },
    { n: 66, s: "黑夜漫長．進退維谷．內外不和．信用缺乏", r: "凶" },
    { n: 67, s: "時來運轉．事事如意．功成名就．富貴自來", r: "吉" },
    { n: 68, s: "思慮周詳．計劃力行．不失先機．可望成功", r: "吉" },
    { n: 69, s: "動搖不安．常陷逆境．不得時運．難得利潤", r: "凶" },
    { n: 70, s: "慘淡經營．難免貧困．此數不吉．最好改名", r: "凶" },
    { n: 71, s: "吉凶參半．惟賴勇氣．貫徹力行．始可成功", r: "吉帶凶" },
    { n: 72, s: "利害混集．凶多吉少．得而復失．難以安順", r: "凶" },
    { n: 73, s: "安樂自來．自然吉祥．力行不懈．終必成功", r: "吉" },
    { n: 74, s: "利不及費．坐食山空．如無智謀．難望成功", r: "凶" },
    { n: 75, s: "吉中帶凶．欲速不達．進不如守．可保安祥", r: "吉帶凶" },
    { n: 76, s: "此數大凶．破產之象．宜速改名．以避厄運", r: "凶" },
    { n: 77, s: "先苦後甘．先甘後苦．如能守成．不致失敗", r: "吉帶凶" },
    { n: 78, s: "有得有失．華而不實．須防劫財．始保平安", r: "吉帶凶" },
    { n: 79, s: "如走夜路．前途無光．希望不大．勞而無功", r: "凶" },
    { n: 80, s: "得而復失．枉費心機．守成無貪．可保安穩", r: "吉帶凶" },
    { n: 81, s: "最極之數．還本歸元．能得繁業．發達成功", r: "吉" },
  ];

  const mapPlateTo吉吉 = (plate) => {
    const num = parseInt(plate.replace(/[^0-9]/g, ""));
    return {
      plate,
      num,
      num1: num % 80,
      num2: [...num.toString()].reduce((sum, char) => sum + +char, 0),
    };
  };

  const map吉吉ToStr = (吉吉) => {
    const 吉1 = 吉祥如意表.filter((t) => t.n === 吉吉.num1).map((t) => `${t.s} (${t.r})`);
    const 吉2 = 吉祥如意表.filter((t) => t.n === 吉吉.num2).map((t) => `${t.s} (${t.r})`);
    return `${吉吉.plate}: ${吉1} | ${吉2}`;
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
    const 吉列表n = 吉祥如意表.filter((x) => callbackFn(x.r)).map((x) => x.n);
    return 吉列表n.includes(吉吉.num1) && 吉列表n.includes(吉吉.num2);
  };

  const print吉吉s = (
    top = undefined,
    callbackFn = (吉吉) => filter吉吉(吉吉)
  ) => console.log(吉吉s.filter(callbackFn).slice(0, top).map(map吉吉ToStr).join("\n"));

  const random吉吉s = (
    top = undefined,
    callbackFn = (吉吉) => filter吉吉(吉吉)
  ) => shuffle(吉吉s.filter(callbackFn)).slice(0, top);

  const alert吉吉s = (
    top = undefined,
    callbackFn = (吉吉) => filter吉吉(吉吉)
  ) => {
    const result = random吉吉s(top, callbackFn);
    Swal.fire({
      title: "吉車牌",
      html:
        result.length > 0
          ? `<code>${result.map(map吉吉ToStr).join("<br>")}</code>`
          : "揣無",
      confirmButtonText: "繼續",
      cancelButtonText: "結束",
      showCancelButton: true,
      allowOutsideClick: false,
      width: result.length > 0 ? "66em" : undefined,
    }).then((swResult) => swResult.isConfirmed && alert吉吉s(top, callbackFn));
  };

  const plates = get();
  吉吉s = plates.map(mapPlateTo吉吉);

  window.吉車牌 = { plates, 吉祥如意表, isPrime, filter吉吉, print吉吉s, alert吉吉s, };

  if (plates.length > 0) {
    remove();

    console.log(`Usage: window.吉車牌.alert吉吉s(10);`);
    alert吉吉s(10);

    console.log(`Usage: window.吉車牌.print吉吉s(undefined, (x) => window.吉車牌.filter吉吉(x) && window.吉車牌.isPrime(x.num) && x.plate.includes("87"));`);
    print吉吉s(undefined, (x) => filter吉吉(x) && isPrime(x.num) && x.plate.includes("87"));
  }
}
