import { Memberships } from "@/constants"
import axios from "axios"

export const createPaymentLink = async (
  membership_type: Memberships,
) => {
  try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_URL_API}/users/create-qr-membership`,
        {
          method: 'POST',
      
          body: {
            membership_type,
          },
        }
      )

   
  } catch (err) {
    console.error(err)
  }
}
