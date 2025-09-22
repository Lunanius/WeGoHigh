import { useEffect } from "react";

function AdRight() {
    useEffect(() => {
        try {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch (e) {
            console.error("AdSense error:", e);
        }
    }, []);

    return (
        <ins
            className="adsbygoogle"
            style={{ display: "inline-block", width: "250px", height: "600px" }}
            data-ad-client="ca-pub-5077378746041738"
            data-ad-slot="5540470121"
        ></ins>
    );
}

export default AdRight;
