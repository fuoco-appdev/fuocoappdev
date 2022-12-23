/* eslint-disable @typescript-eslint/no-empty-function */
import React from 'react';
import { Controller } from '../controller';
import { WorldModel } from '../models';
import * as TWEEN from '@tweenjs/tween.js';
import * as THREE from 'three';
import { Subscription } from 'rxjs';
import AppService from '../services/app.service';
import * as core from '../protobuf/core_pb';
import UserService from '../services/user.service';

export interface WorldCardData {
  coordinates: { latitude: number; longitude: number };
  position: THREE.Vector3;
  ref: HTMLDivElement | null;
}

class WorldController extends Controller {
  private readonly _model: WorldModel;
  private readonly _ref: React.RefObject<HTMLDivElement>;
  private readonly _globeRotation: { x: number; y: number };
  private readonly _prevMousePosition: { x: number; y: number };
  private readonly _delta: { x: number; y: number };
  private readonly _minDotRadius: number;
  private readonly _maxDotRadius: number;
  private readonly _worldCards: Record<string, WorldCardData>;
  private _tween: TWEEN.Tween<{ x: number; y: number }> | undefined;
  private _pressed: boolean;
  private _publicAppsSubscription: Subscription | undefined;

  constructor() {
    super();

    this._model = new WorldModel();
    this._ref = React.createRef();
    this._globeRotation = { x: 0, y: 0 };
    this._prevMousePosition = { x: 0, y: 0 };
    this._minDotRadius = 1.8;
    this._maxDotRadius = 3;
    this._pressed = false;
    this._delta = { x: 0, y: 0 };
    this._worldCards = {};

    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
    this.onPublicAppsChangedAsync = this.onPublicAppsChangedAsync.bind(this);

    document.addEventListener('mousemove', this.onMouseMove);
    document.addEventListener('mousedown', this.onMouseDown);
    document.addEventListener('mouseup', this.onMouseUp);
  }

  public get model(): WorldModel {
    return this._model;
  }

  public get ref(): React.RefObject<HTMLDivElement> {
    return this._ref;
  }

  public get worldCards(): Record<string, WorldCardData> {
    return this._worldCards;
  }

  public get pressed(): boolean {
    return this._pressed;
  }

  public get globeRotation(): { x: number; y: number } {
    return this._globeRotation;
  }

  public get minDotRadius(): number {
    return this._minDotRadius;
  }

  public get maxDotRadius(): number {
    return this._maxDotRadius;
  }

  public initialize(): void {
    AppService.requestAllPublicAsync();

    this._publicAppsSubscription = AppService.publicAppsObservable.subscribe({
      next: this.onPublicAppsChangedAsync,
    });
  }

  public dispose(): void {
    this._publicAppsSubscription?.unsubscribe();
  }

  public updateIsVisible(isVisible: boolean): void {
    this._model.isVisible = isVisible;
  }

  public updateIsError(isError: boolean): void {
    this._model.isError = isError;
  }

  public async loadImageAsync(
    context: CanvasRenderingContext2D | null,
    src: string,
    width: number,
    height: number
  ): Promise<Array<number[]>> {
    return new Promise<Array<number[]>>((resolve, reject) => {
      const image = new Image();
      image.src = src;
      image.onload = () => {
        context?.drawImage(image, 0, 0);
        const data = context?.getImageData(0, 0, width, height);
        const uint32Array = new Array<number[]>();
        const length = data?.data.length ?? 0;
        for (let i = 0; i < length; i += 4) {
          const uint32 = [
            data?.data[i + 0] ?? 0,
            data?.data[i + 1] ?? 0,
            data?.data[i + 2] ?? 0,
            data?.data[i + 3] ?? 0,
          ];
          uint32Array.push(uint32);
        }

        resolve(uint32Array);
      };
      image.onerror = (error) => {
        console.error(error);
        reject(error);
      };
    });
  }

  public latLongToVector3(
    lat: number,
    lon: number,
    radius: number,
    height: number
  ): THREE.Vector3 {
    const phi = (lat * Math.PI) / 180;
    const theta = ((lon - 180) * Math.PI) / 180;

    const x = -(radius + height) * Math.cos(phi) * Math.cos(theta);
    const y = (radius + height) * Math.sin(phi);
    const z = (radius + height) * Math.cos(phi) * Math.sin(theta);

    return new THREE.Vector3(x, y, z);
  }

  public vector3ToLatLong(
    position: THREE.Vector3,
    radius: number
  ): { lat: number; long: number } {
    const lat = 90 - (Math.acos(position.y / radius) * 180) / Math.PI;
    const lon =
      ((270 + (Math.atan2(position.x, position.z) * 180) / Math.PI) % 360) -
      360;
    return { lat: lat, long: lon };
  }

  public latLongToVector2(
    long: number,
    lat: number,
    mapWidth: number,
    mapHeight: number
  ): THREE.Vector2 {
    const latitudeToRadians = (lat * Math.PI) / 180;
    const mercN = Math.log(Math.tan(Math.PI / 4 + latitudeToRadians / 2));
    const x = (long + 180) * (mapWidth / 360);
    const y = mapHeight / 2 - (mapWidth * mercN) / (2 * Math.PI);
    return new THREE.Vector2(Math.floor(x), Math.floor(y));
  }

  private onMouseMove(event: MouseEvent): void {
    if (!this._pressed) {
      this._prevMousePosition.x = event.clientX;
      this._prevMousePosition.y = event.clientY;
      return;
    }

    //calculate difference between current and last mouse position
    this._delta.x = event.movementX;
    this._delta.y = event.movementY;

    const moveX = event.clientX - this._prevMousePosition.x;
    const moveY = event.clientY - this._prevMousePosition.y;

    this._globeRotation.y += moveX * 0.005;
    this._globeRotation.x += moveY * 0.005;

    //store new position in lastMove
    this._prevMousePosition.x = event.clientX;
    this._prevMousePosition.y = event.clientY;
  }

  private onMouseDown(): void {
    if (!this._pressed) {
      this._pressed = true;
    }
  }

  private onMouseUp(): void {
    if (this._pressed) {
      this._pressed = false;

      this._tween?.stop();
      this._tween = new TWEEN.Tween(this._globeRotation)
        .to(
          {
            x: this._globeRotation.x + this._delta.y * 0.005 * 10,
            y: this._globeRotation.y + this._delta.x * 0.005 * 10,
          },
          500
        )
        .easing(TWEEN.Easing.Cubic.Out)
        .start();
    }
  }

  private async onPublicAppsChangedAsync(apps: core.App[]): Promise<void> {
    const users = await UserService.requestAllPublicAsync();
    for (const app of apps) {
      const user = users.users.find((value) => value.id === app.userId);
      const latitude = Number(user?.location?.latitude) ?? 0;
      const longitude = Number(user?.location?.longitude) ?? 0;
      this._worldCards[app.id] = {
        coordinates: { latitude: latitude, longitude: longitude },
        position: new THREE.Vector3(),
        ref: null,
      };
    }

    this._model.apps = apps;
  }
}

export default new WorldController();
