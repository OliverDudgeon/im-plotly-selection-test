import { Datum, PlotDatum } from 'plotly.js';
import React, { useState } from 'react';
import Plot from 'react-plotly.js';

type Selection = { x: Datum[]; y: Datum[]; n: number[] };

const randomArray = (N: number) => {
  let out = new Array(N);
  for (let i = 0; i < N; i++) {
    out[i] = Math.random();
  }
  return out;
};

const N = 1000;

const x = randomArray(N);
const y = randomArray(N);

const App = () => {
  const [selectedPoints, setSelectedPoints] = useState<Selection>({ x: [], y: [], n: [] });

  const handleSelection = (points: PlotDatum[]) => {
    const selectedData = {
      x: points.map((p) => p.x),
      y: points.map((p) => p.y),
      n: points.map((p) => p.pointNumber),
    };
    setSelectedPoints(selectedData);
  };

  let color = new Array(N).fill('red');
  selectedPoints.n.forEach((n) => {
    color[n] = 'orange';
  });

  return (
    <>
      <Plot
        data={[{ x, y, type: 'scatter', mode: 'markers', marker: { color } }]}
        layout={{ width: 500, height: 500, title: 'Selection Test', dragmode: 'select' }}
        onSelected={(e) => handleSelection(e.points)}
        onRelayout={(...e) => console.log(e)}
      />

      <Plot
        layout={{ width: 500, height: 500, title: 'Selected Data' }}
        data={[
          { x: selectedPoints.x, type: 'histogram', mode: 'markers', marker: { color: 'green' } },
          { x: selectedPoints.y, type: 'histogram', mode: 'markers', marker: { color: 'blue' } },
        ]}
      />
    </>
  );
};

export default App;
