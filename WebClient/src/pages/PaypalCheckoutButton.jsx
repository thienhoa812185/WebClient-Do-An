import bookingService from "@/service/bookingService";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";


const convertVNDToUSD = (amountInVND) => {
    const exchangeRate = 25000; // 1 USD = 25,000 VND
    const amountInUSD = amountInVND / exchangeRate;
    return amountInUSD;
};

const PaypalCheckoutButton = (props) => {

    const initialOptions = {
        clientId: "AVJX2FZq_pws8VmV-l7IXVCdhSMT2BdnDal4ZcaGcVf0h26vLuLFLHh5c0baKRkvQmQArDYYwrX5-tyi",
        currency: "USD",
        intent: "capture",
    };


    console.log(convertVNDToUSD(props.price))


    const createOrder = (data, actions) => {
        return actions.order.create({
            purchase_units: [
                {
                    amount: {
                        currency_code: "USD",
                        value: convertVNDToUSD(props.price),
                    },
                },
            ],
        });
    }

    const onApprove = (data, actions) => {
        const info = {
            "statusMethod": "PAID"
        }

        bookingService.updateStatusMethod(props.id, info)
            .then(res => {
                console.log(res.data)
            })
            .catch(err => {
                console.log(err)
            })

        return actions.order.capture().then(function (details) {
            alert("Transaction completed by " + details.payer.name.given_name)
        })

    }

    return (
        <PayPalScriptProvider options={initialOptions}>
            <PayPalButtons
                createOrder={(data, actions) => createOrder(data, actions)}
                onApprove={(data, actions) => onApprove(data, actions)}
            />
        </PayPalScriptProvider>
    )
}

export default PaypalCheckoutButton;