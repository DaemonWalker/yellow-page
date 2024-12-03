import MouseParticles from "react-mouse-particles";
import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [list, setList] = useState([]);
  useEffect(() => {
    fetch("/data/list.json")
      .then((res) => res.json())
      .then((json) => setList(json));
    const canvas = document.getElementById("canv");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const ctx = canvas.getContext("2d");
    let cols = Math.floor(window.innerWidth / 20) + 1;
    let ypos = Array(cols).fill(0);

    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    function matrix() {
      const w = window.innerWidth;
      const h = window.innerHeight;

      if (canvas.width !== w) {
        canvas.width = w;
        cols = Math.floor(window.innerWidth / 20) + 1;
        ypos = Array(cols).fill(0);
      }
      if (canvas.height !== h) {
        canvas.height = h;
      }

      ctx.fillStyle = "#0001";
      ctx.fillRect(0, 0, w, h);

      ctx.fillStyle = "#0f0";
      ctx.font = "15pt monospace";

      ypos.forEach((y, ind) => {
        const text = String.fromCharCode(Math.random() * 128);
        const x = ind * 20;
        ctx.fillText(text, x, y);
        if (y > 100 + Math.random() * 10000) ypos[ind] = 0;
        else ypos[ind] = y + 20;
      });
    }
    const ani = setInterval(matrix, 50);
    return () => {
      clearInterval(ani);
    };
  }, []);
  return (
    <>
      <canvas id="canv">
        <div className="container">
          <p>Some div with login in</p>
        </div>
      </canvas>
      <div className="cool-list-container">
        <ul>
          {list.map((item) => (
            <li key={item.name} onClick={() => window.open(item.url)}>
              {item.name}
            </li>
          ))}
        </ul>
      </div>
      {/* <ParticlesBg type="square" bg={true} /> */}
      <MouseParticles
        g={0.5}
        num={20}
        color="random"
        cull="container,image-wrapper"
      />
    </>
  );
}

export default App;
