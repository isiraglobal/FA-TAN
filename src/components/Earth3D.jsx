import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

const Earth3D = ({ progress }) => {
  const mountRef = useRef(null);
  
  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    if(mountRef.current) mountRef.current.appendChild(renderer.domElement);
    
    const geometry = new THREE.SphereGeometry(2, 64, 64);
    const material = new THREE.MeshPhongMaterial({ 
      color: 0x1E90FF,
      emissive: 0x112244,
      specular: 0x00FFFF,
      shininess: 50,
      wireframe: true,
      transparent: true,
      opacity: 0.8
    });
    const earth = new THREE.Mesh(geometry, material);
    scene.add(earth);
    
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(5, 3, 5);
    scene.add(pointLight);
    
    camera.position.z = 5;
    
    let animationId;
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      earth.rotation.y += 0.002;
      earth.rotation.x += 0.001;
      renderer.render(scene, camera);
    };
    animate();
    
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);
  
  const scale = 1 + progress * 10;
  const opacity = Math.max(0, 1 - progress * 8);
  
  return (
    <div 
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ 
        transform: `scale(${scale})`,
        opacity: opacity,
        transformOrigin: 'center center',
      }}
      ref={mountRef} 
    />
  );
};

export default Earth3D;
