import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import './Hero.css'
import Navbar from './Navbar'

const Hero = () => {
  const heroRef = useRef(null)
  const revealRef = useRef(null)
  const normalAudio = useRef(null)
const upsideAudio = useRef(null)
  const [upsideDown, setUpsideDown] = useState(false)

  useEffect(() => {
    const hero = heroRef.current
    const reveal = revealRef.current
    normalAudio.current = new Audio('/sounds/normal.mp3')
upsideAudio.current = new Audio('/sounds/upside.mp3')

normalAudio.current.loop = true
upsideAudio.current.loop = true

normalAudio.current.volume = 0.4
upsideAudio.current.volume = 0.4

    let mouseX = 0
    let mouseY = 0
    let x = 0
    let y = 0
    let visible = false

    const animate = () => {
      x += (mouseX - x) * 0.05
      y += (mouseY - y) * 0.05

      reveal.style.setProperty('--x', `${x}px`)
reveal.style.setProperty('--y', `${y}px`)
      requestAnimationFrame(animate)
    }

    animate()

    const move = (e) => {
      const rect = hero.getBoundingClientRect()
      mouseX = e.clientX - rect.left
      mouseY = e.clientY - rect.top

      if (!visible) {
        visible = true
        reveal.classList.add('active')
      }
    }

    const leave = () => {
      visible = false
      reveal.classList.remove('active')
    }

    hero.addEventListener('mousemove', move)
    hero.addEventListener('mouseleave', leave)

    return () => {
      hero.removeEventListener('mousemove', move)
      hero.removeEventListener('mouseleave', leave)
    }
  }, [])

  const container = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.2 },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 70, damping: 12 } },
  }

  const navbarVariant = {
    hidden: { y: -100, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 80, damping: 14 } },
  }

  return (
    <div
  className={`hero ${upsideDown ? 'upside-down' : ''}`}
  ref={heroRef}
>
      <motion.div variants={navbarVariant} initial="hidden" animate="visible">
        <Navbar />
      </motion.div>

      <motion.div className="hero-content" variants={container} initial="hidden" animate="visible">
        <motion.div className="left" variants={item}>
          <h1 className="st-title">
            STRANGER<br />THINGS
          </h1>
          <motion.p className="st-desc" variants={item}>
            When the lights begin to flicker and reality bends,
            a hidden world awakens beneath Hawkins.
            Some doors, once opened, can never be closed.
          </motion.p>
          <motion.button
  className="st-btn"
  variants={item}
 onClick={() => {

  if (!upsideDown) {

    normalAudio.current.pause()

    upsideAudio.current.currentTime = 0
    upsideAudio.current.play()

  } else {

    upsideAudio.current.pause()

    normalAudio.current.currentTime = 0
    normalAudio.current.play()
  }

  setUpsideDown(!upsideDown)
}}
>
  {upsideDown ? 'Escape Hawkins' : 'Enter the Upside Down'}
</motion.button>
        </motion.div>

        <motion.div className="right" variants={item}>
          <h1 className="st-title">The Mind Flayer</h1>
          <motion.p className="st-text" variants={item}>
            Shadows creep from another dimension, consuming everything in their path.
            Unravel the mystery and face the darkness head-on.
            Will you survive the terror of the Upside Down?
          </motion.p>
        </motion.div>
      </motion.div>

      <div className="fire-reveal" ref={revealRef}></div>
    </div>
  )
}

export default Hero
