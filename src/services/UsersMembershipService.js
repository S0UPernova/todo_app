import { baseUrl } from "../utilities/Statics"
import ResAlertHelper from "../utilities/ResAlertHelper"
class UsersMembershipService extends ResAlertHelper {

  getMemberships = async (user_id, token) => {
    return fetch(`${baseUrl}/users/${user_id}/memberships`, {
      "method": "GET",
      "headers": {
        "Content-Type": "application/json",
        "Authorization": token
      }
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
      "headers": {
        "Content-Type": "application/json",
        "Authorization": token
      }
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
      "headers": {
        "Content-Type": "application/json",
        "Authorization": token
      }
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