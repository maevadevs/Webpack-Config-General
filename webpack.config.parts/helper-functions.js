// HELPER FUNCTIONS
// ****************

const isProduction = env => env === 'production'
const isProductionDebug = env => env === 'production' && process.env.NODE_ENV === 'debug'

// EXPORTS
// *******

module.exports = {
  isProduction,
  isProductionDebug
}
