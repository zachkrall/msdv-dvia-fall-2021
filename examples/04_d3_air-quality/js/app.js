;(async ()=>{

    const data = await d3.csv('./data/Air_Quality.csv')

    const bushwick = d3
        .filter(data, d => {
            return (
                d['Geo Place Name'].includes('Bushwick (CD4)')
                &&
                d['Name'].includes('PM2.5')
                &&
                d['Name'].includes('Fine Particulate Matter')
                && 
                !d['Time Period'].includes('Annual')
            )
        })
        .sort(
            (a,b) => {
                let x = new Date(a['Start_Date'])
                let y = new Date(b['Start_Date'])
                return d3.ascending(x,y)
            }
        )

    const earliest = d3.min(bushwick, d => new Date(d['Start_Date']))
    const oldest = d3.max(bushwick, d => new Date(d['Start_Date']))

    // const data_only_pm_25 = d3.filter(data, d => d['Name'].includes('PM2.5'))

    // const PM_25 = d3.rollup(
    //     data_only_pm_25, 
    //     v => d3.sum(v, d => d['Data Value']),
    //     d => d['Geo Place Name']
    // )

    console.log(data)

    console.log(bushwick)
    console.log(earliest, oldest)

    const app = d3.select('#app')

    const width = 800;
    const height = 400;

    const x_scale = d3
        .scaleTime()
        .domain([new Date('10/01/2008'), new Date('7/01/2018')])
        .range([30, width-10])

    console.log('x_scale')
    console.log(x_scale.domain())
    
    const y_scale = d3
        .scaleLinear()
        .domain([
            Math.ceil(d3.max(bushwick, d => parseFloat(d['Data Value']))),
            0
        ])
        .range([50, height-25])

    const color_scale = d3
        .scaleLinear()
        .domain([
            1, 0.8, 0.6, 0
        ])
        .range(['hsla(0, 100%, 50%, 1.0)', 'hsla(30, 100%, 50%, 1.0)','hsla(200, 100%, 50%, 1.0)', 'black'])

    console.log(Object.keys(x_scale))

    const svg = d3
        .create('svg')
        .attr('viewBox', [0, 0, width, height])
        .attr('width', width)
        .attr('height', height)

    svg 
        .append('g')
        .call(d3.axisBottom(x_scale))
        .attr('transform', `translate(0, ${height-25})`)
        .style('opacity', 0.5)
    
    svg
        .append('g')
        .call(d3.axisLeft(y_scale))
        .attr('transform', `translate(${30}, 0.5)`)
        .style('opacity', 0.5)
    
    svg
        .append('g')
        .selectAll('rect')
        .data(new Array(Math.ceil(d3.max(bushwick, d => parseFloat(d['Data Value'])))).fill('').map((_,i)=>i+1))
        .join('rect')
        .attr('x', d => x_scale.range()[0])
        .attr('y', d => y_scale(d))
        .attr('width', x_scale.range()[1] - x_scale.range()[0])
        .attr('height', 1)
        .attr('fill', '#000')
        .style('opacity', 0.2)
    
    svg.append("linearGradient")
      .attr("id", "line-gradient")
      .attr("gradientUnits", "userSpaceOnUse")
      .attr("x1", 0)
      .attr("y1", y_scale.range()[0])
      .attr("x2", 0)
      .attr("y2", y_scale.range()[1])
      .selectAll("stop")
        .data([
          {offset: "0%", color: "hsla(0, 100%, 50%, 1.0)"},
          {offset: "20%", color: "hsla(30, 100%, 50%, 1.0)"},
          {offset: "40%", color: "hsla(200, 100%, 50%, 1.0)"}
        ])
      .enter()
        .append("stop")
        .attr("offset", function(d) { return d.offset; })
        .attr("stop-color", function(d) { return d.color; });

    const line = svg
        .append('g')
        .style('opacity', 0)

    line
        .append('rect')
        .attr('width', 1)
        .attr('height', y_scale.range()[1] - y_scale.range()[0])
        .attr('fill', '#000')
        .style('opacity', 1.0)

    const label = d3.create('div')
        .style('position', 'absolute')
        .style('top', '50px')
        .style('left', 0)
        .style('text-align', 'center')
        .style('background', '#000')
        .style('color', '#fff')
        .style('font-weight', '500')
        .style('font-size', '0.8em')
        .style('padding', '0 0.5em')
        .style('transform', 'translate(-50%, -100%)')
        .style('white-space', 'nowrap')

    const label_text = label
        .append('div')
        .html('Test')
    

    svg
        .append('path')
        .datum(bushwick)
        .attr('d', d3
            .line()
            .x(d => x_scale(new Date(d['Start_Date'])))
            .y(d => y_scale(d['Data Value']))
        )
        .attr('fill', 'none')
        .attr('stroke', "url(#line-gradient)")
    
    svg 
        .append('g')
        .selectAll('circle')
        .data(bushwick)
        .join('circle')
        .attr('cx', d => x_scale(new Date(d['Start_Date'])))
        .attr('cy', d => y_scale(d['Data Value']))
        .attr('r', 2)
        .attr('fill', d => color_scale(d['Data Value'] / Math.ceil(d3.max(bushwick, d => parseFloat(d['Data Value'])))))    

    svg
        .on('mousemove', d => {
            let x = d.clientX - svg.node().getBoundingClientRect().left
            let stops = bushwick.map(d => x_scale(new Date(d['Start_Date'])))
            if(stops.some(i => x > i - 2 && x < i + 2)){
                let selected = bushwick.filter(d => {
                    let i = x_scale(new Date(d['Start_Date']))
                    return x > i - 2 && x < i + 2
                })[0]

                label.style('left', `${x_scale(new Date(selected['Start_Date']))}px`)

                label_text.text(`${selected['Data Value']} on ${selected['Start_Date']}`)
                line.style('opacity', 1)
                line.attr('transform', 
                `translate(${x_scale(new Date(selected['Start_Date']))}, 50)`)
            
            }
        })

    const table_data = bushwick.map(i => ({
        'Unique ID': i['Unique ID'],
        'Date': i['Start_Date'],
        'Data Value': i['Data Value'] + ' average ' + i['Measure Info'],
    }))
    
    const data_table = d3.create('table')
    
        data_table 
        .append('thead')
        .html(d => `
            ${Object.keys(table_data[0]).map(i=> `<td>${i}</td>`).join('')}
        `)

    data_table 
        .append('tbody')
        .selectAll('tr')
        .data(table_data)
        .join('tr')
        .html(d => `
            ${Object.values(d).map(i=> `<td>${i}</td>`).join('')}
        `)
    
    
    app.append(()=>svg.node())
    app.append(()=>label.node())
    d3.select('#data-table').append(()=>data_table.node())

})()