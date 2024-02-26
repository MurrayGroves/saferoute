import React, { useState, useCallback, useEffect, useRef } from "react";

interface AxisValues {
  a: number;
  b: number;
  c: number;
}

interface Point {
  x: number;
  y: number;
}
const vertices = {
  v0: { x: 100, y: 30 }, // Top vertex
  v1: { x: 0, y: 200 }, // Left vertex
  v2: { x: 200, y: 200 }, // Right vertex
};

const TriangleSelector: React.FC = () => {
  // Adjust these points to match your triangle's vertices

  // Calculate centroid for the starting point
  const centroid = {
    x: (vertices.v0.x + vertices.v1.x + vertices.v2.x) / 3,
    y: (vertices.v0.y + vertices.v1.y + vertices.v2.y) / 3,
  };

  const [values, setValues] = useState<AxisValues>({
    a: 33.3,
    b: 33.3,
    c: 33.3,
  });
  const [selectedPoint, setSelectedPoint] = useState<Point>(centroid);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const svgRef = useRef<SVGSVGElement>(null);

  const updateValuesAndPoint = useCallback((x: number, y: number) => {
    // Assuming the SVG coordinate space for calculations
    const { v0, v1, v2 } = vertices;
    const denominator =
      (v1.y - v2.y) * (v0.x - v2.x) + (v2.x - v1.x) * (v0.y - v2.y);
    let a =
      ((v1.y - v2.y) * (x - v2.x) + (v2.x - v1.x) * (y - v2.y)) / denominator;
    let b =
      ((v2.y - v0.y) * (x - v2.x) + (v0.x - v2.x) * (y - v2.y)) / denominator;
    let c = 1 - a - b;

    if (a >= 0 && b >= 0 && c >= 0) {
      // Check if the point is inside the triangle
      a = Math.max(0, a * 100);
      b = Math.max(0, b * 100);
      c = Math.max(0, c * 100);

      const total = a + b + c;
      setValues({
        a: (a / total) * 100,
        b: (b / total) * 100,
        c: (c / total) * 100,
      });

      setSelectedPoint({ x, y });
    }
  }, []);

  const handleMouseDown = useCallback(
    (event: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
      setIsDragging(true);
      const svg = svgRef.current;
      if (!svg) return;

      const rect = svg.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      updateValuesAndPoint(x, y);
    },
    [updateValuesAndPoint]
  );

  const handleMouseMove = useCallback(
    (event: MouseEvent) => {
      if (!isDragging) return;

      const svg = svgRef.current;
      if (!svg) return;

      const rect = svg.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      updateValuesAndPoint(x, y);
    },
    [isDragging, updateValuesAndPoint]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    const handleMouseMoveWindow = (e: MouseEvent) => handleMouseMove(e);
    const handleMouseUpWindow = () => handleMouseUp();

    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMoveWindow);
      window.addEventListener("mouseup", handleMouseUpWindow);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMoveWindow);
      window.removeEventListener("mouseup", handleMouseUpWindow);
    };
  }, [handleMouseMove, handleMouseUp, isDragging]);

  return (
    <div>
      <svg
        ref={svgRef}
        width="200"
        height="200"
        onMouseDown={handleMouseDown}
        style={{ userSelect: "none" }}
      >
        <polygon
          points={`${vertices.v0.x},${vertices.v0.y} ${vertices.v1.x},${vertices.v1.y} ${vertices.v2.x},${vertices.v2.y}`}
          fill="lightgrey"
        />
        <circle cx={selectedPoint.x} cy={selectedPoint.y} r="5" fill="red" />
      </svg>
      <div>
        A: {values.a.toFixed(2)}%, B: {values.b.toFixed(2)}%, C:{" "}
        {values.c.toFixed(2)}%
      </div>
    </div>
  );
};

export default TriangleSelector;
