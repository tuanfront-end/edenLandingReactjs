import isMobile from "../isMobile/isMobile";

function waveCanvas(opt) {
  let width = document.body.clientWidth;
  let height = document.body.clientHeight;
  const opts = {
    ...{
      height,
      gradient: ["#f06292", "#f97f5f"]
    },
    ...opt
  };

  if (!opts.el) {
    throw new Error(
      `You need to set {el} for it. Example: waveCanvas({ el: "canvas" })`
    );
  }

  const canvas = opts.el;
  const ctx = canvas.getContext("2d");
  const fps = 60;
  const frameTime = 1000 / fps;
  const wavePointArr = [];
  const lastTime = +new Date();

  function debounce(object, eventType, callback) {
    let timer;

    object.addEventListener(
      eventType,
      () => {
        clearTimeout(timer);
        timer = setTimeout(() => {
          callback();
        }, 500);
      },
      false
    );
  }

  function canvasResize() {
    ctx.clearRect(0, 0, width, height);
    width = document.body.clientWidth;
    ({ height } = opts);
    canvas.width = width;
    canvas.height = height;
  }

  debounce(window, "resize", () => {
    canvasResize();
  });

  canvasResize();

  function BackWave() {
    this.spx = width * -0.2;
    this.spy = height * 0.3;
    this.epx = width * 1.4;
    this.epy = height * 0.2;

    function WavePoint(x, y, vx, vy, k) {
      this.k = k;
      this.x = x;
      this.y = y;
      this.px = x;
      this.py = y;
      this.ax = 0;
      this.ay = 0;
      this.vx = vx;
      this.vy = vy;
    }

    WavePoint.prototype.move = function() {
      this.ax = (this.px - this.x) * this.k;
      this.ay = (this.py - this.y) * this.k;
      this.vx += this.ax;
      this.vy += this.ay;
      this.x += this.vx;
      this.y += this.vy;
    };

    if (isMobile.any()) {
      wavePointArr[0] = new WavePoint(
        width * 0.15,
        height * 0.9,
        1,
        0.5,
        0.0007
      );
      wavePointArr[1] = new WavePoint(
        width * 1.5,
        height * 0.5,
        1,
        0.8,
        0.0007
      );
    } else {
      wavePointArr[0] = new WavePoint(
        width * 0.15,
        height * 1.2,
        1,
        0.5,
        0.0007
      );
      wavePointArr[1] = new WavePoint(
        width * 0.65,
        height * 0.3,
        -2,
        2,
        0.0009
      );
      wavePointArr[2] = new WavePoint(
        width * 0.9,
        height * 0.6,
        1,
        0.5,
        0.0007
      );
    }
  }

  BackWave.prototype.render = function() {
    for (let i = 0; i < wavePointArr.length; i += 1) {
      wavePointArr[i].move();
    }

    const grd = ctx.createLinearGradient(0, 0, width / 1, 0);
    grd.addColorStop(0, opts.gradient[0]);
    grd.addColorStop(1, opts.gradient[1]);
    ctx.fillStyle = grd;

    ctx.beginPath();
    ctx.moveTo(this.spx, 0);
    ctx.lineTo(this.spx, this.spy);
    for (let i = 0; i < wavePointArr.length; i += 1) {
      if (i === wavePointArr.length - 1) {
        ctx.quadraticCurveTo(
          wavePointArr[i].x,
          wavePointArr[i].y,
          this.epx,
          this.epy
        );
      } else {
        ctx.quadraticCurveTo(
          wavePointArr[i].x,
          wavePointArr[i].y,
          (wavePointArr[i + 1].x + wavePointArr[i].x) / 2,
          (wavePointArr[i + 1].y + wavePointArr[i].y) / 2
        );
      }
    }
    ctx.lineTo(this.epx, 0);
    ctx.lineTo(this.spx, 0);
    ctx.fill();
    ctx.closePath();
  };

  const newBackWave = new BackWave();

  function render() {
    ctx.clearRect(0, 0, width, height);
    newBackWave.render();
  }

  function renderloop() {
    const now = +new Date();

    requestAnimationFrame(renderloop);
    if (now - lastTime < frameTime) {
      return;
    }
    render();
  }
  renderloop();
}

export default waveCanvas;
