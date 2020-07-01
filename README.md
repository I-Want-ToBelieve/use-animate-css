<h1 align="center">Welcome to use-animate-css 👋</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-1.0.1-blue.svg?cacheSeconds=2592000" />
  <a href="#" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg" />
  </a>
</p>

> Using [animate.css](https://github.com/animate-css/animate.css) with React Hook

### ✨ [Live Demo](https://codesandbox.io/s/useanimatecss-tyklw?file=/src/A.tsx)

## Install

```sh
yarn add use-animate-css
```

or

```sh
npm install use-animate-css
```

## Usage

```tsx
import React, { useState, useCallback } from 'react'
import { useAnimateCss } from 'use-animate-css'

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

	const handleClick = useCallback(() => void setVisible(visible => !visible), [])

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
```

For more usage see the [✨ Live Demo](https://codesandbox.io/s/useanimatecss-tyklw?file=/src/B.tsx)

## Reference
The hook `useAnimateCss` definition is shown below:
```ts
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
```

It's worth noting that `isVisible` and `toggle` are mutually exclusive, so don't assign values to them at the same time.
Also, when you use `toggle`, you only need to set the `in` property, not `out`.

You will understand this when you compare the three examples in the ✨ [Live Demo](https://codesandbox.io/s/useanimatecss-tyklw?file=/src/A.tsx)

`onStart` and `onCompleted` they are called at the beginning of the animation and at the end of the animation, respectively, as you can see they are not required, you usually don't need to use them.

The type `ClassNames` definition is shown below:
```ts
// https://animate.style/
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
```

The class names listed above are all taken from https://animate.style/

## Show your support

Give a ⭐️ if this project helped you!

## License

[MIT license](https://opensource.org/licenses/MIT)

---
_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
