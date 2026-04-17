/**
 * This function sends performance metrics to an analytics endpoint.
 *
 * @param {Function} onPerfEntry - Function that takes a metric name and a metric value.
 */
const reportWebVitals = onPerfEntry => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry)
      getFID(onPerfEntry)
      getFCP(onPerfEntry)
      getLCP(onPerfEntry)
      getTTFB(onPerfEntry)
    })
  }
}

export default reportWebVitals
