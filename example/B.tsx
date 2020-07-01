import React, { useState, useCallback } from 'react'
import { useAnimateCss } from '../'

export const B: React.FC = () => {
  const [visible, setVisible] = useState(true)
  const { className, ...handler } = useAnimateCss({
    in: {
      classNames: ['zoomIn', 'faster'],
    },
    out: {
      classNames: ['zoomOut', 'faster'],
    },
    isVisible: visible,
  })

  const handleClick = useCallback(
    () => void setVisible(visible => !visible),
    []
  )

  return (
    <>
      <div
        style={{ backgroundColor: 'lightskyblue', width: 100, height: 100 }}
        className={className}
        {...handler}
      >
        B
      </div>
      <button onClick={handleClick}>toggle B</button>
    </>
  )
}
