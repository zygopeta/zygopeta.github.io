/* ============================================================
 * 六级词汇每日翻卡 · 全站共享组件
 * 用法：在页面 </body> 前加 <script src="cet6.js"></script>
 * （manuscript/ 子目录用 <script src="../cet6.js"></script>）
 * 进度存 localStorage（cet6_v1 / cet6_hist），与 c-learner 页共用。
 * ============================================================ */
(function () {
  "use strict";
  if (window.__CET6_LOADED__) return;   /* 防止重复加载 */
  window.__CET6_LOADED = 1;

  var CET6 = [
{w:"abandon",p:"əˈbændən",t:"v.",c:"放弃；抛弃",e:"They abandoned the plan at the last minute.",ec:"他们最后一刻放弃了这个计划。"},
{w:"abstract",p:"ˈæbstrækt",t:"adj.",c:"抽象的；深奥的",e:"Beauty is an abstract concept.",ec:"美是一个抽象的概念。"},
{w:"accumulate",p:"əˈkjuːmjəleɪt",t:"v.",c:"积累；积聚",e:"Dust accumulated on the shelves.",ec:"灰尘在架子上积了起来。"},
{w:"acquire",p:"əˈkwaɪə",t:"v.",c:"获得；习得",e:"Children acquire language very quickly.",ec:"儿童习得语言非常快。"},
{w:"adapt",p:"əˈdæpt",t:"v.",c:"适应；改编",e:"She adapted quickly to the new job.",ec:"她很快适应了新工作。"},
{w:"adequate",p:"ˈædɪkwət",t:"adj.",c:"足够的；适当的",e:"The room has adequate light for reading.",ec:"这房间光线够读书。"},
{w:"advocate",p:"ˈædvəkeɪt",t:"v.",c:"提倡；主张",e:"He advocates a simple lifestyle.",ec:"他提倡简单的生活方式。"},
{w:"aggregate",p:"ˈæɡrɪɡət",t:"n.",c:"总计；集合体",e:"The aggregate of the data is impressive.",ec:"这些数据的总和很可观。"},
{w:"allocate",p:"ˈæləkeɪt",t:"v.",c:"分配；拨给",e:"We must allocate more funds to research.",ec:"我们必须给研究多拨经费。"},
{w:"ambiguous",p:"æmˈbɪɡjuəs",t:"adj.",c:"模糊的；有歧义的",e:"His answer was deliberately ambiguous.",ec:"他的回答故意含糊。"},
{w:"anticipate",p:"ænˈtɪsɪpeɪt",t:"v.",c:"预料；期待",e:"We anticipate a rise in prices.",ec:"我们预计价格会上涨。"},
{w:"arbitrary",p:"ˈɑːbɪtrəri",t:"adj.",c:"任意的；专断的",e:"The choice seemed completely arbitrary.",ec:"这个选择看起来完全是随意的。"},
{w:"assemble",p:"əˈsembl",t:"v.",c:"组装；集合",e:"Workers assemble the parts by hand.",ec:"工人手工组装这些零件。"},
{w:"assess",p:"əˈses",t:"v.",c:"评估；评定",e:"It takes time to assess the damage.",ec:"评估损失需要时间。"},
{w:"assume",p:"əˈsjuːm",t:"v.",c:"假定；承担",e:"I assume you have read the report.",ec:"我假定你已经读过报告了。"},
{w:"attain",p:"əˈteɪn",t:"v.",c:"达到；获得",e:"She attained her goal at last.",ec:"她终于达到了目标。"},
{w:"attribute",p:"əˈtrɪbjuːt",t:"v.",c:"把……归因于",e:"He attributes his success to hard work.",ec:"他把成功归因于努力。"},
{w:"authentic",p:"ɔːˈθentɪk",t:"adj.",c:"真正的；可靠的",e:"Experts say the painting is authentic.",ec:"专家说这幅画是真迹。"},
{w:"bulk",p:"bʌlk",t:"n.",c:"大批；大部分",e:"The bulk of the work is already done.",ec:"大部分工作已经完成。"},
{w:"capacity",p:"kəˈpæsəti",t:"n.",c:"容量；能力",e:"The theatre has a capacity of 800.",ec:"这个剧院能容纳八百人。"},
{w:"cease",p:"siːs",t:"v.",c:"停止；终止",e:"The rain finally ceased at noon.",ec:"雨在中午终于停了。"},
{w:"coherent",p:"kəʊˈhɪərənt",t:"adj.",c:"连贯的；有条理的",e:"Give a coherent account of what happened.",ec:"有条理地叙述发生了什么。"},
{w:"collapse",p:"kəˈlæps",t:"v.",c:"倒塌；崩溃",e:"The old bridge collapsed in the flood.",ec:"那座旧桥在洪水中塌了。"},
{w:"commence",p:"kəˈmens",t:"v.",c:"开始；着手",e:"The ceremony will commence at nine.",ec:"仪式将在九点开始。"},
{w:"compatible",p:"kəmˈpætəbl",t:"adj.",c:"兼容的；相容的",e:"This printer is compatible with most computers.",ec:"这台打印机兼容大多数电脑。"},
{w:"compensate",p:"ˈkɒmpenseɪt",t:"v.",c:"补偿；弥补",e:"Nothing can compensate for that loss.",ec:"什么都无法弥补那个损失。"},
{w:"compile",p:"kəmˈpaɪl",t:"v.",c:"编译；汇编；编纂",e:"The compiler turns source code into machine code.",ec:"编译器把源码翻译成机器码。"},
{w:"complement",p:"ˈkɒmplɪment",t:"v.",c:"补充；与……相配",e:"The wine complements the meal perfectly.",ec:"这酒与这顿饭搭配得极好。"},
{w:"comply",p:"kəmˈplaɪ",t:"v.",c:"遵守；服从",e:"All staff must comply with the safety rules.",ec:"所有员工必须遵守安全规定。"},
{w:"comprehensive",p:"ˌkɒmprɪˈhensɪv",t:"adj.",c:"全面的；综合的",e:"The report gives a comprehensive survey.",ec:"这份报告作了全面的考察。"},
{w:"comprise",p:"kəmˈpraɪz",t:"v.",c:"包含；由……组成",e:"The course comprises ten modules.",ec:"这门课由十个模块组成。"},
{w:"conceive",p:"kənˈsiːv",t:"v.",c:"构想；设想",e:"It is hard to conceive of such a world.",ec:"很难想象这样一个世界。"},
{w:"concise",p:"kənˈsaɪs",t:"adj.",c:"简洁的；简明的",e:"Keep your answer as concise as possible.",ec:"回答尽可能简洁。"},
{w:"condense",p:"kənˈdens",t:"v.",c:"浓缩；压缩",e:"He condensed the report into one page.",ec:"他把报告压缩成了一页。"},
{w:"confine",p:"kənˈfaɪn",t:"v.",c:"限制；局限于",e:"Please confine your remarks to the topic.",ec:"请把发言限制在主题之内。"},
{w:"conform",p:"kənˈfɔːm",t:"v.",c:"符合；遵从",e:"The product must conform to national standards.",ec:"产品必须符合国家标准。"},
{w:"consecutive",p:"kənˈsekjətɪv",t:"adj.",c:"连续的；连贯的",e:"It rained for five consecutive days.",ec:"连续下了五天雨。"},
{w:"considerable",p:"kənˈsɪdərəbl",t:"adj.",c:"相当大的；可观的",e:"He spent a considerable amount of time on it.",ec:"他在那上面花了相当多时间。"},
{w:"constitute",p:"ˈkɒnstɪtjuːt",t:"v.",c:"构成；组成",e:"Women constitute half of the workforce.",ec:"女性占劳动力的一半。"},
{w:"constrain",p:"kənˈstreɪn",t:"v.",c:"约束；限制",e:"Limited funds constrain our plans.",ec:"有限的资金限制了我们的计划。"},
{w:"consult",p:"kənˈsʌlt",t:"v.",c:"咨询；查阅",e:"Consult a doctor if symptoms persist.",ec:"症状持续的话请咨询医生。"},
{w:"consume",p:"kənˈsjuːm",t:"v.",c:"消耗；消费",e:"This engine consumes very little fuel.",ec:"这台发动机耗油很少。"},
{w:"contemporary",p:"kənˈtemprəri",t:"adj.",c:"当代的；同时代的",e:"She studies contemporary Chinese art.",ec:"她研究中国当代艺术。"},
{w:"contradict",p:"ˌkɒntrəˈdɪkt",t:"v.",c:"反驳；与……矛盾",e:"The results contradict his theory.",ec:"结果与他的理论相矛盾。"},
{w:"convert",p:"kənˈvɜːt",t:"v.",c:"转换；改变",e:"Solar panels convert light into electricity.",ec:"太阳能板把光转化成电。"},
{w:"convey",p:"kənˈveɪ",t:"v.",c:"传达；运送",e:"Words cannot convey my gratitude.",ec:"言语无法表达我的感谢。"},
{w:"crucial",p:"ˈkruːʃl",t:"adj.",c:"关键的；决定性的",e:"Timing is crucial in this experiment.",ec:"在这个实验里时机至关重要。"},
{w:"cumulative",p:"ˈkjuːmjələtɪv",t:"adj.",c:"累积的；累计的",e:"The cumulative effect is enormous.",ec:"累积起来的效应是巨大的。"},
{w:"decay",p:"dɪˈkeɪ",t:"v.",c:"腐烂；衰减",e:"The signal decays quickly over distance.",ec:"信号随距离迅速衰减。"},
{w:"deduce",p:"dɪˈdjuːs",t:"v.",c:"推断；演绎",e:"We deduced the answer from the data.",ec:"我们从数据推断出了答案。"},
{w:"deficient",p:"dɪˈfɪʃnt",t:"adj.",c:"缺乏的；不足的",e:"The soil here is deficient in nitrogen.",ec:"这里的土壤缺氮。"},
{w:"deliberate",p:"dɪˈlɪbərət",t:"adj.",c:"故意的；审慎的",e:"It was a deliberate mistake, not an accident.",ec:"那是故意的错误，不是意外。"},
{w:"denote",p:"dɪˈnəʊt",t:"v.",c:"表示；意指",e:"In this formula, I denotes current.",ec:"在这个公式里，I 表示电流。"},
{w:"derive",p:"dɪˈraɪv",t:"v.",c:"得到；起源于",e:"The word derives from Latin.",ec:"这个词源自拉丁语。"},
{w:"deteriorate",p:"dɪˈtɪəriəreɪt",t:"v.",c:"恶化；变坏",e:"His health deteriorated rapidly.",ec:"他的健康迅速恶化。"},
{w:"deviate",p:"ˈdiːvieɪt",t:"v.",c:"偏离；背离",e:"Do not deviate from the original plan.",ec:"不要偏离原定计划。"},
{w:"diminish",p:"dɪˈmɪnɪʃ",t:"v.",c:"减少；削弱",e:"The pain gradually diminished.",ec:"疼痛逐渐减轻了。"},
{w:"discrete",p:"dɪˈskriːt",t:"adj.",c:"离散的；分立的",e:"The signal is discrete, not continuous.",ec:"这个信号是离散的，不是连续的。"},
{w:"disperse",p:"dɪˈspɜːs",t:"v.",c:"驱散；散开",e:"The crowd dispersed after the show.",ec:"演出结束后人群散开了。"},
{w:"displace",p:"dɪsˈpleɪs",t:"v.",c:"取代；使移位",e:"Machines have displaced many manual workers.",ec:"机器取代了许多体力工人。"},
{w:"dispose",p:"dɪˈspəʊz",t:"v.",c:"处理；处置",e:"Dispose of the waste properly.",ec:"要妥善处理这些废物。"},
{w:"distinct",p:"dɪˈstɪŋkt",t:"adj.",c:"明显的；截然不同的",e:"There are two distinct groups of users.",ec:"有两类明显不同的用户。"},
{w:"distort",p:"dɪˈstɔːt",t:"v.",c:"扭曲；使失真",e:"High temperature distorts the image.",ec:"高温使图像失真。"},
{w:"diverge",p:"daɪˈvɜːdʒ",t:"v.",c:"分叉；产生分歧",e:"Our opinions diverged sharply.",ec:"我们的意见产生了很大分歧。"},
{w:"dominate",p:"ˈdɒmɪneɪt",t:"v.",c:"支配；占优势",e:"One company dominates the whole market.",ec:"一家公司主导了整个市场。"},
{w:"drastic",p:"ˈdræstɪk",t:"adj.",c:"剧烈的；极端的",e:"The doctor took drastic measures.",ec:"医生采取了激烈的措施。"},
{w:"elaborate",p:"ɪˈlæbərət",t:"adj.",c:"精心制作的；详尽的",e:"He made up an elaborate excuse.",ec:"他编了一个精心设计的借口。"},
{w:"eligible",p:"ˈelɪdʒəbl",t:"adj.",c:"有资格的；合适的",e:"Only second-year students are eligible to apply.",ec:"只有二年级学生有资格申请。"},
{w:"eliminate",p:"ɪˈlɪmɪneɪt",t:"v.",c:"消除；淘汰",e:"We must eliminate all possible errors.",ec:"我们必须消除所有可能的错误。"},
{w:"emerge",p:"ɪˈmɜːdʒ",t:"v.",c:"出现；浮现",e:"New problems emerged during the test.",ec:"测试过程中出现了新问题。"},
{w:"empirical",p:"ɪmˈpɪrɪkl",t:"adj.",c:"经验的；实证的",e:"The theory lacks empirical support.",ec:"这个理论缺乏实证支持。"},
{w:"endure",p:"ɪnˈdjʊə",t:"v.",c:"忍受；持续",e:"She endured years of hardship.",ec:"她忍受了多年的艰辛。"},
{w:"enhance",p:"ɪnˈhɑːns",t:"v.",c:"增强；提高",e:"Good lighting enhances the photograph.",ec:"好的光线提升了照片效果。"},
{w:"entail",p:"ɪnˈteɪl",t:"v.",c:"需要；牵涉",e:"The job entails a lot of travelling.",ec:"这份工作需要经常出差。"},
{w:"equivalent",p:"ɪˈkwɪvələnt",t:"adj.",c:"等价的；相当的",e:"One mile is equivalent to about 1.6 km.",ec:"一英里约等于一点六公里。"},
{w:"establish",p:"ɪˈstæblɪʃ",t:"v.",c:"建立；确立",e:"They established a new research lab.",ec:"他们建立了一个新的研究实验室。"},
{w:"evaluate",p:"ɪˈvæljueɪt",t:"v.",c:"评价；评估",e:"We need to evaluate the results carefully.",ec:"我们需要仔细评估结果。"},
{w:"evolve",p:"ɪˈvɒlv",t:"v.",c:"演化；逐步发展",e:"The system evolved over many years.",ec:"这个系统经过多年逐步演化。"},
{w:"exceed",p:"ɪkˈsiːd",t:"v.",c:"超过；超出",e:"Do not exceed the speed limit.",ec:"不要超过限速。"},
{w:"explicit",p:"ɪkˈsplɪsɪt",t:"adj.",c:"明确的；清楚的",e:"She gave explicit instructions before leaving.",ec:"她走之前给了明确指示。"},
{w:"exploit",p:"ɪkˈsplɔɪt",t:"v.",c:"利用；开发",e:"We should exploit this opportunity fully.",ec:"我们应该充分利用这个机会。"},
{w:"extract",p:"ɪkˈstrækt",t:"v.",c:"提取；摘录",e:"Extract the key points from the text.",ec:"从文中提取要点。"},
{w:"feasible",p:"ˈfiːzəbl",t:"adj.",c:"可行的；行得通的",e:"The plan is technically feasible.",ec:"这个计划在技术上可行。"},
{w:"fluctuate",p:"ˈflʌktʃueɪt",t:"v.",c:"波动；起伏",e:"Prices fluctuate with demand.",ec:"价格随需求波动。"},
{w:"formulate",p:"ˈfɔːmjuleɪt",t:"v.",c:"制定；系统表述",e:"They formulated a new policy last year.",ec:"他们去年制定了新政策。"},
{w:"fundamental",p:"ˌfʌndəˈmentl",t:"adj.",c:"基本的；根本的",e:"This is a fundamental principle of physics.",ec:"这是物理学的一条基本原理。"},
{w:"generate",p:"ˈdʒenəreɪt",t:"v.",c:"产生；发生",e:"The motor generates electricity when turned.",ec:"这个马达被转动时就能发电。"},
{w:"genuine",p:"ˈdʒenjuɪn",t:"adj.",c:"真正的；真诚的",e:"She showed genuine interest in the topic.",ec:"她对这个话题表现出真正的兴趣。"},
{w:"hierarchy",p:"ˈhaɪərɑːki",t:"n.",c:"层级；等级制度",e:"The company has a very flat hierarchy.",ec:"这家公司的层级非常扁平。"},
{w:"identical",p:"aɪˈdentɪkl",t:"adj.",c:"完全相同的",e:"The two samples are almost identical.",ec:"这两个样品几乎完全相同。"},
{w:"illuminate",p:"ɪˈluːmɪneɪt",t:"v.",c:"照亮；阐明",e:"The results illuminate the whole process.",ec:"这些结果阐明了整个过程。"},
{w:"imply",p:"ɪmˈplaɪ",t:"v.",c:"暗示；意味着",e:"Silence does not imply consent.",ec:"沉默并不意味着同意。"},
{w:"impose",p:"ɪmˈpəʊz",t:"v.",c:"强加；征收",e:"They imposed new taxes on imports.",ec:"他们对进口商品征收了新税。"},
{w:"incorporate",p:"ɪnˈkɔːpəreɪt",t:"v.",c:"包含；纳入",e:"Incorporate these changes into the design.",ec:"把这些改动纳入设计之中。"},
{w:"indicate",p:"ˈɪndɪkeɪt",t:"v.",c:"表明；指示",e:"The data indicate a clear upward trend.",ec:"数据表明了一个明显的上升趋势。"},
{w:"induce",p:"ɪnˈdjuːs",t:"v.",c:"引起；诱导",e:"Long-term stress can induce illness.",ec:"长期压力会引起疾病。"},
{w:"inevitable",p:"ɪnˈevɪtəbl",t:"adj.",c:"不可避免的",e:"Change is inevitable in any system.",ec:"任何系统里变化都不可避免。"},
{w:"infer",p:"ɪnˈfɜː",t:"v.",c:"推断；推论",e:"We can infer the value from the graph.",ec:"我们可以从图中推断出数值。"},
{w:"inherent",p:"ɪnˈhɪərənt",t:"adj.",c:"固有的；内在的",e:"There are inherent risks in this approach.",ec:"这种方法存在固有风险。"},
{w:"inhibit",p:"ɪnˈhɪbɪt",t:"v.",c:"抑制；阻止",e:"Fear of failure can inhibit learning.",ec:"对失败的恐惧会抑制学习。"}
  ];

  /* ---------- 样式（自带，不依赖页面变量） ---------- */
  var CSS = `
  .cet6-panel{display:none;position:fixed;left:50%;transform:translateX(-50%);
    bottom:80px;width:min(92vw,340px);z-index:99998;
    background:#fff;border:1px solid #e3e9f6;border-radius:16px;
    padding:16px 15px 13px;box-shadow:0 18px 48px -14px rgba(23,34,84,.42);
    font-family:-apple-system,"Segoe UI","PingFang SC","Microsoft YaHei",sans-serif}
  .cet6-panel.open{display:block}
  .cet6-head{display:flex;align-items:center;justify-content:space-between;margin-bottom:9px}
  .cet6-title{font-size:13px;font-weight:800;letter-spacing:.04em;color:#1e2a4a;
    display:flex;align-items:center;gap:6px}
  .cet6-title::before{content:"";width:3px;height:13px;border-radius:2px;
    background:linear-gradient(180deg,#3563e9,#7c3aed)}
  .cet6-date{font-size:11px;color:#8d97ac;font-variant-numeric:tabular-nums}
  .cet6-dots{display:flex;gap:4px;margin-bottom:11px}
  .cet6-dots i{flex:1;height:4px;border-radius:2px;background:#e2e8f4;transition:background .3s}
  .cet6-dots i.on{background:#0eaf6e}
  .cet6-dots i.cur{background:#3563e9}
  .cet6-stage{height:152px;perspective:900px}
  .cet6-flip{position:relative;width:100%;height:100%;transform-style:preserve-3d;
    transition:transform .55s cubic-bezier(.2,.8,.3,1);cursor:pointer}
  .cet6-stage.flip .cet6-flip{transform:rotateY(180deg)}
  .cet6-face{position:absolute;inset:0;backface-visibility:hidden;-webkit-backface-visibility:hidden;
    border-radius:13px;display:flex;flex-direction:column;align-items:center;justify-content:center;
    padding:14px 12px;text-align:center}
  .cet6-front{background:linear-gradient(155deg,#eef2ff,#e6ebff);border:1px solid #d6dffb;
    box-shadow:0 6px 18px -12px rgba(53,86,224,.5)}
  .cet6-back{background:linear-gradient(155deg,#f0fbf6,#e4f6ee);border:1px solid #c6e8d6;
    transform:rotateY(180deg);box-shadow:0 6px 18px -12px rgba(14,159,110,.45)}
  .cet6-word{font-size:21px;font-weight:800;letter-spacing:-.3px;color:#25305c;line-height:1.3;word-break:break-word}
  .cet6-ph{font-size:11.5px;color:#7c88a8;margin-top:6px;font-family:Consolas,monospace}
  .cet6-pos{display:inline-block;font-size:10.5px;font-weight:700;color:#4a5fd0;background:#dfe5ff;
    border-radius:4px;padding:0 5px;margin-left:5px;vertical-align:1px}
  .cet6-hint{font-size:10.5px;color:#9aa4bb;margin-top:11px;letter-spacing:.05em}
  .cet6-cn{font-size:14.5px;font-weight:700;color:#0b6b4a;line-height:1.55}
  .cet6-ex{font-size:11px;color:#4e6b60;margin-top:9px;line-height:1.6;font-style:italic}
  .cet6-exc{font-size:10.5px;color:#7b8f87;margin-top:3px;line-height:1.55}
  .cet6-actions{display:flex;gap:7px;margin-top:11px}
  .cet6-btn{flex:1;border:1px solid #e3e9f6;background:#fff;color:#5b6b8c;
    border-radius:9px;padding:7px 0;font-size:12.5px;font-weight:700;cursor:pointer;
    font-family:inherit;transition:all .16s}
  .cet6-btn:hover{border-color:#c3cee6}
  .cet6-btn.main{background:linear-gradient(135deg,#3563e9,#7c3aed);border-color:transparent;color:#fff}
  .cet6-btn.main:hover{filter:brightness(1.07)}
  .cet6-stat{display:flex;gap:6px;margin-top:11px;padding-top:10px;border-top:1px dashed #e2e8f5}
  .cet6-stat div{flex:1;text-align:center;min-width:0}
  .cet6-stat b{display:block;font-size:17px;font-weight:800;color:#1e2a4a;
    font-variant-numeric:tabular-nums;line-height:1.25}
  .cet6-stat span{font-size:10px;color:#98a2b8;letter-spacing:.02em}
  .cet6-foot{display:flex;align-items:center;justify-content:space-between;margin-top:8px;
    font-size:11px;color:#96a0b6;font-variant-numeric:tabular-nums}
  .cet6-mini{border:0;background:none;color:#96a0b6;font-size:11px;cursor:pointer;
    font-family:inherit;text-decoration:underline;padding:0}
  .cet6-mini:hover{color:#3563e9}
  .cet6-allin{display:flex;flex-direction:column;align-items:center;justify-content:center;
    height:152px;border-radius:13px;border:1px dashed #cbd6ec;background:#fafbff;
    color:#7b87a2;font-size:12.5px;text-align:center;padding:16px;line-height:1.8}
  .cet6-allin b{color:#0eaf6e;font-size:15px;display:block;margin-bottom:5px}
  .cet6-fab{position:fixed;right:15px;bottom:17px;z-index:99999;
    width:52px;height:52px;border-radius:50%;border:0;cursor:pointer;
    background:linear-gradient(135deg,#3563e9,#7c3aed);color:#fff;
    font-size:15px;font-weight:800;font-family:inherit;
    box-shadow:0 8px 24px -8px rgba(53,86,224,.6);
    display:flex;align-items:center;justify-content:center;flex-direction:column;line-height:1.1}
  .cet6-fab small{font-size:8.5px;font-weight:600;opacity:.85;letter-spacing:.5px}
  `;

  /* ---------- 结构 ---------- */
  var HTML = `
  <aside class="cet6-panel" id="cet6Box" aria-label="六级词汇每日翻卡">
    <div class="cet6-head">
      <span class="cet6-title">今日六级</span>
      <span class="cet6-date" id="cet6Date"></span>
    </div>
    <div class="cet6-dots" id="cet6Dots"></div>
    <div id="cet6Card">
      <div class="cet6-stage" id="cet6Stage">
        <div class="cet6-flip">
          <div class="cet6-face cet6-front">
            <div class="cet6-word" id="cet6Word"></div>
            <div class="cet6-ph" id="cet6Ph"></div>
            <div class="cet6-hint">点一下看释义</div>
          </div>
          <div class="cet6-face cet6-back">
            <div class="cet6-cn" id="cet6Cn"></div>
            <div class="cet6-ex" id="cet6Ex"></div>
            <div class="cet6-exc" id="cet6Exc"></div>
          </div>
        </div>
      </div>
      <div class="cet6-actions">
        <button class="cet6-btn" id="cet6Again">不熟</button>
        <button class="cet6-btn main" id="cet6Know">记住了</button>
      </div>
      <div class="cet6-stat">
        <div><b id="cet6Streak">0</b><span>连续天数</span></div>
        <div><b id="cet6Total">0</b><span>累计掌握</span></div>
      </div>
      <div class="cet6-foot">
        <span id="cet6Count"></span>
        <button class="cet6-mini" id="cet6Reset">重置</button>
      </div>
    </div>
    <div id="cet6Done" style="display:none"></div>
  </aside>
  <button class="cet6-fab" id="cet6Fab" aria-label="六级单词">词<small>CET-6</small></button>`;

  function boot() {
    var st1 = document.createElement("style");
    st1.textContent = CSS;
    document.head.appendChild(st1);
    var wrap = document.createElement("div");
    wrap.innerHTML = HTML;
    while (wrap.firstChild) document.body.appendChild(wrap.firstChild);

    /* ---------- 逻辑 ---------- */
    var PER = 8, KEY = "cet6_v1", HKEY = "cet6_hist";
    function el(id){ return document.getElementById(id); }
    function pad2(n){ return n < 10 ? "0" + n : "" + n; }
    function dayKey(){
      var d = new Date();
      return d.getFullYear() + "-" + pad2(d.getMonth() + 1) + "-" + pad2(d.getDate());
    }
    function hash(s){
      var h = 2166136261;
      for (var i = 0; i < s.length; i++){ h ^= s.charCodeAt(i); h = Math.imul(h, 16777619) >>> 0; }
      return h >>> 0;
    }
    /* 同一天永远是同一批词 */
    function planOf(key){
      var s = hash(key), seen = {}, idx = [], guard = 0;
      while (idx.length < PER && guard < 800){
        s = (Math.imul(s, 1103515245) + 12345) >>> 0;
        var i = s % CET6.length;
        if (!seen[i]){ seen[i] = 1; idx.push(i); }
        guard++;
      }
      return idx;
    }

    var box = el("cet6Box"), fab = el("cet6Fab");
    if (!box || !CET6.length) return;

    var today = dayKey(), plan = planOf(today);
    var st = { date: today, known: [], cur: 0 };
    try {
      var raw = localStorage.getItem(KEY);
      if (raw){
        var o = JSON.parse(raw);
        if (o && o.date === today && o.cur >= 0 && o.cur <= PER) st = o;
      }
    } catch (e) {}

    function histLoad(){
      try { return JSON.parse(localStorage.getItem(HKEY) || "{}") || {}; }
      catch (e) { return {}; }
    }
    function save(){
      try {
        localStorage.setItem(KEY, JSON.stringify(st));
        /* 只在真正背过词时才记入打卡，单纯打开页面不算 */
        if (st.known.length > 0){
          var h = histLoad();
          h[today] = st.known.length;
          localStorage.setItem(HKEY, JSON.stringify(h));
        }
      } catch (e) {}
    }
    function keyOf(d){
      return d.getFullYear() + "-" + pad2(d.getMonth() + 1) + "-" + pad2(d.getDate());
    }
    function paintStat(){
      var h = histLoad(), streak = 0, total = 0, k;
      for (k in h){ if (typeof h[k] === "number") total += h[k]; }
      var d = new Date();
      /* 今天还没开始背的话，从昨天往前数，避免打卡显示中断 */
      if (!h[keyOf(d)]) d.setDate(d.getDate() - 1);
      for (var i = 0; i < 400; i++){
        if (h[keyOf(d)] > 0){ streak++; d.setDate(d.getDate() - 1); }
        else break;
      }
      el("cet6Streak").textContent = streak;
      el("cet6Total").textContent = total;
    }

    el("cet6Date").textContent = today.slice(5).replace("-", "/");

    function paintDots(){
      var s = "";
      for (var i = 0; i < PER; i++){
        var cls = st.known.indexOf(i) >= 0 ? "on" : (i === st.cur ? "cur" : "");
        s += '<i class="' + cls + '"></i>';
      }
      el("cet6Dots").innerHTML = s;
    }
    function show(i){
      var w = CET6[plan[i]];
      el("cet6Word").textContent = w.w;
      el("cet6Ph").innerHTML = "/" + w.p + "/ <span class='cet6-pos'>" + w.t + "</span>";
      el("cet6Cn").textContent = w.c;
      el("cet6Ex").textContent = w.e;
      el("cet6Exc").textContent = w.ec;
      el("cet6Count").textContent = (i + 1) + " / " + PER;
    }
    function render(){
      var done = st.cur >= PER;
      el("cet6Card").style.display = done ? "none" : "block";
      el("cet6Done").style.display = done ? "block" : "none";
      if (done){
        el("cet6Done").innerHTML = '<div class="cet6-allin"><b>今日 8 个过完了 ✓</b>' +
          '掌握 ' + st.known.length + ' 个。明天会自动换一批新词。<br>每天 8 个，一个月 240 个。</div>';
      } else {
        el("cet6Stage").classList.remove("flip");
        show(st.cur);
      }
      paintDots();
      save();
      paintStat();
    }
    function next(mark){
      if (st.cur >= PER) return;
      if (mark && st.known.indexOf(st.cur) < 0) st.known.push(st.cur);
      st.cur++;
      render();
    }

    el("cet6Stage").addEventListener("click", function(e){
      if (st.cur >= PER) return;
      e.stopPropagation();
      el("cet6Stage").classList.toggle("flip");
    });
    el("cet6Know").addEventListener("click", function(e){ e.stopPropagation(); next(true); });
    el("cet6Again").addEventListener("click", function(e){ e.stopPropagation(); next(false); });
    el("cet6Reset").addEventListener("click", function(e){
      e.stopPropagation();
      st = { date: today, known: [], cur: 0 };
      render();
    });
    box.addEventListener("click", function(e){ e.stopPropagation(); });
    fab.addEventListener("click", function(e){
      e.stopPropagation();
      box.classList.toggle("open");
    });
    /* 点面板外部收起 */
    document.addEventListener("click", function(){
      if (box.classList.contains("open")) box.classList.remove("open");
    });

    render();
  }

  if (document.body) boot();
  else document.addEventListener("DOMContentLoaded", boot);
})();
