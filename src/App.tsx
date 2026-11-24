import { useState } from 'react'
import teamPhoto from './assets/djavushare-team.png'

type Knowledge = {
  title: string
  category: string
  format: string
  duration: string
  description: string
  tone: string
  icon: string
}

const avatars: Record<string, string> = {
  Rina: 'https://i.pravatar.cc/120?img=32',
  Budi: 'https://i.pravatar.cc/120?img=11',
  Sari: 'https://i.pravatar.cc/120?img=47',
  Andi: 'https://i.pravatar.cc/120?img=12',
  Dimas: 'https://i.pravatar.cc/120?img=15',
  Nisa: 'https://i.pravatar.cc/120?img=44',
}

function Icon({ name, size = 20 }: { name: string; size?: number }) {
  const p: Record<string, React.ReactNode> = {
    leaf: <><path d="M20 4C12 4 5 7 5 14c0 3 2 5 5 5 7 0 10-7 10-15Z" /><path d="M4 21c2-6 6-10 12-13" /></>,
    bell: <><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" /><path d="M10 21h4" /></>,
    book: <><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z" /></>,
    bulb: <><path d="M9 18h6M10 22h4" /><path d="M8.5 14.5a7 7 0 1 1 7 0c-.9.8-1.5 1.8-1.5 3.5h-4c0-1.7-.6-2.7-1.5-3.5Z" /></>,
    spark: <path d="m12 2 1.4 6.6L20 10l-6.6 1.4L12 18l-1.4-6.6L4 10l6.6-1.4L12 2Z" />,
    search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></>,
    arrow: <path d="m5 12 14 0m-6-6 6 6-6 6" />,
    plus: <path d="M12 5v14M5 12h14" />,
    play: <><circle cx="12" cy="12" r="9" /><path d="m10 8 6 4-6 4V8Z" /></>,
    image: <><rect x="3" y="4" width="18" height="16" rx="2" /><circle cx="8" cy="9" r="1" /><path d="m21 15-5-5L5 20" /></>,
    list: <><path d="M9 6h11M9 12h11M9 18h11" /><path d="m4 6 .5.5L6 5m-2 7 .5.5L6 11m-2 7 .5.5L6 17" /></>,
    clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
    heart: <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z" />,
    message: <path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v8Z" />,
    check: <path d="m5 12 4 4L19 6" />,
    user: <><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></>,
    shield: <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" /><path d="m9 12 2 2 4-4" /></>,
    x: <path d="m6 6 12 12M18 6 6 18" />,
    send: <><path d="m22 2-7 20-4-9-9-4 20-7Z" /><path d="M22 2 11 13" /></>,
    phone: <path d="M22 16.9v3a2 2 0 0 1-2.2 2A19.8 19.8 0 0 1 3.1 5.2 2 2 0 0 1 5.1 3h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.9a2 2 0 0 1-.5 2.1L9.1 11a16 16 0 0 0 4 4l1.3-1.3a2 2 0 0 1 2.1-.5 13 13 0 0 0 2.9.7 2 2 0 0 1 1.7 2Z" />,
    trophy: <><path d="M8 21h8M12 17v4M7 4h10v4a5 5 0 0 1-10 0V4Z" /><path d="M7 6H3v1a4 4 0 0 0 4 4M17 6h4v1a4 4 0 0 1-4 4" /></>,
    coffee: <><path d="M4 8h13v7a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5V8Z" /><path d="M17 10h2a3 3 0 0 1 0 6h-2M7 3v2m4-2v2m4-2v2" /></>,
    menu: <path d="M4 7h16M4 12h16M4 17h16" />,
    chevron: <path d="m9 18 6-6-6-6" />,
  }
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{p[name]}</svg>
}

function Avatar({ name, size = 42 }: { name: string; size?: number }) {
  return <img className="avatar" src={avatars[name] || avatars.Rina} alt={name} style={{ width: size, height: size }} />
}

const knowledge: Knowledge[] = [
  { title: 'Cara Menangani Komplain Pelanggan', category: 'Pelanggan', format: '4 langkah visual', duration: '1 menit', description: 'Dengarkan, pahami, tawarkan solusi, lalu pastikan pelanggan merasa terbantu.', tone: 'amber', icon: 'message' },
  { title: 'Panduan Closing Kasir', category: 'Kasir', format: 'Checklist', duration: '2 menit', description: 'Urutan singkat agar pencatatan dan uang kas selalu sesuai di akhir shift.', tone: 'green', icon: 'list' },
  { title: 'Takaran & Penyajian Produk', category: 'Produk', format: 'Foto langkah', duration: '2 menit', description: 'Panduan takaran untuk menjaga rasa dan tampilan produk tetap konsisten.', tone: 'peach', icon: 'coffee' },
  { title: 'Cara Mengecek Stok Harian', category: 'Stok', format: 'Infografis', duration: '1 menit', description: 'Cek cepat bahan utama sebelum dan sesudah pergantian shift.', tone: 'blue', icon: 'image' },
  { title: 'Menghadapi Antrean Jam Ramai', category: 'SOP Operasional', format: 'Video pendek', duration: '2 menit', description: 'Pembagian peran sederhana agar pesanan tetap cepat dan akurat.', tone: 'olive', icon: 'play' },
  { title: 'Cara Menggunakan Peralatan Baru', category: 'SOP Operasional', format: 'Tutorial visual', duration: '3 menit', description: 'Langkah aman mengoperasikan dan membersihkan alat baru.', tone: 'sand', icon: 'spark' },
]

const initialIdeas = [
  { title: 'Checklist stok sebelum pergantian shift', author: 'Budi', date: 'Hari ini', category: 'Stok', problem: 'Stok bahan kadang baru diketahui habis ketika shift berikutnya mulai.', solution: 'Gunakan checklist 5 bahan utama, diisi 10 menit sebelum pergantian.', agree: 6, discuss: 1, status: 'Masuk Briefing', candidate: true },
  { title: 'Promo bundling saat jam sepi', author: 'Sari', date: 'Kemarin', category: 'Promo', problem: 'Kunjungan pelanggan berkurang setelah jam makan siang.', solution: 'Coba bundling minuman dan camilan khusus pukul 14.00–16.00.', agree: 5, discuss: 2, status: 'Sedang Dicoba', candidate: false },
  { title: 'Posisi meja kasir agar antrean lebih lancar', author: 'Anonim', date: '2 hari lalu', category: 'Operasional', problem: 'Antrean menghalangi jalur pengambilan pesanan saat ramai.', solution: 'Geser meja kasir 50 cm dan tambah penanda jalur antre.', agree: 7, discuss: 1, status: 'Ide Baru', candidate: true },
]

function Header({ notifications, setNotifications }: { notifications: boolean; setNotifications: (v: boolean) => void }) {
  const [mobile, setMobile] = useState(false)
  const go = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setMobile(false)
  }
  return <header className="header">
    <div className="header-inner">
      <button className="brand" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}><span><Icon name="leaf" size={22} /></span><div><strong>DjavuShare</strong><small>Berbagi ilmu, berkembang bersama.</small></div></button>
      <nav className={mobile ? 'open' : ''}>
        <button onClick={() => go('papan-info')}>Papan Info</button>
        <button onClick={() => go('kotak-ide')}>Kotak Ide</button>
        <button onClick={() => go('tantangan')}>Tantangan Mingguan</button>
        <button onClick={() => go('tanya-rekan')}>Tanya Rekan</button>
      </nav>
      <div className="header-actions"><button className="notify" onClick={() => setNotifications(!notifications)} aria-label="Notifikasi"><Icon name="bell" size={20} /><i /></button><div className="profile-pill"><Avatar name="Rina" size={34} /><span><b>Rina</b><small>Shift Pagi</small></span></div><button className="menu-button" onClick={() => setMobile(!mobile)}><Icon name={mobile ? 'x' : 'menu'} /></button></div>
      {notifications && <div className="notification-panel"><div><b>Kabar terbaru</b><button onClick={() => setNotifications(false)}><Icon name="x" size={17} /></button></div><p><span className="dot amber-dot" />Ide Budi masuk briefing Jumat ini.</p><p><span className="dot green-dot" />SOP Closing Kasir baru saja diperbarui.</p><p><span className="dot sage-dot" />Sari membagikan tips baru untuk jam ramai.</p></div>}
    </div>
  </header>
}

function SectionTitle({ eyebrow, title, text, action }: { eyebrow: string; title: string; text: string; action?: React.ReactNode }) {
  return <div className="section-title"><div><span>{eyebrow}</span><h2>{title}</h2><p>{text}</p></div>{action}</div>
}

function Hero({ onIdea, onTip }: { onIdea: () => void; onTip: () => void }) {
  return <section className="hero">
    <div className="hero-copy"><span className="greeting"><i /> Selamat pagi, Rina</span><h1>Kerja lebih mudah saat ilmu <em>dibagikan bersama.</em></h1><p>Temukan panduan cepat, sampaikan ide dari lapangan, dan saling bantu dalam satu ruang sederhana.</p><div className="hero-actions"><button className="primary" onClick={() => document.getElementById('papan-info')?.scrollIntoView({ behavior: 'smooth' })}><Icon name="search" size={18} /> Cari Panduan</button><button className="secondary" onClick={onIdea}><Icon name="plus" size={18} /> Sampaikan Ide</button></div><div className="team-note"><div className="avatar-stack"><Avatar name="Budi" size={30} /><Avatar name="Sari" size={30} /><Avatar name="Andi" size={30} /><span>+5</span></div><p><b>8 rekan kerja</b> aktif berbagi minggu ini</p></div></div>
    <div className="hero-visual"><img src={teamPhoto} alt="Tim Djavu berbagi ide saat briefing" /><div className="hero-float"><span><Icon name="bulb" size={18} /></span><div><small>Ide terbaru</small><b>Checklist stok pergantian shift</b></div></div><button className="tip-float" onClick={onTip}><Icon name="spark" size={17} /> Bagikan tips cepat</button></div>
  </section>
}

function ActivitySummary() {
  return <section className="activity-summary"><div><span className="summary-icon green"><Icon name="message" /></span><p><b>12</b><small>Tips minggu ini</small></p></div><div><span className="summary-icon amber"><Icon name="bulb" /></span><p><b>8</b><small>Ide terkumpul</small></p></div><div><span className="summary-icon sage"><Icon name="check" /></span><p><b>3</b><small>Ide sudah dicoba</small></p></div><div><span className="summary-icon peach"><Icon name="book" /></span><p><b>48×</b><small>SOP dibuka</small></p></div></section>
}

function Challenge() {
  const [answer, setAnswer] = useState('')
  const [sent, setSent] = useState(false)
  return <section id="tantangan" className="challenge">
    <div className="challenge-icon"><Icon name="spark" size={31} /><i /><i /></div>
    <div className="challenge-copy"><span>TANTANGAN MINGGU INI · 19–25 MEI</span><h2>Bagian mana dari pekerjaan minggu ini yang paling sering bikin lambat?</h2><p>Yuk, temukan satu hal kecil yang bisa kita perbaiki bersama.</p></div>
    <div className="challenge-form">{sent ? <div className="challenge-success"><span><Icon name="check" /></span><div><b>Jawabanmu sudah dibagikan</b><small>Terima kasih sudah membantu tim berkembang.</small></div><button onClick={() => { setSent(false); setAnswer('') }}>Tulis lagi</button></div> : <><label><textarea value={answer} onChange={e => setAnswer(e.target.value)} placeholder="Tulis jawaban singkatmu di sini..." /><small>{answer.length}/180</small></label><button disabled={!answer.trim()} onClick={() => setSent(true)}>Bagikan Jawaban <Icon name="send" size={16} /></button><p><Avatar name="Sari" size={22} /><b>Sari + 3 rekan</b> sudah berbagi jawaban</p></>}</div>
  </section>
}

function KnowledgeSection({ open }: { open: (k: Knowledge) => void }) {
  const [category, setCategory] = useState('Semua')
  const [query, setQuery] = useState('')
  const categories = ['Semua', 'SOP Operasional', 'Produk', 'Kasir', 'Pelanggan', 'Stok', 'Tips Kerja']
  const filtered = knowledge.filter(k => (category === 'Semua' || k.category === category) && `${k.title} ${k.description}`.toLowerCase().includes(query.toLowerCase()))
  return <section id="papan-info" className="content-section">
    <SectionTitle eyebrow="PANDUAN PRAKTIS" title="Papan Info & SOP Kilat" text="Panduan singkat untuk membantu pekerjaan sehari-hari." action={<label className="search-box"><Icon name="search" size={17} /><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Cari panduan..." /></label>} />
    <div className="chips">{categories.map(c => <button key={c} className={category === c ? 'active' : ''} onClick={() => setCategory(c)}>{c}</button>)}</div>
    <div className="knowledge-grid">{filtered.map(k => <button className="knowledge-card" key={k.title} onClick={() => open(k)}><div className={`knowledge-art ${k.tone}`}><span className="format"><Icon name={k.icon} size={14} /> {k.format}</span><div className="art-symbol"><Icon name={k.icon} size={38} /></div><i /><i /></div><div className="knowledge-body"><span className="category">{k.category}</span><h3>{k.title}</h3><p>{k.description}</p><div><span><Icon name="clock" size={14} /> {k.duration}</span><b>Buka panduan <Icon name="arrow" size={15} /></b></div></div></button>)}</div>
    {!filtered.length && <div className="empty"><span><Icon name="search" /></span><b>Panduan belum ditemukan</b><p>Coba kata kunci atau kategori lainnya.</p></div>}
  </section>
}

function KnowledgeModal({ item, close }: { item: Knowledge; close: () => void }) {
  const [helpful, setHelpful] = useState(false)
  return <div className="modal-backdrop" onMouseDown={e => e.target === e.currentTarget && close()}><div className="knowledge-modal">
    <div className={`modal-visual ${item.tone}`}><button onClick={close}><Icon name="x" /></button><span><Icon name={item.icon} size={42} /></span><small>{item.format} · {item.duration}</small></div>
    <div className="modal-content"><span className="category">{item.category}</span><h2>{item.title}</h2><p className="intro">{item.description}</p><div className="steps"><h3>Ikuti langkah sederhana ini</h3>{['Dengarkan dan pahami situasi terlebih dahulu.', 'Ikuti urutan kerja sesuai panduan visual.', 'Pastikan hasil sudah sesuai sebelum selesai.', 'Jika ragu, tanyakan rekan yang sedang bertugas.'].map((s, i) => <div key={s}><span>{i + 1}</span><p>{s}</p></div>)}</div><div className="important"><Icon name="shield" size={20} /><p><b>Catatan penting</b>Utamakan keamanan dan jangan ragu meminta bantuan saat ada kendala.</p></div><div className="modal-actions"><button className={helpful ? 'helpful' : ''} onClick={() => setHelpful(!helpful)}><Icon name="heart" size={18} /> {helpful ? 'Terima kasih!' : 'Bermanfaat'}</button><button className="primary" onClick={close}>Selesai dibaca <Icon name="check" size={16} /></button></div></div>
  </div></div>
}

function IdeasSection({ openForm }: { openForm: () => void }) {
  const [ideas, setIdeas] = useState(initialIdeas)
  const [tab, setTab] = useState('Semua')
  const react = (index: number, type: 'agree' | 'discuss') => setIdeas(ideas.map((x, i) => i === index ? { ...x, [type]: x[type] + 1 } : x))
  return <section id="kotak-ide" className="ideas-section">
    <div className="ideas-inner"><SectionTitle eyebrow="RUANG AMAN UNTUK BERBAGI" title="Kotak Ide & Solusi Lapangan" text="Punya ide kecil untuk bikin kerja lebih mudah? Ceritakan di sini." action={<button className="primary amber-button" onClick={openForm}><Icon name="plus" size={18} /> Sampaikan Ide</button>} />
      <div className="safety-note"><span><Icon name="shield" size={19} /></span><p><b>Masukanmu dihargai.</b> Kamu boleh menyampaikan ide tanpa mencantumkan nama.</p></div>
      <div className="idea-toolbar"><div>{['Semua', 'Ide Baru', 'Masuk Briefing', 'Sedang Dicoba'].map(t => <button className={tab === t ? 'active' : ''} onClick={() => setTab(t)} key={t}>{t}</button>)}</div><span>{ideas.length} ide dari tim</span></div>
      <div className="idea-list">{ideas.filter(i => tab === 'Semua' || i.status === tab).map((idea, index) => <article className={`idea-card ${idea.candidate ? 'candidate' : ''}`} key={idea.title}>{idea.candidate && <div className="candidate-label"><Icon name="bulb" size={14} /> Kandidat Briefing Mingguan</div>}<div className="idea-head"><div>{idea.author === 'Anonim' ? <span className="anon-avatar"><Icon name="user" size={17} /></span> : <Avatar name={idea.author} size={36} />}<p><b>{idea.author}</b><small>{idea.date} · {idea.category}</small></p></div><span className={`status ${idea.status.toLowerCase().replace(' ', '-')}`}>{idea.status}</span></div><h3>{idea.title}</h3><div className="idea-copy"><p><span>Masalah</span>{idea.problem}</p><p><span>Ide solusi</span>{idea.solution}</p></div><div className="idea-actions"><button onClick={() => react(index, 'agree')}><Icon name="heart" size={17} /> Setuju <b>{idea.agree}</b></button><button onClick={() => react(index, 'discuss')}><Icon name="message" size={17} /> Butuh diskusi <b>{idea.discuss}</b></button><button className="detail-link">Lihat obrolan <Icon name="chevron" size={15} /></button></div></article>)}</div>
    </div>
  </section>
}

function IdeaModal({ close, submit }: { close: () => void; submit: () => void }) {
  const [anonymous, setAnonymous] = useState(false)
  return <div className="modal-backdrop" onMouseDown={e => e.target === e.currentTarget && close()}><div className="idea-modal"><div className="form-head"><span><Icon name="bulb" /></span><div><small>IDE KECIL, DAMPAK BESAR</small><h2>Sampaikan idemu</h2><p>Cukup ceritakan masalah dan solusi sederhananya.</p></div><button onClick={close}><Icon name="x" /></button></div><div className="idea-form"><label>Judul ide<input placeholder="Contoh: Checklist stok sebelum ganti shift" /></label><label>Masalah yang kamu temui<textarea placeholder="Apa yang membuat pekerjaan terhambat?" /></label><label>Solusi yang kamu usulkan<textarea placeholder="Menurutmu, apa yang bisa kita coba?" /></label><label>Kategori<select><option>Operasional</option><option>Produk</option><option>Pelanggan</option><option>Stok</option><option>Promo</option><option>Lainnya</option></select></label><div className="anonymous-toggle"><span><Icon name="shield" size={19} /></span><p><b>Kirim secara anonim</b><small>Namamu tidak akan ditampilkan pada ide.</small></p><button className={anonymous ? 'on' : ''} onClick={() => setAnonymous(!anonymous)}><i /></button></div></div><div className="form-footer"><p><Icon name="heart" size={15} /> Semua ide akan dibaca dan dihargai.</p><div><button className="cancel" onClick={close}>Batal</button><button className="primary amber-button" onClick={submit}>Kirim Ide <Icon name="send" size={16} /></button></div></div></div></div>
}

function TipsSection({ openForm }: { openForm: () => void }) {
  const [likes, setLikes] = useState([4, 6, 3])
  const tips = [
    ['Sari', 'Kalau antrean mulai ramai, ulangi pesanan pelanggan sebelum pembayaran. Ini mengurangi pesanan salah saat suasana sibuk.', 'Hari ini'],
    ['Budi', 'Tulis stok yang hampir habis di papan kecil dekat gudang supaya shift berikutnya langsung tahu apa yang perlu dicek.', 'Kemarin'],
    ['Andi', 'Bersihkan ujung steam wand segera setelah dipakai. Noda susu jadi jauh lebih mudah dibersihkan.', '2 hari lalu'],
  ]
  return <section className="content-section tips-section"><SectionTitle eyebrow="BERBAGI DALAM 30 DETIK" title="Tips Hari Ini" text="Hal kecil yang kamu tahu mungkin sangat membantu rekan lain." action={<button className="outline-button" onClick={openForm}><Icon name="plus" size={17} /> Bagikan tips singkat</button>} /><div className="tips-grid">{tips.map((t, i) => <article className="tip-card" key={t[1]}><div><Avatar name={t[0]} size={34} /><p><b>{t[0]}</b><small>{t[2]}</small></p><span><Icon name="spark" size={16} /></span></div><blockquote>“{t[1]}”</blockquote><button onClick={() => setLikes(likes.map((x, n) => n === i ? x + 1 : x))}><Icon name="heart" size={16} /> Membantu <b>{likes[i]}</b></button></article>)}</div></section>
}

function TipModal({ close, submit }: { close: () => void; submit: () => void }) {
  const [text, setText] = useState('')
  return <div className="modal-backdrop"><div className="tip-modal"><button className="close" onClick={close}><Icon name="x" /></button><span><Icon name="spark" /></span><h2>Bagikan tips singkat</h2><p>Trik sederhana dari pengalamanmu bisa memudahkan kerja teman lain.</p><textarea autoFocus maxLength={240} value={text} onChange={e => setText(e.target.value)} placeholder="Contoh: Saat jam ramai, siapkan..." /><small>{text.length}/240 karakter</small><div><button className="cancel" onClick={close}>Batal</button><button className="primary" disabled={!text.trim()} onClick={submit}>Bagikan Tips</button></div></div></div>
}

const coworkers = [
  ['Budi', 'Shift Pagi', 'Ahli stok & supplier', '628121234567'],
  ['Sari', 'Shift Siang', 'Konten, promo & kasir', '628121234568'],
  ['Andi', 'Shift Pagi', 'Peralatan & troubleshooting', '628121234569'],
  ['Nisa', 'Shift Sore', 'Produk & pelayanan', '628121234570'],
]

function PeerSection() {
  return <section id="tanya-rekan" className="content-section peer-section"><SectionTitle eyebrow="SALING BANTU" title="Tanya Rekan" text="Temukan teman yang bisa bantu kamu." /><div className="peer-grid">{coworkers.map(c => <article className="peer-card" key={c[0]}><div className="peer-photo"><Avatar name={c[0]} size={68} /><i /></div><h3>{c[0]}</h3><span>{c[1]}</span><p>{c[2]}</p><a href={`https://wa.me/${c[3]}?text=Hai%20${c[0]}%2C%20boleh%20minta%20bantuan%3F`} target="_blank" rel="noreferrer"><Icon name="phone" size={16} /> Chat WhatsApp</a></article>)}</div></section>
}

function Contributors() {
  const [detail, setDetail] = useState('')
  return <section className="contributors"><SectionTitle eyebrow="APRESIASI SEDERHANA" title="Kontributor Bulan Ini" text="Terima kasih sudah membantu tim berkembang." /><div className="contributor-grid"><button className="contributor-card main" onClick={() => setDetail('Budi')}><span className="award-icon"><Icon name="trophy" /></span><Avatar name="Budi" size={64} /><div><span>KONTRIBUTOR BULAN INI</span><h3>Budi Santoso</h3><p>Membantu tim menemukan cara cek stok yang lebih efisien dan mudah diikuti semua shift.</p><small><b>5</b> panduan dibagikan · <b>2</b> ide dicoba</small></div><i>Traktiran makan tim</i></button><button className="contributor-card" onClick={() => setDetail('Sari')}><span className="award-icon spark"><Icon name="spark" /></span><Avatar name="Sari" size={64} /><div><span>IDE PALING MEMBANTU</span><h3>Sari Wulandari</h3><p>Usulan promo bundling yang menghidupkan kembali jam sepi.</p><small><b>7</b> rekan mendukung</small></div><i>Voucher kopi</i></button></div><div className="reward-note"><Icon name="heart" size={18} /><p>Apresiasi bulan ini: <b>voucher pulsa, traktiran makan, voucher kopi,</b> dan ucapan langsung dari owner.</p></div>{detail && <div className="toast"><span><Icon name="trophy" size={17} /></span><p><b>{detail}, terima kasih!</b>Kontribusimu membuat kerja tim lebih ringan.</p><button onClick={() => setDetail('')}><Icon name="x" size={16} /></button></div>}</section>
}

function Footer() {
  return <footer><div className="footer-brand"><span><Icon name="leaf" /></span><div><b>DjavuShare</b><small>Berbagi ilmu, menemukan solusi, berkembang bersama.</small></div></div><p>Dibuat untuk tim Djavu · <button>Bantuan</button> · <button>Beri masukan</button></p></footer>
}

export default function App() {
  const [knowledgeItem, setKnowledgeItem] = useState<Knowledge | null>(null)
  const [ideaModal, setIdeaModal] = useState(false)
  const [tipModal, setTipModal] = useState(false)
  const [notifications, setNotifications] = useState(false)
  const [toast, setToast] = useState('')
  const success = (text: string) => { setIdeaModal(false); setTipModal(false); setToast(text); window.setTimeout(() => setToast(''), 3500) }
  return <div>
    <Header notifications={notifications} setNotifications={setNotifications} />
    <main><div className="page-wrap"><Hero onIdea={() => setIdeaModal(true)} onTip={() => setTipModal(true)} /><ActivitySummary /><Challenge /><KnowledgeSection open={setKnowledgeItem} /></div><IdeasSection openForm={() => setIdeaModal(true)} /><div className="page-wrap"><TipsSection openForm={() => setTipModal(true)} /><PeerSection /><Contributors /></div></main>
    <Footer />
    {knowledgeItem && <KnowledgeModal item={knowledgeItem} close={() => setKnowledgeItem(null)} />}
    {ideaModal && <IdeaModal close={() => setIdeaModal(false)} submit={() => success('Ide berhasil dikirim. Terima kasih sudah berani berbagi!')} />}
    {tipModal && <TipModal close={() => setTipModal(false)} submit={() => success('Tips kamu berhasil dibagikan ke tim!')} />}
    {toast && <div className="global-toast"><span><Icon name="check" size={17} /></span>{toast}</div>}
  </div>
}
