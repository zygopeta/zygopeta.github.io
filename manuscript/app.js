/* manuscript · 渲染引擎：路由 + 内容渲染 + 3D 惰性加载 */
(function () {
  "use strict";

  var MSC = (window.MSC = window.MSC || {});
  MSC.chapters = MSC.chapters || [];
  MSC.scenes = MSC.scenes || {};

  var main = document.getElementById("main");
  var navlist = document.getElementById("navlist");
  var side = document.getElementById("side");
  var overlay = document.getElementById("overlay");
  var burger = document.getElementById("burger");
  var progress = document.getElementById("progress");

  /* ---------- SVG 公共样式与包装 ---------- */
  var SVG_STYLE =
    "<style>" +
    ".cls-b{fill:none;stroke:#1a2233;stroke-width:2.2;stroke-linecap:round;stroke-linejoin:round}" +
    ".cls-m{fill:none;stroke:#1a2233;stroke-width:1.5;stroke-linecap:round;stroke-linejoin:round}" +
    ".cls-t{fill:none;stroke:#98a3bd;stroke-width:1.1}" +
    ".cls-h{fill:none;stroke:#55607a;stroke-width:1.4;stroke-dasharray:7 5}" +
    ".cls-c{fill:none;stroke:#2f9bd6;stroke-width:1.2;stroke-dasharray:18 4 3 4}" +
    ".cls-w{fill:none;stroke:#55607a;stroke-width:1.3}" +
    ".prj{fill:none;stroke-width:1.2;stroke-dasharray:4 4}" +
    ".dim{fill:none;stroke:#c2571f;stroke-width:1.2}" +
    ".dimt{font:bold 11.5px -apple-system,'PingFang SC','Microsoft YaHei',sans-serif;fill:#c2571f}" +
    ".txt{font:12.5px -apple-system,'PingFang SC','Microsoft YaHei',sans-serif;fill:#333c52}" +
    ".txtb{font:bold 13.5px -apple-system,'PingFang SC','Microsoft YaHei',sans-serif;fill:#171b2c}" +
    ".txts{font:10.5px -apple-system,'PingFang SC','Microsoft YaHei',sans-serif;fill:#8a92a8}" +
    ".lbl{font:bold 12px -apple-system,'PingFang SC',sans-serif;fill:#2f5cd8}" +
    "</style>";

  var SVG_DEFS =
    '<defs>' +
    '<marker id="arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">' +
    '<path d="M0 1 L9 5 L0 9 z" fill="#1a2233"/></marker>' +
    '<marker id="arrO" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6.5" markerHeight="6.5" orient="auto-start-reverse">' +
    '<path d="M0 1 L9 5 L0 9 z" fill="#c2571f"/></marker>' +
    "</defs>";

  function wrapSvg(inner, vb) {
    return (
      '<svg class="figsvg" xmlns="http://www.w3.org/2000/svg" viewBox="' +
      (vb || "0 0 680 400") +
      '">' +
      SVG_DEFS +
      SVG_STYLE +
      inner +
      "</svg>"
    );
  }

  /* ---------- 块渲染 ---------- */
  function renderBlock(b) {
    switch (b.t) {
      case "h":
        return '<div class="blk-h3">' + b.text + "</div>";
      case "p":
        return '<div class="blk-p">' + b.html + "</div>";
      case "tip":
        return '<div class="tip">' + b.html + "</div>";
      case "warn":
        return '<div class="warn">' + b.html + "</div>";
      case "fig":
        return (
          '<figure class="fig"><div class="svgbox">' +
          wrapSvg(b.svg, b.vb) +
          '</div><figcaption>' +
          (b.cap || "") +
          "</figcaption></figure>"
        );
      case "tbl":
        return (
          '<div class="tbl"><table><thead><tr>' +
          b.head.map(function (h) { return "<th>" + h + "</th>"; }).join("") +
          "</tr></thead><tbody>" +
          b.rows
            .map(function (r) {
              return "<tr>" + r.map(function (c) { return "<td>" + c + "</td>"; }).join("") + "</tr>";
            })
            .join("") +
          "</tbody></table></div>"
        );
      case "scene":
        return (
          '<div class="scene" data-scene="' + b.id + '">' +
          '<div class="stage"><span class="hint3d">拖动可旋转模型</span></div>' +
          '<div class="ctrl"></div>' +
          '<div class="figcap">' + (b.cap || "") + "</div></div>"
        );
      default:
        return "";
    }
  }

  /* ---------- 3D 场景挂载与销毁 ---------- */
  var activeScenes = [];
  var seen = {};

  function disposeScenes() {
    activeScenes.forEach(function (s) { try { s.dispose(); } catch (e) {} });
    activeScenes = [];
  }

  function mountScene(el) {
    var key = el.getAttribute("data-scene");
    var sc = MSC.scenes[key];
    if (!sc) return;
    if (!window.THREE) {
      el.querySelector(".ctrl").innerHTML =
        '<div class="fallback">⚠ 3D 模块需要联网加载 Three.js（当前不可用），文字与图形内容不受影响。</div>';
      return;
    }
    var stage = el.querySelector(".stage");
    var ctrl = el.querySelector(".ctrl");
    var inst = sc.create(stage, ctrl);
    if (inst && inst.dispose) activeScenes.push(inst);
  }

  function watchScenes() {
    var els = document.querySelectorAll(".scene");
    if (!("IntersectionObserver" in window)) {
      for (var i = 0; i < els.length; i++) mountScene(els[i]);
      return;
    }
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) {
            var el = en.target;
            io.unobserve(el);
            mountScene(el);
          }
        });
      },
      { rootMargin: "120px" }
    );
    for (var j = 0; j < els.length; j++) io.observe(els[j]);
  }

  /* ---------- 首页 ---------- */
  function renderHome() {
    var cards = MSC.chapters
      .map(function (ch) {
        return (
          '<a class="chcard" href="#/' + ch.id + '">' +
          '<span class="cno">' + ch.no + " · " + (ch.hrs || "") + "</span>" +
          "<h3>" + ch.title + "</h3>" +
          "<p>" + ch.lead + "</p>" +
          '<span class="topics">' +
          ch.secs.slice(0, 6).map(function (s) { return "<i>" + s.title + "</i>"; }).join("") +
          "</span>" +
          '<span class="arrow">→</span></a>'
        );
      })
      .join("");

    main.innerHTML =
      '<div class="home-hero">' +
      "<h1>机械制图 · 通俗学习指南</h1>" +
      "<p>针对《机械制图》（同济大学、上海交通大学等院校编，第八版）第一章、第三章、第四章、第五章。" +
      "每个概念先用大白话讲透，再配投影图和可以转到任何角度的 3D 模型——" +
      "投影关系看不懂的时候，转一下模型就明白了。</p>" +
      '<div class="tags"><span>✦ 考点口诀</span><span>✦ 可交互 3D</span><span>✦ 手机适配</span><span>✦ 离线可用</span></div>' +
      "</div>" +
      '<h2 style="font-size:17px;margin:26px 0 14px">章节导航</h2>' +
      '<div class="chgrid">' + cards + "</div>" +
      '<div class="tip" style="margin-top:26px">使用建议：先读文字建立直觉 → 转动 3D 模型验证想象 → 回看投影图确认“长对正、高平齐、宽相等”。能自己复现这三步，考试画图基本稳了。</div>';
  }

  /* ---------- 章节页 ---------- */
  function renderChapter(ch, secId) {
    var secs = ch.secs
      .map(function (s, i) {
        return (
          '<section class="sec" id="' + s.id + '">' +
          '<div class="sec-tag">' + ch.no + "</div>" +
          "<h2><span class=\"no\">" + s.no + "</span>" + s.title + "</h2>" +
          s.blocks.map(renderBlock).join("") +
          "</section>"
        );
      })
      .join("");

    var idx = MSC.chapters.indexOf(ch);
    var prev = MSC.chapters[idx - 1];
    var next = MSC.chapters[idx + 1];

    main.innerHTML =
      '<div class="chapter-head"><span class="chno">' + ch.no + (ch.hrs ? " · " + ch.hrs : "") + "</span>" +
      "<h1>" + ch.title + "</h1>" +
      '<p class="lead">' + ch.lead + "</p></div>" +
      secs +
      '<div class="pager">' +
      (prev ? '<a href="#/' + prev.id + '"><span class="dir">← 上一章</span><div class="t">' + prev.title + "</div></a>" : "") +
      '<a href="#/home"><span class="dir">返回目录</span><div class="t">全部章节</div></a>' +
      (next ? '<a href="#/' + next.id + '"><span class="dir" style="text-align:right;display:block">下一章 →</span><div class="t" style="text-align:right">' + next.title + "</div></a>" : "") +
      "</div>";

    watchScenes();
    if (secId) {
      var el = document.getElementById(secId);
      if (el) {
        var go = function () {
          var y = el.getBoundingClientRect().top + window.pageYOffset - 68;
          try { window.scrollTo({ top: y, left: 0, behavior: "instant" }); }
          catch (e) { window.scrollTo(0, y); }
        };
        /* 双帧 + 兜底：等 3D 画布挂载、布局稳定后再定位 */
        requestAnimationFrame(function () { requestAnimationFrame(go); });
        setTimeout(go, 280);
      }
    }
  }

  /* ---------- 导航 ---------- */
  function renderNav() {
    var html =
      '<div class="navgrp"><a href="#/home"><span>🏠</span> 目录首页</a></div>';
    MSC.chapters.forEach(function (ch) {
      html +=
        '<div class="navgrp"><a href="#/' + ch.id + '"><span class="ch">' + ch.no + "</span>" + ch.title + "</a>" +
        '<ul class="navsub">' +
        ch.secs
          .map(function (s) {
            return '<li><a href="#/' + ch.id + "/" + s.id + '">' + s.no + " " + s.title + "</a></li>";
          })
          .join("") +
        "</ul></div>";
    });
    navlist.innerHTML = html;
  }

  /* ---------- 路由 ---------- */
  function route() {
    disposeScenes();
    var h = location.hash.replace(/^#\/?/, "") || "home";
    var parts = h.split("/");
    var key = parts[0];

    if (key === "home") {
      renderHome();
    } else {
      var ch = MSC.chapters.filter(function (c) { return c.id === key; })[0];
      if (ch) renderChapter(ch, parts[1]);
      else renderHome();
    }
    window.scrollTo(0, 0);
    closeDrawer();
    highlightNav(key);
  }

  function highlightNav(key) {
    var links = navlist.querySelectorAll(".navsub a");
    for (var i = 0; i < links.length; i++) links[i].classList.remove("cur");
  }

  /* ---------- 抽屉（手机） ---------- */
  function closeDrawer() {
    side.classList.remove("open");
    overlay.classList.remove("show");
  }
  burger.addEventListener("click", function () {
    side.classList.toggle("open");
    overlay.classList.toggle("show");
  });
  overlay.addEventListener("click", closeDrawer);
  side.addEventListener("click", function (e) {
    if (e.target.tagName === "A") closeDrawer();
  });

  /* ---------- 进度条 ---------- */
  window.addEventListener(
    "scroll",
    function () {
      var d = document.documentElement;
      var p = (d.scrollTop / (d.scrollHeight - d.clientHeight)) * 100 || 0;
      progress.style.width = p + "%";
    },
    { passive: true }
  );

  /* ---------- 启动 ---------- */
  /* 收集各 content 文件注册的章节，保持教材顺序 */
  ["ch1", "ch3", "ch4", "ch5"].forEach(function (k) {
    if (MSC[k]) MSC.chapters.push(MSC[k]);
  });

  document.getElementById("pgfoot").innerHTML =
    "manuscript · 《机械制图》第八版（同济大学、上海交通大学等编）第 1/3/4/5 章学习指南<br>" +
    "3D 模型需联网加载；文字与图形部分完全离线可用 · 关闭页面即清空数据";

  renderNav();
  window.addEventListener("hashchange", route);
  route();
})();
