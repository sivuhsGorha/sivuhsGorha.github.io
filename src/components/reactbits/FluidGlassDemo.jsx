import React, { Suspense } from 'react';
import FluidGlass from './FluidGlass';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, errorMessage: '' };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, errorMessage: error.message };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ color: 'red', textAlign: 'center', padding: '2rem' }}>
          <h4>Failed to load 3D Models</h4>
          <p>{this.state.errorMessage}</p>
          <p>Please make sure you have placed lens.glb, bar.glb, and cube.glb in public/assets/3d/</p>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function FluidGlassDemo() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<div style={{ textAlign: 'center', padding: '2rem' }}>Loading 3D Scene...</div>}>
        <FluidGlass 
          mode="lens"
          lensProps={{
            scale: 0.25,
            ior: 1.15,
            thickness: 5,
            chromaticAberration: 0.1,
            anisotropy: 0.01  
          }}
        />
      </Suspense>
    </ErrorBoundary>
  );
}
