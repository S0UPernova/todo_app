export default class ResAlertHelper {
  resAlert(response) {
    if (response.status < 300) {
        return response.json()
      }
      else {
        return response.json().then(result => {
          alert(
            `Status code ${response.status}` +
            Object.entries(result).map(([key, val]) =>
            `\n${key}: ${val}`)
          )
        })
      }
    }
}