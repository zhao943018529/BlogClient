import * as React from 'react';
import * as d3 from 'd3';

function generatePath(x: number, y: number, r: number, deg: number) {
  let str = `${x},${y - r} `;
  const arr = [];
  let startAngle = 36;
  let flag = 0;
  while (startAngle < 360) {}
}

export default function Epicyclic() {
  React.useEffect(() => {
    const root = d3.select('svg.svgRoot');
    root
      .append('circle')
      .attr('cx', 200)
      .attr('cy', 200)
      .attr('fill', '#000')
      .attr('r', 8);
    root
      .append('path')
      .attr('stroke', '#000000')
      .attr('fill', '#9ecae1')
      .attr('d', 'M100,200 a100,100 0 0 1 16 16');
  }, []);

  return (
    <svg
      viewBox='0 0 400 400'
      width='800'
      height='800'
      className='svgRoot'
    ></svg>
  );
}
