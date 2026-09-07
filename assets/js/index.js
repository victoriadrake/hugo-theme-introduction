document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.navbar-burger').forEach(function (button) {
    const menu = document.getElementById(button.dataset.target)
    if (!menu) return
    function setExpanded(expanded) {
      button.classList.toggle('is-active', expanded)
      menu.classList.toggle('is-active', expanded)
      button.setAttribute('aria-expanded', String(expanded))
    }
    button.addEventListener('click', function () {
      setExpanded(button.getAttribute('aria-expanded') !== 'true')
    })
    menu.addEventListener('click', function (event) {
      if (event.target.closest('a[href]')) setExpanded(false)
    })
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && button.getAttribute('aria-expanded') === 'true') {
        setExpanded(false)
        button.focus()
      }
    })
  })

  let activeModal = null
  let returnFocus = null
  const focusableSelector = 'a[href], button, input, select, textarea, [tabindex]'

  function focusableElements() {
    return Array.from(activeModal.querySelectorAll(focusableSelector)).filter(function (element) {
      return !element.disabled && element.tabIndex >= 0 && element.getClientRects().length > 0
    })
  }

  function closeModal() {
    if (!activeModal) return
    activeModal.classList.remove('is-active')
    document.documentElement.classList.remove('modal-open')
    activeModal = null
    if (returnFocus && returnFocus.isConnected) returnFocus.focus()
    returnFocus = null
  }

  document.querySelectorAll('.card[data-target]').forEach(function (card) {
    const modal = document.querySelector(card.dataset.target)
    if (!modal || !modal.matches('.modal')) return
    card.addEventListener('click', function (event) {
      // Preserve opening the real project page in another tab or window.
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
      event.preventDefault()
      returnFocus = event.target.closest('a[href]') || card.querySelector('a[href]')
      activeModal = modal
      modal.classList.add('is-active')
      document.documentElement.classList.add('modal-open')
      const closeButton = modal.querySelector('.modal-close')
      ;(closeButton || modal).focus()
    })
  })

  document.querySelectorAll('.modal-close, .modal-background').forEach(function (element) {
    element.addEventListener('click', closeModal)
  })

  document.addEventListener('keydown', function (event) {
    if (!activeModal) return
    if (event.key === 'Escape') {
      event.preventDefault()
      closeModal()
    } else if (event.key === 'Tab') {
      const elements = focusableElements()
      const first = elements[0] || activeModal
      const last = elements[elements.length - 1] || activeModal
      if (event.shiftKey && (document.activeElement === first || document.activeElement === activeModal)) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && (document.activeElement === last || document.activeElement === activeModal)) {
        event.preventDefault()
        first.focus()
      }
    }
  })

  document.addEventListener('focusin', function (event) {
    if (activeModal && !activeModal.contains(event.target)) {
      ;(focusableElements()[0] || activeModal).focus()
    }
  })
})
