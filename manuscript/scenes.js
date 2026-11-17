/* manuscript · 3D 交互场景（Three.js，CDN 加载失败自动降级为提示） */
(function () {
  "use strict";
  var MSC = (window.MSC = window.MSC || {});
  MSC.scenes = MSC.scenes || {};

  /* ================= 通用场景框架 ================= */
  function baseScene(stage, camPos, lookY) {
    var W = stage.clientWidth || 420;
    var H = stage.clientHeight || 300;
    var renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(W, H);
    stage.appendChild(renderer.domElement);

    var scene = new THREE.Scene();
    scene.background = new THREE.Color(0x1d2436);

    var camera = new THREE.PerspectiveCamera(42, W / H, 0.1, 100);
    camera.position.set(camPos[0], camPos[1], camPos[2]);
    camera.lookAt(0, lookY || 0, 0);

    scene.add(new THREE.AmbientLight(0xffffff, 0.55));
    var d1 = new THREE.DirectionalLight(0xffffff, 0.9);
    d1.position.set(5, 8, 6);
    scene.add(d1);
    var d2 = new THREE.DirectionalLight(0x88a6ff, 0.35);
    d2.position.set(-6, -3, -5);
    scene.add(d2);

    var root = new THREE.Group();
    scene.add(root);

    /* 拖拽旋转（鼠标 + 触摸，Pointer Events 统一处理） */
    var rot = { x: -0.22, y: 0.6 };
    var dragging = false,
      px = 0,
      py = 0;
    var cv = renderer.domElement;
    function applyRot() {
      root.rotation.set(rot.x, rot.y, 0);
    }
    applyRot();
    cv.addEventListener("pointerdown", function (e) {
      dragging = true;
      px = e.clientX;
      py = e.clientY;
      cv.setPointerCapture(e.pointerId);
    });
    cv.addEventListener("pointermove", function (e) {
      if (!dragging) return;
      rot.y += (e.clientX - px) * 0.0065;
      rot.x += (e.clientY - py) * 0.0055;
      if (rot.x > 1.35) rot.x = 1.35;
      if (rot.x < -1.35) rot.x = -1.35;
      px = e.clientX;
      py = e.clientY;
      applyRot();
    });
    cv.addEventListener("pointerup", function () { dragging = false; });
    cv.addEventListener("pointercancel", function () { dragging = false; });

    var raf = null;
    var tickFn = null;
    function loop() {
      raf = requestAnimationFrame(loop);
      if (tickFn) tickFn();
      renderer.render(scene, camera);
    }
    loop();

    var ro = new ResizeObserver(function () {
      var w = stage.clientWidth,
        h = stage.clientHeight;
      if (w < 10 || h < 10) return;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    });
    ro.observe(stage);

    return {
      scene: scene,
      camera: camera,
      root: root,
      renderer: renderer,
      setCam: function (p) {
        camera.position.set(p[0], p[1], p[2]);
        camera.lookAt(0, 0, 0);
      },
      resetRot: function () {
        rot.x = -0.22;
        rot.y = 0.6;
        applyRot();
      },
      setRot: function (x, y) {
        rot.x = x;
        rot.y = y;
        applyRot();
      },
      onTick: function (fn) { tickFn = fn; },
      dispose: function () {
        if (raf) cancelAnimationFrame(raf);
        ro.disconnect();
        scene.traverse(function (o) {
          if (o.geometry) o.geometry.dispose();
          if (o.material) {
            if (Array.isArray(o.material)) o.material.forEach(function (m) { m.dispose(); });
            else o.material.dispose();
          }
        });
        renderer.dispose();
        try { renderer.forceContextLoss(); } catch (e) {}
        renderer.domElement.remove();
      },
    };
  }

  /* 工具 */
  function mat(color, opacity) {
    return new THREE.MeshPhongMaterial({
      color: color,
      transparent: opacity < 1,
      opacity: opacity === undefined ? 1 : opacity,
      side: THREE.DoubleSide,
      shininess: 55,
      specular: 0x334466,
    });
  }
  function lineTube(a, b, color, radius) {
    var curve = new THREE.CatmullRomCurve3([a, b]);
    var g = new THREE.TubeGeometry(curve, 1, radius || 0.016, 6, false);
    return new THREE.Mesh(g, mat(color, 1));
  }
  function polylineTube(pts, color, radius, closed) {
    if (!pts || pts.length < 2) return null;
    var curve = new THREE.CatmullRomCurve3(pts, !!closed, "catmullrom", 0.12);
    var seg = Math.min(Math.max(pts.length * 2, 80), 1200);
    var g = new THREE.TubeGeometry(curve, seg, radius || 0.02, 8, !!closed);
    return new THREE.Mesh(g, mat(color, 1));
  }
  function labelSprite(text, color, pos) {
    var cnv = document.createElement("canvas");
    cnv.width = 128;
    cnv.height = 64;
    var c = cnv.getContext("2d");
    c.font = "bold 40px Consolas, monospace";
    c.textAlign = "center";
    c.textBaseline = "middle";
    c.fillStyle = color;
    c.shadowColor = "rgba(0,0,0,.5)";
    c.shadowBlur = 6;
    c.fillText(text, 64, 34);
    var tex = new THREE.CanvasTexture(cnv);
    var sp = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, transparent: true }));
    sp.scale.set(0.62, 0.31, 1);
    sp.position.copy(pos);
    return sp;
  }
  function edgeBox(w, h, d, color, opacity) {
    var grp = new THREE.Group();
    var m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat(color, opacity === undefined ? 0.35 : opacity));
    var eg = new THREE.LineSegments(
      new THREE.EdgesGeometry(new THREE.BoxGeometry(w, h, d)),
      new THREE.LineBasicMaterial({ color: 0xdfe6ff, transparent: true, opacity: 0.85 })
    );
    grp.add(m);
    grp.add(eg);
    return grp;
  }

  /* 滑块构造 */
  function slider(ctrl, text, min, max, val, step, oninput) {
    var lab = document.createElement("label");
    lab.textContent = text;
    var input = document.createElement("input");
    input.type = "range";
    input.min = min;
    input.max = max;
    input.value = val;
    input.step = step || 1;
    input.addEventListener("input", function () { oninput(parseFloat(input.value)); });
    lab.appendChild(input);
    ctrl.appendChild(lab);
    return input;
  }
  function readout(ctrl, text) {
    var d = document.createElement("div");
    d.className = "readout";
    d.textContent = text;
    ctrl.appendChild(d);
    return d;
  }
  function btnGroup(ctrl, defs, onsel) {
    var wrap = document.createElement("div");
    wrap.className = "btns";
    var btns = [];
    defs.forEach(function (d, i) {
      var b = document.createElement("button");
      b.textContent = d.label;
      b.addEventListener("click", function () {
        btns.forEach(function (x) { x.classList.remove("on"); });
        b.classList.add("on");
        onsel(d, i);
      });
      wrap.appendChild(b);
      btns.push(b);
    });
    if (btns[0]) btns[0].classList.add("on");
    ctrl.appendChild(wrap);
  }

  /* =========================================================
     场景 1：三面投影体系（第三章 3.1）
     ========================================================= */
  MSC.scenes.proj3 = {
    create: function (stage, ctrl) {
      var S = baseScene(stage, [5.4, 3.8, 5.2]);

      var V = new THREE.Mesh(new THREE.PlaneGeometry(3.9, 3.9), mat(0x2f5cd8, 0.2));
      V.position.set(0, 0, -1.85);
      var Hm = new THREE.Mesh(new THREE.PlaneGeometry(3.9, 3.9), mat(0x12966e, 0.2));
      Hm.rotation.x = -Math.PI / 2;
      Hm.position.set(0, -1.85, 0);
      var Wm = new THREE.Mesh(new THREE.PlaneGeometry(3.9, 3.9), mat(0xe08a3c, 0.24));
      Wm.rotation.y = Math.PI / 2;
      Wm.position.set(1.85, 0, 0);
      S.root.add(V, Hm, Wm);

      /* 立体：切角长方体（对应正文插图） */
      var shape = new THREE.Shape();
      shape.moveTo(0, 0);
      shape.lineTo(1.5, 0);
      shape.lineTo(1.5, 1.5);
      shape.lineTo(0.35, 1.5);
      shape.lineTo(0, 1.15);
      shape.closePath();
      var solid = new THREE.Mesh(
        new THREE.ExtrudeGeometry(shape, { depth: 1.1, bevelEnabled: false }),
        mat(0xc9d6f5, 0.8)
      );
      solid.position.set(-0.85, -0.55, -0.55);
      S.root.add(solid);

      /* 顶点的三条投射线 */
      var p = new THREE.Vector3(0.65, 0.95, 0.55);
      var marker = new THREE.Mesh(new THREE.SphereGeometry(0.055, 16, 16), mat(0xffe08a, 1));
      marker.position.copy(p);
      S.root.add(marker);
      S.root.add(lineTube(p, new THREE.Vector3(p.x, p.y, -1.85), 0xf2f6ff, 0.018));
      S.root.add(lineTube(p, new THREE.Vector3(p.x, -1.85, p.z), 0xf2f6ff, 0.018));
      S.root.add(lineTube(p, new THREE.Vector3(1.85, p.y, p.z), 0xf2f6ff, 0.018));

      S.root.add(labelSprite("V", "#8ab0ff", new THREE.Vector3(-1.3, 1.35, -1.83)));
      S.root.add(labelSprite("H", "#5fe0b0", new THREE.Vector3(-1.3, -1.8, 1.35)));
      S.root.add(labelSprite("W", "#ffc37a", new THREE.Vector3(1.83, 1.35, 1.3)));
      S.root.add(labelSprite("A", "#ffe08a", new THREE.Vector3(p.x + 0.18, p.y + 0.15, p.z)));

      var ro = readout(ctrl, "V 正面(主视图) · H 水平面(俯视图) · W 侧面(左视图)；黄线是点 A 的投射线");
      return { dispose: S.dispose };
    },
  };

  /* =========================================================
     场景 2：圆柱截交线探索器（第三章 3.3）
     ========================================================= */
  MSC.scenes.cylcut = {
    create: function (stage, ctrl) {
      var S = baseScene(stage, [4.6, 3.2, 5.2]);
      var R = 0.9,
        HGT = 2.6;

      var cyl = new THREE.Mesh(new THREE.CylinderGeometry(R, R, HGT, 56, 1, true), mat(0x9ec2ff, 0.22));
      var topCap = new THREE.Mesh(new THREE.CircleGeometry(R, 56), mat(0x9ec2ff, 0.12));
      topCap.rotation.x = -Math.PI / 2;
      topCap.position.y = HGT / 2;
      var botCap = topCap.clone();
      botCap.rotation.x = Math.PI / 2;
      botCap.position.y = -HGT / 2;
      S.root.add(cyl, topCap, botCap);
      S.root.add(lineTube(new THREE.Vector3(0, HGT / 2 + 0.25, 0), new THREE.Vector3(0, -HGT / 2 - 0.25, 0), 0x6fd3ff, 0.012));

      var plane = new THREE.Mesh(new THREE.PlaneGeometry(3.2, 3.2), mat(0xffb066, 0.18));
      var cut = new THREE.Mesh(new THREE.BufferGeometry(), mat(0xffe08a, 0.95));
      S.root.add(plane, cut);

      function build(theta) {
        var n = new THREE.Vector3(Math.sin(theta), Math.cos(theta), 0).normalize();
        plane.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), n);

        /* 椭圆：短半轴 R(沿 z)，长半轴 R/sinθ(平面内) */
        var u = new THREE.Vector3(Math.cos(theta), -Math.sin(theta), 0).normalize();
        var v = new THREE.Vector3(0, 0, 1);
        var a = R / Math.max(Math.sin(theta), 1e-4);
        var clamped = false;
        if (a > 2.1) { a = 2.1; clamped = true; }
        var b = R;
        var pts = [];
        var N = 96;
        for (var i = 0; i <= N; i++) {
          var t = (i / N) * Math.PI * 2;
          pts.push(
            new THREE.Vector3()
              .addScaledVector(u, Math.cos(t) * a)
              .addScaledVector(v, Math.sin(t) * b)
          );
        }
        if (cut.geometry) cut.geometry.dispose();
        cut.geometry = new THREE.TubeGeometry(
          new THREE.CatmullRomCurve3(pts, true),
          220,
          0.028,
          10,
          true
        );
        return clamped;
      }

      var ro = readout(ctrl, "");
      slider(ctrl, "截平面与轴线夹角 θ", 15, 90, 45, 1, function (deg) {
        var th = (deg * Math.PI) / 180;
        var clamped = build(th);
        var name = deg >= 89 ? "圆（垂直轴线）" : "椭圆";
        ro.textContent = "θ = " + deg + "° · 截面：" + name +
          (clamped ? "（角度较小，真实截面两端被圆柱端面截断）" : "") +
          "　长轴 2a = " + (2 * R / Math.sin(th)).toFixed(2);
      });
      build((45 * Math.PI) / 180);
      ro.textContent = "θ = 45° · 截面：椭圆";

      return { dispose: S.dispose };
    },
  };

  /* =========================================================
     场景 3：圆锥截交线五型（第三章 3.3）
     ========================================================= */
  MSC.scenes.conecut = {
    create: function (stage, ctrl) {
      var S = baseScene(stage, [4.4, 2.6, 5.2]);
      var RT = 0.9,
        HGT = 2.2,
        Y_T = 1.1,
        Y_B = -1.1,
        K = RT / (Y_T - Y_B);

      var cone = new THREE.Mesh(new THREE.ConeGeometry(RT, HGT, 56, 1, true), mat(0x9ec2ff, 0.28));
      S.root.add(cone);
      var baseRing = new THREE.Mesh(new THREE.TorusGeometry(RT, 0.015, 8, 64), mat(0xdfe6ff, 1));
      baseRing.rotation.x = Math.PI / 2;
      baseRing.position.y = Y_B;
      S.root.add(baseRing);
      S.root.add(lineTube(new THREE.Vector3(0, Y_T + 0.25, 0), new THREE.Vector3(0, Y_B - 0.3, 0), 0x6fd3ff, 0.012));

      var plane = new THREE.Mesh(new THREE.PlaneGeometry(2.6, 2.6), mat(0xffb066, 0.12));
      var cutGroup = new THREE.Group();
      S.root.add(plane, cutGroup);
      var CUT = 0xffe08a;

      function setPlane(n, d) {
        var nn = n.clone().normalize();
        var dist = -d / nn.length();
        plane.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), nn);
        plane.position.copy(nn.clone().multiplyScalar(dist));
      }

      function clearCut() {
        while (cutGroup.children.length) {
          var c = cutGroup.children.pop();
          if (c.geometry) c.geometry.dispose();
        }
      }

      /* 采样法：平面 n·P + d = 0（n 为单位向量）与锥面 r(y)=K(Y_T−y) 的交线 */
      function sampled(n, d) {
        var pts = [];
        var N = 260;
        for (var i = 0; i <= N; i++) {
          var phi = (i / N) * Math.PI * 2;
          var A = n.x * Math.cos(phi) + n.z * Math.sin(phi);
          var den = n.y - K * A;
          if (Math.abs(den) < 5e-3) continue;
          var y = (-d - Y_T * K * A) / den;
          if (y > Y_T - 0.04 || y < Y_B + 0.04) continue;
          var r = K * (Y_T - y);
          pts.push(new THREE.Vector3(r * Math.cos(phi), y, r * Math.sin(phi)));
        }
        /* 按距离断段（开曲线如抛物线/双曲线） */
        var segs = [];
        var cur = [];
        for (var j = 0; j < pts.length; j++) {
          if (j === 0 || pts[j].distanceTo(pts[j - 1]) < 0.18) {
            cur.push(pts[j]);
          } else {
            if (cur.length > 2) segs.push(cur);
            cur = [pts[j]];
          }
        }
        if (cur.length > 2) segs.push(cur);
        clearCut();
        segs.forEach(function (seg) {
          var closed = seg[0].distanceTo(seg[seg.length - 1]) < 0.12;
          var m = polylineTube(seg, CUT, 0.026, closed);
          if (m) cutGroup.add(m);
        });
      }

      /* 三角形（过锥顶）与圆（垂直轴线）手工构造 */
      function triangle() {
        clearCut();
        /* 截平面选为近似正对镜头，三角形不会因透视挤成一条线 */
        var Vp = new THREE.Vector3(0, Y_T, 0);
        var B1 = new THREE.Vector3(0.268, Y_B, 0.856);
        var B2 = new THREE.Vector3(0.8, Y_B, 0.408);
        [lineTube(Vp, B1, CUT, 0.026), lineTube(Vp, B2, CUT, 0.026), lineTube(B1, B2, CUT, 0.026)].forEach(
          function (m) { cutGroup.add(m); }
        );
        setPlane(new THREE.Vector3(0.604, 0.352, 0.715), -0.387);
      }
      function circleCut() {
        clearCut();
        var y = -0.35;
        var r = K * (Y_T - y);
        var pts = [];
        for (var i = 0; i <= 90; i++) {
          var t = (i / 90) * Math.PI * 2;
          pts.push(new THREE.Vector3(Math.cos(t) * r, y, Math.sin(t) * r));
        }
        var m = polylineTube(pts, CUT, 0.026, true);
        if (m) cutGroup.add(m);
        setPlane(new THREE.Vector3(0, 1, 0), -y);
      }

      var ro = readout(ctrl, "");
      var defs = [
        { label: "过锥顶 → 三角形", n: "tri" },
        { label: "垂直轴线 → 圆", n: "circ" },
        { label: "斜切 → 椭圆", n: "ell" },
        { label: "平行一条素线 → 抛物线", n: "par" },
        { label: "平行轴线 → 双曲线", n: "hyp" },
      ];
      /* 截面实形小窗：3D 里曲线绕着锥面走，正面形状看这里最清楚 */
      var SHAPES = {
        tri: '<path d="M20 64 L80 64 L50 14 Z"/>',
        circ: '<circle cx="50" cy="40" r="26"/>',
        ell: '<ellipse cx="50" cy="40" rx="38" ry="21"/>',
        par: '<path d="M22 12 Q50 78 78 12"/>',
        hyp: '<path d="M62 8 C40 30 40 50 62 72"/>',
      };
      var box = document.createElement("div");
      box.className = "shapebox";
      box.style.cssText =
        "display:flex;align-items:center;gap:9px;background:#0d1220;border:1px solid #2c3752;" +
        "border-radius:9px;padding:4px 10px;flex:none";
      box.innerHTML =
        '<span style="color:#8fa2cc;font-size:11.5px;line-height:1.3">截面<br>实形</span>' +
        '<svg viewBox="0 0 100 80" width="76" height="61" fill="none" stroke="#ffe08a" stroke-width="2.6">' +
        SHAPES.ell +
        "</svg>";
      ctrl.appendChild(box);
      var texts = {
        tri: "截平面过锥顶：截交线是两条素线围成的三角形（含底面弦线）",
        circ: "截平面垂直轴线：截交线是圆，半径随高度变化",
        ell: "截平面倾斜且与所有素线相交：截交线是椭圆",
        par: "截平面平行于一条素线：截交线是抛物线（开口曲线）",
        hyp: "截平面平行于轴线：截交线是双曲线的一支（开口曲线）",
      };
      btnGroup(
        ctrl,
        defs,
        function (d) {
          if (d.n === "tri") triangle();
          else if (d.n === "circ") circleCut();
          else if (d.n === "ell") sampled(new THREE.Vector3(0.766, 0.643, 0), -0.1);
          else if (d.n === "par") sampled(new THREE.Vector3(0.9259, 0.3784, 0), -0.185);
          else if (d.n === "hyp") sampled(new THREE.Vector3(1, 0, 0), -0.3);
          ro.textContent = texts[d.n];
          box.querySelector("svg").innerHTML = SHAPES[d.n];
        }
      );
      /* 默认椭圆 */
      (function () {
        sampled(new THREE.Vector3(0.766, 0.643, 0), -0.1);
        ro.textContent = texts.ell;
      })();

      return { dispose: S.dispose };
    },
  };

  /* =========================================================
     场景 4：两圆柱正交相贯（第三章 3.4）
     ========================================================= */
  MSC.scenes.inters = {
    create: function (stage, ctrl) {
      var S = baseScene(stage, [6.0, 3.4, 5.8], 0.62);
      var R = 1.15,
        L = 3.4;

      var big = new THREE.Mesh(new THREE.CylinderGeometry(R, R, L, 64, 1, true), mat(0x9ec2ff, 0.2));
      big.rotation.z = Math.PI / 2;
      S.root.add(big);
      [-L / 2, L / 2].forEach(function (x) {
        var cap = new THREE.Mesh(new THREE.CircleGeometry(R, 64), mat(0x9ec2ff, 0.1));
        cap.rotation.y = x < 0 ? Math.PI / 2 : -Math.PI / 2;
        cap.position.x = x;
        S.root.add(cap);
      });
      S.root.add(lineTube(new THREE.Vector3(-L / 2 - 0.3, 0, 0), new THREE.Vector3(L / 2 + 0.3, 0, 0), 0x6fd3ff, 0.012));

      var small = new THREE.Mesh(new THREE.CylinderGeometry(1, 1, 3.0, 48, 1, true), mat(0xffc9a3, 0.4));
      small.position.y = 1.2;
      S.root.add(small);

      var CUT = 0xffe08a;
      var curves = [];
      function rebuild(r) {
        small.scale.set(r, 1, r);
        curves.forEach(function (m) {
          S.root.remove(m);
          m.geometry.dispose();
        });
        curves = [];
        /* 只画上支：小圆柱实际坐在大圆柱上方，下支属于假想的延长部分 */
        var pts = [];
        for (var i = 0; i <= 120; i++) {
          var th = (i / 120) * Math.PI * 2;
          var t2 = R * R - r * r * Math.sin(th) * Math.sin(th);
          if (t2 < 0) t2 = 0;
          var t = Math.sqrt(t2);
          pts.push(new THREE.Vector3(r * Math.cos(th), t, r * Math.sin(th)));
        }
        var m = polylineTube(pts, CUT, 0.024, true);
        if (m) { S.root.add(m); curves.push(m); }
      }

      var ro = readout(ctrl, "");
      slider(ctrl, "小圆柱半径 r（大圆柱 R=1.15）", 0.35, 1.15, 0.62, 0.01, function (r) {
        rebuild(r);
        var ratio = r / R;
        var desc;
        if (ratio > 0.985) desc = "两圆柱等径！相贯线退化为平面曲线（椭圆），主视图投影为直线";
        else if (ratio < 0.45) desc = "直径相差悬殊，相贯线很浅，可近似用圆弧（简化画法）";
        else desc = "相贯线朝大圆柱（横圆柱）方向弯曲，直径越接近弯得越深";
        ro.textContent = "r/R = " + ratio.toFixed(2) + " · " + desc;
      });
      rebuild(0.62);
      ro.textContent = "r/R = 0.54 · 相贯线朝大圆柱方向弯曲，直径越接近弯得越深";

      return { dispose: S.dispose };
    },
  };

  /* =========================================================
     场景 5：组合体爆炸（第四章 4.1）
     ========================================================= */
  MSC.scenes.combo = {
    create: function (stage, ctrl) {
      var S = baseScene(stage, [5.6, 3.6, 5.8], 0.25);

      var base = edgeBox(3.4, 0.55, 2.2, 0x9ec2ff, 0.5);
      base.position.set(0, -0.85, 0);
      S.root.add(base);

      var cyl = new THREE.Group();
      var cylM = new THREE.Mesh(new THREE.CylinderGeometry(0.8, 0.8, 1.8, 48), mat(0xa8e6c9, 0.55));
      cyl.add(cylM);
      [-0.9, 0.9].forEach(function (y) {
        var ring = new THREE.Mesh(new THREE.TorusGeometry(0.8, 0.012, 6, 56), mat(0xeafff5, 0.95));
        ring.rotation.x = Math.PI / 2;
        ring.position.y = y;
        cyl.add(ring);
      });
      cyl.position.set(0.65, 0.35, -0.55);
      S.root.add(cyl);

      var ribShape = new THREE.Shape();
      ribShape.moveTo(0, 0);
      ribShape.lineTo(0, 0.95);
      ribShape.lineTo(1.15, 0);
      ribShape.closePath();
      var rib = new THREE.Mesh(new THREE.ExtrudeGeometry(ribShape, { depth: 0.38, bevelEnabled: false }), mat(0xf2b8c6, 0.6));
      rib.position.set(-1.55, -0.575, -0.19);
      S.root.add(rib);

      var k = 0;
      slider(ctrl, "拆解程度", 0, 100, 0, 1, function (v) { k = v / 100; });
      var ro = readout(ctrl, "绿色=竖放圆柱，粉色=三棱柱肋板，蓝色=底板；合拢时注意表面相切处无线");
      S.onTick(function () {
        base.position.set(0, -0.85 - k * 1.1, 0);
        cyl.position.set(0.65 + k * 0.6, 0.35 + k * 1.5, -0.55 - k * 0.7);
        rib.position.set(-1.55 - k * 1.6, -0.575 + k * 0.8, -0.19);
      });

      return { dispose: S.dispose };
    },
  };

  /* =========================================================
     场景 6：正等测轴测轴（第五章 5.1）
     ========================================================= */
  MSC.scenes.axon = {
    create: function (stage, ctrl) {
      var S = baseScene(stage, [6.2, 6.2, 6.2]);
      S.setRot(0, 0); /* 相机已在 (1,1,1) 方向，旋转归零即标准正等测视角 */

      var cube = edgeBox(1.7, 1.7, 1.7, 0x9ec2ff, 0.4);
      cube.position.set(0.85, 0.85, 0.85);
      S.root.add(cube);

      var L = 2.3;
      var axes = [
        { dir: new THREE.Vector3(1, 0, 0), color: 0xff7a90, label: "X" },
        { dir: new THREE.Vector3(0, 1, 0), color: 0x6fe3b2, label: "Y" },
        { dir: new THREE.Vector3(0, 0, 1), color: 0x7aa8ff, label: "Z" },
      ];
      axes.forEach(function (a) {
        var p = a.dir.clone().multiplyScalar(L);
        S.root.add(lineTube(new THREE.Vector3(0, 0, 0), p, a.color, 0.03));
        S.root.add(labelSprite(a.label, "#ffffff", p.clone().multiplyScalar(1.12)));
      });

      var ro = readout(ctrl, "当前视角即正等测方向：三根轴投影两两成 120°，伸缩系数 p=q=r");
      var btn = document.createElement("button");
      btn.textContent = "复位到等测视角";
      btn.addEventListener("click", function () { S.setRot(0, 0); });
      var wrap = document.createElement("div");
      wrap.className = "btns";
      wrap.appendChild(btn);
      ctrl.appendChild(wrap);

      return { dispose: S.dispose };
    },
  };
})();
