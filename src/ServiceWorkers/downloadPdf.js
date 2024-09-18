
const workerBlob = new Blob(
    [
        `
    self.onmessage = function (e) {
      const { data } = e.data;

      self.importScripts('https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js');
      const { jsPDF } = self.jspdf;

     const doc = new jsPDF("p", "mm", "a4")
      const lineHeight = 5;  // Define the line height
      let yPosition = 10;     // Initial Y position
  const pageWidth = doc.internal.pageSize.getWidth(); // Get full page width
  const pageHeight = doc.internal.pageSize.getHeight();   // Get page width
      const margin = 10;      // Margin from the left and right sides

      // Function to add a section with a title and content, with #fafafa background and no border, even across pages
      const addSection = (title, content, titleStyle, contentStyle) => {
        doc.setTextColor(0);
        const maxLineWidth = Math.floor(pageWidth - margin * 2)
        let contentLines;
        if(title === "User Defined Questions:") {
          contentLines = doc.splitTextToSize(content, maxLineWidth - 10);
        }else{
          contentLines = doc.splitTextToSize(content, maxLineWidth * 1.62);
        }
        const totalSectionHeight = lineHeight * contentLines.length + 10; // Calculate total height based on content
        let remainingHeight = pageHeight - yPosition - margin*3; // Calculate remaining space on current page

        // Split section into multiple parts if it exceeds the page height
        let contentIndex = 0;
        let linesOnCurrentPage = Math.floor(remainingHeight / lineHeight) - 2; // How many lines fit on the current page
        

        // Process the section in chunks that fit on each page
        while (contentIndex < contentLines.length) {
          const linesToRender = contentLines.slice(contentIndex, contentIndex + linesOnCurrentPage);
          const sectionHeight = linesToRender.length * lineHeight; // Height of current section part

          // Add the title only on the first page
          if (contentIndex === 0) {
            if (yPosition > pageHeight - margin * 2) {
            doc.addPage();
            yPosition = margin + 5; // Reset yPosition for the new page
          }
            doc.setFontSize(13);// X position for the text to be aligned with the right edge
            doc.setFont("helvetica" , "normal");
          doc.setFillColor("#07a5ef"); // #fafafa background (RGB: 248, 248, 248)
          doc.rect(margin, yPosition, pageWidth - margin * 2, lineHeight + 8, 'F'); // 'F' means fill with no border
            doc.text(title, margin + 5, yPosition + 8); // Add title with padding
            
            yPosition += lineHeight + 18;
          }

          // Add content lines
          linesToRender.forEach(line => {
            doc.setFont((line.includes(":-") || line.includes("??")) ? "helvetica" : "helvetica", (line.includes(":-") || line.includes("??")) ? "bold" : "normal");
            doc.setFontSize(10);
            doc.setTextColor(0);

            if (yPosition > pageHeight - margin) {
            doc.addPage();
            yPosition = margin + 5; // Reset yPosition for the new page
          }
            // Ensure text fits within the section background
            if(line.includes("??")){
              doc.text(line?.split("?")?.[0] + "?" , margin + 5, yPosition);
            yPosition += 7
             }
            else{
              // Move yPosition down by line height for next line
            
              doc.text(line?.split("a-n-s")?.[0], margin + 5, yPosition);

              yPosition += lineHeight;
              if(line.includes("a-n-s")){
              yPosition += lineHeight+3;
              }
            }
          });

          // Update content index to process remaining lines
          contentIndex += linesOnCurrentPage;

          // If there is more content to render, move to the next page
          if (contentIndex < contentLines.length) { 
            remainingHeight = pageHeight - margin; // Recalculate remaining height on the new page
            linesOnCurrentPage = Math.floor(remainingHeight / lineHeight); // Recalculate how many lines fit on the new page
          }
        }

        yPosition += 5; // Add space after the section
      };

      // Define styles
      const contactStyle = { fontSize: 12, color: 0 };
      const titleStyle = { fontSize: 10, color: 0 };
      const contentStyle = { fontSize: 10, color: "#000" };

 // Publicly accessible image URL
      const imgData = 'data:image/png;base64,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'; // Replace with your actual URL
      const imgWidth = 30; // Width of the image in mm
      const imgHeight = 20;

      // Load the image and add it to the PDF
      fetch(imgData)
        .then(response => response.blob())
        .then(blob => {
          const reader = new FileReader();
          reader.onloadend = function () {
            const imgDataUrl = reader.result;
            doc.addImage(imgDataUrl, 'PNG', margin, yPosition, imgWidth, imgHeight);

            // Add agreement title
            const textXPosition = pageWidth - margin; // X position for the text to be aligned with the right edge

            doc.setFontSize(10);
            doc.setTextColor("#6d6d6b");
            doc.setFont("helvetica" , "bold");

            const batchName = "Batch Name: " + (data?.batchData.batchName || 'N/A'); // Default value if batchName is undefined
            const name = "User Name: " + (data?.batchData.firstName + ' ' + data?.batchData.lastName || 'N/A'); // Default value if names are undefined
            const createdDate = "Date: " + (data?.finalResponse?.data[0]?.createdAt || 'N/A'); // Default value if createdDate is undefined

            // Add text to PDF
            doc.text("Batch Name: ", textXPosition - (data?.batchData.batchName?.length * 1.6), yPosition + 5, { align: "right" });
            doc.setFont("helvetica" , "normal");

            doc.text((data?.batchData.batchName), textXPosition, yPosition + 5, { align: "right" });
            doc.setFont("helvetica" , "bold");

            doc.text("User Name: ", textXPosition - ((data?.batchData.firstName + ' ' + data?.batchData.lastName).length * 1.6), yPosition + 10, { align: "right" });
            doc.setFont("helvetica" , "normal");

            doc.text((data?.batchData.firstName + ' ' + data?.batchData.lastName || 'N/A'), textXPosition, yPosition + 10, { align: "right" });
            doc.setFont("helvetica" , "bold");

            doc.text("Date: ", textXPosition - 18, yPosition + 15, { align: "right" });
            doc.setFont("helvetica" , "normal");

            doc.text((data?.finalResponse?.data[0]?.createdAt || 'N/A'), textXPosition, yPosition + 15, { align: "right" });

            yPosition = imgHeight + 5; // Update yPosition to be below the image and text

            // Add agreement title
            yPosition += lineHeight + 10; // Add space before starting question sections
            
            // Add data sections
            data?.finalResponse?.data?.forEach(item => {
              doc.setFontSize(17);
              
              doc.setFont("helvetica" , "bold" );
              
              yPosition = yPosition + 5
              const agreementTitle = "Agreement Title: " + (item?.agreementName || 'N/A'); // Default value if agreementName is undefined
              
              doc.setTextColor("#07a5ef");
                if (yPosition > pageHeight - margin) {
            doc.addPage();
            yPosition = margin + 5; // Reset yPosition for the new page
          }
         const splittedTitle = doc.splitTextToSize(agreementTitle, 180);
         for (let i = 0; i < splittedTitle.length; i++) {
          if (yPosition > pageHeight - margin) {
            doc.addPage();
            yPosition = margin + 5; // Reset yPosition for the new page
            }
            doc.text(splittedTitle[i], margin + 7, yPosition); 
            debugger;
  if(i < splittedTitle.length - 1){
    yPosition += 8
  }
  
}
              yPosition += lineHeight + 5;
                
 if (item.preDefinedQuestionAnalysis.length > 0) {
                let predefinedQuestionsContent = '';
                item.preDefinedQuestionAnalysis.forEach((q, i) => {
                  predefinedQuestionsContent += \`\${i+1}:- \${q.questionText}?\n\${q.questionAnswer}a-n-s\n\`;
                });
                addSection('Document Analysis:', predefinedQuestionsContent, titleStyle, contentStyle);
              }
              if (item.userDefinedQuestion.length > 0) {
                let userQuestionsContent = '';
                item.userDefinedQuestion.forEach((q, i) => {
                  userQuestionsContent += \`\${i+1}:- \${q.questionText}?\n\${q.questionAnswer}a-n-s\n\`;
                });
                addSection('User Defined Questions:', userQuestionsContent, titleStyle, contentStyle);
              }

             
            });

            // Create the PDF Blob
            const pdfBlob = doc.output('blob');

            // Generate a URL for the PDF blob
            const url = URL.createObjectURL(pdfBlob);
            const fileName = (data?.batchData.batchName || 'Document') + ".pdf";
            
            // Send the URL back to the main thread to trigger download
            self.postMessage({ url, fileName });
          };
          reader.readAsDataURL(blob);
        });
    };
    `,
    ],
    { type: "application/javascript" }
);

export const worker = new Worker(URL.createObjectURL(workerBlob));
