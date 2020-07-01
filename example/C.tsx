import React, { useState, useCallback } from 'react'
import { useAnimateCss } from '../'

export const C: React.FC = () => {
  const [toggle, setToggle] = useState(true)
  const { className, ...handler } = useAnimateCss({
    in: {
      classNames: 'tada',
      fillMode: 's',
    },
    toggle: toggle,
  })

  const handleClick = useCallback(() => void setToggle(visible => !visible), [])

  return (
    <>
      <div
        style={{ backgroundColor: 'tomato', width: 100, height: 100 }}
        className={className}
        {...handler}
      >
        C
      </div>
      <button onClick={handleClick}>toggle C</button>
    </>
  )
}
