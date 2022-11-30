import { baseUrl, origin } from "../utilities/Statics"
import ResAlertHelper from "../utilities/ResAlertHelper"
class UsersMembershipService extends ResAlertHelper {
  headers = {
    "Content-Type": "application/json",
    "Authorization": token,
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Credentials': 'true'
  }
  getMemberships = async (user_id, token) => {
    return fetch(`${baseUrl}/users/${user_id}/memberships`, {
      "method": "GET",
      "headers": headers
    })
      .then(
        response => this.resAlert(response)
      )
      .catch(err => {
        console.error(err);
      })
  }

  getMembership = async (user_id, membership_id, token) => {
    return fetch(`${baseUrl}/users/${user_id}/memberships/${membership_id}`, {
      "method": "GET",
      "headers": headers
    })
      .then(
        response => this.resAlert(response)
      )
      .catch(err => {
        console.error(err);
      })
  }

  deleteMembership = async (user_id, membership_id, token) => {
    return fetch(`${baseUrl}/users/${user_id}/memberships/${membership_id}`, {
      "method": "DELETE",
      "headers": headers
    })
      .then(
        response => response
      )
      .catch(err => {
        console.error(err);
      })
  }
}
const usersMembershipService = new UsersMembershipService()
export default usersMembershipService