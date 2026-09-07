import React from 'react';
import GridMotion from './GridMotion';

const items = [
  'Item 1',
  <div key="jsx-item-1" style={{ color: 'white', padding: '20px', background: 'rgba(255,255,255,0.1)', borderRadius: '8px' }}>Custom JSX Content</div>,
  'https://images.unsplash.com/photo-1723403804231-f4e9b515fe9d?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'Item 2',
  <div key="jsx-item-2" style={{ color: 'white', padding: '20px', background: 'rgba(255,255,255,0.1)', borderRadius: '8px' }}>Custom JSX Content</div>,
  'Item 4',
  <div key="jsx-item-3" style={{ color: 'white', padding: '20px', background: 'rgba(255,255,255,0.1)', borderRadius: '8px' }}>Custom JSX Content</div>,
  'https://images.unsplash.com/photo-1723403804231-f4e9b515fe9d?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'Item 5',
  <div key="jsx-item-4" style={{ color: 'white', padding: '20px', background: 'rgba(255,255,255,0.1)', borderRadius: '8px' }}>Custom JSX Content</div>,
  'Item 7',
  <div key="jsx-item-5" style={{ color: 'white', padding: '20px', background: 'rgba(255,255,255,0.1)', borderRadius: '8px' }}>Custom JSX Content</div>,
  'https://images.unsplash.com/photo-1723403804231-f4e9b515fe9d?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'Item 8',
  <div key="jsx-item-6" style={{ color: 'white', padding: '20px', background: 'rgba(255,255,255,0.1)', borderRadius: '8px' }}>Custom JSX Content</div>,
  'Item 10',
  <div key="jsx-item-7" style={{ color: 'white', padding: '20px', background: 'rgba(255,255,255,0.1)', borderRadius: '8px' }}>Custom JSX Content</div>,
  'https://images.unsplash.com/photo-1723403804231-f4e9b515fe9d?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'Item 11',
  <div key="jsx-item-8" style={{ color: 'white', padding: '20px', background: 'rgba(255,255,255,0.1)', borderRadius: '8px' }}>Custom JSX Content</div>,
  'Item 13',
  <div key="jsx-item-9" style={{ color: 'white', padding: '20px', background: 'rgba(255,255,255,0.1)', borderRadius: '8px' }}>Custom JSX Content</div>,
  'https://images.unsplash.com/photo-1723403804231-f4e9b515fe9d?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'Item 14',
];

export default function GridMotionWrapper() {
  return (
    <div style={{ height: '100%', width: '100%', position: 'absolute', inset: 0, zIndex: -1 }}>
      <GridMotion items={items} gradientColor="#000000" />
    </div>
  );
}
