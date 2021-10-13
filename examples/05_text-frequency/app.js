;(async () => {
    
    const data = await d3.text('./frankenstein.txt')

    const word_bank = data
        .split(/\s/g)
        .map(i => i.replace(/[^A-Za-z]/g, '').toUpperCase())
        .filter(i => i.length > 0)

    const word_count = {}

    word_bank.forEach(word => {
        if(!word_count[word]){
            word_count[word] = [word]
        } else {
            word_count[word].push(word)
        }
    })

    const word_map = new Map()

    word_bank.forEach(word => {
        if(!word_map.has(word)){
            word_map.set(word, [word])
        } else {
            word_map.set(word, word_map.get(word).concat(word))
        }
    })

    const d3word_count = d3.group(word_bank, d => d)
    // d3.groupSort()
    const d3word_rollup = d3
        .rollup(word_bank, v => v.length, d => d)

    console.log(d3word_rollup)

    const svg = d3.create('svg')
    const app = d3.select('#app')

    svg
        .attr('viewBox', [0,0,1000,300])

    const g = svg
        .selectAll('g')
        .data(Array.from(d3word_rollup))
        .join('g')

    const x_scale = d3
        .scaleBand()
        .domain(Array.from(d3word_rollup).sort((a,b)=>d3.descending(a[1], b[1])).map(d => d[0]))
        .range([0, 6000])
    const y_scale = d3.scaleLinear()
        .domain([0,d3.max(d3word_rollup, d => d[1])])
        .range([0, 300])

    g 
        .append('rect')
        .attr('x', d => x_scale(d[0]))
        .attr('height', d => y_scale(d[1]))
        .attr('y', d => y_scale.range()[1] - y_scale(d[1]) )
        .attr('width', x_scale.bandwidth)

    const tags = d3.create('div')

    const font_scale = d3
        .scaleLinear()
        .domain([0,d3.max(d3word_rollup, d => d[1])])
        .range([0.4, 5])

    tags
        .style('display', 'flex')
        .style('flex-wrap', 'wrap')
        .style('align-items', 'center')

    tags 
        .selectAll('span')
        .data(Array.from(d3word_rollup))
        .join('span')
        .text(d => d[0])
        .style('padding', '1em')
        .style('font-size', d => font_scale(d[1]) + 'rem')

    app.append(()=>svg.node())
    app.append(()=>tags.node())

})()