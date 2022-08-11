
export default  (columns,arrayObj) => {
  let cadenaEnvio = ''
   // let keysColumns = Object.keys(arrayObj[0])
    // columns.map(column =>{cadenaEnvio += `${column}`} )
    // cadenaEnvio += "\n"
    for (const i of arrayObj) {
        Object.keys(i).forEach(key => {
            cadenaEnvio += `${i[key]}`
        })
        cadenaEnvio += "\r\n"
    }
  return cadenaEnvio
}
