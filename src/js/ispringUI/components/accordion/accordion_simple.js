class Accordion {
    constructor(t) {
        this.CLASS_ACTIVE = 'active'
        this.ATTRIBUTE_ITEM_ID = 'data-accordion-item-id'
        this._accordion = t
        this._accordionImageContainer = t.querySelector('.js-image-container')
        this._accordionMainContainer = t.querySelector('.js-main-container')
        this._withImages = t.getAttribute('data-with-images')
        this._init()
    }

    _init() {
        const t = this._accordionMainContainer.querySelectorAll('.js-card')
        t.forEach(t => {
            this._addAccordionItemClickHandler(t)
            t.classList.contains(this.CLASS_ACTIVE) || this._hideItemText(t)
            this._addAccordionItemTextTransitionEndHandler(t)
        })
    }

    _addAccordionItemTextTransitionEndHandler(t) {
        const e = t.querySelector('.js-content-wrapper')
        e.addEventListener('transitionend', () => {
            e.style.height !== '0px' && (e.style.height = 'auto')
        })
    }

    _addAccordionItemClickHandler(t) {
        const e = this._withImages ? t : t.querySelector('.js-accordion-top-block')
        e.addEventListener('click', () => {
            t.classList.contains(this.CLASS_ACTIVE) || this._hideActiveItems()
            t.classList.toggle(this.CLASS_ACTIVE)
            t.classList.contains(this.CLASS_ACTIVE) ? (this._showItemText(t)) : (this._accordionImageContainer && this._setActiveItemImage(t))
            this._hideItemText(t)
        })
    }

    _hideActiveItems() {
        const t = this._accordionMainContainer.querySelectorAll('.js-card.active')
        t.forEach(t => {
            t.classList.remove(this.CLASS_ACTIVE)
            this._hideItemText(t)
        })
    }

    _hideItemText(t) {
        const e = t.querySelector('.js-content-wrapper')
        e.style.height = e.scrollHeight + 'px'
        setTimeout(() => {
            e.style.height = '0'
        }, 1)
    }

    _showItemText(t) {
        const e = t.querySelector('.js-content-wrapper')
        e.classList.add(this.CLASS_ACTIVE)
        e.style.height = e.scrollHeight + 'px'
    }

    _setActiveItemImage(t) {
        const e = t.getAttribute(this.ATTRIBUTE_ITEM_ID)
        const i = this._accordionImageContainer.querySelectorAll('.js-image-wrapper')
        i.forEach(t => {
            t.getAttribute(this.ATTRIBUTE_ITEM_ID) === e ? t.classList.add(this.CLASS_ACTIVE) : t.classList.remove(this.CLASS_ACTIVE)
        })
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const t = document.querySelectorAll('.js-accordion')
    t.forEach(t => {
        new Accordion(t)
    })
})
