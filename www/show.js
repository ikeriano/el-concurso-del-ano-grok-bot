// EL CONCURSO DEL AÑO (Cuatro, 2018-2021, Dani Martínez) · juego de fans de Iker
import M, { THREE } from './motor.js';
import { arrancar, chk, final } from './base.js';
import { ANIOS } from './anios.js';
const HOY = 2026; // las edades se calculan para 2026 (suponemos que ya han cumplido años este año)
const INV = '<span class="inv">INVENTADO</span>';
const PEN = [500, 1000, 1500, 2000, 2500, 3000];
const PISTAS = { cancion: '🎵 La canción', evento: '📰 El evento', foto: '📷 La foto personal', familiar: '👪 El dato familiar', famoso: '⭐ El famoso', zoom: '🔍 El zoom', recuerdo: '💭 El recuerdo' };
// ---------------- desconocidos INVENTADOS (personas anónimas que no existen)
function rng(s) { return () => (s = (s * 16807) % 2147483647) / 2147483647; }
const NOMBRES_H = ['Manolo', 'Javi', 'Kepa', 'Toni', 'Rafa', 'Luis', 'Paco', 'Jordi', 'Íñigo', 'Sergio', 'Álex', 'Rubén', 'Andrés', 'Pablo', 'Fermín', 'Iván', 'Óscar', 'Raúl', 'Hugo', 'Mario', 'Germán', 'Unai', 'Diego', 'Tomás', 'Julián', 'Ramón', 'Marcos', 'Nacho', 'Edu', 'Aitor'];
const NOMBRES_M = ['Lola', 'Maite', 'Ainhoa', 'Pili', 'Carmen', 'Rocío', 'Nerea', 'Marta', 'Sonia', 'Elena', 'Lucía', 'Bea', 'Amaia', 'Paula', 'Merche', 'Inma', 'Ana', 'Sara', 'Irene', 'Rosa', 'Noelia', 'Vane', 'Laura', 'Charo', 'Encarna', 'Julia', 'Olga', 'Claudia', 'Sofía', 'Itziar'];
const OFICIOS = ['panadero', 'peluquera', 'conductor de autobús', 'enfermera', 'profesor de música', 'mecánica', 'cocinero', 'fisioterapeuta', 'jardinero', 'informática', 'pastelero', 'bombera', 'farmacéutico', 'agricultora', 'cartero', 'dependienta', 'electricista', 'veterinaria', 'fontanero', 'socorrista'];
const FOTOS = [[6, 'en su primer día de colegio'], [9, 'el día de su primera comunión'], [12, 'en un campamento de verano'], [16, 'en las fiestas de su pueblo'], [18, 'en su viaje de fin de curso'], [4, 'en la playa con sus abuelos'], [21, 'en su primera moto']];
function genDesc(i) {
  const r = rng(1000 + i * 7919); const R = a => a[Math.floor(r() * a.length)];
  const anios = Object.keys(ANIOS).map(Number); const Y = anios[Math.floor(r() * anios.length)]; const edad = HOY - Y; const h = r() < .5;
  const nombre = R(h ? NOMBRES_H : NOMBRES_M); let oficio = R(OFICIOS); const fem = !h;
  oficio = fem ? oficio.replace(/ero$/, 'era').replace(/or de/, 'ora de').replace(/^conductor/, 'conductora').replace('farmacéutico', 'farmacéutica').replace('fontanero', 'fontanera').replace('cartero', 'cartera').replace('profesor', 'profesora') : oficio.replace(/era$/, 'ero').replace('peluquera', 'peluquero').replace('enfermera', 'enfermero').replace('mecánica', 'mecánico').replace('informática', 'informático').replace('bombera', 'bombero').replace('agricultora', 'agricultor').replace('dependienta', 'dependiente').replace('veterinaria', 'veterinario');
  const a = 18 + Math.floor(r() * Math.max(1, Math.min(14, edad - 18)));
  const fams = [
    `Se casó en ${Y + a + 3 > HOY ? HOY - 1 : Y + a + 3}, cuando tenía ${Math.min(edad - 1, a + 3)} años.`,
    `Empezó a trabajar de ${oficio} con ${a} años y ya lleva ${edad - a} años en el oficio.`,
    `Se sacó el carné de conducir a la primera, en ${Y + 18}, el mismo año que cumplió los 18.`,
    `Su ${fem ? 'hija' : 'hijo'} mayor nació cuando ${fem ? 'ella' : 'él'} tenía ${a + 6} años y hoy ese ${fem ? 'hija' : 'hijo'} tiene ${Math.max(0, edad - a - 6)} años.`,
    `Su ${h ? 'hermano' : 'hermana'} pequeñ${h ? 'o' : 'a'} tiene ${edad - 4} años y se llevan cuatro años.`,
  ].filter((t, k) => k !== 3 || edad - a - 6 >= 0);
  const [fe, fd] = R(FOTOS.filter(f => f[0] < edad));
  const evR = ANIOS[Y + 10] ? `Recuerda perfectamente, con unos diez años, cuando ${ANIOS[Y + 10].e.charAt(0).toLowerCase() + ANIOS[Y + 10].e.slice(1)}.` : `Recuerda que con veinte años ya tenía su primer teléfono móvil.`;
  return { id: i, nombre, h, oficio, Y, edad, fam: R(fams), foto: { edad: fe, txt: `${nombre} con ${fe} años, ${fd}`, anio: Y + fe }, recuerdo: evR,
    look: { piel: R([0xf1c6a0, 0xe8b48c, 0xc68c5e, 0xf7d9bf]), pelo: edad > 60 ? R([0xdddddd, 0xbbbbbb, 0xeeeeee]) : edad > 48 ? R([0x7a6a5a, 0x999999, 0x3b2a1a]) : R([0x2a1a10, 0x5a3a1a, 0xc89a50, 0x111111, 0x8a4a2a]), peinado: h ? (edad > 55 && r() < .5 ? 'calvo' : R(['corto', 'tupe', 'rizado'])) : R(['largo', 'melena', 'coleta', 'rizado']), barba: h && r() < .4 ? (edad > 55 ? 0xcccccc : 0x3a2a1a) : 0, camisa: R([0xe94b4b, 0x3b7be9, 0x3bbf6b, 0xf2c230, 0xffffff, 0x9b59b6, 0xff8a3d, 0x47c9d8]), pantalon: R([0x223355, 0x111111, 0x5a4a3a, 0x3b5b8b]), gafas: edad > 45 && r() < .45 ? 0x222222 : 0, altura: .93 + r() * .14, vestido: !h && r() < .3 } };
}
const POOL = Array.from({ length: 90 }, (_, i) => genDesc(i));
// ---------------- plató (referencia: programas de Cuatro, fotogramas de YouTube): suelo lila brillante, ventanales circulares blancos,
// pantallas gigantes con el bote y la edad, atril blanco con el «1», globos y tarta de cumpleaños
let P = {};
function plato() {
  // Referencias: fotos que mandó Iker + fotogramas de YouTube. Paredes LED azules con aros blancos y edades (39, 67, 72…),
  // suelo circular lila y blanco, túnel de arcos de neón blancos al fondo donde espera el desconocido,
  // dos pantallas gigantes (premio + escalera de penalizaciones / silueta con la edad), mesas blancas con disco azul del dinero.
  const s = M.scene; s.background = new THREE.Color(0x0a0f3a); s.fog = new THREE.Fog(0x0a0f3a, 32, 70);
  const suelo = new THREE.Mesh(new THREE.CircleGeometry(30, 56), new THREE.MeshLambertMaterial({ color: 0xb9a8e8 })); suelo.rotation.x = -Math.PI / 2; s.add(suelo);
  M.cil(9, 9, .06, 0xeeeaff, 0, .03, 0, 56);
  for (let i = 0; i < 6; i++) M.aro(2 + i * 1.6, .045, [0xffffff, 0xd88cff, 0xffffff, 0x9fb8ff, 0xffffff, 0xd88cff][i], 0, .08, 0).rotation.x = Math.PI / 2;
  for (let i = 0; i < 16; i++) { const a = i / 16 * Math.PI * 2; const l = M.caja(.08, .02, 7, 0xffffff, Math.sin(a) * 5.5, .07, Math.cos(a) * 5.5); l.rotation.y = a; }
  // paredes LED azules en semicírculo con mosaico y aros con edades
  const led = M.tex(256, 256, (g, w, h) => { g.fillStyle = '#1c3fc4'; g.fillRect(0, 0, w, h); for (let y = 0; y < 16; y++) for (let x = 0; x < 16; x++) { g.fillStyle = (x + y) % 3 ? '#2a55e0' : '#3d6cf0'; g.fillRect(x * 16 + 1, y * 16 + 1, 14, 14); } });
  led.wrapS = led.wrapT = THREE.RepeatWrapping; led.repeat.set(2, 3);
  const edades = [39, 67, 72, 69, 80, 22, 57, 31, 45, 18, 90];
  for (let i = -5; i <= 5; i++) { const a = i * .27, r = 15, x = Math.sin(a) * r, z = -Math.cos(a) * r;
    const p = new THREE.Mesh(new THREE.PlaneGeometry(2.6, 10), new THREE.MeshBasicMaterial({ map: led })); p.position.set(x, 5, z); p.lookAt(0, 5, 0); s.add(p);
    const n = edades[i + 5]; const ring = M.panel(2.3, 2.3, 256, 256, (g, w, h) => { g.fillStyle = '#0c1440'; g.beginPath(); g.arc(128, 128, 110, 0, 7); g.fill(); g.strokeStyle = '#fff'; g.lineWidth = 18; g.beginPath(); g.arc(128, 128, 112, 0, 7); g.stroke(); g.fillStyle = '#fff'; g.font = 'bold 120px Jost'; g.textAlign = 'center'; g.fillText(n, 128, 170); }, x * .98, 8.6, z * .98); ring.lookAt(0, 8.6, 0);
    if (Math.abs(i) > 1) { const lu = M.caja(.15, 10, .15, 0xffffff, x * .97, 5, z * .97); } }
  // túnel de arcos de neón blancos al fondo (aquí sale y espera el desconocido)
  for (let i = 0; i < 5; i++) { const a = M.aro(1.6 + i * .45, .07, 0xffffff, 0, 2.6, -8.5 - i * .05, s, Math.PI); M.caja(.14, 2.6, .14, 0xffffff, -(1.6 + i * .45), 1.3, -8.5); M.caja(.14, 2.6, .14, 0xffffff, (1.6 + i * .45), 1.3, -8.5); }
  M.caja(7, 7, .2, 0xe8a0ff, 0, 3.5, -9.2).material = M.basic(0xd890f0);
  M.cil(2, 2.1, .25, 0xffffff, 0, .12, -7.6, 40);
  // pantallas gigantes
  P.bote = M.panel(5.4, 4.2, 512, 400, (g, w, h) => pBote(g, w, h, P.dinero ?? 50000, P.titBote), -5.6, 4.3, -7.3); P.bote.rotation.y = .32;
  P.pEdad = M.panel(5.4, 4.2, 512, 400, (g, w, h) => pEdad(g, w, h, P.edadMostrada), 5.6, 4.3, -7.3); P.pEdad.rotation.y = -.32;
  // mesas blancas con disco azul (dinero) y pulsadores
  const mesa = (x, z) => { const m = new THREE.Group(); m.position.set(x, 0, z); s.add(m);
    M.caja(3.6, .12, 1, 0xffffff, 0, 1.15, 0, m); M.caja(3.4, .1, .9, 0xffffff, 0, .55, 0, m); for (const px of [-1.6, 1.6]) M.cil(.04, .04, 1.15, 0xdddddd, px, .58, .3, 8, m);
    const disco = M.cil(1.05, 1.05, .35, 0xffffff, 0, 1.0, -.55, 40, m); disco.rotation.x = Math.PI / 2;
    m.userData.dinero = M.panel(1.5, 1.5, 256, 256, (g, w, h) => { g.fillStyle = '#1e4fd8'; g.beginPath(); g.arc(128, 128, 120, 0, 7); g.fill(); g.strokeStyle = '#8fb0ff'; g.lineWidth = 6; g.stroke(); g.fillStyle = '#fff'; g.beginPath(); g.roundRect(28, 106, 200, 46, 10); g.fill(); g.fillStyle = '#1e3fa8'; g.font = 'bold 34px Jost'; g.textAlign = 'center'; g.fillText(M.euros(m.userData.v ?? 50000), 128, 141); }, 0, 1.0, -.74, m); m.userData.dinero.rotation.y = Math.PI;
    for (const px of [-.8, .8]) { M.cil(.12, .14, .08, 0x222222, px, 1.25, .1, 12, m); M.cil(.08, .08, .06, 0xff3355, px, 1.31, .1, 12, m); }
    m.poner = v => { m.userData.v = v; m.userData.dinero.redib(); }; return m; };
  P.atril = mesa(0, 6.2); P.atril2 = mesa(3, 6.2); P.atril2.visible = false;
  M.publico(3, 24, 16.5, Math.PI * .6, Math.PI * 1.4, 0); M.publico(3, 9, 13.5, -Math.PI * .5, -Math.PI * .3, 0); M.publico(3, 9, 13.5, Math.PI * .3, Math.PI * .5, 0);
  M.focos([0xffffff, 0xd88cff, 0x8fb0ff, 0xffffff, 0xd88cff]);
  // presentador: Dani Martínez (pelo castaño oscuro con tupé, barba corta, americana granate o camisa vaquera)
  M.pres = M.persona({ piel: 0xf0c4a0, pelo: 0x2a1c12, peinado: 'tupe', barba: 0x2a1c12, camisa: 0x111111, chaqueta: 0x7a1f2b, pantalon: 0x1e2433, zapatos: 0x1a1a1a, altura: 1.05, nombre: 'Dani Martínez', colorNombre: '#1e4fd8' });
  M.pres.position.set(2.8, 0, 3.2); M.pres.rotation.y = -.6; s.add(M.pres);
}
function pBote(g, w, h, v, tit) { g.fillStyle = '#1c3fc4'; g.fillRect(0, 0, w, h); g.fillStyle = '#2a55e0'; for (let y = 0; y < 20; y++) for (let x = 0; x < 26; x++) if ((x * y) % 3) g.fillRect(x * 20, y * 20, 18, 18);
  g.textAlign = 'center'; g.fillStyle = '#fff'; g.font = 'bold 34px Jost'; g.fillText(tit || 'PREMIO', 130, 48); g.fillStyle = '#0c1440'; g.beginPath(); g.roundRect(20, 62, 220, 62, 10); g.fill(); g.fillStyle = '#fff'; g.font = 'bold 44px Jost'; g.fillText(M.euros(v), 130, 108);
  g.drawImage(LOGOIMG, 30, 150, 210, 210);
  const r = P.ronda ?? -1; PEN.slice().reverse().forEach((p, i) => { const k = 5 - i, y = 30 + i * 60; g.fillStyle = k === r ? '#ff5fd2' : '#0c1440'; g.beginPath(); g.roundRect(290, y, 200, 48, 8); g.fill(); g.fillStyle = '#fff'; g.font = 'bold 30px Jost'; g.textAlign = 'left'; g.fillText(k + 1, 302, y + 35); g.textAlign = 'right'; g.fillText(M.euros(p), 480, y + 35); }); }
function pEdad(g, w, h, e) { g.fillStyle = '#1c3fc4'; g.fillRect(0, 0, w, h); g.fillStyle = '#2a55e0'; for (let y = 0; y < 20; y++) for (let x = 0; x < 26; x++) if ((x + y) % 4) g.fillRect(x * 20, y * 20, 18, 18);
  if (P.imgPista) { g.fillStyle = '#ff7fd8'; g.fillRect(60, 30, 392, 300); g.fillStyle = '#fff'; g.font = 'bold 36px Jost'; g.textAlign = 'center'; wrap(g, P.imgPista, 256, 150, 360, 42); return; }
  g.fillStyle = '#5a3fb0'; g.beginPath(); g.arc(256, 200, 150, 0, 7); g.fill(); g.strokeStyle = '#d88cff'; g.lineWidth = 8; g.stroke();
  g.fillStyle = '#1a1050'; g.beginPath(); g.arc(256, 140, 60, 0, 7); g.fill(); g.beginPath(); g.ellipse(256, 300, 120, 90, 0, Math.PI, 0); g.fill();
  g.fillStyle = '#fff'; g.textAlign = 'center'; g.font = 'bold 96px Jost'; g.fillText(e == null ? '?' : e, 256, 250); }
function wrap(g, t, x, y, mw, lh) { const ws = t.split(' '); let l = '', ls = []; for (const w of ws) { if (g.measureText(l + w).width > mw) { ls.push(l); l = ''; } l += w + ' '; } ls.push(l); ls.forEach((q, i) => g.fillText(q.trim(), x, y + (i - ls.length / 2) * lh + lh / 2)); }
const LOGOIMG = new Image(); LOGOIMG.src = 'logo_cda.png'; LOGOIMG.onload = () => P.bote && P.bote.redib();
const refrescar = () => { P.bote.redib(); P.pEdad.redib(); P.atril.poner(P.dinero ?? 50000); if (P.atril2.visible && P.din2 != null) P.atril2.poner(P.din2); };
// ---------------- personajes de la partida
let pareja = [], pareja2 = [], desc = null;
const PAREJAS = [['Iker', 'Ane'], ['Lucía', 'Mar'], ['Toni', 'Rafa'], ['Elena', 'Jorge']];
function ponerPareja(nombres, atril, col) { const out = []; nombres.forEach((n, i) => { const f = /a$|ía$|Ane|Mar|Elena|Lucía/.test(n) && n !== 'Kepa'; const p = M.persona({ nombre: n, colorNombre: col, piel: [0xf1c6a0, 0xe8b48c][i], pelo: [0x2a1a10, 0x6a3a1a][i], peinado: f ? 'melena' : 'corto', camisa: 0xffffff, pantalon: 0x223355, vestido: f && i, mangaCorta: 1 }); p.position.set(atril.position.x + (i ? .8 : -.8), 0, atril.position.z + .6); p.rotation.y = Math.PI + (atril.position.x ? -atril.position.x * .06 : 0); M.scene.add(p); out.push(p); }); return out; }
function quitar(arr) { arr.forEach(p => M.scene.remove(p)); }
async function salidaDesconocido(d) {
  if (desc) M.scene.remove(desc); desc = M.persona({ ...d.look }); desc.position.set(0, 0, -11); M.scene.add(desc);
  M.cam([0, 2.2, -1], [0, 1.8, -9], 1.2); M.sfx('whoosh'); M.aplaudir(2);
  await M.andar(desc, 0, -7.4); desc.rotation.y = 0;
  await M.cam([0, 2.6, 9], [0, 2.4, -5], 1);
}
// ---------------- UI de la tableta
function tableta(tit, val, conReloj = true, conf = 'CONFIRMAR') { return `<div class="tablet"><div class="tit">${tit}</div>${conReloj ? '<div class="reloj" id="reloj">15</div>' : ''}<div class="edad" id="vEdad">${val}</div>
  <div class="fila">${M.btn('m10', '−10')}${M.btn('m1', '−1')}${M.btn('p1', '+1')}${M.btn('p10', '+10')}</div>${M.btn('ok', conf, 'grande')}</div>`; }
async function pedirEdad(tit, ini, seg, marca) { let v = ini; M.ui(tableta(tit, v, !!seg), ''); if (marca) await M.marca(marca); const rel = seg ? M.reloj(seg) : null; let fin = false; if (rel) rel.then(() => fin = true);
  while (true) { const a = await Promise.race([M.elegir(['m10', 'm1', 'p1', 'p10', 'ok']), rel ? rel.then(() => 'fin') : new Promise(() => { })]); chk();
    if (a === 'fin' || a === null) { M.ui(''); return { v: ini, tarde: true }; }
    if (a === 'ok') { rel && rel.parar(); M.ui(''); return { v }; }
    v = Math.max(1, Math.min(110, v + { m10: -10, m1: -1, p1: 1, p10: 10 }[a])); document.getElementById('vEdad').textContent = v; }
}
async function teclado(tit, seg) { let s = ''; setTimeout(() => M.marca('final_tableta'), 50); M.ui(`<div class="tablet"><div class="tit">${tit}</div><div class="reloj" id="reloj">${seg}</div><div class="edad" id="vEdad">__</div><div class="kp">${[1, 2, 3, 4, 5, 6, 7, 8, 9, 'B', 0, 'OK'].map(k => M.btn('k' + k, k === 'B' ? '⌫' : k === 'OK' ? 'CONFIRMAR' : k)).join('')}</div></div>`);
  const rel = M.reloj(seg); while (true) { const a = await Promise.race([M.elegir(['k0', 'k1', 'k2', 'k3', 'k4', 'k5', 'k6', 'k7', 'k8', 'k9', 'kB', 'kOK']), rel.then(() => 'fin')]); chk();
    if (a === 'fin' || a == null) { M.ui(''); return s ? +s : null; } if (a === 'kOK') { if (!s) continue; rel.parar(); M.ui(''); return +s; } if (a === 'kB') s = s.slice(0, -1); else if (s.length < 3) s += a.slice(1); document.getElementById('vEdad').textContent = s || '__'; }
}
// ---------------- las pistas
function fotoURL(d) { const t = M.tex(300, 360, (g, w, h) => { const Y = d.foto.anio; const bn = Y < 1966, sep = Y < 1982;
  const cielo = bn ? '#bbb' : sep ? '#e0c49a' : Y < 2003 ? '#9cc7e8' : '#6cb8ff'; g.fillStyle = '#fff'; g.fillRect(0, 0, w, h); g.fillStyle = cielo; g.fillRect(14, 14, w - 28, 270); g.fillStyle = bn ? '#777' : sep ? '#b08a5a' : '#6cbf6c'; g.fillRect(14, 210, w - 28, 74);
  const sc = .45 + Math.min(d.foto.edad, 18) / 30; const cx = w / 2, by = 270; const col = c => bn ? '#555' : sep ? '#8a6a4a' : c;
  g.fillStyle = col('#' + d.look.camisa.toString(16).padStart(6, '0')); g.fillRect(cx - 40 * sc, by - 150 * sc, 80 * sc, 100 * sc); g.fillStyle = col('#f1c6a0'); g.beginPath(); g.arc(cx, by - 180 * sc, 34 * sc, 0, 7); g.fill();
  g.fillStyle = col(d.foto.edad < 20 ? '#3a2a1a' : '#3a2a1a'); g.beginPath(); g.arc(cx, by - 192 * sc, 34 * sc, Math.PI, 0); g.fill(); g.fillStyle = col('#223355'); g.fillRect(cx - 34 * sc, by - 50 * sc, 28 * sc, 50 * sc); g.fillRect(cx + 6 * sc, by - 50 * sc, 28 * sc, 50 * sc);
  if (/comunión/.test(d.foto.txt)) { g.fillStyle = bn ? '#eee' : '#fff'; g.fillRect(cx - 40 * sc, by - 150 * sc, 80 * sc, 100 * sc); }
  if (sep && !bn) { g.fillStyle = '#c89a5a33'; g.fillRect(14, 14, w - 28, 270); }
  g.fillStyle = '#333'; g.font = '22px Jost'; g.textAlign = 'center'; g.fillText(Y < 2003 ? 'foto de papel' : 'foto digital', w / 2, 320); }); return t.userData.c.toDataURL('image/jpeg', .8); }
async function mostrarPista(k, d, esp) {
  M.sfx('clave'); M.rotulo(PISTAS[k]); await M.marca('pista_' + k); const A = ANIOS[d.Y];
  if (k === 'zoom') { await M.cam([0, 1.85, -5.8], [0, 1.75, -7.4], 1.4); await M.decir('Acercaos bien. Fijaos en su piel, en su pelo, en sus manos.', null, { corto: 1 }); await M.esperar(2500); await M.cam([0, 2.6, 9], [0, 2.4, -5], 1); return; }
  const html = {
    cancion: `<h3>🎵 La canción</h3><p>Una canción que salió el año en que nació:</p><p><b>${A.c}</b></p><p class="nota">(El juego no incluye la grabación original: se muestra el título real.)</p>`,
    evento: `<h3>📰 El evento</h3><p>El año en que nació pasó esto:</p><p><b>${A.e}</b></p>`,
    foto: `<h3>📷 La foto personal ${INV}</h3><img class="foto" src="${fotoURL(d)}"><p>${d.foto.txt}.</p><p class="nota">Foto dibujada de una persona inventada. Fíjate en el tipo de foto.</p>`,
    familiar: `<h3>👪 El dato familiar ${INV}</h3><p>${d.fam}</p>`,
    famoso: `<h3>⭐ El famoso</h3><p>Nació el mismo año que…</p><p style="font-size:1.5em"><b>${A.f}</b></p>`,
    recuerdo: `<h3>💭 El recuerdo ${INV}</h3><p>${d.recuerdo}</p>`,
  }[k];
  P.imgPista = { evento: A.e, famoso: A.f, cancion: A.c }[k] || null; P.pEdad.redib(); M.hud(`<div class="ficha">${html}</div>`); if (k === 'cancion') { M.sfx('bote'); }
  await M.decir({ cancion: 'Escuchad la canción. Salió el año en que nació.', evento: 'Atención al evento de su año de nacimiento.', foto: 'Mirad bien esta foto personal.', familiar: 'Ahí va el dato familiar.', famoso: 'Nació el mismo año que este famoso.', recuerdo: 'Y ahora, el recuerdo.' }[k], null, { corto: 1 });
  await M.esperar(M.demo ? 600 : 3500); P.imgPista = null; P.pEdad.redib();
}
// ---------------- IA de la pareja rival (especiales) y de los padrinos
const estimar = (d, n) => Math.max(18, Math.round(d.edad + (Math.random() * 2 - 1) * n));
// ---------------- PARTIDA
let ESP = false; let HIST = [];
// iconos de silueta como en el programa: verde = edad exacta, rojo = fallo (con la edad real), morado = pendiente
const siluetas = () => `<div class="silu">${Array.from({ length: 7 }, (_, i) => { const h = HIST[i]; return `<span class="${h ? (h.ok ? 'v' : 'r') : 'p'}"><svg viewBox="0 0 40 40"><circle cx="20" cy="14" r="7" fill="#fff8"/><path d="M6 38c0-9 6-14 14-14s14 5 14 14z" fill="#fff8"/></svg><b>${h ? h.edad : ''}</b></span>`; }).join('')}</div>`;
async function partida(especial = false, soloFase = null) {
  ESP = especial; const base = especial ? 100000 : 50000, bonusD = especial ? 1000 : 500; const desconocidos = M.mezclar(POOL).slice(0, 7);
  const nombres = PAREJAS[Math.floor(Math.random() * PAREJAS.length)];
  let padrinos = null; if (especial) padrinos = M.pick(ESPECIALES);
  P.atril.position.set(especial ? -3 : 0, 0, 6.2); P.atril2.visible = especial; P.atril2.position.set(3, 0, 6.2);
  quitar(pareja); quitar(pareja2); pareja = ponerPareja(nombres, P.atril, '#7b3fd1'); let rival = null;
  const eq = [{ nom: nombres.join(' y '), din: base, yo: 1 }];
  if (especial) { const rn = M.pick(PAREJAS.filter(p => p !== nombres)); pareja2 = ponerPareja(rn, P.atril2, '#c2185b'); eq.push({ nom: rn.join(' y '), din: base }); eq[0].padrino = padrinos.vip[0]; eq[1].padrino = padrinos.vip[1]; }
  P.dinero = base; P.titBote = eq[0].nom.toUpperCase(); P.edadMostrada = null; refrescar();
  HIST = []; const marc = () => M.hud(siluetas() + `<div class="marcador">${M.euros(eq[0].din)}<small>${eq[0].nom}${eq[0].padrino ? ' · padrino/a: ' + eq[0].padrino : ''}</small></div>${eq[1] ? `<div class="marcador m2">${M.euros(eq[1].din)}<small>${eq[1].nom} · padrino/a: ${eq[1].padrino}</small></div>` : ''}`);
  await M.cortinilla(especial ? 'Especial de noche' : 'El Concurso del Año', especial ? `Dos parejas, dos padrinos famosos y ${M.euros(base)}` : `${M.euros(base)} en juego`);
  M.musica('audio/sintonia.mp3', .25); await M.cam([4, 3, 9], [2.8, 1.6, 3], 1.2); M.pres.rotation.y = .3;
  await M.marca('presentacion');
  if (!soloFase) {
    await M.decir('¡Hola, hola, hola! Bienvenidos a El Concurso del Año, el concurso en el que la edad sí importa.'); chk();
    if (especial) { await M.decir(`Hoy es un especial de noche: dos parejas, cada una con su padrino famoso, y cien mil euros para cada una.`); await M.decir('Y además de las seis pistas de siempre, hoy tenemos una nueva: el recuerdo.'); M.rotulo('Padrinos de esta noche', `${padrinos.vip[0]} y ${padrinos.vip[1]} (especial real del ${padrinos.f})`); }
    else await M.decir('Tenéis cincuenta mil euros. Siete desconocidos. Tenéis que adivinar su edad exacta. ¡Vamos a por ello!');
    chk();
  }
  M.pararMusica();
  const disponibles = Object.keys(PISTAS).filter(k => especial || k !== 'recuerdo');
  const usadas = new Set();
  const nRondas = soloFase === 'final' ? 0 : soloFase === 'f1' ? 1 : 6;
  for (let r = 0; r < nRondas; r++) { chk(); const d = desconocidos[r]; P.edadMostrada = null; refrescar(); marc();
    P.ronda = r; M.rotulo(`Desconocido ${r + 1} de 7`, `Penalización: ${M.euros(PEN[r])} por cada año de diferencia`);
    await salidaDesconocido(d); await M.marca('desconocido');
    await M.decir(r === 0 ? 'Aquí tenemos a nuestro primer desconocido. ¿Cuántos años tiene?' : M.pick(['¡Aquí llega el siguiente desconocido!', 'Mirad bien. ¿Cuántos años le echáis?', 'Atentos, que este tiene truco.']), null, { corto: 1 });
    M.cam([0, 2.8, 11], [0, 2.2, -4], .8);
    // 1) estimación provisional
    const prov = await pedirEdad('Estimación provisional', 40, 0, 'provisional'); chk(); const provRival = especial ? estimar(d, 9) : null;
    // 2) elegir pista (cada pista solo se usa una vez en el programa)
    const elige = especial && r % 2 === 1 ? 1 : 0; let k;
    const libres = disponibles.filter(x => !usadas.has(x));
    if (elige === 0) { M.ui(`<div class="marco"><h2>Elegid una pista</h2><div class="pistas">${disponibles.map(x => `<button class="b" data-acc="pi_${x}" ${usadas.has(x) ? 'disabled' : ''}>${PISTAS[x]}</button>`).join('')}</div></div>`); await M.marca('elegir_pista'); k = (await M.elegir(libres.map(x => 'pi_' + x))).slice(3); M.ui(''); }
    else { k = M.pick(libres); await M.decir(`Esta vez elige la pista la otra pareja: ${PISTAS[k].slice(2).trim()}.`, null, { corto: 1 }); }
    usadas.add(k); chk();
    await mostrarPista(k, d, especial); chk();
    // 3) 15 segundos para confirmar o cambiar; si no pulsan, vale la provisional
    const res = await pedirEdad('¿Confirmáis o cambiáis? (15 s)', prov.v, 15, 'confirmar'); M.hud(''); chk();
    const apuesta = res.v; if (res.tarde) await M.decir('¡Se acabó el tiempo! Vale la edad que dijisteis antes de la pista.', null, { corto: 1 });
    const apuestaR = especial ? estimar(d, 5) : null;
    // revelación
    M.cam([0, 2.4, -2], [0, 1.8, -7.4], 1); await M.decir(`Vuestra apuesta: ${apuesta} años. ${d.nombre}, ¿cuántos años tienes?`, null, { corto: 1 }); M.sfx('redoble'); await M.esperar(1500);
    P.edadMostrada = d.edad; refrescar(); M.rotulo(`${d.nombre}: ${d.edad} años`, `${d.oficio} · nació en ${d.Y} · persona inventada`);
    await M.cam([2, 4, 4], [3.5, 4, -7], 1); await M.marca('revelacion');
    const tratar = async (e, ap, quien) => { const dif = Math.abs(ap - d.edad); if (dif === 0) { M.sfx('acierto'); M.aplaudir(3); M.celebrar(quien[0]); M.celebrar(quien[1]); return `${e.nom}: ¡edad exacta! El dinero queda intacto.`; }
      const pen = dif * PEN[r]; e.din = Math.max(0, e.din - pen); M.sfx('fallo'); let t = `${e.nom}: ${dif} año${dif > 1 ? 's' : ''} de diferencia, pierden ${M.euros(pen)}.`;
      if (dif > 10 || (especial && dif >= 10)) { t += ` ${d.nombre} se lleva ${M.euros(bonusD)} por despistarles.`; M.celebrar(desc); } return t; };
    const t1 = await tratar(eq[0], apuesta, pareja); HIST[r] = { edad: d.edad, ok: apuesta === d.edad }; let t2 = ''; if (especial) t2 = await tratar(eq[1], apuestaR, pareja2);
    P.dinero = eq[0].din; P.din2 = eq[1] ? eq[1].din : null; refrescar(); marc();
    await M.decir(t1 + (t2 ? ' ' + t2 : ''), null, { corto: 0 }); chk();
    await M.andar(desc, 0, -11); 
  }
  // ---------------- RONDA FINAL
  let fin = eq[0]; if (especial && !soloFase) { fin = eq[0].din >= eq[1].din ? eq[0] : eq[1];
    await M.decir(`Después de seis desconocidos, la pareja con más dinero es ${fin.nom}. ¡Ellos juegan la ronda final!`); if (!fin.yo) { await M.decir('Esta vez la final la juega la otra pareja. Vamos a verla.'); } }
  if (soloFase === 'final') fin.din = base;
  M.cortinilla('Ronda final', 'El séptimo desconocido, el más misterioso'); await M.esperar(800);
  const d = desconocidos[6]; P.edadMostrada = null; P.dinero = fin.din; P.titBote = fin.nom.toUpperCase(); refrescar(); marc();
  await salidaDesconocido(d); await M.decir(`El séptimo desconocido. Jugáis por ${M.euros(fin.din)}. Descartad dos pistas, y tendréis cuatro intentos.`); chk();
  let elegidas;
  if (fin.yo) { const desc2 = new Set(); while (desc2.size < 2) { M.ui(`<div class="marco"><h2>Descartad ${2 - desc2.size} pista${desc2.size ? '' : 's'}</h2><div class="pistas">${disponibles.map(x => `<button class="b" data-acc="pi_${x}" ${desc2.has(x) ? 'disabled' : ''}>${PISTAS[x]}</button>`).join('')}</div></div>`); await M.marca('final_descartar'); const k = (await M.elegir(disponibles.filter(x => !desc2.has(x)).map(x => 'pi_' + x))).slice(3); desc2.add(k); }
    M.ui(''); elegidas = M.mezclar(disponibles.filter(x => !desc2.has(x))); }
  else elegidas = M.mezclar(disponibles).slice(0, disponibles.length - 2);
  let bote = fin.din, gano = false;
  for (let i = 0; i < 4; i++) { chk(); M.rotulo(`Intento ${i + 1} de 4`, `Jugáis por ${M.euros(bote)}`); const k = elegidas[i]; await M.decir(`Intento número ${i + 1}. La pista que sale al azar es: ${PISTAS[k].slice(2).trim()}.`, null, { corto: 1 }); await mostrarPista(k, d, especial); chk();
    let ap;
    if (fin.yo) ap = await teclado(`Intento ${i + 1}: escribid la edad (15 s)`, 15); else { ap = estimar(d, 4 - i); await M.esperar(1500); }
    M.hud(''); chk(); M.sfx('redoble'); await M.decir(ap == null ? 'No habéis confirmado a tiempo.' : `Habéis escrito ${ap} años.`, null, { corto: 1 }); await M.esperar(1000);
    if (ap === d.edad) { gano = true; break; }
    bote = i < 3 ? Math.floor(bote / 2) : 0; M.sfx('fallo'); P.dinero = bote; refrescar(); if (i < 3) await M.decir(`¡No es correcto! El dinero se reduce a la mitad: ${M.euros(bote)}.`, null, { corto: 1 }); }
  HIST[6] = { edad: d.edad, ok: gano }; marc(); P.edadMostrada = d.edad; refrescar(); M.rotulo(`${d.nombre}: ${d.edad} años`, `nació en ${d.Y} · persona inventada`); await M.marca('final_resultado');
  if (gano) { M.aplaudir(4); M.sfx('bote'); (fin.yo ? pareja : pareja2).forEach(p => M.celebrar(p, 3500)); await M.decir(`¡Sí! ¡${d.edad} años! ¡${fin.nom}, os lleváis ${M.euros(bote)}!`); }
  else await M.decir(`Lo siento muchísimo. Tenía ${d.edad} años. Esta vez os vais sin premio, pero os vais con nuestro cariño.`);
  if (!soloFase) await final(S, gano ? `¡${M.euros(bote)}!` : 'Fin del programa', `${fin.nom} ${gano ? 'gana ' + M.euros(bote) : 'no consigue el premio'}. ${d.nombre} tenía ${d.edad} años.`);
  else { M.ui(`<div class="marco"><h2>Fin del entrenamiento</h2>${M.btn('menu2', 'Volver al menú')}</div>`); await M.elegir(['menu2'], M.demo ? 1200 : 0); }
  quitar(pareja); quitar(pareja2); pareja = []; pareja2 = []; if (desc) M.scene.remove(desc); desc = null; P.atril2.visible = false; P.atril.position.set(0, 0, 6.2); M.hud('');
}
// especiales de noche REALES (2019 y 2021) con sus invitados VIP
const ESPECIALES = [['2019', 'Toni Acosta', 'Marta Belenguer'], ['2019', 'Toñi Moreno', 'Rosana'], ['2019', 'Vanesa Romero', 'Antonio Pagudo'], ['2019', 'Edurne', 'Blas Cantó'], ['2021', 'Boris Izaguirre', 'Lydia Lozano'], ['2021', 'Santi Millán', 'Diego Arroba «El Cejas»'], ['2021', 'Paz Padilla', 'Anna Ferrer'], ['2021', 'Canco Rodríguez', 'Miriam Rodríguez'], ['2021', 'Amaya Valdemoro', 'Fernando Romay'], ['2021', 'Omar Montes', 'Ana Mena'], ['2021', 'Pablo Chiapella', 'Eva Isanta'], ['2021', 'Falete', 'Isabel Rojas']].map(([f, a, b]) => ({ f, vip: [a, b] }));
const LOGO = `<img src="logo_cda.png" style="width:min(40vw,72vh)"><div class="logo" style="display:none"><div class="l1">EL</div><div class="l2">CONCURSO</div><div class="l3">DEL AÑO</div></div>`;
const S = {
  id: 'cda', titulo: 'El Concurso del Año', cadena: 'Cuatro', presentador: 'Dani Martínez', fondo: 0x1b0a3a, logoHTML: LOGO, sintonia: 'audio/sintonia.mp3',
  construirPlato: plato, camMenu: [[-3, 3.5, 12], [1, 2.5, 0]],
  cab: { fondo: 0x0a0f3a, colores: [0xffffff, 0xff5fd2, 0x3d9bff, 0x9fd4ff], forma: 'aros', logo: (g, w, h) => { if (LOGOIMG.complete) { g.drawImage(LOGOIMG, 312, 56, 400, 400); return; } g.textAlign = 'center'; g.fillStyle = '#fff'; g.shadowColor = '#3a0f90'; g.shadowOffsetY = 10; g.font = 'bold 70px Jost'; g.fillText('EL', w / 2, 120); g.font = 'bold 170px Jost'; g.fillText('CONCURSO', w / 2, 290); g.beginPath(); g.roundRect(230, 330, 564, 150, 75); g.fill(); g.shadowColor = 'transparent'; g.fillStyle = '#7b3fd1'; g.font = 'bold 120px Jost'; g.fillText('DEL AÑO', w / 2, 445); } },
  modos: [{ id: 'diario', nombre: '☀ Programa diario', desc: 'Una pareja, 50.000 €, siete desconocidos', fn: () => partida(false) }, { id: 'noche', nombre: '🌙 Especial de noche', desc: 'Dos parejas con padrino famoso, 100.000 € y la pista «el recuerdo»', fn: () => partida(true) }],
  entreno: [{ id: 'f1', nombre: 'Un desconocido (primera fase)', fn: () => partida(false, 'f1') }, { id: 'fin', nombre: 'Solo la ronda final (séptimo desconocido)', fn: () => partida(false, 'final') }],
  normasHTML: `<p><b>Programa diario.</b> Una pareja empieza con 50.000 € y tiene que adivinar la edad exacta de siete personas anónimas.</p>
  <p><b>Primera fase (desconocidos 1 a 6).</b> Primero dais una edad provisional. Después elegís una de las seis pistas (cada pista se puede usar una vez): la canción (salió el año en que nació), el evento (pasó ese año), la foto personal, el dato familiar, el famoso (nació el mismo año) y el zoom (lo veis de cerca). Luego tenéis 15 segundos para confirmar o cambiar la edad con el botón; si no pulsáis a tiempo, vale la edad provisional.</p>
  <p>Si acertáis, el dinero queda intacto. Si no, perdéis por cada año de diferencia: 500 € (1.º), 1.000 € (2.º), 1.500 € (3.º), 2.000 € (4.º), 2.500 € (5.º) y 3.000 € (6.º). Si falláis por más de 10 años, el desconocido gana 500 €.</p>
  <p><b>Ronda final.</b> El séptimo desconocido. Descartáis dos de las seis pistas y tenéis cuatro intentos. En cada intento sale al azar una de las pistas elegidas y escribís la edad en la tableta en 15 segundos. Cada fallo divide el dinero a la mitad; si falláis el cuarto, no ganáis nada.</p>
  <p><b>Especiales de noche (2019 y 2021).</b> Dos parejas apadrinadas por famosos, 100.000 € cada una, bonus de 1.000 € para el desconocido si fallan por 10 años o más, y una pista nueva: el recuerdo. Solo juega la final la pareja con más dinero.</p>
  <p class="nota">Adaptación del juego: en los especiales las dos parejas apuestan en cada ronda y eligen la pista por turnos; las penalizaciones son las mismas que en el diario (el texto del programa no indica otras). Todos los desconocidos son personas ${INV}; las canciones, eventos y famosos de cada año son datos reales. Las edades se calculan para 2026.</p>`,
  historiaHTML: `<p><b>El Concurso del Año</b> fue un concurso de televisión español presentado por <b>Dani Martínez</b>. Se emitió en <b>Cuatro</b> de lunes a viernes a las 13:20, entre el 27 de agosto de 2018 y el 11 de junio de 2021.</p>
  <p>Es la adaptación del concurso francés <i>Guess My Age: Saurez-vous deviner mon âge?</i></p>
  <p>Temporada 1 (2018-2019): 251 programas, 480.000 espectadores (6,6 %). Temporada 2 (2019-2020): 134 programas, 451.000 (4,9 %). Temporada 3 (2020-2021): 126 programas, 474.000 (4,4 %). En total, 511 programas.</p>
  <p>En verano de 2019 y primavera de 2021 hubo especiales en prime time con dos parejas apadrinadas por famosos, como Toni Acosta y Marta Belenguer, Edurne y Blas Cantó, Boris Izaguirre y Lydia Lozano o Pablo Chiapella y Eva Isanta.</p>`,
  creditos: ['#El Concurso del Año · juego de fans', 'Basado en el concurso de Cuatro (2018-2021)', 'Presentado por Dani Martínez', 'Formato original: Guess My Age (Francia)', '#Personajes', 'Dani Martínez (versión 3D)', 'Desconocidos: personas inventadas', '#Voz', 'Voz del presentador: Piper es_ES-davefx-medium', '#Música', 'Sintonía: El Concurso del Año (Cuatro / Mediaset)', '#Plató', 'Recreado en 3D a partir de fotogramas reales del programa', 'Motor 3D: three.js', '#Datos', 'Canciones, eventos y famosos: datos reales de cada año', 'Fotos, datos familiares y recuerdos: inventados', '#Programado por', 'Grok Bot para Iker'],
  demo: {},
};
M.cfg = S;
arrancar(S);
