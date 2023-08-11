import React, { useState } from "react";
import axios from "axios";



const PdfViewer = () => {
  const [pdfUrl, setPdfUrl] = useState();
  const [load, setLoad] = useState(false);
  const [url, setUrl] = useState("http://localhost:4000/form/1");

  //retriving the pdf from the server which as an array buffer
  const fetchData = () => {
    axios.get(url).then((res) => {
      console.log(res.data.body.data);
      const blob = new Blob([new Uint8Array(res.data.body.data)], {
        type: "application/pdf",
      });
      setPdfUrl(URL.createObjectURL(blob));
      setLoad(true);
    });
  };


  //tried to capture the new data in the fields (but iframe does not work like that)
  const capturePdf = async () => {
    if (pdfUrl) {
      try {
        const response = await fetch(pdfUrl);
        const pdfData = await response.arrayBuffer();
        const pdfByteArray = new Uint8Array(pdfData);
        console.log(pdfByteArray);
        axios.put(url, { pdf_content: pdfByteArray }).then((response) => {
          console.log(response.data);
        });
      } catch (error) {
        console.error("Error capturing PDF:", error);
      }
    }
  };

  return (
    <div>
      <button onClick={fetchData}>Load PDF</button>
      <button onClick={capturePdf}>Capture PDF</button>
      {load && (
        <div>
          <iframe title="PDF Viewer" src={pdfUrl} width="100%" height="500px" />
        </div>
      )}
    </div>
  );
};

export default PdfViewer;
