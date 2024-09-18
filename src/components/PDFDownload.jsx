/* eslint-disable no-useless-escape */
// import axios from "axios";
import { pdfData } from "../assets/PDFDownloadData";
import { worker } from "../ServiceWorkers/downloadPdf";
import { useState } from "react";

// eslint-disable-next-line react/prop-types
function PDFDownload() {
    const [loading, setLoading] = useState(false)

    // eslint-disable-next-line consistent-return
    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await fetch(
                'https://api.zealdrivensolbatches/7d0e29b3-fad4-4bbe-b440-d193e9316150/agreements?limit=5000&page=1'
            );

            // Check if the response is ok (status in the range 200-299)
            if (!response.ok) {
                // eslint-disable-next-line no-debugger
                debugger;
                setLoading(false);
                console.error(`HTTP error! status: ${response.status}`);
                return pdfData
                // throw new Error(`HTTP error! status: ${response.status}`);

            }

            const data = await response.json(); // Convert the response to JSON
            setLoading(false);
            return data;
        } catch (error) {

            // eslint-disable-next-line no-debugger
            debugger;
            setLoading(false);
            console.error("Error fetching data:", error);
            return pdfData

        }
    };


    const handleDownloadPDF = async () => {
        const data = await fetchData();

        if (
            data &&
            data.data &&
            data.data.finalResponse &&
            data.data.finalResponse.data
        ) {
            worker.postMessage({ data: data.data });

            worker.onmessage = function (e) {
                const { url, fileName } = e.data;

                if (url) {
                    const a = document.createElement("a");
                    a.href = url;
                    a.download = fileName;
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                    URL.revokeObjectURL(url);
                } else {
                    console.error("No URL received from worker.");
                }
            };
        } else {
            console.error("Data is missing or invalid");
        }
    };

    return (
        <div>
            <button
                onClick={handleDownloadPDF}
                type="button"
                className="btn ms-2 bg-[#07A5EF] rounded-[5px] download-pdf-btn font-semibold text-white hover:bg-[#07A5EF] ask-class min-h-[38px] h-[38px] w-full480"
            >
                {loading ? "Loading..." : "Download"}
            </button>
        </div>
    );
}

export default PDFDownload;
