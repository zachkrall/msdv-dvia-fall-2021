import React from 'react'

const Title: React.FC = ({ children }) => {
  if (typeof children !== 'string') {
    return null
  }

  const randomFont = () => {
    let options = [
      'redaction-10',
      'redaction-20',
      'redaction-30',
      'redaction-40',
      'redaction-50',
      'redaction-60',
    ]
    return options[Math.floor(options.length * Math.random())]
  }

  return (
    <>
      {children
        .replace(/[^A-Za-z0-9,-—'"&:;\s]/g, '')
        .trim()
        .split(' ')
        .map((i, n) => (
          <span className={randomFont()} key={i + n}>
            {i}{' '}
          </span>
        ))}
    </>
  )
}

export default Title
