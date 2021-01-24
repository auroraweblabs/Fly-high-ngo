// back tot top

let backToTopBtn = document.querySelector('.back-to-top')

window.onscroll = () => {
    if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
        backToTopBtn.style.display = 'flex'
    } else {
        backToTopBtn.style.display = 'none'
    }
}

// top nav menu

let menuItems = document.getElementsByClassName('menu-item')

Array.from(menuItems).forEach((item, index) => {
    item.onclick = (e) => {
        let currMenu = document.querySelector('.menu-item.active')
        currMenu.classList.remove('active')
        item.classList.add('active')
    }
})

// food category

let foodMenuList = document.querySelector('.food-item-wrap')

let foodCategory = document.querySelector('.food-category')

let categories = foodCategory.querySelectorAll('button')

Array.from(categories).forEach((item, index) => {
    item.onclick = (e) => {
        let currCat = foodCategory.querySelector('button.active')
        currCat.classList.remove('active')
        e.target.classList.add('active')
        foodMenuList.classList ='food-item-wrap '+ e.target.getAttribute('data-food-type')
    }
})

// on scroll animation

let scroll = window.requestAnimationFrame || function(callback) {window.setTimeout(callback, 1000/60)}

let elToShow = document.querySelectorAll('.play-on-scroll')

isElInViewPort = (el) => {
    let rect = el.getBoundingClientRect()

    return (
        (rect.top <= 0 && rect.bottom >= 0)
        ||
        (rect.bottom >= (window.innerHeight || document.documentElement.clientHeight) && rect.top <= (window.innerHeight || document.documentElement.clientHeight))
        ||
        (rect.top >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight))
    )
}

loop = () => {
    elToShow.forEach((item, index) => {
        if (isElInViewPort(item)) {
            item.classList.add('start')
        } else {
            item.classList.remove('start')
        }
    })

    scroll(loop)
}

loop()

// mobile nav


        const buttons = document.querySelectorAll('.bottom-navbar button:not(.float)')
        const effect = document.querySelector('.effect')
        console.log(effect)
        const container = document.querySelector('.container')
        let y = 0
        let moveY = 0
        let open = false

        const vh = window.innerHeight * 0.01
        document.documentElement.style.setProperty('--vh', `${vh}px`)
        setTimeout(function () {
            window.scrollTo(0, 1)
        }, 0)

        window.addEventListener('touchstart', (evt) => {
            const area = window.innerHeight - evt.touches[0].clientY
            y = area
            console.log(y)
        })

        window.addEventListener('touchend', (evt) => {
            y = 0
            console.log(moveY)
            if (moveY > (window.innerHeight / 4)) {
                anime({
                    targets: '.container',
                    translateY: `-${window.innerHeight / 2}px`,
                    duration: 600,
                })
                open = true
            } else {
                anime({
                    targets: '.container',
                    translateY: `0px`,
                    duration: 600,
                    easing: 'easeOutExpo'
                })
                open = false
            }
        })

        window.addEventListener('touchmove', (evt) => {
            moveY = (window.innerHeight - y) - evt.touches[0].clientY
            console.log(y)
            if (!open) {
                anime({
                    targets: '.container',
                    translateY: `${moveY <= window.innerHeight / 2 ? moveY > 0 ? -moveY : 0 : -window.innerHeight / 2}px`,
                    duration: 200,
                })
            } else if (open) {
                moveY = moveY + window.innerHeight / 2
                anime({
                    targets: '.container',
                    translateY: `${moveY <= window.innerHeight / 2 ? moveY > 0 ? -moveY : 0 : -window.innerHeight / 2}px`,
                    duration: 200,
                })
            }
        })

        buttons.forEach((item) => {
            item.addEventListener('click', (evt) => {
                const x = evt.target.offsetLeft
                buttons.forEach((btn) => { btn.classList.remove('active') })
                evt.target.classList.add('active')
                anime({
                    targets: '.effect',
                    left: `${x}px`,
                    duration: 600,
                })
            })
        })

        function handleClickPlus(evt) {
            anime({
                targets: '.container',
                translateY: `-${window.innerHeight / 2}px`,
                duration: 600,
            })
            open = true
            y = window.innerHeight / 2
            moveY = moveY + window.innerHeight / 2
        }