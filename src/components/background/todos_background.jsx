import React, { useState, useEffect, useRef, useSyncExternalStore } from 'react';
import TypedText from './typedText';
import styles from './todos_background.module.scss'
//! this is getting close to done!!!!

// todo make this dispaly a list of todos

// todo make the todos get marked as completed, and rewritten.

// todo have it loop through once to see which ones are not visible, and add them to a list, and pop them off to make them visible

// todo fix flicker
// ? maybe when that list is empty start overwriting them at random

// ? maybe use the typing function from portfolio to write them out, with randomized times
// ? maybe have it make it a 2d array that gets looped over, so that modding them at random could be as simple as [Math.floor(Math.random() * list.length &&|| row.lengh)] and have the placeholder be the existing text
// ? and get it to replace the placeholder as it goes, and if it runs out before it overwrites all of it, have it clear the rest.

const TodosBackground = () => {
  const [screenWidth, setScreenWidth] = useState(0)
  const [screenHeight, setScreenHeight] = useState(0)
  const [bgArr, setBgArr] = useState([])
  const [row, setRow] = useState(0)
  const [col, setCol] = useState(0)

  // sets the screen height, and width with a debounce
  useEffect(() => {
    const setHW = () => {
      setScreenHeight(window.innerHeight)
      setScreenWidth(window.innerWidth)
    }
    const debounce = (func, delay) => {
      let timerId;
      return (...args) => {
        if (timerId) {
          clearTimeout(timerId);
        }
        timerId = setTimeout(() => {
          func(...args);
        }, delay);
      };
    };
    const throttled = debounce(() => setHW(), 100)
    window.addEventListener('resize', throttled)
    setHW()
    return () => {
      window.removeEventListener('resize', throttled)
    }
  }, [])

  // makes the initial array of todos
  useEffect(() => {
    setBgArr(MakeList())
  }, [screenHeight, screenWidth])


  // handles making new todos visible
  useEffect(() => {
    const inter = setInterval(() => {
      let temp = bgArr.slice()
      // loops through all the indecies and any that are already visible it make sure they are drawn completely from the start
      temp.forEach((r, i) => {
        r.forEach((c, j) => {
          if (temp[i][j].visible == true) {
            temp[i][j].duration = 0
          }
        })
      })

      // pickes a point at random
      setRow(Math.floor(Math.random() * temp.length))
      setCol(Math.floor(Math.random() * temp[row].length))

      // if it is not already seen it makes it so.
      if (temp[row][col].visible !== true) {
        temp[row][col].duration = 3000
        temp[row][col].visible = true
        setBgArr(temp.slice())
      }
    }, 5000);
    return () => {
      clearInterval(inter)
    }
  }, [row, col, bgArr])

  const todoPadX = 10
  const todoPadY = 10
  const todoWidth = 150
  const todoHeight = 100
  const texts = [
    'wash laundry',
    'do the dishes',
    'get milk',
    'get some aaa batteries for the television remote control',
    'the that thing I was doing'
    // Add more strings as needed
  ];


  const MakeList = () => { // check twice
    const rtnArr = []
    for (let i = 0; i < Math.floor(screenHeight / (todoHeight + (todoPadY * 2))); i++) {
      const rowArr = []
      for (let j = 0; j < Math.floor(screenWidth / (todoWidth + (todoPadX * 2))); j++) {
        rowArr.push(
          {
            text: texts[Math.floor(Math.random() * texts.length)],
            visible: Math.random() > .8,
            duration: 0,
          }
        )
      }
      rtnArr.push(rowArr)
    }
    return rtnArr
  }


  function MapArrayToElements({ arr }) {
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
            todoArr.map((col, j) => {
              return (
                <li
                  key={j}
                  style={{
                    height: `${todoHeight}px`,
                    width: `${todoWidth}px`,
                  }}
                ><TypedText visible={col.visible} duration={col.duration} delay={0} children={col.text} /></li>
              )
            })
          }
        </ul>
      )
    })
  }

  return (
    <>
      <div className={`${styles.bg_list} ${styles.solid_lines}`}>
        <MapArrayToElements arr={bgArr} />
      </div>
    </>
  )
}

export default TodosBackground;