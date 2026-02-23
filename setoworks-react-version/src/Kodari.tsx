import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { VRMLoaderPlugin } from '@pixiv/three-vrm';

interface KodariProps {
  vrmUrl?: string; // VRM 모델 경로 (기본값 설정 가능)
}

const Kodari: React.FC<KodariProps> = ({ vrmUrl = '/kodari.vrm' }) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // 1. Scene 플로팅 세팅 (배경 투명)
    const scene = new THREE.Scene();

    // 2. Camera 세팅
    // 카메라 위치를 다시 당겨주고 시선 높이 조정
    const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 20);
    camera.position.set(0, 1.3, 1.5);

    // 3. Renderer 세팅 (투명 배경 허용)
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    // 원래 300x300 이던 캔버스 크기를 가로 400, 세로 600 의 넉넉한 찌그러짐 없는 비율로 조정
    renderer.setSize(400, 600);
    renderer.setPixelRatio(window.devicePixelRatio);
    mountRef.current.appendChild(renderer.domElement);

    // 4. 빛 설정 (얼굴을 화사하게)
    const light = new THREE.DirectionalLight(0xffffff, Math.PI);
    light.position.set(1, 1, 1).normalize();
    scene.add(light);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    // 5. VRM 모델 로드
    let currentVrm: any = undefined;
    const loader = new GLTFLoader();
    loader.register((parser: any) => new VRMLoaderPlugin(parser));

    loader.load(
      vrmUrl,
      (gltf: any) => {
        const vrm = gltf.userData.vrm;
        scene.add(vrm.scene);
        currentVrm = vrm;

        // 스케일 강제 확장 (모델이 너무 작은 경우 대비)
        vrm.scene.scale.set(1.5, 1.5, 1.5);
        // 위치 상향 조정 (발 아래로 꺼지지 않도록)
        vrm.scene.position.set(0, -0.5, 0);

        // 팔을 살짝 내리게 하는 등 초기 포즈 설정 가능 (인사 포즈 등)
        vrm.humanoid.getNormalizedBoneNode('leftUpperArm').rotation.z = Math.PI / 3;
        vrm.humanoid.getNormalizedBoneNode('rightUpperArm').rotation.z = -Math.PI / 3;
      },
      (progress: any) => console.log('Loading model...', 100.0 * (progress.loaded / progress.total), '%'),
      (error: any) => console.error('Error loading VRM:', error)
    );

    // 6. 애니메이션 루프 (숨쉬기, 깜박임 등) + 마우스 따라보기 (LookAt)
    const clock = new THREE.Clock();
    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const deltaTime = clock.getDelta();

      if (currentVrm) {
        currentVrm.update(deltaTime);
      }
      renderer.render(scene, camera);
    };
    animate();

    // 7. 마우스 시선 추적 (사용자 마우스를 쳐다보게)
    const handleMouseMove = (event: MouseEvent) => {
      if (!currentVrm) return;
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = -(event.clientY / window.innerHeight) * 2 + 1;
      // 시선 타겟을 마우스 좌표 기반으로 설정 (추후 정교하게 변경 가능)
      currentVrm.lookAt.target = new THREE.Object3D();
      currentVrm.lookAt.target.position.set(x * 2, y * 2 + 1.4, 2);
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [vrmUrl]);

  return (
    <div
      ref={mountRef}
      style={{
        position: 'fixed',
        bottom: '0px',  // 딱 바닥에 붙게
        right: '20px',
        width: '400px', // 캔버스와 동일한 크기로 래퍼 확장
        height: '600px',
        pointerEvents: 'none', // 마우스 클릭 방해 안 하게
        zIndex: 9999,
      }}
    />
  );
};

export default Kodari;
