// ---------- constants ----------
const ROLES={owner:'مالک',gm:'مدیر کل',manager:'مدیر',team:'تیم',branch:'مالک شعبه',specialist:'متخصص'};
const ICON={
  home:'<svg viewBox="0 0 24 24"><path d="M4 19V9M10 19V5M16 19v-7M22 19H2"/></svg>',
  tasks:'<svg viewBox="0 0 24 24"><path d="M9 6h11M9 12h11M9 18h11"/><path d="m3 6 1.5 1.5L7 5M3 12l1.5 1.5L7 11M3 18l1.5 1.5L7 17"/></svg>',
  money:'<svg viewBox="0 0 24 24"><rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="12" cy="12" r="2.5"/></svg>',
  ideas:'<svg viewBox="0 0 24 24"><path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2V16h5v-.1c0-.8.4-1.5 1-2A6 6 0 0 0 12 3Z"/></svg>',
  branches:'<svg viewBox="0 0 24 24"><path d="M3 21V9l9-6 9 6v12"/><path d="M9 21v-6h6v6"/></svg>',
  content:'<svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="4"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".6"/></svg>',
  report:'<svg viewBox="0 0 24 24"><path d="M6 2h9l5 5v15H6z"/><path d="M14 2v6h6M9 13h6M9 17h4"/></svg>',
  order:'<svg viewBox="0 0 24 24"><path d="M3 7h18l-2 12H5z"/><path d="M8 7a4 4 0 0 1 8 0"/></svg>',
  income:'<svg viewBox="0 0 24 24"><path d="M3 17l6-6 4 4 8-8"/><path d="M15 7h6v6"/></svg>',
  appts:'<svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="17" rx="2"/><path d="M3 9h18M8 2v4M16 2v4"/></svg>',
  myappts:'<svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="17" rx="2"/><path d="M3 9h18M8 2v4M16 2v4M9 15l2 2 4-4"/></svg>',
  clients:'<svg viewBox="0 0 24 24"><circle cx="9" cy="8" r="3.5"/><path d="M2 20c.8-3.5 3.6-5.5 7-5.5s6.2 2 7 5.5M16 4.5a3.5 3.5 0 0 1 0 7M18 14.5c2 .7 3.4 2.6 4 5.5"/></svg>',
  earn:'<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M14.5 9.5c-.5-1-1.5-1.5-2.5-1.5-1.5 0-2.5.8-2.5 2s1 1.7 2.5 2 2.5.8 2.5 2-1 2-2.5 2c-1 0-2-.5-2.5-1.5M12 6.5v11"/></svg>',
  stock:'<svg viewBox="0 0 24 24"><path d="M21 8 12 3 3 8v8l9 5 9-5z"/><path d="M3 8l9 5 9-5M12 13v8"/></svg>',
  ship:'<svg viewBox="0 0 24 24"><path d="M2 6h12v10H2zM14 9h4l4 4v3h-8"/><circle cx="6" cy="18" r="2"/><circle cx="18" cy="18" r="2"/></svg>',
  ssales:'<svg viewBox="0 0 24 24"><path d="M3 17l6-6 4 4 8-8"/><path d="M15 7h6v6"/></svg>',
  sorders:'<svg viewBox="0 0 24 24"><path d="M3 7h18l-2 12H5z"/><path d="M8 7a4 4 0 0 1 8 0"/></svg>',
  customers:'<svg viewBox="0 0 24 24"><circle cx="9" cy="8" r="3.5"/><path d="M2 20c.8-3.5 3.6-5.5 7-5.5s6.2 2 7 5.5M16 4.5a3.5 3.5 0 0 1 0 7M18 14.5c2 .7 3.4 2.6 4 5.5"/></svg>',
  fsales:'<svg viewBox="0 0 24 24"><path d="M3 17l6-6 4 4 8-8"/><path d="M15 7h6v6"/></svg>',
  rdash:'<svg viewBox="0 0 24 24"><path d="M4 19V9M10 19V5M16 19v-7M22 19H2"/></svg>',
  rhome:'<svg viewBox="0 0 24 24"><path d="M3 17l6-6 4 4 8-8"/><path d="M15 7h6v6"/></svg>',
  pos:'<svg viewBox="0 0 24 24"><path d="M5 3h14v18l-3-2-2 2-2-2-2 2-2-2-3 2z"/><path d="M9 8h6M9 12h6"/></svg>',
  rsell:'<svg viewBox="0 0 24 24"><path d="M5 3h14v18l-3-2-2 2-2-2-2 2-2-2-3 2z"/><path d="M9 8h6M9 12h6"/></svg>',
  kitchen:'<svg viewBox="0 0 24 24"><path d="M6 13h12v2a6 6 0 0 1-12 0zM4 13h16M9 4c0 2 2 2 2 4M14 4c0 2 2 2 2 4"/></svg>',
  menu:'<svg viewBox="0 0 24 24"><path d="M4 4h12a4 4 0 0 1 4 4v12H8a4 4 0 0 1-4-4z"/><path d="M8 9h8M8 13h6"/></svg>',
  jobs:'<svg viewBox="0 0 24 24"><path d="M14.7 6.3a4 4 0 0 0-5.4 5.2L3 17.8V21h3.2l6.3-6.3a4 4 0 0 0 5.2-5.4l-2.6 2.6-2.4-.6-.6-2.4z"/></svg>',
  myjobs:'<svg viewBox="0 0 24 24"><path d="M14.7 6.3a4 4 0 0 0-5.4 5.2L3 17.8V21h3.2l6.3-6.3a4 4 0 0 0 5.2-5.4l-2.6 2.6-2.4-.6-.6-2.4z"/></svg>',
  parts:'<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M4.9 19.1 7 17M17 7l2.1-2.1"/></svg>',
  nasieh:'<svg viewBox="0 0 24 24"><path d="M5 4h11a3 3 0 0 1 3 3v13H8a3 3 0 0 1-3-3z"/><path d="M9 9h6M9 13h4"/></svg>',
  checks:'<svg viewBox="0 0 24 24"><rect x="2" y="6" width="20" height="12" rx="2"/><path d="M6 14h6M15 10h3"/></svg>',
  ghome:'<svg viewBox="0 0 24 24"><path d="M3 17l6-6 4 4 8-8"/><path d="M15 7h6v6"/></svg>',
  gsell:'<svg viewBox="0 0 24 24"><path d="M5 3h14v18l-3-2-2 2-2-2-2 2-2-2-3 2z"/><path d="M9 8h6M9 12h6"/></svg>',
  gstock:'<svg viewBox="0 0 24 24"><path d="M6 3h12l4 6-10 12L2 9z"/><path d="M2 9h20M12 21 8 9l4-6 4 6z"/></svg>',
  edash:'<svg viewBox="0 0 24 24"><path d="M4 19V9M10 19V5M16 19v-7M22 19H2"/></svg>',
  listings:'<svg viewBox="0 0 24 24"><path d="M3 21V10l9-7 9 7v11"/><path d="M9 21v-6h6v6"/></svg>',
  buyers:'<svg viewBox="0 0 24 24"><circle cx="9" cy="8" r="3.5"/><path d="M2 20c.8-3.5 3.6-5.5 7-5.5s6.2 2 7 5.5M16 4.5a3.5 3.5 0 0 1 0 7M18 14.5c2 .7 3.4 2.6 4 5.5"/></svg>',
  visits:'<svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="17" rx="2"/><path d="M3 9h18M8 2v4M16 2v4M12 13v4M10 15h4"/></svg>',
  edeals:'<svg viewBox="0 0 24 24"><path d="M6 2h9l5 5v15H6z"/><path d="M14 2v6h6M9 13h6M9 17h4"/></svg>',
  plans:'<svg viewBox="0 0 24 24"><path d="M7 3c-2.5 0-4 2-4 4.5 0 2 1 3.5 1.5 6S5 21 7 21c1.5 0 1.7-4 3-5.5.6-.7 1.4-.7 2 0 1.3 1.5 1.5 5.5 3 5.5 2 0 2-5 2.5-7.5S21 9.5 21 7.5C21 5 19.5 3 17 3c-2 0-3 1-5 1S9 3 7 3Z"/></svg>',
  payments:'<svg viewBox="0 0 24 24"><path d="M12 2v20M17 6H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>',
};
const NAV={
  owner:[['home','فروش'],['tasks','کارها'],['money','مالی'],['ideas','ایده‌ها']],
  gm:[['home','فروش'],['tasks','کارها'],['branches','شعبه‌ها'],['content','محتوا']],
  manager:[['tasks','کارها'],['report','ثبت فروش'],['order','سفارش کالا']],
  team:[['tasks','کارها'],['report','ثبت فروش'],['order','سفارش کالا']],
  branch:[['tasks','کارها'],['report','ثبت فروش'],['order','سفارش کالا'],['payments','پرداخت‌ها']],
};
const APPT_ROLES={salon:{owner:'مالک سالن',front:'پذیرش',staff:'آرایشگر',specialist:'متخصص'},clinic:{owner:'مدیر کلینیک',front:'منشی',staff:'پزشک',specialist:'متخصص'},dental:{owner:'مالک کلینیک',front:'منشی',staff:'دندانپزشک',specialist:'متخصص'}};
const isMed=()=>ws&&(ws.type==='clinic'||ws.type==='dental');
const SHOP_ROLES={owner:'مالک',manager:'مدیر فروش',warehouse:'انباردار',support:'پشتیبان',specialist:'متخصص'};
const SHOP_ST=['جدید','در انتظار پرداخت','پرداخت‌شده','بسته‌بندی','ارسال‌شده','تحویل‌شده','مرجوعی','لغو'];
const PAID_ST=['پرداخت‌شده','بسته‌بندی','ارسال‌شده','تحویل‌شده'];
const SHOP_CH=['اینستاگرام','سایت','دیجی‌کالا','باسلام','تلگرام'];
const SHIP=['پست','تیپاکس','پیک'];
const CAFE_ROLES={owner:'مالک',manager:'مدیر کافه',cashier:'صندوقدار',waiter:'گارسون',kitchen:'باریستا و بار',specialist:'متخصص'};
const REST_ROLES={owner:'مالک',manager:'مدیر سالن',cashier:'صندوقدار',waiter:'گارسون',kitchen:'آشپزخانه',specialist:'متخصص'};
const REPAIR_ROLES={owner:'مالک',reception:'پذیرش',tech:'تعمیرکار',specialist:'متخصص'};
const RETAIL_ROLES={owner:'مالک',seller:'فروشنده',specialist:'متخصص'};
const GOLD_ROLES={owner:'مالک',seller:'فروشنده',specialist:'متخصص'};
const RE_ROLES={owner:'مدیر املاک',agent:'مشاور',specialist:'متخصص'};
const PAY_TYPES=['حقوق ماهانه','درصدی','پروژه‌ای','ساعتی'];
const LBL={salon:{client:'مشتری',clients:'مشتریان',staff:'آرایشگر',note:'یادداشت (مثلاً فرمول رنگ)'},clinic:{client:'بیمار',clients:'بیماران',staff:'پزشک',note:'یادداشت ویزیت'},dental:{client:'بیمار',clients:'بیماران',staff:'دندانپزشک',note:'یادداشت درمان'}};
const APPT_ST=['رزرو','تأیید شده','انجام‌شده','لغو','نیامد'];
const TYPE_LABEL={store:'فروشگاه',shop:'فروشگاه آنلاین',cafe:'کافه',restaurant:'رستوران',repair:'تعمیرگاه',retail:'مغازه',dental:'کلینیک دندانپزشکی',gold:'طلافروشی',realestate:'املاک',salon:'سالن زیبایی',clinic:'کلینیک'};
const STORE_COLS=['people','products','sales','orders','payments','tasks','ideas','content','costs','salaries'];
const APPT_COLS=['people','services','clients','appointments','tasks','ideas','costs','salaries'];
const DENTAL_COLS=[...APPT_COLS,'plans'];
const SHOP_COLS=['people','products','sorders','tasks','ideas','costs','salaries'];
const FOOD_COLS=['people','menu','forders','inventory','tasks','ideas','costs','salaries'];
const REPAIR_COLS=['people','jobs','parts','tasks','ideas','costs','salaries'];
const RETAIL_COLS=['people','products','rsales','ledger','checks','tasks','ideas','costs','salaries'];
const GOLD_COLS=['people','products','gsales','ledger','checks','tasks','ideas','costs','salaries'];
const RE_COLS=['people','listings','clients','visits','deals','tasks','ideas','costs','salaries'];
const colsFor=t=>({store:STORE_COLS,shop:SHOP_COLS,cafe:FOOD_COLS,restaurant:FOOD_COLS,repair:REPAIR_COLS,retail:RETAIL_COLS,gold:GOLD_COLS,realestate:RE_COLS,dental:DENTAL_COLS}[t]||APPT_COLS);
let ws=null, workspaces=[], unsubs=[];
const L=k=>(ws&&ws.labels&&ws.labels[k])||(LBL[ws&&ws.type]||LBL.salon)[k];
const rolesOf=()=>({...baseRoles(ws.type),...(ws.roleLabels||{})});
const baseRoles=type=>({store:ROLES,shop:SHOP_ROLES,cafe:CAFE_ROLES,restaurant:REST_ROLES,repair:REPAIR_ROLES,retail:RETAIL_ROLES,gold:GOLD_ROLES,realestate:RE_ROLES}[type]||APPT_ROLES[type]||{});
const roleLabel=r=>rolesOf()[r]||r;
function navFor(r){if(r==='specialist')return [['tasks','کارها']];
  if(ws.type==='store')return NAV[r]||NAV.team;
  if(ws.type==='shop'){
    if(r==='owner')return [['ssales','فروش'],['sorders','سفارش‌ها'],['stock','انبار'],['money','مالی'],['tasks','کارها']];
    if(r==='manager')return [['ssales','فروش'],['sorders','سفارش‌ها'],['stock','انبار'],['tasks','کارها']];
    if(r==='warehouse')return [['ship','ارسال'],['stock','انبار'],['tasks','کارها']];
    return [['sorders','سفارش‌ها'],['customers','مشتریان'],['tasks','کارها']];}
  if(ws.type==='cafe'||ws.type==='restaurant'){const k=ws.type==='cafe'?'بار':'آشپزخانه';
    if(r==='owner')return [['fsales','فروش'],['pos','سفارش'],['menu','منو و انبار'],['money','مالی'],['tasks','کارها']];
    if(r==='manager')return [['pos','سفارش'],['kitchen',k],['menu','منو و انبار'],['fsales','فروش'],['tasks','کارها']];
    if(r==='kitchen')return [['kitchen',k],['menu','منو و انبار'],['tasks','کارها']];
    return [['pos','سفارش'],['kitchen',k],['tasks','کارها']];}
  if(ws.type==='repair'){
    if(r==='owner')return [['rdash','داشبورد'],['jobs','پذیرش'],['parts','قطعات'],['money','مالی'],['tasks','کارها']];
    if(r==='reception')return [['jobs','پذیرش'],['parts','قطعات'],['tasks','کارها']];
    return [['myjobs','کارهای من'],['parts','قطعات'],['tasks','کارها']];}
  if(ws.type==='retail'){
    if(r==='owner')return [['rhome','فروش'],['nasieh','نسیه'],['stock','انبار'],['money','مالی'],['tasks','کارها'],['rsell','',1],['checks','',1]];
    return [['rsell','فروش'],['nasieh','نسیه'],['stock','انبار'],['tasks','کارها']];}
  if(ws.type==='gold'){
    if(r==='owner')return [['ghome','فروش'],['gstock','ویترین'],['nasieh','نسیه'],['money','مالی'],['tasks','کارها'],['gsell','',1],['checks','',1]];
    return [['gsell','فاکتور'],['gstock','ویترین'],['nasieh','نسیه'],['tasks','کارها']];}
  if(ws.type==='realestate'){
    if(r==='owner')return [['edash','داشبورد'],['listings','فایل‌ها'],['buyers','مشتریان'],['visits','بازدید'],['tasks','کارها'],['edeals','',1],['money','',1]];
    return [['listings','فایل‌ها'],['buyers','مشتریان'],['visits','بازدید'],['edeals','قرارداد'],['tasks','کارها']];}
  if(ws.type==='dental'){
    if(r==='owner')return [['income','درآمد'],['appts','نوبت‌ها'],['plans','طرح درمان'],['clients','بیماران'],['money','مالی'],['tasks','کارها']];
    if(r==='front')return [['appts','نوبت‌ها'],['plans','طرح درمان'],['clients','بیماران'],['tasks','کارها']];
    return [['myappts','نوبت‌های من'],['plans','بیماران من'],['earn','درآمد من'],['tasks','کارها']];}
  if(r==='owner')return [['income','درآمد'],['appts','نوبت‌ها'],['clients',L('clients')],['money','مالی'],['tasks','کارها']];
  if(r==='front')return [['appts','نوبت‌ها'],['clients',L('clients')],['tasks','کارها']];
  return [['myappts','نوبت‌های من'],['earn','درآمد من'],['tasks','کارها']];}
const P=x=>'workspaces/'+ws.id+'/'+x;
const D=x=>db.doc(P(x)), C=x=>db.collection(P(x));
const catsFor=()=>ws.type==='store'?CATS:ws.type==='shop'?['سفارش‌ها','ارسال','انبار','اینستاگرام','سایت','مالی','سایر']:ws.type==='cafe'||ws.type==='restaurant'?['سالن','آشپزخانه و بار','خرید و انبار','نظافت','اینستاگرام','مالی','سایر']:ws.type==='repair'?['پذیرش','تعمیر','قطعات','مشتریان','مالی','سایر']:ws.type==='retail'?['فروش','خرید و انبار','چک و بدهی','مالی','سایر']:ws.type==='gold'?['فروش','ویترین و ساخت','نسیه و چک','مالی','سایر']:ws.type==='realestate'?['فایل‌ها','مشتریان','بازدید','قرارداد','مالی','سایر']:['پذیرش و نوبت','خرید و انبار',L('clients'),'مالی','اینستاگرام','سایر'];
const CENTRAL='مرکزی';
const CHANNELS=['حضوری','سایت','اینستاگرام'];
const ORDER_ST=['ثبت‌شده','در حال آماده‌سازی','ارسال‌شده','تحویل‌شده'];
const CONTENT_ST=['ایده','در حال تولید','آماده انتشار','منتشرشده'];
const PLATFORMS=['پست اینستاگرام','ریلز','استوری','سایت'];
const CATS=['فروشگاه','شعبه‌ها','سایت','اینستاگرام','مالی','پرداخت','سایر'];
const REPEAT={none:'یک‌بار',daily:'روزانه',weekly:'هفتگی',monthly:'ماهانه'};
const COST_CATS=['خرید و تأمین','حمل‌ونقل','قبوض','اجاره','تبلیغات','پذیرایی','سایر'];
const JMONTHS=['فروردین','اردیبهشت','خرداد','تیر','مرداد','شهریور','مهر','آبان','آذر','دی','بهمن','اسفند'];

const state={};const resetState=()=>[...new Set([...STORE_COLS,...APPT_COLS,...SHOP_COLS,...FOOD_COLS,...REPAIR_COLS,...RETAIL_COLS,...GOLD_COLS,...RE_COLS,...DENTAL_COLS])].forEach(c=>state[c]=[]);resetState();
const ui={day:null,staffF:'همه',q:'',period:'today',source:'all',from:'',to:'',taskTab:'received',taskCat:'همه',moneyTab:'costs',salMonth:null,contentSt:'همه'};
let db=null, me=null, armed=null, loaded=new Set();

// ---------- helpers ----------
const fmtN=n=>Math.round(+n||0).toLocaleString('fa-IR');
const fmtT=n=>{n=+n||0;const a=Math.abs(n);if(a>=1e9)return (n/1e9).toLocaleString('fa-IR',{maximumFractionDigits:2})+' میلیارد';if(a>=1e6)return (n/1e6).toLocaleString('fa-IR',{maximumFractionDigits:1})+' میلیون';return fmtN(n)};
const iso=d=>{const x=new Date(d);x.setMinutes(x.getMinutes()-x.getTimezoneOffset());return x.toISOString().slice(0,10)};
const TODAY=iso(new Date());
const addDays=(s,k)=>{const d=new Date(s+'T12:00:00');d.setDate(d.getDate()+k);return iso(d)};
const addMonths=(s,k)=>{const d=new Date(s+'T12:00:00');d.setMonth(d.getMonth()+k);return iso(d)};
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const opts=(arr,v)=>arr.map(o=>Array.isArray(o)?`<option value="${esc(o[0])}"${o[0]===v?' selected':''}>${esc(o[1])}</option>`:`<option${o===v?' selected':''}>${esc(o)}</option>`).join('');
const jfmt=new Intl.DateTimeFormat('en-US-u-ca-persian',{year:'numeric',month:'numeric',day:'numeric'});
const jcache={};
function jp(s){if(jcache[s])return jcache[s];const p={};try{jfmt.formatToParts(new Date(s+'T12:00:00')).forEach(x=>{if(x.type!=='literal')p[x.type]=parseInt(x.value,10)})}catch(e){}return jcache[s]={y:p.year,m:p.month,d:p.day}}
const jkey=s=>{const p=jp(s);return p.y+'-'+String(p.m).padStart(2,'0')};
const jd=(s,o={day:'numeric',month:'long'})=>{if(!s)return '';try{return new Intl.DateTimeFormat('fa-IR-u-ca-persian',o).format(new Date(s+'T12:00:00'))}catch(e){return s}};
const monthLabel=k=>{const [y,m]=k.split('-').map(Number);return JMONTHS[m-1]+' '+y.toLocaleString('fa-IR',{useGrouping:false})};
const rel=s=>{if(!s)return '';const diff=Math.round((new Date(s+'T12:00:00')-new Date(TODAY+'T12:00:00'))/864e5);if(diff===0)return 'امروز';if(diff===1)return 'فردا';if(diff===-1)return 'دیروز';return diff<0?fmtN(-diff)+' روز پیش':fmtN(diff)+' روز دیگر'};
function monthStart(s){let d=s;const k=jkey(s);while(jkey(addDays(d,-1))===k)d=addDays(d,-1);return d}
function yearStart(s){let d=monthStart(s);while(jp(addDays(d,-1)).y===jp(s).y)d=monthStart(addDays(d,-1));return d}
const person=id=>state.people.find(p=>p.id===id);
const pname=id=>{const p=person(id);return p?p.name:'—'};
const saleAmt=s=>(+s.qty||0)*(+s.price||0);
function toast(msg){const t=document.getElementById('toast');t.textContent=msg;t.hidden=false;clearTimeout(toast.h);toast.h=setTimeout(()=>t.hidden=true,1800)}
const empty=t=>`<div class="empty">${t}</div>`;
const delBtn=(col,id,label='حذف')=>{const on=armed===col+'/'+id;return `<button class="lnk del ${on?'armed':''}" data-del="${col}/${id}">${on?'حذف شود؟':label}</button>`};
const myBranch=()=>me?.role==='branch'?(me.branch||me.name):CENTRAL;
const ls={get(k){try{return localStorage.getItem(k)}catch(e){return null}},set(k,v){try{localStorage.setItem(k,v)}catch(e){}}};

document.getElementById('today').textContent=jd(TODAY,{weekday:'long',day:'numeric',month:'long',year:'numeric'});

// ---------- tasks logic ----------
const isLate=t=>!t.done&&t.due&&t.due<TODAY;
function myTasks(){
  if(!me) return {received:[],sent:[],mine:[]};
  const T=state.tasks;
  return {
    received:T.filter(t=>t.to===me.id&&t.from!==me.id),
    sent:T.filter(t=>t.from===me.id&&t.to!==me.id),
    mine:T.filter(t=>t.from===me.id&&t.to===me.id),
  };
}
function nextDue(t){const base=t.due&&t.due>TODAY?t.due:(t.due||TODAY);if(t.repeat==='daily')return addDays(base,1);if(t.repeat==='weekly')return addDays(base,7);if(t.repeat==='monthly')return addMonths(base,1);return null}
function canSendTo(p){if(!me||p.id===me.id)return false;const lead=['owner','gm','manager','front','reception'];if(lead.includes(me.role))return true;return lead.includes(p.role)}

// ---------- sales logic ----------
function inSource(s,src){const br=s.branch||CENTRAL;if(src==='central')return br===CENTRAL&&s.channel==='حضوری';if(src==='online')return s.channel==='سایت'||s.channel==='اینستاگرام';if(src==='city')return br!==CENTRAL;return true}
function range(){
  if(ui.period==='today') return [TODAY,TODAY];
  if(ui.period==='month') return [monthStart(TODAY),TODAY];
  if(ui.period==='year') return [yearStart(TODAY),TODAY];
  const f=ui.from||monthStart(TODAY), t=ui.to||TODAY; return f<=t?[f,t]:[t,f];
}
function buckets([f,t]){
  if(ui.period==='today'){const ds=[...Array(7)].map((_,i)=>addDays(TODAY,i-6));return {keyOf:s=>s.date,keys:ds,label:d=>jd(d,{day:'numeric'}),now:TODAY,range:[ds[0],TODAY]}}
  const days=Math.round((new Date(t)-new Date(f))/864e5)+1;
  if(ui.period==='year'||days>31){const keys=[];let d=f;while(d<=t){const k=jkey(d);if(!keys.includes(k))keys.push(k);d=addDays(d,1)}return {keyOf:s=>jkey(s.date),keys,label:k=>JMONTHS[+k.split('-')[1]-1].slice(0,3),now:jkey(TODAY),range:[f,t]}}
  const keys=[];let d=f;while(d<=t){keys.push(d);d=addDays(d,1)}return {keyOf:s=>s.date,keys,label:d=>jd(d,{day:'numeric'}),now:TODAY,range:[f,t]};
}

// ---------- screens ----------
function scrHome(){
  const [f,t]=range();
  const rows=state.sales.filter(s=>s.date>=f&&s.date<=t&&inSource(s,ui.source));
  const total=rows.reduce((a,s)=>a+saleAmt(s),0), pairs=rows.reduce((a,s)=>a+(+s.qty||0),0);
  const b=buckets([f,t]);
  const chartRows=state.sales.filter(s=>s.date>=b.range[0]&&s.date<=b.range[1]&&inSource(s,ui.source));
  const sums={};chartRows.forEach(s=>{const k=b.keyOf(s);sums[k]=(sums[k]||0)+saleAmt(s)});
  const max=Math.max(1,...b.keys.map(k=>sums[k]||0));
  const step=b.keys.length>16?Math.ceil(b.keys.length/8):1;
  const byProd={};rows.forEach(s=>{const p=byProd[s.product]||(byProd[s.product]={q:0,a:0});p.q+=+s.qty||0;p.a+=saleAmt(s)});
  const prod=Object.entries(byProd).sort((x,y)=>y[1].a-x[1].a);
  const byBr={};rows.forEach(s=>{const k=(s.branch||CENTRAL)===CENTRAL?(s.channel==='حضوری'?'شعبه مرکزی':'آنلاین ('+s.channel+')'):s.branch;byBr[k]=(byBr[k]||0)+saleAmt(s)});
  const br=Object.entries(byBr).sort((x,y)=>y[1]-x[1]);
  const mt=myTasks(), openRec=mt.received.filter(x=>!x.done), lateMine=[...mt.received,...mt.mine].filter(isLate);
  const periodLabel={today:'امروز',month:'این ماه ('+JMONTHS[jp(TODAY).m-1]+')',year:'امسال',custom:jd(f)+' تا '+jd(t)}[ui.period];
  return `
  ${openRec.length||lateMine.length?`<button class="card" data-go="tasks" style="text-align:start;cursor:pointer;border-color:${lateMine.length?'var(--bad)':'var(--line)'}"><div class="row"><span class="t">${fmtN(openRec.length)} کار دریافتی باز</span>${lateMine.length?`<span class="pill p-bad">${fmtN(lateMine.length)} عقب‌افتاده</span>`:''}</div></button>`:''}
  <div class="seg" role="group" aria-label="بازه">${[['today','روز'],['month','ماه'],['year','سال'],['custom','بازه دلخواه']].map(([k,l])=>`<button data-period="${k}" aria-pressed="${ui.period===k}">${l}</button>`).join('')}</div>
  ${ui.period==='custom'?`<div class="row" style="flex-wrap:nowrap"><label class="small muted" style="flex:1">از<input type="date" id="rf" value="${f}" style="width:100%;background:var(--surface);border:1px solid var(--line);border-radius:9px;padding:6px"></label><label class="small muted" style="flex:1">تا<input type="date" id="rt" value="${t}" style="width:100%;background:var(--surface);border:1px solid var(--line);border-radius:9px;padding:6px"></label></div>`:''}
  <div class="chips" role="group" aria-label="منبع فروش">${[['all','همه'],['central','شعبه مرکزی'],['online','آنلاین'],['city','شعبه‌های شهر']].map(([k,l])=>`<button class="chip" data-source="${k}" aria-pressed="${ui.source===k}">${l}</button>`).join('')}</div>
  <div class="kpis">
    <div class="kpi wide"><span class="lab">فروش ${periodLabel}</span><span class="val">${fmtT(total)} <span class="small muted" style="font-weight:400">تومان</span></span><span class="hint">${fmtN(pairs)} جفت · ${fmtN(rows.length)} فاکتور</span></div>
  </div>
  <section class="card"><div class="row"><h3>${ui.period==='today'?'۷ روز اخیر':'روند فروش'}</h3><span class="small muted">میلیون تومان</span></div>
    ${chartRows.length?`<div class="bars" role="img" aria-label="نمودار فروش">${b.keys.map((k,i)=>`<div class="bar ${k===b.now?'now':''}" title="${fmtN(sums[k]||0)} تومان"><span>${sums[k]&&b.keys.length<=16?(sums[k]/1e6).toLocaleString('fa-IR',{maximumFractionDigits:0}):''}</span><i style="height:${Math.round((sums[k]||0)/max*90)}px"></i><span>${i%step===0||k===b.now?esc(b.label(k)):''}</span></div>`).join('')}</div>`:empty('در این بازه فروشی ثبت نشده است.')}
  </section>
  ${br.length>1?`<section class="card"><h3>به تفکیک شعبه و کانال</h3><ul class="list">${br.map(([k,v])=>`<li><span class="grow t">${esc(k)}</span><span class="num">${fmtT(v)}</span></li>`).join('')}</ul></section>`:''}
  <section class="card"><div class="row"><h3>گزارش محصولات</h3><span class="small muted">${periodLabel}</span></div>
    ${prod.length?`<div class="tbl-wrap"><table class="tbl"><thead><tr><th>محصول</th><th>تعداد</th><th>مبلغ (تومان)</th></tr></thead><tbody>${prod.map(([p,v])=>`<tr><td>${esc(p)}</td><td class="num">${fmtN(v.q)}</td><td class="num">${fmtT(v.a)}</td></tr>`).join('')}</tbody></table></div>`:empty('محصولی در این بازه فروخته نشده است.')}
  </section>`;
}

function taskItem(t){
  const other=ui.taskTab==='received'?'از '+pname(t.from):ui.taskTab==='sent'?'برای '+pname(t.to):'';
  return `<li class="${t.done?'done':''} ${isLate(t)?'late':''}">
    <input type="checkbox" class="chk" ${t.done?'checked':''} data-toggle="${t.id}" aria-label="انجام شد">
    <div class="grow"><div class="t">${esc(t.title)}</div>
      <div class="m">${[other,t.due?jd(t.due)+' · '+rel(t.due):'بدون موعد',t.category].filter(Boolean).map(esc).join(' · ')}</div>
      ${t.note?`<div class="m">${esc(t.note)}</div>`:''}</div>
    <div style="display:grid;gap:4px;justify-items:end">${isLate(t)?'<span class="pill p-bad">عقب‌افتاده</span>':''}${t.repeat&&t.repeat!=='none'?`<span class="pill p-info">${REPEAT[t.repeat]}</span>`:''}${t.from===me.id?delBtn('tasks',t.id):''}</div>
  </li>`;
}
function scrTasks(){
  const mt=myTasks();
  let list=mt[ui.taskTab]||[];
  if(ui.taskCat!=='همه') list=list.filter(t=>t.category===ui.taskCat);
  const open=list.filter(t=>!t.done).sort((a,b)=>isLate(b)-isLate(a)||(a.due||'9').localeCompare(b.due||'9'));
  const done=list.filter(t=>t.done).sort((a,b)=>(b.doneAt||0)-(a.doneAt||0)).slice(0,15);
  const targets=state.people.filter(canSendTo);
  const isLead=['owner','gm','manager','front','reception'].includes(me.role);
  const cnt=k=>mt[k].filter(t=>!t.done).length;
  const tabs=[['received','دریافتی'],['sent',isLead?'ارسالی':'درخواست‌های من'],['mine','کارهای خودم']];
  const catsUsed=['همه',...catsFor().filter(c=>[...mt.received,...mt.sent,...mt.mine].some(t=>t.category===c))];
  return `
  <details class="add"${state._openAdd==='task'?' open':''}><summary>${isLead?'کار جدید':'کار یا درخواست جدید'}</summary>
    <form class="f" data-form="task">
      <label class="full">عنوان<input id="tk-title" name="title" required placeholder="${me.role==='owner'?'مثلاً پیگیری چک تأمین‌کننده':me.role==='branch'?'مثلاً ارسال کاتالوگ جدید':'مثلاً یادآوری پرداخت قسط'}"></label>
      <label>برای<select id="tk-to" name="to"><option value="${me.id}">خودم</option>${targets.map(p=>`<option value="${p.id}">${esc(p.name)} · ${roleLabel(p.role)}</option>`).join('')}</select></label>
      <label>موعد<input type="date" id="tk-due" name="due" value="${TODAY}"></label>
      <label>تکرار<select id="tk-repeat" name="repeat">${opts(Object.entries(REPEAT))}</select></label>
      <label>دسته<select id="tk-cat" name="category">${opts(catsFor())}</select></label>
      <label class="full">توضیح<input id="tk-note" name="note" placeholder="اختیاری"></label>
      <button class="btn full">ثبت کار</button>
    </form></details>
  <div class="seg" role="group">${tabs.map(([k,l])=>`<button data-tasktab="${k}" aria-pressed="${ui.taskTab===k}">${l}${cnt(k)?' ('+fmtN(cnt(k))+')':''}</button>`).join('')}</div>
  ${catsUsed.length>2?`<div class="chips">${catsUsed.map(c=>`<button class="chip" data-taskcat="${c}" aria-pressed="${ui.taskCat===c}">${c}</button>`).join('')}</div>`:''}
  <section class="card">${open.length?`<ul class="list">${open.map(taskItem).join('')}</ul>`:empty(ui.taskTab==='received'?'کاری برایت فرستاده نشده است.':ui.taskTab==='sent'?'هنوز کاری برای کسی نفرستاده‌ای.':'کار شخصی بازی نداری. مسئولیت‌های تکراری‌ات را با «تکرار» ثبت کن.')}</section>
  ${done.length?`<section class="card"><h3 class="muted">انجام‌شده</h3><ul class="list">${done.map(taskItem).join('')}</ul></section>`:''}`;
}

function scrMoney(){
  const tabs=`<div class="seg">${[['costs','هزینه‌های روزانه'],['salaries','حقوق تیم']].map(([k,l])=>`<button data-moneytab="${k}" aria-pressed="${ui.moneyTab===k}">${l}</button>`).join('')}</div>`;
  if(ui.moneyTab==='costs'){
    const ms=monthStart(TODAY);
    const today=state.costs.filter(c=>c.date===TODAY).reduce((a,c)=>a+(+c.amount||0),0);
    const month=state.costs.filter(c=>c.date>=ms&&c.date<=TODAY).reduce((a,c)=>a+(+c.amount||0),0);
    const rows=[...state.costs].sort((a,b)=>b.date.localeCompare(a.date)||(b.createdAt||0)-(a.createdAt||0)).slice(0,40);
    const groups={};rows.forEach(c=>(groups[c.date]=groups[c.date]||[]).push(c));
    return `${tabs}
    <div class="kpis"><div class="kpi"><span class="lab">هزینه امروز</span><span class="val">${fmtT(today)}</span><span class="hint">تومان</span></div><div class="kpi"><span class="lab">هزینه ${JMONTHS[jp(TODAY).m-1]}</span><span class="val">${fmtT(month)}</span><span class="hint">تومان</span></div></div>
    <details class="add"><summary>ثبت هزینه</summary><form class="f" data-form="cost">
      <label class="full">شرح<input id="co-title" name="title" required placeholder="مثلاً کرایه پیک"></label>
      <label>مبلغ (تومان)<input id="co-amount" name="amount" type="number" min="0" step="1000" required></label>
      <label>دسته<select id="co-cat" name="category">${opts(COST_CATS)}</select></label>
      <label class="full">تاریخ<input type="date" id="co-date" name="date" value="${TODAY}"></label>
      <button class="btn full">ثبت هزینه</button></form></details>
    ${rows.length?Object.entries(groups).map(([d,cs])=>`<section class="card"><div class="row"><h3>${jd(d,{weekday:'long',day:'numeric',month:'long'})}</h3><span class="num small">${fmtT(cs.reduce((a,c)=>a+(+c.amount||0),0))}</span></div><ul class="list">${cs.map(c=>`<li><div class="grow"><div class="t">${esc(c.title)}</div><div class="m">${esc(c.category)}</div></div><span class="num">${fmtN(c.amount)}</span>${delBtn('costs',c.id)}</li>`).join('')}</ul></section>`).join(''):empty('هزینه‌های روزانه مثل کرایه پیک و قبوض را این‌جا ثبت کن.')}`;
  }
  const months=[...new Set([jkey(TODAY),...state.salaries.map(s=>s.month)])].sort().reverse();
  const m=ui.salMonth||months[0];
  const rows=state.salaries.filter(s=>s.month===m);
  const total=rows.reduce((a,s)=>a+(+s.amount||0),0), paid=rows.filter(s=>s.paid).reduce((a,s)=>a+(+s.amount||0),0);
  const named=new Set(rows.map(s=>s.person));
  const missing=state.people.filter(p=>p.payType==='حقوق ماهانه'&&+p.pay>0&&!named.has(p.name));
  return `${tabs}
  ${missing.length?`<button class="btn" data-fillsal="${m}" style="justify-self:start">ثبت حقوق ${fmtN(missing.length)} نفر از روی قرارداد تیم</button>`:''}
  <div class="chips">${months.map(k=>`<button class="chip" data-salmonth="${k}" aria-pressed="${k===m}">${monthLabel(k)}</button>`).join('')}</div>
  <div class="kpis"><div class="kpi"><span class="lab">جمع حقوق ${JMONTHS[+m.split('-')[1]-1]}</span><span class="val">${fmtT(total)}</span><span class="hint">تومان</span></div><div class="kpi ${total-paid>0?'alert':''}"><span class="lab">پرداخت‌نشده</span><span class="val">${fmtT(total-paid)}</span><span class="hint">تومان</span></div></div>
  <details class="add"><summary>افزودن حقوق</summary><form class="f" data-form="salary">
    <label class="full">نام<input id="sa-person" name="person" required list="peopleNames" placeholder="نام عضو تیم"></label>
    <label>مبلغ (تومان)<input id="sa-amount" name="amount" type="number" min="0" step="10000" required></label>
    <label>ماه<select id="sa-month" name="month">${opts(months.map(k=>[k,monthLabel(k)]),m)}</select></label>
    <button class="btn full">ثبت</button></form>
    <datalist id="peopleNames">${state.people.filter(p=>p.role!=='owner'&&p.role!=='branch').map(p=>`<option value="${esc(p.name)}">`).join('')}</datalist></details>
  <section class="card">${rows.length?`<ul class="list">${rows.map(s=>`<li class="${s.paid?'done':''}"><input type="checkbox" class="chk" ${s.paid?'checked':''} data-paid="salaries/${s.id}" aria-label="پرداخت شد"><div class="grow"><div class="t">${esc(s.person)}</div><div class="m">${s.paid?'پرداخت شد':'پرداخت نشده'}</div></div><span class="num">${fmtN(s.amount)}</span>${delBtn('salaries',s.id)}</li>`).join('')}</ul>`:empty('برای این ماه حقوقی ثبت نشده است.')}</section>
  <p class="small muted" style="margin:0">این بخش فقط برای نقش مالک نمایش داده می‌شود.</p>`;
}

function scrIdeas(){
  const rows=[...state.ideas].filter(i=>!i.converted).sort((a,b)=>(b.createdAt||0)-(a.createdAt||0));
  const conv=state.ideas.filter(i=>i.converted).length;
  return `<details class="add" open><summary>ایده جدید</summary><form class="f" data-form="idea"><label class="full">ایده<textarea id="id-text" name="text" required placeholder="مثلاً باشگاه مشتریان با تخفیف خرید دوم"></textarea></label><button class="btn full">ثبت ایده</button></form></details>
  <section class="card">${rows.length?`<ul class="list">${rows.map(i=>`<li><div class="grow"><div class="t">${esc(i.text)}</div><div class="m">${esc(pname(i.by))} · ${jd(iso(new Date(i.createdAt||Date.now())))}</div></div><div style="display:grid;justify-items:end"><button class="lnk" data-convert="${i.id}">تبدیل به کار</button>${delBtn('ideas',i.id)}</div></li>`).join('')}</ul>`:empty('ایده‌هایی که به ذهنت می‌رسد این‌جا بنویس تا گم نشوند.')}</section>
  ${conv?`<p class="small muted" style="margin:0">${fmtN(conv)} ایده به کار تبدیل شده است.</p>`:''}`;
}

function balances(){
  const brs=[...new Set([...state.people.filter(p=>p.role==='branch').map(p=>p.branch||p.name),...state.orders.map(o=>o.branch).filter(b=>b&&b!==CENTRAL)])];
  return brs.map(b=>{const ord=state.orders.filter(o=>o.branch===b).reduce((a,o)=>a+(+o.amount||0),0);const pay=state.payments.filter(p=>p.branch===b&&p.confirmed).reduce((a,p)=>a+(+p.amount||0),0);const pend=state.payments.filter(p=>p.branch===b&&!p.confirmed).length;return {b,bal:ord-pay,pend}});
}
const orderPill=o=>{const m={'ثبت‌شده':'p-mute','در حال آماده‌سازی':'p-warn','ارسال‌شده':'p-info','تحویل‌شده':'p-ok'};return `<span class="pill ${m[o.status]||'p-mute'}">${esc(o.status)}</span>`};
function scrBranches(){
  const bal=balances();
  const open=state.orders.filter(o=>o.status!=='تحویل‌شده').sort((a,b)=>(a.date||'').localeCompare(b.date||''));
  const done=state.orders.filter(o=>o.status==='تحویل‌شده').sort((a,b)=>(b.date||'').localeCompare(a.date||'')).slice(0,8);
  const pend=state.payments.filter(p=>!p.confirmed);
  const brTasks=state.tasks.filter(t=>!t.done&&(t.category==='شعبه‌ها'||person(t.to)?.role==='branch'||person(t.from)?.role==='branch'));
  const ord=o=>`<li><div class="grow"><div class="t">${esc(o.items)}</div><div class="m">${esc(o.branch)} · ${esc(pname(o.by))} · ${jd(o.date)}</div>
      <div class="row" style="justify-content:flex-start;margin-top:4px"><select class="inline" data-set="orders/${o.id}" data-field="status" aria-label="وضعیت">${opts(ORDER_ST,o.status)}</select>${o.branch!==CENTRAL?`<input class="inline" type="number" min="0" step="10000" placeholder="مبلغ فاکتور" value="${o.amount||''}" data-set="orders/${o.id}" data-field="amount" aria-label="مبلغ فاکتور">`:''}</div></div>${orderPill(o)}</li>`;
  return `
  ${bal.length?`<div class="kpis">${bal.map(x=>`<div class="kpi balance ${x.bal<=0?'zero':''}"><span class="lab">${esc(x.b)}</span><span class="val">${fmtT(Math.abs(x.bal))}</span><span class="hint">${x.bal>0?'بدهکار':x.bal<0?'بستانکار':'تسویه'}${x.pend?' · '+fmtN(x.pend)+' پرداخت منتظر تأیید':''}</span></div>`).join('')}</div>`:''}
  ${pend.length?`<section class="card"><h3>پرداخت‌های منتظر تأیید</h3><ul class="list">${pend.map(p=>`<li><div class="grow"><div class="t">${esc(p.branch)} · ${fmtN(p.amount)} تومان</div><div class="m">${jd(p.date)}${p.note?' · '+esc(p.note):''}</div></div><button class="lnk" data-confirm="${p.id}">تأیید</button></li>`).join('')}</ul></section>`:''}
  <section class="card"><div class="row"><h3>سفارش‌های کالا</h3><span class="small muted">${fmtN(open.length)} باز</span></div>${open.length?`<ul class="list">${open.map(ord).join('')}</ul>`:empty('سفارش بازی وجود ندارد.')}</section>
  <section class="card"><div class="row"><h3>کارهای شعبه‌ها</h3><button class="lnk" data-go="tasks" data-cat="شعبه‌ها">همه کارها</button></div>${brTasks.length?`<ul class="list">${brTasks.map(t=>`<li class="${isLate(t)?'late':''}"><div class="grow"><div class="t">${esc(t.title)}</div><div class="m">${esc(pname(t.from))} ← ${esc(pname(t.to))} · ${rel(t.due)}</div></div>${isLate(t)?'<span class="pill p-bad">عقب‌افتاده</span>':''}</li>`).join('')}</ul>`:empty('کار بازی برای شعبه‌ها نیست.')}</section>
  ${done.length?`<section class="card"><h3 class="muted">تحویل‌شده‌های اخیر</h3><ul class="list">${done.map(ord).join('')}</ul></section>`:''}`;
}

function scrContent(){
  const st=ui.contentSt;
  const rows=state.content.filter(c=>st==='همه'?c.status!=='منتشرشده':c.status===st).sort((a,b)=>(a.date||'').localeCompare(b.date||''));
  const webTasks=state.tasks.filter(t=>!t.done&&(t.category==='سایت'||t.category==='اینستاگرام')).sort((a,b)=>(a.due||'').localeCompare(b.due||''));
  const cpill=s=>{const m={'ایده':'p-mute','در حال تولید':'p-warn','آماده انتشار':'p-info','منتشرشده':'p-ok'};return `<span class="pill ${m[s]}">${esc(s)}</span>`};
  return `
  <details class="add"><summary>برنامه محتوای جدید</summary><form class="f" data-form="content">
    <label class="full">موضوع<input id="ct-title" name="title" required placeholder="مثلاً ریلز معرفی جیبیتزهای جدید"></label>
    <label>قالب<select id="ct-platform" name="platform">${opts(PLATFORMS)}</select></label>
    <label>تاریخ انتشار<input type="date" id="ct-date" name="date" value="${addDays(TODAY,1)}"></label>
    <label class="full">وضعیت<select id="ct-status" name="status">${opts(CONTENT_ST)}</select></label>
    <button class="btn full">افزودن</button></form></details>
  <div class="chips">${['همه',...CONTENT_ST].map(s=>`<button class="chip" data-contentst="${s}" aria-pressed="${st===s}">${s==='همه'?'منتشرنشده‌ها':s} (${fmtN(s==='همه'?state.content.filter(c=>c.status!=='منتشرشده').length:state.content.filter(c=>c.status===s).length)})</button>`).join('')}</div>
  <section class="card">${rows.length?`<ul class="list">${rows.map(c=>{const late=c.status!=='منتشرشده'&&c.date&&c.date<TODAY;return `<li class="${late?'late':''}"><div class="grow"><div class="t">${esc(c.title)}</div><div class="m">${esc(c.platform)} · ${c.date?jd(c.date,{weekday:'short',day:'numeric',month:'long'}):'بدون تاریخ'}${late?' · عقب‌افتاده':''}</div><div style="margin-top:4px"><select class="inline" data-set="content/${c.id}" data-field="status" aria-label="وضعیت">${opts(CONTENT_ST,c.status)}</select></div></div><div style="display:grid;justify-items:end;gap:4px">${cpill(c.status)}${delBtn('content',c.id)}</div></li>`}).join('')}</ul>`:empty('محتوایی در این وضعیت نیست.')}</section>
  <section class="card"><div class="row"><h3>کارهای سایت و اینستاگرام</h3><span class="small muted">${fmtN(webTasks.length)} باز</span></div>${webTasks.length?`<ul class="list">${webTasks.map(t=>`<li class="${isLate(t)?'late':''}"><input type="checkbox" class="chk" data-toggle="${t.id}" aria-label="انجام شد"><div class="grow"><div class="t">${esc(t.title)}</div><div class="m">${esc(t.category)} · ${esc(pname(t.to))} · ${rel(t.due)}</div></div></li>`).join('')}</ul>`:empty('در بخش کارها، دسته «سایت» یا «اینستاگرام» را انتخاب کن تا این‌جا نمایش داده شود.')}</section>`;
}

function scrReport(){
  const mine=state.sales.filter(s=>s.by===me.id).sort((a,b)=>b.date.localeCompare(a.date)||(b.createdAt||0)-(a.createdAt||0));
  const today=mine.filter(s=>s.date===TODAY);
  const prods=state.products.map(p=>p.name);
  return `
  <div class="kpis"><div class="kpi"><span class="lab">فروش امروز من</span><span class="val">${fmtT(today.reduce((a,s)=>a+saleAmt(s),0))}</span><span class="hint">${fmtN(today.reduce((a,s)=>a+(+s.qty||0),0))} جفت</span></div><div class="kpi"><span class="lab">شعبه</span><span class="val" style="font-size:1.1rem">${esc(myBranch()==='مرکزی'?'شعبه مرکزی':myBranch())}</span></div></div>
  <section class="card"><h3>ثبت فروش</h3>
    <form class="f" data-form="sale" style="padding:0">
      <label class="full">محصول<input id="sl-product" name="product" required list="prodList" placeholder="انتخاب از لیست"></label>
      <label>رنگ<input id="sl-color" name="color" placeholder="مشکی"></label>
      <label>سایز<input id="sl-size" name="size" inputmode="numeric" placeholder="۴۲"></label>
      <label>تعداد<input id="sl-qty" name="qty" type="number" min="1" value="1" required></label>
      <label>قیمت واحد (تومان)<input id="sl-price" name="price" type="number" min="0" step="1000" required></label>
      <label>کانال<select id="sl-channel" name="channel">${opts(me.role==='branch'?['حضوری']:CHANNELS)}</select></label>
      <label>تاریخ<input type="date" id="sl-date" name="date" value="${TODAY}"></label>
      <button class="btn full">ثبت فروش</button>
    </form>
    <datalist id="prodList">${prods.map(p=>`<option value="${esc(p)}">`).join('')}</datalist>
  </section>
  <section class="card"><h3>فروش‌های ثبت‌شده من</h3>${mine.length?`<ul class="list">${mine.slice(0,25).map(s=>`<li><div class="grow"><div class="t">${esc(s.product)} ${s.color?'· '+esc(s.color):''} ${s.size?'· '+esc(s.size):''}</div><div class="m">${jd(s.date)} · ${fmtN(s.qty)} جفت · ${esc(s.channel)}</div></div><span class="num">${fmtN(saleAmt(s))}</span>${delBtn('sales',s.id)}</li>`).join('')}</ul>`:empty('هنوز فروشی ثبت نکرده‌ای.')}</section>`;
}

function scrOrder(){
  const mine=state.orders.filter(o=>o.by===me.id||(me.role==='branch'&&o.branch===myBranch())).sort((a,b)=>(b.date||'').localeCompare(a.date||''));
  return `
  <details class="add" open><summary>سفارش کالای جدید</summary><form class="f" data-form="order">
    <label class="full">اقلام<textarea id="or-items" name="items" required placeholder="مثلاً ۱۰ جفت کلاسیک مشکی سایز ۴۰ تا ۴۴"></textarea></label>
    <label class="full">توضیح<input id="or-note" name="note" placeholder="اختیاری، مثلاً فوری"></label>
    <button class="btn full">ارسال سفارش</button></form></details>
  <section class="card"><h3>سفارش‌های من</h3>${mine.length?`<ul class="list">${mine.map(o=>`<li><div class="grow"><div class="t">${esc(o.items)}</div><div class="m">${jd(o.date)}${o.note?' · '+esc(o.note):''}${o.amount?' · فاکتور '+fmtN(o.amount)+' تومان':''}</div></div>${orderPill(o)}</li>`).join('')}</ul>`:empty('سفارشی ثبت نکرده‌ای.')}</section>`;
}

function scrPayments(){
  const b=myBranch();
  const x=balances().find(z=>z.b===b)||{bal:0};
  const rows=state.payments.filter(p=>p.branch===b).sort((a,c)=>(c.date||'').localeCompare(a.date||''));
  const inv=state.orders.filter(o=>o.branch===b&&o.amount).sort((a,c)=>(c.date||'').localeCompare(a.date||''));
  return `
  <div class="kpis"><div class="kpi wide balance ${x.bal<=0?'zero':''}"><span class="lab">مانده حساب ${esc(b)}</span><span class="val">${fmtT(Math.abs(x.bal))} <span class="small muted" style="font-weight:400">تومان</span></span><span class="hint">${x.bal>0?'بدهکار به فروشگاه مرکزی':x.bal<0?'بستانکار':'حساب تسویه است'}</span></div></div>
  <details class="add"><summary>ثبت پرداخت</summary><form class="f" data-form="payment">
    <label>مبلغ (تومان)<input id="py-amount" name="amount" type="number" min="0" step="10000" required></label>
    <label>تاریخ<input type="date" id="py-date" name="date" value="${TODAY}"></label>
    <label class="full">توضیح<input id="py-note" name="note" placeholder="مثلاً کارت‌به‌کارت، شماره پیگیری"></label>
    <button class="btn full">ثبت پرداخت</button></form></details>
  <section class="card"><h3>پرداخت‌ها</h3>${rows.length?`<ul class="list">${rows.map(p=>`<li><div class="grow"><div class="t num">${fmtN(p.amount)} تومان</div><div class="m">${jd(p.date)}${p.note?' · '+esc(p.note):''}</div></div><span class="pill ${p.confirmed?'p-ok':'p-warn'}">${p.confirmed?'تأیید شد':'منتظر تأیید'}</span></li>`).join('')}</ul>`:empty('پرداختی ثبت نشده است.')}</section>
  <section class="card"><h3>فاکتورهای سفارش</h3>${inv.length?`<ul class="list">${inv.map(o=>`<li><div class="grow"><div class="t">${esc(o.items)}</div><div class="m">${jd(o.date)} · ${esc(o.status)}</div></div><span class="num">${fmtN(o.amount)}</span></li>`).join('')}</ul>`:empty('هنوز فاکتوری برای سفارش‌هایت ثبت نشده است.')}</section>`;
}

// ---------- appointment businesses (salon, clinic) ----------
const svc=id=>state.services.find(x=>x.id===id);
const client=id=>state.clients.find(x=>x.id===id);
const staffList=()=>state.people.filter(p=>p.role==='staff');
const isDone=a=>a.status==='انجام‌شده';
const apptPill=a=>{const m={'رزرو':'p-mute','تأیید شده':'p-info','انجام‌شده':'p-ok','لغو':'p-bad','نیامد':'p-warn'};return `<span class="pill ${m[a.status]||'p-mute'}">${esc(a.status)}</span>`};
const tm=t=>(t||'').replace(/\d/g,d=>'۰۱۲۳۴۵۶۷۸۹'[d]);
function clientStats(id){const as=state.appointments.filter(a=>a.clientId===id);const done=as.filter(isDone).sort((a,b)=>b.date.localeCompare(a.date));return {as,done,last:done[0]?.date||null,total:done.reduce((x,a)=>x+(+a.price||0),0),next:as.filter(a=>a.date>=TODAY&&!['لغو','نیامد','انجام‌شده'].includes(a.status)).sort((a,b)=>(a.date+a.time).localeCompare(b.date+b.time))[0]}}

function dayNav(){const d=ui.day||TODAY;return `<div class="row" style="flex-wrap:nowrap;gap:6px">
  <button class="chip" data-day="-1" aria-label="روز قبل">‹ قبل</button>
  <label style="flex:1;text-align:center"><span class="t">${d===TODAY?'امروز · ':''}${jd(d,{weekday:'long',day:'numeric',month:'long'})}</span>
  <input type="date" id="dayPick" value="${d}" style="display:block;margin:2px auto 0;background:var(--surface);border:1px solid var(--line);border-radius:8px;padding:2px 6px;font-size:.8rem;color:var(--fg)"></label>
  <button class="chip" data-day="1" aria-label="روز بعد">بعد ›</button></div>
  ${d!==TODAY?'<div style="text-align:center"><button class="lnk" data-day="0">برگشت به امروز</button></div>':''}`}

function apptRow(a,mode){
  const late=a.date<TODAY&&['رزرو','تأیید شده'].includes(a.status);
  const c=client(a.clientId);
  return `<li class="${late?'late':''} ${['لغو','نیامد'].includes(a.status)?'done':''}">
    <div class="num" style="font-weight:800;min-width:3.2em;font-size:1.05rem">${tm(a.time)}</div>
    <div class="grow"><div class="t">${esc(a.clientName||c?.name||'—')}</div>
      <div class="m">${esc(a.serviceName||svc(a.serviceId)?.name||'')}${mode==='mine'?'':' · '+esc(pname(a.staff))} · ${fmtN(a.price)} تومان</div>
      ${mode==='mine'&&c?.phone?`<div class="m">تلفن: <span style="user-select:all">${esc(c.phone)}</span></div>`:''}
      ${a.note&&mode!=='mine'?`<div class="m">${esc(a.note)}</div>`:''}
      <div class="row" style="justify-content:flex-start;margin-top:4px;gap:10px">
        <select class="inline" data-set="appointments/${a.id}" data-field="status" aria-label="وضعیت">${opts(APPT_ST,a.status)}</select>
        ${mode!=='mine'?`<label class="small muted" style="display:flex;align-items:center;gap:4px"><input type="checkbox" class="chk" style="width:18px;height:18px;margin:0" data-paid="appointments/${a.id}" ${a.paid?'checked':''}>پرداخت شد</label>`:''}
      </div>
      ${mode==='mine'?`<div style="display:grid;gap:6px;margin-top:6px">
        <input class="inline" style="width:100%" placeholder="${esc(L('note'))}" value="${esc(a.note||'')}" data-set="appointments/${a.id}" data-field="note" aria-label="${esc(L('note'))}">
        ${isMed()&&a.clientId?`<label class="small muted" style="display:flex;align-items:center;gap:6px">ویزیت بعدی<input class="inline" type="date" value="${esc(c?.followUp||'')}" data-set="clients/${a.clientId}" data-field="followUp"></label>`:''}
      </div>`:''}
    </div>
    <div style="display:grid;justify-items:end;gap:4px">${late?'<span class="pill p-warn">وضعیت ثبت نشده</span>':apptPill(a)}${mode!=='mine'?delBtn('appointments',a.id):''}</div>
  </li>`;
}

function scrAppts(){
  const d=ui.day||TODAY, st=staffList();
  let rows=state.appointments.filter(a=>a.date===d);
  if(ui.staffF!=='همه') rows=rows.filter(a=>a.staff===ui.staffF);
  rows.sort((a,b)=>(a.time||'').localeCompare(b.time||''));
  const active=rows.filter(a=>!['لغو','نیامد'].includes(a.status));
  const expected=active.reduce((x,a)=>x+(+a.price||0),0);
  const unpaid=rows.filter(a=>isDone(a)&&!a.paid).length;
  const svcs=state.services;
  return `
  <details class="add"><summary>نوبت جدید</summary><form class="f" data-form="appt">
    <label class="full">${L('client')}<input id="ap-client" name="client" required list="clientList" placeholder="نام ${L('client')} (جدید یا از لیست)"></label>
    <label>تلفن<input id="ap-phone" name="phone" inputmode="tel" placeholder="برای ${L('client')} جدید"></label>
    <label>خدمت<select id="ap-service" name="service" required><option value="">انتخاب</option>${svcs.map(x=>`<option value="${x.id}">${esc(x.name)}</option>`).join('')}</select></label>
    <label>${L('staff')}<select id="ap-staff" name="staff">${st.map(p=>`<option value="${p.id}">${esc(p.name)}</option>`).join('')}</select></label>
    <label>مبلغ (تومان)<input id="ap-price" name="price" type="number" min="0" step="10000"></label>
    <label>تاریخ<input type="date" id="ap-date" name="date" value="${d}" required></label>
    <label>ساعت<input type="time" id="ap-time" name="time" value="10:00" required></label>
    <button class="btn full">ثبت نوبت</button></form>
    <datalist id="clientList">${state.clients.map(c=>`<option value="${esc(c.name)}">`).join('')}</datalist></details>
  ${dayNav()}
  ${st.length>1?`<div class="chips">${[['همه','همه'],...st.map(p=>[p.id,p.name])].map(([k,l])=>`<button class="chip" data-stafff="${k}" aria-pressed="${ui.staffF===k}">${esc(l)}</button>`).join('')}</div>`:''}
  <div class="kpis"><div class="kpi"><span class="lab">نوبت‌ها</span><span class="val">${fmtN(active.length)}</span><span class="hint">${fmtN(rows.length-active.length)} لغو یا غیبت</span></div><div class="kpi ${unpaid?'alert':''}"><span class="lab">درآمد پیش‌بینی</span><span class="val">${fmtT(expected)}</span><span class="hint">${unpaid?fmtN(unpaid)+' نوبت انجام‌شده پرداخت نشده':'تومان'}</span></div></div>
  <section class="card">${rows.length?`<ul class="list">${rows.map(a=>apptRow(a,'all')).join('')}</ul>`:empty('برای این روز نوبتی ثبت نشده است.')}</section>`;
}

function scrMyAppts(){
  const d=ui.day||TODAY;
  const rows=state.appointments.filter(a=>a.date===d&&a.staff===me.id).sort((a,b)=>(a.time||'').localeCompare(b.time||''));
  const left=rows.filter(a=>['رزرو','تأیید شده'].includes(a.status)).length;
  return `${dayNav()}
  <div class="kpis"><div class="kpi"><span class="lab">نوبت‌های ${d===TODAY?'امروز':'این روز'}</span><span class="val">${fmtN(rows.length)}</span><span class="hint">${fmtN(left)} باقی‌مانده</span></div><div class="kpi"><span class="lab">نوبت بعدی</span><span class="val" style="font-size:1.1rem">${(()=>{const n=rows.find(a=>['رزرو','تأیید شده'].includes(a.status));return n?tm(n.time)+' · '+esc(n.clientName):'—'})()}</span></div></div>
  <section class="card">${rows.length?`<ul class="list">${rows.map(a=>apptRow(a,'mine')).join('')}</ul>`:empty('برای این روز نوبتی نداری.')}</section>`;
}

function scrClients(){
  const q=ui.q.trim();
  const all=state.clients.map(c=>({c,s:clientStats(c.id)}));
  let follow=[],followTitle='';
  if(isMed()){follow=all.filter(x=>x.c.followUp&&x.c.followUp<=addDays(TODAY,7)&&!(x.s.next&&x.s.next.date<=x.c.followUp)).sort((a,b)=>a.c.followUp.localeCompare(b.c.followUp));followTitle='پیگیری ویزیت بعدی (۷ روز آینده و عقب‌افتاده)'}
  else{follow=all.filter(x=>x.s.last&&x.s.last<addDays(TODAY,-45)&&!x.s.next).sort((a,b)=>a.s.last.localeCompare(b.s.last));followTitle='بیش از ۴۵ روز است نیامده‌اند'}
  const list=all.filter(x=>!q||x.c.name.includes(q)||(x.c.phone||'').includes(q)||(x.c.fileNo||'').includes(q)).sort((a,b)=>(b.s.last||'').localeCompare(a.s.last||''));
  const item=({c,s})=>`<li style="display:block"><details><summary style="cursor:pointer;list-style:none;display:flex;gap:10px;justify-content:space-between;align-items:flex-start">
      <div class="grow"><div class="t">${esc(c.name)}${c.fileNo?` <span class="small muted">· پرونده ${esc(c.fileNo)}</span>`:''}</div>
      <div class="m">${s.last?'آخرین مراجعه '+jd(s.last)+' ('+rel(s.last)+')':'هنوز مراجعه نداشته'} · ${fmtN(s.done.length)} مراجعه${s.next?' · نوبت بعدی '+jd(s.next.date):''}</div></div>
      <span class="num small">${fmtT(s.total)}</span></summary>
    <div style="display:grid;gap:6px;margin-top:8px;padding:10px;background:var(--surface-2);border-radius:10px">
      ${c.phone?`<div class="small">تلفن: <span style="user-select:all">${esc(c.phone)}</span></div>`:''}
      <label class="small muted">یادداشت<input class="inline" style="width:100%" value="${esc(c.note||'')}" data-set="clients/${c.id}" data-field="note"></label>
      ${isMed()?`<label class="small muted" style="display:flex;gap:6px;align-items:center">ویزیت بعدی<input class="inline" type="date" value="${esc(c.followUp||'')}" data-set="clients/${c.id}" data-field="followUp"></label>`:''}
      ${s.as.length?`<ul class="list">${[...s.as].sort((a,b)=>b.date.localeCompare(a.date)).slice(0,8).map(a=>`<li><div class="grow"><div class="small">${jd(a.date)} · ${esc(a.serviceName)} · ${esc(pname(a.staff))}</div>${a.note?`<div class="m">${esc(a.note)}</div>`:''}</div>${apptPill(a)}</li>`).join('')}</ul>`:''}
    </div></details></li>`;
  return `
  <details class="add"><summary>${L('client')} جدید</summary><form class="f" data-form="client">
    <label class="full">نام<input id="cl-name" name="name" required></label>
    <label>تلفن<input id="cl-phone" name="phone" inputmode="tel"></label>
    <label>یادداشت<input id="cl-note" name="note" placeholder="${isMed()?'مثلاً حساسیت دارویی':'مثلاً رنگ مو ۷.۱'}"></label>
    <button class="btn full">ثبت</button></form></details>
  ${follow.length?`<section class="card" style="border-color:var(--warn)"><div class="row"><h3>${followTitle}</h3><span class="pill p-warn">${fmtN(follow.length)}</span></div><ul class="list">${follow.slice(0,10).map(({c,s})=>`<li><div class="grow"><div class="t">${esc(c.name)}</div><div class="m">${isMed()?'موعد ویزیت '+jd(c.followUp)+' · '+rel(c.followUp):'آخرین مراجعه '+rel(s.last)}${c.phone?' · '+esc(c.phone):''}</div></div></li>`).join('')}</ul></section>`:''}
  <input id="q" type="search" value="${esc(ui.q)}" placeholder="جستجوی نام، تلفن${isMed()?' یا شماره پرونده':''}" style="background:var(--surface);border:1px solid var(--line);border-radius:10px;padding:9px 12px;color:var(--fg);width:100%" aria-label="جستجو">
  <section class="card"><div class="row"><h3>${L('clients')}</h3><span class="small muted">${fmtN(list.length)} نفر</span></div>${list.length?`<ul class="list">${list.slice(0,60).map(item).join('')}</ul>`:empty(q?'کسی با این مشخصات پیدا نشد.':`هنوز ${L('client')}ی ثبت نشده است.`)}</section>`;
}

function scrIncome(){
  const [f,t]=range();
  const rows=state.appointments.filter(a=>a.date>=f&&a.date<=t);
  const done=rows.filter(isDone), total=done.reduce((x,a)=>x+(+a.price||0),0);
  const missed=rows.filter(a=>a.status==='لغو'||a.status==='نیامد').length;
  const unpaid=state.appointments.filter(a=>isDone(a)&&!a.paid).reduce((x,a)=>x+(+a.price||0),0);
  const b=buckets([f,t]);
  const cr=state.appointments.filter(a=>isDone(a)&&a.date>=b.range[0]&&a.date<=b.range[1]);
  const sums={};cr.forEach(a=>{const k=b.keyOf(a);sums[k]=(sums[k]||0)+(+a.price||0)});
  const max=Math.max(1,...b.keys.map(k=>sums[k]||0)), step=b.keys.length>16?Math.ceil(b.keys.length/8):1;
  const byS={};done.forEach(a=>{const k=a.staff;(byS[k]=byS[k]||{n:0,a:0}).n++;byS[k].a+=+a.price||0});
  const bySv={};done.forEach(a=>{const k=a.serviceName||'—';(bySv[k]=bySv[k]||{n:0,a:0}).n++;bySv[k].a+=+a.price||0});
  const todayAppts=state.appointments.filter(a=>a.date===TODAY&&!['لغو','نیامد'].includes(a.status)).length;
  const periodLabel={today:'امروز',month:'این ماه ('+JMONTHS[jp(TODAY).m-1]+')',year:'امسال',custom:jd(f)+' تا '+jd(t)}[ui.period];
  const tbl=(obj,name)=>{const e=Object.entries(obj).sort((x,y)=>y[1].a-x[1].a);return e.length?`<div class="tbl-wrap"><table class="tbl"><thead><tr><th>${name}</th><th>تعداد</th><th>مبلغ</th></tr></thead><tbody>${e.map(([k,v])=>`<tr><td>${esc(name===L('staff')?pname(k):k)}</td><td class="num">${fmtN(v.n)}</td><td class="num">${fmtT(v.a)}</td></tr>`).join('')}</tbody></table></div>`:empty('در این بازه نوبت انجام‌شده‌ای نیست.')};
  return `
  <button class="card" data-go="appts" style="text-align:start;cursor:pointer"><div class="row"><span class="t">${fmtN(todayAppts)} نوبت برای امروز</span><span class="lnk">نوبت‌ها</span></div></button>
  <div class="seg" role="group" aria-label="بازه">${[['today','روز'],['month','ماه'],['year','سال'],['custom','بازه دلخواه']].map(([k,l])=>`<button data-period="${k}" aria-pressed="${ui.period===k}">${l}</button>`).join('')}</div>
  ${ui.period==='custom'?`<div class="row" style="flex-wrap:nowrap"><label class="small muted" style="flex:1">از<input type="date" id="rf" value="${f}" style="width:100%;background:var(--surface);border:1px solid var(--line);border-radius:9px;padding:6px"></label><label class="small muted" style="flex:1">تا<input type="date" id="rt" value="${t}" style="width:100%;background:var(--surface);border:1px solid var(--line);border-radius:9px;padding:6px"></label></div>`:''}
  <div class="kpis">
    <div class="kpi wide"><span class="lab">درآمد ${periodLabel}</span><span class="val">${fmtT(total)} <span class="small muted" style="font-weight:400">تومان</span></span><span class="hint">${fmtN(done.length)} نوبت انجام‌شده</span></div>
    <div class="kpi ${missed?'alert':''}"><span class="lab">لغو و غیبت</span><span class="val">${fmtN(missed)}</span><span class="hint">در ${periodLabel}</span></div>
    <div class="kpi ${unpaid?'alert':''}"><span class="lab">طلب از ${L('clients')}</span><span class="val">${fmtT(unpaid)}</span><span class="hint">نوبت انجام‌شده، پرداخت‌نشده</span></div>
  </div>
  <section class="card"><div class="row"><h3>${ui.period==='today'?'۷ روز اخیر':'روند درآمد'}</h3><span class="small muted">میلیون تومان</span></div>
    ${cr.length?`<div class="bars" role="img" aria-label="نمودار درآمد">${b.keys.map((k,i)=>`<div class="bar ${k===b.now?'now':''}" title="${fmtN(sums[k]||0)} تومان"><span>${sums[k]&&b.keys.length<=16?(sums[k]/1e6).toLocaleString('fa-IR',{maximumFractionDigits:0}):''}</span><i style="height:${Math.round((sums[k]||0)/max*90)}px"></i><span>${i%step===0||k===b.now?esc(b.label(k)):''}</span></div>`).join('')}</div>`:empty('در این بازه درآمدی ثبت نشده است.')}
  </section>
  <section class="card"><h3>به تفکیک ${L('staff')}</h3>${tbl(byS,L('staff'))}</section>
  <section class="card"><h3>به تفکیک خدمت</h3>${tbl(bySv,'خدمت')}</section>`;
}

function scrEarn(){
  const ms=monthStart(TODAY);
  const mine=state.appointments.filter(a=>a.staff===me.id&&isDone(a));
  const month=mine.filter(a=>a.date>=ms&&a.date<=TODAY), today=mine.filter(a=>a.date===TODAY);
  const sum=r=>r.reduce((x,a)=>x+(+a.price||0),0);
  const pct=+me.commission||0;
  return `
  <div class="kpis">
    <div class="kpi wide"><span class="lab">سهم من در ${JMONTHS[jp(TODAY).m-1]}${pct?' ('+fmtN(pct)+'٪)':''}</span><span class="val">${fmtT(sum(month)*pct/100)} <span class="small muted" style="font-weight:400">تومان</span></span><span class="hint">از ${fmtT(sum(month))} تومان درآمد ${fmtN(month.length)} نوبت</span></div>
    <div class="kpi"><span class="lab">امروز</span><span class="val">${fmtN(today.length)}</span><span class="hint">نوبت انجام‌شده</span></div>
    <div class="kpi"><span class="lab">سهم امروز</span><span class="val">${fmtT(sum(today)*pct/100)}</span><span class="hint">تومان</span></div>
  </div>
  <section class="card"><h3>نوبت‌های انجام‌شده این ماه</h3>${month.length?`<ul class="list">${[...month].sort((a,b)=>(b.date+b.time).localeCompare(a.date+a.time)).slice(0,30).map(a=>`<li><div class="grow"><div class="t">${esc(a.clientName)}</div><div class="m">${jd(a.date)} · ${esc(a.serviceName)}</div></div><span class="num">${fmtN((+a.price||0)*pct/100)}</span></li>`).join('')}</ul>`:empty('این ماه هنوز نوبت انجام‌شده‌ای نداری.')}</section>
  ${pct?'':'<p class="small muted" style="margin:0">درصد سهم تو هنوز تعیین نشده است.</p>'}`;
}


// ---------- online shop ----------
const oTotal=o=>(o.items||[]).reduce((a,i)=>a+(+i.qty||0)*(+i.price||0),0);
const isPaidO=o=>PAID_ST.includes(o.status);
const oPill=o=>{const m={'جدید':'p-mute','در انتظار پرداخت':'p-warn','پرداخت‌شده':'p-info','بسته‌بندی':'p-warn','ارسال‌شده':'p-info','تحویل‌شده':'p-ok','مرجوعی':'p-bad','لغو':'p-bad'};return `<span class="pill ${m[o.status]||'p-mute'}">${esc(o.status)}</span>`};
const oItems=o=>(o.items||[]).map(i=>i.name+(+i.qty>1?' ×'+fmtN(i.qty):'')).join('، ');
const lowStock=()=>state.products.filter(p=>(+p.stock||0)<=(+p.min||0));
const periodSeg=()=>`<div class="seg" role="group" aria-label="بازه">${[['today','روز'],['month','ماه'],['year','سال'],['custom','بازه دلخواه']].map(([k,l])=>`<button data-period="${k}" aria-pressed="${ui.period===k}">${l}</button>`).join('')}</div>
  ${ui.period==='custom'?`<div class="row" style="flex-wrap:nowrap"><label class="small muted" style="flex:1">از<input type="date" id="rf" value="${range()[0]}" style="width:100%;background:var(--surface);border:1px solid var(--line);border-radius:9px;padding:6px"></label><label class="small muted" style="flex:1">تا<input type="date" id="rt" value="${range()[1]}" style="width:100%;background:var(--surface);border:1px solid var(--line);border-radius:9px;padding:6px"></label></div>`:''}`;
function scrSSales(){
  const [f,t]=range(), ch=ui.source==='all'?null:ui.source;
  const inCh=o=>!ch||o.channel===ch;
  const all=state.sorders.filter(o=>o.date>=f&&o.date<=t&&inCh(o));
  const rows=all.filter(isPaidO), total=rows.reduce((a,o)=>a+oTotal(o),0);
  const ret=all.filter(o=>o.status==='مرجوعی').length, unpaid=all.filter(o=>o.status==='جدید'||o.status==='در انتظار پرداخت').length;
  const b=buckets([f,t]);
  const cr=state.sorders.filter(o=>isPaidO(o)&&inCh(o)&&o.date>=b.range[0]&&o.date<=b.range[1]);
  const sums={};cr.forEach(o=>{const k=b.keyOf(o);sums[k]=(sums[k]||0)+oTotal(o)});
  const max=Math.max(1,...b.keys.map(k=>sums[k]||0)), step=b.keys.length>16?Math.ceil(b.keys.length/8):1;
  const byCh={};rows.forEach(o=>{const k=o.channel||'—';(byCh[k]=byCh[k]||{n:0,a:0}).n++;byCh[k].a+=oTotal(o)});
  const byP={};rows.forEach(o=>(o.items||[]).forEach(i=>{const k=i.name;(byP[k]=byP[k]||{n:0,a:0}).n+=+i.qty||0;byP[k].a+=(+i.qty||0)*(+i.price||0)}));
  const toShip=state.sorders.filter(o=>o.status==='پرداخت‌شده'||o.status==='بسته‌بندی').length, low=lowStock().length;
  const mt=myTasks(), lateMine=[...mt.received,...mt.mine].filter(isLate);
  const periodLabel={today:'امروز',month:'این ماه ('+JMONTHS[jp(TODAY).m-1]+')',year:'امسال',custom:jd(f)+' تا '+jd(t)}[ui.period];
  const tbl=(obj,name,u)=>{const e=Object.entries(obj).sort((x,y)=>y[1].a-x[1].a);return e.length?`<div class="tbl-wrap"><table class="tbl"><thead><tr><th>${name}</th><th>${u}</th><th>مبلغ</th></tr></thead><tbody>${e.map(([k,v])=>`<tr><td>${esc(k)}</td><td class="num">${fmtN(v.n)}</td><td class="num">${fmtT(v.a)}</td></tr>`).join('')}</tbody></table></div>`:empty('در این بازه فروشی ثبت نشده است.')};
  return `
  ${toShip||low||lateMine.length?`<div class="kpis">
    ${toShip?`<button class="kpi alert" data-go="${me.role==='warehouse'?'ship':'sorders'}" data-ost="ارسال‌نشده" style="text-align:start;cursor:pointer"><span class="lab">منتظر ارسال</span><span class="val">${fmtN(toShip)}</span><span class="hint">سفارش پرداخت‌شده</span></button>`:''}
    ${low?`<button class="kpi alert" data-go="stock" style="text-align:start;cursor:pointer"><span class="lab">موجودی کم</span><span class="val">${fmtN(low)}</span><span class="hint">محصول نیاز به شارژ</span></button>`:''}
    ${lateMine.length?`<button class="kpi alert" data-go="tasks" style="text-align:start;cursor:pointer"><span class="lab">کار عقب‌افتاده</span><span class="val">${fmtN(lateMine.length)}</span><span class="hint">برای تو</span></button>`:''}
  </div>`:''}
  ${periodSeg()}
  <div class="chips" role="group" aria-label="کانال فروش">${[['all','همه کانال‌ها'],...SHOP_CH.map(c=>[c,c])].map(([k,l])=>`<button class="chip" data-source="${k}" aria-pressed="${ui.source===k}">${l}</button>`).join('')}</div>
  <div class="kpis">
    <div class="kpi wide"><span class="lab">فروش ${periodLabel}</span><span class="val">${fmtT(total)} <span class="small muted" style="font-weight:400">تومان</span></span><span class="hint">${fmtN(rows.length)} سفارش پرداخت‌شده</span></div>
    <div class="kpi"><span class="lab">میانگین هر سفارش</span><span class="val">${fmtT(rows.length?total/rows.length:0)}</span><span class="hint">تومان</span></div>
    <div class="kpi ${ret?'alert':''}"><span class="lab">مرجوعی</span><span class="val">${fmtN(ret)}</span><span class="hint">${unpaid?fmtN(unpaid)+' سفارش منتظر پرداخت':'سفارش'}</span></div>
  </div>
  <section class="card"><div class="row"><h3>${ui.period==='today'?'۷ روز اخیر':'روند فروش'}</h3><span class="small muted">میلیون تومان</span></div>
    ${cr.length?`<div class="bars" role="img" aria-label="نمودار فروش">${b.keys.map((k,i)=>`<div class="bar ${k===b.now?'now':''}" title="${fmtN(sums[k]||0)} تومان"><span>${sums[k]&&b.keys.length<=16?(sums[k]/1e6).toLocaleString('fa-IR',{maximumFractionDigits:0}):''}</span><i style="height:${Math.round((sums[k]||0)/max*90)}px"></i><span>${i%step===0||k===b.now?esc(b.label(k)):''}</span></div>`).join('')}</div>`:empty('در این بازه فروشی ثبت نشده است.')}
  </section>
  ${ch?'':`<section class="card"><h3>به تفکیک کانال</h3>${tbl(byCh,'کانال','سفارش')}</section>`}
  <section class="card"><div class="row"><h3>پرفروش‌ترین محصولات</h3><span class="small muted">${periodLabel}</span></div>${tbl(byP,'محصول','تعداد')}</section>`;
}
function orderForm(){
  const ps=state.products.map(p=>[p.id,p.name+' · '+fmtT(p.price)+((+p.stock||0)<=0?' (ناموجود)':'')]);
  const line=n=>`<label>محصول ${fmtN(n)}<select id="so-p${n}" name="p${n}">${n>1?'<option value="">—</option>':''}${opts(ps,'')}</select></label><label>تعداد<input id="so-q${n}" name="q${n}" type="number" min="1" value="1"></label>`;
  return `<details class="add"${state._openAdd==='sorder'?' open':''}><summary>ثبت سفارش جدید</summary><form class="f" data-form="sorder">
    <label>نام مشتری<input id="so-name" name="customer" required></label>
    <label>موبایل<input id="so-phone" name="phone" inputmode="tel"></label>
    <label>شهر<input id="so-city" name="city"></label>
    <label>کانال<select id="so-ch" name="channel">${opts(SHOP_CH,'اینستاگرام')}</select></label>
    ${line(1)}${line(2)}${line(3)}
    <label>روش ارسال<select id="so-ship" name="ship">${opts(SHIP,'پست')}</select></label>
    <label>هزینه ارسال<input id="so-fee" name="fee" type="number" min="0" step="1000" value="70000"></label>
    <label class="full">وضعیت<select id="so-st" name="status">${opts(['جدید','در انتظار پرداخت','پرداخت‌شده'],'پرداخت‌شده')}</select></label>
    <button class="btn full">ثبت سفارش</button>
    <p class="small muted full" style="margin:0">با ثبت سفارش، موجودی محصولات خودکار کم می‌شود.</p></form></details>`;
}
function orderLi(o,full){
  return `<li><div class="grow"><div class="t">${esc(o.customer)} <span class="small muted">${esc(o.city||'')}</span></div>
    <div class="m">${jd(o.date)} · ${esc(o.channel||'')} · ${esc(oItems(o))}</div>
    <div class="m">${esc(o.ship||'')}${o.tracking?' · کد رهگیری '+esc(o.tracking):''}${o.phone?' · '+esc(o.phone):''}</div>
    ${full?`<div class="row" style="justify-content:flex-start;gap:6px;margin-top:4px"><select class="inline" data-set="sorders/${o.id}" data-field="status" aria-label="وضعیت">${opts(SHOP_ST,o.status)}</select><input class="inline" placeholder="کد رهگیری" value="${esc(o.tracking||'')}" data-set="sorders/${o.id}" data-field="tracking"></div>`:''}</div>
    <div style="display:grid;justify-items:end;gap:4px"><span class="num">${fmtT(oTotal(o))}</span>${oPill(o)}${full&&me.role!=='support'?delBtn('sorders',o.id):''}</div></li>`;
}
function scrSOrders(){
  const st=ui.ost||'همه', q=(ui.q||'').trim();
  const cnt=k=>state.sorders.filter(o=>k==='ارسال‌نشده'?(o.status==='پرداخت‌شده'||o.status==='بسته‌بندی'):o.status===k).length;
  let list=[...state.sorders];
  if(st==='ارسال‌نشده')list=list.filter(o=>o.status==='پرداخت‌شده'||o.status==='بسته‌بندی');else if(st!=='همه')list=list.filter(o=>o.status===st);
  if(q)list=list.filter(o=>[o.customer,o.phone,o.city,o.tracking].some(x=>String(x||'').includes(q)));
  list.sort((a,b)=>(b.date||'').localeCompare(a.date||'')||(b.createdAt||0)-(a.createdAt||0));
  const chips=['همه','جدید','در انتظار پرداخت','ارسال‌نشده','ارسال‌شده','مرجوعی'];
  return `${orderForm()}
  <div class="chips">${chips.map(k=>`<button class="chip" data-ost="${k}" aria-pressed="${st===k}">${k}${k!=='همه'&&cnt(k)?' '+fmtN(cnt(k)):''}</button>`).join('')}</div>
  <input id="q" type="search" value="${esc(ui.q)}" placeholder="جستجوی نام، موبایل، شهر یا کد رهگیری" style="background:var(--surface);border:1px solid var(--line);border-radius:10px;padding:9px 12px;color:var(--fg);width:100%" aria-label="جستجو">
  <section class="card"><div class="row"><h3>سفارش‌ها</h3><span class="small muted">${fmtN(list.length)} سفارش</span></div>${list.length?`<ul class="list">${list.slice(0,50).map(o=>orderLi(o,true)).join('')}</ul>`:empty('سفارشی با این فیلتر پیدا نشد.')}</section>`;
}
function scrShip(){
  const wait=state.sorders.filter(o=>o.status==='پرداخت‌شده').sort((a,b)=>(a.date||'').localeCompare(b.date||''));
  const pack=state.sorders.filter(o=>o.status==='بسته‌بندی').sort((a,b)=>(a.date||'').localeCompare(b.date||''));
  const sent=state.sorders.filter(o=>o.status==='ارسال‌شده').sort((a,b)=>(b.date||'').localeCompare(a.date||'')).slice(0,15);
  const li=(o,next,label)=>`<li><div class="grow"><div class="t">${esc(o.customer)} <span class="small muted">${esc(o.city||'')}</span></div><div class="m">${esc(oItems(o))}</div><div class="m">${jd(o.date)} · ${rel(o.date)} · ${esc(o.ship||'')}</div>
    ${next==='ارسال‌شده'?`<input class="inline" style="margin-top:4px" placeholder="کد رهگیری" value="${esc(o.tracking||'')}" data-set="sorders/${o.id}" data-field="tracking">`:''}${o.tracking&&next!=='ارسال‌شده'?`<div class="m">کد رهگیری ${esc(o.tracking)}</div>`:''}</div>
    <button class="btn" style="padding:6px 10px;font-size:.8rem" data-ostatus="${o.id}|${next}">${label}</button></li>`;
  return `
  <div class="kpis"><div class="kpi ${wait.length?'alert':''}"><span class="lab">منتظر بسته‌بندی</span><span class="val">${fmtN(wait.length)}</span></div><div class="kpi"><span class="lab">آماده ارسال</span><span class="val">${fmtN(pack.length)}</span></div></div>
  <section class="card"><h3>منتظر بسته‌بندی</h3>${wait.length?`<ul class="list">${wait.map(o=>li(o,'بسته‌بندی','بسته شد')).join('')}</ul>`:empty('سفارشی منتظر بسته‌بندی نیست.')}</section>
  <section class="card"><h3>بسته‌بندی‌شده، آماده ارسال</h3>${pack.length?`<ul class="list">${pack.map(o=>li(o,'ارسال‌شده','ارسال شد')).join('')}</ul>`:empty('بسته‌ای آماده ارسال نیست.')}</section>
  <section class="card"><h3>ارسال‌شده‌های اخیر</h3>${sent.length?`<ul class="list">${sent.map(o=>li(o,'تحویل‌شده','تحویل شد')).join('')}</ul>`:empty('هنوز چیزی ارسال نشده است.')}</section>`;
}
function scrStock(){
  const low=lowStock(), value=state.products.reduce((a,p)=>a+(+p.stock||0)*(+p.price||0),0), units=state.products.reduce((a,p)=>a+(+p.stock||0),0);
  const canEdit=me.role!=='support';
  const ps=[...state.products].sort((a,b)=>((+a.stock||0)-(+a.min||0))-((+b.stock||0)-(+b.min||0)));
  return `
  <div class="kpis"><div class="kpi"><span class="lab">موجودی انبار</span><span class="val">${fmtN(units)}</span><span class="hint">عدد کالا</span></div><div class="kpi"><span class="lab">ارزش موجودی</span><span class="val">${fmtT(value)}</span><span class="hint">تومان، به قیمت فروش</span></div></div>
  ${low.length?`<section class="card" style="border-color:var(--bad)"><div class="row"><h3>نیاز به شارژ</h3><span class="pill p-bad">${fmtN(low.length)}</span></div><ul class="list">${low.map(p=>`<li><span class="grow t">${esc(p.name)}</span><span class="small muted">حداقل ${fmtN(p.min)}</span><span class="pill ${(+p.stock||0)<=0?'p-bad':'p-warn'}">${(+p.stock||0)<=0?'ناموجود':fmtN(p.stock)+' عدد'}</span></li>`).join('')}</ul></section>`:''}
  <section class="card"><div class="row"><h3>محصولات</h3><span class="small muted">${fmtN(ps.length)} محصول</span></div>
    ${ps.length?`<ul class="list">${ps.map(p=>`<li><div class="grow"><div class="t">${esc(p.name)}</div><div class="m">${fmtN(p.price)} تومان</div></div>
      ${canEdit?`<label class="small muted" style="display:grid;gap:2px">موجودی<input class="inline" style="width:64px" type="number" min="0" value="${+p.stock||0}" data-set="products/${p.id}" data-field="stock"></label><label class="small muted" style="display:grid;gap:2px">حداقل<input class="inline" style="width:52px" type="number" min="0" value="${+p.min||0}" data-set="products/${p.id}" data-field="min"></label>`:`<span class="num">${fmtN(p.stock)}</span>`}</li>`).join('')}</ul>`:empty('هنوز محصولی ثبت نشده است.')}
    ${canEdit?`<details class="add"><summary>افزودن محصول</summary><form class="f" data-form="item">
      <label class="full">نام<input id="st-name" name="name" required></label>
      <label>قیمت (تومان)<input id="st-price" name="price" type="number" min="0" step="10000"></label>
      <label>موجودی<input id="st-stock" name="stock" type="number" min="0" value="10"></label>
      <label>حداقل موجودی<input id="st-min" name="min" type="number" min="0" value="3"></label>
      <button class="btn full">افزودن</button></form></details>`:''}
  </section>`;
}
function scrCustomers(){
  const g={};state.sorders.forEach(o=>{const k=o.phone||o.customer;const c=g[k]||(g[k]={name:o.customer,phone:o.phone,city:o.city,n:0,a:0,last:''});c.n++;if(isPaidO(o))c.a+=oTotal(o);if((o.date||'')>c.last){c.last=o.date;c.city=o.city||c.city}});
  const q=(ui.q||'').trim();
  let list=Object.values(g).sort((a,b)=>b.a-a.a);
  const repeat=list.filter(c=>c.n>1).length;
  if(q)list=list.filter(c=>[c.name,c.phone,c.city].some(x=>String(x||'').includes(q)));
  return `
  <div class="kpis"><div class="kpi"><span class="lab">مشتریان</span><span class="val">${fmtN(Object.keys(g).length)}</span></div><div class="kpi"><span class="lab">مشتری تکراری</span><span class="val">${fmtN(repeat)}</span><span class="hint">بیش از یک خرید</span></div></div>
  <input id="q" type="search" value="${esc(ui.q)}" placeholder="جستجوی نام، موبایل یا شهر" style="background:var(--surface);border:1px solid var(--line);border-radius:10px;padding:9px 12px;color:var(--fg);width:100%" aria-label="جستجو">
  <section class="card"><h3>به ترتیب مبلغ خرید</h3>${list.length?`<ul class="list">${list.slice(0,60).map(c=>`<li><div class="grow"><div class="t">${esc(c.name)}${c.n>1?' <span class="pill p-ok">'+fmtN(c.n)+' خرید</span>':''}</div><div class="m">${esc(c.city||'')}${c.phone?' · '+esc(c.phone):''} · آخرین خرید ${rel(c.last)}</div></div><span class="num">${fmtT(c.a)}</span></li>`).join('')}</ul>`:empty(q?'کسی با این مشخصات پیدا نشد.':'هنوز سفارشی ثبت نشده است.')}</section>`;
}


// ---------- shared small helpers ----------
const pLabel=()=>{const [f,t]=range();return {today:'امروز',month:'این ماه ('+JMONTHS[jp(TODAY).m-1]+')',year:'امسال',custom:jd(f)+' تا '+jd(t)}[ui.period]};
const nowTime=()=>{const d=new Date();return String(d.getHours()).padStart(2,'0')+':'+String(d.getMinutes()).padStart(2,'0')};
function trendCard(rows,amt,title='روند فروش'){
  const b=buckets(range());
  const cr=rows.filter(x=>x.date>=b.range[0]&&x.date<=b.range[1]);
  const sums={};cr.forEach(x=>{const k=b.keyOf(x);sums[k]=(sums[k]||0)+amt(x)});
  const max=Math.max(1,...b.keys.map(k=>sums[k]||0)), step=b.keys.length>16?Math.ceil(b.keys.length/8):1;
  return `<section class="card"><div class="row"><h3>${ui.period==='today'?'۷ روز اخیر':title}</h3><span class="small muted">میلیون تومان</span></div>
    ${cr.length?`<div class="bars" role="img" aria-label="${title}">${b.keys.map((k,i)=>`<div class="bar ${k===b.now?'now':''}" title="${fmtN(sums[k]||0)} تومان"><span>${sums[k]&&b.keys.length<=16?(sums[k]/1e6).toLocaleString('fa-IR',{maximumFractionDigits:1}):''}</span><i style="height:${Math.round((sums[k]||0)/max*90)}px"></i><span>${i%step===0||k===b.now?esc(b.label(k)):''}</span></div>`).join('')}</div>`:empty('در این بازه چیزی ثبت نشده است.')}</section>`;
}
const sumTbl=(obj,name,u='تعداد')=>{const e=Object.entries(obj).sort((x,y)=>y[1].a-x[1].a);return e.length?`<div class="tbl-wrap"><table class="tbl"><thead><tr><th>${name}</th><th>${u}</th><th>مبلغ</th></tr></thead><tbody>${e.map(([k,v])=>`<tr><td>${esc(k)}</td><td class="num">${fmtN(v.n)}</td><td class="num">${fmtT(v.a)}</td></tr>`).join('')}</tbody></table></div>`:empty('در این بازه چیزی ثبت نشده است.')};
const groupSum=(rows,key,amt,n=()=>1)=>{const o={};rows.forEach(x=>{const k=key(x)||'—';(o[k]=o[k]||{n:0,a:0}).n+=n(x);o[k].a+=amt(x)});return o};
const alertKpi=(go,lab,val,hint,extra='')=>`<button class="kpi alert" data-go="${go}"${extra} style="text-align:start;cursor:pointer"><span class="lab">${lab}</span><span class="val">${val}</span><span class="hint">${hint}</span></button>`;
const searchBox=ph=>`<input id="q" type="search" value="${esc(ui.q)}" placeholder="${ph}" style="background:var(--surface);border:1px solid var(--line);border-radius:10px;padding:9px 12px;color:var(--fg);width:100%" aria-label="جستجو">`;
const itemsTotal=x=>(x.items||[]).reduce((a,i)=>a+(+i.qty||0)*(+i.price||0),0);
const itemsTxt=x=>(x.items||[]).map(i=>i.name+(+i.qty>1?' ×'+fmtN(i.qty):'')).join('، ');
function cartBox(src,label){
  const ids=Object.keys(ui.cart).filter(k=>ui.cart[k]>0);
  const rows=ids.map(id=>{const m=src.find(x=>x.id===id);return m?{m,q:ui.cart[id]}:null}).filter(Boolean);
  const total=rows.reduce((a,r)=>a+r.q*(+r.m.price||0),0);
  return {rows,total,html:rows.length?`<ul class="list">${rows.map(r=>`<li><span class="grow t">${esc(r.m.name)}</span><button type="button" class="chip" data-cartdec="${r.m.id}" aria-label="کم کن">−</button><span class="num">${fmtN(r.q)}</span><button type="button" class="chip" data-cartinc="${r.m.id}" aria-label="زیاد کن">+</button><span class="num" style="min-width:70px;text-align:end">${fmtN(r.q*(+r.m.price||0))}</span></li>`).join('')}</ul><div class="row"><span class="t">جمع</span><span class="num t">${fmtN(total)} تومان</span></div>`:`<p class="small muted" style="margin:0">${label}</p>`};
}

// ---------- cafe & restaurant ----------
const FOOD_ST=['ثبت‌شده','در حال آماده‌سازی','آماده','تحویل‌شده','لغو'];
const FOOD_KIND=['سالن','بیرون‌بر','دلیوری'];
const PAY_M=['کارت','نقد','آنلاین'];
const fPill=o=>{const m={'ثبت‌شده':'p-mute','در حال آماده‌سازی':'p-warn','آماده':'p-info','تحویل‌شده':'p-ok','لغو':'p-bad'};return `<span class="pill ${m[o.status]||'p-mute'}">${esc(o.status)}</span>`};
const fValid=o=>o.status!=='لغو';
function scrFSales(){
  const [f,t]=range();
  const rows=state.forders.filter(o=>o.date>=f&&o.date<=t&&fValid(o));
  const total=rows.reduce((a,o)=>a+itemsTotal(o),0);
  const unpaid=state.forders.filter(o=>fValid(o)&&!o.paid&&o.date===TODAY);
  const byKind=groupSum(rows,o=>o.kind,itemsTotal), byPay=groupSum(rows.filter(o=>o.paid),o=>o.pay,itemsTotal);
  const byItem={};rows.forEach(o=>(o.items||[]).forEach(i=>{(byItem[i.name]=byItem[i.name]||{n:0,a:0}).n+=+i.qty||0;byItem[i.name].a+=(+i.qty||0)*(+i.price||0)}));
  const hours={};rows.forEach(o=>{const h=+(o.time||'0').split(':')[0];hours[h]=(hours[h]||0)+1});
  const hk=Object.keys(hours).map(Number).sort((a,b)=>a-b), hmax=Math.max(1,...Object.values(hours));
  const low=state.inventory.filter(x=>(+x.stock||0)<=(+x.min||0)).length;
  const off=state.menu.filter(m=>m.available===false).length;
  return `
  ${unpaid.length||low?`<div class="kpis">${unpaid.length?alertKpi('pos','تسویه‌نشده امروز',fmtN(unpaid.length),fmtT(unpaid.reduce((a,o)=>a+itemsTotal(o),0))+' تومان'):''}${low?alertKpi('menu','مواد اولیه رو به اتمام',fmtN(low),'قلم'):''}</div>`:''}
  ${periodSeg()}
  <div class="kpis">
    <div class="kpi wide"><span class="lab">فروش ${pLabel()}</span><span class="val">${fmtT(total)} <span class="small muted" style="font-weight:400">تومان</span></span><span class="hint">${fmtN(rows.length)} سفارش${off?' · '+fmtN(off)+' آیتم منو ناموجود':''}</span></div>
    <div class="kpi"><span class="lab">میانگین هر سفارش</span><span class="val">${fmtT(rows.length?total/rows.length:0)}</span><span class="hint">تومان</span></div>
    <div class="kpi"><span class="lab">شلوغ‌ترین ساعت</span><span class="val">${hk.length?fmtN(hk.reduce((a,b)=>hours[b]>hours[a]?b:a,hk[0])):'—'}</span><span class="hint">ساعت</span></div>
  </div>
  ${trendCard(state.forders.filter(fValid),itemsTotal)}
  ${hk.length>1?`<section class="card"><h3>سفارش‌ها در ساعت‌های روز</h3><div class="bars" role="img" aria-label="سفارش بر حسب ساعت">${hk.map(h=>`<div class="bar"><span>${fmtN(hours[h])}</span><i style="height:${Math.round(hours[h]/hmax*80)}px"></i><span>${fmtN(h)}</span></div>`).join('')}</div></section>`:''}
  <section class="card"><h3>سالن، بیرون‌بر، دلیوری</h3>${sumTbl(byKind,'نوع','سفارش')}</section>
  <section class="card"><h3>روش پرداخت</h3>${sumTbl(byPay,'روش','سفارش')}</section>
  <section class="card"><div class="row"><h3>پرفروش‌های منو</h3><span class="small muted">${pLabel()}</span></div>${sumTbl(byItem,'آیتم')}</section>`;
}
function scrPos(){
  const cats=[...new Set(state.menu.map(m=>m.cat||'سایر'))];
  const cat=cats.includes(ui.mcat)?ui.mcat:cats[0];
  const items=state.menu.filter(m=>(m.cat||'سایر')===cat);
  const cb=cartBox(state.menu,'از منو آیتم‌ها را لمس کن تا به سفارش اضافه شوند.');
  const open=state.forders.filter(o=>o.date===TODAY&&o.status!=='لغو'&&(o.status!=='تحویل‌شده'||!o.paid)).sort((a,b)=>(b.time||'').localeCompare(a.time||''));
  const done=state.forders.filter(o=>o.date===TODAY&&o.status==='تحویل‌شده'&&o.paid);
  return `
  <div class="chips">${cats.map(c=>`<button class="chip" data-mcat="${esc(c)}" aria-pressed="${c===cat}">${esc(c)}</button>`).join('')}</div>
  <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(100px,1fr));gap:8px">${items.map(m=>`<button type="button" class="card" data-addm="${m.id}" ${m.available===false?'disabled':''} style="padding:10px;text-align:start;cursor:pointer;opacity:${m.available===false?.45:1}"><span class="t" style="display:block">${esc(m.name)}</span><span class="small muted">${m.available===false?'ناموجود':fmtN(m.price)}</span>${ui.cart[m.id]?`<span class="pill p-info">${fmtN(ui.cart[m.id])}</span>`:''}</button>`).join('')||empty('منو خالی است.')}</div>
  <section class="card"><h3>سفارش جدید</h3>${cb.html}
    ${cb.rows.length?`<form class="f" data-form="forder">
      <label>نوع<select id="fo-kind" name="kind">${opts(FOOD_KIND,'سالن')}</select></label>
      <label>میز یا آدرس<input id="fo-table" name="table" placeholder="مثلاً میز ۴"></label>
      <label>پرداخت<select id="fo-pay" name="pay">${opts([['','بعداً'],...PAY_M.map(x=>[x,x])],'')}</select></label>
      <label>توضیح<input id="fo-note" name="note" placeholder="مثلاً بدون شکر"></label>
      <button class="btn full">ثبت و ارسال به ${ws.type==='cafe'?'بار':'آشپزخانه'}</button>
      <button type="button" class="lnk full" data-cartclear="1">خالی کردن</button></form>`:''}</section>
  <section class="card"><div class="row"><h3>سفارش‌های باز امروز</h3><span class="small muted">${fmtN(done.length)} سفارش بسته شد</span></div>
    ${open.length?`<ul class="list">${open.map(o=>`<li><div class="grow"><div class="t">${esc(o.kind)}${o.table?' · '+esc(o.table):''} <span class="small muted">${esc(o.time||'')}</span></div><div class="m">${esc(itemsTxt(o))}${o.note?' · '+esc(o.note):''}</div>
      <div class="row" style="justify-content:flex-start;gap:6px;margin-top:4px">${o.status==='آماده'?`<button class="btn" style="padding:4px 10px;font-size:.8rem" data-fstatus="${o.id}|تحویل‌شده">تحویل شد</button>`:''}
      <select class="inline" data-set="forders/${o.id}" data-field="pay" aria-label="روش پرداخت">${opts([['','پرداخت‌نشده'],...PAY_M.map(x=>[x,x])],o.paid?o.pay:'')}</select></div></div>
      <div style="display:grid;justify-items:end;gap:4px"><span class="num">${fmtN(itemsTotal(o))}</span>${fPill(o)}${o.paid?'<span class="pill p-ok">پرداخت شد</span>':''}${delBtn('forders',o.id,'لغو')}</div></li>`).join('')}</ul>`:empty('سفارش بازی نیست.')}</section>`;
}
function scrKitchen(){
  const q=state.forders.filter(o=>o.date===TODAY&&(o.status==='ثبت‌شده'||o.status==='در حال آماده‌سازی')).sort((a,b)=>(a.time||'').localeCompare(b.time||''));
  const ready=state.forders.filter(o=>o.date===TODAY&&o.status==='آماده');
  const li=o=>`<li><div class="grow"><div class="t">${esc(o.kind)}${o.table?' · '+esc(o.table):''} <span class="small muted">${esc(o.time||'')}</span></div>
    <div style="font-size:1rem;margin-top:2px">${(o.items||[]).map(i=>`<div><b class="num">${fmtN(i.qty)}×</b> ${esc(i.name)}</div>`).join('')}</div>${o.note?`<div class="m" style="color:var(--warn)">${esc(o.note)}</div>`:''}</div>
    ${o.status==='ثبت‌شده'?`<button class="btn" style="padding:6px 10px;font-size:.8rem" data-fstatus="${o.id}|در حال آماده‌سازی">شروع</button>`:o.status==='در حال آماده‌سازی'?`<button class="btn" style="padding:6px 10px;font-size:.8rem" data-fstatus="${o.id}|آماده">آماده شد</button>`:fPill(o)}</li>`;
  return `
  <div class="kpis"><div class="kpi ${q.length?'alert':''}"><span class="lab">در صف</span><span class="val">${fmtN(q.length)}</span><span class="hint">سفارش</span></div><div class="kpi"><span class="lab">آماده، منتظر تحویل</span><span class="val">${fmtN(ready.length)}</span></div></div>
  <section class="card"><h3>صف ${ws.type==='cafe'?'بار':'آشپزخانه'}</h3>${q.length?`<ul class="list">${q.map(li).join('')}</ul>`:empty('سفارشی در صف نیست.')}</section>
  ${ready.length?`<section class="card"><h3>آماده</h3><ul class="list">${ready.map(li).join('')}</ul></section>`:''}`;
}
function invSection(col,title,withPrice){
  const list=[...state[col]].sort((a,b)=>((+a.stock||0)-(+a.min||0))-((+b.stock||0)-(+b.min||0)));
  const low=list.filter(x=>(+x.stock||0)<=(+x.min||0));
  return `${low.length?`<section class="card" style="border-color:var(--bad)"><div class="row"><h3>نیاز به خرید</h3><span class="pill p-bad">${fmtN(low.length)}</span></div><p class="small muted" style="margin:0">${low.map(x=>esc(x.name)+' ('+fmtN(x.stock)+' '+esc(x.unit||'عدد')+')').join('، ')}</p></section>`:''}
  <section class="card"><div class="row"><h3>${title}</h3><span class="small muted">${fmtN(list.length)} قلم</span></div>
    ${list.length?`<ul class="list">${list.map(x=>`<li class="${(+x.stock||0)<=(+x.min||0)?'late':''}"><div class="grow"><div class="t">${esc(x.name)}</div><div class="m">${withPrice?fmtN(x.price)+' تومان · ':''}حداقل ${fmtN(x.min)} ${esc(x.unit||'عدد')}</div></div>
      <label class="small muted" style="display:grid;gap:2px">موجودی<input class="inline" style="width:64px" type="number" min="0" step="any" value="${+x.stock||0}" data-set="${col}/${x.id}" data-field="stock"></label>${delBtn(col,x.id)}</li>`).join('')}</ul>`:empty('هنوز چیزی ثبت نشده است.')}
    <details class="add"><summary>افزودن قلم</summary><form class="f" data-form="inv"><input type="hidden" name="col" value="${col}">
      <label class="full">نام<input id="iv-name" name="name" required></label>
      <label>موجودی<input id="iv-stock" name="stock" type="number" min="0" step="any" value="0"></label>
      <label>حداقل<input id="iv-min" name="min" type="number" min="0" step="any" value="1"></label>
      <label>واحد<input id="iv-unit" name="unit" placeholder="کیلو، بسته، عدد"></label>
      ${withPrice?'<label>قیمت (تومان)<input id="iv-price" name="price" type="number" min="0" step="1000"></label>':''}
      <button class="btn full">افزودن</button></form></details></section>`;
}
function scrMenu(){
  const cats=[...new Set(state.menu.map(m=>m.cat||'سایر'))];
  const canEdit=['owner','manager'].includes(me.role);
  return `
  ${cats.map(c=>`<section class="card"><h3>${esc(c)}</h3><ul class="list">${state.menu.filter(m=>(m.cat||'سایر')===c).map(m=>`<li class="${m.available===false?'done':''}"><input type="checkbox" class="chk" data-avail="${m.id}" ${m.available===false?'':'checked'} aria-label="موجود است"><span class="grow t">${esc(m.name)}</span>${canEdit?`<input class="inline" style="width:90px" type="number" min="0" step="1000" value="${+m.price||0}" data-set="menu/${m.id}" data-field="price" aria-label="قیمت">${delBtn('menu',m.id)}`:`<span class="num">${fmtN(m.price)}</span>`}</li>`).join('')}</ul></section>`).join('')||empty('منو خالی است.')}
  <p class="small muted" style="margin:0">تیک را بردار تا آیتم در صفحه سفارش «ناموجود» شود.</p>
  ${canEdit?`<details class="add"><summary>افزودن به منو</summary><form class="f" data-form="menuitem">
    <label class="full">نام<input id="mn-name" name="name" required></label>
    <label>قیمت<input id="mn-price" name="price" type="number" min="0" step="1000" required></label>
    <label>دسته<input id="mn-cat" name="cat" list="menuCats" placeholder="مثلاً نوشیدنی گرم"><datalist id="menuCats">${cats.map(c=>`<option value="${esc(c)}">`).join('')}</datalist></label>
    <button class="btn full">افزودن</button></form></details>`:''}
  ${invSection('inventory','مواد اولیه و انبار',false)}`;
}

// ---------- repair shop ----------
const JOB_ST=['پذیرش‌شده','در حال بررسی','منتظر تأیید مشتری','منتظر قطعه','در حال تعمیر','آماده تحویل','تحویل‌شده','لغو'];
const jobOpen=j=>!['تحویل‌شده','لغو'].includes(j.status);
const jobLate=j=>jobOpen(j)&&j.status!=='آماده تحویل'&&j.due&&j.due<TODAY;
const jPill=j=>{const m={'پذیرش‌شده':'p-mute','در حال بررسی':'p-info','منتظر تأیید مشتری':'p-warn','منتظر قطعه':'p-warn','در حال تعمیر':'p-info','آماده تحویل':'p-ok','تحویل‌شده':'p-mute','لغو':'p-bad'};return `<span class="pill ${m[j.status]||'p-mute'}">${esc(j.status)}</span>`};
const jAmt=j=>+j.price||+j.estimate||0;
function scrRDash(){
  const [f,t]=range();
  const del=state.jobs.filter(j=>j.status==='تحویل‌شده'&&(j.deliveredOn||j.date)>=f&&(j.deliveredOn||j.date)<=t);
  const income=del.reduce((a,j)=>a+jAmt(j),0), parts=del.reduce((a,j)=>a+(+j.partsCost||0),0);
  const open=state.jobs.filter(jobOpen), late=open.filter(jobLate), ready=open.filter(j=>j.status==='آماده تحویل');
  const unpaid=state.jobs.filter(j=>j.status==='تحویل‌شده'&&!j.paid);
  const byTech=groupSum(del,j=>pname(j.tech),jAmt);
  const lowParts=state.parts.filter(x=>(+x.stock||0)<=(+x.min||0)).length;
  const cnt={};open.forEach(j=>cnt[j.status]=(cnt[j.status]||0)+1);
  return `
  ${late.length||unpaid.length||lowParts?`<div class="kpis">${late.length?alertKpi('jobs','عقب از موعد',fmtN(late.length),'کار باز',' data-jst="عقب‌افتاده"'):''}${unpaid.length?alertKpi('jobs','تحویل‌شده بدون تسویه',fmtN(unpaid.length),fmtT(unpaid.reduce((a,j)=>a+jAmt(j)-(+j.deposit||0),0))+' تومان طلب',' data-jst="تسویه‌نشده"'):''}${lowParts?alertKpi('parts','قطعه رو به اتمام',fmtN(lowParts),'قلم'):''}</div>`:''}
  <section class="card"><div class="row"><h3>کارهای باز</h3><span class="small muted">${fmtN(open.length)} دستگاه در تعمیرگاه</span></div>
    <div class="chips" style="flex-wrap:wrap">${JOB_ST.filter(s=>cnt[s]).map(s=>`<button class="chip" data-go="jobs" data-jst="${s}">${esc(s)} ${fmtN(cnt[s])}</button>`).join('')||'<span class="small muted">کار بازی نیست.</span>'}</div>
    ${ready.length?`<p class="small muted" style="margin:0">${fmtN(ready.length)} دستگاه آماده تحویل است؛ به مشتری خبر بده.</p>`:''}</section>
  ${periodSeg()}
  <div class="kpis">
    <div class="kpi wide"><span class="lab">درآمد ${pLabel()}</span><span class="val">${fmtT(income)} <span class="small muted" style="font-weight:400">تومان</span></span><span class="hint">${fmtN(del.length)} کار تحویل‌شده</span></div>
    <div class="kpi"><span class="lab">هزینه قطعات</span><span class="val">${fmtT(parts)}</span><span class="hint">تومان</span></div>
    <div class="kpi"><span class="lab">دستمزد خالص</span><span class="val">${fmtT(income-parts)}</span><span class="hint">تومان</span></div>
  </div>
  ${trendCard(state.jobs.filter(j=>j.status==='تحویل‌شده').map(j=>({...j,date:j.deliveredOn||j.date})),jAmt,'روند درآمد')}
  <section class="card"><h3>به تفکیک تعمیرکار</h3>${sumTbl(byTech,'تعمیرکار','کار')}</section>`;
}
function jobLi(j,mode){
  const techs=state.people.filter(p=>p.role==='tech'||p.role==='owner');
  return `<li class="${jobLate(j)?'late':''}"><div class="grow"><div class="t">${esc(j.device)} <span class="small muted">#${esc(j.code||'')}</span></div>
    <div class="m">${esc(j.customer)}${j.phone?` · <a href="tel:${esc(j.phone)}" style="color:inherit">${esc(j.phone)}</a>`:''} · پذیرش ${jd(j.date)}${j.due?' · موعد '+rel(j.due):''}</div>
    <div class="m">${esc(j.problem||'')}</div>
    <div class="row" style="justify-content:flex-start;gap:6px;margin-top:4px">
      <select class="inline" data-set="jobs/${j.id}" data-field="status" aria-label="وضعیت">${opts(JOB_ST,j.status)}</select>
      ${mode==='desk'?`<select class="inline" data-set="jobs/${j.id}" data-field="tech" aria-label="تعمیرکار">${opts(techs.map(p=>[p.id,p.name]),j.tech)}</select>`:''}
      <label class="small muted" style="display:flex;gap:3px;align-items:center">مبلغ<input class="inline" style="width:86px" type="number" min="0" step="10000" value="${+j.price||0}" data-set="jobs/${j.id}" data-field="price"></label>
      <label class="small muted" style="display:flex;gap:3px;align-items:center">قطعه<input class="inline" style="width:80px" type="number" min="0" step="10000" value="${+j.partsCost||0}" data-set="jobs/${j.id}" data-field="partsCost"></label>
      ${mode==='desk'?`<label class="small muted" style="display:flex;align-items:center;gap:4px"><input type="checkbox" class="chk" style="width:18px;height:18px;margin:0" data-paid="jobs/${j.id}" ${j.paid?'checked':''}>تسویه شد</label>`:''}
    </div>
    ${mode==='tech'?`<input class="inline" style="width:100%;margin-top:4px" placeholder="یادداشت تعمیر (مثلاً قطعه تعویض‌شده)" value="${esc(j.note||'')}" data-set="jobs/${j.id}" data-field="note">`:j.note?`<div class="m">یادداشت: ${esc(j.note)}</div>`:''}</div>
    <div style="display:grid;justify-items:end;gap:4px">${jPill(j)}${j.estimate&&!j.price?`<span class="small muted">برآورد ${fmtT(j.estimate)}</span>`:''}${+j.deposit?`<span class="small muted">بیعانه ${fmtT(j.deposit)}</span>`:''}${mode==='desk'?delBtn('jobs',j.id):''}</div></li>`;
}
function scrJobs(){
  const st=ui.jst||'باز', q=(ui.q||'').trim();
  let list=[...state.jobs];
  if(st==='باز')list=list.filter(jobOpen);else if(st==='عقب‌افتاده')list=list.filter(jobLate);else if(st==='تسویه‌نشده')list=list.filter(j=>j.status==='تحویل‌شده'&&!j.paid);else if(st!=='همه')list=list.filter(j=>j.status===st);
  if(q)list=list.filter(j=>[j.customer,j.phone,j.device,j.code].some(x=>String(x||'').includes(q)));
  list.sort((a,b)=>(b.date||'').localeCompare(a.date||'')||(b.createdAt||0)-(a.createdAt||0));
  const techs=state.people.filter(p=>p.role==='tech'||p.role==='owner');
  return `
  <details class="add"><summary>پذیرش دستگاه جدید</summary><form class="f" data-form="job">
    <label>نام مشتری<input id="jb-name" name="customer" required></label>
    <label>موبایل<input id="jb-phone" name="phone" inputmode="tel"></label>
    <label class="full">${esc(TEMPLATES[ws.type].deviceLabel||'دستگاه')}<input id="jb-dev" name="device" required placeholder="${esc(TEMPLATES[ws.type].devicePh||'')}"></label>
    <label class="full">ایراد اعلام‌شده<input id="jb-prob" name="problem"></label>
    <label>تعمیرکار<select id="jb-tech" name="tech">${opts(techs.map(p=>[p.id,p.name]),techs.find(p=>p.role==='tech')?.id)}</select></label>
    <label>موعد تحویل<input id="jb-due" name="due" type="date" value="${addDays(TODAY,3)}"></label>
    <label>برآورد هزینه<input id="jb-est" name="estimate" type="number" min="0" step="10000"></label>
    <label>بیعانه<input id="jb-dep" name="deposit" type="number" min="0" step="10000"></label>
    <button class="btn full">ثبت پذیرش</button></form></details>
  <div class="chips">${['باز','عقب‌افتاده','آماده تحویل','منتظر قطعه','تسویه‌نشده','تحویل‌شده','همه'].map(k=>`<button class="chip" data-jst="${k}" aria-pressed="${st===k}">${k}</button>`).join('')}</div>
  ${searchBox('جستجوی مشتری، موبایل، دستگاه یا شماره قبض')}
  <section class="card"><div class="row"><h3>کارها</h3><span class="small muted">${fmtN(list.length)} مورد</span></div>${list.length?`<ul class="list">${list.slice(0,50).map(j=>jobLi(j,'desk')).join('')}</ul>`:empty('موردی با این فیلتر نیست.')}</section>`;
}
function scrMyJobs(){
  const mine=state.jobs.filter(j=>j.tech===me.id&&jobOpen(j)).sort((a,b)=>jobLate(b)-jobLate(a)||(a.due||'9').localeCompare(b.due||'9'));
  const ms=monthStart(TODAY), doneM=state.jobs.filter(j=>j.tech===me.id&&j.status==='تحویل‌شده'&&(j.deliveredOn||j.date)>=ms);
  return `
  <div class="kpis"><div class="kpi ${mine.some(jobLate)?'alert':''}"><span class="lab">کارهای باز من</span><span class="val">${fmtN(mine.length)}</span><span class="hint">${fmtN(mine.filter(jobLate).length)} عقب از موعد</span></div><div class="kpi"><span class="lab">تحویل‌شده این ماه</span><span class="val">${fmtN(doneM.length)}</span><span class="hint">${fmtT(doneM.reduce((a,j)=>a+jAmt(j)-(+j.partsCost||0),0))} دستمزد</span></div></div>
  <section class="card"><h3>روی میز من</h3>${mine.length?`<ul class="list">${mine.map(j=>jobLi(j,'tech')).join('')}</ul>`:empty('کار بازی برایت ثبت نشده است.')}</section>`;
}
function scrParts(){return invSection('parts','قطعات و لوازم',true)}

// ---------- local store (retail) ----------
const RPAY=['نقد','کارت','کارت‌به‌کارت','نسیه'];
function ledgerBalances(){const o={};state.ledger.forEach(l=>{const k=l.name;const c=o[k]||(o[k]={name:k,phone:'',bal:0,last:''});c.bal+=+l.amount||0;if(l.phone)c.phone=l.phone;if((l.date||'')>c.last)c.last=l.date});return Object.values(o)}
function scrRHome(){
  const [f,t]=range();
  const rows=state.rsales.filter(s=>s.date>=f&&s.date<=t), total=rows.reduce((a,s)=>a+(+s.amount||0),0);
  const cost=rows.reduce((a,s)=>a+(s.items||[]).reduce((x,i)=>x+(+i.qty||0)*(+i.cost||0),0),0);
  const hasCost=rows.some(s=>(s.items||[]).some(i=>+i.cost));
  const byM=groupSum(rows,s=>s.method,s=>+s.amount||0);
  const byP={};rows.forEach(s=>(s.items||[]).forEach(i=>{(byP[i.name]=byP[i.name]||{n:0,a:0}).n+=+i.qty||0;byP[i.name].a+=(+i.qty||0)*(+i.price||0)}));
  const credit=ledgerBalances().filter(c=>c.bal>0).reduce((a,c)=>a+c.bal,0);
  const soon=state.checks.filter(c=>!c.paid&&c.kind!=='دریافتنی'&&c.due<=addDays(TODAY,7));
  const low=lowStock().length;
  return `
  <button class="btn" data-go="rsell" style="width:100%">ثبت فروش</button>
  ${soon.length||low?`<div class="kpis">${soon.length?alertKpi('checks','چک و بدهی تا ۷ روز',fmtN(soon.length),fmtT(soon.reduce((a,c)=>a+(+c.amount||0),0))+' تومان'):''}${low?alertKpi('stock','کالای رو به اتمام',fmtN(low),'نیاز به سفارش'):''}</div>`:''}
  ${periodSeg()}
  <div class="kpis">
    <div class="kpi wide"><span class="lab">فروش ${pLabel()}</span><span class="val">${fmtT(total)} <span class="small muted" style="font-weight:400">تومان</span></span><span class="hint">${fmtN(rows.length)} فاکتور</span></div>
    ${hasCost?`<div class="kpi"><span class="lab">سود ناخالص</span><span class="val">${fmtT(total-cost)}</span><span class="hint">فروش منهای قیمت خرید</span></div>`:''}
    <button class="kpi" data-go="nasieh" style="text-align:start;cursor:pointer"><span class="lab">طلب نسیه</span><span class="val">${fmtT(credit)}</span><span class="hint">از همه مشتری‌ها</span></button>
  </div>
  ${trendCard(state.rsales,s=>+s.amount||0)}
  <section class="card"><h3>نقد، کارت و نسیه</h3>${sumTbl(byM,'روش','فاکتور')}</section>
  ${Object.keys(byP).length?`<section class="card"><div class="row"><h3>پرفروش‌ها</h3><span class="small muted">${pLabel()}</span></div>${sumTbl(byP,'کالا')}</section>`:''}`;
}
function scrRSell(){
  const q=(ui.q||'').trim();
  const ps=state.products.filter(p=>!q||p.name.includes(q)).slice(0,24);
  const cb=cartBox(state.products,'کالاها را لمس کن، یا فقط مبلغ را بنویس.');
  const today=state.rsales.filter(s=>s.date===TODAY).sort((a,b)=>(b.time||'').localeCompare(a.time||''));
  const byM=groupSum(today,s=>s.method,s=>+s.amount||0);
  return `
  ${searchBox('جستجوی کالا')}
  <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(100px,1fr));gap:8px">${ps.map(p=>`<button type="button" class="card" data-addm="${p.id}" style="padding:10px;text-align:start;cursor:pointer"><span class="t" style="display:block">${esc(p.name)}</span><span class="small muted">${fmtN(p.price)}${(+p.stock||0)<=(+p.min||0)?' · کم':''}</span>${ui.cart[p.id]?`<span class="pill p-info">${fmtN(ui.cart[p.id])}</span>`:''}</button>`).join('')}</div>
  <section class="card"><h3>فاکتور</h3>${cb.html}
    <form class="f" data-form="rsale">
      ${cb.rows.length?'':'<label class="full">مبلغ (تومان)<input id="rs-amt" name="amount" type="number" min="0" step="1000" required></label>'}
      <label>روش پرداخت<select id="rs-m" name="method">${opts(RPAY,'کارت')}</select></label>
      <label>مشتری (برای نسیه)<input id="rs-c" name="customer" list="ledgerNames"><datalist id="ledgerNames">${ledgerBalances().map(c=>`<option value="${esc(c.name)}">`).join('')}</datalist></label>
      <button class="btn full">ثبت فروش</button>
      ${cb.rows.length?'<button type="button" class="lnk full" data-cartclear="1">خالی کردن</button>':''}</form></section>
  <section class="card"><div class="row"><h3>فروش امروز</h3><span class="num t">${fmtN(today.reduce((a,s)=>a+(+s.amount||0),0))}</span></div>
    ${today.length?`<p class="small muted" style="margin:0">${Object.entries(byM).map(([k,v])=>esc(k)+': '+fmtN(v.a)).join(' · ')}</p><ul class="list">${today.slice(0,30).map(s=>`<li><div class="grow"><div class="t num">${fmtN(s.amount)}</div><div class="m">${esc(s.time||'')} · ${esc(s.method)}${s.customer?' · '+esc(s.customer):''}${s.items&&s.items.length?' · '+esc(itemsTxt(s)):''}</div></div>${delBtn('rsales',s.id)}</li>`).join('')}</ul>`:empty('امروز هنوز فروشی ثبت نشده است.')}</section>`;
}
function scrNasieh(){
  const q=(ui.q||'').trim();
  let list=ledgerBalances().filter(c=>Math.abs(c.bal)>0).sort((a,b)=>b.bal-a.bal);
  const total=list.filter(c=>c.bal>0).reduce((a,c)=>a+c.bal,0);
  if(q)list=list.filter(c=>c.name.includes(q)||String(c.phone).includes(q));
  return `
  <div class="kpis"><div class="kpi wide"><span class="lab">جمع طلب نسیه</span><span class="val">${fmtT(total)} <span class="small muted" style="font-weight:400">تومان</span></span><span class="hint">${fmtN(list.filter(c=>c.bal>0).length)} مشتری بدهکار</span></div></div>
  <details class="add"><summary>ثبت نسیه یا دریافت</summary><form class="f" data-form="ledger">
    <label>نام مشتری<input id="lg-name" name="name" required list="ledgerNames2"><datalist id="ledgerNames2">${ledgerBalances().map(c=>`<option value="${esc(c.name)}">`).join('')}</datalist></label>
    <label>موبایل<input id="lg-phone" name="phone" inputmode="tel"></label>
    <label>نوع<select id="lg-type" name="type">${opts([['debt','خرید نسیه'],['pay','دریافت پول']],'debt')}</select></label>
    <label>مبلغ<input id="lg-amt" name="amount" type="number" min="0" step="1000" required></label>
    <label class="full">توضیح<input id="lg-note" name="note"></label>
    <button class="btn full">ثبت</button></form></details>
  ${searchBox('جستجوی نام یا موبایل')}
  <section class="card"><h3>دفتر نسیه</h3>${list.length?`<ul class="list">${list.map(c=>`<li><div class="grow"><div class="t">${esc(c.name)}</div><div class="m">${c.phone?`<a href="tel:${esc(c.phone)}" style="color:inherit">${esc(c.phone)}</a> · `:''}آخرین ثبت ${rel(c.last)}</div></div><span class="num ${c.bal>0?'':'muted'}">${fmtN(Math.abs(c.bal))}${c.bal<0?' بستانکار':''}</span>${c.bal>0?`<button class="lnk" data-settle="${esc(c.name)}">تسویه</button>`:''}</li>`).join('')}</ul>`:empty('دفتر نسیه خالی است.')}</section>`;
}
function scrChecks(){
  const list=[...state.checks].sort((a,b)=>a.paid-b.paid||(a.due||'').localeCompare(b.due||''));
  const pay=state.checks.filter(c=>!c.paid&&c.kind!=='دریافتنی'), rec=state.checks.filter(c=>!c.paid&&c.kind==='دریافتنی');
  const s=a=>a.reduce((x,c)=>x+(+c.amount||0),0);
  return `
  <div class="kpis"><div class="kpi ${pay.some(c=>c.due<=addDays(TODAY,7))?'alert':''}"><span class="lab">پرداختنی</span><span class="val">${fmtT(s(pay))}</span><span class="hint">${fmtN(pay.length)} چک و بدهی</span></div><div class="kpi"><span class="lab">دریافتنی</span><span class="val">${fmtT(s(rec))}</span><span class="hint">${fmtN(rec.length)} مورد</span></div></div>
  <details class="add"><summary>ثبت چک یا بدهی</summary><form class="f" data-form="check">
    <label>طرف حساب<input id="ck-party" name="party" required placeholder="مثلاً پخش البرز"></label>
    <label>مبلغ<input id="ck-amt" name="amount" type="number" min="0" step="10000" required></label>
    <label>سررسید<input id="ck-due" name="due" type="date" value="${addDays(TODAY,30)}"></label>
    <label>نوع<select id="ck-kind" name="kind">${opts(['پرداختنی','دریافتنی'],'پرداختنی')}</select></label>
    <label class="full">توضیح<input id="ck-note" name="note" placeholder="مثلاً چک شماره ۱۲۳"></label>
    <button class="btn full">ثبت</button></form></details>
  <section class="card"><h3>به ترتیب سررسید</h3>${list.length?`<ul class="list">${list.map(c=>`<li class="${c.paid?'done':''} ${!c.paid&&c.due<TODAY?'late':''}"><input type="checkbox" class="chk" ${c.paid?'checked':''} data-paid="checks/${c.id}" aria-label="پاس شد"><div class="grow"><div class="t">${esc(c.party)}</div><div class="m">${jd(c.due)} · ${rel(c.due)}${c.note?' · '+esc(c.note):''}</div></div><div style="display:grid;justify-items:end;gap:4px"><span class="num">${fmtN(c.amount)}</span><span class="pill ${c.kind==='دریافتنی'?'p-ok':'p-warn'}">${esc(c.kind||'پرداختنی')}</span>${delBtn('checks',c.id)}</div></li>`).join('')}</ul>`:empty('چک یا بدهی ثبت نشده است.')}</section>`;
}

// ---------- gold shop ----------
const KARATS=[['750','۱۸ عیار'],['900','۲۱ عیار'],['999','۲۴ عیار']];
const karatLbl=k=>(KARATS.find(x=>x[0]===String(k))||[0,String(k||'')])[1];
const fmtG=n=>(+n||0).toLocaleString('fa-IR',{maximumFractionDigits:3});
const toNum=s=>parseFloat(toEn(s).replace(/[٫\/]/g,'.').replace(/[^\d.]/g,''))||0;
const goldRate=()=>+ws.goldRate||0;
// Invoice price: gold value (by weight, karat and the 18k rate) + making charge + seller profit + VAT on charge and profit.
function goldCalc(o){
  const base=toNum(o.weight)*(+o.rate||0)*((+o.karat||750)/750);
  const wageAmt=base*(toNum(o.wage)/100), profitAmt=(base+wageAmt)*(toNum(o.profit)/100), taxAmt=(wageAmt+profitAmt)*(toNum(o.tax)/100);
  const r=x=>Math.round(x/1000)*1000;
  return {base:r(base),wageAmt:r(wageAmt),profitAmt:r(profitAmt),taxAmt:r(taxAmt),amount:r(base)+r(wageAmt)+r(profitAmt)+r(taxAmt)};
}
const gSold=()=>state.gsales.filter(s=>s.kind!=='خرید');
function scrGHome(){
  const [f,t]=range();
  const rows=gSold().filter(s=>s.date>=f&&s.date<=t), bought=state.gsales.filter(s=>s.kind==='خرید'&&s.date>=f&&s.date<=t);
  const total=rows.reduce((a,s)=>a+(+s.amount||0),0), grams=rows.reduce((a,s)=>a+(+s.weight||0),0);
  const margin=rows.reduce((a,s)=>a+(+s.wageAmt||0)+(+s.profitAmt||0),0);
  const credit=ledgerBalances().filter(c=>c.bal>0).reduce((a,c)=>a+c.bal,0);
  const soon=state.checks.filter(c=>!c.paid&&c.kind!=='دریافتنی'&&c.due<=addDays(TODAY,7));
  const byItem=groupSum(rows,s=>s.name||'بدون نام',s=>+s.amount||0);
  const canRate=['owner','gm'].includes(me.role);
  return `
  <button class="btn" data-go="gsell" style="width:100%">صدور فاکتور یا خرید طلای کهنه</button>
  <section class="card"><div class="row"><h3>نرخ هر گرم طلای ۱۸ عیار</h3><span class="small muted">${ws.goldRateDate?'به‌روز شده '+rel(ws.goldRateDate):''}</span></div>
    ${canRate?`<label class="small muted">تومان<input class="inline" style="width:100%;font-size:1.1rem;padding:8px" type="number" min="0" step="1000" value="${goldRate()}" data-wsrate="1" aria-label="نرخ طلا"></label>`:`<div class="val num">${fmtN(goldRate())} تومان</div>`}</section>
  ${soon.length?`<div class="kpis">${alertKpi('checks','چک و بدهی تا ۷ روز',fmtN(soon.length),fmtT(soon.reduce((a,c)=>a+(+c.amount||0),0))+' تومان')}</div>`:''}
  ${periodSeg()}
  <div class="kpis">
    <div class="kpi wide"><span class="lab">فروش ${pLabel()}</span><span class="val">${fmtT(total)} <span class="small muted" style="font-weight:400">تومان</span></span><span class="hint">${fmtN(rows.length)} فاکتور · ${fmtG(grams)} گرم</span></div>
    <div class="kpi"><span class="lab">اجرت و سود</span><span class="val">${fmtT(margin)}</span><span class="hint">درآمد مغازه از فروش</span></div>
    <div class="kpi"><span class="lab">خرید طلای کهنه</span><span class="val">${fmtG(bought.reduce((a,s)=>a+(+s.weight||0),0))} گرم</span><span class="hint">${fmtT(bought.reduce((a,s)=>a+(+s.amount||0),0))} تومان</span></div>
    <button class="kpi" data-go="nasieh" style="text-align:start;cursor:pointer"><span class="lab">طلب نسیه</span><span class="val">${fmtT(credit)}</span><span class="hint">از همه مشتری‌ها</span></button>
  </div>
  ${trendCard(gSold(),s=>+s.amount||0)}
  ${Object.keys(byItem).length?`<section class="card"><div class="row"><h3>فروش به تفکیک جنس</h3><span class="small muted">${pLabel()}</span></div>${sumTbl(byItem,'جنس','فاکتور')}</section>`:''}
  <div class="row" style="justify-content:flex-start;gap:8px"><button class="chip" data-go="checks">چک‌ها و بدهی‌ها</button></div>`;
}
function scrGSell(){
  const ps=state.products.filter(p=>(+p.stock||0)>0).sort((a,b)=>a.name.localeCompare(b.name,'fa'));
  const today=state.gsales.filter(s=>s.date===TODAY).sort((a,b)=>(b.time||'').localeCompare(a.time||''));
  return `
  <section class="card"><h3>فاکتور فروش</h3><form class="f" data-form="gsale">
    <label class="full">جنس از ویترین<select id="gs-p" name="pid"><option value="">وارد کردن دستی</option>${ps.map(p=>`<option value="${p.id}">${esc(p.name)} · ${fmtG(p.weight)} گرم</option>`).join('')}</select></label>
    <label class="full">نام جنس<input id="gs-name" name="name" placeholder="مثلاً انگشتر زنانه"></label>
    <label>وزن (گرم)<input id="gs-w" name="weight" inputmode="decimal" required></label>
    <label>عیار<select id="gs-k" name="karat">${opts(KARATS,'750')}</select></label>
    <label>نرخ هر گرم ۱۸ عیار<input id="gs-rate" name="rate" data-keep="1" type="number" min="0" step="1000" value="${goldRate()||''}" required></label>
    <label>اجرت ساخت ٪<input id="gs-wage" name="wage" data-keep="1" inputmode="decimal" value="15"></label>
    <label>سود فروشنده ٪<input id="gs-profit" name="profit" data-keep="1" inputmode="decimal" value="7"></label>
    <label>مالیات بر ارزش افزوده ٪<input id="gs-tax" name="tax" data-keep="1" inputmode="decimal" value="10"></label>
    <label>روش پرداخت<select id="gs-m" name="method">${opts(RPAY,'کارت')}</select></label>
    <label>مشتری<input id="gs-c" name="customer" list="ledgerNames"><datalist id="ledgerNames">${ledgerBalances().map(c=>`<option value="${esc(c.name)}">`).join('')}</datalist></label>
    <div class="full card" id="gs-sum" style="background:var(--bg)">${goldSumHtml()}</div>
    <button class="btn full">ثبت فاکتور</button></form></section>
  <details class="add"><summary>خرید طلای کهنه از مشتری</summary><form class="f" data-form="gbuy">
    <label>وزن (گرم)<input id="gb-w" name="weight" inputmode="decimal" required></label>
    <label>عیار<select id="gb-k" name="karat">${opts(KARATS,'750')}</select></label>
    <label>نرخ هر گرم ۱۸ عیار<input id="gb-rate" name="rate" data-keep="1" type="number" min="0" step="1000" value="${goldRate()||''}" required></label>
    <label>فروشنده طلا<input id="gb-c" name="customer"></label>
    <label class="full">توضیح<input id="gb-note" name="note" placeholder="مثلاً النگو شکسته"></label>
    <button class="btn full">ثبت خرید</button></form></details>
  <section class="card"><div class="row"><h3>امروز</h3><span class="num t">${fmtN(today.filter(s=>s.kind!=='خرید').reduce((a,s)=>a+(+s.amount||0),0))}</span></div>
    ${today.length?`<ul class="list">${today.map(s=>`<li><div class="grow"><div class="t">${s.kind==='خرید'?'<span class="pill p-warn">خرید</span> ':''}${esc(s.name||'طلای کهنه')} · ${fmtG(s.weight)} گرم ${esc(karatLbl(s.karat))}</div><div class="m">${esc(s.time||'')}${s.method?' · '+esc(s.method):''}${s.customer?' · '+esc(s.customer):''}</div></div><span class="num">${fmtN(s.amount)}</span>${delBtn('gsales',s.id)}</li>`).join('')}</ul>`:empty('امروز هنوز فاکتوری ثبت نشده است.')}</section>`;
}
function goldSumHtml(v){
  v=v||{weight:0,karat:750,rate:goldRate(),wage:15,profit:7,tax:10};
  const c=goldCalc(v);
  const r=(k,x)=>`<div class="row"><span class="small muted">${k}</span><span class="num">${fmtN(x)}</span></div>`;
  return r('ارزش طلا',c.base)+r('اجرت ساخت',c.wageAmt)+r('سود فروشنده',c.profitAmt)+r('مالیات',c.taxAmt)+`<div class="row"><span class="t">مبلغ فاکتور</span><span class="num t">${fmtN(c.amount)} تومان</span></div>`;
}
function readGoldForm(){const g=id=>(document.getElementById(id)||{}).value||'';return {weight:g('gs-w'),karat:g('gs-k'),rate:g('gs-rate'),wage:g('gs-wage'),profit:g('gs-profit'),tax:g('gs-tax')}}
function scrGStock(){
  const ps=[...state.products].sort((a,b)=>a.name.localeCompare(b.name,'fa'));
  const pieces=ps.reduce((a,p)=>a+(+p.stock||0),0), grams=ps.reduce((a,p)=>a+(+p.stock||0)*(+p.weight||0),0);
  const value=ps.reduce((a,p)=>a+(+p.stock||0)*(+p.weight||0)*goldRate()*((+p.karat||750)/750),0);
  return `
  <div class="kpis"><div class="kpi"><span class="lab">اجناس ویترین</span><span class="val">${fmtN(pieces)}</span><span class="hint">عدد</span></div><div class="kpi"><span class="lab">وزن کل</span><span class="val">${fmtG(grams)}</span><span class="hint">گرم</span></div><div class="kpi wide"><span class="lab">ارزش طلای ویترین با نرخ امروز</span><span class="val">${fmtT(value)} <span class="small muted" style="font-weight:400">تومان</span></span><span class="hint">بدون اجرت</span></div></div>
  <details class="add"><summary>افزودن جنس</summary><form class="f" data-form="gitem">
    <label class="full">نام<input id="gi-name" name="name" required placeholder="مثلاً گردنبند ونیزی"></label>
    <label>وزن (گرم)<input id="gi-w" name="weight" inputmode="decimal" required></label>
    <label>عیار<select id="gi-k" name="karat">${opts(KARATS,'750')}</select></label>
    <label>اجرت ساخت ٪<input id="gi-wage" name="wage" inputmode="decimal" value="15"></label>
    <label>تعداد<input id="gi-stock" name="stock" type="number" min="0" value="1"></label>
    <button class="btn full">افزودن</button></form></details>
  <section class="card"><div class="row"><h3>ویترین و انبار</h3><span class="small muted">${fmtN(ps.length)} قلم</span></div>
    ${ps.length?`<ul class="list">${ps.map(p=>`<li class="${(+p.stock||0)?'':'done'}"><div class="grow"><div class="t">${esc(p.name)}</div><div class="m">${fmtG(p.weight)} گرم · ${esc(karatLbl(p.karat||750))} · اجرت ${fmtN(p.wage)}٪</div></div>
      <label class="small muted" style="display:grid;gap:2px">تعداد<input class="inline" style="width:56px" type="number" min="0" value="${+p.stock||0}" data-set="products/${p.id}" data-field="stock"></label>${delBtn('products',p.id)}</li>`).join('')}</ul>`:empty('هنوز جنسی ثبت نشده است.')}</section>`;
}

// ---------- real estate ----------
const RE_DEAL=['فروش','رهن و اجاره','پیش‌فروش'];
const RE_KIND=['آپارتمان','ویلایی','زمین','مغازه','اداری','باغ'];
const RE_ST=['فعال','در حال مذاکره','قرارداد شد','خارج شد'];
const CL_ST=['فعال','به نتیجه رسید','منصرف شد'];
const VIS_ST=['برنامه‌ریزی‌شده','انجام شد، پسندید','انجام شد، نپسندید','لغو'];
const isRent=x=>x.deal==='رهن و اجاره'||x.want==='رهن و اجاره';
const lTitle=l=>[l.kind,l.area?fmtN(l.area)+' متری':'',l.region].filter(Boolean).join(' · ');
const lPrice=l=>isRent(l)?'رهن '+fmtT(l.deposit)+(+l.rent?' · اجاره '+fmtT(l.rent):''):fmtT(l.price)+' تومان';
const reAgents=()=>state.people.filter(p=>p.role==='agent'||p.role==='owner');
const mineOnly=()=>me.role==='agent';
function matchListings(c){
  return state.listings.filter(l=>l.status==='فعال'&&(isRent(c)?isRent(l):!isRent(l))&&(!c.kind||l.kind===c.kind)&&(!c.region||!l.region||l.region.includes(c.region)||c.region.includes(l.region))
    &&(isRent(c)?(!+c.deposit||(+l.deposit||0)<=+c.deposit*1.1)&&(!+c.rent||(+l.rent||0)<=+c.rent*1.1):(!+c.budget||(+l.price||0)<=+c.budget*1.1)));
}
function matchClients(l){return state.clients.filter(c=>c.status==='فعال'&&matchListings(c).some(x=>x.id===l.id))}
function scrEDash(){
  const [f,t]=range();
  const deals=state.deals.filter(d=>d.date>=f&&d.date<=t);
  const comm=deals.reduce((a,d)=>a+(+d.commission||0),0);
  const unpaid=state.deals.filter(d=>!d.paid&&+d.commission);
  const active=state.listings.filter(l=>l.status==='فعال');
  const ending=state.deals.filter(d=>d.endDate&&d.endDate>=TODAY&&d.endDate<=addDays(TODAY,45));
  const visToday=state.visits.filter(v=>v.date===TODAY&&v.result!=='لغو');
  const byAgent=groupSum(deals,d=>pname(d.agent),d=>+d.commission||0);
  const byType=groupSum(active,l=>l.deal+' · '+l.kind,l=>isRent(l)?+l.deposit||0:+l.price||0);
  return `
  ${visToday.length||ending.length||unpaid.length?`<div class="kpis">${visToday.length?alertKpi('visits','بازدید امروز',fmtN(visToday.length),'از فایل‌ها'):''}${ending.length?alertKpi('edeals','قرارداد اجاره رو به پایان',fmtN(ending.length),'تا ۴۵ روز آینده'):''}${unpaid.length?alertKpi('edeals','کمیسیون دریافت‌نشده',fmtT(unpaid.reduce((a,d)=>a+(+d.commission||0),0)),fmtN(unpaid.length)+' قرارداد'):''}</div>`:''}
  ${periodSeg()}
  <div class="kpis">
    <div class="kpi wide"><span class="lab">کمیسیون ${pLabel()}</span><span class="val">${fmtT(comm)} <span class="small muted" style="font-weight:400">تومان</span></span><span class="hint">${fmtN(deals.length)} قرارداد</span></div>
    <button class="kpi" data-go="listings" style="text-align:start;cursor:pointer"><span class="lab">فایل فعال</span><span class="val">${fmtN(active.length)}</span><span class="hint">${fmtN(active.filter(l=>!isRent(l)).length)} فروش · ${fmtN(active.filter(isRent).length)} اجاره</span></button>
    <button class="kpi" data-go="buyers" style="text-align:start;cursor:pointer"><span class="lab">مشتری فعال</span><span class="val">${fmtN(state.clients.filter(c=>c.status==='فعال').length)}</span><span class="hint">دنبال ملک</span></button>
  </div>
  ${trendCard(state.deals,d=>+d.commission||0,'روند کمیسیون')}
  ${Object.keys(byAgent).length?`<section class="card"><div class="row"><h3>کمیسیون هر مشاور</h3><span class="small muted">${pLabel()}</span></div>${sumTbl(byAgent,'مشاور','قرارداد')}</section>`:''}
  <section class="card"><h3>فایل‌های فعال</h3>${sumTbl(byType,'نوع','فایل')}</section>
  <div class="row" style="justify-content:flex-start;gap:8px"><button class="chip" data-go="edeals">قراردادها</button><button class="chip" data-go="money">هزینه‌ها و حقوق</button></div>`;
}
function agentSel(id,name,v){return `<select id="${id}" name="${name}">${opts(reAgents().map(p=>[p.id,p.name]),v||(me.role==='agent'?me.id:''))}</select>`}
function scrListings(){
  const q=(ui.q||'').trim(), dl=ui.ldeal||'همه', st=ui.lst||'فعال';
  let list=state.listings.filter(l=>(dl==='همه'||l.deal===dl)&&(st==='همه'||l.status===st)&&(!ui.lmine||l.agent===me.id));
  if(q)list=list.filter(l=>[l.code,l.region,l.address,l.owner,l.ownerPhone,l.kind].some(x=>String(x||'').includes(q)));
  list.sort((a,b)=>(b.date||'').localeCompare(a.date||'')||(b.createdAt||0)-(a.createdAt||0));
  return `
  <details class="add"><summary>ثبت فایل جدید</summary><form class="f" data-form="listing">
    <label>نوع معامله<select id="ls-deal" name="deal">${opts(RE_DEAL,'فروش')}</select></label>
    <label>نوع ملک<select id="ls-kind" name="kind">${opts(RE_KIND,'آپارتمان')}</select></label>
    <label>محله<input id="ls-region" name="region" required placeholder="مثلاً سعادت‌آباد"></label>
    <label>متراژ<input id="ls-area" name="area" type="number" min="0"></label>
    <label>اتاق<input id="ls-rooms" name="rooms" type="number" min="0"></label>
    <label>قیمت کل (فروش)<input id="ls-price" name="price" type="number" min="0" step="1000000"></label>
    <label>رهن<input id="ls-dep" name="deposit" type="number" min="0" step="1000000"></label>
    <label>اجاره ماهانه<input id="ls-rent" name="rent" type="number" min="0" step="100000"></label>
    <label>نام مالک<input id="ls-owner" name="owner"></label>
    <label>موبایل مالک<input id="ls-ophone" name="ownerPhone" inputmode="tel"></label>
    <label>مشاور${agentSel('ls-agent','agent')}</label>
    <label class="full">آدرس و توضیح<input id="ls-note" name="note" placeholder="مثلاً طبقه ۳، پارکینگ و انباری"></label>
    <button class="btn full">ثبت فایل</button></form></details>
  <div class="chips">${['همه',...RE_DEAL].map(k=>`<button class="chip" data-ldeal="${k}" aria-pressed="${dl===k}">${k}</button>`).join('')}<button class="chip" data-lmine="1" aria-pressed="${!!ui.lmine}">فایل‌های من</button></div>
  <div class="chips">${['فعال','در حال مذاکره','قرارداد شد','همه'].map(k=>`<button class="chip" data-lst="${k}" aria-pressed="${st===k}">${k}</button>`).join('')}</div>
  ${searchBox('جستجوی کد، محله یا مالک')}
  <section class="card"><div class="row"><h3>فایل‌ها</h3><span class="small muted">${fmtN(list.length)} فایل</span></div>
    ${list.length?`<ul class="list">${list.slice(0,80).map(l=>{const m=l.status==='فعال'?matchClients(l).length:0;return `<li><div class="grow"><div class="t"><span class="small muted">${fmtN(l.code)}</span> ${esc(lTitle(l))}${m?` <span class="pill p-ok">${fmtN(m)} مشتری مناسب</span>`:''}</div>
      <div class="m">${esc(l.deal)} · ${lPrice(l)}${+l.rooms?' · '+fmtN(l.rooms)+' خواب':''}</div>
      <div class="m">${l.owner?esc(l.owner)+' ':''}${l.ownerPhone?`<a href="tel:${esc(l.ownerPhone)}" style="color:inherit">${esc(l.ownerPhone)}</a> · `:''}${esc(pname(l.agent))} · ${rel(l.date)}</div>${l.note?`<div class="m">${esc(l.note)}</div>`:''}</div>
      <div style="display:grid;gap:4px;justify-items:end"><select class="inline" data-set="listings/${l.id}" data-field="status" aria-label="وضعیت">${opts(RE_ST,l.status)}</select>${['owner','gm'].includes(me.role)||l.agent===me.id?delBtn('listings',l.id):''}</div></li>`}).join('')}</ul>`:empty('فایلی با این شرایط نیست.')}</section>`;
}
function scrBuyers(){
  const q=(ui.q||'').trim(), st=ui.cst||'فعال';
  let list=state.clients.filter(c=>(st==='همه'||c.status===st)&&(!mineOnly()||c.agent===me.id));
  if(q)list=list.filter(c=>[c.name,c.phone,c.region].some(x=>String(x||'').includes(q)));
  list.sort((a,b)=>(b.date||'').localeCompare(a.date||''));
  return `
  <details class="add"><summary>ثبت مشتری</summary><form class="f" data-form="buyer">
    <label>نام<input id="by-name" name="name" required></label>
    <label>موبایل<input id="by-phone" name="phone" inputmode="tel"></label>
    <label>دنبال<select id="by-want" name="want">${opts(['خرید','رهن و اجاره'],'خرید')}</select></label>
    <label>نوع ملک<select id="by-kind" name="kind"><option value="">فرقی نمی‌کند</option>${opts(RE_KIND)}</select></label>
    <label>محله<input id="by-region" name="region"></label>
    <label>بودجه خرید<input id="by-budget" name="budget" type="number" min="0" step="1000000"></label>
    <label>حداکثر رهن<input id="by-dep" name="deposit" type="number" min="0" step="1000000"></label>
    <label>حداکثر اجاره<input id="by-rent" name="rent" type="number" min="0" step="100000"></label>
    <label>مشاور${agentSel('by-agent','agent')}</label>
    <label class="full">توضیح<input id="by-note" name="note" placeholder="مثلاً آسانسور لازم دارد"></label>
    <button class="btn full">ثبت مشتری</button></form></details>
  <div class="chips">${['فعال','به نتیجه رسید','منصرف شد','همه'].map(k=>`<button class="chip" data-cst="${k}" aria-pressed="${st===k}">${k}</button>`).join('')}</div>
  ${searchBox('جستجوی نام، موبایل یا محله')}
  <section class="card"><div class="row"><h3>مشتریان</h3><span class="small muted">${fmtN(list.length)} نفر</span></div>
    ${list.length?`<ul class="list">${list.slice(0,80).map(c=>{const m=c.status==='فعال'?matchListings(c):[];return `<li><div class="grow"><div class="t">${esc(c.name)} <span class="small muted">${esc(c.want)}${c.kind?' · '+esc(c.kind):''}${c.region?' · '+esc(c.region):''}</span></div>
      <div class="m">${c.phone?`<a href="tel:${esc(c.phone)}" style="color:inherit">${esc(c.phone)}</a> · `:''}${isRent(c)?'رهن تا '+fmtT(c.deposit)+(+c.rent?' · اجاره تا '+fmtT(c.rent):''):'بودجه '+fmtT(c.budget)} · ${esc(pname(c.agent))}</div>
      ${c.note?`<div class="m">${esc(c.note)}</div>`:''}
      ${m.length?`<div class="m">فایل‌های مناسب: ${m.slice(0,4).map(l=>`<span class="pill p-info">${fmtN(l.code)} · ${esc(l.region||l.kind)}</span>`).join(' ')}</div>`:''}</div>
      <div style="display:grid;gap:4px;justify-items:end"><select class="inline" data-set="clients/${c.id}" data-field="status" aria-label="وضعیت">${opts(CL_ST,c.status)}</select>${delBtn('clients',c.id)}</div></li>`}).join('')}</ul>`:empty('مشتری‌ای با این شرایط نیست.')}</section>`;
}
function scrVisits(){
  const d=ui.day||TODAY;
  const mine=v=>!mineOnly()||v.agent===me.id;
  const list=state.visits.filter(v=>v.date===d&&mine(v)).sort((a,b)=>(a.time||'').localeCompare(b.time||''));
  const next=state.visits.filter(v=>v.date>TODAY&&mine(v)&&v.result==='برنامه‌ریزی‌شده').length;
  const ls=state.listings.filter(l=>l.status==='فعال'||l.status==='در حال مذاکره');
  return `
  <details class="add"><summary>ثبت بازدید</summary><form class="f" data-form="visit">
    <label class="full">فایل<select id="vi-l" name="listing" required>${ls.map(l=>`<option value="${l.id}">${fmtN(l.code)} · ${esc(lTitle(l))}</option>`).join('')}</select></label>
    <label>مشتری<input id="vi-c" name="client" required list="reClients"><datalist id="reClients">${state.clients.filter(c=>c.status==='فعال').map(c=>`<option value="${esc(c.name)}">`).join('')}</datalist></label>
    <label>مشاور${agentSel('vi-agent','agent')}</label>
    <label>تاریخ<input type="date" id="vi-date" name="date" value="${d}"></label>
    <label>ساعت<input type="time" id="vi-time" name="time" value="17:00"></label>
    <label class="full">توضیح<input id="vi-note" name="note"></label>
    <button class="btn full">ثبت بازدید</button></form></details>
  <div class="row" style="justify-content:center;gap:10px"><button class="chip" data-day="-1" aria-label="روز قبل">‹ قبل</button><span class="t">${jd(d,{weekday:'long',day:'numeric',month:'long'})}</span><button class="chip" data-day="1" aria-label="روز بعد">بعد ›</button></div>
  ${d!==TODAY?'<div style="text-align:center"><button class="lnk" data-day="0">برگشت به امروز</button></div>':''}
  <section class="card"><div class="row"><h3>بازدیدها</h3><span class="small muted">${next?fmtN(next)+' بازدید در روزهای بعد':''}</span></div>
    ${list.length?`<ul class="list">${list.map(v=>{const l=state.listings.find(x=>x.id===v.listing);const c=state.clients.find(x=>x.name===v.client);return `<li><span class="num t">${esc(v.time||'')}</span><div class="grow"><div class="t">${esc(v.client)}${c&&c.phone?` <a class="small" href="tel:${esc(c.phone)}">${esc(c.phone)}</a>`:''}</div><div class="m">${l?fmtN(l.code)+' · '+esc(lTitle(l)):esc(v.listingTitle||'')} · ${esc(pname(v.agent))}</div>${v.note?`<div class="m">${esc(v.note)}</div>`:''}</div>
      <div style="display:grid;gap:4px;justify-items:end"><select class="inline" data-set="visits/${v.id}" data-field="result" aria-label="نتیجه">${opts(VIS_ST,v.result)}</select>${delBtn('visits',v.id)}</div></li>`}).join('')}</ul>`:empty('بازدیدی برای این روز ثبت نشده است.')}</section>`;
}
function scrEDeals(){
  const list=state.deals.filter(d=>!mineOnly()||d.agent===me.id).sort((a,b)=>(b.date||'').localeCompare(a.date||''));
  const share=d=>Math.round((+d.commission||0)*(+d.agentShare||0)/100);
  const ms=monthStart(TODAY), month=list.filter(d=>d.date>=ms);
  const ending=list.filter(d=>d.endDate&&d.endDate>=TODAY&&d.endDate<=addDays(TODAY,45)).sort((a,b)=>a.endDate.localeCompare(b.endDate));
  const ls=state.listings.filter(l=>l.status!=='خارج شد'&&l.status!=='قرارداد شد');
  const agent=mineOnly();
  return `
  <div class="kpis">${agent?`<div class="kpi wide"><span class="lab">سهم من از کمیسیون ${JMONTHS[jp(TODAY).m-1]}</span><span class="val">${fmtT(month.reduce((a,d)=>a+share(d),0))} <span class="small muted" style="font-weight:400">تومان</span></span><span class="hint">${fmtN(month.length)} قرارداد</span></div>`
    :`<div class="kpi"><span class="lab">کمیسیون ${JMONTHS[jp(TODAY).m-1]}</span><span class="val">${fmtT(month.reduce((a,d)=>a+(+d.commission||0),0))}</span><span class="hint">${fmtN(month.length)} قرارداد</span></div><div class="kpi ${list.some(d=>!d.paid)?'alert':''}"><span class="lab">دریافت‌نشده</span><span class="val">${fmtT(list.filter(d=>!d.paid).reduce((a,d)=>a+(+d.commission||0),0))}</span><span class="hint">کمیسیون</span></div>`}</div>
  <details class="add"><summary>ثبت قرارداد</summary><form class="f" data-form="deal">
    <label class="full">فایل<select id="dl-l" name="listing" required>${ls.map(l=>`<option value="${l.id}">${fmtN(l.code)} · ${esc(l.deal)} · ${esc(lTitle(l))}</option>`).join('')}</select></label>
    <label>طرف قرارداد (خریدار یا مستأجر)<input id="dl-c" name="client" required list="reClients2"><datalist id="reClients2">${state.clients.filter(c=>c.status==='فعال').map(c=>`<option value="${esc(c.name)}">`).join('')}</datalist></label>
    <label>مبلغ معامله یا رهن<input id="dl-amt" name="amount" type="number" min="0" step="1000000"></label>
    <label>اجاره ماهانه<input id="dl-rent" name="rent" type="number" min="0" step="100000"></label>
    <label>کمیسیون کل (تومان)<input id="dl-com" name="commission" type="number" min="0" step="100000" required></label>
    <label>مشاور${agentSel('dl-agent','agent')}</label>
    <label>سهم مشاور ٪<input id="dl-share" name="agentShare" type="number" min="0" max="100" value="40"></label>
    <label>تاریخ قرارداد<input type="date" id="dl-date" name="date" value="${TODAY}"></label>
    <label>پایان قرارداد (اجاره)<input type="date" id="dl-end" name="endDate"></label>
    <button class="btn full">ثبت قرارداد</button></form></details>
  ${ending.length?`<section class="card" style="border-color:var(--warn)"><h3>اجاره‌های رو به پایان</h3><ul class="list">${ending.map(d=>`<li><div class="grow"><div class="t">${esc(d.client)}</div><div class="m">${esc(d.title)}</div></div><span class="small">${jd(d.endDate)} · ${rel(d.endDate)}</span></li>`).join('')}</ul><p class="small muted" style="margin:0">برای تمدید یا فایل جدید با مستأجر و مالک تماس بگیر.</p></section>`:''}
  <section class="card"><h3>قراردادها</h3>${list.length?`<ul class="list">${list.slice(0,60).map(d=>`<li class="${d.paid?'':'late'}">${agent?'':`<input type="checkbox" class="chk" ${d.paid?'checked':''} data-paid="deals/${d.id}" aria-label="کمیسیون دریافت شد">`}<div class="grow"><div class="t">${esc(d.client)} <span class="small muted">${esc(d.kind)}</span></div><div class="m">${esc(d.title)} · ${jd(d.date)}</div><div class="m">${d.kind==='رهن و اجاره'?'رهن '+fmtT(d.amount)+(+d.rent?' · اجاره '+fmtT(d.rent):''):fmtT(d.amount)+' تومان'} · ${esc(pname(d.agent))}</div></div>
    <div style="display:grid;gap:4px;justify-items:end"><span class="num">${fmtN(agent?share(d):d.commission)}</span><span class="pill ${d.paid?'p-ok':'p-warn'}">${d.paid?'کمیسیون دریافت شد':'دریافت‌نشده'}</span>${agent?'':delBtn('deals',d.id)}</div></li>`).join('')}</ul>`:empty('هنوز قراردادی ثبت نشده است.')}</section>`;
}


// ---------- dental clinic: treatment plans ----------
const PLAN_ST=['در حال درمان','تمام‌شده','لغو'];
const planPaid=p=>(p.payments||[]).reduce((a,x)=>a+(+x.amount||0),0);
const planTotal=p=>(p.items||[]).reduce((a,i)=>a+(+i.price||0),0)-(+p.discount||0);
const planDue=p=>p.status==='لغو'?0:Math.max(0,planTotal(p)-planPaid(p));
// "36 - root canal - 4500000" per line; the tooth number is optional.
function parsePlanItems(txt){return String(txt||'').split('\n').map(l=>l.trim()).filter(Boolean).map(l=>{const m=l.split(/\s+[-–]\s+|،|,/).map(x=>x.trim());
  const price=parseInt(toEn(m[m.length-1]||'').replace(/[^\d]/g,''),10)||0;const hasTooth=m.length>2||(m.length===2&&!price);
  const tooth=m.length>2?toEn(m[0]).replace(/[^\d]/g,''):'';const service=m.length>2?m.slice(1,-1).join(' - '):m[0];
  return {tooth,service,price,done:false}}).filter(x=>x.service)}
function scrPlans(){
  const f=ui.pst||'در حال درمان', ms=monthStart(TODAY);
  const mine=p=>me.role!=='staff'||p.dentist===me.id;
  const all=state.plans.filter(mine);
  let list=all.filter(p=>f==='همه'||(f==='بدهکار'?planDue(p)>0:p.status===f));
  const q=(ui.q||'').trim();if(q)list=list.filter(p=>[p.clientName,p.phone].some(x=>String(x||'').includes(q)));
  list.sort((a,b)=>(b.date||'').localeCompare(a.date||''));
  const due=all.reduce((a,p)=>a+planDue(p),0);
  const got=all.reduce((a,p)=>a+(p.payments||[]).filter(x=>x.date>=ms).reduce((s,x)=>s+(+x.amount||0),0),0);
  const docs=state.people.filter(p=>p.role==='staff');
  return `
  <div class="kpis">
    <div class="kpi"><span class="lab">در حال درمان</span><span class="val">${fmtN(all.filter(p=>p.status==='در حال درمان').length)}</span><span class="hint">طرح درمان</span></div>
    <div class="kpi ${due?'alert':''}"><span class="lab">مانده بیماران</span><span class="val">${fmtT(due)}</span><span class="hint">تومان</span></div>
    <div class="kpi wide"><span class="lab">دریافتی ${JMONTHS[jp(TODAY).m-1]} از طرح‌ها</span><span class="val">${fmtT(got)} <span class="small muted" style="font-weight:400">تومان</span></span><span class="hint">پیش‌پرداخت و قسط‌ها</span></div>
  </div>
  <details class="add"><summary>طرح درمان جدید</summary><form class="f" data-form="plan">
    <label>بیمار<input id="pl-c" name="client" required list="plClients"><datalist id="plClients">${state.clients.map(c=>`<option value="${esc(c.name)}">`).join('')}</datalist></label>
    <label>موبایل<input id="pl-phone" name="phone" inputmode="tel"></label>
    <label>دندانپزشک<select id="pl-doc" name="dentist">${opts(docs.map(p=>[p.id,p.name]),me.role==='staff'?me.id:'')}</select></label>
    <label>تخفیف (تومان)<input id="pl-disc" name="discount" type="number" min="0" step="100000"></label>
    <label class="full">درمان‌ها (هر کدام در یک خط: شماره دندان - درمان - مبلغ)<textarea id="pl-items" name="items" required placeholder="36 - عصب‌کشی - 4500000&#10;36 - روکش زیرکونیا - 9000000&#10;جرم‌گیری - 1200000"></textarea></label>
    <label>پیش‌پرداخت<input id="pl-pre" name="prepay" type="number" min="0" step="100000"></label>
    <label>یادداشت<input id="pl-note" name="note" placeholder="مثلاً حساسیت به پنی‌سیلین"></label>
    <button class="btn full">ثبت طرح درمان</button></form></details>
  <div class="chips">${['در حال درمان','بدهکار','تمام‌شده','همه'].map(k=>`<button class="chip" data-pst="${k}" aria-pressed="${f===k}">${k}</button>`).join('')}</div>
  ${searchBox('جستجوی نام یا موبایل بیمار')}
  ${list.length?list.slice(0,40).map(p=>{const tot=planTotal(p),paid=planPaid(p),d=planDue(p),items=p.items||[],done=items.filter(i=>i.done).length;
    return `<section class="card"><div class="row"><div><div class="t">${esc(p.clientName)}</div><div class="m">${esc(pname(p.dentist))} · ${jd(p.date)}${p.phone?` · <a href="tel:${esc(p.phone)}" style="color:inherit">${esc(p.phone)}</a>`:''}</div></div><select class="inline" data-set="plans/${p.id}" data-field="status" aria-label="وضعیت">${opts(PLAN_ST,p.status)}</select></div>
      <ul class="list">${items.map((i,k)=>`<li class="${i.done?'done':''}"><input type="checkbox" class="chk" ${i.done?'checked':''} data-planitem="${p.id}|${k}" aria-label="انجام شد">${i.tooth?`<span class="pill p-info">دندان ${fmtN(i.tooth)}</span>`:''}<span class="grow">${esc(i.service)}</span><span class="num small">${fmtN(i.price)}</span></li>`).join('')}</ul>
      <div class="meter" aria-label="پرداخت‌شده"><i style="width:${tot?Math.min(100,Math.round(paid/tot*100)):0}%"></i></div>
      <div class="row small"><span class="muted">${fmtN(done)} از ${fmtN(items.length)} درمان انجام شد</span><span>پرداخت ${fmtT(paid)} از ${fmtT(tot)}${d?` · <b style="color:var(--bad)">مانده ${fmtT(d)}</b>`:''}</span></div>
      ${d&&me.role!=='staff'?`<div class="row" style="justify-content:flex-start;gap:6px"><input class="inline" id="pay-${p.id}" type="number" min="0" step="100000" placeholder="مبلغ قسط" style="flex:1"><button class="chip" data-planpay="${p.id}">ثبت پرداخت</button></div>`:''}
      ${p.note?`<div class="m">${esc(p.note)}</div>`:''}
      ${['owner','gm'].includes(me.role)?`<div class="row" style="justify-content:flex-end">${delBtn('plans',p.id)}</div>`:''}</section>`}).join(''):empty('طرح درمانی با این شرایط نیست.')}`;
}

// ---------- needs form for businesses not in the samples ----------
let amOwner=false, needReqs=[], needResult=null;
const NQ={
  income:['فروش کالا در مغازه','فروش آنلاین (اینستاگرام، سایت)','خدمت با نوبت یا رزرو','خدمت بدون نوبت (مراجعه حضوری)','پروژه یا قرارداد','تعمیر یا خدمات فنی','غذا و نوشیدنی','شهریه یا اشتراک ماهانه','اجاره دادن وسیله یا مکان'],
  roles:['مدیر یا سرپرست','پذیرش یا منشی','صندوقدار','فروشنده','کارشناس یا متخصص فنی','انباردار','راننده یا پیک','حسابدار','ادمین شبکه‌های اجتماعی','همکار بیرونی یا پاره‌وقت'],
  channels:['حضوری','تلفن','اینستاگرام','سایت','واتساپ یا تلگرام','اپ‌های واسط (اسنپ‌فود، دیوار، دیجی‌کالا...)'],
  daily:['فروش یا درآمد امروز','تعداد مشتری امروز','نوبت‌ها و رزروهای امروز','سفارش‌ها یا کارهای در جریان','موجودی انبار و کالای رو به اتمام','طلب از مشتری‌ها (نسیه، قسط)','چک‌ها و بدهی‌ها','هزینه‌ها','سود','عملکرد هر کارمند','کارهای عقب‌افتاده تیم','شهریه یا اشتراک‌های سررسیدشده'],
  now:['دفتر کاغذی','اکسل','نرم‌افزار حسابداری','واتساپ و یادداشت گوشی','فقط در ذهنم'],
};
const NEED_SECTIONS={
  'فروش یا درآمد امروز':'نمودار فروش روزانه، ماهانه و سالانه','تعداد مشتری امروز':'شمارش مشتری‌ها و مشتری‌های تکراری','نوبت‌ها و رزروهای امروز':'تقویم نوبت‌ها برای هر کارمند',
  'سفارش‌ها یا کارهای در جریان':'صف سفارش‌ها یا کارها با وضعیت مرحله‌به‌مرحله','موجودی انبار و کالای رو به اتمام':'انبار با هشدار موجودی کم','طلب از مشتری‌ها (نسیه، قسط)':'دفتر نسیه و طلب با تسویه یک‌دکمه‌ای',
  'چک‌ها و بدهی‌ها':'چک‌ها و بدهی‌ها با هشدار سررسید','هزینه‌ها':'هزینه‌های روزانه و ماهانه','سود':'سود ناخالص (فروش منهای خرید و هزینه)','عملکرد هر کارمند':'درآمد و کارهای هر کارمند',
  'کارهای عقب‌افتاده تیم':'کارها و درخواست‌های تیم با یادآوری','شهریه یا اشتراک‌های سررسیدشده':'فهرست اعضا و شهریه‌های سررسیدشده'};
function needSuggest(r){
  const has=k=>(r.income||[]).includes(k), t=(r.job||'')+' '+(r.pain||'');
  if(/طلا|جواهر|سکه/.test(t))return 'gold';
  if(/املاک|بنگاه|مسکن|مشاور املاک/.test(t))return 'realestate';
  if(has('غذا و نوشیدنی')||/کافه|رستوران|فست|قنادی|آبمیوه|کترینگ/.test(t))return /رستوران|فست|کترینگ/.test(t)?'restaurant':'cafe';
  if(has('تعمیر یا خدمات فنی')||has('پروژه یا قرارداد')||/تعمیر|خدمات|نصب|سرویس/.test(t))return 'repair';
  if(has('خدمت با نوبت یا رزرو')||has('شهریه یا اشتراک ماهانه'))return /دندان/.test(t)?'dental':/پزشک|کلینیک|مطب|فیزیو|روانشناس|دامپزشک/.test(t)?'clinic':'salon';
  if(has('فروش آنلاین (اینستاگرام، سایت)')&&!has('فروش کالا در مغازه'))return 'shop';
  if(has('فروش کالا در مغازه'))return (+r.branches||1)>1?'store':'retail';
  return 'retail';
}
const chkGroup=(name,arr,prefix)=>`<div class="full" style="display:flex;flex-wrap:wrap;gap:6px">${arr.map((x,i)=>`<label style="display:flex;align-items:center;gap:6px;padding:6px 10px;border:1px solid var(--line);border-radius:99px;background:var(--bg);color:var(--fg);font-size:.85rem;cursor:pointer"><input type="checkbox" id="${prefix}${i}" name="${name}" value="${esc(x)}" style="width:auto;margin:0">${esc(x)}</label>`).join('')}</div>`;
const qHead=(n,q,hint)=>`<div class="full" style="margin-top:6px"><div class="t">${fmtN(n)}. ${q}</div>${hint?`<div class="small muted">${hint}</div>`:''}</div>`;
function scrNeed(){
  return `
  <div class="row"><h2>کسب‌وکارت در نمونه‌ها نیست؟</h2><button class="lnk" data-landing="1">انصراف</button></div>
  <p class="muted" style="margin:0">به این سؤال‌ها جواب بده تا بفهمیم پنل تو باید چه بخش‌هایی داشته باشد. حدود سه دقیقه طول می‌کشد.</p>
  <form class="f card" data-form="need" style="padding:14px">
    ${qHead(1,'کسب‌وکارت چیست؟')}
    <label class="full">نوع شغل<input id="nd-job" name="job" required placeholder="مثلاً آموزشگاه موسیقی، باشگاه، آژانس املاک"></label>
    <label>نام کسب‌وکار<input id="nd-name" name="name"></label>
    <label>نام و نام خانوادگی تو<input id="nd-owner" name="owner" required></label>
    <label>شهر<input id="nd-city" name="city"></label>
    ${qHead(2,'اندازه کسب‌وکار')}
    <label>تعداد شعبه<select id="nd-br" name="branches">${opts(['1','2','3','4','5 و بیشتر'],'1')}</select></label>
    <label>تعداد کارکنان<select id="nd-staff" name="staff">${opts(['فقط خودم','۲ تا ۵ نفر','۶ تا ۱۵ نفر','بیشتر از ۱۵ نفر'],'۲ تا ۵ نفر')}</select></label>
    ${qHead(3,'درآمدت از کجا می‌آید؟','هر چند مورد که درست است را انتخاب کن.')}
    ${chkGroup('income',NQ.income,'nd-in')}
    ${qHead(4,'چه نقش‌هایی در تیمت هست؟','هر نقش در پنل بخش‌های مخصوص خودش را می‌بیند.')}
    ${chkGroup('roles',NQ.roles,'nd-ro')}
    ${qHead(5,'مشتری‌ها از چه راهی با تو در ارتباطند؟')}
    ${chkGroup('channels',NQ.channels,'nd-ch')}
    ${qHead(6,'هر روز صبح دوست داری چه عددهایی را ببینی؟','این‌ها صفحه اصلی داشبورد تو می‌شوند.')}
    ${chkGroup('daily',NQ.daily,'nd-da')}
    ${qHead(7,'الان کارها و حساب‌ها را کجا ثبت می‌کنی؟')}
    ${chkGroup('now',NQ.now,'nd-no')}
    ${qHead(8,'بزرگ‌ترین دردسر روزانه‌ات چیست؟','مثلاً «یادم می‌رود به کی چقدر بدهکارم» یا «نمی‌دانم کدام کلاس پر است».')}
    <label class="full"><textarea id="nd-pain" name="pain" placeholder="هر چه به ذهنت می‌رسد بنویس"></textarea></label>
    ${qHead(9,'چه کارهای تکراری باید یادت بماند؟','روزانه، هفتگی یا ماهانه؛ مثلاً تمدید قرارداد، سفارش جنس، تماس با مشتری.')}
    <label class="full"><textarea id="nd-rep" name="repeat"></textarea></label>
    <label class="full">${qHead(10,'چه کسی نباید چه چیزی را ببیند؟','مثلاً «کارمندها درآمد کل را نبینند».').replace('class="full" ','')}<input id="nd-priv" name="privacy"></label>
    ${qHead(11,'به چه چیزهای دیگری نیاز داری؟')}
    ${chkGroup('extra',['پیامک یادآوری به مشتری','فاکتور یا رسید برای مشتری','قسط و پرداخت مرحله‌ای','حقوق و درصد کارمندان','گزارش برای حسابدار','مدیریت چند شعبه'],'nd-ex')}
    <label class="full">شماره تماس (اختیاری، برای پیگیری)<input id="nd-phone" name="phone" inputmode="tel"></label>
    <button class="btn full">ثبت و دیدن پیشنهاد پنل</button>
  </form>`;
}
const REQ_PILL={'در انتظار بررسی':'p-warn','در حال برنامه‌ریزی':'p-info','تأیید شد':'p-ok','رد شد':'p-bad'};
const COVER={'فروش یا درآمد امروز':'all','تعداد مشتری امروز':['salon','clinic','dental','shop','cafe','restaurant','repair','realestate'],'نوبت‌ها و رزروهای امروز':['salon','clinic'],'سفارش‌ها یا کارهای در جریان':['shop','cafe','restaurant','repair','store','realestate'],'موجودی انبار و کالای رو به اتمام':['shop','retail','cafe','restaurant','repair','gold'],'طلب از مشتری‌ها (نسیه، قسط)':['retail','salon','clinic','repair','gold'],'چک‌ها و بدهی‌ها':['retail','gold'],'هزینه‌ها':'all','سود':['retail','repair','gold'],'عملکرد هر کارمند':['salon','clinic','dental','repair','realestate'],'کارهای عقب‌افتاده تیم':'all','شهریه یا اشتراک‌های سررسیدشده':[]};
const covered=(d,base)=>COVER[d]==='all'||(COVER[d]||[]).includes(base);
function draftPlan(r){
  const base=needSuggest(r), roles={...baseRoles(base),owner:'مالک'}, isAppt=!!APPT_ROLES[base];
  const has=x=>(r.roles||[]).includes(x);
  if(isAppt){if(has('پذیرش یا منشی'))roles.front='پذیرش';if(has('کارشناس یا متخصص فنی'))roles.staff='کارشناس'}
  const gaps=[...(r.daily||[]).filter(d=>!covered(d,base)),...(r.extra||[]).filter(x=>['پیامک یادآوری به مشتری','فاکتور یا رسید برای مشتری','قسط و پرداخت مرحله‌ای'].includes(x))];
  return {label:r.job||'',base,roleLabels:roles,labels:isAppt?{client:'مشتری',clients:'مشتریان'}:{},itemsLabel:TEMPLATES[base].itemsLabel,items:'',gaps,note:''};
}
function scrNeedDone(){
  const r=needResult||{};
  return `
  <section class="card" style="background:var(--accent-soft);border-color:var(--accent)">
    <h2>ممنون! درخواستت برای «${esc(r.job||'کسب‌وکار تو')}» ثبت شد</h2>
    <p class="muted" style="margin:0">جواب‌هایت را بررسی می‌کنیم و برای کسب‌وکارت برنامه می‌ریزیم که داشبورد چه بخش‌ها و نقش‌هایی داشته باشد. بعد از تأیید، پنلت خودکار در «کسب‌وکارهای من» ظاهر می‌شود.</p>
  </section>
  <section class="card"><h3>مراحل بعدی</h3><ul class="list">
    <li><span class="pill p-ok">۱</span><span class="grow">ثبت درخواست</span><span class="small muted">انجام شد</span></li>
    <li><span class="pill p-mute">۲</span><span class="grow">بررسی نیازها و برنامه‌ریزی داشبورد</span></li>
    <li><span class="pill p-mute">۳</span><span class="grow">تأیید و ساخت پنل اختصاصی</span></li></ul>
    <p class="small muted" style="margin:0">وضعیت درخواست را هر وقت در صفحه اول، بخش «درخواست‌های من» می‌بینی.</p></section>
  <button class="lnk" data-landing="1">بازگشت به صفحه اول</button>`;
}
function myRequests(){
  const list=needReqs.filter(r=>myUid&&r.uid===myUid).sort((a,b)=>(b.createdAt||0)-(a.createdAt||0));
  if(!list.length)return '';
  return `<h3>درخواست‌های من</h3>${list.map(r=>`<section class="card"><div class="row"><span class="t">${esc(r.job)}${r.name?' · '+esc(r.name):''}</span><span class="pill ${REQ_PILL[r.status]||'p-mute'}">${esc(r.status||'در انتظار بررسی')}</span></div>
    <div class="m">${r.status==='تأیید شد'?'پنلت ساخته شد و در «کسب‌وکارهای من» است.':r.status==='رد شد'?'فعلاً امکان ساخت این پنل نیست.':r.status==='در حال برنامه‌ریزی'?'در حال طراحی بخش‌های داشبورد تو هستیم.':'درخواستت رسید و به‌زودی بررسی می‌شود.'}</div>
    ${r.plan&&r.plan.note&&(r.status==='تأیید شد'||r.status==='رد شد')?`<div class="m">پیام: ${esc(r.plan.note)}</div>`:''}</section>`).join('')}`;
}
function readPlan(id){
  const f=document.querySelector(`form[data-form=plan][data-req="${id}"]`);const r=needReqs.find(x=>x.id===id);if(!f||!r)return r&&r.plan||null;
  const fd=new FormData(f), g=k=>String(fd.get(k)||'').trim();
  const base=g('base')||r.plan?.base||r.suggest, roleLabels={};
  Object.keys(baseRoles(base)).forEach(k=>{const v=g('role_'+k);if(v)roleLabels[k]=v});
  const labels={};['client','clients','staff'].forEach(k=>{const v=g('lbl_'+k);if(v)labels[k]=v});
  if(APPT_ROLES[base]&&roleLabels.staff)labels.staff=roleLabels.staff;
  return {label:g('label')||r.job,base,roleLabels,labels,itemsLabel:g('itemsLabel'),items:g('items'),gaps:r.plan?.gaps||[],note:g('note')};
}
async function approveRequest(id){
  const r=needReqs.find(x=>x.id===id);if(!r||!db)return;
  const pl=readPlan(id)||draftPlan(r);
  if(armed!=='approve/'+id){armed='approve/'+id;render();return}
  armed=null;
  await write(async()=>{
    if(APPT_ROLES[pl.base]&&pl.labels.staff)pl.roleLabels.staff=pl.labels.staff;
    const jref=await db.collection('jobtypes').add({label:pl.label,base:pl.base,desc:'ساخته‌شده از نیازسنجی «'+(r.job||'')+'»',roleLabels:pl.roleLabels,labels:pl.labels,itemsLabel:pl.itemsLabel,defaults:pl.items,fromRequest:id,createdAt:Date.now()});
    jobTypes=[...jobTypes.filter(j=>j.id!==jref.id),{id:jref.id,label:pl.label,base:pl.base,roleLabels:pl.roleLabels,labels:pl.labels,itemsLabel:pl.itemsLabel,defaults:pl.items}];
    const w=await createWorkspace({tpl:'jt:'+jref.id,name:r.name||r.job,owner:r.owner||'مالک',ownerUid:r.uid||'',ownerPhone:r.userPhone||'',items:pl.items,teamSize:{'فقط خودم':'1','۲ تا ۵ نفر':'2-5','۶ تا ۱۵ نفر':'6-20','بیشتر از ۱۵ نفر':'20+'}[r.staff]||'',note:pl.gaps.length?'در دست ساخت: '+pl.gaps.join('، '):''});
    await db.doc('requests/'+id).update({status:'تأیید شد',plan:pl,jobType:jref.id,wsId:w.id,approvedAt:Date.now()});
  },'شغل جدید و پنل «'+(r.name||r.job)+'» ساخته شد');
}
function planForm(r){
  const pl=r.plan||draftPlan(r), base=pl.base||r.suggest, isAppt=!!APPT_ROLES[base], done=r.status==='تأیید شد';
  const roles=baseRoles(base), dis=done?' disabled':'';
  return `<form class="f" data-form="plan" data-req="${r.id}" style="border-top:1px solid var(--line);padding-top:10px;margin-top:6px">
    <div class="full t">برنامه داشبورد</div>
    <label class="full">نام شغل جدید<input id="pl-label-${r.id}" name="label" value="${esc(pl.label||r.job)}"${dis}></label>
    <label class="full">بر پایه الگوی<select name="base" data-planbase="${r.id}"${dis}>${opts(Object.entries(TEMPLATES).map(([k,x])=>[k,x.label]),base)}</select></label>
    <div class="full small muted">نام نقش‌ها در این شغل</div>
    ${Object.entries(roles).map(([k,l])=>`<label>${esc(l)}<input id="pl-r-${k}-${r.id}" name="role_${k}" value="${esc((pl.roleLabels||{})[k]||l)}"${dis}></label>`).join('')}
    ${isAppt?`<label>به مشتری می‌گویند<input id="pl-c-${r.id}" name="lbl_client" value="${esc(pl.labels?.client||'مشتری')}" placeholder="مثلاً شاگرد"${dis}></label><label>جمع آن<input id="pl-cs-${r.id}" name="lbl_clients" value="${esc(pl.labels?.clients||'مشتریان')}" placeholder="مثلاً شاگردان"${dis}></label>`:''}
    <label class="full">نام فهرست ${esc(TEMPLATES[base].itemsLabel)}<input id="pl-il-${r.id}" name="itemsLabel" value="${esc(pl.itemsLabel||TEMPLATES[base].itemsLabel)}" placeholder="مثلاً کلاس‌ها"${dis}></label>
    <label class="full">موارد اولیه (هر خط: نام - قیمت)<textarea id="pl-it-${r.id}" name="items" placeholder="مثلاً کلاس پیانو - 1200000"${dis}>${esc(pl.items||'')}</textarea></label>
    ${(pl.gaps||[]).length?`<div class="full" style="background:var(--warn-soft);border-radius:10px;padding:8px 10px"><div class="small t" style="color:var(--warn)">در الگوی پایه نیست و باید ساخته شود</div><div class="small">${pl.gaps.map(esc).join('، ')}</div></div>`:''}
    <label class="full">پیام به متقاضی<input id="pl-n-${r.id}" name="note" value="${esc(pl.note||'')}" placeholder="مثلاً بخش شهریه تا دو هفته دیگر اضافه می‌شود"${dis}></label>
    ${done?`<div class="full small muted">تأیید شد و پنل ساخته شد.</div>`:`<div class="full row" style="justify-content:flex-start;gap:8px">
      <button type="button" class="btn" data-approve="${r.id}">${armed==='approve/'+r.id?'مطمئنی؟ ساخته شود':'تأیید و ساخت شغل جدید'}</button>
      <button type="button" class="chip" data-planstatus="${r.id}|در حال برنامه‌ریزی">ذخیره برنامه</button>
      <button type="button" class="lnk del" data-planstatus="${r.id}|رد شد">رد</button></div>`}
  </form>`;
}
function needInbox(){
  if(!amOwner||!needReqs.length)return '';
  const list=[...needReqs].sort((a,b)=>((a.status==='تأیید شد'||a.status==='رد شد')-(b.status==='تأیید شد'||b.status==='رد شد'))||(b.createdAt||0)-(a.createdAt||0));
  const pending=list.filter(r=>!['تأیید شد','رد شد'].includes(r.status)).length;
  const row=(k,v)=>v&&(!Array.isArray(v)||v.length)?`<div class="m"><b>${k}:</b> ${esc(Array.isArray(v)?v.join('، '):v)}</div>`:'';
  return `<div class="row"><h3>درخواست شغل‌های جدید</h3>${pending?`<span class="pill p-warn">${fmtN(pending)} منتظر تو</span>`:''}</div>
  ${list.map(r=>`<details class="card"${ui.openReq===r.id?' open':''} data-reqbox="${r.id}"><summary class="row" style="cursor:pointer"><span class="t">${esc(r.job)}${r.name?' · '+esc(r.name):''}</span><span class="pill ${REQ_PILL[r.status]||'p-warn'}">${esc(r.status||'در انتظار بررسی')}</span></summary>
    <div class="small muted">${r.owner?esc(r.owner)+' · ':''}${r.createdAt?jd(iso(r.createdAt)):''}</div>
    ${row('شهر',r.city)}${row('شعبه',r.branches)}${row('کارکنان',r.staff)}${row('درآمد',r.income)}${row('نقش‌ها',r.roles)}${row('ارتباط با مشتری',r.channels)}${row('عددهای روزانه',r.daily)}${row('ثبت فعلی',r.now)}${row('دردسر اصلی',r.pain)}${row('کارهای تکراری',r.repeat)}${row('محدودیت دسترسی',r.privacy)}${row('نیازهای دیگر',r.extra)}${row('تماس',r.phone)}
    ${r.status==='رد شد'?'':planForm(r)}
    <div class="row" style="justify-content:flex-end"><button class="lnk del ${armed==='req/'+r.id?'armed':''}" data-delreq="${r.id}">${armed==='req/'+r.id?'حذف شود؟':'حذف درخواست'}</button></div></details>`).join('')}`;
}

// ---------- platform: landing, create, settings ----------
const TEMPLATES={
  store:{label:'فروشگاه',desc:'فروش حضوری و آنلاین، شعبه‌ها، سفارش کالا، برنامه محتوا',defaults:'محصول نمونه ۱ - 1500000\nمحصول نمونه ۲ - 900000',staffRole:'team',staffLabel:'فروشنده',items:'products',itemsLabel:'محصولات'},
  shop:{label:'فروشگاه آنلاین',desc:'سفارش‌های اینستاگرام و سایت، بسته‌بندی و ارسال، کد رهگیری، موجودی انبار، مشتریان',defaults:'تیشرت نخی - 450000\nهودی - 1200000\nکلاه - 250000',staffRole:'support',staffLabel:'پشتیبان',items:'products',itemsLabel:'محصولات'},
  cafe:{label:'کافه',desc:'ثبت سفارش با لمس منو، صف بار، تسویه میزها، منو و موجودی مواد اولیه، ساعت‌های شلوغ',defaults:'اسپرسو - 95000\nلاته - 145000\nکیک شکلاتی - 160000',staffRole:'waiter',staffLabel:'گارسون و باریستا',items:'menu',itemsLabel:'منو'},
  restaurant:{label:'رستوران و فست‌فود',desc:'سفارش سالن، بیرون‌بر و دلیوری، صف آشپزخانه، منو، انبار مواد اولیه، فروش روزانه',defaults:'چلوکباب کوبیده - 420000\nجوجه کباب - 390000\nنوشابه - 35000',staffRole:'waiter',staffLabel:'گارسون',items:'menu',itemsLabel:'منو'},
  repair:{label:'تعمیرگاه و خدمات فنی',desc:'قبض پذیرش دستگاه یا خودرو، وضعیت تعمیر، تعمیرکار مسئول، موعد تحویل، طلب‌ها و انبار قطعات',defaults:'برد تغذیه - 650000\nکمپرسور - 4800000',staffRole:'tech',staffLabel:'تعمیرکار',items:'parts',itemsLabel:'قطعات',deviceLabel:'دستگاه یا خودرو',devicePh:'مثلاً یخچال ساید سامسونگ'},
  retail:{label:'مغازه و سوپرمارکت',desc:'ثبت سریع فروش نقد و کارت، دفتر نسیه، چک‌ها و بدهی به پخش‌کننده‌ها، کالای رو به اتمام',defaults:'شیر یک لیتری - 48000\nنان تست - 65000\nپنیر ۴۰۰ گرمی - 120000',staffRole:'seller',staffLabel:'فروشنده',items:'products',itemsLabel:'کالاها'},
  gold:{label:'طلافروشی و جواهری',desc:'فاکتور طلا با وزن، عیار، اجرت و نرخ روز، خرید طلای کهنه، ویترین به گرم، نسیه و چک',defaults:'انگشتر زنانه - 3.2\nگردنبند - 5.8\nدستبند - 9.4',staffRole:'seller',staffLabel:'فروشنده',items:'products',itemsLabel:'اجناس ویترین',itemsHint:'نام - وزن به گرم',noItemSettings:true},
  realestate:{label:'املاک و مشاور املاک',desc:'فایل‌های فروش و اجاره، مشتریان و فایل‌های مناسب هرکدام، بازدیدها، قراردادها و کمیسیون هر مشاور',defaults:'',staffRole:'agent',staffLabel:'مشاور',items:'listings',itemsLabel:'فایل‌ها',noItems:true,noItemSettings:true},
  salon:{label:'سالن زیبایی و آرایشگاه',desc:'نوبت‌دهی، مشتریان، سهم آرایشگرها، یادآوری مشتری‌های برنگشته',defaults:'کوتاهی مو - 450000\nرنگ مو - 2500000\nبراشینگ - 400000\nمانیکور - 500000',staffRole:'staff',staffLabel:'آرایشگر',items:'services',itemsLabel:'خدمات'},
  dental:{label:'کلینیک دندانپزشکی',desc:'نوبت بیماران، طرح درمان با شماره دندان، پیش‌پرداخت و قسط، مانده هر بیمار، سهم هر دندانپزشک',defaults:'معاینه و مشاوره - 500000\nجرم‌گیری - 1200000\nترمیم کامپوزیت - 2800000\nعصب‌کشی - 4500000\nروکش زیرکونیا - 9000000\nایمپلنت - 35000000',staffRole:'staff',staffLabel:'دندانپزشک',items:'services',itemsLabel:'خدمات'},
  clinic:{label:'کلینیک و مطب',desc:'نوبت بیماران، پرونده و یادداشت ویزیت، پیگیری ویزیت بعدی، سهم پزشکان',defaults:'ویزیت - 600000\nلیزر - 2500000\nپاکسازی پوست - 1500000',staffRole:'staff',staffLabel:'پزشک',items:'services',itemsLabel:'خدمات'},
};
const SOON=['آموزشگاه','باشگاه ورزشی','آژانس و خدمات'];
let myUid=null, uiView='landing', createType='salon', createTeam='2-5', jobTypes=[];
const TEAM_SIZES=[['1','فقط خودم'],['2-5','۲ تا ۵ نفر'],['6-20','۶ تا ۲۰ نفر'],['20+','بیشتر از ۲۰ نفر']];
const teamLbl=k=>(TEAM_SIZES.find(x=>x[0]===k)||[])[1]||'';
const tplOf=k=>{if(TEMPLATES[k])return {...TEMPLATES[k],base:k};const j=jobTypes.find(x=>'jt:'+x.id===k);if(!j)return {...TEMPLATES.salon,base:'salon'};const b=TEMPLATES[j.base]||TEMPLATES.salon;
  return {...b,base:j.base,label:j.label,desc:j.desc||b.desc,itemsLabel:j.itemsLabel||b.itemsLabel,staffLabel:(j.roleLabels||{})[b.staffRole]||b.staffLabel,defaults:j.defaults||'',jt:j}};
const allTemplates=()=>[...Object.keys(TEMPLATES),...jobTypes.map(j=>'jt:'+j.id)];
const toEn=s=>String(s||'').replace(/[۰-۹]/g,d=>'۰۱۲۳۴۵۶۷۸۹'.indexOf(d)).replace(/[٠-٩]/g,d=>'٠١٢٣٤٥٦٧٨٩'.indexOf(d));
function parseItems(txt){return String(txt||'').split('\n').map(l=>l.trim()).filter(Boolean).map(l=>{const m=l.split(/\s+[-–]\s+|،|,/);const name=(m[0]||'').trim();const price=parseInt(toEn(m[1]||'').replace(/[^\d]/g,''),10)||0;return {name,price}}).filter(x=>x.name)}
const TYPE_ICON={store:'order',shop:'sorders',cafe:'kitchen',restaurant:'menu',repair:'jobs',retail:'rsell',salon:'appts',clinic:'clients',gold:'gstock',realestate:'listings',dental:'plans'};
const TYPE_HUE={store:'#0d7a5f',shop:'#1d5fa8',cafe:'#8a5a2b',restaurant:'#c2410c',repair:'#475569',retail:'#15803d',salon:'#be185d',clinic:'#0e7490',gold:'#b7791f',realestate:'#6d28d9',dental:'#0891b2'};
const typeIcon=t=>`<span class="ti" style="--h:${TYPE_HUE[t]||'#0d7a5f'}">${ICON[TYPE_ICON[t]]||ICON.home}</span>`;
const FEATURES=[
  ['clients','هر نفر، صفحه خودش','مالک عدد سود را می‌بیند، منشی نوبت‌ها را، فروشنده فقط فاکتور را. هر کس با شماره موبایلش وارد می‌شود.'],
  ['income','گزارش لحظه‌ای','فروش امروز، این ماه و امسال با نمودار؛ بدون اکسل و بدون حساب‌وکتاب آخر شب.'],
  ['tasks','کار و یادآوری تیم','کار بفرست، موعد بگذار، کارهای تکراری خودشان تکرار می‌شوند و عقب‌افتاده‌ها قرمز می‌شوند.'],
  ['nasieh','نسیه، چک و قسط','طلب هر مشتری، چک‌های سررسید هفته و قسط بیماران؛ همه با هشدار به‌موقع.'],
  ['stock','انبار و موجودی','کالای رو به اتمام خودش را نشان می‌دهد و با هر فروش موجودی کم می‌شود.'],
  ['money','هزینه و حقوق','هزینه‌های روزانه، حقوق و درصد هر همکار و سود واقعی آخر ماه.'],
];
function heroMock(){
  const bars=[38,52,44,70,58,86,64];
  return `<div class="mock" aria-hidden="true"><div class="mock-in">
    <div class="mock-top"><b>کافه نارنج</b><span>امروز</span></div>
    <div class="mock-kpi"><span>فروش امروز</span><b>۱۸٫۴ میلیون</b><i>۱۲٪ بیشتر از دیروز</i></div>
    <div class="mock-row"><div class="mock-mini"><span>سفارش باز</span><b>۷</b></div><div class="mock-mini"><span>کارهای تیم</span><b>۳</b></div></div>
    <div class="mock-bars">${bars.map((h,i)=>`<i style="height:${h}%;animation-delay:${i*70}ms"${i===6?' class="now"':''}></i>`).join('')}</div>
    <div class="mock-list"><div><span class="dot"></span>لاته ×۲ · میز ۴</div><div><span class="dot ok"></span>تسویه شد · ۴۸۰٬۰۰۰</div></div>
  </div></div>`;
}
function scrLanding(){
  const mine=workspaces.filter(w=>w._access==='owner'||w._access==='member');
  const demos=workspaces.filter(w=>w.example);
  const others=amOwner?workspaces.filter(w=>w._access==='admin'):[];
  const types=Object.keys(TEMPLATES);
  const demoOf=t=>demos.find(w=>w.type===t);
  return `
  <section class="hero">
    <div class="hero-text">
      <span class="eyebrow">پنل هوشمند کسب‌وکار</span>
      <h1>کسب‌وکارت را <em>از روی گوشی</em> اداره کن</h1>
      <p>فروش، نوبت‌ها، مشتری‌ها، تیم و حساب‌وکتاب در یک پنل. برای نوع کسب‌وکارت آماده است و هر عضو تیم فقط بخش خودش را می‌بیند.</p>
      <div class="hero-cta"><button class="btn big" data-create="1">ساخت پنل رایگان</button><a class="btn ghost big" href="#samples">دیدن نمونه‌ها</a></div>
      <div class="hero-stats"><span><b>${fmtN(types.length)}</b> نوع کسب‌وکار</span><span><b>۲</b> دقیقه تا شروع</span><span><b>بدون</b> نصب برنامه</span></div>
    </div>
    ${heroMock()}
  </section>
  ${myUid?`<section class="lsec"><div class="row"><h2>کسب‌وکارهای من</h2><button class="chip" data-create="1">+ پنل جدید</button></div>
    ${mine.length?`<div class="tiles">${mine.map(w=>wsTile(w,false)).join('')}</div>`:empty('هنوز پنلی نساخته‌ای. با «ساخت پنل رایگان» اولین پنل را بساز.')}</section>`
    :`<button class="card login-card" data-login="1"><span class="t">قبلاً پنل ساخته‌ای یا عضو تیمی هستی؟</span><span class="btn ghost">ورود با موبایل</span></button>`}
  ${others.length?`<details class="card"><summary class="row" style="cursor:pointer"><span class="t">همه کسب‌وکارهای سامانه</span><span class="small muted">${fmtN(others.length)}</span></summary><div class="tiles">${others.map(w=>wsTile(w,false)).join('')}</div></details>`:''}
  <section class="lsec" id="samples"><div class="sec-head"><span class="eyebrow">نمونه‌های زنده</span><h2>پنل کسب‌وکار خودت را امتحان کن</h2><p class="muted">روی هر کدام بزن و از چشم مالک، منشی، فروشنده یا هر نقش دیگر ببین. بدون ثبت‌نام.</p></div>
    <div class="tiles">${types.map(t=>{const d=demoOf(t);return d?wsTile(d,true):''}).join('')}</div></section>
  <section class="lsec"><div class="sec-head"><span class="eyebrow">چرا اسمارتو</span><h2>همه چیز سر جای خودش</h2></div>
    <div class="feats">${FEATURES.map(([ic,t,d])=>`<div class="feat"><span class="fi">${ICON[ic]}</span><h3>${t}</h3><p>${d}</p></div>`).join('')}</div></section>
  <section class="lsec"><div class="sec-head"><span class="eyebrow">شروع</span><h2>سه قدم تا پنل خودت</h2></div>
    <ol class="steps"><li><b>با موبایل وارد شو</b><span>یک کد پیامکی؛ بدون رمز.</span></li><li><b>نوع کسب‌وکارت را بزن</b><span>نقش‌ها، بخش‌ها و داده نمونه آماده می‌شود.</span></li><li><b>تیمت را اضافه کن</b><span>هر کس با شماره خودش وارد می‌شود و کارش را می‌بیند.</span></li></ol></section>
  <section class="cta-band"><h2>آماده‌ای؟</h2><p>پنل کسب‌وکارت دو دقیقه بیشتر وقت نمی‌گیرد.</p><button class="btn big light" data-create="1">ساخت پنل رایگان</button>
    <button class="lnk light" data-need="1">کسب‌وکارم در فهرست نیست</button></section>
  ${myRequests()}
  ${needInbox()}`;
}
function wsTile(w,demo){
  const t=TEMPLATES[w.type]||{};
  const badge=demo?'<span class="pill p-info">نمونه</span>':w._access==='member'?'<span class="pill p-mute">عضو تیم</span>':w._access==='admin'?'<span class="pill p-mute">مدیریت</span>':'<span class="pill p-ok">پنل من</span>';
  return `<button class="tile" data-open="${w.id}">${typeIcon(w.type)}<span class="tile-b"><span class="row" style="justify-content:flex-start;gap:6px"><span class="t">${esc(demo?(t.label||w.name):w.name)}</span>${badge}</span><span class="m">${demo?esc(t.desc||''):esc(w.typeLabel||t.label||'')+(w.teamSize?' · '+esc(teamLbl(w.teamSize)):'')}</span></span></button>`;
}

function scrCreate(){
  const t=tplOf(createType);
  return `
  <div class="row"><h2>ساخت پنل جدید</h2><button class="lnk" data-landing="1">انصراف</button></div>
  <form class="f card" data-form="create" style="padding:14px">
    <label class="full">نام کسب‌وکار<input id="cr-name" name="name" required placeholder="مثلاً سالن زیبایی رز"></label>
    <div class="full" style="display:grid;gap:8px"><span class="small muted">نوع کسب‌وکار</span>
      ${allTemplates().map(k=>[k,tplOf(k)]).map(([k,x])=>`<label style="display:flex;gap:10px;align-items:flex-start;padding:10px;border:1px solid ${k===createType?'var(--accent)':'var(--line)'};border-radius:10px;background:${k===createType?'var(--accent-soft)':'var(--bg)'};cursor:pointer;color:var(--fg)"><input type="radio" name="type" value="${k}" data-ctype="${k}" ${k===createType?'checked':''} style="width:auto;margin-top:5px"><span><span class="t">${esc(x.label)}${x.jt?' <span class="pill p-ok">جدید</span>':''}</span><span class="m" style="display:block">${esc(x.desc)}</span></span></label>`).join('')}
    </div>
    <label class="full">نام تو (مالک)<input id="cr-owner" name="owner" required placeholder="نام و نام خانوادگی"></label>
    <label class="full">این کسب‌وکار چند نفره است؟<select id="cr-team" name="teamSize">${opts(TEAM_SIZES,createTeam)}</select></label>
    ${createTeam==='1'?'':`<label class="full">${t.staffLabel}‌ها (هر نفر در یک خط، اختیاری)<textarea id="cr-staff" name="staff" placeholder="${t.staffLabel} ۱"></textarea></label>`}
    ${t.noItems?'':`<label class="full">${t.itemsLabel} (هر کدام در یک خط: ${t.itemsHint||'نام - قیمت'})<textarea id="cr-items" name="items">${esc(t.defaults)}</textarea></label>`}
    <button class="btn full">ساخت پنل</button>
    <button type="button" class="lnk full" data-need="1">نوع کسب‌وکارم در این فهرست نیست</button>
    <p class="small muted full" style="margin:0">بعداً می‌توانی اعضای تیم، نقش‌ها و ${t.itemsLabel} را از «تنظیمات» تغییر دهی.</p>
  </form>`;
}
function teamGroup(title,list,roles,isStore,hint){
  const payTxt=p=>p.payType?esc(p.payType)+(+p.pay?' · '+(p.payType==='درصدی'?fmtN(p.pay)+'٪':fmtN(p.pay)+' تومان'):''):'';
  return `<section class="card"><div class="row"><h3>${title}</h3><span class="small muted">${fmtN(list.length)} نفر</span></div>
    ${hint?`<p class="small muted" style="margin:0">${hint}</p>`:''}
    ${list.length?`<ul class="list">${list.map(p=>`<li><div class="grow"><div class="t">${esc(p.name)}${p.id===me.id?' <span class="small muted">(تو)</span>':''}${p.title?' <span class="small muted">· '+esc(p.title)+'</span>':''}</div>
      <div class="m">${[p.phone?esc(p.phone):'',payTxt(p)].filter(Boolean).join(' · ')}</div>
      <div class="row" style="justify-content:flex-start;margin-top:4px;gap:8px"><select class="inline" data-set="people/${p.id}" data-field="role" aria-label="نقش">${opts(roles,p.role)}</select>
      <input class="inline" placeholder="سمت یا تخصص" value="${esc(p.title||'')}" data-set="people/${p.id}" data-field="title" aria-label="سمت">
      ${APPT_ROLES[ws.type]&&p.role==='staff'?`<label class="small muted" style="display:flex;gap:4px;align-items:center">سهم٪<input class="inline" style="width:60px" type="number" min="0" max="100" value="${+p.commission||0}" data-set="people/${p.id}" data-field="commission"></label>`:''}
      ${isStore&&p.role==='branch'?`<input class="inline" placeholder="نام شعبه" value="${esc(p.branch||'')}" data-set="people/${p.id}" data-field="branch">`:''}</div></div>
      ${p.id!==me.id?delBtn('people',p.id):''}</li>`).join('')}</ul>`:empty('هنوز کسی اضافه نشده است.')}
  </section>`;
}
function scrSettings(){
  const isStore=ws.type==='store', t=TEMPLATES[ws.type]||TEMPLATES.store;
  const roles=Object.entries(rolesOf());
  const isProd=!APPT_ROLES[ws.type];
  const icol=t.items||'services', items=state[icol]||[];
  const isSpec=p=>p.kind==='specialist'||p.role==='specialist';
  const specs=state.people.filter(isSpec), emps=state.people.filter(p=>!isSpec(p));
  return `
  <div class="row"><h2>تیم و تنظیمات</h2><button class="lnk" data-closeset="1">بازگشت</button></div>
  <section class="card"><h3>کسب‌وکار</h3>
    <label class="small muted">نام<input class="inline" style="width:100%;font-size:.95rem;padding:6px 8px" value="${esc(ws.name)}" data-wsname="1"></label>
    <div class="small muted">نوع: ${esc(ws.typeLabel||t.label)}</div>
    <label class="small muted">چند نفره<select class="inline" data-wsteam="1" style="width:100%">${opts([['','انتخاب نشده'],...TEAM_SIZES],ws.teamSize||'')}</select></label></section>
  ${teamGroup('کارمندان',emps,roles,isStore)}
  ${teamGroup('متخصصان و همکاران بیرونی',specs,roles,isStore,'مثلاً عکاس محصول، مشاور مالی، طراح، ادمین اینستاگرام. هر متخصص فقط بخش «کارها» را می‌بیند تا کار و درخواست بگیرد و گزارش بدهد.')}
  <section class="card"><h3>افزودن کارمند یا متخصص</h3><form class="f" data-form="person">
      <label>نوع همکاری<select id="pe-kind" name="kind">${opts([['employee','کارمند'],['specialist','متخصص']],'employee')}</select></label>
      <label>نام<input id="pe-name" name="name" required></label>
      <label>سمت یا تخصص<input id="pe-title" name="title" placeholder="مثلاً انباردار، عکاس"></label>
      <label>موبایل<input id="pe-phone" name="phone" inputmode="tel"></label>
      <label>نقش در پنل<select id="pe-role" name="role">${opts(roles,t.staffRole)}</select></label>
      <label>نوع پرداخت<select id="pe-paytype" name="payType">${opts(PAY_TYPES,isProd&&ws.type!=='realestate'?'حقوق ماهانه':'درصدی')}</select></label>
      <label>مبلغ یا درصد<input id="pe-pay" name="pay" type="number" min="0" placeholder="تومان یا درصد"${isProd&&ws.type!=='realestate'?'':' value="40"'}></label>
      ${ws.type==='store'?'<label>شعبه<input id="pe-branch" name="branch" placeholder="برای مالک شعبه"></label>':''}
      <button class="btn full">افزودن به تیم</button></form>
    <p class="small muted" style="margin:0">هر عضو با همان شماره موبایلی که اینجا ثبت می‌کنی وارد اسمارتو می‌شود و فقط بخش‌های نقش خودش را می‌بیند.</p>
  </section>
  ${t.noItemSettings?'':`<section class="card"><div class="row"><h3>${ws.itemsLabel||t.itemsLabel}</h3><span class="small muted">${fmtN(items.length)} مورد</span></div>
    ${items.length?`<ul class="list">${items.map(x=>`<li><span class="grow t">${esc(x.name)}</span><input class="inline" type="number" min="0" step="10000" value="${+x.price||0}" data-set="${icol}/${x.id}" data-field="price" aria-label="قیمت">${delBtn(icol,x.id)}</li>`).join('')}</ul>`:empty('هنوز موردی ثبت نشده است.')}
    <details class="add"><summary>افزودن</summary><form class="f" data-form="item">
      <label>نام<input id="it-name" name="name" required></label>
      <label>قیمت (تومان)<input id="it-price" name="price" type="number" min="0" step="10000"></label>
      ${['shop','retail','repair'].includes(ws.type)?'<label>موجودی<input id="it-stock" name="stock" type="number" min="0" value="10"></label><label>حداقل موجودی<input id="it-min" name="min" type="number" min="0" value="3"></label>':''}
      <button class="btn full">افزودن</button></form></details>
  </section>`}`;
}
async function createWorkspace(o){
  const t=tplOf(o.tpl), type=t.base, j=t.jt, now=Date.now();
  const extra=j?{typeLabel:j.label,jobType:j.id,roleLabels:j.roleLabels||{},labels:j.labels||{},itemsLabel:j.itemsLabel||''}:{};
  if(o.teamSize)extra.teamSize=o.teamSize;
  if(type==='gold')extra.goldRate=0;
  const wref=await db.collection('workspaces').add({name:o.name,type,ownerUid:o.ownerUid||'',createdAt:now,...extra});
  const base='workspaces/'+wref.id+'/';
  const owner=await db.collection(base+'people').add({name:o.owner||'مالک',role:'owner',uid:o.ownerUid||'',phone:o.ownerPhone||'',kind:'employee',commission:0,createdAt:now});
  for(const n of String(o.staff||'').split('\n').map(x=>x.trim()).filter(Boolean)) await db.collection(base+'people').add({name:n,role:t.staffRole,kind:'employee',commission:APPT_ROLES[type]?40:0,createdAt:now});
  if(type==='gold'){for(const l of String(o.items||'').split('\n').map(x=>x.trim()).filter(Boolean)){const m=l.split(/\s+[-–]\s+|،|,/);if((m[0]||'').trim())await db.collection(base+'products').add({name:m[0].trim(),weight:toNum(m[1]||''),karat:750,wage:15,stock:1,createdAt:now})}}
  else if(!t.noItems)for(const it of parseItems(o.items)) await db.collection(base+t.items).add({name:it.name,price:it.price,...(['shop','retail','repair'].includes(type)?{stock:10,min:3}:type==='cafe'||type==='restaurant'?{cat:'سایر',available:true}:{}),createdAt:now});
  await db.collection(base+'tasks').add({title:'اعضای تیم و '+t.itemsLabel+' را در تنظیمات کامل کن',from:owner.id,to:owner.id,due:TODAY,repeat:'none',category:'سایر',note:o.note||'',done:false,createdAt:now});
  return {id:wref.id,ownerId:owner.id,ws:{id:wref.id,name:o.name,type,ownerUid:o.ownerUid||'',...extra}};
}
async function createBusiness(v){
  const tpl=allTemplates().includes(v.type)?v.type:createType;
  const r=await createWorkspace({tpl,name:v.name,owner:v.owner,ownerUid:myUid||'',ownerPhone:myPhone||'',staff:v.teamSize==='1'?'':v.staff,items:v.items,teamSize:v.teamSize});
  ls.set('actingAs:'+r.id,r.ownerId);
  openWs(r.ws);
}
function closeWs(){unsubs.forEach(u=>{try{u()}catch(e){}});unsubs=[];ws=null;me=null;ls.set('ws','');uiView='landing';resetState();render();window.scrollTo({top:0})}

const SCREENS={settings:scrSettings,fsales:scrFSales,pos:scrPos,kitchen:scrKitchen,menu:scrMenu,rdash:scrRDash,jobs:scrJobs,myjobs:scrMyJobs,parts:scrParts,rhome:scrRHome,rsell:scrRSell,ghome:scrGHome,plans:scrPlans,gsell:scrGSell,gstock:scrGStock,edash:scrEDash,listings:scrListings,buyers:scrBuyers,visits:scrVisits,edeals:scrEDeals,nasieh:scrNasieh,checks:scrChecks,ssales:scrSSales,sorders:scrSOrders,ship:scrShip,stock:scrStock,customers:scrCustomers,income:scrIncome,appts:scrAppts,myappts:scrMyAppts,clients:scrClients,earn:scrEarn,home:scrHome,tasks:scrTasks,money:scrMoney,ideas:scrIdeas,branches:scrBranches,content:scrContent,report:scrReport,order:scrOrder,payments:scrPayments};

// ---------- render ----------
// Owners, managers, the platform admin and anyone looking at a sample may view the panel as any role.
function canPreview(){if(!ws)return false;if(ws.example||amOwner||(myUid&&ws.ownerUid===myUid))return true;const m=myUid&&state.people.find(p=>p.uid===myUid);return !!(m&&['owner','gm'].includes(m.role))}
function renderWs(){
  document.getElementById('back').hidden=!ws;
  document.querySelector('nav.bottom').hidden=!ws;
  document.getElementById('whoWrap').hidden=!(ws&&canPreview());
  document.getElementById('gear').hidden=!(ws&&me&&['owner','gm'].includes(me.role));
  document.getElementById('wsname').textContent=ws?ws.name:'اسمارتو';
}
function renderWho(){
  const sel=document.getElementById('who');
  const order=['owner','gm','manager','front','reception','cashier','warehouse','support','team','staff','waiter','kitchen','tech','seller','agent','branch','specialist'];
  const ps=[...state.people].sort((a,b)=>order.indexOf(a.role)-order.indexOf(b.role));
  sel.innerHTML=ps.map(p=>`<option value="${p.id}"${me&&p.id===me.id?' selected':''}>${esc(p.name)} · ${roleLabel(p.role)||''}</option>`).join('');
}
function render(){
  if(!ws){renderWs();document.getElementById('nav').innerHTML='';const v=document.getElementById('view');const keep=saveForms();if((uiView==='create'||uiView==='need')&&db&&!myUid){loginStep.next=uiView;uiView='login'}
    v.dataset.k='create|'+uiView;v.classList.toggle('wide',!ws&&!['create','need','needDone','login','account'].includes(uiView));v.innerHTML=uiView==='create'?scrCreate():uiView==='need'?scrNeed():uiView==='needDone'?scrNeedDone():uiView==='login'?scrLogin():uiView==='account'?scrAccount():scrLanding();if(keep.__s==='create|'+uiView)restoreForms(keep);return}
  const mine=myUid?state.people.find(p=>p.uid===myUid):null;
  if(!me){if(canPreview()){const saved=ls.get('actingAs:'+ws.id);me=person(saved)||mine||state.people.find(p=>p.role==='gm')||state.people.find(p=>p.role==='owner')||state.people[0]||null}else me=mine||null}
  else me=canPreview()?(person(me.id)||me):(mine||null);
  renderWho();renderWs();
  const v=document.getElementById('view'), nav=document.getElementById('nav');
  if(!me){v.dataset.k='';v.classList.remove('wide');v.innerHTML=empty(loaded.has('people')?'تو هنوز عضو این کسب‌وکار نیستی.':'در حال بارگذاری…');nav.innerHTML='';return}
  const items=navFor(me.role);
  if(ui.screen==='settings'&&!['owner','gm'].includes(me.role))ui.screen=null;
  if(ui.screen!=='settings'&&!items.some(i=>i[0]===ui.screen)) ui.screen=items[0][0];
  const mt=myTasks(), badge=[...mt.received,...mt.mine].filter(t=>!t.done&&(isLate(t)||t.due===TODAY)).length;
  nav.innerHTML=items.filter(i=>i[1]).map(([k,l])=>`<button data-screen="${k}"${ui.screen===k?' aria-current="page"':''}>${ICON[k]}<span>${l}</span>${k==='tasks'&&badge?`<span class="badge">${fmtN(badge)}</span>`:''}</button>`).join('');
  const keep=saveForms();
  const qf=document.activeElement&&document.activeElement.id==='q';
  v.dataset.k=ui.screen+'|'+me.id+'|'+ws.id;v.classList.remove('wide');
  v.innerHTML=(ws.example&&!amOwner?`<div class="note" style="display:flex;gap:8px;align-items:center;justify-content:space-between"><span>این یک نمونه است و فقط برای تماشاست.</span><button class="chip" data-create="1">پنل خودم را بساز</button></div>`:'')+SCREENS[ui.screen]();
  if(keep.__s===ui.screen+'|'+me.id+'|'+ws.id)restoreForms(keep);
  const gsum=document.getElementById('gs-sum');if(gsum)gsum.innerHTML=goldSumHtml(readGoldForm());
  if(qf){const q=document.getElementById('q');if(q){q.focus();q.setSelectionRange(q.value.length,q.value.length)}}
}
// Form state is keyed by the screen that was on display, so it is only restored onto that same screen.
function saveForms(){const o={__s:document.getElementById('view').dataset.k||''};document.querySelectorAll('form.f [id]').forEach(i=>o[i.id]=i.type==='checkbox'?{c:i.checked}:i.value);document.querySelectorAll('details.add').forEach((d,i)=>o['__d'+i]=d.open);return o}
function restoreForms(o){for(const k in o){if(k==='__s')continue;if(k.startsWith('__d')){const d=document.querySelectorAll('details.add')[+k.slice(3)];if(d)d.open=o[k];continue}const el=document.getElementById(k);if(el&&o[k]&&typeof o[k]==='object'){el.checked=o[k].c;continue}if(el&&el.value!==undefined)el.value=o[k]}}
function resetForm(f){f.querySelectorAll('input:not([type=date]):not([type=time]):not([data-keep]),textarea').forEach(i=>{i.value=i.type==='number'&&i.name==='qty'?'1':''})}

// ---------- events ----------
document.getElementById('who').addEventListener('change',e=>{if(!canPreview())return;me=person(e.target.value);ls.set('actingAs:'+ws.id,me?.id||'');ui.screen=null;ui.taskTab='received';ui.taskCat='همه';armed=null;render();window.scrollTo({top:0})});
document.getElementById('nav').addEventListener('click',e=>{const b=e.target.closest('[data-screen]');if(!b)return;ui.screen=b.dataset.screen;armed=null;render();window.scrollTo({top:0})});
const V=document.getElementById('view');
V.addEventListener('click',async e=>{
  const el=e.target.closest('button');if(!el)return;
  const d=el.dataset;
  if(d.create){if(ws)closeWs();if(!myUid){needLogin('create');return}uiView='create';createTeam='2-5';render();window.scrollTo({top:0});return}
  if(d.login){needLogin(null);return}
  if(d.relogin){loginStep.sent=false;render();return}
  if(d.logout){try{await smarto.logout()}catch(e){}myUid=null;myPhone=null;amOwner=false;renderAcct();smarto.reconnect();subscribeAccountData();uiView='landing';render();toast('از حساب خارج شدی');return}
  if(d.landing){uiView='landing';render();window.scrollTo({top:0});return}
  if(d.need){if(!myUid){needLogin('need');return}uiView='need';render();window.scrollTo({top:0});return}
  if(d.planstatus){const [id,st]=d.planstatus.split('|');const pl=readPlan(id);try{await db.doc('requests/'+id).update({status:st,...(pl?{plan:pl}:{}),updatedAt:Date.now()});toast(st==='رد شد'?'درخواست رد شد':'وضعیت ذخیره شد')}catch(e){toast('ذخیره نشد')}return}
  if(d.approve){await approveRequest(d.approve);return}
  if(d.delreq){if(armed!=='req/'+d.delreq){armed='req/'+d.delreq;render();return}armed=null;try{await db.doc('requests/'+d.delreq).delete();toast('حذف شد')}catch(e){toast('حذف نشد')}return}
  if(d.open){const w=workspaces.find(x=>x.id===d.open);if(w){openWs(w);window.scrollTo({top:0})}return}
  if(d.closeset){ui.screen=null;render();return}
  if(d.go){ui.screen=d.go;if(d.cat){ui.taskCat=d.cat}if(d.ost)ui.ost=d.ost;if(d.jst)ui.jst=d.jst;render();window.scrollTo({top:0});return}
  if(d.period){ui.period=d.period;render();return}
  if(d.source){ui.source=d.source;render();return}
  if(d.ost&&!d.go){ui.ost=d.ost;render();return}
  if(d.jst&&!d.go){ui.jst=d.jst;render();return}
  if(d.mcat){ui.mcat=d.mcat;render();return}
  if(d.ldeal){ui.ldeal=d.ldeal;render();return}
  if(d.lst){ui.lst=d.lst;render();return}
  if(d.lmine){ui.lmine=!ui.lmine;render();return}
  if(d.cst){ui.cst=d.cst;render();return}
  if(d.pst){ui.pst=d.pst;render();return}
  if(d.planpay){const p=state.plans.find(x=>x.id===d.planpay);const inp=document.getElementById('pay-'+d.planpay);const amt=+(inp&&inp.value)||0;if(!p||!amt){toast('مبلغ را بنویس');return}
    await write(()=>D('plans/'+p.id).update({payments:[...(p.payments||[]),{date:TODAY,amount:amt,by:me.id}],updatedAt:Date.now()}),'پرداخت '+fmtN(amt)+' ثبت شد');return}
  if(d.addm){ui.cart[d.addm]=(ui.cart[d.addm]||0)+1;render();return}
  if(d.cartinc){ui.cart[d.cartinc]=(ui.cart[d.cartinc]||0)+1;render();return}
  if(d.cartdec){ui.cart[d.cartdec]=Math.max(0,(ui.cart[d.cartdec]||0)-1);render();return}
  if(d.cartclear){ui.cart={};render();return}
  if(d.fstatus){const [id,st]=d.fstatus.split('|');await write(()=>D('forders/'+id).update({status:st,updatedAt:Date.now()}),st+' ✓');return}
  if(d.settle){const c=ledgerBalances().find(x=>x.name===d.settle);if(!c||c.bal<=0)return;await write(()=>C('ledger').add({name:c.name,phone:c.phone||'',amount:-c.bal,date:TODAY,note:'تسویه',by:me.id,createdAt:Date.now()}),c.name+' تسویه شد');return}
  if(d.ostatus){const [id,st]=d.ostatus.split('|');await write(()=>D('sorders/'+id).update({status:st,updatedAt:Date.now()}),st+' ✓');return}
  if(d.fillsal){const m=d.fillsal;const named=new Set(state.salaries.filter(s=>s.month===m).map(s=>s.person));const list=state.people.filter(p=>p.payType==='حقوق ماهانه'&&+p.pay>0&&!named.has(p.name));
    await write(async()=>{for(const p of list)await C('salaries').add({person:p.name,amount:+p.pay,month:m,paid:false,createdAt:Date.now()})},'حقوق '+fmtN(list.length)+' نفر ثبت شد');return}
  if(d.tasktab){ui.taskTab=d.tasktab;ui.taskCat='همه';render();return}
  if(d.taskcat){ui.taskCat=d.taskcat;render();return}
  if(d.moneytab){ui.moneyTab=d.moneytab;render();return}
  if(d.salmonth){ui.salMonth=d.salmonth;render();return}
  if(d.contentst){ui.contentSt=d.contentst;render();return}
  if(d.day!==undefined){ui.day=d.day==='0'?TODAY:addDays(ui.day||TODAY,+d.day);render();return}
  if(d.stafff){ui.staffF=d.stafff;render();return}
  if(d.del){if(armed!==d.del){armed=d.del;render();return}armed=null;await write(()=>D(d.del).delete(),'حذف شد');return}
  if(d.confirm){await write(()=>D('payments/'+d.confirm).update({confirmed:true,confirmedBy:me.id,updatedAt:Date.now()}),'پرداخت تأیید شد');return}
  if(d.convert){const i=state.ideas.find(x=>x.id===d.convert);if(!i)return;await write(async()=>{await C('tasks').add({title:i.text.slice(0,140),from:me.id,to:me.id,due:addDays(TODAY,7),repeat:'none',category:'سایر',done:false,note:'از ایده‌ها',createdAt:Date.now()});await D('ideas/'+i.id).update({converted:true})},'به کارهای خودت اضافه شد');return}
});
V.addEventListener('change',async e=>{
  const el=e.target;
  if(el.dataset.ctype){createType=el.dataset.ctype;const items=document.getElementById('cr-items');const keep=saveForms();keep['cr-items']=tplOf(createType).defaults;render();restoreForms(keep);return}
  if(el.id==='cr-team'){createTeam=el.value;const keep=saveForms();render();restoreForms(keep);return}
  if(el.dataset.planitem){const [id,k]=el.dataset.planitem.split('|');const p=state.plans.find(x=>x.id===id);if(!p)return;const items=(p.items||[]).map((x,i)=>i===+k?{...x,done:el.checked}:x);
    const all=items.length&&items.every(x=>x.done);
    await write(()=>D('plans/'+id).update({items,...(all&&p.status==='در حال درمان'?{status:'تمام‌شده'}:{}),updatedAt:Date.now()}),el.checked?(all?'همه درمان‌ها انجام شد':'انجام شد'):'برگشت');return}
  if(el.dataset.wsteam){await write(()=>db.doc('workspaces/'+ws.id).update({teamSize:el.value}),'ذخیره شد');return}
  if(el.dataset.wsrate){await write(()=>db.doc('workspaces/'+ws.id).update({goldRate:+el.value||0,goldRateDate:TODAY}),'نرخ طلا ذخیره شد');return}
  if(el.id==='gs-p'){const p=state.products.find(x=>x.id===el.value);if(p){const set=(id,v)=>{const i=document.getElementById(id);if(i)i.value=v};set('gs-name',p.name);set('gs-w',p.weight);set('gs-k',String(p.karat||750));set('gs-wage',p.wage??15)}const b=document.getElementById('gs-sum');if(b)b.innerHTML=goldSumHtml(readGoldForm());return}
  if(el.id&&el.id.startsWith('gs-')){const b=document.getElementById('gs-sum');if(b)b.innerHTML=goldSumHtml(readGoldForm());return}
  if(el.dataset.wsname){const nv=el.value.trim();if(nv)await write(()=>db.doc('workspaces/'+ws.id).update({name:nv}),'نام ذخیره شد');return}
  if(el.dataset.avail){await write(()=>D('menu/'+el.dataset.avail).update({available:el.checked,updatedAt:Date.now()}),el.checked?'موجود شد':'ناموجود شد');return}
  if(el.dataset.set&&el.dataset.set.startsWith('forders/')&&el.dataset.field==='pay'){await write(()=>D(el.dataset.set).update({pay:el.value,paid:!!el.value,updatedAt:Date.now()}),el.value?'پرداخت ثبت شد':'پرداخت برداشته شد');return}
  if(el.dataset.set&&el.dataset.set.startsWith('jobs/')&&el.dataset.field==='status'){await write(()=>D(el.dataset.set).update({status:el.value,...(el.value==='تحویل‌شده'?{deliveredOn:TODAY}:{}),updatedAt:Date.now()}),el.value==='آماده تحویل'?'آماده تحویل؛ به مشتری خبر بده':'ذخیره شد');return}
  if(el.dataset.planbase){const id=el.dataset.planbase;const pl=readPlan(id);if(pl){pl.base=el.value;pl.roleLabels={...baseRoles(el.value)};pl.roleLabels.owner='مالک';pl.labels={};try{await db.doc('requests/'+id).update({plan:pl,status:'در حال برنامه‌ریزی'})}catch(e){toast('ذخیره نشد')}}return}
  if(el.id==='pe-kind'){const r=document.getElementById('pe-role');if(r){if(el.value==='specialist')r.value='specialist';else if(r.value==='specialist')r.value=TEMPLATES[ws.type]?.staffRole||'team'}return}
  if(el.id==='dayPick'){ui.day=el.value||TODAY;render();return}
  if(el.id==='ap-service'){const sv=state.services.find(x=>x.id===el.value);const pr=document.getElementById('ap-price');if(sv&&pr)pr.value=sv.price;return}
  if(el.id==='rf'||el.id==='rt'){ui.from=document.getElementById('rf').value;ui.to=document.getElementById('rt').value;render();return}
  if(el.dataset.set){const val=el.type==='number'?(+el.value||0):el.value;await write(()=>D(el.dataset.set).update({[el.dataset.field]:val,updatedAt:Date.now()}),'ذخیره شد');return}
  if(el.dataset.paid){await write(()=>D(el.dataset.paid).update({paid:el.checked,updatedAt:Date.now()}),el.checked?'پرداخت شد':'برگشت به پرداخت‌نشده');return}
  if(el.dataset.toggle){const t=state.tasks.find(x=>x.id===el.dataset.toggle);if(!t)return;
    await write(async()=>{await D('tasks/'+t.id).update({done:el.checked,doneAt:el.checked?Date.now():null,doneBy:me.id});
      if(el.checked&&t.repeat&&t.repeat!=='none'&&!t.spawned){const nd=nextDue(t);await C('tasks').add({title:t.title,from:t.from,to:t.to,due:nd,repeat:t.repeat,category:t.category||'سایر',note:t.note||'',done:false,createdAt:Date.now()});await D('tasks/'+t.id).update({spawned:true})}},
      el.checked?(t.repeat&&t.repeat!=='none'?'انجام شد، نوبت بعدی ساخته شد':'انجام شد'):'دوباره باز شد');}
});
V.addEventListener('toggle',e=>{const d=e.target;if(d.dataset&&d.dataset.reqbox){if(d.open)ui.openReq=d.dataset.reqbox;else if(ui.openReq===d.dataset.reqbox)ui.openReq=null}},true);
V.addEventListener('input',e=>{if(e.target.id==='q'){ui.q=e.target.value;render()}else if(e.target.id&&e.target.id.startsWith('gs-')){const b=document.getElementById('gs-sum');if(b)b.innerHTML=goldSumHtml(readGoldForm())}});
V.addEventListener('submit',async e=>{
  const f=e.target.closest('form.f');if(!f)return;e.preventDefault();
  if(f.dataset.form==='need'){const fd=new FormData(f);const r={};['job','name','owner','city','branches','staff','pain','repeat','privacy','phone'].forEach(k=>r[k]=String(fd.get(k)||'').trim());['income','roles','channels','daily','now','extra'].forEach(k=>r[k]=fd.getAll(k).map(String));
    r.suggest=needSuggest(r);r.uid=myUid||'';r.createdAt=Date.now();r.status='در انتظار بررسی';r.plan=draftPlan(r);needResult=r;
    if(db){try{await db.collection('requests').add(r)}catch(err){}}
    uiView='needDone';render();window.scrollTo({top:0});return}
  if(f.dataset.form==='otp'){const phone=String(new FormData(f).get('phone')||'').trim();
    try{await smarto.requestCode(phone);loginStep.phone=phone;loginStep.sent=true;render();document.getElementById('lg-code')?.focus()}
    catch(err){toast(err.code==='bad_phone'?'شماره موبایل درست نیست':err.code==='wait'?'کمی صبر کن و دوباره بخواه':err.code==='sms_failed'?'پیامک ارسال نشد، دوباره امتحان کن':'خطا، دوباره امتحان کن')}return}
  if(f.dataset.form==='verify'){const code=String(new FormData(f).get('code')||'').trim();
    try{await smarto.verify(loginStep.phone,code);toast('خوش آمدی');await afterLogin()}
    catch(err){toast(err.code==='wrong_code'?'کد اشتباه است':err.code==='expired'?'کد منقضی شده؛ دوباره بگیر':'خطا، دوباره امتحان کن')}return}
  const v={};new FormData(f).forEach((x,k)=>v[k]=String(x).trim());
  const now=Date.now();let col,data,msg='ثبت شد';
  switch(f.dataset.form){
    case 'task':col='tasks';data={title:v.title,from:me.id,to:v.to||me.id,due:v.due,repeat:v.repeat,category:v.category,note:v.note,done:false};msg=v.to&&v.to!==me.id?'برای '+pname(v.to)+' فرستاده شد':'به کارهایت اضافه شد';break;
    case 'cost':col='costs';data={title:v.title,amount:+v.amount,category:v.category,date:v.date,by:me.id};break;
    case 'salary':col='salaries';data={person:v.person,amount:+v.amount,month:v.month,paid:false};break;
    case 'idea':col='ideas';data={text:v.text,by:me.id,converted:false};break;
    case 'content':col='content';data={title:v.title,platform:v.platform,date:v.date,status:v.status};break;
    case 'sale':col='sales';data={product:v.product,color:v.color,size:v.size,qty:+v.qty||1,price:+v.price||0,channel:v.channel,date:v.date||TODAY,branch:myBranch(),by:me.id};break;
    case 'order':col='orders';data={items:v.items,note:v.note,by:me.id,branch:myBranch(),date:TODAY,status:'ثبت‌شده',amount:0};msg='سفارش فرستاده شد';break;
    case 'payment':col='payments';data={amount:+v.amount,date:v.date,note:v.note,branch:myBranch(),by:me.id,confirmed:false};msg='پرداخت ثبت شد و منتظر تأیید است';break;
    case 'create':{if(!db){toast('اتصال به سرور برقرار نیست');return}
      await write(()=>createBusiness(v),'پنل ساخته شد');return}
    case 'person':col='people';data={name:v.name,role:v.role,kind:v.kind||'employee',title:v.title||'',phone:v.phone||'',payType:v.payType||'',pay:+v.pay||0,commission:v.payType==='درصدی'?(+v.pay||0):0,branch:v.branch||''};msg=(v.kind==='specialist'?'متخصص':'کارمند')+' اضافه شد';break;
    case 'item':col=(TEMPLATES[ws.type]||{}).items||'services';data={name:v.name,price:+v.price||0};if(['shop','retail','repair'].includes(ws.type)){data.stock=+v.stock||0;data.min=+v.min||0}if(col==='menu'){data.cat='سایر';data.available=true}break;
    case 'inv':col=v.col;data={name:v.name,stock:+v.stock||0,min:+v.min||0,unit:v.unit||'',price:+v.price||0};break;
    case 'menuitem':col='menu';data={name:v.name,price:+v.price||0,cat:v.cat||'سایر',available:true};break;
    case 'check':col='checks';data={party:v.party,amount:+v.amount||0,due:v.due,kind:v.kind,note:v.note,paid:false};break;
    case 'ledger':col='ledger';data={name:v.name,phone:v.phone,amount:(v.type==='pay'?-1:1)*(+v.amount||0),date:TODAY,note:v.note||(v.type==='pay'?'دریافت':'خرید نسیه'),by:me.id};msg=v.type==='pay'?'دریافت ثبت شد':'نسیه ثبت شد';break;
    case 'job':{const n=state.jobs.reduce((a,j)=>Math.max(a,+j.code||0),1000)+1;col='jobs';data={code:String(n),date:TODAY,customer:v.customer,phone:v.phone,device:v.device,problem:v.problem,tech:v.tech,due:v.due,estimate:+v.estimate||0,deposit:+v.deposit||0,price:0,partsCost:0,status:'پذیرش‌شده',paid:false,note:'',by:me.id};msg='قبض شماره '+fmtN(n)+' ثبت شد';break}
    case 'forder':{if(!db){toast('اتصال به سرور برقرار نیست');return}
      const items=Object.keys(ui.cart).filter(k=>ui.cart[k]>0).map(id=>{const m=state.menu.find(x=>x.id===id);return m?{mid:id,name:m.name,qty:ui.cart[id],price:+m.price||0}:null}).filter(Boolean);
      if(!items.length){toast('اول از منو انتخاب کن');return}
      const ok=await write(()=>C('forders').add({date:TODAY,time:nowTime(),kind:v.kind,table:v.table,items,note:v.note,pay:v.pay,paid:!!v.pay,status:'ثبت‌شده',by:me.id,createdAt:now}),'سفارش ثبت شد');
      if(ok){ui.cart={};render()}return}
    case 'rsale':{if(!db){toast('اتصال به سرور برقرار نیست');return}
      const items=Object.keys(ui.cart).filter(k=>ui.cart[k]>0).map(id=>{const p=state.products.find(x=>x.id===id);return p?{pid:id,name:p.name,qty:ui.cart[id],price:+p.price||0,cost:+p.cost||0}:null}).filter(Boolean);
      const amount=items.length?items.reduce((a,i)=>a+i.qty*i.price,0):+v.amount||0;
      if(!amount){toast('مبلغ را بنویس');return}
      if(v.method==='نسیه'&&!v.customer){toast('برای نسیه نام مشتری را بنویس');return}
      const ok=await write(async()=>{await C('rsales').add({date:TODAY,time:nowTime(),items,amount,method:v.method,customer:v.customer||'',by:me.id,createdAt:now});
        if(v.method==='نسیه')await C('ledger').add({name:v.customer,phone:'',amount,date:TODAY,note:'خرید نسیه',by:me.id,createdAt:now});
        for(const i of items){const p=state.products.find(x=>x.id===i.pid);if(p)await D('products/'+p.id).update({stock:Math.max(0,(+p.stock||0)-i.qty),updatedAt:now})}},'فروش ثبت شد');
      if(ok){ui.cart={};resetForm(f);render()}return}
    case 'sorder':{
      if(!db){toast('اتصال به سرور برقرار نیست');return}
      const items=[1,2,3].map(n=>{const p=state.products.find(x=>x.id===v['p'+n]);return p?{pid:p.id,name:p.name,qty:Math.max(1,+toEn(v['q'+n])||1),price:+p.price||0}:null}).filter(Boolean);
      if(!items.length){toast('حداقل یک محصول انتخاب کن');return}
      const fee=+v.fee||0;
      const ok=await write(async()=>{await C('sorders').add({date:TODAY,customer:v.customer,phone:v.phone,city:v.city,channel:v.channel,items,ship:v.ship,fee,status:v.status||'جدید',tracking:'',by:me.id,createdAt:now});
        for(const i of items){const p=state.products.find(x=>x.id===i.pid);if(p)await D('products/'+p.id).update({stock:Math.max(0,(+p.stock||0)-i.qty),updatedAt:now})}},'سفارش ثبت شد');
      if(ok)resetForm(f);return}
    case 'plan':{if(!db){toast('اتصال به سرور برقرار نیست');return}
      const items=parsePlanItems(v.items);if(!items.length){toast('حداقل یک درمان بنویس');return}
      const ok=await write(async()=>{let c=state.clients.find(x=>x.name===v.client);let cid=c&&c.id;
        if(!cid){const ref=await C('clients').add({name:v.client,phone:v.phone||'',note:'',fileNo:String(1000+state.clients.length+1),createdAt:now});cid=ref.id}
        await C('plans').add({clientId:cid,clientName:v.client,phone:v.phone||(c&&c.phone)||'',dentist:v.dentist||'',date:TODAY,items,discount:+v.discount||0,payments:+v.prepay?[{date:TODAY,amount:+v.prepay,by:me.id}]:[],status:'در حال درمان',note:v.note||'',by:me.id,createdAt:now})},'طرح درمان ثبت شد');
      if(ok)resetForm(f);return}
    case 'gitem':col='products';data={name:v.name,weight:toNum(v.weight),karat:+v.karat||750,wage:toNum(v.wage),stock:+v.stock||0,min:0};break;
    case 'gsale':{if(!db){toast('اتصال به سرور برقرار نیست');return}
      const c=goldCalc(v);if(!toNum(v.weight)||!c.amount){toast('وزن و نرخ را بنویس');return}
      if(v.method==='نسیه'&&!v.customer){toast('برای نسیه نام مشتری را بنویس');return}
      const p=state.products.find(x=>x.id===v.pid);
      const ok=await write(async()=>{await C('gsales').add({kind:'فروش',date:TODAY,time:nowTime(),pid:p?p.id:'',name:v.name||(p&&p.name)||'',weight:toNum(v.weight),karat:+v.karat||750,rate:+v.rate||0,wage:toNum(v.wage),profit:toNum(v.profit),tax:toNum(v.tax),wageAmt:c.wageAmt,profitAmt:c.profitAmt,taxAmt:c.taxAmt,amount:c.amount,method:v.method,customer:v.customer||'',by:me.id,createdAt:now});
        if(v.method==='نسیه')await C('ledger').add({name:v.customer,phone:'',amount:c.amount,date:TODAY,note:'خرید طلا',by:me.id,createdAt:now});
        if(p)await D('products/'+p.id).update({stock:Math.max(0,(+p.stock||0)-1),updatedAt:now})},'فاکتور '+fmtN(c.amount)+' تومان ثبت شد');
      if(ok){resetForm(f);render()}return}
    case 'gbuy':{const w=toNum(v.weight);col='gsales';data={kind:'خرید',date:TODAY,time:nowTime(),name:'طلای کهنه',weight:w,karat:+v.karat||750,rate:+v.rate||0,amount:Math.round(w*(+v.rate||0)*((+v.karat||750)/750)/1000)*1000,customer:v.customer||'',note:v.note||'',by:me.id};if(!data.amount){toast('وزن و نرخ را بنویس');return}msg='خرید '+fmtG(w)+' گرم ثبت شد';break}
    case 'listing':{const n=state.listings.reduce((a,l)=>Math.max(a,+l.code||0),100)+1;col='listings';data={code:String(n),deal:v.deal,kind:v.kind,region:v.region,area:+v.area||0,rooms:+v.rooms||0,price:+v.price||0,deposit:+v.deposit||0,rent:+v.rent||0,owner:v.owner,ownerPhone:v.ownerPhone,agent:v.agent||me.id,note:v.note,status:'فعال',date:TODAY,by:me.id};msg='فایل '+fmtN(n)+' ثبت شد';break}
    case 'buyer':col='clients';data={name:v.name,phone:v.phone,want:v.want,kind:v.kind,region:v.region,budget:+v.budget||0,deposit:+v.deposit||0,rent:+v.rent||0,agent:v.agent||me.id,note:v.note,status:'فعال',date:TODAY,by:me.id};msg='مشتری ثبت شد';break;
    case 'visit':{const l=state.listings.find(x=>x.id===v.listing);if(!l){toast('فایل را انتخاب کن');return}col='visits';data={date:v.date||TODAY,time:v.time,listing:l.id,listingTitle:fmtN(l.code)+' · '+lTitle(l),client:v.client,agent:v.agent||me.id,note:v.note,result:'برنامه‌ریزی‌شده',by:me.id};msg='بازدید ثبت شد';break}
    case 'deal':{if(!db){toast('اتصال به سرور برقرار نیست');return}
      const l=state.listings.find(x=>x.id===v.listing);if(!l){toast('فایل را انتخاب کن');return}
      const cl=state.clients.find(x=>x.name===v.client&&x.status==='فعال');
      const ok=await write(async()=>{await C('deals').add({date:v.date||TODAY,listing:l.id,title:fmtN(l.code)+' · '+lTitle(l),kind:l.deal,client:v.client,amount:+v.amount||(isRent(l)?+l.deposit:+l.price)||0,rent:+v.rent||(isRent(l)?+l.rent||0:0),commission:+v.commission||0,agent:v.agent||me.id,agentShare:+v.agentShare||0,endDate:v.endDate||'',paid:false,by:me.id,createdAt:now});
        await D('listings/'+l.id).update({status:'قرارداد شد',updatedAt:now});
        if(cl)await D('clients/'+cl.id).update({status:'به نتیجه رسید',updatedAt:now})},'قرارداد ثبت شد');
      if(ok)resetForm(f);return}
    case 'client':col='clients';data={name:v.name,phone:v.phone,note:v.note,fileNo:isMed()?String(1000+state.clients.length+1):''};break;
    case 'appt':{
      if(!db){toast('اتصال به سرور برقرار نیست');return}
      const sv=state.services.find(x=>x.id===v.service);
      const ok=await write(async()=>{let c=state.clients.find(x=>x.name===v.client);let cid=c&&c.id;
        if(!cid){const ref=await C('clients').add({name:v.client,phone:v.phone||'',note:'',fileNo:isMed()?String(1000+state.clients.length+1):'',createdAt:now});cid=ref.id}
        await C('appointments').add({date:v.date,time:v.time,clientId:cid,clientName:v.client,serviceId:v.service,serviceName:sv?sv.name:'',staff:v.staff,price:+v.price||(sv?+sv.price:0),status:'رزرو',paid:false,note:'',by:me.id,createdAt:now})},'نوبت ثبت شد');
      if(ok)resetForm(f);return}
    default:return;
  }
  data.createdAt=now;
  const ok=await write(()=>C(col).add(data),msg);
  if(ok)resetForm(f);
});
async function write(fn,msg){
  if(!db){toast('اتصال به سرور برقرار نیست');return false}
  try{await fn();toast(msg);return true}catch(err){toast(err&&err.code==='login_required'?'اول وارد حسابت شو':err&&err.code==='permission_denied'?(ws&&ws.example?'این نمونه فقط برای تماشاست':'اجازه این کار را نداری'):'ذخیره نشد، دوباره امتحان کن');return false}
}

// ---------- boot ----------
let myPhone=null, loginStep={phone:'',sent:false,next:null}, reqUnsub=null, wsFirst=true;
function subscribeAccountData(){
  if(reqUnsub){reqUnsub();reqUnsub=null}needReqs=[];
  if(myUid)reqUnsub=db.collection('requests').onSnapshot(snap=>{needReqs=snap.docs.map(d=>({id:d.id,...d.data()}));if(!ws&&!(document.activeElement&&document.activeElement.closest&&document.activeElement.closest('form[data-form=plan]')))render()},()=>{});
}
async function loadAccount(){
  let u={id:null};try{u=await smarto.me()}catch(e){}
  myUid=u.id||null;myPhone=u.phone||null;amOwner=!!u.isAdmin;renderAcct();
}
function renderAcct(){const b=document.getElementById('acct');b.hidden=false;b.textContent=myUid?'حساب من':'ورود'}
render();
(async()=>{
  db=window.smarto.db;smarto.start();
  await loadAccount();
  subscribeAccountData();
  db.collection('jobtypes').onSnapshot(snap=>{jobTypes=snap.docs.map(d=>({id:d.id,...d.data()})).sort((a,b)=>(a.createdAt||0)-(b.createdAt||0));if(!ws)render()},()=>{});
  db.collection('workspaces').onSnapshot(snap=>{workspaces=snap.docs.map(d=>({id:d.id,...d.data()})).sort((a,b)=>(a.order||0)-(b.order||0)||(a.createdAt||0)-(b.createdAt||0));
    if(wsFirst){wsFirst=false;const last=workspaces.find(x=>x.id===ls.get('ws'));if(last){openWs(last);return}}
    if(ws){const w=workspaces.find(x=>x.id===ws.id);if(w)ws=w;else if(!ws.creating){closeWs();return}renderWs()}else render()},()=>{toast('خطا در خواندن داده‌ها')});
})();
async function afterLogin(){
  await loadAccount();smarto.reconnect();subscribeAccountData();
  const next=loginStep.next;loginStep={phone:'',sent:false,next:null};
  uiView=next||'landing';render();window.scrollTo({top:0});
}
function needLogin(next){loginStep={phone:'',sent:false,next};uiView='login';render();window.scrollTo({top:0})}
function scrLogin(){
  return `
  <div class="row"><h2>ورود یا ثبت‌نام</h2><button class="lnk" data-landing="1">انصراف</button></div>
  <p class="muted" style="margin:0">با شماره موبایلت وارد شو. اگر صاحب کسب‌وکار شماره‌ات را در تیم ثبت کرده باشد، بعد از ورود پنل آن کسب‌وکار را هم می‌بینی.</p>
  ${loginStep.sent?`<form class="f card" data-form="verify" style="padding:14px">
      <p class="full small muted" style="margin:0">کد ۵ رقمی به ${esc(loginStep.phone)} پیامک شد.</p>
      <label class="full">کد ورود<input id="lg-code" name="code" inputmode="numeric" autocomplete="one-time-code" maxlength="5" required></label>
      <button class="btn full">ورود</button>
      <button type="button" class="lnk full" data-relogin="1">تغییر شماره یا ارسال دوباره</button></form>`
  :`<form class="f card" data-form="otp" style="padding:14px">
      <label class="full">شماره موبایل<input id="lg-phone" name="phone" inputmode="tel" autocomplete="tel" placeholder="0912…" required value="${esc(loginStep.phone)}"></label>
      <button class="btn full">دریافت کد</button></form>`}`;
}
function scrAccount(){
  const mine=workspaces.filter(w=>w._access==='owner'||w._access==='member');
  return `
  <div class="row"><h2>حساب من</h2><button class="lnk" data-landing="1">بازگشت</button></div>
  <section class="card"><div class="row"><span class="t">${esc(myPhone||'')}</span>${amOwner?'<span class="pill p-info">مدیر سامانه</span>':''}</div>
    <div class="m">${fmtN(mine.length)} کسب‌وکار</div></section>
  <button class="btn" data-logout="1" style="justify-self:start;background:var(--bad)">خروج از حساب</button>`;
}
function openWs(w){
  unsubs.forEach(u=>{try{u()}catch(e){}});unsubs=[];ws=w;ls.set('ws',w.id);resetState();loaded=new Set();me=null;ui.screen=null;ui.taskTab='received';ui.taskCat='همه';ui.day=TODAY;ui.staffF='همه';ui.q='';ui.ost='همه';ui.jst='باز';ui.cart={};ui.mcat='';ui.source='all';ui.ldeal='همه';ui.lst='فعال';ui.lmine=false;ui.cst='فعال';ui.pst='در حال درمان';armed=null;
  const cols=colsFor(w.type);
  render();
  cols.forEach(c=>unsubs.push(C(c).onSnapshot(snap=>{if(!ws||ws.id!==w.id)return;state[c]=snap.docs.map(d=>({id:d.id,...d.data()}));loaded.add(c);if(loaded.size>=2)render()},()=>toast('خطا در خواندن داده‌ها'))));
}
document.getElementById('back').addEventListener('click',closeWs);
document.getElementById('acct').addEventListener('click',()=>{if(ws)closeWs();if(!myUid)needLogin(null);else{uiView='account';render();window.scrollTo({top:0})}});
document.getElementById('gear').addEventListener('click',()=>{ui.screen='settings';armed=null;render();window.scrollTo({top:0})});
(()=>{
})();
