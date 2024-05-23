import { useEffect } from "react";
import "./thankyou.scss";
import { Box } from "@mui/material";
import CryptoES from 'crypto-es';
import axios from "axios";
import { useNavigate } from "react-router-dom";


const ThankYouPage = () => {
    const navigate = useNavigate()
    useEffect(() => {
        let email = localStorage.getItem('haniemail')
        console.log(email)
        if (email) {

            const hashEmail = CryptoES.SHA256(email).toString()
            let time = Math.floor(Date.now() / 1000)

            let data = JSON.stringify({
                "data": [
                    {
                        "event_name": 'Purchase',
                        "event_time": time,
                        "action_source": "website",
                        "user_data": {
                            "em": [
                                hashEmail
                            ]
                        },
                        "custom_data":
                        {
                            "currency": "USD",
                            "value": 4.99
                        }
                    }
                ],
            });

            let config = {
                method: 'post',
                url: 'https://graph.facebook.com/v17.0/463413816189920/events?access_token=EAAGBZCN2k3EMBOZB158dnZBdNFUH9K8w56mjOKwtyDhLbE5D0LpAfBfY2PqOxEZCT0r4B3fGyLzwMrKvcjDnjcqu2fXbUHSH66hPVtDspey8KDGD1zkDlcZB6IIdc6jW4dE20IoChikN3UF7yGwMdZBkwWAB6ii8HyMyQABCwhYCcOk26vQrvQGoarlOAvTDwv9wZDZD',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: data
            };

            axios(config)
                .then(function (response) {
                    console.log(JSON.stringify(response.data));
                    setTimeout(() => {
                        navigate("/"); // Redirect to homepage after 2 seconds
                    }, 2000);
                })
                .catch(function (error) {
                    console.log(error);
                });

        }
    }, [])

    return (
        <>
            <div className="loginNew">
                <Box
                    className="top ml-[40px] mr-[40px]"
                >
                    <div
                        className=" wrapperflex items-center justify-between "
                    >
                        <a href={"/"} style={{ textDecoration: "none" }} className="link">
                            <h1> <span style={{ fontWeight: '700', fontSize: "20px" }} className="gradient-text">HANIFLIX</span></h1>

                        </a>

                    </div>
                </Box>

                <div className="section">
                    <div className="intro-section-thq">
                        <h2 className="text-white font-[500] text-[42px] m-[auto] w-[fit-content] gradient-text" >
                            Thank you!
                        </h2>
                        <p className="text-white text-center m-[20px]">You have successfully registered, you would be redirected to dashboard.</p>
                    </div>
                </div>
            </div>
        </>
    );

}
export default ThankYouPage;
