import store from '@/store'
import { MDWIDTH, SMWIDTH } from '@/config'

const { body } = document

export default {
  watch: {
    $route(route) {
      if (this.device === 'mobile' && this.sidebar.opened) {
        store.dispatch('app/closeSideBar', { withoutAnimation: false })
      }
    }
  },
  beforeMount() {
    window.addEventListener('resize', this.resizeHandler)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.resizeHandler)
  },
  mounted() {
    const isMobile = this.isMobile()
    if (isMobile) {
      store.dispatch('app/toggleDevice', 'mobile')
      store.dispatch('app/closeSideBar', { withoutAnimation: true })
    }
  },
  methods: {
    isMobile() {
      const rect = body.getBoundingClientRect()
      return rect.width - 1 < SMWIDTH
    },
    isPad() {
      const rect = body.getBoundingClientRect()
      return rect.width - 1 < MDWIDTH
    },
    resizeHandler() {
      if (!document.hidden) {
        const isMobile = this.isMobile()
        const isPad = this.isPad()
        store.dispatch('app/toggleDevice', isMobile ? 'mobile' : isPad ? 'pad' : 'desktop')
        if (isMobile || isPad) {
          store.dispatch('app/closeSideBar', { withoutAnimation: true })
        } else {
          store.dispatch('app/openSideBar', { withoutAnimation: true })
        }
      }
    }
  }
}
