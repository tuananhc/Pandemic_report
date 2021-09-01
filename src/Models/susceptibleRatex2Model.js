import React, { useState, useEffect } from 'react';
import anime from 'animejs/lib/anime.es.js';
import ring from '../assets/redCircle.png';

export function SusceptibleRatex2Model() {
  const [population, setPopulation] = useState(52);
  const infectedPercent = 10
  const contagiousRadius = 1
  const susceptibleRate = 40
  const recoveryTime = 3
  const [populationList, setPopulationList] = useState([])
  const [healthy, setHealthy] = useState([])
  const [infected, setInfected] = useState([])
  const [recovered, setRecovered] = useState([])
	const [isStart, setIsStart] = useState(false)

	document.addEventListener('scroll', handleScroll())

  function renderHealthy(id) {
    return (
      <div class='suspopulation' id={id} style={{ margin: 7.5, display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
        <img id={'susring'.concat(id)} src={ring} style={{ width: 7.5, height: 7.5, position: 'absolute', opacity: 0 }} />
        <div id={'sushealthy'.concat(id)} style={{ width: 7.5, height: 7.5, borderRadius: 7.5, backgroundColor: '#66FF33' }} />
      </div>
    )
  }

  function renderInfected(id) {
    return (
      <div class='suspopulation' id={id} style={{ margin: 7.5, display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
        <img class='susinfect ring' src={ring} style={{ width: 7.5, height: 7.5, position: 'absolute', opacity: 0 }} />
        <div id={'susinfected'.concat(id)} class='susinfected' style={{ width: 7.5, height: 7.5, borderRadius: 7.5, backgroundColor: '#FF0000' }} />
      </div>
    )
  }

  useEffect(() => {
    var pop = []
    for (var i = 0; i < population; i++) {
      pop.push(i)
    }
    setInfected(pop.slice(0, Math.floor(population * infectedPercent / 100)))
    setHealthy(pop.slice(Math.floor(population * infectedPercent / 100)))
    setPopulationList(shuffle(pop))
  }, [population])

  useEffect(() => {
    var value = infected.slice(-1)[0]
    clear(value)
  }, [infected])

  function clear(value) {
    setHealthy(healthy => healthy.filter((item) => item !== value))
    setTimeout(() => {
      var target = document.getElementById('sushealthy'.concat(value))
      anime({
        targets: target,
        background: '#808080',
        duration: 1000,
        easing: 'linear'
      })
      target = document.getElementById('susring'.concat(value))
      if (target !== null) {
        target.remove()
      }
      setHealthy(healthy => healthy.filter((item) => item !== value))
      setRecovered(recovered => [...recovered, value])
    }, 1000 * recoveryTime)
  }

  useEffect(() => {
    const interval = setInterval(() => {
      if (isStart) {
        for (var i = 0; i < healthy.length; i++) {
          for (var j = 0; j < infected.length; j++) {
            if (recovered.includes(infected[j])) {
              continue
            }
            var element1 = document.getElementById(healthy[i])
            var rect1 = element1.getBoundingClientRect();
            var element2 = document.getElementById(infected[j])
            var rect2 = element2.getBoundingClientRect();
            var dist = Math.sqrt(Math.pow(rect1.top - rect2.top, 2) + Math.pow(rect1.left - rect2.left, 2))
            if (dist < 25 * contagiousRadius) {
              var rand = Math.random() * 100
              if (rand < susceptibleRate) {
                var el = document.getElementById('sushealthy'.concat(healthy[i]))
                var ring = document.getElementById('susring'.concat(healthy[i]))
                if (ring !== null) {
                  ring.classList.add('susring')
                }
                anime({
                  targets: el,
                  background: '#FF0000',
                  duration: 1000,
                  easing: 'linear',
                });
                if (!infected.includes(healthy[i])) {
                  setInfected(infected => [...infected, healthy[i]])
                }
                break
              }
            }
          }
        }
      }
    }, 500)
    return () => clearInterval(interval)
  }, [isStart, healthy, infected, recovered])

  function shuffle(array) {
    if (array.length === 0) {
      return []
    }
    var currentIndex = array.length, randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
    return array
  }

  function handelClick() {
    restart()
    setTimeout(() => {
      start()
    }, 500)
  }

  function handleScroll() {
    var target = document.getElementById('susceptibleModel')
		if (target) {
			var coor = target.getBoundingClientRect()
			if (coor.top > 0 && coor.bottom < window.innerHeight) {
        if (!isStart) {
          start()
          setIsStart(true)
        }
			}
		}
  }

  function start() {
    anime({
      targets: '.suspopulation',
      translateX: function () {
        return anime.random(-50, 50);
      },
      translateY: function () {
        return anime.random(-50, 50);
      },
      easing: 'linear',
      duration: 1000,
      complete: start
    });
    anime({
      targets: '.susring',
      scale: {
        value: [1, 4],
        duration: 4000
      },
      opacity: {
        value: [1, 0],
        duration: 1000,
        easing: 'linear',
      },
      loop: true
    })
    setTimeout(() => {
      anime({
        targets: '.susinfected',
        background: '#808080',
        duration: 1000,
        easing: 'linear'
      })
      document.querySelectorAll('.susinfect.ring').forEach((item) => {
        item.remove()
      })
      for (var i = 0; i < Math.floor(population * infectedPercent / 100); i++) {
        setRecovered(recovered => [...recovered, i])
      }
    }, 1000 * recoveryTime + 1000)
  }

  function restart() {
    anime.remove('.suspopulation')
    setPopulation(0)
    setTimeout(() => {
      setPopulation(52)
    }, 100)
    setRecovered([])
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div
        id='susceptibleModel'
        style={{ width: 292.5, height: 292.5, flexWrap: 'wrap', flexDirection: 'row', display: 'flex', justifyContent: 'flex-start', alignItems: 'center', padding: 65, backgroundColor: 'black' }}
        onClick={() => handelClick()}
      >
        {populationList.map((id) => {
          if (id < Math.floor(population * infectedPercent / 100)) {
            return (renderInfected(id))
          } else {
            return (renderHealthy(id))
          }
        })}
      </div>
      <div style={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column', fontSize: 12 }}>
        <p>Double the susceptible rate of the disease</p>
        Infected proportion: {(infected.length).toFixed(2)}%
      </div>
    </div>
  )
}

