// https://daneden.github.io/animate.css/
import 'animate.css'
import { useMemo, useState } from 'react'
import { useDeepCompareEffect } from 'react-use'
import { cx, css } from 'emotion'

// https://animate.style/
// ;(function (i) {
//   const text = Array.from(document.querySelectorAll('.animation-group'))
//     .reduce((animations, group) => {
//       const animatios_ = Array.from(
//         group.querySelectorAll('.animation-item--title')
//       ).reduce((animatios__, item) => [...animatios__, item.innerText], [])
//       return [...animations, ...animatios_]
//     }, [])
//     .map((it) => `'${it}'`)
//     .join('|')

//   const handleCopy = (e) => {
//     e.clipboardData.setData('text/plain', text)
//     e.preventDefault()
//   }
//   document.addEventListener('copy', handleCopy)
//   document.execCommand('copy')
//   document.removeEventListener('copy', handleCopy)
//   return text
// })()

export type Animations =
  | 'bounce'
  | 'flash'
  | 'pulse'
  | 'rubberBand'
  | 'shakeX'
  | 'shakeY'
  | 'headShake'
  | 'swing'
  | 'tada'
  | 'wobble'
  | 'jello'
  | 'heartBeat'
  | 'backInDown'
  | 'backInLeft'
  | 'backInRight'
  | 'backInUp'
  | 'backOutDown'
  | 'backOutLeft'
  | 'backOutRight'
  | 'backOutUp'
  | 'bounceIn'
  | 'bounceInDown'
  | 'bounceInLeft'
  | 'bounceInRight'
  | 'bounceInUp'
  | 'bounceOut'
  | 'bounceOutDown'
  | 'bounceOutLeft'
  | 'bounceOutRight'
  | 'bounceOutUp'
  | 'fadeIn'
  | 'fadeInDown'
  | 'fadeInDownBig'
  | 'fadeInLeft'
  | 'fadeInLeftBig'
  | 'fadeInRight'
  | 'fadeInRightBig'
  | 'fadeInUp'
  | 'fadeInUpBig'
  | 'fadeInTopLeft'
  | 'fadeInTopRight'
  | 'fadeInBottomLeft'
  | 'fadeInBottomRight'
  | 'fadeOut'
  | 'fadeOutDown'
  | 'fadeOutDownBig'
  | 'fadeOutLeft'
  | 'fadeOutLeftBig'
  | 'fadeOutRight'
  | 'fadeOutRightBig'
  | 'fadeOutUp'
  | 'fadeOutUpBig'
  | 'fadeOutTopLeft'
  | 'fadeOutTopRight'
  | 'fadeOutBottomRight'
  | 'fadeOutBottomLeft'
  | 'flip'
  | 'flipInX'
  | 'flipInY'
  | 'flipOutX'
  | 'flipOutY'
  | 'lightSpeedInRight'
  | 'lightSpeedInLeft'
  | 'lightSpeedOutRight'
  | 'lightSpeedOutLeft'
  | 'rotateIn'
  | 'rotateInDownLeft'
  | 'rotateInDownRight'
  | 'rotateInUpLeft'
  | 'rotateInUpRight'
  | 'rotateOut'
  | 'rotateOutDownLeft'
  | 'rotateOutDownRight'
  | 'rotateOutUpLeft'
  | 'rotateOutUpRight'
  | 'hinge'
  | 'jackInTheBox'
  | 'rollIn'
  | 'rollOut'
  | 'zoomIn'
  | 'zoomInDown'
  | 'zoomInLeft'
  | 'zoomInRight'
  | 'zoomInUp'
  | 'zoomOut'
  | 'zoomOutDown'
  | 'zoomOutLeft'
  | 'zoomOutRight'
  | 'zoomOutUp'
  | 'slideInDown'
  | 'slideInLeft'
  | 'slideInRight'
  | 'slideInUp'
  | 'slideOutDown'
  | 'slideOutLeft'
  | 'slideOutRight'
  | 'slideOutUp'
// https://animate.style/#utilities
export type Delay = 'delay-2s' | 'delay-3s' | 'delay-4s' | 'delay-5s'
export type Speed = 'slow' | 'slower' | 'fast' | 'faster'
export type Repeat = 'repeat-1' | 'repeat-2' | 'repeat-3' | 'infinite'

export type ClassNames = Animations | Delay | Speed | Repeat

export interface AnimationOptions {
  // https://animate.style/
  classNames: ClassNames | ClassNames[]
  // https://developer.mozilla.org/en-US/docs/Web/CSS/animation-delay
  delay?: string | string[]
  // https://developer.mozilla.org/en-US/docs/Web/CSS/animation-duration
  duration?: string | string[]
  // https://developer.mozilla.org/en-US/docs/Web/CSS/animation-iteration-count
  iterationCount?: string | number | (string | number)[]
  // https://developer.mozilla.org/en-US/docs/Web/CSS/animation-fill-mode
  fillMode?: string | string[]
}

const prefix = (classNames: string | string[]) =>
  Array.isArray(classNames)
    ? classNames.map(it => `animate__${it}`)
    : `animate__${classNames}`

/**
 * It's worth noting that `isVisible` and `toggle` are mutually exclusive, so don't assign values to them at the same time.
 * Also, when you use `toggle`, you only need to set in, not out.
 * You will appreciate this when comparing the three examples in the ✨ [Live Demo](https://codesandbox.io/s/useanimatecss-tyklw?file=/src/A.tsx)
 */
export type useAnimateCss = (options: {
  in: AnimationOptions
  out?: AnimationOptions
  isVisible?: boolean
  toggle?: boolean
  onStart?: (
    event: React.AnimationEvent<Element>,
    isVisible: boolean | undefined,
    toggle: boolean | undefined
  ) => unknown
  onCompleted?: (
    event: React.AnimationEvent<Element>,
    isVisible: boolean | undefined,
    toggle: boolean | undefined
  ) => unknown
}) => Pick<
  React.HTMLAttributes<Element>,
  'className' | 'onAnimationEnd' | 'onAnimationStart'
>
export const useAnimateCss: useAnimateCss = ({
  in: in_,
  out,
  isVisible,
  toggle,
  onStart,
  onCompleted,
}) => {
  const animation = isVisible ? in_ : out ?? in_

  const classname = useMemo(
    () =>
      css({
        animationDelay: animation.delay,
        animationDuration: animation.duration,
        animationIterationCount: animation.iterationCount,
        animationFillMode: animation.fillMode,
      }),
    [
      animation.delay,
      animation.duration,
      animation.iterationCount,
      animation.fillMode,
    ]
  )

  const [classNames, setClassNames] = useState('')

  useDeepCompareEffect(() => {
    setClassNames(
      cx(classname, [prefix('animated'), prefix(animation.classNames!)])
    )
  }, [animation, classname, isVisible, toggle])

  const attributes = useMemo<React.HTMLAttributes<Element>>(
    () => ({
      className: classNames,
      onAnimationStart: (event: React.AnimationEvent<Element>) => {
        if (event.target instanceof HTMLElement) {
          if (isVisible) {
            event.target.style.visibility = 'unset'
          }
          onStart?.(event, isVisible, toggle)
        }
      },
      onAnimationEnd: (event: React.AnimationEvent<Element>) => {
        if (event.target instanceof HTMLElement) {
          if (isVisible !== void 0 && !isVisible) {
            event.target.style.visibility = 'hidden'
          }
          onCompleted?.(event, isVisible, toggle)
        }
        setClassNames('')
      },
    }),
    [classNames, isVisible, onCompleted, onStart, toggle]
  )

  return attributes
}

export default useAnimateCss
