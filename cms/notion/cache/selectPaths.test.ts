import { unwrapBlocks, crawlPaths } from './selectPaths'

const test_data = {
      'id-1': {
        content: [
          { type: 'image', image: { file: { url: '' } }},
          { type: 'image', image: { file: { url: '' } }},
          { type: 'video', video: { file: { url: '' } }},
          {
            type: 'column_list',
            column_list: {
              children: [
                [
                  {
                    type: 'image',
                    image: {
                        file: { url: '' }
                    },
                  },
                  {
                    type: 'video',
                    video : { file: { url: '' } },
                  },
                ],
              ],
            },
          },
        ],
      },
      'id-2': {
        content: [
          { type: 'image', image: { file: { url: '' } }},
          { type: 'image', image: { file: { url: '' } }},
          { type: 'video', video: { file: { url: '' } }},
          {
            type: 'column_list',
            column_list: {
              children: [
                [
                  {
                    type: 'image',
                    image: { file: { url: '' }},
                  },
                  {
                    type: 'video',
                    video: {file: { url: '' }},
                  },
                ],
              ],
            },
          },
        ],
      },
    } as any

describe('select paths', () => {
  it('flattens the array', () => {
    const sample = unwrapBlocks(test_data)
    expect(sample.every((block) => !Array.isArray(block))).toBe(true)
  })

  it('filters the array', () => {
    const sample = crawlPaths(test_data, 'image')
    console.log(sample)
    expect(sample.length).toBeGreaterThan(0)
  })
})
