import React, { useState, useCallback } from 'react'
import { useAnimateCss } from '../.'

export const A: React.FC = () => {
  const [toggle, setToggle] = useState(true)
  const { className, ...handler } = useAnimateCss({
    in: {
      classNames: ['bounce', 'faster'],
      iterationCount: 5,
    },
    toggle: toggle,
  })

  const handleClick = useCallback(() => void setToggle(visible => !visible), [])

  return (
    <>
      <div
        style={{ backgroundColor: 'aquamarine', width: 100, height: 100 }}
        className={className}
        {...handler}
      >
        A
      </div>
      <button onClick={handleClick}>toggle A</button>
    </>
  )
}
