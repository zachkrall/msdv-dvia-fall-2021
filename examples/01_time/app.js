// global dayjs
// global Tweakpane
// global p5

const pane = new Tweakpane.Pane()

const PARAMS = {
  size: 10,
  spacing: 12,
  color: '#eeeeee',
  colorHours: '#FF0000',
  colorMinutes: '#FF0000',
  colorSeconds: '#FF0000',
}

pane.addInput(PARAMS, 'size', { label: 'Size', min: 8, max: 300, step: 1 })
pane.addInput(PARAMS, 'spacing', { min: 12, max: 20, step: 1 })
pane.addInput(PARAMS, 'color')

const colors = pane.addFolder({
  title: 'Colors',
})
colors.addInput(PARAMS, 'colorHours', { label: 'Hours' })
colors.addInput(PARAMS, 'colorMinutes', { label: 'Minutes' })
colors.addInput(PARAMS, 'colorSeconds', { label: 'Seconds' })

function getTime() {
  return dayjs().format('YYYY-MM-DD HH:mm:ss Z')
}

function getTimeAsArray() {
  return [dayjs().format('HH'), dayjs().format('mm'), dayjs().format('ss')]
}

function loop() {
  let time = getTime()
  let app = document.querySelector('#app')
  app.innerHTML = time
  requestAnimationFrame(loop)
}

loop()

const sketch = (p) => {
  let canvas
  p.setup = () => {
    canvas = p.createCanvas(window.innerWidth, window.innerHeight)
    Object.assign(canvas.elt.style, {
      position: 'fixed',
      top: '0px',
      left: '0px',
      zIndex: '-1',
    })
  }
  p.draw = () => {
    p.background(150)

    let [hours, minutes, seconds] = getTimeAsArray()

    /* hours */
    p.push()
    p.fill(PARAMS.colorHours)
    for (let i = 0; i < hours; i++) {
      p.rect(i * (PARAMS.spacing * 3.2) + 10, 45, 30, 40)
    }
    p.pop()

    /* minutes */
    p.push()
    p.fill(PARAMS.colorMinutes)
    for (let i = 0; i < minutes; i++) {
      p.rect(i * PARAMS.spacing + 10, 90, 10, 40)
    }
    p.pop()

    /* seconds */
    p.push()
    p.fill(PARAMS.colorSeconds)
    for (let i = 0; i < seconds; i++) {
      p.rect(i * (PARAMS.spacing * 0.8) + 10, 135, 3, 40)
    }
    p.pop()

    p.ellipse(p.width * 0.5, p.height * 0.5, PARAMS.size, PARAMS.size)
  }
  p.windowResized = () => {
    canvas.resize(window.innerWidth, window.innerHeight)
  }
}

new p5(sketch)
