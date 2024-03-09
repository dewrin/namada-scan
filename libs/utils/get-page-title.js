import { title } from '@/config'

const _title = title || 'namada'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${_title}`
  }
  return `${title}`
}
