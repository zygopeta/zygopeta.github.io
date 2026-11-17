/* 第一章 · 制图的基本知识与技能 */
(function () {
  "use strict";
  var MSC = (window.MSC = window.MSC || {});
  MSC.ch1 = {
    id: "ch1",
    no: "第一章",
    hrs: "基础打底",
    title: "制图的基本知识与技能",
    lead:
      "这一章是画图的“语法”。就像写作文要先会写字、懂标点一样，画工程图之前，国家标准（GB）规定了纸怎么用、线怎么画、字怎么写、尺寸怎么标。语法不花哨，但考试里“扫一眼就知道你专不专业”。",

    secs: [
      /* ================= 1.1 ================= */
      {
        id: "s1-1",
        no: "1.1",
        title: "图纸幅面、格式与标题栏",
        blocks: [
          {
            t: "p",
            html:
              "<b>图纸幅面</b>就是“标准纸号”。全世界工程图纸都按 A 系列裁：A0 最大，对折一次就是 A1，再对折是 A2……记住 <span class='term'>A0 = 841×1189</span>（mm），剩下不用背：每往下一号，长边减半、面积减半。" +
              "<br>常用的 <span class='term'>A4 = 210×297</span>（就是打印纸）。",
          },
          {
            t: "fig",
            vb: "0 0 300 370",
            cap: "A4 横放（X 型）图纸：外圈细实线是纸边界，粗实线是图框；左边 25mm 是装订边，其余 10mm；标题栏固定在图框右下角",
            svg:
              '<rect x="10" y="10" width="260" height="335" class="cls-t"/>' +
              '<rect x="40" y="22" width="219" height="312" class="cls-b"/>' +
              /* 标题栏（右下角 130×36） */
              '<rect x="129" y="298" width="130" height="36" class="cls-m"/>' +
              '<line x1="129" y1="316" x2="259" y2="316" class="cls-t"/>' +
              '<line x1="180" y1="298" x2="180" y2="334" class="cls-t"/>' +
              '<line x1="218" y1="298" x2="218" y2="334" class="cls-t"/>' +
              '<text x="155" y="311" class="txts" text-anchor="middle">制图</text>' +
              '<text x="155" y="329" class="txts" text-anchor="middle">审核</text>' +
              '<text x="199" y="311" class="txts" text-anchor="middle">比例</text>' +
              '<text x="199" y="329" class="txts" text-anchor="middle">材料</text>' +
              '<text x="239" y="311" class="txts" text-anchor="middle">图号</text>' +
              '<text x="239" y="329" class="txts" text-anchor="middle">单位</text>' +
              /* 装订边 a=25 */
              '<path d="M25 46 L25 66" class="dim" marker-end="url(#arrO)" marker-start="url(#arrO)"/>' +
              '<text x="25" y="86" class="dimt" text-anchor="middle">a=25</text>' +
              /* e=10 标注 */
              '<path d="M70 16 L90 16" class="dim" marker-end="url(#arrO)" marker-start="url(#arrO)"/>' +
              '<text x="100" y="20" class="dimt">e=10</text>' +
              '<text x="25" y="357" class="txts">210</text>' +
              '<text x="278" y="180" class="txts" text-anchor="middle" transform="rotate(-90 278 180)">297</text>',
          },
          {
            t: "tbl",
            head: ["幅面", "尺寸（宽×长 / mm）", "记忆法"],
            rows: [
              ["A0", "<b>841 × 1189</b>", "基准，面积约 1㎡"],
              ["A1", "594 × 841", "A0 长边对折"],
              ["A2", "420 × 594", "再对折"],
              ["A3", "297 × 420", "再对折"],
              ["A4", "<b>210 × 297</b>", "日常打印纸"],
            ],
          },
          {
            t: "p",
            html:
              "<b>图框</b>用粗实线画。留装订边时，装订一侧（一般是左边）留 <span class='term'>a = 25mm</span>，其他边只留 <span class='term'>e = 10mm</span>（A0–A2 若不留装订边，e 加大到 20）。“留装订边”就是图纸将来要装订成册。",
          },
          {
            t: "p",
            html:
              "<b>标题栏</b>永远在图框<b>右下角</b>，外框粗实线、内部分格细实线。看图的人拿到图纸先翻右下角：图名、比例、材料、图号、单位名称都在里面。",
          },
          {
            t: "tip",
            html:
              "幅面口诀：<b>“A0 对折变小一”</b>——841×1189 记住了，其余尺寸现场心算就能推出来。考试考数字题时，先写下 A0 的 841×1189，一路除 2：841→594→420→297→210，1189→841→594→420→297。",
          },
        ],
      },

      /* ================= 1.2 ================= */
      {
        id: "s1-2",
        no: "1.2",
        title: "比例：图形与实物的“缩放倍率”",
        blocks: [
          {
            t: "p",
            html:
              "比例 = <span class='term'>图形尺寸 : 实物尺寸</span>。注意是<b>线性尺寸之比</b>，跟面积没关系。",
          },
          {
            t: "tbl",
            head: ["类别", "可用比例（优先）", "通俗理解"],
            rows: [
              ["原值比例", "<b>1 : 1</b>", "画出来和实物一样大"],
              ["放大比例", "5 : 1、<b>2 : 1</b>（还有 10:1 等）", "小零件（如手表齿轮）放大画"],
              ["缩小比例", "<b>1 : 2</b>、1 : 5、1 : 10 等", "大零件（如车床床身）缩小画"],
            ],
          },
          {
            t: "p",
            html:
              "最容易考的一点：<b>无论用什么比例，标注的尺寸永远是实物真实大小</b>。图上画得再小，长 500mm 的轴标 500；画得再大，φ5 的孔标 φ5。比例只管“画”，不管“数”。",
          },
          {
            t: "p",
            html:
              "比例符号写作 <b>1:2、2:1</b>（不是 1/2 也不是 0.5）。放大比例<b>前大后小</b>（2:1），缩小比例<b>前小后大</b>（1:2）。标题栏“比例”栏填一个；同一张图里某个视图用不同比例时，要在那个视图上方单独标注。",
          },
          {
            t: "warn",
            html:
              "坑点①：填空问“1:2 是放大还是缩小”——是<b>缩小</b>（图形只有实物一半大）。前项是图形！<br>" +
              "坑点②：图上 1:2 画出的线段实测 50mm，问实物多长——实物 <b>100mm</b>，但图上标的数字直接就是 100。",
          },
        ],
      },

      /* ================= 1.3 ================= */
      {
        id: "s1-3",
        no: "1.3",
        title: "字体与图线：图纸上的“笔画”",
        blocks: [
          {
            t: "p",
            html:
              "<b>字体</b>：图样中的汉字写<b>长仿宋体</b>，字宽约等于字高的 0.7 倍；数字和字母写斜体或直体。字高系列：1.8、2.5、<b>3.5</b>、5、7、10、14、20（后一个约是前一个的 √2 倍）。同一张图里，字号别混着来。",
          },
          {
            t: "p",
            html:
              "<b>图线</b>是本章的考试常客。国标规定了 9 种，工程图里最常考这 7 种，宽度分<b>粗、细</b>两档（粗线宽度 b 优先选 0.7 或 0.5，细线是 b 的一半）：",
          },
          {
            t: "fig",
            vb: "0 0 680 330",
            cap: "七种常用图线：一眼认出“哪条线干什么活”，读图与画图都靠它",
            svg:
              /* 1 粗实线 */
              '<line x1="20" y1="34" x2="250" y2="34" class="cls-b"/>' +
              '<text x="272" y="39" class="txtb">粗实线</text>' +
              '<text x="380" y="39" class="txt">可见轮廓线、可见棱边线、螺纹牙顶线、相贯线</text>' +
              /* 2 细实线 */
              '<line x1="20" y1="76" x2="250" y2="76" class="cls-t"/>' +
              '<text x="272" y="81" class="txtb">细实线</text>' +
              '<text x="380" y="81" class="txt">尺寸线、尺寸界线、剖面线、指引线、过渡线</text>' +
              /* 3 细虚线 */
              '<line x1="20" y1="118" x2="250" y2="118" style="fill:none;stroke:#55607a;stroke-width:1.6;stroke-dasharray:7 5"/>' +
              '<text x="272" y="123" class="txtb">细虚线</text>' +
              '<text x="380" y="123" class="txt">不可见轮廓线、不可见棱边线（被挡住的边）</text>' +
              /* 4 细点画线 */
              '<line x1="20" y1="160" x2="250" y2="160" class="cls-c"/>' +
              '<text x="272" y="165" class="txtb">细点画线</text>' +
              '<text x="380" y="165" class="txt">轴线、对称中心线、分度圆（圆的十字中心线）</text>' +
              /* 5 粗虚线 */
              '<line x1="20" y1="202" x2="250" y2="202" style="fill:none;stroke:#1a2233;stroke-width:2.2;stroke-dasharray:9 6"/>' +
              '<text x="272" y="207" class="txtb">粗虚线</text>' +
              '<text x="380" y="207" class="txt">允许表面处理的表示线（较少用，认识即可）</text>' +
              /* 6 细双点画线 */
              '<line x1="20" y1="244" x2="250" y2="244" style="fill:none;stroke:#2f9bd6;stroke-width:1.2;stroke-dasharray:14 4 2 4 2 4"/>' +
              '<text x="272" y="249" class="txtb">细双点画线</text>' +
              '<text x="380" y="249" class="txt">相邻零件轮廓、极限位置、轨迹线、假想投影</text>' +
              /* 7 波浪线 */
              '<path d="M20 288 q15 -14 30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0" style="fill:none;stroke:#55607a;stroke-width:1.3"/>' +
              '<text x="272" y="293" class="txtb">波浪线</text>' +
              '<text x="380" y="293" class="txt">断裂处边界线、视图和剖视图的分界线</text>',
          },
          {
            t: "tip",
            html:
              "认线口诀：<b>“粗的看得见，虚的看不见，点画找中心，波浪管断开，双点画是假想。”</b>读图时先找点画线定对称中心，再看粗实线抓外形，虚线补内部结构。",
          },
          {
            t: "warn",
            html:
              "① 细点画线要<b>超出轮廓线 2–5mm</b>，不能正好画到头；圆的中心线两条<b>垂直</b>点画线交在圆心。<br>" +
              "② 虚线直接相交在“线段”处而不是空隙处；虚线与粗实线相接时留空隙。<br>" +
              "③ 同一张图里同类线宽必须一致：粗就是一样粗，细就是一样细。",
          },
        ],
      },

      /* ================= 1.4 ================= */
      {
        id: "s1-4",
        no: "1.4",
        title: "尺寸标注：图纸的“灵魂”",
        blocks: [
          {
            t: "p",
            html:
              "图形只表达形状，<b>尺寸才表达大小</b>。一张图画得再漂亮，尺寸标错，加工出来就是废品。国标规定一套完整尺寸由四个要素组成：",
          },
          {
            t: "tbl",
            head: ["要素", "是什么", "规矩"],
            rows: [
              ["<b>尺寸界线</b>", "从图形轮廓引出的界线", "细实线；超出尺寸线约 2–3mm；可以借用轮廓线/轴线"],
              ["<b>尺寸线</b>", "两头带箭头的线", "细实线；<b>不能用轮廓线、中心线代替</b>；与所注线段平行"],
              ["<b>箭头</b>", "尺寸线端点", "实心、细长（长≥宽的 4 倍）；小尺寸放不下可画在外侧"],
              ["<b>数字</b>", "尺寸数值", "<b>不注单位</b>（默认 mm）；写在尺寸线上方或中断处"],
            ],
          },
          {
            t: "fig",
            vb: "0 0 680 300",
            cap: "左：矩形的长与高（箭头—尺寸线—尺寸界线—数字四件套）；右：圆必须标直径 φ，球面加 S",
            svg:
              /* ---- 左：矩形 ---- */
              '<rect x="60" y="80" width="200" height="140" class="cls-b"/>' +
              /* 尺寸界线 */
              '<line x1="60" y1="74" x2="60" y2="46" class="cls-t"/>' +
              '<line x1="260" y1="74" x2="260" y2="46" class="cls-t"/>' +
              /* 尺寸线 40 */
              '<line x1="60" y1="52" x2="260" y2="52" class="dim" marker-end="url(#arrO)" marker-start="url(#arrO)"/>' +
              '<text x="160" y="46" class="dimt" text-anchor="middle">40</text>' +
              /* 左侧尺寸界线 */
              '<line x1="54" y1="80" x2="26" y2="80" class="cls-t"/>' +
              '<line x1="54" y1="220" x2="26" y2="220" class="cls-t"/>' +
              '<line x1="32" y1="80" x2="32" y2="220" class="dim" marker-end="url(#arrO)" marker-start="url(#arrO)"/>' +
              '<text x="24" y="150" class="dimt" text-anchor="end">20</text>' +
              '<text x="160" y="150" class="txts" text-anchor="middle">尺寸数字写在尺寸线上方</text>' +
              /* ---- 右：圆 ---- */
              '<line x1="430" y1="150" x2="610" y2="150" class="cls-c"/>' +
              '<line x1="520" y1="65" x2="520" y2="235" class="cls-c"/>' +
              '<circle cx="520" cy="150" r="68" class="cls-b"/>' +
              '<line x1="452" y1="150" x2="588" y2="150" class="dim" marker-end="url(#arrO)" marker-start="url(#arrO)"/>' +
              '<text x="520" y="140" class="dimt" text-anchor="middle">φ30</text>' +
              '<text x="520" y="262" class="txts" text-anchor="middle">整圆标 φ 不标 R；点画线是中心线，超出轮廓 2–5mm</text>',
          },
          {
            t: "p",
            html:
              "几条高频规则，考试和画图都用得上：① 标注是<b>真实大小</b>，与作图比例、准确度无关；② <b>mm 不写</b>，用了别的单位（如 30°）才注明；③ 圆标 <span class='term'>φ</span>（整圆标直径，半圆或已知两端半径可标 R）；球面加 <b>S</b>（Sφ20）；④ 角度数字<b>一律字头朝上水平写</b>；⑤ 水平尺寸数字头朝上、竖直尺寸数字头朝<b>左</b>、倾斜尺寸顺尺寸线；⑥ <b>不要标成封闭尺寸链</b>，也不重复标注。",
          },
          {
            t: "warn",
            html:
              "判卷老师最爱挑的错：① 尺寸线画成了轮廓线；② 数字写在尺寸线<b>下面</b>（必须上方或中断处）；③ 圆标了 R 不标 φ；④ 半径 R 的尺寸线<b>必须指向圆心</b>（或指向圆心方向）且只画一个箭头；⑤ 竖直尺寸数字头朝了右边（应朝左）。",
          },
          {
            t: "tip",
            html: "记法：<b>“水平头朝上，竖直头朝左，角度永远朝上。”</b>",
          },
        ],
      },

      /* ================= 1.5 ================= */
      {
        id: "s1-5",
        no: "1.5",
        title: "常用几何作图：考试里的“手上功夫”",
        blocks: [
          {
            t: "h",
            text: "① 圆的内接正六边形——半径就是边长",
          },
          {
            t: "p",
            html:
              "这是最实用的一个结论：外接圆<b>半径 R 恰好等于正六边形的边长</b>。因为正六边形恰好能拆成 6 个边长为 R 的等边三角形。所以拿圆规以 R 为半径在圆周上依次截取 6 段，直接得到六个顶点。",
          },
          {
            t: "fig",
            vb: "0 0 480 420",
            cap: "用半径 R 六等分圆周得到正六边形顶点；也可用 30°/60° 三角板 + 丁字尺作各边（对边平行）",
            svg:
              '<line x1="70" y1="210" x2="410" y2="210" class="cls-c"/>' +
              '<line x1="240" y1="40" x2="240" y2="380" class="cls-c"/>' +
              '<circle cx="240" cy="210" r="140" class="cls-m"/>' +
              /* 六边形顶点 (240,70) (361,140) (361,280) (240,350) (119,280) (119,140) */
              '<path d="M240 70 L361 140 L361 280 L240 350 L119 280 L119 140 Z" class="cls-b"/>' +
              /* 半径 */
              '<line x1="240" y1="210" x2="240" y2="70" class="dim" marker-end="url(#arrO)"/>' +
              '<text x="248" y="140" class="dimt">R</text>' +
              /* 等边三角形提示 */
              '<line x1="240" y1="210" x2="361" y2="280" class="cls-t"/>' +
              '<line x1="240" y1="210" x2="119" y2="280" class="cls-t"/>' +
              '<text x="240" y="300" class="txts" text-anchor="middle">6 个边长 = R 的等边三角形</text>' +
              '<text x="240" y="392" class="txt" text-anchor="middle">边长 = R</text>',
          },
          {
            t: "h",
            text: "② 斜度与锥度——一对“双胞胎”概念，别混",
          },
          {
            t: "fig",
            vb: "0 0 680 300",
            cap: "左：斜度是平面对底面的倾斜程度，H/L = tanα；右：锥度是圆锥的底径与轴长之比，D/L = 2tan(半锥角)",
            svg:
              /* ---- 左：斜度 ---- */
              '<line x1="60" y1="220" x2="280" y2="220" class="cls-b"/>' +
              '<line x1="60" y1="220" x2="60" y2="60" class="cls-b"/>' +
              '<path d="M60 60 L280 220" class="cls-b"/>' +
              '<line x1="60" y1="220" x2="60" y2="244" class="dim" marker-end="url(#arrO)" marker-start="url(#arrO)"/>' +
              '<text x="60" y="262" class="dimt" text-anchor="middle">L=160</text>' +
              '<line x1="34" y1="220" x2="34" y2="60" class="dim" marker-end="url(#arrO)" marker-start="url(#arrO)"/>' +
              '<text x="20" y="145" class="dimt" text-anchor="end">H=32</text>' +
              '<text x="170" y="120" class="txtb" fill="#2f5cd8">斜度 1:5</text>' +
              '<text x="170" y="100" class="txts" text-anchor="middle">H : L = 32 : 160 = 1 : 5</text>' +
              /* 斜度符号 */
              '<path d="M96 96 L96 82 L110 96 Z" style="fill:none;stroke:#c2571f;stroke-width:1.4" transform="rotate(-18.43 96 90)"/>' +
              /* ---- 右：锥度 ---- */
              '<line x1="340" y1="170" x2="620" y2="170" class="cls-c"/>' +
              '<line x1="370" y1="120" x2="370" y2="220" class="cls-b"/>' +
              '<line x1="370" y1="120" x2="590" y2="150" class="cls-b"/>' +
              '<line x1="370" y1="220" x2="590" y2="190" class="cls-b"/>' +
              '<line x1="590" y1="150" x2="590" y2="190" class="cls-b"/>' +
              '<line x1="560" y1="120" x2="560" y2="220" class="cls-t"/>' +
              '<line x1="546" y1="120" x2="546" y2="220" class="dim" marker-end="url(#arrO)" marker-start="url(#arrO)"/>' +
              '<text x="546" y="112" class="dimt" text-anchor="middle">L</text>' +
              '<line x1="370" y1="240" x2="370" y2="264" class="dim" marker-end="url(#arrO)" marker-start="url(#arrO)"/>' +
              '<text x="370" y="282" class="dimt" text-anchor="middle">D</text>' +
              '<line x1="608" y1="150" x2="608" y2="190" class="dim" marker-end="url(#arrO)" marker-start="url(#arrO)"/>' +
              '<text x="640" y="175" class="dimt">d</text>' +
              '<text x="480" y="70" class="txtb" fill="#2f5cd8">锥度 = D : L = (D−d) : L</text>' +
              '<text x="480" y="92" class="txts" text-anchor="middle">图示 D−d 与 L 之比，如 1:5</text>' +
              /* 锥度符号（等腰三角形，尖朝右） */
              '<path d="M396 250 L416 242 L416 258 Z" style="fill:none;stroke:#c2571f;stroke-width:1.4"/>',
          },
          {
            t: "tbl",
            head: ["", "斜度", "锥度"],
            rows: [
              ["对象", "平面 / 直线", "回转体（圆锥、圆台）"],
              ["定义", "<b>H : L</b>（对边 : 底边）", "<b>D : L</b>（底径 : 轴长）"],
              ["计算", "tanα", "2·tan(半锥角)"],
              ["符号", "直角三角形“⦀”，锐角<b>顺着斜度方向</b>", "等腰三角形“⊲”，尖<b>指向锥体小头</b>"],
            ],
          },
          {
            t: "h",
            text: "③ 圆弧连接——光滑过渡的关键",
          },
          {
            t: "p",
            html:
              "圆弧连接就是用一段圆弧把两条已知线（直线或圆弧）<b>光滑地</b>连起来，“光滑”在几何上的含义是<b>相切</b>。作图的核心永远是同一件事：<b>先找连接弧的圆心</b>——找圆心就一句话：“离谁多远，就沿着谁的等距线走。”",
          },
          {
            t: "tbl",
            head: ["连接对象", "连接弧圆心在哪"],
            rows: [
              ["两直线", "与两直线分别相距 R 的两条平行线的交点"],
              ["直线 + 圆弧", "距直线 R 的平行线 ∩ 已知圆圆心轨迹（半径 R±r）的圆"],
              ["两圆弧（外切）", "以已知圆心为圆心、<b>R + r</b> 为半径的两圆之交点"],
              ["两圆弧（内切）", "以已知圆心为圆心、<b>R − r</b> 为半径的圆之交点"],
            ],
          },
          {
            t: "tip",
            html:
              "切点必找法：外切时切点在<b>两圆心连线</b>上；内切时在<b>两圆心连线的延长线</b>上；连直线时在<b>圆心向直线所作垂线的垂足</b>上。考试求连接弧，先问自己：圆心在哪、切点在哪，两件事搞定。",
          },
          {
            t: "h",
            text: "④ 椭圆的近似画法（四心圆弧法）",
          },
          {
            t: "p",
            html:
              "已知长轴、短轴画椭圆，工程上用“四心法”：以长短轴端点为起点作辅助线，找到<b>四个圆心</b>，用四段圆弧拼出近似椭圆。具体步骤在第五章画轴测图里的“椭圆”时还会反复用到——那边才是它真正的主战场（轴测图中的圆画出来就是椭圆）。此处先记流程：定四心 → 分四弧 → 首尾相切。",
          },
          {
            t: "tip",
            html:
              "本章考点浓缩：<b>“六边形半径即边长；斜度管面、锥度管体；连接弧先找圆心再找切点。”</b>第 1 章的选择填空基本从这三句 + 图线用途 + 尺寸规则里出。",
          },
        ],
      },
    ],
  };
})();
