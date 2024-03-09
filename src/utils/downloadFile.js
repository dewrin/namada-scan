import { getToken } from '@libs/utils/auth'
export const downloadByUrl = function (url, fileName) {
  const xhr = new XMLHttpRequest()
  //   const fileName = 'file.docx' // 文件名称
  xhr.open('GET', url, true)
  xhr.responseType = 'arraybuffer'
  xhr.setRequestHeader('token', getToken()) // 请求头中的验证信息等（如果有）
  xhr.onload = function () {
    if (this.status === 200) {
      const type = xhr.getResponseHeader('Content-Type')

      const blob = new Blob([this.response], { type: type })
      if (typeof window.navigator.msSaveBlob !== 'undefined') {
        /*
               * IE workaround for "HTML7007: One or more blob URLs were revoked by closing
               * the blob for which they were created. These URLs will no longer resolve as
               * the data backing the URL has been freed."
               */
        window.navigator.msSaveBlob(blob, fileName)
      } else {
        const URL = window.URL || window.webkitURL
        const objectUrl = URL.createObjectURL(blob)
        if (fileName) {
          var a = document.createElement('a')
          // safari doesn't support this yet
          if (typeof a.download === 'undefined') {
            window.location = objectUrl
          } else {
            a.href = objectUrl
            a.download = fileName
            document.body.appendChild(a)
            a.click()
            a.remove()
          }
        } else {
          window.location = objectUrl
        }
      }
    }
  }
  xhr.send()
}

export const downloadByBolb = function(res, fileName) {
  var type = 'application/vnd.ms-excel'
  if (fileName.endsWith('xlsx')) {
    type = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  }
  if (!!window.ActiveXObject || 'ActiveXObject' in window) {
    const excelData = res
    const blob = new Blob([excelData], { type })
    window.navigator.msSaveOrOpenBlob(blob, fileName)
  } else {
    const excelData = res
    const blob = new Blob([excelData], { type })
    const downloadElement = document.createElement('a')
    const objBlobUrl = URL.createObjectURL(blob)
    downloadElement.href = objBlobUrl
    downloadElement.download = fileName
    document.body.appendChild(downloadElement)
    downloadElement.click()
    document.body.removeChild(downloadElement)
    window.URL.revokeObjectURL(objBlobUrl)
  }
}
