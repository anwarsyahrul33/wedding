"use client";

import { useEffect, useRef, useState } from "react";

const weddingDate = new Date("2026-10-25T09:00:00+07:00").getTime();
const MUSIC_START_OFFSET_SECONDS = 10;

function Countdown() {
  const [mounted, setMounted] = useState(false);
  const [now, setNow] = useState(weddingDate);

  useEffect(() => {
    setMounted(true);
    setNow(Date.now());

    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, []);

  if (!mounted) {
    return (
      <div className="countdown">
        {Array.from({ length: 4 }).map((_, index) => (
          <div className="count-item" key={index}>
            <strong>00</strong>
            <span>{["Days", "Hours", "Minutes", "Seconds"][index]}</span>
          </div>
        ))}
      </div>
    );
  }

  const distance = Math.max(0, weddingDate - now);
  const values = [
    Math.floor(distance / 86400000),
    Math.floor(distance / 3600000) % 24,
    Math.floor(distance / 60000) % 60,
    Math.floor(distance / 1000) % 60,
  ];

  return (
    <div className="countdown">
      {values.map((value, index) => (
        <div className="count-item" key={index}>
          <strong>{String(value).padStart(2, "0")}</strong>
          <span>{["Days", "Hours", "Minutes", "Seconds"][index]}</span>
        </div>
      ))}
    </div>
  );
}

export default function Home() {
  const [open, setOpen] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [isOpening, setIsOpening] = useState(false);
  const [giftOpen, setGiftOpen] = useState(false);
  const [accountCopied, setAccountCopied] = useState<1 | 2 | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  const copyAccountNumber = async (accountNumber: string, accountId: 1 | 2) => {
    await navigator.clipboard.writeText(accountNumber.replace(/\s/g, ""));
    setAccountCopied(accountId);
    window.setTimeout(() => setAccountCopied(null), 1800);
  };

  useEffect(() => {
    if (!open) return;

    const revealItems = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8%" },
    );

    revealItems.forEach((item) => revealObserver.observe(item));
    return () => revealObserver.disconnect();
  }, [open]);

  const handleOpenInvitation = () => {
    setIsOpening(true);

    const audio = audioRef.current;
    if (audio) {
      audio.currentTime = MUSIC_START_OFFSET_SECONDS;
      audio.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    }

    window.setTimeout(() => {
      setOpen(true);
    }, 300);
  };

  const toggleMusic = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (playing) {
      audio.pause();
      setPlaying(false);
      return;
    }

    try {
      await audio.play();
      setPlaying(true);
    } catch {
      setPlaying(false);
    }
  };

  return (
    <main className="page-shell">
      {!open && (
        <section className={isOpening ? "cover cover-closing" : "cover"}>
          <div className="cover-inner">
            <p className="eyebrow eyebrow-light">The wedding of</p>
            <h1>
              Syahrul <i>&</i> Afna
            </h1>
            <p className="cover-date">25 · 10 · 2026</p>
            <button className="button light" onClick={handleOpenInvitation}>
              Open invitation <span>↗</span>
            </button>
            <p className="cover-note">With love, we invite you to celebrate our beginning.</p>
          </div>
        </section>
      )}

      <div className={open ? "invitation visible" : "invitation"}>
        <nav className="top-nav">
          <a href="#story">Our story</a>
          <a href="#details">Details</a>
          <button aria-label="Toggle Canon in D piano music" onClick={toggleMusic}>
            {playing ? "♫" : "◌"}
          </button>
        </nav>

        <audio ref={audioRef} loop preload="none">
          <source src="/canon-in-d-piano.mp3" type="audio/mpeg" />
        </audio>

        <section className="hero">
          <div className="hero-copy">
            <p className="eyebrow eyebrow-light">Save the date</p>
            <h1>
              Syahrul
              <br />
              <i>&</i> Afna
            </h1>
            <p>25 Oktober 2026 · Kudus</p>
          </div>
        </section>

        <section className="intro section reveal-section" data-reveal>
          <p className="eyebrow">A new chapter</p>
          <h2>
            Dua insan,
            <br />
            <em>satu kisah indah.</em>
          </h2>
          <p className="body-copy">
            Dengan rahmat tuhan, dan restu dari keluarga kami, kami dengan senang hati mengundang Anda untuk berbagi kebahagiaan di hari pernikahan kami
          </p>
        </section>

        <section className="couple section reveal-section" data-reveal>
          <div className="portrait portrait-a reveal-item" data-reveal aria-label="Bride portrait" />
          <div className="couple-copy reveal-item" data-reveal>
            <p className="eyebrow">Tentang kami</p>
            <h2>
              Dua hati,
              <br />
              <em>satu bahagia</em>
            </h2>
            <p className="body-copy">
              Berawal dari kasih yang sederhana, kami menemukan kebahagiaan dalam setiap momen dan berjanji untuk terus memilih satu sama lain.
            </p>
          </div>
          <div className="portrait portrait-b reveal-item" data-reveal aria-label="Groom portrait" />
        </section>

        <section id="story" className="story section reveal-section" data-reveal>
          <p className="eyebrow">Kisah kami</p>
          <h2>
            Berawal dari
            <br />
            <em>sebuah pertemuan.</em>
          </h2>
          <div className="timeline">
            <div className="reveal-item" data-reveal>
              <b>2020</b>
              <h3>Awal pertemuan</h3>
              <p>Sebuah pertemuan sederhana yang menjadi awal dari kisah dan kenangan indah kami.</p>
            </div>
            <div className="reveal-item" data-reveal>
              <b>2023</b>
              <h3>Mulai menjalin hubungan</h3>
              <p>Seiring waktu, kebersamaan membuat kami semakin dekat dan memutuskan untuk melangkah bersama dalam sebuah hubungan.</p>
            </div>
            <div className="reveal-item" data-reveal>
              <b>2026</b>
              <h3>Menuju jenjang pernikahan</h3>
              <p>Dengan doa, restu keluarga, dan hati yang penuh syukur, kami siap memulai babak baru sebagai pasangan suami istri.</p>
            </div>
          </div>
        </section>

        <section id="details" className="details section reveal-section" data-reveal>
          <p className="eyebrow">Join us</p>
          <h2>
            The day we
            <br />
            <em>say I do</em>
          </h2>
          <div className="event-grid">
            <article className="reveal-item" data-reveal>
              <span>01</span>
              <h3>Akad Nikah</h3>
              <p>
                Ahad, 25 Oktober 2026
                <br />
                07:00 WIB
              </p>
              <strong>
                Kediaman Mempelai Wanita
                <br />
                Dukuh Kauman RT 007/RW 007, Kecamatan Gebog, Kabupaten Kudus
              </strong>
              <a href="https://maps.app.goo.gl/MPEpwLqBU3SYqxkw5" target="_blank" rel="noreferrer">
                View location ↗
              </a>
            </article>
            <article className="reveal-item" data-reveal>
              <span>02</span>
              <h3>Resepsi Mempelai Pria</h3>
              <p>
                Ahad, 25 Oktober 2026
                <br />
                13:00 — 20:00 WIB
              </p>
              <strong>
                Kediaman keluarga mempelai pria
                <br />
                Dukuh Srabi Kidul RT 007/RW 005, Kecamatan Gebog, Kabupaten Kudus
              </strong>
              <a href="https://maps.app.goo.gl/MPEpwLqBU3SYqxkw5" target="_blank" rel="noreferrer">
                View location ↗
              </a>
            </article>
            <article className="reveal-item" data-reveal>
              <span>03</span>
              <h3>Resepsi Mempelai Wanita</h3>
              <p>
                Ahad, 25 Oktober 2026
                <br />
                13:30 — 20:00 WIB
              </p>
              <strong>
                Kediaman keluarga mempelai wanita
                <br />
                Dukuh Kauman RT 007/RW 007, Kecamatan Gebog, Kabupaten Kudus
              </strong>
              <a href="https://maps.app.goo.gl/MPEpwLqBU3SYqxkw5" target="_blank" rel="noreferrer">
                View location ↗
              </a>
            </article>
          </div>
        </section>

        <section className="count-section section reveal-section" data-reveal>
          <p className="eyebrow">Counting the days</p>
          <h2>
            Until forever
            <br />
            <em>starts.</em>
          </h2>
          <Countdown />
        </section>

        <section className="gallery section reveal-section" data-reveal>
          <div className="gallery-large reveal-item" data-reveal />
          <div className="gallery-small one reveal-item" data-reveal />
          <div className="gallery-small two reveal-item" data-reveal />
          <div className="gallery-caption reveal-item" data-reveal>
            <p className="eyebrow">Moments</p>
            <p>
              And so the adventure
              <br />
              <em>continues.</em>
            </p>
          </div>
        </section>

        <footer className="reveal-section" data-reveal>
          <p className="eyebrow">With all our love</p>
          <h2>
            Syahrul <i>&</i> Afna
          </h2>
          <p>See you on our special day.</p>
          <small>© 2026 · Made with love</small>
        </footer>

        <aside className={giftOpen ? "gift-popup is-open" : "gift-popup"} aria-label="Wedding gift transfer">
          {giftOpen && (
            <div className="gift-card">
              <div className="gift-card-head">
                <div>
                  <p className="eyebrow">A little present</p>
                  <h2>Wedding gift</h2>
                </div>
                <button className="gift-close" aria-label="Close wedding gift panel" onClick={() => setGiftOpen(false)}>
                  ×
                </button>
              </div>
              <p className="gift-copy">Doa dan kehadiran Anda adalah hadiah terindah. Bila berkenan, kirimkan tanda kasih melalui rekening berikut.</p>
              <div className="gift-accounts">
                <div className="gift-account">
                  <span>Bank BCA<br />a.n. Syahrul &amp; Afna</span>
                  <strong>0000 0000 0000</strong>
                </div>
                <button className="copy-account" type="button" onClick={() => copyAccountNumber("0000 0000 0000", 1)}>
                  {accountCopied === 1 ? "Nomor rekening tersalin" : "Salin nomor rekening"}
                </button>
                <div className="gift-account">
                  <span>Bank BNI<br />a.n. Syahrul &amp; Afna</span>
                  <strong>1111 1111 1111</strong>
                </div>
                <button className="copy-account" type="button" onClick={() => copyAccountNumber("1111 1111 1111", 2)}>
                  {accountCopied === 2 ? "Nomor rekening tersalin" : "Salin nomor rekening"}
                </button>
              </div>
            </div>
          )}
          <button className="gift-trigger" aria-expanded={giftOpen} aria-label={giftOpen ? "Close wedding gift panel" : "Open wedding gift panel"} onClick={() => setGiftOpen(!giftOpen)}>
            <span aria-hidden="true">♡</span>
            <small>Wedding Gift</small>
          </button>
        </aside>
      </div>
    </main>
  );
}
