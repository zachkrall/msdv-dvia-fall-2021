;(async () => {
  
  // https://observablehq.com/@lemonnish/color-scale-using-multiple-colors
  let color_scale = d3.scaleLinear().domain([0,0.5, 1]).range(['red', 'green', 'blue']).interpolate(d3.interpolateHcl)
  for(let i=0; i<1; i+= 0.1){
    let app = document.querySelector('#color_scale')
    app.innerHTML += `
      <div style="width:100px;height:100px;display:inline-block;background:${color_scale(i)};">&nbsp;</div>
    `
  }


  const app = d3.select('#app')

  // fetch csv data
  const data = await d3.csv('./data/iris.csv')
  console.log(data)

  // you can fetch any kind of data
  const data_text = await d3.text('./data/helloWorld.txt')
  console.log(data_text)

  // value of longest petal value
  const min_value = d3.min(data, (d) => d.petal_length)
  const max_value = d3.max(data, (d) => d.petal_length)
  console.log('max value')
  console.log(max_value)

  // index of longest petal value
  const max_index = d3.maxIndex(data, (d) => d.petal_length)
  console.log('max index')
  console.log(max_index)

  const sorted_data = d3.groupSort(
    data,
    (g) => d3.median(g, (d) => d.petal_length),
    (d) => d
  )
  console.log('sorted data')
  console.log(sorted_data)

  const bin = d3
    .bin()
    .domain([0, max_value])
    .thresholds(max_value)
    .value((d) => d.petal_length)

  const binned_data = bin(sorted_data)
  console.log('binned data')
  console.log(binned_data)

  let groupped_html = ``

  binned_data.forEach((bin, groupIndex) => {
    let hydrate = bin.map((entry) => JSON.stringify(entry))
    groupped_html += `
    <div>
        <h1>petal length ${groupIndex}-${groupIndex + 1}":</h1>
        ${hydrate.join('<br/>')}
    </div>
    `
  })

  const div = d3.create('div')
  div.html(groupped_html)

  const svg = d3
    .create('svg')
    .attr('viewBox', [0, 0, 600, 300])
    .style('border', '1px solid red')

  const g = svg.append('g').selectAll('g').data(binned_data).join('g')

  const y_scale = d3
    .scaleLinear()
    .domain([0, d3.max(binned_data, (d) => d.length)])
    .range([50, 300])

  const x_scale = d3
    .scaleBand()
    .domain(binned_data.map((d, i) => i))
    .range([0, 600])

  // https://github.com/d3/d3-scale-chromatic#schemeAccent
  const colors = ['red', 'blue', 'yellow', 'green', 'purple', 'gold', 'teal']
  const colorScale = d3.scaleOrdinal(d3.schemeTableau10)

  g.append('rect')
    .attr('width', x_scale.bandwidth)
    .attr('height', (d) => y_scale(d.length))
    .attr('x', (d, i) => x_scale(i))
    .attr(
      'y',
      (d) => y_scale.range()[0] + y_scale.range()[1] - y_scale(d.length)
    )
    .attr('fill', (d, i) => colors[i])

  g.append('text')
    .attr('x', (d, i) => x_scale(i))
    .attr('y', (d, i) => 10)
    .attr('font-size', '0.5em')
    .text((d, i) => d.length)

  app.append(() => svg.node())

  app.append(() => div.node())
})()
