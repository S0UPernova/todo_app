import React, { useState, useEffect, memo } from 'react';
import styles from './todos_background.module.scss'
import MapArrayToElements from './mapArrayToElements';
import STATICS from './statics';
import { json } from 'react-router-dom';
//! this is getting close to done!!!!

// todo make the todos get marked as completed, and rewritten.

// ? maybe when that list is empty start overwriting them at random

// ? maybe use the typing function from portfolio to write them out, with randomized times
// ? maybe have it make it a 2d array that gets looped over, so that modding them at random could be as simple as [Math.floor(Math.random() * list.length &&|| row.lengh)] and have the placeholder be the existing text
// ? and get it to replace the placeholder as it goes, and if it runs out before it overwrites all of it, have it clear the rest.

const TodosBackground = () => {
  const [screenWidth, setScreenWidth] = useState(0)
  const [screenHeight, setScreenHeight] = useState(0)
  const [bgArr, setBgArr] = useState([])
  const [notVisible, setNotVisible] = useState([])
  const todoPacing = 5000 // how long for each todo write
  const todoDuration = 3000 // how long it takes to type each todo
  const {
    todoPadX,
    todoPadY,
    todoWidth,
    todoHeight,
    texts
  } = STATICS

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
      const temp = bgArr.slice()
      const visTemp = []

      // loops through all the indecies and any that are already visible it make sure they are drawn completely from the start
      temp.forEach(r => {
        r.forEach(c => {
          if (c?.visible === true && c?.duration !== 0) {
            c.duration = 0
          }
          else if (c?.visible === false) {
            visTemp.push(c)
          }
        })
      })

      if (visTemp.length > 0) {
        const indexToMakeVisible = Math.floor(Math.random() * visTemp.length)
        const x = visTemp[indexToMakeVisible].row
        const y = visTemp[indexToMakeVisible].col

        const temp = bgArr.slice()
        temp[x][y].visible = true
        temp[x][y].duration = todoDuration
        visTemp.splice(indexToMakeVisible, 1)
        setBgArr(temp.slice())
        setNotVisible(visTemp.slice())
      }
    }, todoPacing);
    return () => {
      clearInterval(inter)
    }
  }, [notVisible, bgArr])




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
            row: i,
            col: j,
          }
        )
      }
      rtnArr.push(rowArr)
    }
    return rtnArr
  }

  return (
    <>
      <div className={`${styles.bg_list} ${styles.solid_lines}`}>
        {bgArr.length > 0 && <MapArrayToElements arr={bgArr} height={todoHeight} width={todoWidth} />}
      </div>
    </>
  )
}

export default memo(TodosBackground);