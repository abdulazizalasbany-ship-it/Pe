import React, { useMemo, useRef, useState } from 'react';
import { Camera, Check, ChevronLeft, Copy, Download, Eye, MapPin, Plus, Power, Radio, RefreshCw, Search, Send, Shield, Trash2, Users, X } from 'lucide-react';
import { toPng } from 'html-to-image';

const ROOMS = [
  { name: 'مكتب قائد ونائب قوات الطوارئ', id: '1353429244415316039', group: 'قيادة' },
  { name: 'مركز العمليات', id: '1280842797116690467', group: 'ضباط' },
  { name: 'مكتب الأفراد', id: '1291061998695485481', group: 'أفراد' },
  { name: 'جاري المقابلة', id: '1280842603323199498', group: 'أفراد' },
  { name: 'انتظار الطوارئ', id: '1301212713376026756', group: 'أفراد' },
];
const EVENTS = ['تمشيط', 'إنهاء تمشيط', 'بلاغ', 'مساندة', 'مداهمة', 'توزيع مهام', 'فعالية'];
const LOCS = ['البنك الأول', 'البنك الثاني', 'بنك بوليتو', 'المترو الأول', 'المترو الثاني', 'المترو الثالث', 'الخياط', 'مصنع البشر', 'الدسكو', 'الاستديو', 'المحكمة', 'البوب كات', 'المسبح', 'مصنع دجاج', 'مصنع قوارب', 'مصنع ذهب', 'مترو بوماس', 'المجوهرات', 'أخرى...'];
const SAMPLE = [
  { name: 'FY | 👑 [SCORPION] alk3bi 4848', room: 'مكتب قائد ونائب قوات الطوارئ', role: 'قائد كتيبة' },
  { name: 'FY | ⚡ [North] JOTA -41', room: 'مركز العمليات', role: 'لواء' },
  { name: 'FY | ⚡ [R-5] MEGADEATH 476', room: 'مركز العمليات', role: 'مقدم' },
  { name: 'FY | ⚡ [R-14] Railey 762', room: 'مركز العمليات', role: 'رائد' },
  { name: 'FY | ⚡ [R-15] Patrick -477', room: 'مركز العمليات', role: 'رائد' },
  { name: 'FY | ⚡ [R-16] Von -3458', room: 'مركز العمليات', role: 'رائد' },
  { name: 'FY | ⚡ [R-10] Fla7 -6937', room: 'مكتب الأفراد', role: 'رائد' },
  { name: 'FY | ⚡ [R-16] Abo saud -663', room: 'مكتب الأفراد', role: 'رائد' },
];
const steps = [
  ['التشغيل', Power], ['الصورة', Camera], ['نوع الحدث', Radio], ['الموقع', MapPin], ['المشاركين', Users], ['الإرسال', Send]
];

function d() { return new Date().toLocaleDateString('ar-SA', { year: 'numeric', month: '2-digit', day: '2-digit' }); }
function t() { return new Date().toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' }); }

export default function App() {
  const [boot, setBoot] = useState(true);
  const [step, setStep] = useState(0);
  const [eventType, setEventType] = useState('بلاغ');
  const [location, setLocation] = useState('البنك الأول');
  const [note, setNote] = useState('');
  const [photo, setPhoto] = useState('');
  const [room, setRoom] = useState(ROOMS[1]);
  const [bulk, setBulk] = useState('');
  const [query, setQuery] = useState('');
  const [toast, setToast] = useState('');
  const [people, setPeople] = useState(SAMPLE.map((p, i) => ({ ...p, id: i + 1, selected: false })));
  const boardRef = useRef(null);

  React.useEffect(() => { const id = setTimeout(() => setBoot(false), 1100); return () => clearTimeout(id); }, []);

  const selected = people.filter(p => p.selected);
  const visible = useMemo(() => people.filter(p => p.room === room.name && (!query || p.name.toLowerCase().includes(query.toLowerCase()))), [people, room, query]);
  const counts = useMemo(() => ROOMS.map(r => ({ ...r, count: people.filter(p => p.room === r.name).length })), [people]);

  const report = `\`\`\`diff
 بسم الله الرحمن الرحيم والصلاة والسلام على أشرف الأنبياء والمرسلين، أما بعد\`\`\`

\`\`\`diff
-  ⭐🚨 Special Emergency Force -  قوات الطوارئ 🚨⭐  -
\`\`\`

\`  🚨 [ ☬ ⚔️ مـهام المـيدان ⚔️ ☬ ]🚨   \`

\`\`\`
تم توجية منسوبي قوات الطوارئ الئ ${eventType} وتم اكتمال القوات ومحاصرة الموقع
\`\`\`

\`\`\`yml
وزراء الداخلية وقادات القطاع
\`\`\`

\`X-0\`
**<@&1279505105128919070><:SWAT:1374829552651468871> **

\`X-1\`
** <@&1279505109549846569>  <:SWAT:1374829552651468871>**

\`X-2\`
**<@&1291408400269443196> <:SWAT:1374829552651468871> **

\`\`\`yml
- كــبار الضباط -
\`\`\`
<@&1271540720041197672>
<@&1271540720880058411>
<@&1271540722528551054>
<@&1271540723795230720>

\`\`\`yml
- الضباط -
\`\`\`
<@&1271540725326024765>
<@&1271540726978576454>
<@&1271540728924864602>
<@&1271540731282194463>

\`\`\`yml
- افراد قوات الطوارئ -
\`\`\`
**من <@&1271540740429840404> الى <@&1271540732540227594> **

${selected.map(p => `|| ${p.name} ||`).join('\n') || '|| لم يتم تحديد مشاركين ||'}

📍 الموقع: ${location}
📅 التاريخ: ${d()} - ${t()}
${note ? `📝 ${note}` : ''}`;

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(''), 2500); };
  const addBulk = () => {
    const rows = bulk.split('\n').map(x => x.trim()).filter(Boolean);
    if (!rows.length) return;
    setPeople(prev => [...prev, ...rows.map((name, i) => ({ id: Date.now() + i, name, room: room.name, role: room.group, selected: false }))]);
    setBulk('');
    showToast(`تمت إضافة ${rows.length} للروم`);
  };
  const toggle = id => setPeople(prev => prev.map(p => p.id === id ? { ...p, selected: !p.selected } : p));
  const selectAllRoom = () => setPeople(prev => prev.map(p => p.room === room.name ? { ...p, selected: true } : p));
  const clearRoom = () => setPeople(prev => prev.filter(p => p.room !== room.name));
  const copyReport = async () => { await navigator.clipboard.writeText(report); showToast('تم نسخ التقرير'); };
  const saveImage = async () => {
    if (!boardRef.current) return;
    const dataUrl = await toPng(boardRef.current, { cacheBust: true, pixelRatio: 2 });
    const a = document.createElement('a'); a.download = 'special-emergency-force.png'; a.href = dataUrl; a.click();
  };

  return <div className="app" dir="rtl">
    {boot && <Splash />}
    {toast && <div className="toast"><Check size={20}/>{toast}<button onClick={()=>setToast('')}><X size={16}/></button></div>}
    <header className="topbar">
      <div className="title"><Shield size={18}/>برنامج تصوير مهمات الميدان الخاصة بقوات الطوارئ الخاصة</div>
      <div className="actions"><button><Power size={16}/> البوت متصل وجاهز</button><button onClick={()=>showToast('الفحص يدوي في هذه النسخة')}><RefreshCw size={14}/> فحص</button><button onClick={()=>{setStep(0); setPhoto(''); setPeople(p=>p.map(x=>({...x, selected:false})));}}><Plus size={14}/> مهمة جديدة</button><button className="bang">!</button></div>
    </header>
    <div className="pageNo">6 / {step+1}</div>
    <div className="shell">
      <LeftPanel people={people} selected={selected} counts={counts}/>
      <main className="stage">
        <StepBar step={step}/>
        <ReportBoard refEl={boardRef} photo={photo} eventType={eventType} location={location}/>
        {step === 0 && <CenterModal icon={<Shield/>} title="مهمة جديدة"><p>جاهز لإنشاء تقرير عملية ميدانية، اضغط ابدأ المهمة للمتابعة بالخطوات.</p><button className="gold big" onClick={()=>setStep(1)}>ابدأ المهمة</button></CenterModal>}
        {step === 1 && <CenterModal icon={<Camera/>} title="إضافة صورة الحدث"><label className="drop"><input type="file" accept="image/*" onChange={e=>{const f=e.target.files?.[0]; if(f) setPhoto(URL.createObjectURL(f));}}/>{photo ? <><Check size={48}/><b>تم إضافة الصورة</b><small>اضغط لتغييرها</small></> : <><Camera size={48}/><b>اضغط هنا لرفع صورة</b><small>أرفق صورة السيناريو ثم التالي</small></>}</label><Nav step={step} setStep={setStep}/></CenterModal>}
        {step === 2 && <CenterModal icon={<Radio/>} title="نوع الحدث"><label>اختر نوع الحدث</label><select value={eventType} onChange={e=>setEventType(e.target.value)}>{EVENTS.map(x=><option key={x}>{x}</option>)}</select><label>الوصف / ملاحظات اختياري</label><input value={note} onChange={e=>setNote(e.target.value)} placeholder="وصف يظهر فوق الصورة..."/><Nav step={step} setStep={setStep}/></CenterModal>}
        {step === 3 && <CenterModal icon={<MapPin/>} title="الموقع والتاريخ"><label>اختر الموقع</label><select value={location} onChange={e=>setLocation(e.target.value)}>{LOCS.map(x=><option key={x}>{x}</option>)}</select><div className="two"><input readOnly value={d()}/><input readOnly value={t()}/></div><Nav step={step} setStep={setStep}/></CenterModal>}
        {step === 4 && <Participants room={room} setRoom={setRoom} rooms={counts} bulk={bulk} setBulk={setBulk} addBulk={addBulk} query={query} setQuery={setQuery} visible={visible} selected={selected} toggle={toggle} selectAllRoom={selectAllRoom} clearRoom={clearRoom} setStep={setStep}/>} 
        {step === 5 && <CenterModal icon={<Send/>} title="مراجعة وإرسال"><div className="summary">الحدث: {eventType} - {location}<br/>المشاركين: {selected.length} مشارك</div><button className="green big" onClick={copyReport}><Copy size={18}/> نسخ + فتح ديسكورد</button><button onClick={saveImage}><Download size={18}/> حفظ الصورة</button><button onClick={copyReport}>نسخ القالب فقط</button><button onClick={()=>setStep(4)}>السابق</button></CenterModal>}
      </main>
    </div>
    <div className="version">Protn1&nbsp;&nbsp;|&nbsp;&nbsp;Version 4.1</div>
  </div>;
}

function Splash(){ return <div className="splash"><div className="line"/><img src="/logo.png"/><h1>قوات الطوارئ الخاصة</h1><p>أهلاً وسهلاً</p><div className="load"><span/></div><small>النظام جاهز</small><b>Version 4.1</b></div>; }
function StepBar({step}){ return <div className="steps">{steps.map(([name, Icon], i)=><div key={name} className={`${step>=i?'done':''} ${step===i?'active':''}`}><span>{step>i?<Check/>:<Icon/>}</span><b>{name}</b></div>)}</div>; }
function LeftPanel({people, selected, counts}){ return <aside className="left"><h2>المتواجدون في الرومات</h2><div className="stats"><span>{people.length} متواجد</span><em>{selected.length} محدد</em></div>{counts.slice(0,3).map(r=><div className="roomBox" key={r.id}><b>⚡ {r.name}</b>{people.filter(p=>p.room===r.name).slice(0,8).map(p=><div className="mini" key={p.id}><span>{p.name}</span><small>{p.role}</small></div>)}</div>)}<footer><span>المحدد {selected.length}</span><span>الإجمالي {people.length}</span></footer></aside>; }
function ReportBoard({refEl, photo, eventType, location}){ return <section className="board" ref={refEl}><div className="topLogo"><img src="/logo.png"/><h1>Special Emergency Forces</h1><img src="/logo.png"/></div><h3>نوع الحدث: {eventType} | {location} | {d()} - {t()}</h3><div className="photoBox">{photo ? <img src={photo}/> : <><img className="water" src="/logo.png"/><b>مكان الصورة</b></>}</div><p className="official">وثيقة رسمية - يحظر استخدامها في غير الأماكن المخصصة</p></section>; }
function CenterModal({icon,title,children}){ return <div className="modal"><h2>{icon}{title}</h2>{children}</div>; }
function Nav({step,setStep}){ return <div className="nav"><button className="gold" onClick={()=>setStep(Math.min(5, step+1))}>التالي <ChevronLeft size={18}/></button><button onClick={()=>setStep(Math.max(0, step-1))}>السابق</button></div>; }
function Participants({room,setRoom,rooms,bulk,setBulk,addBulk,query,setQuery,visible,selected,toggle,selectAllRoom,clearRoom,setStep}){ return <aside className="participants"><h2><Users/> إضافة المشاركين</h2><p>من هنا تضيف الموجودين يدويًا مثل نسخة الموقع، ثم تختار المشاركين بزر +.</p><button className="fetch">جلب المتواجدين بالرومات <small>LIVE</small></button><div className="search"><Search size={16}/><input placeholder="بحث سريع في نتائج الرومات..." value={query} onChange={e=>setQuery(e.target.value)}/></div><div className="chips"><button>الكل</button><button>قيادة</button><button>ضباط</button><button>أفراد</button></div><div className="roomBtns">{rooms.map(r=><button key={r.id} className={room.id===r.id?'sel':''} onClick={()=>setRoom(r)}><b>{r.name}</b><small>{r.id} - {r.count} عضو</small></button>)}</div><label>إضافة شخص للروم المحدد: {room.name}</label><textarea rows="3" value={bulk} onChange={e=>setBulk(e.target.value)} placeholder={'<@123>\n<@456>\nFY | S-26 darksid'} /><button className="add" onClick={addBulk}><Plus/> إضافة للروم</button><div className="listHead"><b>المتواجدون بالرومات</b><span>{visible.length} عضو ظاهر | المختارين {selected.length}</span><button onClick={selectAllRoom}>تحديد الكل</button><button className="danger" onClick={clearRoom}><Trash2 size={14}/> مسح روم</button></div><div className="plist">{visible.length ? visible.map(p=><div key={p.id} className={`person ${p.selected?'on':''}`}><button onClick={()=>toggle(p.id)}>{p.selected?<Check/>:<Plus/>}</button><div><b>{p.name}</b><small>{p.role} | {p.room}</small></div><em>{p.name.replace(/[<@>]/g,'').trim()[0] || 'F'}</em></div>) : <div className="empty">لا يوجد أشخاص في هذا الروم. أضف من الصندوق بالأعلى.</div>}</div><div className="pnav"><button className="gold" onClick={()=>setStep(5)}>التالي <ChevronLeft size={18}/></button><button onClick={()=>setStep(3)}>السابق</button></div></aside>; }
