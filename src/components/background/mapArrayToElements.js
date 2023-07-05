import { memo } from "react"
import TypedText from './typedText';
import styles from './todos_background.module.scss'

function MapArrayToElements({ arr, height, width, todoPadX, todoPadY, }) {
  
  //?  should this be from props?
  return arr.map((todoArr, i) => {
    return (
      <ul
        key={i}
        style={{
          padding: '0',
          display: 'flex',
          margin: '0',
          listStyle: 'none',
        }}
        className={styles.todo_bg_ul}>
        {
          todoArr.length > 0 && todoArr.map((col, j) => {
            return (
              <li
                key={j}
                style={{
                  // padding: `${todoPadX} ${todoPadY}`,
                  height: `${height}px`,
                  width: `${width}px`,
                }}
              ><TypedText visible={col.visible} duration={col.duration} delay={0} children={col.text} /></li>
            )
          })
        }
      </ul>
    )
  })
}
export default memo(MapArrayToElements)