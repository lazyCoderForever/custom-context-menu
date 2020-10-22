'use strict'

document.addEventListener('DOMContentLoaded', () => {
  ;(function () {
    /**
     * letiables.
     */

    const contextMenuLinkClassName = 'context-menu_link'
    const contextMenuActive = 'context-menu--active'

    let taskItemClassName = 'task'
    let taskItemInContext

    let clickCoords
    let clickCoordsX
    let clickCoordsY

    let menu = document.querySelector('#context-menu')
    let menuState = 0
    let menuWidth
    let menuHeight

    let windowWidth
    let windowHeight

    /**
     * Function to check if we clicked inside an element with a particular class
     * name.
     */
    function clickInsideElement(e, className) {
      let el = e.target

      if (el.classList.contains(className)) {
        return el
      } else {
        while ((el = el.parentNode)) {
          if (el.classList && el.classList.contains(className)) {
            return el
          }
        }
      }

      return false
    }

    /**
     * Get's exact position of event.
     *
     */
    function getPosition(e) {
      let posX = 0
      let posY = 0

      if (e.pageX || e.pageY) {
        posX = e.pageX
        posY = e.pageY
      } else if (e.clientX || e.clientY) {
        posX =
          e.clientX +
          document.body.scrollLeft +
          document.documentElement.scrollLeft
        posY =
          e.clientY +
          document.body.scrollTop +
          document.documentElement.scrollTop
      }

      return {
        x: posX,
        y: posY,
      }
    }

    /**
     * Initialise our application's code.
     */
    function init() {
      contextListener()
      clickListener()
      resizeListener()
    }

    /**
     * Listens for contextmenu events.
     */
    function contextListener() {
      document.addEventListener('contextmenu', function (e) {
        taskItemInContext = clickInsideElement(e, taskItemClassName)

        if (taskItemInContext) {
          e.preventDefault()
          toggleMenuOn()
          positionMenu(e)
        } else {
          taskItemInContext = null
          toggleMenuOff()
        }
      })
    }

    /**
     * Listens for click events.
     */
    function clickListener() {
      document.addEventListener('click', function (e) {
        let clickeElIsLink = clickInsideElement(e, contextMenuLinkClassName)

        if (clickeElIsLink) {
          e.preventDefault()
          menuItemListener(clickeElIsLink)
        } else {
          let button = e.button
          if (button === 0) {
            toggleMenuOff()
          }
        }
      })
    }

    /**
     * Window resize event listener
     */
    function resizeListener() {
      window.onresize = function (e) {
        toggleMenuOff()
      }
    }

    /**
     * Turns the custom context menu on.
     */
    function toggleMenuOn() {
      if (menuState !== 1) {
        menuState = 1
        menu.classList.add(contextMenuActive)
      }
    }

    /**
     * Turns the custom context menu off.
     */
    function toggleMenuOff() {
      if (menuState !== 0) {
        menuState = 0
        menu.classList.remove(contextMenuActive)
      }
    }

    /**
     * Positions the menu properly.
     *
     */
    function positionMenu(e) {
      clickCoords = getPosition(e)
      clickCoordsX = clickCoords.x
      clickCoordsY = clickCoords.y

      menuWidth = menu.offsetWidth + 4
      menuHeight = menu.offsetHeight + 4

      windowWidth = window.innerWidth
      windowHeight = window.innerHeight

      if (windowWidth - clickCoordsX < menuWidth) {
        menu.style.left = windowWidth - menuWidth + 'px'
      } else {
        menu.style.left = clickCoordsX + 'px'
      }

      if (windowHeight - clickCoordsY < menuHeight) {
        menu.style.top = windowHeight - menuHeight + 'px'
      } else {
        menu.style.top = clickCoordsY + 'px'
      }
    }

    /**
     * Dummy action function that logs an action when a menu item link is clicked
     */
    function menuItemListener(link) {
      console.log(
        'Task ID - ' +
          taskItemInContext.getAttribute('data-id') +
          ', Task action - ' +
          link.getAttribute('data-action')
      )
      toggleMenuOff()
    }

    /**
     * Run the app.
     */
    init()
  })()
})
