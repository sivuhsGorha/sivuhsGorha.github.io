import React, { useRef } from 'react';

const skillsData = [
  { title: 'Languages', items: ['Java', 'C', 'PHP', 'JavaScript', 'HTML/CSS', 'Astro'] },
  { title: 'Mobile', items: ['Android app development'] },
  { title: 'Databases', items: ['MySQL', 'Microsoft SQL Server'] },
  { title: 'Cybersecurity', items: ['CompTIA A+ (2024)', 'CompTIA Security+', 'Ethical Hacking fundamentals'] },
  { title: 'Networking', items: ['Fiber installation', 'Network configuration', 'LAN & cabling'] },
  { title: 'Business Analysis', items: ['Requirements gathering', 'Process mapping', 'Business process management'] },
  { title: 'Software Engineering', items: ['Software testing', 'Agile methodology', 'Project management'] },
  { title: 'AI & Emerging Tech', items: ['Prompt engineering', 'AI workflow implementation'] },
];

export default function HoverGlowGrid() {
  const containerRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const cards = containerRef.current.querySelectorAll('.glow-card');
    for (const card of cards) {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    }
  };

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '24px',
        width: '100%',
        padding: '2rem 0'
      }}
    >
      <style>{`
        .glow-card {
          position: relative;
          border-radius: 16px;
          padding: 2px;
          overflow: hidden;
          cursor: default;
          background: rgba(255,255,255,0.06);
        }

        .glow-card::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: radial-gradient(
            800px circle at var(--mouse-x) var(--mouse-y), 
            rgba(0, 229, 255, 0.15),
            transparent 40%
          );
          z-index: 1;
          opacity: 0;
          transition: opacity 0.3s;
        }

        .glow-card:hover::before {
          opacity: 1;
        }

        .glow-card-content {
          position: relative;
          background: rgba(14, 14, 24, 0.85);
          backdrop-filter: blur(12px);
          border-radius: 14px;
          padding: 32px;
          height: 100%;
          z-index: 2;
        }
        
        .glow-card:hover .glow-card-content {
           background: rgba(20, 20, 36, 0.9);
        }
      `}</style>

      {skillsData.map((category, idx) => (
        <div key={idx} className="glow-card">
          <div className="glow-card-content">
            <h3 style={{ fontSize: '18px', marginBottom: '20px', color: '#ffffff', fontWeight: '600', letterSpacing: '-0.01em' }}>
              {category.title}
            </h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {category.items.map((skill, i) => (
                <li key={i} style={{ fontSize: '15px', color: '#9ab0cc', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ width: '5px', height: '5px', background: '#00e5ff', borderRadius: '50%', flexShrink: 0 }}></span>
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
}
