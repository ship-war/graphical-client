import React from 'react';
import { Canvas } from './canvas.component';
import { HttpService } from '../services';
import { Nullable, MapResponse, APIError, NetEntity } from '../models';

const SERVER_TIME_RELOAD: number = 100;

type State<T> = [T, React.Dispatch<React.SetStateAction<T>>];

function getMap(): Promise<MapResponse> {
  return HttpService.get<MapResponse>('entities/graphical');
}

function updateEntities(mapResponse: MapResponse): MapResponse {
  return {
    users: mapResponse.users,
    map: {
      ...mapResponse.map,
      entities: mapResponse.map.entities.map((entity: NetEntity) => {
        entity.position.x += entity.movement.direction.x * entity.movement.speed;
        entity.position.y += entity.movement.direction.y * entity.movement.speed;
        return entity;
      })
    }
  };
}

export function Arena(): JSX.Element {
  const [ mapResponse, setMapResponse ]: State<Nullable<MapResponse>> = React.useState<Nullable<MapResponse>>(null);

  React.useEffect(() => {
    const interval: NodeJS.Timeout = setInterval(() => {
      getMap().then(
        (response: MapResponse) => {
          setMapResponse(response);
        }, (error: APIError) => {
          if (!!mapResponse) {
            setMapResponse(updateEntities(mapResponse));
          }
        }
      );
    }, SERVER_TIME_RELOAD);

    return () => clearInterval(interval);
  }, [mapResponse]);

  return mapResponse ? (<Canvas mapResponse={mapResponse} ></Canvas>) : (<React.Fragment/>);
}
