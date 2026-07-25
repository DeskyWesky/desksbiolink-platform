import { useEffect, useState, useCallback } from 'react';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';

export default function ParticleBackground() {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setInit(true));
  }, []);

  const options = {
    background: { color: 'transparent' },
    fpsLimit: 60,
    particles: {
      color: { value: '#7f7fff' },
      links: { enable: true, color: '#7f7fff', distance: 120, opacity: 0.2 },
      move: { enable: true, speed: 0.6 },
      number: { value: 50, density: { enable: true, area: 800 } },
      opacity: { value: 0.3 },
      size: { value: 2 },
    },
  };

  if (!init) return null;

  return (
    <Particles
      id="tsparticles"
      options={options}
      style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1 }}
    />
  );
}
