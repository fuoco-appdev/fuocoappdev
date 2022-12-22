import WorldController, {
  WorldCardData,
} from '../controllers/world.controller';
import * as THREE from 'three';
import * as BufferGeometryUtils from 'three/examples/jsm/utils/BufferGeometryUtils';
import styles from './world.module.scss';
import * as AtmosphereShader from '../shaders/atmosphere.shader';
import * as TWEEN from '@tweenjs/tween.js';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { MathUtils } from 'three';
import {
  Avatar,
  Card,
  CardSwipe,
  IconBriefcase,
  Typography,
} from '@fuoco.appdev/core-ui';
import React from 'react';
import * as core from '../protobuf/core_pb';
import { Strings } from '../localization';
import { useObservable } from '@ngneat/use-observable';
import BucketService from '../services/bucket.service';

function updateCards(
  mesh: THREE.Mesh,
  camera: THREE.Camera,
  tempVector: THREE.Vector3
) {
  for (const key in WorldController.worldCards) {
    const { ref, coordinates } = WorldController.worldCards[key];
    if (!ref) {
      return;
    }

    const phi = (coordinates.latitude * Math.PI) / 180;
    const theta = ((coordinates.longitude - 180) * Math.PI) / 180;
    tempVector.setFromSphericalCoords(
      WorldController.minDotRadius + 0.1,
      phi,
      theta
    );
    tempVector.applyMatrix4(mesh.matrixWorld);
    tempVector.project(camera);

    // convert the normalized position to CSS coordinates
    const x = (tempVector.x * 0.5 + 0.5) * window.innerWidth;
    const y = (tempVector.y * -0.5 + 0.5) * window.innerHeight;

    // move the elem to that position
    ref!.style.transform = `translate(-50%, -100%) translate(${x}px,${y}px)`;

    // set the zIndex for sorting
    ref!.style.zIndex = `${((-tempVector.z * 0.5 + 0.5) * 100000) | 0}`;
  }
}

async function LoadWorldAsync(): Promise<void> {
  const scene = new THREE.Scene();
  const defaultFOV = 75;
  const camera = new THREE.PerspectiveCamera(
    defaultFOV,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  const planeAspectRatio = 16 / 9;
  renderer.setSize(window.innerWidth, window.innerHeight);

  function onWindowResize() {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;

    if (camera.aspect > planeAspectRatio) {
      // window too large
      camera.fov = defaultFOV;
    } else {
      // window too narrow
      const cameraHeight = Math.tan(MathUtils.degToRad(defaultFOV / 2));
      const ratio = camera.aspect / planeAspectRatio;
      const newCameraHeight = cameraHeight / ratio;
      camera.fov = MathUtils.radToDeg(Math.atan(newCameraHeight)) * 2;
    }

    camera.updateProjectionMatrix();
  }

  window.addEventListener('resize', onWindowResize, false);

  // document.body.appendChild( renderer.domElement );
  // use ref as a mount point of the Three.js scene instead of the document.body
  if ((WorldController.ref.current?.children.length ?? 0) <= 0) {
    WorldController.ref.current?.appendChild(renderer.domElement);
  }

  const light = new THREE.PointLight(0xffffff, 1.35, 400);
  light.position.set(-40, 15, 0);
  light.castShadow = true;
  light.shadow.bias = -0.0001;
  light.shadow.mapSize.width = 1024 * 4;
  light.shadow.mapSize.height = 1024 * 4;
  scene.add(light);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.x = -1;
  directionalLight.position.y = 1;
  scene.add(directionalLight);

  const ambientLight = new THREE.AmbientLight(0x404040); // soft white light
  ambientLight.intensity = 1;
  scene.add(ambientLight);

  const space = new THREE.BoxGeometry(200, 100, 50);
  const spaceMaterial = new THREE.MeshStandardMaterial({
    color: 0x151d65,
    side: THREE.BackSide,
  });
  const spaceMesh = new THREE.Mesh(space, spaceMaterial);
  scene.add(spaceMesh);

  const baseEarth = new THREE.SphereGeometry(
    WorldController.minDotRadius,
    50,
    50
  );
  const baseEarthMaterial = new THREE.MeshStandardMaterial({
    color: 0x373593,
    opacity: 0.9,
  });
  baseEarthMaterial.transparent = true;
  const baseEarthMesh = new THREE.Mesh(baseEarth, baseEarthMaterial);
  baseEarthMesh.receiveShadow = true;

  const textureWidth = 2160;
  const textureHeight = 1080;
  const canvas = document.createElement('canvas');
  canvas.width = textureWidth;
  canvas.height = textureHeight;
  const ctx = canvas.getContext('2d');
  const imageData = await WorldController.loadImageAsync(
    ctx,
    'assets/images/map_alpha.png',
    textureWidth,
    textureHeight
  );

  const dotVector = new THREE.Vector3();
  const dotGeometry = new THREE.CircleGeometry(0.01, 5);
  const dots: Array<THREE.BufferGeometry> = [];
  const dotCount = 60000;

  for (let i = 0; i < dotCount; i++) {
    const phi = Math.acos(-1 + (2 * i) / dotCount);
    const theta = Math.sqrt(dotCount * Math.PI) * phi;

    dotVector.setFromSphericalCoords(WorldController.minDotRadius, phi, theta);

    const latLong = WorldController.vector3ToLatLong(dotVector, 2);
    const pixelPoint = WorldController.latLongToVector2(
      latLong.long,
      latLong.lat,
      textureWidth,
      textureHeight
    );

    const textureIndex = pixelPoint.y * textureWidth + pixelPoint.x;
    const pixel = (imageData as number[][]).at(textureIndex) ?? [0, 0, 0, 0];
    const alpha = pixel[3];
    if (alpha > 0) {
      const geometry = dotGeometry.clone();
      geometry.lookAt(dotVector);
      geometry.translate(dotVector.x, dotVector.y, dotVector.z);

      dots.push(geometry);
    }
  }

  const geometriesDots = BufferGeometryUtils.mergeBufferGeometries(dots);
  const dotMaterial = new THREE.MeshStandardMaterial({ color: 0x4affff });
  const dotMesh = new THREE.Mesh(geometriesDots, dotMaterial);

  const atmosphere = new THREE.SphereGeometry(
    WorldController.minDotRadius + 0.1,
    50,
    50
  );
  const atmosphereMaterial = new THREE.ShaderMaterial({
    uniforms: {
      coeficient: {
        value: 0.5,
      },
      power: {
        value: 2,
      },
      glowColor: {
        value: new THREE.Color(0x4affff),
      },
    },
    vertexShader: AtmosphereShader.VertexShader,
    fragmentShader: AtmosphereShader.FragmentShader,
    blending: THREE.AdditiveBlending,
    transparent: true,
    depthWrite: false,
  });
  const atmosphereMesh = new THREE.Mesh(atmosphere, atmosphereMaterial);
  const pivot = new THREE.Group();
  pivot.position.setX(2);
  scene.add(pivot);
  pivot.add(baseEarthMesh);
  pivot.add(dotMesh);
  pivot.add(atmosphereMesh);

  camera.position.z = 5;

  const tempVector = new THREE.Vector3();
  const animate = () => {
    requestAnimationFrame(animate);

    if (!WorldController.model.isVisible) {
      return;
    }

    if (!WorldController.pressed) {
      WorldController.globeRotation.y += 0.0005;
      TWEEN.update();
    }

    if (WorldController.model.isError) {
      dotMaterial.color.setHex(0xff3333);
      baseEarthMaterial.color.setHex(0x151d65);
      atmosphereMaterial.uniforms['glowColor'].value = new THREE.Color(
        0xff3333
      );
    } else {
      dotMaterial.color.setHex(0x4affff);
      baseEarthMaterial.color.setHex(0x373593);
      atmosphereMaterial.uniforms['glowColor'].value = new THREE.Color(
        0x4affff
      );
    }

    pivot.rotation.x = WorldController.globeRotation.x;
    pivot.rotation.y = WorldController.globeRotation.y;

    pivot.updateMatrix();
    updateCards(baseEarthMesh, camera, tempVector);

    renderer.render(scene, camera);
  };

  animate();
}

export interface WorldCardProps {
  ref?: (element: HTMLDivElement | null) => void;
  coverImages?: string[];
  progressType?: core.AppStatus;
  progressLength?: number;
  profilePicture?: string;
  name?: string;
  company?: string;
}

const WorldCardComponent = React.forwardRef(
  (
    {
      coverImages,
      progressType = core.AppStatus.USER_STORIES,
      progressLength = 4,
      profilePicture,
      name = '',
      company = '',
    }: WorldCardProps,
    ref: React.ForwardedRef<any>
  ) => {
    const [coverImageElements, setCoverImageElements] = useState<
      React.ReactElement[]
    >([]);

    useEffect(() => {
      const elements: React.ReactElement[] = [];
      coverImages?.map((url) => {
        elements.push(
          <img
            style={{
              height: 'inherit',
              width: 'inherit',
              objectFit: 'contain',
              borderRadius: '6px',
            }}
            src={url}
          />
        );
      });
      setCoverImageElements(elements);
    }, [coverImages]);

    const statusTypes = Strings.statusTypes.split(',');
    return (
      <div className={styles['card-root']} ref={ref}>
        <Card className={styles['card']}>
          <div className={styles['card-container']}>
            <div className={styles['card-content']}>
              <div className={styles['cover-image-container']}>
                <CardSwipe items={coverImageElements} />
              </div>
              <div className={styles['app-content']}>
                <div className={styles['app-info']}>
                  <Avatar
                    className={styles['avatar']}
                    src={profilePicture}
                    AvatarIcon={IconBriefcase}
                  />
                  <div className={styles['app-name-container']}>
                    <Typography.Text className={styles['app-name']}>
                      {name.length > 0 ? name : Strings.name}
                    </Typography.Text>
                    <Typography.Text className={styles['company-name']}>
                      {company.length > 0 ? company : Strings.company}
                    </Typography.Text>
                  </div>
                  <div className={styles['status-container']}>
                    <Typography.Text className={styles['status']}>
                      {`${Strings.status}: ${statusTypes[progressType]}`}
                    </Typography.Text>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles['progress-container']}>
              {Array(progressLength)
                .fill(0)
                .map((value, index) => {
                  const classes = [styles['progress-pill']];
                  if (index <= progressType) {
                    classes.push(styles['progress-pill-active']);
                  }
                  return <div className={classes.join(' ')} />;
                })}
            </div>
          </div>
        </Card>
        <div className={styles['card-pin']} />
      </div>
    );
  }
);

export interface WorldComponentProps {
  isVisible?: boolean;
}

export default function WorldComponent({
  isVisible = true,
}: WorldComponentProps): React.ReactElement {
  const location = useLocation();
  const [props] = useObservable(WorldController.model.store);
  const [cards, setCards] = useState<React.ReactElement[]>([]);
  WorldController.model.location = location;

  useEffect(() => {
    LoadWorldAsync();
  }, []);

  useEffect(() => {
    WorldController.updateIsVisible(isVisible);
  }, [isVisible]);

  useEffect(() => {
    const elements: React.ReactElement[] = [];
    props.apps.map((value: core.App) => {
      // add an element for each country
      let avatarUrl: string | undefined;
      if (value.avatarImage) {
        avatarUrl =
          BucketService.getPublicUrl(
            core.BucketType.AVATARS,
            value.avatarImage
          ) ?? undefined;
      }
      const coverImages: string[] = [];
      for (const url of value.coverImages) {
        coverImages.push(
          BucketService.getPublicUrl(core.BucketType.COVER_IMAGES, url) ?? ''
        );
      }

      elements.push(
        <WorldCardComponent
          ref={(element) =>
            (WorldController.worldCards[value.id].ref = element)
          }
          profilePicture={avatarUrl}
          company={value.company}
          name={value.name}
          progressType={value.status}
          coverImages={coverImages}
        />
      );
    });

    setCards(elements);
  }, [props]);

  return (
    <div className={isVisible ? styles['root'] : styles['root-none']}>
      <div ref={WorldController.ref} />
      <div className={styles['card-container']}>{cards}</div>
    </div>
  );
}
