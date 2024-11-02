"use client";

import { useState } from "react";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import { saveAs } from "file-saver";
import { Button} from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectItem, SelectTrigger,
  SelectValue,
  SelectContent,} from "@/components/ui/select";



export default function Home() {
  const [formData, setFormData] = useState({
    persalNo: "",
    contactName: "",
    surname: "",
    email: "",
    phoneNumber: "",
    cellNumber: "",
    dhaOffice: "",
    floorRoom: "",
    callDescription: "",
    hostname: "",
    technicianName: "",
    technicianContact: "",
    callStatus: "",
    comments: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const generatePDF = async () => {
    // PDF generation logic
    const existingPdfBytes = await fetch("./template.pdf").then((res) =>
      res.arrayBuffer()
    );
    const pdfDoc = await PDFDocument.load(existingPdfBytes);
    const helveticaFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    const page = pdfDoc.getPages()[0];

    const now = new Date();
    const day = String(now.getDate()).padStart(2, "0");
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const month = monthNames[now.getMonth()];
    const year = now.getFullYear();
    const dateStr = `${day} ${month} ${year}`;
    const timeStr = now.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    // Define coordinates for each field
    page.drawText(`${dateStr}`, {
      x: 260,
      y: 700,
      size: 12,
      font: helveticaFont,
      color: rgb(0, 0, 0),
    });
    page.drawText(`${timeStr}`, {
      x: 480,
      y: 700,
      size: 12,
      font: helveticaFont,
      color: rgb(0, 0, 0),
    });
    page.drawText(formData.persalNo, {
      x: 220,
      y: 680,
      size: 12,
      font: helveticaFont,
      color: rgb(0, 0, 0),
    });
    // Continue for other fields...

    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    saveAs(blob, "POE_CALL_LOGGING_CPTi_AIRPORT.pdf");
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 p-4">
      <h1 className="text-2xl font-semibold mb-6">Call Logging Form</h1>
      <form className="w-full max-w-lg space-y-4 bg-white p-6 rounded-lg shadow-lg">
        <Input
          name="persalNo"
          placeholder="PERSAL No"
          onChange={handleChange}
          label="PERSAL No"
        />
        <Input
          name="contactName"
          placeholder="Contact Name"
          onChange={handleChange}
          label="Contact Name"
        />
        <Input
          name="surname"
          placeholder="Surname"
          onChange={handleChange}
          label="Surname"
        />
        <Input
          name="email"
          placeholder="Email"
          onChange={handleChange}
          label="Email"
        />
        <Input
          name="phoneNumber"
          placeholder="Phone Number"
          onChange={handleChange}
          label="Phone Number"
        />
        <Input
          name="cellNumber"
          placeholder="Cell Number"
          onChange={handleChange}
          label="Cell Number"
        />
        <Input
          name="dhaOffice"
          placeholder="DHA Office/Site"
          onChange={handleChange}
          label="DHA Office/Site"
        />
        <Input
          name="floorRoom"
          placeholder="Floor & Room No."
          onChange={handleChange}
          label="Floor & Room No."
        />
        <Textarea
          name="callDescription"
          placeholder="Call Description"
          onChange={handleChange}
          label="Call Description"
        />
        <Select
  name="hostname"
  onValueChange={(value) => setFormData((prev) => ({ ...prev, hostname: value }))}
>
  <SelectTrigger className="w-full">
    <SelectValue placeholder="Select Hostname" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="DTA19CPO109">DTA19CPO109</SelectItem>
    <SelectItem value="DTA20CPO210">DTA20CPO210</SelectItem>
    {/* Add more options here */}
  </SelectContent>
</Select>
        <Input
          name="technicianName"
          placeholder="Technician Name"
          onChange={handleChange}
          label="Technician Name"
        />
        <Input
          name="technicianContact"
          placeholder="Technician Contact"
          onChange={handleChange}
          label="Technician Contact"
        />
        <Input
          name="callStatus"
          placeholder="Call Status"
          onChange={handleChange}
          label="Call Status"
        />
        <Textarea
          name="comments"
          placeholder="Comments"
          onChange={handleChange}
          label="Comments"
        />
        <Button
          type="button"
          onClick={generatePDF}
          className="w-full bg-blue-500 text-white hover:bg-blue-600"
        >
          Download as PDF
        </Button>
      </form>
    </div>
  );
}
