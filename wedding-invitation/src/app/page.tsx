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
  const [accountCopied, setAccountCopied] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const copyAccountNumber = async () => {
    await navigator.clipboard.writeText("0000 0000 0000");
    setAccountCopied(true);
    window.setTimeout(() => setAccountCopied(false), 1800);
  };

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

        <section className="intro section">
          <p className="eyebrow">A new chapter</p>
          <h2>
            Two lives,
            <br />
            <em>one beautiful story.</em>
          </h2>
          <p className="body-copy">
            Dengan rahmat tuhan, dan restu dari keluarga kami, kami dengan senang hati mengundang Anda untuk berbagi kebahagiaan di hari pernikahan kami
          </p>
        </section>

        <section className="couple section">
          <div className="portrait portrait-a" aria-label="Bride portrait" />
          <div className="couple-copy">
            <p className="eyebrow">The couple</p>
            <h2>
              Meet the
              <br />
              <em>happy two</em>
            </h2>
            <p className="body-copy">
              A quiet love, a thousand little moments, and a promise to keep choosing one another.
            </p>
          </div>
          <div className="portrait portrait-b" aria-label="Groom portrait" />
        </section>

        <section id="story" className="story section">
          <p className="eyebrow">Our story</p>
          <h2>
            It started with
            <br />
            <em>hello.</em>
          </h2>
          <div className="timeline">
            <div>
              <b>2019</b>
              <h3>First encounter</h3>
              <p>A serendipitous meeting that neither of us expected.</p>
            </div>
            <div>
              <b>2022</b>
              <h3>A shared rhythm</h3>
              <p>Somehow, every ordinary day became our favourite.</p>
            </div>
            <div>
              <b>2026</b>
              <h3>The next chapter</h3>
              <p>With full hearts, we begin forever.</p>
            </div>
          </div>
        </section>

        <section id="details" className="details section">
          <p className="eyebrow">Join us</p>
          <h2>
            The day we
            <br />
            <em>say I do</em>
          </h2>
          <div className="event-grid">
            <article>
              <span>01</span>
              <h3>Akad Nikah</h3>
              <p>
                Sunday, 20 December 2026
                <br />
                09:00 — 10:30 WIB
              </p>
              <strong>
                Alila Villas Uluwatu
                <br />
                Jakarta Selatan
              </strong>
              <a href="https://maps.app.goo.gl/MPEpwLqBU3SYqxkw5" target="_blank" rel="noreferrer">
                View location ↗
              </a>
            </article>
            <article>
              <span>02</span>
              <h3>Reception</h3>
              <p>
                Sunday, 20 December 2026
                <br />
                18:30 — 21:00 WIB
              </p>
              <strong>
                The Langham Ballroom
                <br />
                Jakarta Selatan
              </strong>
              <a href="https://maps.app.goo.gl/MPEpwLqBU3SYqxkw5" target="_blank" rel="noreferrer">
                View location ↗
              </a>
            </article>
          </div>
        </section>

        <section className="count-section section">
          <p className="eyebrow">Counting the days</p>
          <h2>
            Until forever
            <br />
            <em>starts.</em>
          </h2>
          <Countdown />
        </section>

        <section className="gallery section">
          <div className="gallery-large" />
          <div className="gallery-small one" />
          <div className="gallery-small two" />
          <div className="gallery-caption">
            <p className="eyebrow">Moments</p>
            <p>
              And so the adventure
              <br />
              <em>continues.</em>
            </p>
          </div>
        </section>

        <footer>
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
              <div className="gift-account">
                <span>Bank BCA<br />a.n. Syahrul &amp; Afna</span>
                <strong>0000 0000 0000</strong>
              </div>
              <button className="copy-account" type="button" onClick={copyAccountNumber}>
                {accountCopied ? "Nomor rekening tersalin" : "Salin nomor rekening"}
              </button>
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
