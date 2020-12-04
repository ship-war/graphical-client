import React, { useRef, useEffect } from 'react'
import {
  Nullable,
  NetEntity,
  MapResponse,
  Map,
  Vector
} from '../models';

export interface CanvasProps {
  mapResponse: MapResponse;
}

const ENTITY_COLORS: Map<string> = {
  'ENTITY': 'rgb(0, 0, 0)',
  'SHIP': 'rgb(115, 28, 113)',
  'PROJECTILE': 'rgb(180, 70, 14)'
};

const BACKGROUND_COLOR: string = 'rgb(214, 223, 244)';

function drawCircle(
  context: CanvasRenderingContext2D,
  position: Vector,
  radius: number,
  color: string
): void {
  context.fillStyle = color;

  const circle: Path2D = new Path2D();

  circle.arc(position.x , position.y, radius, 0, 2 * Math.PI);
  context.fill(circle);
}

function drawEntity(context: CanvasRenderingContext2D, entity: NetEntity, offset: number): void {
  drawCircle(
    context,
    {
      x: entity.position.x + offset,
      y: entity.position.y + offset
    },
    entity.radius,
    ENTITY_COLORS[entity.type]
  );
}

function drawMap(context: CanvasRenderingContext2D, mapResponse: MapResponse): void {
  context.fillStyle = 'rgb(0, 0, 0)';
  context.fillRect(0, 0, mapResponse.map.radius * 2, mapResponse.map.radius * 2);
  drawCircle(context, {
    x: mapResponse.map.radius,
    y: mapResponse.map.radius
  }, mapResponse.map.radius, BACKGROUND_COLOR);

  mapResponse.map.entities.forEach((entity: NetEntity) => drawEntity(
    context,
    entity,
    mapResponse.map.radius
  ));
}

function draw(canvas: Nullable<HTMLCanvasElement>, mapResponse: MapResponse): void {
  if (!canvas) return;

  const context: Nullable<CanvasRenderingContext2D> = canvas.getContext('2d');

  if (context) {
    drawMap(context, mapResponse);
  }
}

export function Canvas(props: CanvasProps): JSX.Element {
  
  const canvasRef: React.MutableRefObject<Nullable<HTMLCanvasElement>> = useRef<Nullable<HTMLCanvasElement>>(null);
  
  useEffect(() => draw(canvasRef.current, props.mapResponse), [ props.mapResponse ]);
  
  return <canvas
    ref={canvasRef}
    width={ props.mapResponse.map.radius * 2 }
    height={ props.mapResponse.map.radius * 2}
  />;
}
