
import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { InputTextarea } from "primereact/inputtextarea";
import { Calendar } from "primereact/calendar";
import { RadioButton } from "primereact/radiobutton";
import { Button } from 'primereact/button';
import { Link } from 'react-router-dom';
import { Checkbox } from 'primereact/checkbox';
import { MultiSelect } from 'primereact/multiselect';
import axios from 'axios';
import { Toast } from "primereact/toast";
import { classNames } from "primereact/utils";

export default function Home() {

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        date_of_birth: "",
        division: "", // Add division field
        gender: 'Male', // Default value
        vaccine_doses: 0,
        problems: "",
        symptoms: [],
        vaccinesTaken: [],
    });

    const local = "https://covid19.test";
    const server = "https://survey19.mdatiqur.me";

    const genderOptions = [
        { value: 'Male', label: 'Male' },
        { value: 'Female', label: 'Female' },
        { value: 'Others', label: 'Others' },
    ];

    const vaccineOptions = [
        { label: "None", value: 0, key: 1 },
        { label: "1 Dose", value: 1, key: 2 },
        { label: "2 Doses", value: 2, key: 3 },
        { label: "3 Doses", value: 3, key: 4 },
        { label: "4 Doses", value: 4, key: 4 },
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

    const symptomOptions = [
        { id: 1, value: "High temperature", label: "High temperature" },
        { id: 2, value: "Chills", label: "Chills" },
        { id: 3, value: "Sweating", label: "Sweating" },
        { id: 4, value: "Headache", label: "Headache" },
        { id: 5, value: "Weakness", label: "Weakness" },
        { id: 6, value: "Runny or blocked nose", label: "Runny or blocked nose" },
        { id: 7, value: "Sneezing", label: "Sneezing" },
        { id: 8, value: "Sore throat", label: "Sore throat" },
        { id: 9, value: "Mild fever", label: "Mild fever" },
        { id: 10, value: "Persistent coughing", label: "Persistent coughing" },
        { id: 11, value: "Throat irritation", label: "Throat irritation" },
        { id: 12, value: "Phlegm production", label: "Phlegm production" },
        { id: 13, value: "Dry cough", label: "Dry cough" },
        { id: 14, value: "Wet cough (with mucus)", label: "Wet cough (with mucus)" },
        { id: 15, value: "Generalized muscle aches", label: "Generalized muscle aches" },
        { id: 16, value: "Joint pain", label: "Joint pain" },
        { id: 17, value: "Fatigue", label: "Fatigue" },
        { id: 18, value: "Rash", label: "Rash" },
        { id: 19, value: "Itching", label: "Itching" },
        { id: 20, value: "Redness", label: "Redness" },
        { id: 21, value: "Blisters", label: "Blisters" },
        { id: 22, value: "Flaky skin", label: "Flaky skin" },
        { id: 23, value: "Itchy skin", label: "Itchy skin" },
        { id: 24, value: "Watery eyes", label: "Watery eyes" },
        { id: 25, value: "Skin rashes", label: "Skin rashes" },
        { id: 26, value: "Difficulty breathing", label: "Difficulty breathing" },
        { id: 27, value: "Stomach pain", label: "Stomach pain" },
        { id: 28, value: "Bloating", label: "Bloating" },
        { id: 29, value: "Diarrhea", label: "Diarrhea" },
        { id: 30, value: "Constipation", label: "Constipation" },
        { id: 31, value: "Body aches", label: "Body aches" },
        { id: 32, value: "High fever", label: "High fever" },
        { id: 33, value: "Dizziness", label: "Dizziness" },
        { id: 34, value: "Others", label: "Others" },
    ];

    const handleDoseChange = (e) => {
        const doses = e.value;
        setFormData({
            ...formData,
            vaccine_doses: doses,
            vaccinesTaken: Array(doses).fill(""), // Initialize empty selections
        });
    };

    const handleVaccineChange = (index, value) => {
        const updatedVaccines = [...formData.vaccinesTaken];
        updatedVaccines[index] = value;
        setFormData({ ...formData, vaccinesTaken: updatedVaccines });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitted(true);

        // Log form data to the console
        console.log("Form Data:", formData);

        if (formData.name && formData.email && formData.date_of_birth && formData.division) {
            // Form data is valid

            // API URL
            // const apiUrl = local + '/api/covid-survey'; // Replace with your API URL
            const apiUrl = server + '/api/covid-survey'; // Replace with your API URL

            try {
                const response = await axios.post(apiUrl, formData, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (response.status === 201) {
                    console.log('Form submitted successfully:', response.data);
                    toast.current.show({
                        severity: "success",
                        summary: "Survey Form Submitted",
                        detail: response?.data?.message,
                        life: 6000,
                    });

                    // Reset form data
                    setFormData({
                        name: "",
                        email: "",
                        date_of_birth: "",
                        division: "",
                        vaccine_doses: 0,
                        problems: "",
                        symptoms: [],
                        vaccinesTaken: [],
                        gender: "Male",
                    });
                } else if (response.status === 400) {
                    toast.current.show({
                        severity: "error",
                        summary: "Error",
                        detail: response?.data?.error_message,
                        life: 6000,
                    });
                }

            } catch (error) {
                console.error('Error submitting form:', error);
                toast.current.show({
                    severity: 'error',
                    summary: 'Form Submission Error',
                    detail: error?.response?.data.error_message,
                    life: 6000,
                });

                console.error('Error submitting form:', error);
            }
        }




    };

    const handleGenderChange = (e) => {
        setFormData({ ...formData, gender: e.value });
    };

    const [submitted, setSubmitted] = useState(false);
    const toast = React.useRef(null);
    const isFieldInvalid = (field) => {
        const value = formData[field];
        if (field === "date_of_birth") {
            return submitted && (!value || isNaN(new Date(value).getTime()));
        }
        return submitted && !value;
    };



    return (

        <div
            className="surface-0 p-4 shadow-2 border-round mx-auto"
            style={{ maxWidth: "900px", width: "100%" }}
        >
            {/* <div className="text-3xl font-medium text-900 mb-3">COVID-19 Vaccination Survey</div>
          <div className="font-medium text-500 mb-3">we are interested in your feedback.</div> */}

            {/* Centered Logo and Text */}
            <div className="flex flex-column align-items-center text-center mb-4">
                {/* Add your logo */}
                <img src="4667161.png" alt="Logo" className="mb-3" style={{ width: '100px', height: 'auto' }} />

                {/* Title */}
                <div className="text-3xl font-medium text-900 mb-2">COVID-19 Vaccination Survey</div>

                {/* Description */}
                <div className="font-medium text-500">
                    We are very thankedfull for your contribution.
                </div>
            </div>

            <Toast ref={toast} />


            { /* Form start here*/}
            <form>

                {/* Name */}
                <div className="flex flex-column gap-2 mb-4">
                    <label htmlFor="username" className={classNames({ "p-error": isFieldInvalid("name") })}>Your Name</label>
                    <InputText
                        id="name"
                        aria-describedby="username-help"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className={classNames({ "p-invalid": isFieldInvalid("name") })}
                        placeholder="Enter your name. Ex: John Doe"

                    />
                </div>

                {/* Email */}
                <div className="flex flex-column gap-2 mb-4">
                    <label htmlFor="emailLabel" className={classNames({ "p-error": isFieldInvalid("email") })}>Your Email or Number</label>
                    <InputText
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className={classNames({ "p-invalid": isFieldInvalid("email") })}
                        placeholder="Enter your email. Ex: lorem@example.com"
                    />
                </div>

                {/* Date of Birth */}
                <div className="flex flex-column gap-2 mb-4">
                    <label htmlFor="dob" className={classNames({ "p-error": isFieldInvalid("date_of_birth") })}>
                        Date of Birth
                    </label>
                    <Calendar
                        id="dob"
                        value={formData.date_of_birth} // Make sure formData.date_of_birth stores a valid Date object or formatted string
                        onChange={(e) => setFormData({ ...formData, date_of_birth: e.value })} // Use e.value for Calendar
                        placeholder="Select your birth date"
                        dateFormat="yy/mm/dd" // Display format
                        showIcon
                        className={classNames({ "p-invalid": isFieldInvalid("date_of_birth") })}
                    />
                    {isFieldInvalid("date_of_birth") && (
                        <small className="p-error">Date of Birth is required.</small>
                    )}
                </div>


                {/* Gender Checkbox */}
                <div className="flex flex-column gap-2 mb-4">
                    <label htmlFor="gender">Gender</label>
                    <div id="gender">
                        {genderOptions.map((genderOption) => (
                            <div key={genderOption.value} className="flex mb-3">
                                <Checkbox
                                    inputId={`gender-${genderOption.value}`}
                                    name="gender"
                                    value={genderOption.value}
                                    onChange={(e) => handleGenderChange(e)}
                                    checked={formData.gender === genderOption.value}
                                />
                                <label htmlFor={`gender-${genderOption.value}`} className="ml-2">
                                    {genderOption.label}
                                </label>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Division Dropdown */}
                <div className="flex flex-column gap-2 mb-4">
                    <label htmlFor="division" className={classNames({ "p-error": isFieldInvalid("division") })}>Your Division</label>
                    <Dropdown
                        id="division"
                        value={formData.division}
                        options={divisionOptions}
                        onChange={(e) => setFormData({ ...formData, division: e.value })}
                        placeholder="Select Your Division"
                        className={classNames({ "p-invalid": isFieldInvalid("division") })}
                    />
                </div>

                {/* Vaccine Doses Dropdown */}
                <div className="flex flex-column gap-2 mb-4">
                    <label htmlFor="vaccineDoses">
                        How many vaccine doses have you taken?
                    </label>
                    <div id="vaccineDoses">
                        {vaccineOptions.map((option) => (
                            <div key={option.value} className="flex mb-3 ">
                                <RadioButton
                                    inputId={`vaccineDose-${option.value}`}
                                    name="vaccineDoses"
                                    value={option.value}
                                    onChange={(e) => handleDoseChange(e)}
                                    checked={formData.vaccine_doses === option.value}
                                />
                                <label htmlFor={`vaccineDose-${option.value}`} className="ml-2">
                                    {option.label}
                                </label>
                            </div>
                        ))}
                    </div>
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


                {/* Symptoms Dropdown */}
                <div className="flex flex-column gap-2 mb-4">
                    <label htmlFor="symptomHelp">
                        What are your symptoms after the vaccine?
                    </label>
                    <MultiSelect
                        id="symptomHelp"
                        value={formData.symptoms} // Updated for multiple selection
                        options={symptomOptions}
                        onChange={(e) =>
                            setFormData({ ...formData, symptoms: e.value })
                        }
                        optionLabel="value"
                        placeholder="Select Symptoms"
                        filter
                        showClear
                        filterPlaceholder="Search symptoms"
                        display="chip" // Displays selected items as chips
                        required
                    />
                </div>


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


                {/* Submit and Clear Buttons */}
                <div className="flex flex-wrap justify-content-end gap-3 mb-6">
                    <button
                        type="button"
                        className="p-button p-component p-button-danger"
                        onClick={() =>
                            setFormData({
                                name: "",
                                email: "",
                                date_of_birth: "",
                                division: "",
                                vaccine_doses: 0,
                                problems: "",
                                symptoms: [],
                                vaccinesTaken: [],
                                gender: "Male",
                            })
                        }
                    >
                        Clear
                    </button>
                    <button onClick={handleSubmit} className="p-button p-component">
                        Submit
                    </button>
                </div>
            </form>
            {/* privacy policy link add */}
            <div className="flex-privacy flex-wrap justify-content-center">
                <span className="privacy-policy-text">Check our</span>
                <Link to="/privacy">
                    <Button label="Privacy Policy" link />
                </Link>
            </div>
        </div>
    )
}
