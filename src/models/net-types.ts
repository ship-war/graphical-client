import { ID, Vector } from './types';

export type EntityType =
'ENTITY' |
'SHIP' |
'PROJECTILE';

export interface MapResponse {
  map: {
    radius: number;
    id: string;
    entities: Array<NetEntity>;
  };
  users: Array<User>;
}

export interface User {
  token: string;
  shipId: string;
  name: string;
  entity: NetEntity;
}

export interface NetEntity {
  id: ID;
  type: EntityType;
  position: Vector;
  movement: NetMovement;
  radius: number;
  mass: number;
  health: number;
  parent: ID;
}

export interface NetMovement {
  speed: number;
  direction: Vector;
}
