
import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { InputTextarea } from "primereact/inputtextarea";
import { Calendar } from "primereact/calendar";


export default function AdvancedDemo() {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    date_of_birth: "",
    division: "", // Add division field
    vaccineDoses: null,
    problems: "",
    vaccinesTaken: [],
  });

  const vaccineOptions = [
    { label: "None", value: 0 },
    { label: "1 Dose", value: 1 },
    { label: "2 Doses", value: 2 },
    { label: "3 Doses", value: 3 },
    { label: "4 Doses", value: 4 },
  ];


  const vaccineNames = [
    { label: "AstraZeneca", value: "AstraZeneca" },
    { label: "Pfizer", value: "Pfizer" },
    { label: "Sinopharm", value: "Sinopharm" },
    { label: "Moderna", value: "Moderna" },
    { label: "Sinovac", value: "Sinovac" },
    { label: "Janssen (Johnson & Johnson)", value: "Janssen" },
    { label: "Pfizer-PF (Comirnaty)", value: "Pfizer-PF" },
  ];

  const divisionOptions = [
    { label: "Barisal", value: "Barisal" },
    { label: "Chittagong", value: "Chittagong" },
    { label: "Dhaka", value: "Dhaka" },
    { label: "Khulna", value: "Khulna" },
    { label: "Mymensingh", value: "Mymensingh" },
    { label: "Rajshahi", value: "Rajshahi" },
    { label: "Rangpur", value: "Rangpur" },
    { label: "Sylhet", value: "Sylhet" },
  ];

  const handleDoseChange = (e) => {
    const doses = e.value;
    setFormData({
      ...formData,
      vaccineDoses: doses,
      vaccinesTaken: Array(doses).fill(""), // Initialize empty selections
    });
  };

  const handleVaccineChange = (index, value) => {
    const updatedVaccines = [...formData.vaccinesTaken];
    updatedVaccines[index] = value;
    setFormData({ ...formData, vaccinesTaken: updatedVaccines });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    alert("Thank you for completing the survey!");
  };

    return (
        <div className="surface-0 p-4 shadow-2 border-round">
          <div className="text-3xl font-medium text-900 mb-3">COVID-19 Vaccination Survey</div>
          <div className="font-medium text-500 mb-3">we are interested in your feedback.</div>
          <form onSubmit={handleSubmit}>


          <div className="flex flex-column gap-2 mb-4">
            <label htmlFor="username">Your Name</label>
            <InputText id="name" aria-describedby="username-help" value={formData.name} onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }/>
            <small id="username-help">
                Enter your Name. Ex: John Doe
            </small>
          </div>

          <div className="flex flex-column gap-2 mb-4">
              <label htmlFor="emailLabel">Your Email or Number</label>
              <InputText id="email" aria-describedby="email-help" value={formData.email} onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }/>
              <small id="email-help" >
                  Enter your Name. Ex: example@gmail.com
              </small>
          </div>

          <div className="flex flex-column gap-2 mb-4">
            <label htmlFor="dob">Date of Birth</label>
            <Calendar
              id="dob"
              value={formData.date_of_birth}
              onChange={(e) => setFormData({ ...formData, date_of_birth: e.value })}
              placeholder="Select your date of birth"
              dateFormat="dd/mm/yy"
              showIcon
              required
            />
          </div>

          <div className="flex flex-column gap-2 mb-4">
            <label htmlFor="division">Your Division</label>
            <Dropdown
              id="division"
              value={formData.division}
              options={divisionOptions}
              onChange={(e) => setFormData({ ...formData, division: e.value })}
              placeholder="Select Your Division"
              required
            />
          </div>

            {/* Vaccine Doses Dropdown */}
            <div className="flex flex-column gap-2 mb-4">
              <label htmlFor="vaccineDoses">
                How many vaccine doses have you taken?
              </label>
              <Dropdown
                id="vaccineDoses"
                value={formData.vaccineDoses}
                options={vaccineOptions}
                onChange={(e) => handleDoseChange(e)}
                placeholder="Select Doses"
                required
                htmlFor="vaccineDoses-help"
              />
            </div>



          {/* Dynamic Vaccine Name Dropdowns */}
          {formData.vaccinesTaken.map((vaccine, index) => (
            <div key={index} className="flex flex-column gap-2 mb-4">
              <label htmlFor={`vaccine-${index}`}>Select Vaccine name for Dose {index + 1}</label>
              <Dropdown
                id={`vaccine-${index}`}
                value={formData.vaccinesTaken[index]}
                options={vaccineNames}
                onChange={(e) => handleVaccineChange(index, e.value)}
                placeholder="Select Vaccine"
                required
              />
            </div>
          ))}


            {/* Problems Textarea */}
            <div className="flex flex-column gap-2 mb-4">
              <label htmlFor="problems">
                What problems are you facing after the vaccine?
              </label>
              <InputTextarea
                id="problems"
                rows={5}
                value={formData.problems}
                onChange={(e) =>
                  setFormData({ ...formData, problems: e.target.value })
                }
                placeholder="Describe any issues or problems"
              />
            </div>


          {/* Submit Button */}
          <button type="submit" className="p-button p-component">
            Submit
          </button>
          </form>
      </div>
    )
}
        