import { useState, useEffect, useRef } from 'react'
import './App.css'

const flowerPositions = [
  { top: 42 },
  { top: 58 },
  { top: 35 },
  { top: 62 },
  { top: 48 },
  { top: 30 },
  { top: 55 }
]

function App() {
  const [loading, setLoading] = useState(true)
  const [lovePercentage, setLovePercentage] = useState(1)
  const [thoughtsCount, setThoughtsCount] = useState(0)
  const [flippedCards, setFlippedCards] = useState(new Set())
  const [currentDream, setCurrentDream] = useState(null)
  const [currentMemory, setCurrentMemory] = useState(null)
  const [currentApology, setCurrentApology] = useState(null)
  const [quizAnswers, setQuizAnswers] = useState({ q1: null, q2: null, q3: null })
  const [bookPage, setBookPage] = useState(0)
  const [activeSecret, setActiveSecret] = useState(null)
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 })
  const audioRef = useRef(null)

  const reasons = [
    "Your smile makes my day brighter",
    "Your laugh is my favorite sound",
    "You're incredibly smart",
    "Your kindness inspires me",
    "You're my safe place",
    "Your eyes sparkle like stars",
    "You understand me deeply",
    "You make me want to be better",
    "Your hugs feel like home",
    "You're beautiful inside and out",
    "Your voice soothes my soul",
    "You listen to me patiently",
    "Your creativity amazes me",
    "You're strong and resilient",
    "Your love is my motivation",
    "You make ordinary moments special",
    "Your touch gives me butterflies",
    "You're honest and genuine",
    "Your dreams excite me",
    "You're my best friend",
    "Your presence calms me",
    "You laugh at my jokes",
    "You care for others deeply",
    "You're passionate about life",
    "Your kiss tastes like heaven",
    "You support my goals",
    "You're fun to be around",
    "Your cooking is amazing",
    "You remember small details",
    "You're adventurous",
    "Your handwriting is beautiful",
    "You make me believe in love",
    "You're worth every wait",
    "Your style is impeccable",
    "You have a gentle heart",
    "You're my peace",
    "You're my chaos",
    "You're my everything",
    "You make me feel special",
    "You're irreplaceable",
    "Your love is my strength",
    "You complete me",
    "You're my happy place",
    "You make life colorful",
    "I love your quirks",
    "You're perfect as you are",
    "You're my soulmate",
    "I love your ambition",
    "You're incredibly talented",
    "You make me smile daily",
    "You're my forever",
    "Your love is timeless"
  ]

  const memories = [
    { id: 1, title: "First Meeting", content: "The day our eyes met, time stopped", img: "/riku1.jpeg" },
    { id: 2, title: "First Laugh", content: "Your laugh still echoes in my heart", img: "/riku2.jpeg" },
    { id: 3, title: "Late Night Talks", content: "Counting stars until sunrise", img: "/riku3.jpeg" },
    { id: 4, title: "Special Days", content: "Every day with you is special", img: "/riku4.jpeg" },
    { id: 5, title: "Forever", content: "Our story continues...", img: "/riku5.jpeg" },
    { id: 6, title: "Precious", content: "Every moment is precious", img: "/riku6.jpeg" },
    { id: 7, title: "Love", content: "Endless love for you", img: "/riku7.jpeg" }
  ]

  const apologies = [
    { id: 1, text: "I'm sorry for the times I was distant", img: "/riku1.jpeg" },
    { id: 2, text: "I promise to always listen to you", img: "/riku2.jpeg" },
    { id: 3, text: "I've learned that love is patience", img: "/riku3.jpeg" },
    { id: 4, text: "You deserve all my attention", img: "/riku4.jpeg" },
    { id: 5, text: "I'll never take you for granted again", img: "/riku5.jpeg" },
    { id: 6, text: "I cherish every moment with you", img: "/riku6.jpeg" },
    { id: 7, text: "You're my everything, Riku", img: "/riku7.jpeg" }
  ]

  const dreams = [
    { id: 1, title: "Watching Sunsets", story: "Hand in hand, watching the sky paint itself in colors of love", img: "/riku1.jpeg" },
    { id: 2, title: "Long Drives", story: "Road trips with our favorite songs on repeat", img: "/riku2.jpeg" },
    { id: 3, title: "Holding Hands", story: "Growing old together, still holding hands", img: "/riku3.jpeg" },
    { id: 4, title: "Late-night Talks", story: "Talking until the sun rises, sharing secrets", img: "/riku4.jpeg" },
    { id: 5, title: "Traveling Together", story: "Exploring the world, one adventure at a time", img: "/riku5.jpeg" }
  ]

  const secretMessages = [
    "You're my favorite notification",
    "I dream about you every night",
    "Your name makes me smile",
    "You're my lucky charm",
    "I miss you when you're busy",
    "You look beautiful today",
    "You're worth the wait",
    "My heart skips when you text",
    "You're my peace in chaos",
    "I love your silly jokes",
    "You inspire me daily",
    "You're my safe haven",
    "Forever isn't long enough",
    "You're my destiny",
    "My love for you grows",
    "You're my heartbeat",
    "Always you, forever me",
    "You're my greatest adventure",
    "You're my calm in storm",
    "I choose you every day"
  ]

  const handleEnter = () => {
    setLoading(false)
    setTimeout(() => {
      animateLoveMeter()
      if (audioRef.current) {
        audioRef.current.play().catch(e => console.log("Audio play prevented:", e))
      }
    }, 1000)
  }

  const animateLoveMeter = () => {
    let value = 1
    const interval = setInterval(() => {
      value += 5
      setLovePercentage(value)
      if (value >= 105) clearInterval(interval)
    }, 50)
  }

  const toggleCard = (index) => {
    const newFlipped = new Set(flippedCards)
    if (newFlipped.has(index)) {
      newFlipped.delete(index)
    } else {
      newFlipped.add(index)
    }
    setFlippedCards(newFlipped)
  }

  const handleMouseMove = (e) => {
    setCursorPos({ x: e.clientX, y: e.clientY })
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setThoughtsCount(prev => prev + Math.floor(Math.random() * 5) + 1)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  if (loading) {
    return (
      <div className="loading-screen">
        <p className="loading-text">This website was made for one person.</p>
        <p className="loading-text">If your name is Riku, enter.</p>
        <button className="enter-btn" onClick={handleEnter}>Enter My World ❤️</button>
        <audio ref={audioRef} loop>
          <source src="/riku.mp3" type="audio/mp3" />
        </audio>
      </div>
    )
  }

  return (
    <div onMouseMove={handleMouseMove}>
      <div id="custom-cursor" style={{ left: cursorPos.x, top: cursorPos.y }}></div>
      
      <section className="section" id="welcome">
        <div className="welcome-letter">
          <p>Hi Riku... Thank you for being you. Every moment with you feels like magic.</p>
          <p>Meeting you changed everything. I've grown so much because of your love.</p>
          <p>I'm grateful for every laugh, every tear, every precious moment.</p>
          <p>This website is dedicated to you, my special person.</p>
        </div>
      </section>

      <section className="section" id="love-reasons">
        <h2>50 Reasons Why I Love You</h2>
        <div className="love-reasons">
          {reasons.map((reason, index) => (
            <div 
              key={index} 
              className={`love-card ${flippedCards.has(index) ? 'flipped' : ''}`}
              onClick={() => toggleCard(index)}
            >
              <div className="card-inner">
                <div className="card-front">
                  <span>Click to reveal ❤️</span>
                </div>
                <div className="card-back">
                  <p>{reason}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section" id="memory-timeline">
        <h2>Our Memory Timeline</h2>
        <div className="memory-timeline">
          <div className="timeline-line">
            {memories.map((memory, index) => (
              <div 
                key={memory.id}
                className="timeline-star"
                style={{ left: `${(index + 1) * 12}%`, top: '50%' }}
                onClick={() => setCurrentMemory(memory)}
              />
            ))}
          </div>
          {currentMemory && (
            <div className="welcome-letter" style={{ marginTop: '20px', display: 'flex', alignItems: 'center', gap: '20px' }}>
              <img src={currentMemory.img} alt={currentMemory.title} style={{ width: '100px', borderRadius: '10px' }} />
              <div>
                <h3>{currentMemory.title}</h3>
                <p>{currentMemory.content}</p>
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="section" id="apology-garden">
        <h2>The Apology Garden</h2>
        <div className="apology-garden">
          {apologies.map((apology, index) => (
            <div 
              key={apology.id}
              className="flower"
              style={{ left: `${10 + index * 12}%`, top: `${flowerPositions[index]?.top || 40}%` }}
              onClick={() => setCurrentApology(apology)}
            >
              🌸
            </div>
          ))}
          {currentApology && (
            <div className="apology-note">
              <img src={currentApology.img} alt="memory" className="apology-img" />
              <p>{currentApology.text}</p>
            </div>
          )}
        </div>
      </section>

      <section className="section" id="love-meter">
        <h2>The Love Meter</h2>
        <div className="love-meter-container">
          <div className="meter-wrapper">
            <div className="meter-bar">
              <div className="meter-fill" style={{ height: `${Math.min(lovePercentage, 100)}%` }}></div>
            </div>
            <div className="meter-percentage">{lovePercentage}%</div>
          </div>
          {lovePercentage > 100 && (
            <p className="meter-error">
              ❤️ Error: Value exceeds measurable limits ❤️
            </p>
          )}
        </div>
      </section>

      <section className="section" id="quiz">
        <h2>The Riku Quiz</h2>
        <div className="quiz-question">
          <p>Who gets angry when I don't pick up?</p>
          <button className="quiz-option" onClick={() => setQuizAnswers({ ...quizAnswers, q1: "Of course it's you, Riku! ❤️" })}>
            {quizAnswers.q1 || "Click to answer"}
          </button>
        </div>
        <div className="quiz-question">
          <p>Who steals my sleep?</p>
          <button className="quiz-option" onClick={() => setQuizAnswers({ ...quizAnswers, q2: "Always thinking about you! 😴" })}>
            {quizAnswers.q2 || "Click to answer"}
          </button>
        </div>
        <div className="quiz-question">
          <p>Who is my favorite notification?</p>
          <button className="quiz-option" onClick={() => setQuizAnswers({ ...quizAnswers, q3: "Your messages make my day! 📱" })}>
            {quizAnswers.q3 || "Click to answer"}
          </button>
        </div>
      </section>

      <section className="section" id="secret-messages">
        <h2>Secret Messages</h2>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          {secretMessages.map((msg, index) => (
            <span 
              key={index}
              className="timeline-star"
              style={{ 
                position: 'relative', 
                display: 'inline-block',
                margin: '10px',
                animation: 'twinkle 2s infinite',
                animationDelay: `${index * 0.1}s`
              }}
              onClick={() => setActiveSecret(msg)}
            >
              ⭐
            </span>
          ))}
          {activeSecret && (
            <div className="welcome-letter" style={{ marginTop: '20px' }}>
              <p>{activeSecret}</p>
            </div>
          )}
        </div>
      </section>

      <section className="section" id="dreams">
        <h2>Future Dreams</h2>
        <div className="dream-board">
          {dreams.map(dream => (
            <div 
              key={dream.id} 
              className="dream-item"
              onClick={() => setCurrentDream(dream)}
            >
              <h3>{dream.title}</h3>
              <p>Click for our story... 💫</p>
            </div>
          ))}
        </div>
        {currentDream && (
          <div className="welcome-letter" style={{ marginTop: '20px', display: 'flex', alignItems: 'center', gap: '20px' }}>
            <img src={currentDream.img} alt={currentDream.title} style={{ width: '100px', borderRadius: '10px' }} />
            <div>
              <h3>{currentDream.title}</h3>
              <p>{currentDream.story}</p>
            </div>
          </div>
        )}
      </section>

      <section className="section" id="voice-notes">
        <h2>Voice Notes</h2>
        <div className="love-meter-container">
          <p>🎧 Your love song is playing!</p>
          <audio controls style={{ marginTop: '20px' }}>
            <source src="/riku.mp3" type="audio/mp3" />
            Your browser does not support audio
          </audio>
        </div>
      </section>

      <section className="section" id="universe-counter">
        <h2>The Universe Counter</h2>
        <div className="love-meter-container">
          <p style={{ fontSize: '1.5rem' }}>
            Number of times Riku crossed my mind today: {thoughtsCount}
          </p>
          <div className="meter-bar">
            <div className="meter-fill" style={{ height: '100%' }}></div>
          </div>
        </div>
      </section>

      <section className="section" id="book">
        <h2>If We Ever Write A Book</h2>
        <div className="book-container">
          <div className="book">
            <div className="book-page">
              <p style={{ textAlign: 'center', marginTop: '50%' }}>
                Page {bookPage + 1}<br /><br />
                {bookPage === 0 && "The Beginning: Where it all started..."}
                {bookPage === 1 && "The Goodbye: Lessons learned..."}
                {bookPage === 2 && "The Return: Love conquers all..."}
                {bookPage === 3 && "The Future: Forever us..."}
              </p>
            </div>
          </div>
          <button 
            className="quiz-option" 
            style={{ marginTop: '20px' }}
            onClick={() => setBookPage((bookPage + 1) % 4)}
          >
            Turn Page ➤
          </button>
        </div>
      </section>

      <section className="section" id="manifestation">
        <h2>Love Manifestation Wall</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
          {['Home', 'Beloved', 'Soulbound', 'Always', 'Forever', 'Mine', 'Yours', 'Us'].map(word => (
            <span 
              key={word}
              style={{ 
                fontSize: '2rem', 
                color: 'var(--pink)',
                animation: 'pulse 2s infinite'
              }}
            >
              {word}
            </span>
          ))}
        </div>
      </section>

      <section className="section" id="final">
        <div className="final-heart"></div>
        <p style={{ fontSize: '1.8rem', textAlign: 'center', maxWidth: '600px', margin: '40px auto' }}>
          "If someone asked me for the most beautiful word in the universe, I wouldn't say love, destiny, or forever.
          <br /><br />
          I'd simply say Riku."
        </p>
        <button className="replay-btn" onClick={() => window.location.reload()}>
          Replay Our Story ❤️
        </button>
      </section>

      <audio ref={audioRef} loop>
        <source src="/riku.mp3" type="audio/mp3" />
      </audio>
    </div>
  )
}

export default App