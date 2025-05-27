import { lemonSqueezyClient } from "@/lib/axios"

export const buySubscription = async (buyUserId: string) => {
    try {
        const res = await lemonSqueezyClient(process.env.LEMON_SQUEEZY_API_KEY).post("/checkouts", {
            type: 'checkouts',
            attributes: {
                checkout_data: {
                    custom: {
                        buyerUserId: buyUserId
                    }
                },
                product_options: {
                    redirect_url: `${process.env.NEXT_PUBLIC_HOST_URL}/dashboard`
                }
            },
            relationships: {
                store: {
                    data: {
                        type: "stores",
                        id: process.env.LEMON_SQUEEZY_STORE_ID
                    }
                },
                variant: {
                    type: 'variants',
                    id: process.env.LEMON_SQUEEZY_VARIENT_ID
                }
            }
        })


        const checkoutUrl = res.data.data.attributes.url
        return {url: checkoutUrl, status: 200}
    } catch (error) {
        console.log("ERROR ", error)
        return {
            message: 'Internal Server Error', status: 500
        }
    }
}