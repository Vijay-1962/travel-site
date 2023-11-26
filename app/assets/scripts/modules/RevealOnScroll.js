import throttle from 'lodash/throttle'
import debounce from 'lodash/debounce'

class RevealOnScroll {
    constructor(els, thresholdPercent) {
        this.thresholdPercent = thresholdPercent
        this.itemsToReveal = els
        // console.log(els)
        this.browserHeight = window.innerHeight
        this.hideInitially()
        this.scrollThrottle = throttle(this.calcCaller, 200).bind(this)
        this.events()
    }

    events() {
        window.addEventListener("scroll", this.scrollThrottle)
        window.addEventListener("resize", debounce(() => {
            // console.log("Resize just ran")
            this.browserHeight = window.innerHeight
        }, 333))
    }


    calcCaller() {
        this.itemsToReveal.forEach(el => {
            if (el.isRevealed == false) {
                this.calculateIfScrolledTo(el)
            }
        })
    }

    calculateIfScrolledTo(el) {
        if (window.scrollY + this.browserHeight > el.offsetTop) {
            console.log("Element Was Calculated")
            let scrollPercent = (el.getBoundingClientRect().y / this.browserHeight) * 100
            if (scrollPercent < this.thresholdPercent) {
                el.classList.add("reveal-item--is-visible")
                el.isRevealed = true
                if (el.isLastItem) {
                    window.removeEventListener("scroll", this.scrollThrottle)
                }
            }
        }
    }

    hideInitially() {
        this.itemsToReveal.forEach(el => {
            el.classList.add("reveal-item")
            el.isRevealed = false
            // console.log(el)
        })
        this.itemsToReveal[this.itemsToReveal.length - 1].isLastItem = true
    }
}

export default RevealOnScroll;