import React from 'react';
import CardSwap, { Card } from './CardSwap';

export default function CardSwapDemo() {
  return (
    <CardSwap
      cardDistance={60}
      verticalDistance={70}
      delay={5000}
      pauseOnHover={false}
    >
      <Card style={{ padding: '2rem', textAlign: 'center' }}>
        <h3>Card 1</h3>
        <p>Hello World</p>
      </Card>
      <Card style={{ padding: '2rem', textAlign: 'center' }}>
        <h3>Card 2</h3>
        <p>Astro + React</p>
      </Card>
      <Card style={{ padding: '2rem', textAlign: 'center' }}>
        <h3>Card 3</h3>
        <p>Awesome Components</p>
      </Card>
    </CardSwap>
  );
}
