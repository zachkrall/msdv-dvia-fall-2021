import fileIcon from '@carbon/icons/lib/document--attachment/16'
import urlIcon from '@carbon/icons/lib/link/16'
import {toString as iconToString} from '@carbon/icon-helpers'

const TextNode = ({ text }) => {
  return text
    ?.map((i) => {
      if (i.text?.link && i.text.link?.url) {
        return `[${i.text.content}](${i.text.link.url})`
      } else if (i.text?.content) {
        return i.text?.content
      } else {
        return null
      }
    })
    .join('')
}

const makeBlock = (block) => {
  if (block.type === 'paragraph') {
    return `
${TextNode({ text: block[block.type].text })}
`
  }

  if (block.type === 'image' && block.image.file?.url) {
    return `
![${block?.image?.file?.caption || 'Image'}](./notion-images/${block.image.file.url})
`
  }

  if (block.type === 'bulleted_list_item') {
    return `
* ${TextNode({ text: block[block.type].text })}`
  }

  if (block.type === 'numbered_list_item') {
    return `
1. ${TextNode({ text: block[block.type].text })}`
  }

  if (block.type === 'heading_1') {
    return `
# ${TextNode({ text: block[block.type].text })}
`
  }

  if (block.type === 'heading_2') {
    return `
## ${TextNode({ text: block[block.type].text })}
`
  }

  if (block.type === 'heading_3') {
    return `
### ${TextNode({ text: block[block.type].text })}
`
  }

  if (block.type === 'quote' || block.type === 'callout') {
    return `
<blockquote>${TextNode({ text: block[block.type].text })}</blockquote>
`
  }

  if (block.type === 'divider') {
    return `
<hr/>
`
  }

  if (block.type === 'code') {
    return `
\`\`\`${block[block.type].language}
${TextNode({ text: block[block.type].text })}
\`\`\`
`
  }

  if (block.type === 'video') {
    return `
<p>
<video controls muted autoplay playsInline style="max-width: 100%;" src="./notion-videos/${block[block.type].file.url}"/></video>
</p>
    `
  }

  if (block.type === 'unsupported') {
    return `<div class="error-block">Block type is not supported by Notion API. <a href="https://developers.notion.com/reference/block" rel="noopener">See documentation.</a></div>`
  }

  if(block.type === 'column_list'&& block.column_list?.children){
    
    return `<div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(250px, 1fr));grid-gap: 1em;">
${block.column_list?.children
  .map((column_items) => {
    return `<div>
      ${column_items.map((block) => makeBlock({ ...block })).join('\n')}
    </div>`
  })
  .join('\n')}
</div>`
    
  }

  if(block.type === 'bookmark'){
    return `<div class="bookmark">
<span>${block[block.type].url}</span>
</div>`
  }

  if(block.type === 'file' || block.type === 'pdf'){
    return `<div class="file">
<a href="${block[block.type].file.url}" rel="noopener">
${iconToString(fileIcon)}
<span>${block[block.type].file.url}</span>
</a>
</div>`
  }

  return null
}

export default makeBlock
