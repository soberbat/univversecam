import React from "react";
import { Scene } from "../Scene/class/Scene";

export type SensorType = "threat" | "population" | "economy";
export type CameraType = "3D" | "2D";
export type SceneRef = React.MutableRefObject<Scene> | null;

export type setSensorVisibility = React.Dispatch<
  React.SetStateAction<{
    population: boolean;
    threat: boolean;
    economy: boolean;
  }>
>;

export type setIsFactionSearchVisible = React.Dispatch<
  React.SetStateAction<boolean>
>;

export type setFactionVisibility = React.Dispatch<
  React.SetStateAction<{
    banu: boolean;
    menx: boolean;
    septor: boolean;
    namstx: boolean;
    ka: boolean;
    px23t: boolean;
  }>
>;

export type setCamera = React.Dispatch<
  React.SetStateAction<{
    "3D": boolean;
    "2D": boolean;
  }>
>;

export type FactionType =
  | "banu"
  | "menx"
  | "septor"
  | "namstx"
  | "ka"
  | "px23t";
