import React, { useState } from "react";
import { PDFDocument } from "pdf-lib";
// (under development)
//this is basically the approach that should work properly 

//creating a new form and trying the retrive the values from that form so that the values can be sent to the server

//and on the new load a new pdf will be created and the values in the input fields will be filled by the response that is received from the server
const PdfForm = () => {
  const [pdfUrl, setPdfUrl] = useState(null);
  async function createForm() {
    const pdfDoc = await PDFDocument.create();

    const page = pdfDoc.addPage([550, 750]);

    const form = pdfDoc.getForm();

    page.drawText("Enter your favorite superhero:", {
      x: 50,
      y: 700,
      size: 20,
    });

    const superheroField = form.createTextField("favorite.superhero");
    superheroField.setText("One Punch Man");
    superheroField.addToPage(page, { x: 55, y: 640 });

    page.drawText("Select your favorite rocket:", { x: 50, y: 600, size: 20 });

    page.drawText("Falcon Heavy", { x: 120, y: 560, size: 18 });
    page.drawText("Saturn IV", { x: 120, y: 500, size: 18 });
    page.drawText("Delta IV Heavy", { x: 340, y: 560, size: 18 });
    page.drawText("Space Launch System", { x: 340, y: 500, size: 18 });

    const rocketField = form.createRadioGroup("favorite.rocket");
    rocketField.addOptionToPage("Falcon Heavy", page, { x: 55, y: 540 });
    rocketField.addOptionToPage("Saturn IV", page, { x: 55, y: 480 });
    rocketField.addOptionToPage("Delta IV Heavy", page, { x: 275, y: 540 });
    rocketField.addOptionToPage("Space Launch System", page, {
      x: 275,
      y: 480,
    });
    rocketField.select("Saturn IV");

    page.drawText("Select your favorite gundams:", { x: 50, y: 440, size: 20 });

    page.drawText("Exia", { x: 120, y: 400, size: 18 });
    page.drawText("Kyrios", { x: 120, y: 340, size: 18 });
    page.drawText("Virtue", { x: 340, y: 400, size: 18 });
    page.drawText("Dynames", { x: 340, y: 340, size: 18 });

    const exiaField = form.createCheckBox("gundam.exia");
    const kyriosField = form.createCheckBox("gundam.kyrios");
    const virtueField = form.createCheckBox("gundam.virtue");
    const dynamesField = form.createCheckBox("gundam.dynames");

    exiaField.addToPage(page, { x: 55, y: 380 });
    kyriosField.addToPage(page, { x: 55, y: 320 });
    virtueField.addToPage(page, { x: 275, y: 380 });
    dynamesField.addToPage(page, { x: 275, y: 320 });

    exiaField.check();
    dynamesField.check();

    page.drawText("Select your favorite planet*:", { x: 50, y: 280, size: 20 });

    const planetsField = form.createDropdown("favorite.planet");
    planetsField.addOptions(["Venus", "Earth", "Mars", "Pluto"]);
    planetsField.select("Pluto");
    planetsField.addToPage(page, { x: 55, y: 220 });

    page.drawText("Select your favorite person:", { x: 50, y: 180, size: 18 });

    const personField = form.createOptionList("favorite.person");
    personField.addOptions([
      "Julius Caesar",
      "Ada Lovelace",
      "Cleopatra",
      "Aaron Burr",
      "Mark Antony",
    ]);
    personField.select("Ada Lovelace");
    personField.addToPage(page, { x: 55, y: 70 });

    page.drawText(`* Pluto should be a planet too!`, {
      x: 15,
      y: 15,
      size: 15,
    });

    const pdfBytes = await pdfDoc.save();
    const pdfUrl = URL.createObjectURL(
      new Blob([pdfBytes], { type: "application/pdf" })
    );
    setPdfUrl(pdfUrl);
  }

  async function getFormValues() {
    const pdfBytes = await fetch(pdfUrl).then((res) => res.arrayBuffer());
    const pdfDoc = await PDFDocument.load(pdfBytes);
    const form = pdfDoc.getForm();

    const favoriteSuperheroField = form.getTextField("favorite.superhero");
    const favoriteRocketField = form.getRadioGroup("favorite.rocket");
    const gundamExiaField = form.getCheckBox("gundam.exia");
    const gundamKyriosField = form.getCheckBox("gundam.kyrios");
    const gundamVirtueField = form.getCheckBox("gundam.virtue");
    const gundamDynamesField = form.getCheckBox("gundam.dynames");
    const favoritePlanetField = form.getDropdown("favorite.planet");
    const favoritePersonField = form.getOptionList("favorite.person");
    const selectedPersonIndices = favoritePersonField.getSelectedIndices();

    const personOptions = favoritePersonField.getOptions();
    const selectedPersons = selectedPersonIndices.map(
      (index) => personOptions[index]
    );

    console.log("Favorite Superhero:", favoriteSuperheroField.getText());
    console.log("Favorite Rocket:", favoriteRocketField.getSelected());
    console.log("Gundam Exia:", gundamExiaField.isChecked());
    console.log("Gundam Kyrios:", gundamKyriosField.isChecked());
    console.log("Gundam Virtue:", gundamVirtueField.isChecked());
    console.log("Gundam Dynames:", gundamDynamesField.isChecked());
    console.log("Favorite Planet:", favoritePlanetField.getSelected());
    console.log("Favorite Person:", selectedPersons);
  }
  return (
    <div>
      <button onClick={createForm}>Create form</button>
      <button onClick={getFormValues}>Get form values</button>
      {pdfUrl && (
        <object data={pdfUrl} type="application/pdf" width="600" height="400">
          PDF Preview
        </object>
      )}
    </div>
  );
};

export default PdfForm;
