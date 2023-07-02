// import { time } from "console"
import React, { useState, useEffect, memo, useRef, ElementType, HTMLAttributes } from "react"
// import { useIsVisible } from "../hooks/useIsVisible"
import styles from './typedText.module.scss'

/**
 * @extends HTMLAttributes<HTMLOrSVGElement>
 * @typedef {{
 *  children: string,
 *  delay?: number,
 *  duration?: number,
 *  timeout?: number,
 *  placeHolder?: string | false,
 *  curserStyle?: "none" | "static" | "blink"
 *  curser?: string,
 *  tag?: ElementType,
 *  className?: string,
 *  visible?: boolean
 * }} IInputParams extends HTMLAttributes<HTMLOrSVGElement>
*/
//todo add option to allow placeholder to be replaced like using insert replacing one char at a time,
//todo instead of having it vanish all at once.
//? maybe add an option for it to start without needing to be visible?
/**
 * 
 * @param {IInputParams}
 * @returns {JSX.Element}
 */
function TypedText({
  children,
  delay = 110,
  timeout = 1000,
  placeHolder = "\u200B",
  curser = "|",
  curserStyle = "static",
  duration,
  tag: Tag = "span",
  className = "",
  visible = false,
}) {
  // todo maybe figure out how make this to not be any
  const ref = useRef(null);
  const isVisible = visible//useIsVisible(ref)
  const [revealedLetters, setRevealedLetters] = useState(0)
  const [showCurser, setShowCurser] = useState(false)
  const [hasBeenSeen, setHasBeenSeen] = useState(false)
  const totalDuration = (duration || duration === 0) ? duration / children.length : null

  useEffect(() => {
    let interval
    if (duration === 0 && isVisible) {
      setRevealedLetters(children.length)
    }
    const setter = () => {
      if (revealedLetters <= children.length) {
        setRevealedLetters(l => l + 1)
      }
    }
    if (hasBeenSeen && revealedLetters === 0) {
      setTimeout(() => {
        if (curserStyle !== "none") {
          setShowCurser(true)
        }
        interval = setInterval(() => {
          setter()
        }, totalDuration ? totalDuration : delay)
      }, timeout)

    } else if (hasBeenSeen && revealedLetters < children.length) {
      interval = setInterval(() => {
        setter()
      }, totalDuration ? totalDuration : delay)
    }

    return () => clearInterval(interval)
  }, [hasBeenSeen, revealedLetters, children.length, curserStyle, delay, timeout, totalDuration])

  return (
    <Tag ref={ref} className={className}>
      {`${isVisible && !hasBeenSeen ? setHasBeenSeen(true) : ""}`}
      {`${revealedLetters === 0 && placeHolder != false ? `${placeHolder}` : ""}`}
      {`${children.substring(0, revealedLetters)}`}
      {curserStyle !== "none" && (curserStyle === "static" || curserStyle === "blink")
        && revealedLetters < children.length
        && showCurser
        && <span className={`${curserStyle === "blink" && styles.blink}`}>{curser}</span>
      }
    </Tag>
  )
}

export default memo(TypedText)